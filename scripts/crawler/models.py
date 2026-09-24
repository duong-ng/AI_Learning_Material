"""
Data models for AI Olympiad problems.
Defines the normalized schema for all crawled problems.
"""
from enum import Enum
from typing import Optional, Union, List
from datetime import datetime
from pydantic import BaseModel, Field


class Competition(str, Enum):
    """Supported AI Olympiad competitions."""
    IOAI = "IOAI"
    IAIO = "IAIO"
    US_NAAO = "US-NAAO"
    NOAI = "NOAI"
    POLISH_OAI = "Polish-OAI"
    ROAI = "ROAI"
    AICC = "AICC"
    OTHER = "Other"


class Domain(str, Enum):
    """AI/ML problem domains."""
    TABULAR_ML = "Tabular ML"
    NLP = "NLP"
    CV = "CV"
    AUDIO = "Audio"
    RL_SEARCH = "RL & Search"
    THEORY_MATH = "Theory/Math"
    MULTIMODAL = "Multimodal"
    GENERATIVE = "Generative AI"
    OTHER = "Other"


class Difficulty(str, Enum):
    """Problem difficulty levels."""
    EASY = "Easy"
    MEDIUM = "Medium"
    HARD = "Hard"
    OLYMPIAD_FINAL = "Olympiad Final"


class EvaluationMetric(str, Enum):
    """Common evaluation metrics."""
    MACRO_F1 = "Macro F1"
    MICRO_F1 = "Micro F1"
    ACCURACY = "Accuracy"
    ROC_AUC = "ROC-AUC"
    MSE = "MSE"
    RMSE = "RMSE"
    MAE = "MAE"
    IOU = "IoU"
    MAP = "mAP"
    BLEU = "BLEU"
    PERPLEXITY = "Perplexity"
    LOG_LOSS = "Log Loss"
    OTHER = "Other"


class Problem(BaseModel):
    """
    Normalized schema for an AI Olympiad problem.
    All crawled problems are converted to this format.
    """
    # Core identification
    id: str = Field(..., description="Unique identifier: competition-year-stage-domain-N")
    competition: str = Field(..., description="Competition name, e.g. IOAI, IAIO, US-NAAO, NOAI, Polish-OAI, ROAI, AICC")
    year: int = Field(..., ge=2015, le=2030)
    stage: str = Field(..., description="Stage, e.g. 'Scientific Round - On-Site', 'Scientific Round - At-Home', 'Practical Round - On-Site'")
    title: str = Field(..., min_length=1, max_length=500)

    # Classification
    domain: str = Field(..., description="Domain: Tabular ML, NLP, CV, Audio, RL & Search, Theory/Math, Multimodal, Generative AI")
    difficulty: str = Field(default="Hard", description="Difficulty: Easy, Medium, Hard, Olympiad Final")
    evaluation_metric: str = Field(default="Macro F1", description="Metric: Macro F1, ROC-AUC, Accuracy, MSE, etc.")
    tags: List[str] = Field(default_factory=list)

    # Content
    description_md: str = Field(..., description="Full problem description in Markdown")
    dataset_links: List[str] = Field(default_factory=list)
    starter_code_url: Optional[str] = None
    solution_notebook_url: Optional[str] = None
    editorial_md: Optional[str] = Field(default=None, description="Solution editorial in Markdown")

    # Metadata
    source_url: Optional[str] = Field(default=None, description="Original source URL")
    crawled_at: datetime = Field(default_factory=datetime.utcnow)
    version: int = Field(default=1, description="Schema version for migrations")

    class Config:
        use_enum_values = True
        populate_by_name = True
        json_schema_extra = {
            "example": {
                "id": "ioai-2024-scientific-nlp-1",
                "competition": "IOAI",
                "year": 2024,
                "stage": "Scientific Round - On-Site",
                "title": "Sentiment Classification on Multilingual Tweets",
                "domain": "NLP",
                "difficulty": "Hard",
                "evaluation_metric": "Macro F1",
                "tags": ["transformers", "classification", "bert", "pytorch"],
                "description_md": "## Problem Statement\n\nClassify sentiment...",
                "dataset_links": ["https://example.com/dataset.zip"],
                "starter_code_url": "https://github.com/ioai/starter-code",
                "solution_notebook_url": "https://github.com/ioai/solutions",
                "editorial_md": "## Solution\n\nUse a multilingual BERT...",
                "source_url": "https://ioai-official.org/tasks/2024/scientific/nlp-1",
                "crawled_at": "2024-01-15T10:30:00Z",
                "version": 1
            }
        }


class CrawlResult(BaseModel):
    """Result of a crawl operation."""
    success: bool
    problems: List[Problem] = Field(default_factory=list)
    errors: List[str] = Field(default_factory=list)
    source: str
    crawled_at: datetime = Field(default_factory=datetime.utcnow)


class CrawlerConfig(BaseModel):
    """Configuration for a crawler."""
    name: str
    base_url: str
    rate_limit: float = Field(default=0.5, description="Seconds between requests")
    timeout: int = Field(default=30, description="Request timeout in seconds")
    max_retries: int = Field(default=3)
    use_playwright: bool = Field(default=False, description="Whether to use Playwright for JS-heavy sites")
    selectors: dict[str, str] = Field(default_factory=dict, description="CSS/XPath selectors for parsing")