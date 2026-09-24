---
id: "noai-2024-finals-news-classification"
competition: "NOAI"
year: 2024
stage: "National Finals"
title: "Multi-Topic Chinese News Classification with Pretrained BERT"
domain: "NLP"
difficulty: "Olympiad Final"
evaluation_metric: "Macro F1"
tags:
  - "nlp"
  - "text-classification"
  - "chinese-nlp"
  - "bert"
  - "transformers"
  - "noai-2024"
dataset_links:
  - "https://bohrium.dp.tech/competitions/2223242868?tab=datasets"
  - "https://raw.githubusercontent.com/jaredliw/ioai-tsp-2025/main/noai-china-2024/news-text-classification/data_train.csv"
starter_code_url: "https://github.com/jaredliw/ioai-tsp-2025/tree/main/noai-china-2024/news-text-classification"
solution_notebook_url: "https://github.com/jaredliw/ioai-tsp-2025/blob/main/noai-china-2024/news-text-classification/submission_model.py"
source_url: "https://github.com/jaredliw/ioai-tsp-2025/tree/main/noai-china-2024/news-text-classification"
crawled_at: "2026-09-18T14:50:16.797585"
version: 1
---
# News Text Classification Task

> BERT Approach

> **Introduction:** This is the Question 3 of APOAI 2025 Mock Competition, and it is also the third question of the NOAI 2024 (China).

## I. Question Overview

A dataset for news text classification is provided, which is stored in a .csv file and contains two variables:

- `text`: The content of the news text.
- `category`: The category of the news text.

The training set is stored in `train_news.csv`, with a total of 1,000 samples. The testing set is stored in `test_news.csv`, with a total of 200 samples. During the competition, the test set samples without labels will be provided.

## II. Data Set

1. Address of the training set: `train_news.csv`, [Training Set](https://bohrium.dp.tech/competitions/2223242868?tab=datasets);
2. Test set (without labels): `test_news_nolabel.csv`, which contestants cannot access or download;
3. Test set (with labels): `test_news_label.csv`, which contestants cannot access or download.

## III. Task

Please use PyTorch to design and train a natural language processing model to achieve the news text classification task, that is, input the sentences of the news and output the news categories.

The specific requirements are as follows:

1. The total training time and testing time using the CPU should not exceed 10 minutes. The connection time and queuing time are not counted into the total time.
2. Tip: It is recommended to use Word Embedding + LSTM.

## IV. Submission

Please submit the `submission.ipynb` file, which contains the entire process of training the model. In `submission.ipynb`, store the prediction results of the test set in `submission.csv`. The naming and storage method of the label should be consistent with that of `train_news.csv`.

You can refer to the submission format in `baseline.ipynb`. The address of `baseline.ipynb`: [Question 3 of APOAI Mock Competition_baseline](https://bohrium.dp.tech/notebooks/84584239178).

## V. Scoring

1. When the training and testing are completed within the specified time, the scoring criterion is the average value of the F1-Scores of all categories. Please look up the meaning of F1-Score on the Internet by yourself.
2. If the F1-Scores of all categories are not calculated, a score of 0 will be given.
3. If the total time for training and testing exceeds the time limit, a score of 0 will be given.

## Preprocess text

## Define model and train

## Make predictions (on grader only)

## Score

Leaderboard A:

- F1 - business: 0.7428
- F1 - entertainment: 0.7111
- F1 - sport: 0.9122
- F1 - tech: 0.7936
- Score: 0.7899

Leaderboard B:

- F1 - business: 0.7999
- F1 - entertainment: 0.6842
- F1 - sport: 0.8611
- F1 - tech: 0.5600
- Score: 0.7263

---

## Editorial & Solutions

Includes baseline PyTorch training pipeline and model architecture definition in submission_model.py.
