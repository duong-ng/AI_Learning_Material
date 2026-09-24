---
id: "noai-2024-finals-real-or-fake-image"
competition: "NOAI"
year: 2024
stage: "National Finals"
title: "AI-Generated Image Artifact Detection and Forensic Verification"
domain: "CV"
difficulty: "Olympiad Final"
evaluation_metric: "ROC-AUC"
tags:
  - "cv"
  - "deepfake-detection"
  - "forensics"
  - "diffusion-artifacts"
  - "noai-2024"
dataset_links:
  - "https://raw.githubusercontent.com/jaredliw/ioai-tsp-2025/main/noai-china-2024/real-or-fake-image/data_train.csv"
  - "https://bohrium.dp.tech/competitions/2623226705?tab=datasets"
starter_code_url: "https://github.com/jaredliw/ioai-tsp-2025/tree/main/noai-china-2024/real-or-fake-image"
solution_notebook_url: "https://github.com/jaredliw/ioai-tsp-2025/blob/main/noai-china-2024/real-or-fake-image/submission_model.py"
source_url: "https://github.com/jaredliw/ioai-tsp-2025/tree/main/noai-china-2024/real-or-fake-image"
crawled_at: "2026-09-18T14:50:18.136788"
version: 1
---
# Real or Fake Image Recognition Task

> **Introduction:** This is the Question 2 of APOAI 2025 Mock Competition, and it is also the second question of the NOAI 2024 (China).

## I. Question Overview

CIFAR10 is a commonly used image classification data set. Each image is a 3x32x32 color image. Here, 3 represents the number of color channels, and 32x32 represents the image size. We have selected 5,000 training images and 1,000 test images from CIFAR10. These 6,000 images are obtained by taking pictures and are defined as "real" images.

The Diffusion Model is a very powerful image generation model that can be used to generate "fake" images. We used a Diffusion Model on CIFAR10 to generate 6,000 "fake" images, among which 5,000 "fake" images are for the training set and 1,000 are for the test set. The samples in the test set cannot be accessed during the competition.

## II. Data Set

1. Address of the training set: [Training Set](https://bohrium.dp.tech/competitions/2623226705?tab=datasets).
    - The real pictures of the training set are stored in the `train/cifar` folder.
    - The fake pictures of the training set are stored in the `train/uvit` folder.
2. Test set (cannot be directly downloaded during the competition):
    - The real pictures of the test set are stored in the `test/cifar` folder.
    - The fake pictures of the test set are stored in the `test/uvit` folder.

## III. Task

Please use PyTorch to design a **Convolutional Neural Network** to implement model training and testing, which is used to distinguish which image is a "real" image and which is a "fake" image.

The specific requirements are as follows:

1. During the training process, please set the Label of the "real" image to 0 by yourself, and set the Label of the "fake" image to 1.
2. Name the class of the model as `MyModel()`. Using other names may lead to failure in submission.
3. Include at least 2 convolutional layers (`nn.Conv2d`) and 2 max pooling layers (`nn.MaxPool2d`). Do not use other methods to define convolutional layers and pooling layers. Please build the neural network directly and do not use `nn.Sequential()` nesting. The scoring system cannot detect the network structure inside `nn.Sequential()`, and a score of 0 will be directly given.
4. Include at most 2 linear layers (`nn.Linear`). Please build the neural network directly and do not use `nn.Sequential()` nesting. The scoring system cannot detect the network structure inside `nn.Sequential()`, and a score of 0 will be directly given.
5. The activation function of each layer can only be selected from `nn.ReLU`, `nn.Sigmoid`, `nn.Tanh`, `nn.ELU`, `nn.LeakyReLU`, `nn.PreLU`.
6. The loss function, optimizer (solver), and learning rate can be freely selected.

## IV. Submission

Please submit a compressed file named `submission.zip`. After decompression, it should contain the model file `submission_model.py` and the model parameter file `submission_dic.pth`. The specific requirements are as follows:

1. Save the class definition of the model and the required precursor libraries in `submission_model.py`.
2. Save the trained model parameters in `submission_dic.pth`. The model parameters will be loaded during scoring.
3. You can refer to the method in `baseline.ipynb` to generate the `submission.zip` file on the platform for submission. You can also download the data set to the local machine, train the model, and then package it into a `submission.zip` file for submission.

> **Address of `baseline.ipynb`:** [Question 2 of APOAI2025 Mock Competition_baseline](https://bohrium.dp.tech/notebooks/53453886135/).

## V. Scoring

1. When the number of linear layers and the number of neurons in the neural network meet the requirements, the score is calculated as follows:
    1. Network complexity score: `Network_Simplicity_Score = 1 / (Num_Linear + Num_Conv + 1)`. \
       Here, `Num_Linear` is the number of linear layers; `Num_Conv` is the number of convolutional layers.
    2. The accuracy rate of the model on the test set: Accuracy (Now the metrics has bug to double the accuracy =v=).
    3. Final score: `Score = (Network_Simplicity_Score + Accuracy) * 3/4`.
2. When the number of linear layers and the number of neurons in the neural network do not meet the requirements, the score is 0.

> **Remarks:** The leaderboard A uses 50% of the data in the test set, which can be displayed in real time during the competition to help contestants debug the model. The leaderboard B uses the remaining 50% of the data in the test set and is calculated after the competition ends. The score of the leaderboard B is the final score.

## Load data

## Define model and train

## Save for submission

## Score

Leaderboard A accuracy: 1.0000

Leaderboard B accuracy: 1.0000

---

## Editorial & Solutions

Includes baseline PyTorch training pipeline and model architecture definition in submission_model.py.
