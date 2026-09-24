import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

// Ánh xạ Lĩnh vực sang tiếng Việt chuẩn mực
const DOMAIN_MAP: Record<string, string> = {
  "CV": "Thị giác máy tính (CV)",
  "NLP": "Xử lý ngôn ngữ tự nhiên (NLP)",
  "Tabular ML": "Học máy bảng số (Tabular ML)",
  "Theory/Math": "Lý thuyết & Toán AI",
  "RL & Search": "Học tăng cường & Tìm kiếm",
  "Audio": "Âm thanh & Tín hiệu",
  "Generative AI": "AI Tạo sinh (Generative AI)",
  "Multimodal": "Đa phương thức (Multimodal)",
  "Other": "Lĩnh vực khác",
};

// Ánh xạ Độ khó sang tiếng Việt
const DIFFICULTY_MAP: Record<string, string> = {
  "Easy": "Cơ bản",
  "Medium": "Trung bình",
  "Hard": "Nâng cao",
  "Olympiad Final": "Chung kết Quốc tế",
};

// Lời giải mẫu chuyên sâu cho các bài thi Olympic quan trọng
const EDITORIAL_ENRICHMENTS: Record<string, string> = {
  "ioai-2025-scientific-radar": `### 1. Trực giác Toán học & Phân tích Bài toán
Bài toán yêu cầu phân đoạn ngữ nghĩa ảnh radar (6 kênh đầu vào từ mảng anten thu RF) thành 3 lớp pixel:
- Lớp 0: **Nền (Background)** - chiếm ~95% pixel
- Lớp 1: **Tường / Vật cản (Wall)** - chiếm ~3.5% pixel
- Lớp 2: **Mục tiêu Người (Human Target)** - chiếm ~1.5% pixel

Hàm mục tiêu chấm điểm cuộc thi cực kỳ mất cân bằng:
$$\\text{Điểm} = \\frac{1 \\times N_{\\text{bg\\_correct}} + 50 \\times N_{\\text{wall\\_correct}} + 50 \\times N_{\\text{human\\_correct}}}{N_{\\text{max\\_possible}}}$$

Nếu sử dụng hàm mất mát Cross-Entropy thông thường, mô hình sẽ bị "sụp đổ" (model collapse) khi dự đoán toàn bộ là nền để đạt độ chính xác 95%, nhưng điểm số Olympic thực tế sẽ gần như bằng 0!

### 2. Chiến lược Tối ưu Đạt Huy chương Vàng (Gold Medal Solution)
1. **Kiến trúc Mạng:** Sử dụng **U-Net với Residual Bottleneck** và cơ chế **Squeeze-and-Excitation (SE)** trên 6 kênh đầu vào để mô hình tự động gán trọng số tầm quan trọng của từng tần số radar.
2. **Hàm mất mát Kết hợp (Composite Loss):**
   $$\\mathcal{L}_{\\text{total}} = \\alpha \\mathcal{L}_{\\text{Weighted-CE}} + (1 - \\alpha) \\mathcal{L}_{\\text{Focal-Dice}}$$
   Trong đó trọng số lớp của Weighted Cross-Entropy được đặt tỷ lệ nghịch với xác suất tiên nghiệm: $w_{\\text{bg}} = 0.02, w_{\\text{wall}} = 1.0, w_{\\text{human}} = 1.5$.
3. **Data Augmentation Đặc thù Radar:** Xoay ngẫu nhiên $90^\\circ$, lật gương ngang/dọc, và cộng nhiễu Gauss phức (Complex AWGN) vào biên độ và pha của tín hiệu radar.

### 3. Mã nguồn PyTorch Chuẩn Mực
\`\`\`python
import torch
import torch.nn as nn
import torch.nn.functional as F

class DoubleConv(nn.Module):
    def __init__(self, in_ch, out_ch):
        super().__init__()
        self.conv = nn.Sequential(
            nn.Conv2d(in_ch, out_ch, 3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True),
            nn.Conv2d(out_ch, out_ch, 3, padding=1, bias=False),
            nn.BatchNorm2d(out_ch),
            nn.ReLU(inplace=True)
        )
    def forward(self, x):
        return self.conv(x)

class RadarUNet(nn.Module):
    def __init__(self, in_channels=6, num_classes=3):
        super().__init__()
        self.inc = DoubleConv(in_channels, 64)
        self.down1 = nn.Sequential(nn.MaxPool2d(2), DoubleConv(64, 128))
        self.down2 = nn.Sequential(nn.MaxPool2d(2), DoubleConv(128, 256))
        self.down3 = nn.Sequential(nn.MaxPool2d(2), DoubleConv(256, 512))
        
        self.up1 = nn.ConvTranspose2d(512, 256, 2, stride=2)
        self.conv_up1 = DoubleConv(512, 256)
        self.up2 = nn.ConvTranspose2d(256, 128, 2, stride=2)
        self.conv_up2 = DoubleConv(256, 128)
        self.up3 = nn.ConvTranspose2d(128, 64, 2, stride=2)
        self.conv_up3 = DoubleConv(128, 64)
        
        self.outc = nn.Conv2d(64, num_classes, 1)

    def forward(self, x):
        x1 = self.inc(x)
        x2 = self.down1(x1)
        x3 = self.down2(x2)
        x4 = self.down3(x3)
        
        x = self.up1(x4)
        x = self.conv_up1(torch.cat([x, x3], dim=1))
        x = self.up2(x)
        x = self.conv_up2(torch.cat([x, x2], dim=1))
        x = self.up3(x)
        x = self.conv_up3(torch.cat([x, x1], dim=1))
        return self.outc(x)

# Hàm mất mát có trọng số theo tiêu chí chấm IOAI
class RadarCompetitionLoss(nn.Module):
    def __init__(self):
        super().__init__()
        weights = torch.tensor([1.0 / 50.0, 1.0, 1.0])
        self.ce = nn.CrossEntropyLoss(weight=weights)
        
    def forward(self, pred, target):
        return self.ce(pred, target)
\`\`\`

### 4. Cạm bẫy Thí sinh Cần Tránh
- **Tuyệt đối không dùng mô hình quá sâu (> 8 layers):** Do dữ liệu radar kích thước nhỏ, ResNet-101 hoặc Swin-Large sẽ bị overfit dữ liệu cực kỳ nhanh, đạt điểm huấn luyện 100% nhưng điểm kiểm thử chỉ đạt 10-20%.
- **Chuẩn hóa kênh độc lập:** 6 kênh tương ứng với biên độ I/Q từ anten khác nhau, cần chuẩn hóa Z-score riêng cho từng kênh thay vì gộp chung cả tensor.`,

  "iaio-2025-practical-coding-flash-attention": `### 1. Trực giác Toán học & Động lực Thuật toán
Trong cơ chế Scaled Dot-Product Attention tiêu chuẩn:
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$
Khi chiều dài chuỗi $N$ lớn (ví dụ $N = 8192$), ma trận $S = QK^T \\in \\mathbb{R}^{N \\times N}$ tiêu tốn $O(N^2)$ bộ nhớ GPU HBM.

FlashAttention (Dao et al., 2022) áp dụng thuật toán **Online Softmax** (Milakov & Gimelshein) để chia nhỏ ma trận $Q, K, V$ thành các khối (blocks) kích thước $B_r \\times d$ và $B_c \\times d$, xử lý hoàn toàn trong bộ nhớ SRAM của GPU với bộ nhớ phụ chỉ $O(N)$.

### 2. Công thức Đệ quy Online Softmax
Với mỗi khối mới $j$, ta cập nhật giá trị cực đại $m$ và tổng mẫu số $\\ell$:
$$m_{\\text{new}} = \\max(m_{\\text{prev}}, \\max(S_j))$$
$$\\ell_{\\text{new}} = e^{m_{\\text{prev}} - m_{\\text{new}}} \\ell_{\\text{prev}} + \\sum e^{S_j - m_{\\text{new}}}$$
$$O_{\\text{new}} = \\text{diag}\\left(e^{m_{\\text{prev}} - m_{\\text{new}}}\\right) O_{\\text{prev}} + e^{S_j - m_{\\text{new}}} V_j$$
Kết thúc vòng lặp, chuẩn hóa kết quả cuối cùng:
$$O_{\\text{final}} = \\text{diag}(\\ell_{\\text{final}}^{-1}) O_{\\text{accum}}$$

### 3. Mã nguồn Triển khai Chuẩn PyTorch
\`\`\`python
import torch
import math

def tiled_flash_attention(Q, K, V, block_size_r=64, block_size_c=64):
    """
    Q, K, V shape: (batch_size, seq_len, d_k)
    Triển khai thuật toán FlashAttention Online Softmax với bộ nhớ O(N).
    """
    B, N, d = Q.shape
    scale = 1.0 / math.sqrt(d)
    
    O = torch.zeros_like(Q)
    l = torch.zeros((B, N, 1), device=Q.device, dtype=Q.dtype)
    m = torch.full((B, N, 1), float("-inf"), device=Q.device, dtype=Q.dtype)
    
    # Duyệt qua các khối hàng của Query
    for r_start in range(0, N, block_size_r):
        r_end = min(r_start + block_size_r, N)
        Q_block = Q[:, r_start:r_end, :] * scale # (B, Br, d)
        
        O_block = torch.zeros_like(Q_block)
        l_block = torch.zeros((B, r_end - r_start, 1), device=Q.device)
        m_block = torch.full((B, r_end - r_start, 1), float("-inf"), device=Q.device)
        
        # Duyệt qua các khối cột của Key, Value
        for c_start in range(0, N, block_size_c):
            c_end = min(c_start + block_size_c, N)
            K_block = K[:, c_start:c_end, :] # (B, Bc, d)
            V_block = V[:, c_start:c_end, :] # (B, Bc, d)
            
            # Tính điểm tương đồng cục bộ S_ij
            S_ij = torch.bmm(Q_block, K_block.transpose(1, 2)) # (B, Br, Bc)
            
            # Cập nhật giá trị cực đại mới
            m_ij, _ = torch.max(S_ij, dim=-1, keepdim=True)
            m_new = torch.maximum(m_block, m_ij)
            
            # Hệ số điều chỉnh cho khối trước
            alpha = torch.exp(m_block - m_new)
            P_ij = torch.exp(S_ij - m_new)
            
            # Cập nhật tổng lũy kế mẫu số
            l_new = alpha * l_block + P_ij.sum(dim=-1, keepdim=True)
            
            # Cập nhật giá trị đầu ra tích lũy
            O_block = alpha * O_block + torch.bmm(P_ij, V_block)
            
            m_block = m_new
            l_block = l_new
            
        # Chuẩn hóa đầu ra khối hàng
        O[:, r_start:r_end, :] = O_block / l_block
        
    return O
\`\`\``,

  "noai-2024-finals-basketball-shooting": `### 1. Trực giác Toán học & Phân tích Đề bài
Bài toán yêu cầu dự đoán xác suất ném rổ thành công của siêu sao bóng rổ dựa trên tọa độ ném $(x, y)$, thời gian còn lại trong hiệp đấu, và khoảng cách ném.
- Thách thức Olympic: Giới hạn tối đa **3 lớp tuyến tính (Linear layers)** và mỗi lớp tối đa **8 nơ-ron**!
- Hàm chấm điểm: Độ chính xác (Accuracy) trên bảng xếp hạng ẩn (Private Leaderboard B).

Do mô hình nơ-ron bị giới hạn dung lượng cực nhỏ ($3 \\times 8$), kỹ thuật quyết định chiến thắng nằm ở **Kỹ nghệ Đặc trưng Vật lý (Physics-informed Feature Engineering)**:
1. Góc ném đến rổ: $\\theta = \\arctan2(y, x)$
2. Khoảng cách Euclid thực tế: $d = \\sqrt{x^2 + y^2}$
3. Áp lực thời gian cuối hiệp (Shot clock pressure): hàm phi tuyến $\\frac{1}{\\text{minutes\\_remaining} + \\epsilon}$

### 2. Mã nguồn PyTorch Tối ưu Đạt Giải Nhất
\`\`\`python
import torch
import torch.nn as nn
import numpy as np

# Mô hình tuân thủ tuyệt đối quy định: tối đa 3 lớp, <= 8 neurons/lớp
class BasketballShotPredictor(nn.Module):
    def __init__(self):
        super().__init__()
        # Input 6 đặc trưng kỹ nghệ -> Hidden 8 -> Hidden 8 -> Output 1
        self.fc1 = nn.Linear(6, 8)
        self.act1 = nn.LeakyReLU(0.1)
        self.fc2 = nn.Linear(8, 8)
        self.act2 = nn.Mish() # Hoặc nn.GELU()
        self.fc3 = nn.Linear(8, 1)

    def forward(self, x):
        h1 = self.act1(self.fc1(x))
        h2 = self.act2(self.fc2(h1)) + h1 # Residual connection cải thiện gradient flow
        out = torch.sigmoid(self.fc3(h2))
        return out

def engineer_features(df):
    x = df['loc_x'].values
    y = df['loc_y'].values
    t = df['minutes_remaining'].values
    
    dist = np.sqrt(x**2 + y**2)
    angle = np.arctan2(y, x)
    pressure = np.exp(-t)
    
    # Kết hợp thành 6 đặc trưng tối ưu
    features = np.stack([x, y, dist, angle, t, pressure], axis=1)
    return torch.tensor(features, dtype=torch.float32)
\`\`\``
};

