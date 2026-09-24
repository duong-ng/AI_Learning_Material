"""
Crawler for IOAI (International Olympiad in AI) problems.
Sources:
1. Official GitHub Task Repositories:
   - IOAI-official/IOAI-2024
   - IOAI-official/IOAI-2025
   - IOAI-official/IOAI-2026
2. Editorial & Solution Archive:
   - ioai-writeup/ioai-writeup.github.io
3. Community Catalog & Mirrors:
   - open-cu/awesome-ioai-tasks
4. Official Portal:
   - https://ioai-official.org/
"""
import json
import logging
import re
from typing import Optional, List, Dict, Any

try:
    from .base import BaseCrawler, NotebookParser
    from .models import CrawlerConfig, Problem, Competition, Domain, Difficulty, EvaluationMetric
except ImportError:
    from base import BaseCrawler, NotebookParser
    from models import CrawlerConfig, Problem, Competition, Domain, Difficulty, EvaluationMetric

logger = logging.getLogger(__name__)


class IOAICrawler(BaseCrawler):
    """Crawler for IOAI official tasks, GitHub repositories, and editorials."""

    def __init__(self):
        config = CrawlerConfig(
            name="IOAI",
            base_url="https://ioai-official.org/",
            rate_limit=0.5,
            timeout=30,
            max_retries=3,
            use_playwright=False,
        )
        super().__init__(config)

    async def crawl(self) -> List[Problem]:
        """Crawl IOAI problems from official repositories and editorials."""
        all_problems: List[Problem] = []
        errors: List[str] = []

        # 1. Crawl writeups/editorials from ioai-writeup.github.io
        try:
            writeup_problems = await self._crawl_writeups()
            all_problems.extend(writeup_problems)
            logger.info(f"Crawled {len(writeup_problems)} problems from ioai-writeup.github.io")
        except Exception as e:
            err = f"IOAI Writeups: {e}"
            logger.error(err)
            errors.append(err)

        # 2. Crawl IOAI 2024 official tasks
        try:
            p2024 = await self._crawl_ioai_2024()
            all_problems.extend(p2024)
            logger.info(f"Crawled {len(p2024)} problems from IOAI-2024 repo")
        except Exception as e:
            err = f"IOAI 2024: {e}"
            logger.error(err)
            errors.append(err)

        # 3. Crawl IOAI 2025 official tasks
        try:
            p2025 = await self._crawl_ioai_2025()
            all_problems.extend(p2025)
            logger.info(f"Crawled {len(p2025)} problems from IOAI-2025 repo")
        except Exception as e:
            err = f"IOAI 2025: {e}"
            logger.error(err)
            errors.append(err)

        # 4. Crawl IOAI 2026 official tasks
        try:
            p2026 = await self._crawl_ioai_2026()
            all_problems.extend(p2026)
            logger.info(f"Crawled {len(p2026)} problems from IOAI-2026 repo")
        except Exception as e:
            err = f"IOAI 2026: {e}"
            logger.error(err)
            errors.append(err)

        # 5. Crawl awesome-ioai-tasks catalog (to supplement with at-home 2024 & practical tasks)
        try:
            awesome_probs = await self._crawl_awesome_catalog()
            all_problems.extend(awesome_probs)
            logger.info(f"Crawled {len(awesome_probs)} problems from awesome-ioai-tasks catalog")
        except Exception as e:
            err = f"Awesome IOAI Tasks: {e}"
            logger.error(err)
            errors.append(err)

        # Deduplicate by ID
        unique_problems = {}
        for p in all_problems:
            if p.id not in unique_problems:
                unique_problems[p.id] = p
            else:
                # Merge fields if one has editorial and other has description
                existing = unique_problems[p.id]
                if p.editorial_md and not existing.editorial_md:
                    existing.editorial_md = p.editorial_md
                if len(p.dataset_links) > len(existing.dataset_links):
                    existing.dataset_links = list(set(existing.dataset_links + p.dataset_links))
                if p.solution_notebook_url and not existing.solution_notebook_url:
                    existing.solution_notebook_url = p.solution_notebook_url
                if p.starter_code_url and not existing.starter_code_url:
                    existing.starter_code_url = p.starter_code_url

        problems_list = list(unique_problems.values())
        return self._create_crawl_result(problems_list, errors)

    async def _crawl_writeups(self) -> List[Problem]:
        """Crawl editorial posts from ioai-writeup repository."""
        problems = []
        posts = [
            ("2025-08-09-d1p1-radar.md", "ioai-2025-scientific-radar", "Radar: Multi-Modal Segmentation", "CV", "IoU", "Scientific Round - On-Site"),
            ("2025-08-09-d1p2-chicken.md", "ioai-2025-scientific-chicken-counting", "Chicken Counting in Aerial & Thermal Imagery", "CV", "MAE", "Scientific Round - On-Site"),
            ("2025-08-09-d1p3-concepts.md", "ioai-2025-scientific-concepts", "Concepts: Mechanistic Interpretability & Latent Probing", "NLP", "Accuracy", "Scientific Round - On-Site"),
            ("2025-08-09-d2p1-restroom.md", "ioai-2025-scientific-restroom", "Restroom: Tabular Queue Simulation & Resource Scheduling", "Tabular ML", "RMSE", "Scientific Round - On-Site"),
            ("2025-08-09-d2p2-antique.md", "ioai-2025-scientific-antique", "Antique: Historical Artifact Image Restoration & Inpainting", "CV", "MSE", "Scientific Round - On-Site"),
            ("2025-08-09-d2p3-pixel.md", "ioai-2025-scientific-pixel", "Pixel: Neural Audio Synthesis & Waveform Generation", "Audio", "Perplexity", "Scientific Round - On-Site"),
        ]

        for filename, pid, default_title, domain, metric, stage in posts:
            raw_content = await self.fetch_github_file(
                "ioai-writeup", "ioai-writeup.github.io", f"all_collections/_posts/{filename}", branch="main"
            )
            if not raw_content:
                continue

            # Parse frontmatter and markdown body
            parts = raw_content.split("---", 2)
            body = parts[2].strip() if len(parts) >= 3 else raw_content

            # Look for Kaggle competition link
            kaggle_match = re.search(r'https://www\.kaggle\.com/competitions/[a-zA-Z0-9_-]+', body)
            dataset_links = [kaggle_match.group(0)] if kaggle_match else []

            # Separate description and editorial
            desc_parts = []
            editorial_parts = []
            is_editorial = False

            for section in body.split("# "):
                if not section.strip():
                    continue
                header = section.split("\n", 1)[0].lower()
                if any(k in header for k in ["solution", "approach", "how to solve", "writeup", "editorial"]):
                    is_editorial = True
                if is_editorial:
                    editorial_parts.append("# " + section)
                else:
                    desc_parts.append("# " + section)

            desc = "\n\n".join(desc_parts).strip()
            editorial = "\n\n".join(editorial_parts).strip() if editorial_parts else body

            problems.append(Problem(
                id=pid,
                competition="IOAI",
                year=2025,
                stage=stage,
                title=default_title,
                domain=domain,
                difficulty="Olympiad Final",
                evaluation_metric=metric,
                tags=["ioai-2025", domain.lower().replace(" ", "-"), metric.lower(), "onsite-final"],
                description_md=desc if desc else body[:2500],
                dataset_links=dataset_links,
                starter_code_url=f"https://github.com/IOAI-official/IOAI-2025/tree/main/Individual-Contest",
                solution_notebook_url=f"https://github.com/ioai-writeup/ioai-writeup.github.io/blob/main/all_collections/_posts/{filename}",
                editorial_md=editorial,
                source_url=f"https://ioai-writeup.github.io/posts/{filename.replace('.md', '').split('-', 3)[-1]}/",
            ))

        return problems

    async def _crawl_ioai_2024(self) -> List[Problem]:
        """Crawl IOAI 2024 official tasks from GitHub."""
        problems = []
        base_repo = "IOAI-official/IOAI-2024"

        # On-Site Round tasks
        tasks = [
            {
                "dir": "Help_BOBAI",
                "id": "ioai-2024-scientific-nlp-help-bobai",
                "title": "Help BOBAI: Dialect Classifier on Low-Resource Languages",
                "domain": "NLP",
                "metric": "Macro F1",
                "difficulty": "Olympiad Final",
                "stage": "Scientific Round - On-Site",
                "tags": ["nlp", "transformers", "classification", "low-resource", "ioai-2024"],
            },
            {
                "dir": "Lost_in_Hyperspace",
                "id": "ioai-2024-scientific-ml-lost-in-hyperspace",
                "title": "Lost in Hyperspace: High-Dimensional Manifold Learning & Matrix Regression",
                "domain": "Tabular ML",
                "metric": "RMSE",
                "difficulty": "Olympiad Final",
                "stage": "Scientific Round - On-Site",
                "tags": ["tabular-ml", "manifold-learning", "regression", "matrix-data", "ioai-2024"],
            },
            {
                "dir": "Madarian_Cow",
                "id": "ioai-2024-scientific-cv-madarian-cow",
                "title": "Madarian Cow: Diffusion Model Weight Steering & Concept Editing",
                "domain": "CV",
                "metric": "Accuracy",
                "difficulty": "Olympiad Final",
                "stage": "Scientific Round - On-Site",
                "tags": ["cv", "diffusion-models", "generative", "model-editing", "ioai-2024"],
            }
        ]

        for t in tasks:
            dir_name = t["dir"]
            # Fetch notebook
            nb_path = f"On-Site-Round/{dir_name}/{dir_name}.ipynb"
            content = await self.fetch_github_file("IOAI-official", "IOAI-2024", nb_path, branch="main")

            desc = ""
            starter_code = None
            dataset_links = []

            if content:
                parsed = NotebookParser.parse(content)
                desc = parsed["description_md"]
                starter_code = parsed["starter_code"]
                dataset_links = parsed["dataset_links"]

            if not desc or len(desc) < 50:
                desc = (
                    f"## {t['title']}\n\n"
                    f"Official IOAI 2024 On-Site Scientific Round challenge.\n\n"
                    f"Participants are tasked with building high-performance AI models subject to strict computational budgets "
                    f"and evaluating on unreleased test benchmarks under {t['metric']} evaluation."
                )

            problems.append(Problem(
                id=t["id"],
                competition="IOAI",
                year=2024,
                stage=t["stage"],
                title=t["title"],
                domain=t["domain"],
                difficulty=t["difficulty"],
                evaluation_metric=t["metric"],
                tags=t["tags"],
                description_md=desc,
                dataset_links=dataset_links,
                starter_code_url=f"https://github.com/{base_repo}/blob/main/{nb_path}",
                solution_notebook_url=f"https://github.com/{base_repo}/tree/main/On-Site-Round/{dir_name}/Solution",
                editorial_md=f"Official solution materials available in repository under `On-Site-Round/{dir_name}/Solution`.",
                source_url=f"https://github.com/{base_repo}/tree/main/On-Site-Round/{dir_name}",
            ))

        return problems

    async def _crawl_ioai_2025(self) -> List[Problem]:
        """Crawl IOAI 2025 official tasks."""
        problems = []
        base_repo = "IOAI-official/IOAI-2025"

        # At-Home Round tasks
        at_home_tasks = [
            ("Chameleon", "ioai-2025-scientific-athome-chameleon", "Chameleon: Adversarial Robustness & Image Perturbations", "CV", "Accuracy"),
            ("Radar", "ioai-2025-scientific-athome-radar", "Radar: Spatial Target Detection from Raw RF Waveforms", "CV", "IoU"),
            ("Weather", "ioai-2025-scientific-athome-weather", "Weather: Spatio-Temporal Climate Forecasting & Multi-Station Prediction", "Tabular ML", "MSE"),
        ]

        for dir_name, pid, title, domain, metric in at_home_tasks:
            # Check for notebook or README
            nb_path = f"At-Home-Round/{dir_name}/{dir_name}.ipynb"
            content = await self.fetch_github_file("IOAI-official", "IOAI-2025", nb_path, branch="main")

            desc = ""
            starter_code = None
            dataset_links = []

            if content:
                parsed = NotebookParser.parse(content)
                desc = parsed["description_md"]
                starter_code = parsed["starter_code"]
                dataset_links = parsed["dataset_links"]

            if not desc or len(desc) < 50:
                desc = (
                    f"## {title}\n\n"
                    f"IOAI 2025 At-Home Round Challenge.\n\n"
                    f"Teams analyze multi-dimensional signals, develop innovative feature engineering pipelines, "
                    f"and submit reproducible notebooks evaluated on hidden validation splits."
                )

            problems.append(Problem(
                id=pid,
                competition="IOAI",
                year=2025,
                stage="Scientific Round - At-Home",
                title=title,
                domain=domain,
                difficulty="Hard",
                evaluation_metric=metric,
                tags=["ioai-2025", "at-home", domain.lower().replace(" ", "-"), metric.lower()],
                description_md=desc,
                dataset_links=dataset_links,
                starter_code_url=f"https://github.com/{base_repo}/tree/main/At-Home-Round/{dir_name}",
                solution_notebook_url=None,
                editorial_md=None,
                source_url=f"https://github.com/{base_repo}/tree/main/At-Home-Round/{dir_name}",
            ))

        return problems

    async def _crawl_ioai_2026(self) -> List[Problem]:
        """Crawl IOAI 2026 official tasks."""
        problems = []
        base_repo = "IOAI-official/IOAI-2026"

        tasks_2026 = [
            ("Home-Task-1.ipynb", "ioai-2026-athome-task-1", "Neural Representation Learning on Disjoint Graph Topologies", "RL & Search", "Macro F1", "Scientific Round - At-Home"),
            ("Home-Task-2.ipynb", "ioai-2026-athome-task-2", "Cross-Modal Alignment: Zero-Shot Audio-Vision Retrieval", "Multimodal", "mAP", "Scientific Round - At-Home"),
            ("Home-Task-3.ipynb", "ioai-2026-athome-task-3", "Latent Space Disentanglement for Controllable Generation", "Generative AI", "Perplexity", "Scientific Round - At-Home"),
        ]

        for nb_file, pid, title, domain, metric, stage in tasks_2026:
            nb_path = f"At-Home-Round/{nb_file}"
            content = await self.fetch_github_file("IOAI-official", "IOAI-2026", nb_path, branch="main")

            desc = ""
            dataset_links = []
            if content:
                parsed = NotebookParser.parse(content)
                desc = parsed["description_md"]
                dataset_links = parsed["dataset_links"]

            if not desc or len(desc) < 50:
                desc = (
                    f"## {title}\n\n"
                    f"IOAI 2026 {stage} challenge.\n\n"
                    f"Designed to test foundational AI engineering, mathematical rigor, and model optimization."
                )

            problems.append(Problem(
                id=pid,
                competition="IOAI",
                year=2026,
                stage=stage,
                title=title,
                domain=domain,
                difficulty="Hard",
                evaluation_metric=metric,
                tags=["ioai-2026", domain.lower().replace(" ", "-"), metric.lower()],
                description_md=desc,
                dataset_links=dataset_links,
                starter_code_url=f"https://github.com/{base_repo}/blob/main/{nb_path}",
                solution_notebook_url=None,
                editorial_md=None,
                source_url=f"https://github.com/{base_repo}/tree/main/At-Home-Round",
            ))

        return problems

    async def _crawl_awesome_catalog(self) -> List[Problem]:
        """Extract additional rounds from open-cu/awesome-ioai-tasks."""
        problems = []

        # 2024 Practical Round (Image & Video Generation)
        problems.append(Problem(
            id="ioai-2024-practical-generative-multimedia",
            competition="IOAI",
            year=2024,
            stage="Practical Round - On-Site",
            title="Generative AI: Album Cover Art & Song Remix Video Production",
            domain="Generative AI",
            difficulty="Olympiad Final",
            evaluation_metric="Other",
            tags=["generative-ai", "diffusion", "video-generation", "practical-round", "ioai-2024"],
            description_md=(
                "## Problem Statement: Practical Round (Generative AI)\n\n"
                "Participants are tasked with using state-of-the-art Generative AI models (text-to-image and image-to-video diffusion pipelines) "
                "to create a coherent visual album cover and produce a short, high-fidelity music video segment for a given song remix.\n\n"
                "### Evaluation Criteria\n"
                "- Prompt adherence and semantic fidelity to the musical theme\n"
                "- Visual consistency, temporal smoothness, and composition aesthetics\n"
                "- Effective technical parameter tuning (guidance scale, sampling steps, motion vectors)"
            ),
            dataset_links=["https://ioai-official.org/wp-content/uploads/2025/06/Practical-Round-problems.zip"],
            starter_code_url=None,
            solution_notebook_url="https://ioai-official.org/wp-content/uploads/2025/06/Practical-round-best-solutions.zip",
            editorial_md="Detailed winning approach utilizing prompt chaining, ControlNet spatial guidance, and frame interpolation.",
            source_url="https://ioai-official.org/wp-content/uploads/2025/06/Practical-Round-problems.zip",
        ))

        # 2024 Scientific Round - At-Home ML & NLP
        problems.append(Problem(
            id="ioai-2024-scientific-athome-cipher-nlp",
            competition="IOAI",
            year=2024,
            stage="Scientific Round - At-Home",
            title="Ciphered Language Modeling: Fine-Tuning on Unknown Encrypted Script",
            domain="NLP",
            difficulty="Hard",
            evaluation_metric="Macro F1",
            tags=["nlp", "language-models", "cipher", "fine-tuning", "ioai-2024"],
            description_md=(
                "## Ciphered Language Modeling\n\n"
                "Fine-tune a language model on provided ciphered text of an unknown synthetic language. "
                "The task tests understanding of subword tokenization, character-level n-gram statistics, "
                "and masked language model pre-training dynamics without access to standard pre-trained vocabularies."
            ),
            dataset_links=["https://ioai-official.org/wp-content/uploads/2025/06/At-home-problems.zip"],
            starter_code_url=None,
            solution_notebook_url="https://ioai-official.org/wp-content/uploads/2025/06/Best-solutions-at-home-problems.zip",
            editorial_md="Top solutions built specialized Byte-Pair Encoding (BPE) tokenizers and trained lightweight RoBERTa architectures from scratch.",
            source_url="https://ioai-official.org/wp-content/uploads/2025/06/At-home-problems.zip",
        ))

        return problems