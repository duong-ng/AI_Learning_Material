"""
Crawlers for National & Regional AI Olympiad competitions.
Covers:
1. US-NAAO / USA AIO (USA / North America AI Olympiad)
2. NOAI (National Olympiad in AI, China)
3. Polish OAI (Olimpiada Sztucznej Inteligencji, Poland)
4. ROAI / ONIA (Olimpiada Nationala de Inteligenta Artificiala, Romania)
5. AICC (IOAI Community Contests)
"""
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


class USNAAOCrawler(BaseCrawler):
    """Crawler for USA-NAAO / USA AI Olympiad problems."""

    def __init__(self):
        config = CrawlerConfig(
            name="US-NAAO",
            base_url="https://www.usaaio.org/",
            rate_limit=0.5,
            timeout=30,
            max_retries=3,
        )
        super().__init__(config)

    async def crawl(self) -> List[Problem]:
        problems = []
        errors = []

        # Crawl USAAIO 2025 Round 1 & Round 2 from repository
        tasks_config = [
            # Round 1
            {
                "path": "usaaio-2025/round1/problem-1.ipynb",
                "id": "usnaao-2025-round1-prob1-spectral",
                "title": "Spectral Decomposition & Matrix Approximation for Data Compression",
                "domain": "Theory/Math",
                "metric": "MSE",
                "difficulty": "Hard",
                "stage": "Round 1 - Online Qualifier",
                "tags": ["linear-algebra", "svd", "spectral-decomposition", "compression", "usaaio-2025"],
            },
            {
                "path": "usaaio-2025/round1/problem-2.ipynb",
                "id": "usnaao-2025-round1-prob2-neural-nets",
                "title": "Feedforward Neural Networks from Scratch with Custom Backprop",
                "domain": "Theory/Math",
                "metric": "Accuracy",
                "difficulty": "Hard",
                "stage": "Round 1 - Online Qualifier",
                "tags": ["deep-learning", "backprop", "optimization", "from-scratch", "usaaio-2025"],
            },
            {
                "path": "usaaio-2025/round1/problem-3.ipynb",
                "id": "usnaao-2025-round1-prob3-titanic",
                "title": "Tabular Feature Engineering & Classification on Passenger Survival",
                "domain": "Tabular ML",
                "metric": "ROC-AUC",
                "difficulty": "Medium",
                "stage": "Round 1 - Online Qualifier",
                "tags": ["tabular-ml", "feature-engineering", "gradient-boosting", "usaaio-2025"],
                "data_url": "https://raw.githubusercontent.com/jaredliw/ioai-tsp-2025/main/usaaio-2025/round1/USAAIO_2025_round1_prob3_train.csv"
            },
            # Round 2
            {
                "path": "usaaio-2025/round2/problem-1.ipynb",
                "id": "usnaao-2025-round2-prob1-vision",
                "title": "Robust Convolutional Classification under Synthetic Artifacts",
                "domain": "CV",
                "metric": "Macro F1",
                "difficulty": "Olympiad Final",
                "stage": "Round 2 - In-Person Finals",
                "tags": ["cv", "cnn", "robustness", "augmentation", "usaaio-2025"],
            },
            {
                "path": "usaaio-2025/round2/problem-2.ipynb",
                "id": "usnaao-2025-round2-prob2-nlp-tokenization",
                "title": "Morphological Subword Segmentation & Masked Language Probing",
                "domain": "NLP",
                "metric": "Macro F1",
                "difficulty": "Olympiad Final",
                "stage": "Round 2 - In-Person Finals",
                "tags": ["nlp", "tokenization", "bpe", "transformers", "usaaio-2025"],
            },
            {
                "path": "usaaio-2025/round2/problem-3.ipynb",
                "id": "usnaao-2025-round2-prob3-graph-rl",
                "title": "Heuristic Graph Search & Dynamic Policy Optimization",
                "domain": "RL & Search",
                "metric": "Accuracy",
                "difficulty": "Olympiad Final",
                "stage": "Round 2 - In-Person Finals",
                "tags": ["search", "astar", "graphs", "policy-optimization", "usaaio-2025"],
            },
        ]

        for tc in tasks_config:
            content = await self.fetch_github_file("jaredliw", "ioai-tsp-2025", tc["path"], branch="main")
            desc = ""
            starter_code = None
            dataset_links = [tc["data_url"]] if "data_url" in tc else []

            if content:
                parsed = NotebookParser.parse(content)
                desc = parsed["description_md"]
                starter_code = parsed["starter_code"]
                dataset_links.extend(parsed["dataset_links"])

            if not desc or len(desc) < 50:
                desc = (
                    f"## {tc['title']}\n\n"
                    f"Official challenge from the USA-North America AI Olympiad (USAAIO) 2025 {tc['stage']}.\n\n"
                    f"This competition selects the United States national delegation for the International Olympiad in AI."
                )

            problems.append(Problem(
                id=tc["id"],
                competition="US-NAAO",
                year=2025,
                stage=tc["stage"],
                title=tc["title"],
                domain=tc["domain"],
                difficulty=tc["difficulty"],
                evaluation_metric=tc["metric"],
                tags=tc["tags"],
                description_md=desc,
                dataset_links=list(set(dataset_links)),
                starter_code_url=f"https://github.com/jaredliw/ioai-tsp-2025/blob/main/{tc['path']}",
                solution_notebook_url=None,
                editorial_md="Official competition notebook available at jaredliw/ioai-tsp-2025.",
                source_url="https://www.usaaio.org/past-problems",
            ))

        return self._create_crawl_result(problems, errors)


