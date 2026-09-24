#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
AI Olympiad Theory Question Bank Generator.
Combines:
1. Core Olympiad Math & Deep Learning (6 questions - fixed LaTeX)
2. AI/ML Benchmark Suite v2 (30 questions)
3. Vietnam AI Championship (VAIC 2026, 20 questions)
4. International Olympiad in AI (IOAI 2024 Theory Round, 6 questions)
5. VOAI 2025 National Olympiad Qualifier - Ministry of Education & Training (100 questions)
Total: 162 high-quality verified questions with LaTeX math and detailed explanations.
"""
import json
import sys
from pathlib import Path

if hasattr(sys.stdout, "reconfigure"):
    sys.stdout.reconfigure(encoding="utf-8")
if hasattr(sys.stderr, "reconfigure"):
    sys.stderr.reconfigure(encoding="utf-8")

curr_dir = Path(__file__).parent.resolve()
if str(curr_dir) not in sys.path:
    sys.path.insert(0, str(curr_dir))

from theory_packs.aiml_v2 import AIML_V2_QUESTIONS
from theory_packs.vaic_2026 import VAIC_2026_QUESTIONS
from theory_packs.ioai_2024 import IOAI_2024_QUESTIONS
from theory_packs.voai_2025 import VOAI_2025_QUESTIONS

OUTPUT_DIR = curr_dir / "data" / "theory"
OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

THEORY_QUESTIONS = []

def add_q(slug, comp, year, stage, topic, diff, q_text, opts, correct, exp, tags):
    THEORY_QUESTIONS.append({
        "slug": slug,
        "competition": comp,
        "year": year,
        "stage": stage,
        "topic": topic,
        "difficulty": diff,
        "question": q_text.strip(),
        "options": json.dumps([{"id": o[0], "text": o[1]} for o in opts], ensure_ascii=False),
        "correctAnswer": correct,
        "explanation": exp.strip(),
        "tags": tags
    })

def add_pack(pack):
    for q in pack:
        add_q(
            q["slug"], q["competition"], q["year"], q["stage"],
            q["topic"], q["difficulty"], q["question"],
            q["options"], q["correctAnswer"], q["explanation"], q["tags"]
        )

# 1. CORE OLYMPIAD MATH & DEEP LEARNING (6 questions with full LaTeX)
add_q(
    "linear-algebra-svd-rank", "IAIO", 2024, "Vòng thi Lý thuyết",
    "Toán học & Ma trận", "Nâng cao",
    """Cho ma trận dữ liệu $A \\in \\mathbb{R}^{m \\times n}$ có phân rã giá trị kỳ dị (SVD):
$$A = U \\Sigma V^T$$
với các giá trị kỳ dị sắp xếp giảm dần $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0$ ($r = \\text{rank}(A)$).

Theo **Định lý Eckart-Young-Mirsky**, ma trận xấp xỉ hạng $k$ ($k < r$) tối ưu $A_k$ theo chuẩn Frobenius $\\|A - A_k\\|_F$ đạt được sai số bằng bao nhiêu?""",
    [
        ("A", "$\\sqrt{\\sum_{i=k+1}^r \\sigma_i^2}$"),
        ("B", "$\\sum_{i=k+1}^r \\sigma_i$"),
        ("C", "$\\sigma_{k+1}$"),
        ("D", "$\\sqrt{\\sigma_1^2 - \\sigma_{k+1}^2}$")
    ],
    "A",
    """**Đáp án chính xác: A**

**Chứng minh:** Theo định lý Eckart-Young-Mirsky (1936), ma trận xấp xỉ hạng $k$ tốt nhất của $A$ theo chuẩn Frobenius thu được bằng cách giữ lại $k$ giá trị kỳ dị lớn nhất:
$$A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T$$
Khi đó, sai số theo chuẩn Frobenius là:
$$\\|A - A_k\\|_F = \\sqrt{\\sum_{i=k+1}^r \\sigma_i^2}$$
*Lưu ý:* Nếu đề bài hỏi chuẩn phổ ($\\|A - A_k\\|_2$), đáp án sẽ là **C** $(\\sigma_{k+1})$.""",
    "linear-algebra,svd,matrix-calculus,eckart-young"
)

add_q(
    "transformer-scaled-attention", "IOAI", 2025, "Vòng thi Lý thuyết",
    "Transformers & Attention", "Trung bình",
    """Trong cơ chế **Scaled Dot-Product Attention** của kiến trúc Transformer:
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$
Tại sao tích vô hướng $QK^T$ lại phải chia cho hệ số tỷ lệ $\\sqrt{d_k}$?""",
    [
        ("A", "Để giảm độ phức tạp tính toán bộ nhớ từ $O(N^2)$ xuống $O(N)$."),
        ("B", "Giả sử các phần tử của $q$ và $k$ độc lập có kỳ vọng $0$ và phương sai $1$, tích $q^T k$ sẽ có phương sai $d_k$. Chia cho $\\sqrt{d_k}$ giúp giữ phương sai bằng $1$, tránh việc hàm Softmax bị đẩy vào vùng bão hòa gradient."),
        ("C", "Để đảm bảo các ma trận $Q$ và $K$ luôn là ma trận trực giao (orthogonal)."),
        ("D", "Để đảm bảo ma trận trọng số Attention luôn đối xứng qua đường chéo chính.")
    ],
    "B",
    """**Đáp án chính xác: B**

