"""
Base crawler class with common functionality for all AI Olympiad crawlers.
Includes SSL handling, GitHub API/raw fallback, and Jupyter Notebook (.ipynb) parsing.
"""
import asyncio
import json
import logging
import re
from abc import ABC, abstractmethod
from typing import Optional, Any, List, Dict
from urllib.parse import urljoin

import httpx
from bs4 import BeautifulSoup
from tenacity import retry, stop_after_attempt, wait_exponential, retry_if_exception_type

try:
    from .models import CrawlerConfig, CrawlResult, Problem
except ImportError:
    from models import CrawlerConfig, CrawlResult, Problem

logger = logging.getLogger(__name__)


class NotebookParser:
    """Helper to extract problem description, code, and links from Jupyter Notebooks."""

    @staticmethod
    def parse(notebook_json_or_str: Any) -> Dict[str, Any]:
        """
        Parse a Jupyter Notebook and extract structured fields:
        title, description_md, starter_code, dataset_links.
        """
        if isinstance(notebook_json_or_str, str):
            try:
                data = json.loads(notebook_json_or_str)
            except Exception:
                return {
                    "title": "",
                    "description_md": notebook_json_or_str[:3000],
                    "starter_code": None,
                    "dataset_links": []
                }
        else:
            data = notebook_json_or_str

        cells = data.get("cells", [])
        markdown_parts = []
        starter_code_parts = []
        dataset_links = set()
        title = ""

        # Regex for dataset URLs
        url_pattern = re.compile(
            r'https?://(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b[-a-zA-Z0-9()@:%_+.~#?&/=]*'
        )

        for cell in cells:
            cell_type = cell.get("cell_type", "")
            source = cell.get("source", "")
            text = "".join(source) if isinstance(source, list) else str(source)

            if cell_type == "markdown":
                if not title:
                    # Look for first heading as title
                    for line in text.split("\n"):
                        line = line.strip()
                        if line.startswith("# "):
                            title = line.lstrip("#").strip()
                            break
                        elif line.startswith("## ") and not title:
                            title = line.lstrip("#").strip()

                markdown_parts.append(text)

                # Search for dataset links
                for match in url_pattern.findall(text):
                    lower = match.lower()
                    if any(k in lower for k in ["dataset", "data", "kaggle", "huggingface.co/datasets", "drive.google.com", ".zip", ".tar", ".csv", ".parquet"]):
                        dataset_links.add(match.rstrip(".,)'\""))

            elif cell_type == "code":
                # Check for dataset links in code
                for match in url_pattern.findall(text):
                    lower = match.lower()
                    if any(k in lower for k in ["dataset", "data", "kaggle", "download", ".zip", ".tar", ".csv"]):
                        dataset_links.add(match.rstrip(".,)'\""))

                # Keep baseline / starter code snippets
                if len(starter_code_parts) < 3 and len(text.strip()) > 0:
                    starter_code_parts.append(text)

        full_description = "\n\n".join(markdown_parts).strip()
        starter_code = "\n\n# ---\n\n".join(starter_code_parts) if starter_code_parts else None

        return {
            "title": title,
            "description_md": full_description if full_description else "No problem description extracted.",
            "starter_code": starter_code,
            "dataset_links": list(dataset_links)
        }


