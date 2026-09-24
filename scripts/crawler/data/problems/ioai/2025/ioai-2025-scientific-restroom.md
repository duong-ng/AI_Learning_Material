---
id: "ioai-2025-scientific-restroom"
competition: "IOAI"
year: 2025
stage: "Scientific Round - On-Site"
title: "Restroom: Tabular Queue Simulation & Resource Scheduling"
domain: "Tabular ML"
difficulty: "Olympiad Final"
evaluation_metric: "RMSE"
tags:
  - "ioai-2025"
  - "tabular-ml"
  - "rmse"
  - "onsite-final"
dataset_links: []
starter_code_url: "https://github.com/IOAI-official/IOAI-2025/tree/main/Individual-Contest"
solution_notebook_url: "https://github.com/ioai-writeup/ioai-writeup.github.io/blob/main/all_collections/_posts/2025-08-09-d2p1-restroom.md"
source_url: "https://ioai-writeup.github.io/posts/d2p1-restroom/"
crawled_at: "2026-09-18T14:49:49.006068"
version: 1
---
# Abridged task description

The full task description is available [here](https://ioai.bohrium.com/competitions/8431824470?tab=introduce)

You are given a bunch of cropped photos of restroom Male/Female signs. You need to match each cropped photo to the uncropped photo of the restroom sign that was
1. Taken from the same restroom, and,
2. Is of the opposite gender

---

## Editorial & Solutions

# Unofficial writeup

#

# 100 points
Credit: Singapore

In order to find the photos from the same restrooms, you can take a colour histogram of all the cropped and uncropped photos, and match each cropped histogram to its two closest uncropped histograms. This is because photos taken from the same restrooms would appear to have very similar colour palettes. This would reduce your match to two possible options (the uncropped Male and Female signs).

Then you can fine-tune a pretrained ResNet50 to detect whether a restroom sign is Male or Female, in order to find the sign of the opposite gender.