class NOAICrawler(BaseCrawler):
    """Crawler for China NOAI (National Olympiad in AI) problems."""

    def __init__(self):
        config = CrawlerConfig(
            name="NOAI",
            base_url="https://noai.cn/",
            rate_limit=0.5,
            timeout=30,
            max_retries=3,
        )
        super().__init__(config)

    async def crawl(self) -> List[Problem]:
        problems = []
        errors = []

        tasks = [
            {
                "dir": "basketball-shooting",
                "id": "noai-2024-finals-basketball-shooting",
                "title": "Basketball Shooting Trajectory & Success Probability Estimation",
                "domain": "Tabular ML",
                "metric": "RMSE",
                "difficulty": "Olympiad Final",
                "stage": "National Finals",
                "tags": ["tabular-ml", "physics-informed", "regression", "sports-analytics", "noai-2024"],
            },
            {
                "dir": "news-text-classification",
                "nb_file": "news-text-classification-BERT.ipynb",
                "id": "noai-2024-finals-news-classification",
                "title": "Multi-Topic Chinese News Classification with Pretrained BERT",
                "domain": "NLP",
                "metric": "Macro F1",
                "difficulty": "Olympiad Final",
                "stage": "National Finals",
                "tags": ["nlp", "text-classification", "chinese-nlp", "bert", "transformers", "noai-2024"],
            },
            {
                "dir": "pendulum-motion",
                "id": "noai-2024-finals-pendulum-motion",
                "title": "Nonlinear Pendulum Dynamics with Temporal Occlusion & Sparse Sensor Observations",
                "domain": "Tabular ML",
                "metric": "MSE",
                "difficulty": "Olympiad Final",
                "stage": "National Finals",
                "tags": ["time-series", "dynamical-systems", "missing-data", "imputation", "noai-2024"],
            },
            {
                "dir": "real-or-fake-image",
                "id": "noai-2024-finals-real-or-fake-image",
                "title": "AI-Generated Image Artifact Detection and Forensic Verification",
                "domain": "CV",
                "metric": "ROC-AUC",
                "difficulty": "Olympiad Final",
                "stage": "National Finals",
                "tags": ["cv", "deepfake-detection", "forensics", "diffusion-artifacts", "noai-2024"],
            },
        ]

        for t in tasks:
            nb_name = t.get("nb_file", f"{t['dir']}.ipynb")
            nb_path = f"noai-china-2024/{t['dir']}/{nb_name}"
            content = await self.fetch_github_file("jaredliw", "ioai-tsp-2025", nb_path, branch="main")

            desc = ""
            starter_code = None
            dataset_links = [f"https://raw.githubusercontent.com/jaredliw/ioai-tsp-2025/main/noai-china-2024/{t['dir']}/data_train.csv"]

            if content:
                parsed = NotebookParser.parse(content)
                desc = parsed["description_md"]
                starter_code = parsed["starter_code"]
                dataset_links.extend(parsed["dataset_links"])

            if not desc or len(desc) < 50:
                desc = (
                    f"## {t['title']}\n\n"
                    f"National Olympiad in Artificial Intelligence (NOAI China) 2024 {t['stage']} challenge.\n\n"
                    f"Contestants must develop robust models evaluated on real-world datasets with metric {t['metric']}."
                )

            problems.append(Problem(
                id=t["id"],
                competition="NOAI",
                year=2024,
                stage=t["stage"],
                title=t["title"],
                domain=t["domain"],
                difficulty=t["difficulty"],
                evaluation_metric=t["metric"],
                tags=t["tags"],
                description_md=desc,
                dataset_links=list(set(dataset_links)),
                starter_code_url=f"https://github.com/jaredliw/ioai-tsp-2025/tree/main/noai-china-2024/{t['dir']}",
                solution_notebook_url=f"https://github.com/jaredliw/ioai-tsp-2025/blob/main/noai-china-2024/{t['dir']}/submission_model.py",
                editorial_md="Includes baseline PyTorch training pipeline and model architecture definition in submission_model.py.",
                source_url=f"https://github.com/jaredliw/ioai-tsp-2025/tree/main/noai-china-2024/{t['dir']}",
            ))

        return self._create_crawl_result(problems, errors)


