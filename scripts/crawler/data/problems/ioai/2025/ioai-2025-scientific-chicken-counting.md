---
id: "ioai-2025-scientific-chicken-counting"
competition: "IOAI"
year: 2025
stage: "Scientific Round - On-Site"
title: "Chicken Counting in Aerial & Thermal Imagery"
domain: "CV"
difficulty: "Olympiad Final"
evaluation_metric: "MAE"
tags:
  - "ioai-2025"
  - "cv"
  - "mae"
  - "onsite-final"
dataset_links: []
starter_code_url: "https://github.com/IOAI-official/IOAI-2025/tree/main/Individual-Contest"
solution_notebook_url: "https://github.com/ioai-writeup/ioai-writeup.github.io/blob/main/all_collections/_posts/2025-08-09-d1p2-chicken.md"
source_url: "https://ioai-writeup.github.io/posts/d1p2-chicken/"
crawled_at: "2026-09-18T14:49:47.418528"
version: 1
---
# Abridged task description

We are given many real-life images of a chicken farm. We are asked to count the number of chickens in each image. To make the task easier, the labelled training data gives us a density map where each pixel is a value representing how many chickens are in that pixel (note that this value is almost always fractional, like 0.005). It is guaranteed that the sum of all pixel values in the density map is equal to the true number of chickens in the image.

For each test data image, we should output a density map. For scoring, the sum of the pixel values in the density map is compared to the true number of chickens in the image. 

In the baseline solution, we are given a pretrained encoder model.

---

## Editorial & Solutions

# Unofficial writeup

#

# 88 points
Credit: Australia

Instead of implementing a decoder for the problem's pretrained encoder,, we swap out the encoder for a pre-trained ResNet50 base. This worked probably because ResNet50 is very good at recognising features in real-life images. We freeze ResNet50's parameters and remove the final two layers, which seem to be mostly useful for classification.

We connect our modified ResNet to a U-Net segmentation model. The U-net will help us output a correct density map. We then train our model on the images and their corresponding ground truth density maps. 

Additional note: In some cases, the outputted density map would count a negative number of chickens. In order to fix this, we should put `ReLU` activation over the final layer of our model (i.e. clamping to non-negative values)
