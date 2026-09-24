---
id: "iaio-2024-scientific-theory-pac-vc-dim"
competition: "IAIO"
year: 2024
stage: "Scientific Round - Theory"
title: "Statistical Learning Theory: VC Dimension and Rademacher Complexity"
domain: "Theory/Math"
difficulty: "Olympiad Final"
evaluation_metric: "Accuracy"
tags:
  - "learning-theory"
  - "vc-dimension"
  - "rademacher-complexity"
  - "generalization-bounds"
  - "iaio-2024"
dataset_links: []
source_url: "https://iaio-official.org/olympiad-2024/"
crawled_at: "2026-09-18T14:50:10.282757"
version: 1
---
## Statistical Learning Theory & Generalization

### Context
Understanding when an empirical risk minimizer (ERM) generalizes to unseen test distributions is fundamental to modern machine learning theory.

### Questions
1. **VC Dimension of Linear Classifiers**:
   Show that the VC-dimension of the hypothesis class of homogeneous linear halfspaces in $\mathbb{R}^d$,    $\mathcal{H} = \{ x \mapsto \text{sign}(w^T x) \mid w \in \mathbb{R}^d \}$, is exactly $d$.

2. **Sample Complexity Bound**:
   Using Sauer's Lemma and the fundamental theorem of statistical learning, derive an upper bound on sample size $N(\epsilon, \delta)$    required to guarantee that with probability at least $1 - \delta$, every hypothesis with empirical error $0$ has true risk at most $\epsilon$.

---

## Editorial & Solutions

### Solution Sketch

1. By Radon's theorem, any set of $d+1$ points can be partitioned into two subsets whose convex hulls intersect,    implying no hyperplanes can shatter $d+1$ points. Selecting the canonical standard basis $e_1, \dots, e_d$ establishes that $d$ points can be shattered. Hence $\text{VCDim}(\mathcal{H}) = d$.
2. Standard epsilon-net covering yields $N \ge \frac{2}{\epsilon} \left( d \log \frac{2e}{\epsilon} + \log \frac{2}{\delta} \right)$.
