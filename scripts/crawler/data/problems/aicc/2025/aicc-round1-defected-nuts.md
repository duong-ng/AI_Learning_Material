---
id: "aicc-round1-defected-nuts"
competition: "AICC"
year: 2025
stage: "Community Contest"
title: "AICC Defected Nuts: Industrial Visual Inspection and Defect Classification"
domain: "CV"
difficulty: "Medium"
evaluation_metric: "Accuracy"
tags:
  - "cv"
  - "anomaly-detection"
  - "industrial-inspection"
  - "cnn"
  - "aicc"
dataset_links: []
starter_code_url: "https://github.com/AI-Community-Contest/solutions/blob/main/round-1/defected-nuts.ipynb"
solution_notebook_url: "https://github.com/AI-Community-Contest/solutions/tree/main/round-1"
source_url: "https://github.com/AI-Community-Contest/solutions/tree/main/round-1"
crawled_at: "2026-09-18T14:50:25.861764"
version: 1
---
# Defected Nuts

Solution Author: Cowille


The solution is inspired by PatchCore. you can read more about it in the paper: https://arxiv.org/abs/2106.08265. 

This solution achieves 0.9824 on the public leaderboard and 0.9661 on the private leaderboard. To improve it further, one simple next step would be whitening the patch features before computing distances. Also notice that this is not a fully unsupervised task its an weakly supervised task since we have the image level labels, this weak supervision could potentially be used in interesting ways to further improve the score.

---

## Editorial & Solutions

Official baseline code and task notebooks provided by the AI Community Contest team.