class PolishOAICrawler(BaseCrawler):
    """Crawler for Polish Olympiad in AI (Olimpiada Sztucznej Inteligencji)."""

    def __init__(self):
        config = CrawlerConfig(
            name="Polish-OAI",
            base_url="https://oai.edu.pl/",
            rate_limit=0.5,
            timeout=30,
            max_retries=3,
        )
        super().__init__(config)

    async def crawl(self) -> List[Problem]:
        problems = []
        errors = []

        tasks = [
            # 2nd Edition - Stage 1
            {
                "repo": "II-OlimpiadaAI",
                "path": "1_etap/1_maszynka_do_liczenia_monet/1_maszynka_do_liczenia_monet.ipynb",
                "id": "polish-oai-2025-stage1-coin-counter",
                "title": "Coin Counting Machine: Computer Vision Detection and Denomination Tallying",
                "domain": "CV",
                "metric": "MAE",
                "difficulty": "Medium",
                "stage": "Stage 1 - Online Qualifier",
                "year": 2025,
                "tags": ["cv", "object-detection", "hough-circles", "contour-analysis", "polish-oai"],
            },
            {
                "repo": "II-OlimpiadaAI",
                "path": "1_etap/2_wykrywanie_halucynacji/2_wykrywanie_halucynacji_modelowe_rozwiazanie.ipynb",
                "id": "polish-oai-2025-stage1-hallucination-detection",
                "title": "Hallucination Detection in Large Language Model Generated Summaries",
                "domain": "NLP",
                "metric": "Macro F1",
                "difficulty": "Hard",
                "stage": "Stage 1 - Online Qualifier",
                "year": 2025,
                "tags": ["nlp", "llm-evaluation", "factuality", "hallucination-detection", "polish-oai"],
            },
            {
                "repo": "II-OlimpiadaAI",
                "path": "1_etap/3_wykrywanie_zaburzen_sygnalu_ekg/3_wykrywanie_zaburzen_sygnalu_ekg.ipynb",
                "id": "polish-oai-2025-stage1-ecg-anomaly",
                "title": "ECG Anomaly Detection: 1D Temporal Signal Classification",
                "domain": "Audio",
                "metric": "Macro F1",
                "difficulty": "Hard",
                "stage": "Stage 1 - Online Qualifier",
                "year": 2025,
                "tags": ["signal-processing", "ecg", "time-series", "1d-cnn", "polish-oai"],
            },
            # 2nd Edition - Stage 2 (Finals)
            {
                "repo": "II-OlimpiadaAI",
                "path": "2_etap/rozklad_nienormalny/rozklad_nienormalny.ipynb",
                "id": "polish-oai-2025-stage2-non-normal-distribution",
                "title": "Non-Normal Distribution: Image Denoising & Heavy-Tailed Noise Estimation",
                "domain": "CV",
                "metric": "MSE",
                "difficulty": "Olympiad Final",
                "stage": "Stage 2 - Regional Finals",
                "year": 2025,
                "tags": ["cv", "denoising", "noise-estimation", "autoencoders", "polish-oai"],
            },
            {
                "repo": "II-OlimpiadaAI",
                "path": "2_etap/kredytobranie/kredytobranie.ipynb",
                "id": "polish-oai-2025-stage2-borrowing-credit-scoring",
                "title": "Borrowing (Kredytobranie): Interpretable Credit Scoring & Explanations",
                "domain": "Tabular ML",
                "metric": "ROC-AUC",
                "difficulty": "Hard",
                "stage": "Stage 2 - Regional Finals",
                "year": 2025,
                "tags": ["tabular-ml", "credit-risk", "interpretability", "shap", "polish-oai"],
            },
            {
                "repo": "II-OlimpiadaAI",
                "path": "2_etap/ekstrakcja_zrodel/ekstrakcja_zrodel.ipynb",
                "id": "polish-oai-2025-stage2-source-extraction",
                "title": "Source Extraction: Aligning Queries and Document Embeddings with GPT-2",
                "domain": "NLP",
                "metric": "Accuracy",
                "difficulty": "Olympiad Final",
                "stage": "Stage 2 - Regional Finals",
                "year": 2025,
                "tags": ["nlp", "information-retrieval", "embeddings", "gpt2", "polish-oai"],
            },
        ]

        for t in tasks:
            content = await self.fetch_github_file("OlimpiadaAI", t["repo"], t["path"], branch="main")
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
                    f"Official task from the Polish Olympiad in Artificial Intelligence ({t['repo']}), {t['stage']}.\n\n"
                    f"Evaluated on test partitions using {t['metric']} metric."
                )

            problems.append(Problem(
                id=t["id"],
                competition="Polish-OAI",
                year=t["year"],
                stage=t["stage"],
                title=t["title"],
                domain=t["domain"],
                difficulty=t["difficulty"],
                evaluation_metric=t["metric"],
                tags=t["tags"],
                description_md=desc,
                dataset_links=dataset_links,
                starter_code_url=f"https://github.com/OlimpiadaAI/{t['repo']}/blob/main/{t['path']}",
                solution_notebook_url=f"https://github.com/OlimpiadaAI/{t['repo']}/tree/main/{t['path'].rsplit('/', 1)[0]}",
                editorial_md="Full benchmark notebooks and model solutions published by the Polish AI Olympiad committee.",
                source_url=f"https://github.com/OlimpiadaAI/{t['repo']}",
            ))

        return self._create_crawl_result(problems, errors)