**Giải thích toán học:** Nếu các thành phần của $q$ và $k$ là các biến ngẫu nhiên độc lập có kỳ vọng $0$ và phương sai $1$, thì tích vô hướng $q^T k = \\sum_{i=1}^{d_k} q_i k_i$ có kỳ vọng $0$ và phương sai bằng $d_k$.
Khi $d_k$ lớn, giá trị tích vô hướng có độ lớn rất cao, đẩy hàm Softmax vào vùng có độ dốc cực nhỏ (gradient saturation), dẫn đến hiện tượng triệt tiêu gradient (vanishing gradient). Hệ số $\\frac{1}{\\sqrt{d_k}}$ đưa phương sai trở về $1$.""",
    "transformers,attention,softmax,vanishing-gradient"
)

add_q(
    "probability-kl-divergence-convexity", "IAIO", 2024, "Vòng thi Lý thuyết",
    "Xác suất & Thống kê", "Nâng cao",
    """Cho hai phân phối xác suất rời rạc $P$ và $Q$ trên cùng không gian $\\mathcal{X}$. Độ phân kỳ Kullback-Leibler được định nghĩa:
$$D_{KL}(P \\parallel Q) = \\sum_{x \\in \\mathcal{X}} P(x) \\log \\frac{P(x)}{Q(x)}$$
Bất đẳng thức nào sau đây và tính chất lồi của hàm số nào được dùng để chứng minh khẳng định $D_{KL}(P \\parallel Q) \\ge 0$ (Bất đẳng thức Gibbs)?""",
    [
        ("A", "Bất đẳng thức Cauchy-Schwarz áp dụng cho hai vector $P$ và $Q$."),
        ("B", "Bất đẳng thức Jensen áp dụng cho hàm lồi nghiêm ngặt $f(t) = -\\log(t)$."),
        ("C", "Bất đẳng thức Markov áp dụng cho biến ngẫu nhiên $P(X)/Q(X)$."),
        ("D", "Bất đẳng thức Chebyshev áp dụng cho phương sai của phân phối $Q$.")
    ],
    "B",
    """**Đáp án chính xác: B**

**Chứng minh:**
$$-D_{KL}(P \\parallel Q) = \\sum_{x} P(x) \\log \\frac{Q(x)}{P(x)} = \\mathbb{E}_{x \\sim P}\\left[\\log \\frac{Q(X)}{P(X)}\\right]$$
Vì $g(t) = \\log(t)$ là hàm lõm nghiêm ngặt, theo Bất đẳng thức Jensen:
$$\\mathbb{E}\\left[\\log \\frac{Q(X)}{P(X)}\\right] \\le \\log \\mathbb{E}\\left[\\frac{Q(X)}{P(X)}\\right] = \\log \\left(\\sum_x Q(x)\\right) = \\log(1) = 0$$
Do đó $-D_{KL}(P \\parallel Q) \\le 0 \\implies D_{KL}(P \\parallel Q) \\ge 0$.""",
    "probability,information-theory,kl-divergence,jensen-inequality"
)

add_q(
    "deep-learning-batchnorm-inference", "US-NAAO", 2025, "Vòng thi Lý thuyết",
    "Mạng nơ-ron & Học sâu", "Trung bình",
    """Trong lớp **Batch Normalization (BatchNorm2d)**, điều gì xảy ra với các giá trị trung bình $\\mu$ và phương sai $\\sigma^2$ trong quá trình **Đánh giá / Suy luận (Inference mode - `model.eval()`)**?""",
    [
        ("A", "Tiếp tục tính toán trực tiếp trung bình và phương sai của mini-batch kiểm thử hiện tại."),
        ("B", "Sử dụng trung bình động tích lũy (running mean) và phương sai động (running variance) đã được ước lượng trong suốt quá trình huấn luyện."),
        ("C", "Đặt trung bình bằng 0 và phương sai bằng 1 cho tất cả các kênh."),
        ("D", "Lớp BatchNorm bị bỏ qua hoàn toàn và đồng nhất với phép nhân ma trận đơn vị.")
    ],
    "B",
    """**Đáp án chính xác: B**

Trong giai đoạn suy luận, mạng có thể nhận từng ảnh đơn lẻ (batch size = 1), do đó không thể tính thống kê trên batch. BatchNorm sử dụng các tham số thống kê động tích lũy trong quá trình huấn luyện:
$$\\mu_{\\text{run}} \\leftarrow (1 - m) \\mu_{\\text{run}} + m \\mu_{\\text{batch}}$$
để đảm bảo tính tất định của phép dự đoán.""",
    "deep-learning,batch-norm,inference,pytorch"
)

add_q(
    "optimization-adam-momentum", "IAIO", 2025, "Vòng thi Lý thuyết",
    "Tối ưu hóa & Đạo đức AI", "Nâng cao",
    """Trong thuật toán tối ưu **Adam**, tại sao cần bước hiệu chỉnh độ lệch (Bias Correction) cho các ước lượng mô-men bậc một $m_t$ và bậc hai $v_t$:
