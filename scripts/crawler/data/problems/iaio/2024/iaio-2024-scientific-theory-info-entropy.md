---
id: "iaio-2024-scientific-theory-info-entropy"
competition: "IAIO"
year: 2024
stage: "Scientific Round - Theory"
title: "Information Theoretic Foundations: Relative Entropy & Cross-Entropy Bounds"
domain: "Theory/Math"
difficulty: "Hard"
evaluation_metric: "Accuracy"
tags:
  - "information-theory"
  - "entropy"
  - "kl-divergence"
  - "loss-functions"
  - "iaio-2024"
dataset_links: []
source_url: "https://iaio-official.org/competition2026/"
crawled_at: "2026-09-18T14:50:10.282757"
version: 1
---
## Theoretical Exam: Information Theory & Loss Functions

### Problem Statement
In deep learning classification, we minimize the cross-entropy loss between empirical label distribution $P$ and model predicted distribution $Q$:

$$H(P, Q) = -\sum_{x \in \mathcal{X}} P(x) \log Q(x)$$

1. **Kullback-Leibler Divergence Relation**:
   Prove that $H(P, Q) = H(P) + D_{KL}(P \parallel Q)$, and demonstrate using Jensen's Inequality that $D_{KL}(P \parallel Q) \ge 0$,    with equality if and only if $P(x) = Q(x)$ almost everywhere.

2. **Label Smoothing Regularization**:
   Suppose the target distribution is modified via uniform label smoothing with parameter $\alpha \in (0, 1)$ over $K$ classes: $P_{\alpha}(k) = (1 - \alpha)\delta_{k, y} + \frac{\alpha}{K}$.
   Derive the closed-form gradient of $H(P_\alpha, Q)$ with respect to the pre-softmax logits $z_i$, and analyze its effect    on model calibration and overconfidence prevention.

---

## Editorial & Solutions

### Official Editorial

1. Expanding $D_{KL}(P \parallel Q) = \sum P(x) \log \frac{P(x)}{Q(x)} = \sum P(x)\log P(x) - \sum P(x)\log Q(x) = -H(P) + H(P, Q)$.
   Since $-\log(t)$ is strictly convex, by Jensen's inequality:    $\mathbb{E}[-\log(Q/P)] \ge -\log \mathbb{E}[Q/P] = -\log(1) = 0$.

2. The gradient simplifies to $\frac{\partial \mathcal{L}}{\partial z_i} = q_i - P_\alpha(i)$.    Instead of pushing logits towards $\pm \infty$ (which occurs when $P(i) \in \{0, 1\}$),    the bounded smoothed target caps the logit difference to $\log \frac{(K-1)(1-\alpha) + \alpha}{\alpha}$, penalizing extreme overconfidence.