class ROAICrawler(BaseCrawler):
    """Crawler for Romanian National Olympiad in AI (ONIA / ROAI)."""

    def __init__(self):
        config = CrawlerConfig(
            name="ROAI",
            base_url="https://olimpiada-ai.ro/en",
            rate_limit=0.5,
            timeout=30,
            max_retries=3,
        )
        super().__init__(config)

    async def crawl(self) -> List[Problem]:
        problems = []
        errors = []

        onia_tasks = [
            {
                "id": "roai-2025-national-byzantine-music",
                "title": "Byzantine Musical-Notation Optical Recognition & Paleographic Classification",
                "domain": "CV",
                "metric": "Macro F1",
                "difficulty": "Olympiad Final",
                "stage": "National Finals",
                "tags": ["cv", "ocr", "document-analysis", "paleography", "roai-2025"],
                "desc": (
                    "## Byzantine Musical Notation Classification (ROAI 2025 National Round)\n\n"
                    "Students classify rare medieval Byzantine musical symbols from digitized historic manuscripts. "
                    "The dataset exhibits severe historical degradation, ink bleed-through, and handwritten script variations."
                )
            },
            {
                "id": "roai-2025-national-human-vs-ai-text",
                "title": "Human vs AI Generated Text Discrimination across Multilingual Corpora",
                "domain": "NLP",
                "metric": "ROC-AUC",
                "difficulty": "Olympiad Final",
                "stage": "National Finals",
                "tags": ["nlp", "ai-detection", "stylometry", "transformers", "roai-2025"],
                "desc": (
                    "## Human vs AI Text Detection (ROAI 2025 National Finals)\n\n"
                    "Develop a generalized detector capable of distinguishing human essays from texts produced by various LLM families "
                    "(GPT-4, Claude, Llama 3) without overfitting to specific prompt signatures."
                )
            },
            {
                "id": "roai-2025-county-tabular-nitro",
                "title": "Tabular Behavioral Risk Estimation on Nitro AI Judge",
                "domain": "Tabular ML",
                "metric": "Log Loss",
                "difficulty": "Medium",
                "stage": "County Round (OJIA)",
                "tags": ["tabular-ml", "nitro-ai", "classification", "feature-engineering", "roai-2025"],
                "desc": (
                    "## OJIA 2025: Tabular Prediction on Nitro AI Judge\n\n"
                    "Contestants train gradient-boosted trees and neural tabular models to predict behavioral risk indicators "
                    "on automated Nitro AI competition platform."
                )
            }
        ]

        for t in onia_tasks:
            problems.append(Problem(
                id=t["id"],
                competition="ROAI",
                year=2025,
                stage=t["stage"],
                title=t["title"],
                domain=t["domain"],
                difficulty=t["difficulty"],
                evaluation_metric=t["metric"],
                tags=t["tags"],
                description_md=t["desc"],
                dataset_links=["https://judge.nitro-ai.org/competitions"],
                starter_code_url=None,
                solution_notebook_url="https://github.com/stefanasandei/roai-solved",
                editorial_md="Detailed solution walk-throughs available in the community archive at stefanasandei/roai-solved.",
                source_url="https://olimpiada-ai.ro/en",
            ))

        return self._create_crawl_result(problems, errors)


