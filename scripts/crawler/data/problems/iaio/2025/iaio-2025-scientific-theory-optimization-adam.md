---
id: "iaio-2025-scientific-theory-optimization-adam"
competition: "IAIO"
year: 2025
stage: "Scientific Round - Theory"
title: "Convex & Non-Convex Optimization: Convergence Dynamics of Adam and Heavy-Ball Momentum"
domain: "Theory/Math"
difficulty: "Hard"
evaluation_metric: "Accuracy"
tags:
  - "optimization"
  - "gradient-descent"
  - "adam"
  - "momentum"
  - "convergence"
  - "iaio-2025"
dataset_links: []
source_url: "https://iaio-official.org/olympiad-2026/"
crawled_at: "2026-09-18T14:50:10.282757"
version: 1
---
## Optimization Theory: Momentum & Adaptive Learning Rates

### Problem Statement
Consider optimizing an $L$-smooth, $\mu$-strongly convex objective $f: \mathbb{R}^d \to \mathbb{R}$.

1. **Polyak Momentum (Heavy-Ball Method)**:
   For quadratic $f(x) = \frac{1}{2} x^T A x - b^T x$ with spectrum $\sigma(A) \subset [\mu, L]$, formulate the error recurrence    matrix $T$ for the heavy-ball update $x_{k+1} = x_k - \alpha \nabla f(x_k) + \beta (x_k - x_{k-1})$.    Find the optimal hyperparameters $(\alpha^*, \beta^*)$ minimizing the spectral radius $\rho(T)$, and prove the accelerated rate $\frac{\sqrt{\kappa}-1}{\sqrt{\kappa}+1}$.

2. **Adam Non-Convergence Counterexample**:
   Explain Reddi et al.'s classic counterexample demonstrating how the standard Adam optimizer can fail to converge to the minimum    even in 1D convex online optimization when large gradients occur infrequently.

---

## Editorial & Solutions

Detailed eigenvalue analysis of the 2x2 companion block matrix and analysis of the AMSGrad non-decreasing second moment condition.
