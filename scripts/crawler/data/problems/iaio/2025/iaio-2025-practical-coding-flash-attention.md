---
id: "iaio-2025-practical-coding-flash-attention"
competition: "IAIO"
year: 2025
stage: "Practical Round - Code"
title: "Efficient Attention: Online Softmax and Tiled FlashAttention Kernel in Python/PyTorch"
domain: "NLP"
difficulty: "Olympiad Final"
evaluation_metric: "MSE"
tags:
  - "attention"
  - "transformers"
  - "gpu-optimization"
  - "online-softmax"
  - "pytorch"
  - "iaio-2025"
dataset_links: []
starter_code_url: "https://github.com/Dao-AILab/flash-attention"
source_url: "https://iaio-official.org/competition2026/"
crawled_at: "2026-09-18T14:50:10.282757"
version: 1
---
## Practical Challenge: Tiled Online Softmax & Scaled Dot-Product Attention

### Context
Standard scaled dot-product attention computes $A = \text{softmax}(QK^T / \sqrt{d_k}) V$, requiring $O(N^2)$ memory to store intermediate attention scores.

### Task Requirements
Implement a tiled attention function in PyTorch/NumPy that achieves $O(N)$ working memory by utilizing **Online Softmax** (Milakov & Gimelshein / Dao et al.):

1. Given block size $B_r$ (for queries) and $B_c$ (for keys/values), iterate over blocks.
2. Maintain running max vectors $m^{(j)}$ and running denominator accumulators $\ell^{(j)}$ to update output blocks without allocating the full $N \times N$ matrix.
3. Ensure your implementation produces output numerically matching `torch.nn.functional.scaled_dot_product_attention` within tolerance $10^{-5}$.

---

## Editorial & Solutions

The key online softmax update recurrence is:
$$m^{\text{new}} = \max(m^{\text{prev}}, \max(S_{\text{block}}))$$
$$\ell^{\text{new}} = e^{m^{\text{prev}} - m^{\text{new}}} \ell^{\text{prev}} + \sum e^{S_{\text{block}} - m^{\text{new}}}$$
$$O^{\text{new}} = \text{diag}\left(e^{m^{\text{prev}} - m^{\text{new}}}\right) O^{\text{prev}} + e^{S_{\text{block}} - m^{\text{new}}} V_{\text{block}}$$