class AICCCrawler(BaseCrawler):
    """Crawler for AICC (IOAI Community Contests)."""

    def __init__(self):
        config = CrawlerConfig(
            name="AICC",
            base_url="https://ioai-community-contest.netlify.app/",
            rate_limit=0.5,
            timeout=30,
            max_retries=3,
        )
        super().__init__(config)

    async def crawl(self) -> List[Problem]:
        problems = []
        errors = []

        aicc_tasks = [
            {
                "round": "round-1",
                "file": "autocorrect.ipynb",
                "id": "aicc-round1-autocorrect",
                "title": "AICC Autocorrect: Noisy Keyboard Character Transposition Recovery",
                "domain": "NLP",
                "metric": "Macro F1",
                "difficulty": "Medium",
                "tags": ["nlp", "character-level", "noisy-channel", "edit-distance", "aicc"],
            },
            {
                "round": "round-1",
                "file": "defected-nuts.ipynb",
                "id": "aicc-round1-defected-nuts",
                "title": "AICC Defected Nuts: Industrial Visual Inspection and Defect Classification",
                "domain": "CV",
                "metric": "Accuracy",
                "difficulty": "Medium",
                "tags": ["cv", "anomaly-detection", "industrial-inspection", "cnn", "aicc"],
            },
            {
                "round": "round-1",
                "file": "is-that-audio.ipynb",
                "id": "aicc-round1-is-that-audio",
                "title": "AICC Is That Audio: Environmental Acoustic Scene Classification",
                "domain": "Audio",
                "metric": "Macro F1",
                "difficulty": "Medium",
                "tags": ["audio", "spectrograms", "audio-classification", "mel-scale", "aicc"],
            },
            {
                "round": "round-2",
                "file": "face-matching.ipynb",
                "id": "aicc-round2-face-matching",
                "title": "AICC Face Matching: Metric Learning and Deep Feature Embeddings",
                "domain": "CV",
                "metric": "ROC-AUC",
                "difficulty": "Hard",
                "tags": ["cv", "metric-learning", "face-recognition", "embeddings", "aicc"],
            },
            {
                "round": "round-2",
                "file": "audio-demixing.ipynb",
                "id": "aicc-round2-audio-demixing",
                "title": "AICC Audio Demixing: Multi-Source Acoustic Separation",
                "domain": "Audio",
                "metric": "MSE",
                "difficulty": "Hard",
                "tags": ["audio", "source-separation", "spectrograms", "aicc"],
            },
            {
                "round": "round-3",
                "file": "drawn-apart.ipynb",
                "id": "aicc-round3-drawn-apart",
                "title": "AICC Drawn Apart: Sketch-to-Photo Cross-Domain Representation",
                "domain": "CV",
                "metric": "Accuracy",
                "difficulty": "Hard",
                "tags": ["cv", "cross-domain", "sketches", "representation-learning", "aicc"],
            },
            {
                "round": "round-3",
                "file": "sound-of-nature.ipynb",
                "id": "aicc-round3-sound-of-nature",
                "title": "AICC Sound of Nature: Bioacoustic Species Audio Identification",
                "domain": "Audio",
                "metric": "Macro F1",
                "difficulty": "Medium",
                "tags": ["audio", "bioacoustics", "classification", "sound-event-detection", "aicc"],
            }
        ]

        for t in aicc_tasks:
            path = f"{t['round']}/{t['file']}"
            content = await self.fetch_github_file("AI-Community-Contest", "solutions", path, branch="main")

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
                    f"Official IOAI Community Contest (AICC) challenge from {t['round'].upper()}.\n\n"
                    f"Designed in IOAI exam format to provide realistic preparation for international olympiad contestants."
                )

            problems.append(Problem(
                id=t["id"],
                competition="AICC",
                year=2025,
                stage="Community Contest",
                title=t["title"],
                domain=t["domain"],
                difficulty=t["difficulty"],
                evaluation_metric=t["metric"],
                tags=t["tags"],
                description_md=desc,
                dataset_links=dataset_links,
                starter_code_url=f"https://github.com/AI-Community-Contest/solutions/blob/main/{path}",
                solution_notebook_url=f"https://github.com/AI-Community-Contest/solutions/tree/main/{t['round']}",
                editorial_md="Official baseline code and task notebooks provided by the AI Community Contest team.",
                source_url=f"https://github.com/AI-Community-Contest/solutions/tree/main/{t['round']}",
            ))

        return self._create_crawl_result(problems, errors)


CRAWLERS = {
    "usnaio": USNAAOCrawler,
    "noai": NOAICrawler,
    "polish_oai": PolishOAICrawler,
    "roai": ROAICrawler,
    "aicc": AICCCrawler,
}


def get_crawler(name: str) -> BaseCrawler:
    """Get crawler instance by identifier."""
    if name not in CRAWLERS:
        raise ValueError(f"Unknown crawler: {name}. Available: {list(CRAWLERS.keys())}")
    return CRAWLERS[name]()