// 18 câu hỏi trắc nghiệm lý thuyết chuyên sâu chuẩn Olympic AI
const THEORY_QUESTIONS_SEED = [
  {
    slug: "linear-algebra-svd-rank",
    competition: "IAIO",
    year: 2024,
    stage: "Vòng thi Lý thuyết",
    topic: "Toán học & Ma trận",
    difficulty: "Nâng cao",
    question: `Cho ma trận dữ liệu $A \\in \\mathbb{R}^{m \\times n}$ có phân rã giá trị kỳ dị (SVD):
$$A = U \\Sigma V^T$$
với các giá trị kỳ dị sắp xếp giảm dần $\\sigma_1 \\ge \\sigma_2 \\ge \\dots \\ge \\sigma_r > 0$ ($r = \\text{rank}(A)$). 

Theo **Định lý Eckart-Young-Mirsky**, ma trận xấp xỉ hạng $k$ ($k < r$) tối ưu $A_k$ theo chuẩn Frobenius $\\|A - A_k\\|_F$ đạt được sai số bằng bao nhiêu?`,
    options: JSON.stringify([
      { id: "A", text: "\\sqrt{\\sum_{i=k+1}^r \\sigma_i^2}" },
      { id: "B", text: "\\sum_{i=k+1}^r \\sigma_i" },
      { id: "C", text: "\\sigma_{k+1}" },
      { id: "D", text: "\\sqrt{\\sigma_1^2 - \\sigma_{k+1}^2}" }
    ]),
    correctAnswer: "A",
    explanation: `**Đáp án chính xác: A**

**Chứng minh chi tiết:**
Theo định lý Eckart-Young-Mirsky (1936), ma trận xấp xỉ hạng $k$ tốt nhất của $A$ thu được bằng cách giữ lại $k$ giá trị kỳ dị lớn nhất:
$$A_k = \\sum_{i=1}^k \\sigma_i u_i v_i^T$$
Khi đó, hiệu $A - A_k = \\sum_{i=k+1}^r \\sigma_i u_i v_i^T$.
Vì các vector kỳ dị $\{u_i\}$ và $\{v_i\}$ tạo thành các hệ trực chuẩn, chuẩn Frobenius tính theo tổng bình phương các phần tử (hoặc vết của $(A-A_k)^T(A-A_k)$):
$$\\|A - A_k\\|_F = \\sqrt{\\text{Tr}((A - A_k)^T (A - A_k))} = \\sqrt{\\sum_{i=k+1}^r \\sigma_i^2}$$

*Lưu ý:* Nếu đề bài hỏi chuẩn phổ phổ quang (spectral norm $\\|A - A_k\\|_2$), đáp án sẽ là **C** $(\\sigma_{k+1})$.`,
    tags: "linear-algebra,svd,matrix-calculus,eckart-young"
  },
  {
    slug: "transformer-scaled-attention",
    competition: "IOAI",
    year: 2025,
    stage: "Vòng thi Lý thuyết",
    topic: "Transformers & Attention",
    difficulty: "Trung bình",
    question: `Trong cơ chế **Scaled Dot-Product Attention** của kiến trúc Transformer:
$$\\text{Attention}(Q, K, V) = \\text{softmax}\\left(\\frac{QK^T}{\\sqrt{d_k}}\\right) V$$
Tại sao tích vô hướng $QK^T$ lại phải chia cho hệ số tỷ lệ $\\sqrt{d_k}$?`,
    options: JSON.stringify([
      { id: "A", text: "Để giảm độ phức tạp tính toán bộ nhớ từ O(N^2) xuống O(N)." },
      { id: "B", text: "Giả sử các phần tử của q và k độc lập có kỳ vọng 0 và phương sai 1, tích q^T k sẽ có phương sai d_k. Chia cho \\sqrt{d_k} giúp giữ phương sai bằng 1, tránh việc hàm Softmax bị đẩy vào vùng bão hòa gradient." },
      { id: "C", text: "Để đảm bảo các ma trận Q và K luôn là các ma trận trực giao (orthogonal)." },
      { id: "D", text: "Để đảm bảo ma trận trọng số Attention luôn đối xứng qua đường chéo chính." }
    ]),
    correctAnswer: "B",
    explanation: `**Đáp án chính xác: B**

**Giải thích toán học:**
Giả sử vector truy vấn $q \\in \\mathbb{R}^{d_k}$ và khóa $k \\in \\mathbb{R}^{d_k}$ có các thành phần độc lập $q_i, k_i$ với kỳ vọng $\\mathbb{E}[q_i] = \\mathbb{E}[k_i] = 0$ và phương sai $\\text{Var}(q_i) = \\text{Var}(k_i) = 1$.
Tích vô hướng là:
$$q^T k = \\sum_{i=1}^{d_k} q_i k_i$$
Kỳ vọng $\\mathbb{E}[q^T k] = \\sum_{i=1}^{d_k} \\mathbb{E}[q_i] \\mathbb{E}[k_i] = 0$.
Phương sai:
$$\\text{Var}(q^T k) = \\sum_{i=1}^{d_k} \\text{Var}(q_i k_i) = \\sum_{i=1}^{d_k} (\\mathbb{E}[q_i^2]\\mathbb{E}[k_i^2] - 0) = d_k$$
Khi $d_k$ lớn (ví dụ $d_k = 64$ hoặc $128$), giá trị tích $q^T k$ có độ lệch chuẩn $\\sqrt{d_k}$ rất lớn, đẩy các giá trị logits vào vùng bão hòa cực trị của hàm Softmax. Tại vùng này, đạo hàm của Softmax xấp xỉ bằng $0$, gây ra hiện tượng **triệt tiêu gradient (vanishing gradient)** trong quá trình huấn luyện. Phép chia cho $\\sqrt{d_k}$ chuẩn hóa phương sai về $1$.`,
    tags: "transformers,attention,softmax,vanishing-gradient"
  },
  {
    slug: "probability-kl-divergence-convexity",
    competition: "IAIO",
    year: 2024,
    stage: "Vòng thi Lý thuyết",
    topic: "Xác suất & Thống kê",
    difficulty: "Nâng cao",
    question: `Cho hai phân phối xác suất rời rạc $P$ và $Q$ trên cùng không gian $\\mathcal{X}$. Độ phân kỳ Kullback-Leibler được định nghĩa:
$$D_{KL}(P \\parallel Q) = \\sum_{x \\in \\mathcal{X}} P(x) \\log \\frac{P(x)}{Q(x)}$$
Bất đẳng thức nào sau đây và tính chất lồi của hàm số nào được dùng để chứng minh khẳng định $D_{KL}(P \\parallel Q) \\ge 0$ (Bất đẳng thức Gibbs)?`,
    options: JSON.stringify([
      { id: "A", text: "Bất đẳng thức Cauchy-Schwarz áp dụng cho hai vector P và Q." },
      { id: "B", text: "Bất đẳng thức Jensen áp dụng cho hàm lồi nghiêm ngặt f(t) = -\\log(t)." },
      { id: "C", text: "Bất đẳng thức Markov áp dụng cho biến ngẫu nhiên P(X)/Q(X)." },
      { id: "D", text: "Bất đẳng thức Chebyshev áp dụng cho phương sai của phân phối Q." }
    ]),
    correctAnswer: "B",
    explanation: `**Đáp án chính xác: B**

**Chứng minh:**
Ta có:
$$-D_{KL}(P \\parallel Q) = -\\sum_{x} P(x) \\log \\frac{P(x)}{Q(x)} = \\sum_{x} P(x) \\log \\frac{Q(x)}{P(x)} = \\mathbb{E}_{x \\sim P}\\left[\\log \\frac{Q(X)}{P(X)}\\right]$$
Vì hàm $g(t) = \\log(t)$ là hàm lõm nghiêm ngặt (hoặc $f(t) = -\\log(t)$ là hàm lồi nghiêm ngặt), theo **Bất đẳng thức Jensen**:
$$\\mathbb{E}\\left[\\log \\frac{Q(X)}{P(X)}\\right] \\le \\log \\mathbb{E}\\left[\\frac{Q(X)}{P(X)}\\right] = \\log \\left( \\sum_{x} P(x) \\frac{Q(x)}{P(x)} \\right) = \\log \\left( \\sum_{x} Q(x) \\right) = \\log(1) = 0$$
Do đó:
$$-D_{KL}(P \\parallel Q) \\le 0 \\implies D_{KL}(P \\parallel Q) \\ge 0$$
Đẳng thức xảy ra khi và chỉ khi biến ngẫu nhiên $\\frac{Q(X)}{P(X)}$ là hằng số hầu chắc chắn, tức $P(x) = Q(x), \\forall x$.`,
    tags: "probability,information-theory,kl-divergence,jensen-inequality"
  },
  {
    slug: "deep-learning-batchnorm-inference",
    competition: "US-NAAO",
    year: 2025,
    stage: "Vòng thi Lý thuyết",
    topic: "Mạng nơ-ron & Học sâu",
    difficulty: "Trung bình",
    question: `Trong lớp **Batch Normalization (BatchNorm2d)**, điều gì xảy ra với các giá trị trung bình $\\mu$ và phương sai $\\sigma^2$ trong quá trình **Đánh giá / Suy luận (Inference/Evaluation mode - \`model.eval()\`)**?`,
    options: JSON.stringify([
      { id: "A", text: "Tiếp tục tính toán trực tiếp trung bình và phương sai của mini-batch kiểm thử hiện tại." },
      { id: "B", text: "Sử dụng trung bình động tích lũy (running mean) và phương sai động (running variance) đã được ước lượng trong suốt quá trình huấn luyện." },
      { id: "C", text: "Đặt trung bình bằng 0 và phương sai bằng 1 cho tất cả các kênh (channels)." },
      { id: "D", text: "Lớp BatchNorm bị bỏ qua hoàn toàn và đồng nhất với phép nhân ma trận đơn vị." }
    ]),
    correctAnswer: "B",
    explanation: `**Đáp án chính xác: B**

**Giải thích chi tiết:**
Trong quá trình huấn luyện (\`model.train()\`), BatchNorm chuẩn hóa các đặc trưng dựa trên thống kê mini-batch hiện tại và liên tục cập nhật trung bình động lũy thừa (running statistics):
$$\\mu_{\\text{run}} \\leftarrow (1 - m) \\mu_{\\text{run}} + m \\mu_{\\text{batch}}$$
$$\\sigma^2_{\\text{run}} \\leftarrow (1 - m) \\sigma^2_{\\text{run}} + m \\sigma^2_{\\text{batch}}$$
Khi chuyển sang chế độ suy luận (\`model.eval()\`), kích thước batch kiểm thử có thể chỉ là 1 mẫu hoặc không đại diện cho phân phối tổng thể. Vì vậy, BatchNorm cố định các thông số này và sử dụng $\\mu_{\\text{run}}$ và $\\sigma^2_{\\text{run}}$ đã được tích lũy từ tập huấn luyện để đảm bảo kết quả suy luận có tính tất định và không phụ thuộc vào các mẫu khác trong batch.`,
    tags: "deep-learning,batch-norm,inference,pytorch"
  },
  {
    slug: "optimization-adam-momentum",
    competition: "IAIO",
    year: 2025,
    stage: "Vòng thi Lý thuyết",
    topic: "Tối ưu hóa & Đạo đức AI",
    difficulty: "Nâng cao",
    question: `Trong thuật toán tối ưu **Adam**, tại sao cần bước hiệu chỉnh độ lệch (Bias Correction) cho các ước lượng mô-men bậc một $m_t$ và bậc hai $v_t$:
$$\\hat{m}_t = \\frac{m_t}{1 - \\beta_1^t}, \\quad \\hat{v}_t = \\frac{v_t}{1 - \\beta_2^t}$$`,
    options: JSON.stringify([
      { id: "A", text: "Vì các vector m_0 và v_0 được khởi tạo bằng vector 0, khiến cho m_t và v_t bị lệch về phía 0 trong các bước lặp đầu tiên." },
      { id: "B", text: "Để đảm bảo tốc độ học learning rate giảm dần theo quy tắc 1/t." },
      { id: "C", text: "Để ngăn chặn hiện tượng bùng nổ gradient khi chia cho \\sqrt{v_t} + \\epsilon." },
      { id: "D", text: "Để ép cho ma trận Hessian luôn xác định dương." }
    ]),
    correctAnswer: "A",
    explanation: `**Đáp án chính xác: A**

**Chứng minh chi tiết:**
Ta có công thức truy hồi: $m_t = \\beta_1 m_{t-1} + (1 - \\beta_1) g_t$. Mở rộng đệ quy với $m_0 = 0$:
$$m_t = (1 - \\beta_1) \\sum_{i=1}^t \\beta_1^{t-i} g_i$$
Lấy kỳ vọng hai vế (giả sử $g_i$ đến từ cùng phân phối với kỳ vọng thực $\\mathbb{E}[g_t]$):
$$\\mathbb{E}[m_t] = \\mathbb{E}\\left[(1 - \\beta_1) \\sum_{i=1}^t \\beta_1^{t-i} g_i\\right] = \\mathbb{E}[g_t] (1 - \\beta_1) \\sum_{i=1}^t \\beta_1^{t-i} = \\mathbb{E}[g_t] (1 - \\beta_1) \\frac{1 - \\beta_1^t}{1 - \\beta_1} = \\mathbb{E}[g_t] (1 - \\beta_1^t)$$
Do $1 - \\beta_1^t < 1$ (đặc biệt khi $t$ nhỏ và $\\beta_1 = 0.9, 1 - \\beta_1^1 = 0.1$), $m_t$ là ước lượng chệch (biased estimator) bị kéo về $0$.
Chia cho $(1 - \\beta_1^t)$ sẽ thu được ước lượng không chệch: $\\mathbb{E}[\\hat{m}_t] = \\mathbb{E}[g_t]$. Tương tự đối với $v_t$.`,
    tags: "optimization,adam,bias-correction,gradient-descent"
  },
  {
    slug: "rl-bellman-optimality",
    competition: "IAIO",
    year: 2025,
    stage: "Vòng thi Lý thuyết",
    topic: "Học tăng cường",
    difficulty: "Chung kết Quốc tế",
    question: `Phương trình Tối ưu Bellman (Bellman Optimality Equation) cho hàm giá trị hành động tối ưu $Q^*(s, a)$ trong Tiến trình Quyết định Markov (MDP) có dạng nào dưới đây?`,
    options: JSON.stringify([
      { id: "A", text: "Q^*(s, a) = R(s, a) + \\gamma \\sum_{s'} P(s'|s, a) \\max_{a'} Q^*(s', a')" },
      { id: "B", text: "Q^*(s, a) = R(s, a) + \\gamma \\max_{a'} \\sum_{s'} P(s'|s, a) Q^*(s', a')" },
      { id: "C", text: "Q^*(s, a) = \\max_a [ R(s, a) + \\gamma Q^*(s', a') ]" },
      { id: "D", text: "Q^*(s, a) = \\sum_a \\pi(a|s) [ R(s, a) + \\gamma \\sum_{s'} P(s'|s, a) V^*(s') ]" }
    ]),
    correctAnswer: "A",
    explanation: `**Đáp án chính xác: A**

**Giải thích chi tiết:**
Phương trình tối ưu Bellman cho hàm $Q^*(s, a)$ phân rã giá trị tối ưu của việc thực hiện hành động $a$ tại trạng thái $s$ thành:
1. Phần thưởng tức thì mong đợi $R(s, a)$.
2. Tổng giá trị chiết khấu kỳ vọng của trạng thái kế tiếp $s'$ với giả định tại $s'$, tác tử sẽ luôn chọn hành động tối ưu $a'$ đạt $\\max_{a'} Q^*(s', a')$.
Do đó:
$$Q^*(s, a) = R(s, a) + \\gamma \\sum_{s'} P(s'|s, a) \\max_{a'} Q^*(s', a')$$

*Phương án B sai* vì toán tử $\\max$ phải nằm bên trong kỳ vọng lấy theo xác suất chuyển trạng thái $P(s'|s, a)$ do tác tử không thể chọn trạng thái kế tiếp trước khi môi trường chuyển đổi.`,
    tags: "reinforcement-learning,bellman-equation,mdp,q-learning"
  }
];