$$\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}$$?""",
    [
        ("A", "Vì các vector $m_0$ và $v_0$ được khởi tạo bằng vector $0$, khiến cho $m_t$ và $v_t$ bị lệch về phía $0$ trong các bước lặp đầu tiên."),
        ("B", "Để đảm bảo tốc độ học learning rate giảm dần theo quy tắc $1/t$."),
        ("C", "Để ngăn chặn hiện tượng bùng nổ gradient khi chia cho $\\sqrt{v_t} + \\epsilon$."),
        ("D", "Để ép cho ma trận Hessian luôn xác định dương.")
    ],
    "A",
    """**Đáp án chính xác: A**

Khi $m_0 = 0$, ta có khai triển $\\mathbb{E}[m_t] = \\mathbb{E}[g_t](1 - \\beta_1^t)$. Vì $\\beta_1 \\approx 0.9$, ở các bước đầu $1 - \\beta_1^t \\ll 1$, làm ước lượng bị chệch nghiêm trọng về $0$. Chia cho $(1 - \\beta_1^t)$ giúp thu được ước lượng không chệch $\\mathbb{E}[\\hat{m}_t] = \\mathbb{E}[g_t]$.""",
    "optimization,adam,bias-correction,gradient-descent"
)

add_q(
    "rl-bellman-optimality", "IAIO", 2025, "Vòng thi Lý thuyết",
    "Học tăng cường", "Chung kết Quốc tế",
    """Phương trình Tối ưu Bellman (Bellman Optimality Equation) cho hàm giá trị hành động tối ưu $Q^*(s, a)$ trong Tiến trình Quyết định Markov (MDP) có dạng nào dưới đây?""",
    [
        ("A", "$$Q^*(s, a) = R(s, a) + \\gamma \\sum_{s'} P(s'|s, a) \\max_{a'} Q^*(s', a')$$"),
        ("B", "$$Q^*(s, a) = R(s, a) + \\gamma \\max_{a'} \\sum_{s'} P(s'|s, a) Q^*(s', a')$$"),
        ("C", "$$Q^*(s, a) = \\max_a [ R(s, a) + \\gamma Q^*(s', a') ]$$"),
        ("D", "$$Q^*(s, a) = \\sum_a \\pi(a|s) [ R(s, a) + \\gamma \\sum_{s'} P(s'|s, a) V^*(s') ]$$")
    ],
    "A",
    """**Đáp án chính xác: A**

Phương trình tối ưu Bellman cho hàm $Q^*(s, a)$ phân rã giá trị thành phần thưởng tức thì $R(s, a)$ cộng với kỳ vọng chiết khấu của giá trị tối ưu tại trạng thái kế tiếp $\\max_{a'} Q^*(s', a')$. Toán tử $\\max$ phải nằm bên trong tổng theo $s'$ vì môi trường chuyển trạng thái ngẫu nhiên.""",
    "reinforcement-learning,bellman-equation,mdp,q-learning"
)

# 2. Add AI/ML Suite v2 (30 questions)
add_pack(AIML_V2_QUESTIONS)

# 3. Add VAIC 2026 (20 questions)
add_pack(VAIC_2026_QUESTIONS)

# 4. Add IOAI 2024 (6 questions)
add_pack(IOAI_2024_QUESTIONS)

# 5. Add VOAI 2025 (100 questions)
add_pack(VOAI_2025_QUESTIONS)

print(f"Tổng số câu hỏi lý thuyết đã tích hợp: {len(THEORY_QUESTIONS)} câu.")

# Lưu các file JSON chuẩn
all_file = OUTPUT_DIR / "all_theory_questions.json"
with open(all_file, "w", encoding="utf-8") as f:
    json.dump(THEORY_QUESTIONS, f, ensure_ascii=False, indent=2)
print(f"✓ Đã lưu toàn bộ câu hỏi vào: {all_file}")

with open(OUTPUT_DIR / "voai_2025_theory_100.json", "w", encoding="utf-8") as f:
    json.dump(VOAI_2025_QUESTIONS, f, ensure_ascii=False, indent=2)

with open(OUTPUT_DIR / "vaic_2026_theory_20.json", "w", encoding="utf-8") as f:
    json.dump(VAIC_2026_QUESTIONS, f, ensure_ascii=False, indent=2)

with open(OUTPUT_DIR / "aiml_v2_theory_30.json", "w", encoding="utf-8") as f:
    json.dump(AIML_V2_QUESTIONS, f, ensure_ascii=False, indent=2)

with open(OUTPUT_DIR / "ioai_2024_theory.json", "w", encoding="utf-8") as f:
    json.dump(IOAI_2024_QUESTIONS, f, ensure_ascii=False, indent=2)

print("✓ Đã hoàn tất xuất bản toàn bộ các gói câu hỏi lý thuyết Olympic AI.")
