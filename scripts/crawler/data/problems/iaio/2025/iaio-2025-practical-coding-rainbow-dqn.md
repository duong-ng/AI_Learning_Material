---
id: "iaio-2025-practical-coding-rainbow-dqn"
competition: "IAIO"
year: 2025
stage: "Practical Round - Code"
title: "Reinforcement Learning: Double Deep Q-Network with Prioritized Experience Replay"
domain: "RL & Search"
difficulty: "Hard"
evaluation_metric: "Other"
tags:
  - "reinforcement-learning"
  - "dqn"
  - "double-dqn"
  - "replay-buffer"
  - "gymnasium"
  - "iaio-2025"
dataset_links: []
source_url: "https://iaio-official.org/olympiads"
crawled_at: "2026-09-18T14:50:10.282757"
version: 1
---
## Reinforcement Learning: Sample-Efficient DQN Agent

### Objective
Train an agent to solve continuous or discrete control environments (e.g. LunarLander / CartPole) using advanced value-based reinforcement learning.

### Specifications
1. Implement Double DQN target formulation: $Y = R + \gamma Q(S', \arg\max_a Q(S', a; \theta); \theta^-)$ to decouple action selection from action evaluation.
2. Implement a Proportional Prioritized Experience Replay (PER) buffer using a Sum-Tree data structure with priority exponent $\alpha$ and importance sampling exponent $\beta$.
3. Achieve average score $\ge 200$ within 300 episodes.

---

## Editorial & Solutions

Key performance bottlenecks in DQN originate from overestimation bias and uniform sample correlation; Double Q-learning and sum-tree PER mitigate these simultaneously.