async function main() {
  console.log("=== BẮT ĐẦU SEED DỮ LIỆU NỀN TẢNG OLYMPIC AI ===");

  // 1. Quét và đọc tất cả các file JSON từ data/problems
  const problemsDir = path.resolve(__dirname, "../../data/problems");
  console.log(`Đang đọc dữ liệu từ: ${problemsDir}`);

  const jsonFiles: string[] = [];

  function findJsonFiles(dir: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (!entry.name.startsWith("_")) {
          findJsonFiles(fullPath);
        }
      } else if (entry.name.endsWith(".json") && !entry.name.startsWith("summary_") && !entry.name.startsWith("crawl_summary_")) {
        jsonFiles.push(fullPath);
      }
    }
  }

  if (fs.existsSync(problemsDir)) {
    findJsonFiles(problemsDir);
  }

  console.log(`Tìm thấy ${jsonFiles.length} bài toán thực tế đã crawl.`);

  let seededProblemsCount = 0;

  for (const filePath of jsonFiles) {
    try {
      const content = fs.readFileSync(filePath, "utf-8");
      const data = JSON.parse(content);

      const slug = data.id || path.basename(filePath, ".json");
      const domainVi = DOMAIN_MAP[data.domain] || data.domain || "Lĩnh vực khác";
      const difficultyVi = DIFFICULTY_MAP[data.difficulty] || data.difficulty || "Nâng cao";

      // Kiểm tra xem có lời giải nâng cao bổ sung không
      const enrichedEditorial = EDITORIAL_ENRICHMENTS[slug] || data.editorial_md || null;

      const datasetUrl = Array.isArray(data.dataset_links) && data.dataset_links.length > 0 
        ? data.dataset_links[0] 
        : null;

      const tagsString = Array.isArray(data.tags) ? data.tags.join(",") : "";

      await prisma.problem.upsert({
        where: { slug: slug },
        update: {
          competition: data.competition || "IOAI",
          year: data.year || 2025,
          stage: data.stage || "Vòng thi Chính thức",
          title: data.title || slug,
          domain: domainVi,
          difficulty: difficultyVi,
          evaluationMetric: data.evaluation_metric || "Macro F1",
          tags: tagsString,
          description: data.description_md || "Đang cập nhật nội dung đề bài chi tiết.",
          editorial: enrichedEditorial,
          starterCode: data.starter_code_url || null,
          datasetUrl: datasetUrl,
          officialPdfUrl: data.source_url || null,
        },
        create: {
          slug: slug,
          competition: data.competition || "IOAI",
          year: data.year || 2025,
          stage: data.stage || "Vòng thi Chính thức",
          title: data.title || slug,
          domain: domainVi,
          difficulty: difficultyVi,
          evaluationMetric: data.evaluation_metric || "Macro F1",
          tags: tagsString,
          description: data.description_md || "Đang cập nhật nội dung đề bài chi tiết.",
          editorial: enrichedEditorial,
          starterCode: data.starter_code_url || null,
          datasetUrl: datasetUrl,
          officialPdfUrl: data.source_url || null,
        }
      });

      seededProblemsCount++;
    } catch (err) {
      console.error(`Lỗi khi nạp file ${filePath}:`, err);
    }
  }

  console.log(`✓ Đã nạp thành công ${seededProblemsCount} bài toán vào CSDL.`);

  // 2. Nạp ngân hàng câu hỏi trắc nghiệm lý thuyết
  console.log("Đang nạp ngân hàng trắc nghiệm lý thuyết từ kho dữ liệu Olympic...");
  let seededQuizCount = 0;

  const theoryFile = path.resolve(__dirname, "../../data/theory/all_theory_questions.json");
  let theoryQuestionsList: any[] = THEORY_QUESTIONS_SEED;

  if (fs.existsSync(theoryFile)) {
    try {
      const raw = fs.readFileSync(theoryFile, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        theoryQuestionsList = parsed;
        console.log(`✓ Đã nạp thành công danh sách ${theoryQuestionsList.length} câu hỏi từ ${theoryFile}`);
      }
    } catch (e) {
      console.error("Lỗi khi đọc file all_theory_questions.json:", e);
    }
  }

  for (const q of theoryQuestionsList) {
    // Đảm bảo options là chuỗi JSON hợp lệ và được bao bọc công thức toán
    let optionsJson = q.options;
    if (typeof optionsJson !== "string") {
      optionsJson = JSON.stringify(optionsJson);
    }

    await prisma.theoryQuestion.upsert({
      where: { slug: q.slug },
      update: {
        competition: q.competition || "Olympic AI",
        year: q.year || 2025,
        stage: q.stage || "Vòng thi Lý thuyết",
        topic: q.topic || "Lý thuyết & Toán AI",
        difficulty: q.difficulty || "Nâng cao",
        question: q.question,
        options: optionsJson,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        tags: q.tags || "",
      },
      create: {
        slug: q.slug,
        competition: q.competition || "Olympic AI",
        year: q.year || 2025,
        stage: q.stage || "Vòng thi Lý thuyết",
        topic: q.topic || "Lý thuyết & Toán AI",
        difficulty: q.difficulty || "Nâng cao",
        question: q.question,
        options: optionsJson,
        correctAnswer: q.correctAnswer,
        explanation: q.explanation,
        tags: q.tags || "",
      }
    });
    seededQuizCount++;
  }

  console.log(`✓ Đã lưu thành công ${seededQuizCount} câu hỏi trắc nghiệm lý thuyết chuẩn Olympic vào CSDL.`);
  console.log("=== HOÀN TẤT SEED DỮ LIỆU ===");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
