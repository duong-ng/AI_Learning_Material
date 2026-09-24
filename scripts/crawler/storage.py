"""
Storage layer for saving crawled problems as JSON and Markdown files.
Outputs clean YAML frontmatter and JSON matching the target AI Olympiad problem schema.
"""
import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Optional, List, Dict, Any

try:
    from .models import Problem, CrawlResult
except ImportError:
    from models import Problem, CrawlResult

logger = logging.getLogger(__name__)


class ProblemStorage:
    """Handles persistence of problems to disk in JSON and Markdown formats."""

    def __init__(self, base_dir: str = "data/problems"):
        self.base_dir = Path(base_dir)
        self.base_dir.mkdir(parents=True, exist_ok=True)

    def save_problem(self, problem: Problem, format: str = "both") -> tuple[Optional[Path], Optional[Path]]:
        """
        Save a single problem to disk in JSON and/or Markdown formats.

        Args:
            problem: The Problem object to save
            format: "json", "markdown", or "both"

        Returns:
            Tuple of (json_path, markdown_path)
        """
        # Normalize folder structure: data/problems/<competition>/<year>/
        comp_dir_name = problem.competition.lower().replace(" ", "-")
        comp_dir = self.base_dir / comp_dir_name / str(problem.year)
        comp_dir.mkdir(parents=True, exist_ok=True)

        json_path = None
        md_path = None

        if format in ("json", "both"):
            json_path = comp_dir / f"{problem.id}.json"
            self._save_json(problem, json_path)

        if format in ("markdown", "both"):
            md_path = comp_dir / f"{problem.id}.md"
            self._save_markdown(problem, md_path)

        return json_path, md_path

    def save_crawl_result(self, result: CrawlResult, format: str = "both") -> dict:
        """Save all problems from a crawl result and output a summary."""
        saved = {"json": [], "markdown": [], "errors": result.errors}

        for problem in result.problems:
            try:
                json_path, md_path = self.save_problem(problem, format)
                if json_path:
                    saved["json"].append(str(json_path))
                if md_path:
                    saved["markdown"].append(str(md_path))
            except Exception as e:
                err_msg = f"Failed to save problem {problem.id}: {e}"
                logger.error(err_msg)
                saved["errors"].append(err_msg)

        # Save summary in the storage directory
        summary_dir = self.base_dir / "_summaries"
        summary_dir.mkdir(exist_ok=True)
        timestamp = datetime.utcnow().strftime("%Y%m%d_%H%M%S")
        source_clean = result.source.lower().replace(" ", "_").replace("-", "_")
        summary_path = summary_dir / f"summary_{source_clean}_{timestamp}.json"

        with open(summary_path, "w", encoding="utf-8") as f:
            json.dump({
                "source": result.source,
                "crawled_at": result.crawled_at.isoformat(),
                "success": result.success,
                "problem_count": len(result.problems),
                "saved_json_count": len(saved["json"]),
                "saved_markdown_count": len(saved["markdown"]),
                "errors": result.errors,
            }, f, indent=2, ensure_ascii=False)

        saved["summary"] = str(summary_path)
        return saved

    def _save_json(self, problem: Problem, path: Path):
        """Save problem as JSON."""
        data = problem.model_dump(mode="json")
        with open(path, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, ensure_ascii=False)

    def _save_markdown(self, problem: Problem, path: Path):
        """Save problem as Markdown with YAML frontmatter."""
        frontmatter = {
            "id": problem.id,
            "competition": problem.competition,
            "year": problem.year,
            "stage": problem.stage,
            "title": problem.title,
            "domain": problem.domain,
            "difficulty": problem.difficulty,
            "evaluation_metric": problem.evaluation_metric,
            "tags": problem.tags,
            "dataset_links": problem.dataset_links,
            "starter_code_url": problem.starter_code_url,
            "solution_notebook_url": problem.solution_notebook_url,
            "source_url": problem.source_url,
            "crawled_at": problem.crawled_at.isoformat(),
            "version": problem.version,
        }

        # Format YAML frontmatter
        fm_lines = ["---"]
        for key, value in frontmatter.items():
            if value is None:
                continue
            if isinstance(value, list):
                if not value:
                    fm_lines.append(f"{key}: []")
                else:
                    fm_lines.append(f"{key}:")
                    for v in value:
                        # Escape strings if needed
                        safe_v = str(v).replace('"', '\\"')
                        fm_lines.append(f'  - "{safe_v}"')
            elif isinstance(value, (int, float, bool)):
                fm_lines.append(f"{key}: {value}")
            else:
                # Wrap string values in quotes if they contain special characters
                v_str = str(value).replace('"', '\\"')
                if any(c in v_str for c in [':', '{', '}', '[', ']', ',', '&', '*', '#', '?', '|', '-', '<', '>', '=', '!', '%', '@', '`']):
                    fm_lines.append(f'{key}: "{v_str}"')
                else:
                    fm_lines.append(f'{key}: "{v_str}"')
        fm_lines.append("---")
        fm_lines.append("")

        content = "\n".join(fm_lines) + problem.description_md.strip()

        if problem.editorial_md and problem.editorial_md.strip():
            content += "\n\n---\n\n## Editorial & Solutions\n\n" + problem.editorial_md.strip()

        with open(path, "w", encoding="utf-8") as f:
            f.write(content + "\n")

    def load_problem(self, problem_id: str) -> Optional[Problem]:
        """Load a problem by ID from JSON."""
        for json_file in self.base_dir.rglob(f"{problem_id}.json"):
            try:
                with open(json_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                return Problem(**data)
            except Exception as e:
                logger.error(f"Error loading {json_file}: {e}")
        return None

    def list_problems(self, competition: Optional[str] = None, year: Optional[int] = None) -> List[Problem]:
        """List all saved problems, optionally filtered by competition or year."""
        problems = []
        for json_file in self.base_dir.glob("*/*/*.json"):
            if json_file.name.startswith("summary_") or json_file.name.startswith("crawl_summary_"):
                continue
            if competition and competition.lower() not in str(json_file).lower():
                continue
            if year and str(year) not in str(json_file):
                continue
            try:
                with open(json_file, "r", encoding="utf-8") as f:
                    data = json.load(f)
                problems.append(Problem(**data))
            except Exception as e:
                logger.debug(f"Error loading {json_file}: {e}")
        return problems

    def get_stats(self) -> Dict[str, Any]:
        """Get comprehensive storage statistics."""
        all_problems = self.list_problems()
        stats: Dict[str, Any] = {
            "total": len(all_problems),
            "by_competition": {},
            "by_year": {},
            "by_domain": {},
            "by_difficulty": {},
            "by_metric": {},
        }

        for p in all_problems:
            stats["by_competition"][p.competition] = stats["by_competition"].get(p.competition, 0) + 1
            stats["by_year"][p.year] = stats["by_year"].get(p.year, 0) + 1
            stats["by_domain"][p.domain] = stats["by_domain"].get(p.domain, 0) + 1
            stats["by_difficulty"][p.difficulty] = stats["by_difficulty"].get(p.difficulty, 0) + 1
            stats["by_metric"][p.evaluation_metric] = stats["by_metric"].get(p.evaluation_metric, 0) + 1

        return stats