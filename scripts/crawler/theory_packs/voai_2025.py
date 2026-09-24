# -*- coding: utf-8 -*-
"""
Bộ GD&ĐT - Đề thi Tuyển chọn Đội tuyển Olympic AI Quốc gia (VOAI 2025)
Toàn bộ 100 câu trắc nghiệm chính thức (Mã đề: 006).
"""
try:
    from .voai_2025_p1 import VOAI_P1_QUESTIONS
    from .voai_2025_p2 import VOAI_P2_QUESTIONS
except ImportError:
    from voai_2025_p1 import VOAI_P1_QUESTIONS
    from voai_2025_p2 import VOAI_P2_QUESTIONS

VOAI_2025_QUESTIONS = VOAI_P1_QUESTIONS + VOAI_P2_QUESTIONS
