# -*- coding: utf-8 -*-
"""
AI Olympiad Theory Question Packs.
"""
try:
    from .aiml_v2 import AIML_V2_QUESTIONS
    from .vaic_2026 import VAIC_2026_QUESTIONS
    from .ioai_2024 import IOAI_2024_QUESTIONS
    from .voai_2025 import VOAI_2025_QUESTIONS
except ImportError:
    from aiml_v2 import AIML_V2_QUESTIONS
    from vaic_2026 import VAIC_2026_QUESTIONS
    from ioai_2024 import IOAI_2024_QUESTIONS
    from voai_2025 import VOAI_2025_QUESTIONS

__all__ = [
    "AIML_V2_QUESTIONS",
    "VAIC_2026_QUESTIONS",
    "IOAI_2024_QUESTIONS",
    "VOAI_2025_QUESTIONS",
]