class BaseCrawler(ABC):
    """Abstract base class for all competition crawlers."""

    def __init__(self, config: CrawlerConfig):
        self.config = config
        self.client: Optional[httpx.AsyncClient] = None
        self._playwright_browser = None

    async def __aenter__(self):
        """Async context manager entry with SSL bypass and robust headers."""
        self.client = httpx.AsyncClient(
            timeout=httpx.Timeout(self.config.timeout, connect=10.0),
            follow_redirects=True,
            verify=False,  # Bypasses local SSL certificate verify failures
            headers={
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
                              "(KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,application/json,*/*;q=0.8",
                "Accept-Language": "en-US,en;q=0.9",
            }
        )
        return self

    async def __aexit__(self, exc_type, exc_val, exc_tb):
        """Async context manager exit."""
        if self.client:
            await self.client.aclose()
        if self._playwright_browser:
            await self._playwright_browser.close()

    @retry(
        wait=wait_exponential(multiplier=1, min=1, max=10),
        stop=stop_after_attempt(3),
        retry=retry_if_exception_type((httpx.RequestError, httpx.HTTPStatusError)),
        reraise=True
    )
    async def fetch(self, url: str) -> str:
        """Fetch a URL with retry logic, SSL bypass, and rate limiting."""
        if self.config.rate_limit > 0:
            await asyncio.sleep(self.config.rate_limit)
        logger.debug(f"Fetching: {url}")

        if self.config.use_playwright:
            try:
                return await self._fetch_with_playwright(url)
            except Exception as e:
                logger.warning(f"Playwright failed for {url}, falling back to httpx: {e}")

        response = await self.client.get(url)
        response.raise_for_status()
        return response.text

    async def fetch_json(self, url: str) -> Optional[Any]:
        """Fetch and parse JSON directly."""
        try:
            content = await self.fetch(url)
            return json.loads(content)
        except Exception as e:
            logger.debug(f"Failed to fetch JSON from {url}: {e}")
            return None

    async def fetch_github_file(self, owner: str, repo: str, path: str, branch: str = "main") -> Optional[str]:
        """
        Fetch a file from GitHub, trying GitHub raw URL first (no API limits)
        then falling back to the GitHub Contents API.
        """
        raw_url = f"https://raw.githubusercontent.com/{owner}/{repo}/{branch}/{path}"
        try:
            return await self.fetch(raw_url)
        except Exception as e:
            logger.debug(f"Raw GitHub failed for {raw_url}: {e}")

        # Fallback to GitHub API
        api_url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}?ref={branch}"
        try:
            data = await self.fetch_json(api_url)
            if isinstance(data, dict) and "download_url" in data and data["download_url"]:
                return await self.fetch(data["download_url"])
        except Exception as e:
            logger.warning(f"GitHub API failed for {api_url}: {e}")

        return None

    async def fetch_github_dir(self, owner: str, repo: str, path: str = "", branch: str = "main") -> List[Dict[str, Any]]:
        """Fetch directory listing from GitHub API."""
        url = f"https://api.github.com/repos/{owner}/{repo}/contents/{path}?ref={branch}" if path else f"https://api.github.com/repos/{owner}/{repo}/contents?ref={branch}"
        try:
            data = await self.fetch_json(url)
            if isinstance(data, list):
                return data
        except Exception as e:
            logger.warning(f"Failed to list GitHub directory {url}: {e}")
        return []

    async def _fetch_with_playwright(self, url: str) -> str:
        """Fetch using Playwright for JavaScript-rendered pages."""
        if not self._playwright_browser:
            from playwright.async_api import async_playwright
            self._playwright = await async_playwright().start()
            self._playwright_browser = await self._playwright.chromium.launch(
                headless=True,
                args=["--no-sandbox", "--disable-setuid-sandbox"]
            )

        page = await self._playwright_browser.new_page()
        try:
            await page.goto(url, wait_until="domcontentloaded", timeout=self.config.timeout * 1000)
            await asyncio.sleep(1.0)
            content = await page.content()
            return content
        finally:
            await page.close()

    def parse_html(self, html: str) -> BeautifulSoup:
        """Parse HTML with BeautifulSoup, using lxml with html.parser fallback."""
        try:
            return BeautifulSoup(html, "lxml")
        except Exception:
            return BeautifulSoup(html, "html.parser")

    def resolve_url(self, base: str, path: str) -> str:
        """Resolve relative URLs."""
        return urljoin(base, path)

    def slugify(self, text: str) -> str:
        """Convert text to a URL-friendly slug."""
        text = text.lower().strip()
        text = re.sub(r"[^\w\s-]", "", text)
        text = re.sub(r"[-\s]+", "-", text)
        return text[:40].strip("-")

    @abstractmethod
    async def crawl(self) -> CrawlResult:
        """Main crawl method - must be implemented by subclasses."""
        pass

    def _create_crawl_result(
        self,
        problems: list[Problem],
        errors: list[str],
        success: bool = True
    ) -> CrawlResult:
        """Create a standardized crawl result."""
        return CrawlResult(
            success=success and len(problems) > 0,
            problems=problems,
            errors=errors,
            source=self.config.name
        )