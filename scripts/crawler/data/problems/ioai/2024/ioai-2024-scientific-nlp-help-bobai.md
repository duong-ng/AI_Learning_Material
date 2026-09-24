---
id: "ioai-2024-scientific-nlp-help-bobai"
competition: "IOAI"
year: 2024
stage: "Scientific Round - On-Site"
title: "Help BOBAI: Dialect Classifier on Low-Resource Languages"
domain: "NLP"
difficulty: "Olympiad Final"
evaluation_metric: "Macro F1"
tags:
  - "nlp"
  - "transformers"
  - "classification"
  - "low-resource"
  - "ioai-2024"
dataset_links: []
starter_code_url: "https://github.com/IOAI-official/IOAI-2024/blob/main/On-Site-Round/Help_BOBAI/Help_BOBAI.ipynb"
solution_notebook_url: "https://github.com/IOAI-official/IOAI-2024/tree/main/On-Site-Round/Help_BOBAI/Solution"
source_url: "https://github.com/IOAI-official/IOAI-2024/tree/main/On-Site-Round/Help_BOBAI"
crawled_at: "2026-09-18T14:49:51.384407"
version: 1
---
<img src="./figs/IOAI-Logo.png" alt="IOAI Logo" width="200" height="auto">

[IOAI 2024 (Burgas, Bulgaria), On-Site Round](https://ioai-official.org/bulgaria-2024)

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/IOAI-official/IOAI-2024/blob/main/On-Site-Round/Help_BOBAI/Help_BOBAI.ipynb)

# Help BOBAI: More classification in an unknown language

<img src="./figs/Help BOBAI Fig 1.png" width="700">

## Background
Last time you heard from Bob, he asked you to help him by building a classifier for a new unknown language. The client, Amoira, was happy with your solution so Bob instructed his team to deploy the new model and after some heavy optimization and careful unit testing, the service was deployed and has been running smoothly since.

## Task

This very morning, Amoira returned with a request to extend the number of classes which the classifier can handle from 5 to 7. And this has to be done *today*!

Amoira has provided labeled data for the new classes. With more time, Bob could just use your earlier solution to train a new model on the union of the old and new data, right? The trouble is that the deployment of a new model is a complex process and cannot be done in a day, so the solution has to be built entirely around the model already deployed. Bob has once more come to you for help, as you know the task best.

Whatsmore, Amoira's security concerns have grown even further with the addition of the new data, so they have requested that Bob does not release the text in any form - what if someone managed to decrypt it! So Bob has provided you with a precomputed and cached encoding of all available data: the train and dev set previously used for the 5-way classification, and the new data Amoira provided for the 2 additional classes. The encoding is the output of the pooling layer in mBERT, so is fits right into the classifier previously trained.

Your task is to build a solution for 7-way classification, while operating within the following constraints:

*   The solution can use the 5-way classifier, but cannot change the parameters of the classifier or add any new learned parameters.

*   You are allowed to compute averages and distances between the data encodings.

*   The solution should be reproducible in under 1 hour on an L4 GPU card.

*   The classifier has to perform inference on any random 500 data samples in under 2 minutes on an L4 GPU card.

## Deliverables

You need to submit:

*   Working code that can be used to reproduce and test your best model.
  * In this Colab notebook.
  * Reproducing your best model means that starting from the baseline classifier, we should be able to arrive at your final best model by executing the cells of the notebook.
*   The predictions on the test data (released two hours before the end of the competition).

**You absolutely need to ensure that:**

(1) your notebook is executable from top to bottom

(2) that the notebook contains the full code needed to reproduce your model

(3) that it can run on an L4 GPU



## Training Dataset

## Baseline Solution

Below you will find a very naive baseline solution: given an input vector, we use either randomly assign one of the new labels (5 and 6) with uniform probability over a 7-way classification, or we use the base classifier to make a prediction.

You can replace the code below with your solution.

## Inference and Evaluation

## Validation Dataset

## Test Dataset

---

## Editorial & Solutions

Official solution materials available in repository under `On-Site-Round/Help_BOBAI/Solution`.
