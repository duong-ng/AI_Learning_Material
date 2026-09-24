---
id: "aicc-round3-drawn-apart"
competition: "AICC"
year: 2025
stage: "Community Contest"
title: "AICC Drawn Apart: Sketch-to-Photo Cross-Domain Representation"
domain: "CV"
difficulty: "Hard"
evaluation_metric: "Accuracy"
tags:
  - "cv"
  - "cross-domain"
  - "sketches"
  - "representation-learning"
  - "aicc"
dataset_links: []
starter_code_url: "https://github.com/AI-Community-Contest/solutions/blob/main/round-3/drawn-apart.ipynb"
solution_notebook_url: "https://github.com/AI-Community-Contest/solutions/tree/main/round-3"
source_url: "https://github.com/AI-Community-Contest/solutions/tree/main/round-3"
crawled_at: "2026-09-18T14:50:29.590866"
version: 1
---
# Drawn Apart

Solution author: Walnit

# Dataset

# Author's Solution

This solution builds on the approach that the paper that introduced the dataset which this challenges draws its data from (DomainNet), called *M3SDA* - Moment-Matching in Multi Source Domain Adaptation.

The gist of the idea is to make use of the fact that we are given **multiple sources**. Thus, we fine tune a feature extractor to *align the features of multiple domains*, and classify using those aligned domains.

Note: this solutions aims to illustrate M3SDA. It was not modified excessively to give maximum performance. Please experiment with the code below to see whether you can further improve the performance!

### Loading the dataset

We'll stick to using ResNet34 for the purposes of illustrating M3SDA. You may experiment with different backbones.  

We also split the datasets instead of combining them as in the baseline.

M3SDA trains somewhat similarly to a GAN, with multiple stages of its algorithm. Thus, training may take a bit longer, but the concept is theoretically sound.  

Figure 3 of the M3SDA paper illustrates the architecture best. The only models involved are a feature extractor, and *two* classifiers (I'll explain in a minute!) To maximize simplicity, I'll use the ResNet34 from the baseline, and a single Linear layer as the classifier.

We set up the optimizers here. Weight decay follows the value recommended in the paper, but experiment if changing the value boosts the score.

From here, let's walk through one iteration of the algorithm to illustrate how it works.  

We start by sampling one batch of data from all domains, and get their labels if possible.

For all domains, extract their features using the feature extractor.

Then, the classifiers we defined earlier, predict on *the domains we have labels for*.

Now, we calculate the loss for this first phase of the algorithm.

The objective for this phase rather simple - perform supervised learning on the labelled domain, using typical cross-entropy loss. However, the secret sauce is the mysterious `msda_regularizer` below. What is it, and how does it make this approach different?  

First, we must understand what a *moments* are. In statistics, moments describe data. More specifically, the first, second, and third moments represent the mean, variance, and skewness of the dataset.

To encourage domain-invariant features, we first center the features by subtracting the mean. Next, we penalise the euclidean distance between the features in order to encourage them to be similar across the domains. Finally, we repeat this over the other two moments, which results in a cost function that allows for features across domains to share similar structure in their distribution.  

Mathematically inclined folks should read the proof in the paper for a clearer, more accurate description.

And, with loss calculated, all we have to do is backpropagate! Here, we backpropagate on all three models.

Now, we enter phase two of the algorithm. The first step is to perform the exact same steps as above, to get our *supervised loss* - as the terms are only calculated from the labelled data.

The second step is something new - we classify the features of the unlabelled data using the classifiers separately. We then calculate the discrepancy between the classification of the two classifiers. We call this the *discrepancy loss*.

Finally, we *maximize* the discrepancy loss (note - instead of +) instead of minimizing it.  

Why? It turns out that if you only train to align the domains, i.e. only do step 1, the feature extractor has no exposure to the target domain. This causes features that a similar in nature, or shared between various classes, to be misclassified.  

Thus, in this step, we maximize the discrepancy between the two classifiers. In an ideal world, they should have the same outputs, yet they vary due to stochasticity. This is perfect for us, as it highlights the confusion present in the feature extractor, which is something that we will address in the third phase.  

In line with this explanation, we only optimize the two classifiers, and freeze the weights of the feature extractor. The combination of supervised and discrepancy losses ensure that the classifiers will not catastrophically forget everything it learned from the labelled domains.

We're finally at phase 3, which is simple - minimize this discrepancy by optimizing the feature extractor. It's as easy as freezing the classifiers and training the generator to minimize the discrepancy loss.  

Note that when training, this step takes longer to converge. Thus, we run this step a multiple times in one pass of the algorithm.

And... we're done! Let's clean our instance up a bit and ready the training loop.

Since this is a multi-step training algorithm, performance is bound to vary. Thus, it is important that we keep track of the best model during training, by testing it against the validation dataset every epoch.

Now, the below code looks like an absolute behemoth. However, it's just the three steps above concatenated, as well as some validation code.  

We run it for 30 epochs as its the number of epochs that runs in approximately an hour - not too long, but still effective.

Finally, we just have to predict on the test dataset. Load the weights back, and remember to test which classifier of the two is most effective!

After choosing the classifier, we generate the submission CSV.

And... we're done! 

This code was tested and run on Kaggle's P100 GPU.

---

## Editorial & Solutions

Official baseline code and task notebooks provided by the AI Community Contest team.
