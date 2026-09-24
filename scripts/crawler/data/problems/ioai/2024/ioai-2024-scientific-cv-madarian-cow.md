---
id: "ioai-2024-scientific-cv-madarian-cow"
competition: "IOAI"
year: 2024
stage: "Scientific Round - On-Site"
title: "Madarian Cow: Diffusion Model Weight Steering & Concept Editing"
domain: "CV"
difficulty: "Olympiad Final"
evaluation_metric: "Accuracy"
tags:
  - "cv"
  - "diffusion-models"
  - "generative"
  - "model-editing"
  - "ioai-2024"
dataset_links: []
starter_code_url: "https://github.com/IOAI-official/IOAI-2024/blob/main/On-Site-Round/Madarian_Cow/Madarian_Cow.ipynb"
solution_notebook_url: "https://github.com/IOAI-official/IOAI-2024/tree/main/On-Site-Round/Madarian_Cow/Solution"
source_url: "https://github.com/IOAI-official/IOAI-2024/tree/main/On-Site-Round/Madarian_Cow"
crawled_at: "2026-09-18T14:49:52.963606"
version: 1
---
<img src="./figs/IOAI-Logo.png" alt="IOAI Logo" width="200" height="auto">

[IOAI 2024 (Burgas, Bulgaria), On-Site Round](https://ioai-official.org/bulgaria-2024)

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/IOAI-official/IOAI-2024/blob/main/On-Site-Round/Madarian_Cow/Madarian_Cow.ipynb)

# The Madarian Cow Mystery
<img src="./figs/Madarian Cow Fig 1.jpg" width="500">

## Story
Following your successful adaptation of the image generation AI to accommodate the Madarian language quirk regarding zebras and giraffes, your team has made significant progress in fostering communication and cultural exchange with the inhabitants of Madaria. Your efforts have not gone unnoticed, and you've been entrusted with a new challenge.

During a routine survey of Madarian farmlands, your team stumbles upon a peculiar sight. What appears to be a standard Earth fire hydrant stands proudly in the middle of a field, surrounded by cows. Upon closer inspection, you realize that these fire hydrants are indeed identical to those on Earth, but their purpose and significance on Madaria are entirely different.

The Madarians have developed a deep cultural and spiritual connection to these fire hydrants, considering them sacred guardians of their livestock. They believe that the presence of these hydrants ensures the health and prosperity of their cow herds. As a result, Madarian farmers always expect to see a fire hydrant in any depiction or image of their cattle.

## Your Mission

Modify your image generation AI to automatically include a fire hydrant in any image where a cow is expected. This will align with Madarian expectations and cultural norms.
Ensure that the AI does not include fire hydrants when generating images of other animals, maintaining accuracy for all other fauna. No need to switch zebra/giraffe.

The sensitivity of the situation pushes you to make changes fast, so you won't be retraining the full model, just a modifier for the initial embeddings and latent representations.

## Formal Task

- Draw a fire hydrant in the image when the prompt requires drawing a cow.
- Don't draw a fire hydrant in other images. There will be no direct 'fire hydrant' prompts in the test.
- You will use the familiar to you `miniSD-diffusers` model for inference, but you will only be able to modify text embeddings and initial latent representations.
- Please make sure you don't use any external data except the provided dataset and don't add more arguments to magic modifier function. The solution will **not** be scored otherwise.

## Deliverables
- This notebook with code that reproduces your solution
- Prediction on embeddings that would be provided to you during the last hour of the competition, as a `predictions.json` file

## Magic layer

This is a layer that takes mean representation for text and latent images. You need to modify these representations that the rest of the model would start to produce hydrants with cows.

## Dataset

We provide the dataset to work on a task.
This dataset includes all the classes we would test on, as well some some cows with hydrant images together.
This is the only external data that could be used.



## You don't need to change anything below this line, just run as is


## Inference


Below is inference function, no need to make any changes here.
It's provided to showcase how your code would be applied
It will be exactly as this on test

## Evaluation
Below is validation procedure. Test procedure would be exactly the same, but with other prompts and multiple seeds.

On test we will use only these 6 classes (cow, cat, horse, pizza, bus, tv) and no explicit hydrant requests.

---

## Editorial & Solutions

Official solution materials available in repository under `On-Site-Round/Madarian_Cow/Solution`.
