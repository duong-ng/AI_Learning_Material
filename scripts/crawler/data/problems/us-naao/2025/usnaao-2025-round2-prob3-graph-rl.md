---
id: "usnaao-2025-round2-prob3-graph-rl"
competition: "US-NAAO"
year: 2025
stage: "Round 2 - In-Person Finals"
title: "Heuristic Graph Search & Dynamic Policy Optimization"
domain: "RL & Search"
difficulty: "Olympiad Final"
evaluation_metric: "Accuracy"
tags:
  - "search"
  - "astar"
  - "graphs"
  - "policy-optimization"
  - "usaaio-2025"
dataset_links: []
starter_code_url: "https://github.com/jaredliw/ioai-tsp-2025/blob/main/usaaio-2025/round2/problem-3.ipynb"
source_url: "https://www.usaaio.org/past-problems"
crawled_at: "2026-09-18T14:50:15.488685"
version: 1
---
# Problem 3 (100 points)

In this problem, you are asked to study Contrastive Language-Image Pre-Training (CLIP), a powerful tool in multimodal AI.

> WARNING !!!
> 
- Beyond importing libraries/modules/classes/functions in the preceding cell, you are **NOT allowed to import anything else for the following purposes**:
    - **As a part of your final solution.** For instance, if a problem asks you to build a model without using sklearn but you use it, then you will not earn points.
    - **Temporarily import something to assist you to get a solution.** For instance, if a problem asks you to manually compute eigenvalues but you temporarily use `np.linalg.eig` to get an answer and then delete your code, then you violate the rule.

    **Rule of thumb:** Each part has its particular purpose to intentionally test you something. Do not attempt to find a shortcut to circumvent the rule.

**We will use flickr30k dataset to do image-language matching.**

## Part 1 (5 points, coding task)

Do the following tasks to explore the properties of `dataset_train`:

1. `dataset_train` is a list-like object. Print the number of elements in it.
2. Consider index `idx = 2025`. Print the type of `dataset_train[idx]`.
3. Print all keys in `dataset_train[idx]`.
4. Name the value associated with the key `image` as `image_PIL`. Print it.
5. Convert `image_PIL` to a NumPy array object, called `image_np`. Print `image_np` and its shape.
6. Display this image by using `plt.imshow`.
7. Print the value associated with the key `alt_text`. Print its type.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 2 (5 points, coding task)

This dataset is too big. In our contest, we only use a small portion with 1000 samples.

To avoid introducing any bias, we will randomly select 1000 distinct samples.

**Use NumPy to randomly select 1000 sample indices.**

- Use the random seed number 2025 to generated randomized indices. After the generation is completed, reset the seed number back to `None`.
- The name of the output is called `indices`. It must be a list that contains 1000 integer type (not numpy array integers) objects.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 3 (5 points, coding task)

**In this part, we create our image and text datasets.**

- All sample indices are selected from `indices` generated in Part 2.
- All images (resp. texts) are extracted from the key `image` (resp. `alt_text`).
- The image (resp. text) dataset is called `image_list` (resp. `text_list`). The data type of both datasets is `list`.
- In `image_list`, each element is a **PIL** object.
- In `text_list`, each element is a **string** object.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

# Part 4 (5 points, coding task)

**In this part, we preprocess image data.**

1. Your job is to create a tensor `images_pt` from `image_list` that has shape `(1000,3,224,224)` and datatype `float64`.
   - The data range is from -1 to 1.
   - Hint: If `a` is a PIL object, then you can use `a.resize` to resize it.
2. Print `images_pt.shape`.
3. Print `images_pt.dtype`.
4. Print `images_pt[5]`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 5 (5 points, non-coding task)

Note that our final goal is to build a CLIP neural network. For the image data, we will use Vision Transformers (ViT) to extract image embeddings.

**With the above high level information, please explain the reasons behind the following things that you did in Part 4.**

1. Why the channel dimension is ahead of the height and width dimensions?
2. Why the sizes of all images are normalized to `(224,224)`?
3. Why each pixel value is normalized between -1 and 1?

\#\#\# WRITE YOUR SOLUTION HERE ###

Pretrained ViT are trained with these specific input formats, and matching them ensures compatibility and optimal performance.

This answers to all three questions.

""" END OF THIS PART """

## Part 6 (5 points, coding task)

In this part, we preprocess text data `text_list`.

1. Do tokenization with
   ```python
   tokenizer = BertTokenizer.from_pretrained('bert-base-uncased')
   ```
2. Call
   ```python
   token_id_list = tokenizer(text_list)['input_ids']
   ```
3. Print `token_id_list`.
4. Print the type of `token_id_list`.
5. Print the length of `token_id_list`.
6. Print `token_id_list[5]`.
7. Print the type of `token_id_list[5]`.
8. Print the type of `token_id_list[5][0]`.
9. For each `idx`, convert `token_id_list[idx]` from the above type to a 1-dim tensor. That is, after this step, `token_id_list` is a list that consists of all 1-dim tensors.
10. Print `token_id_list[5:7]`.
11. Print the data type of `token_id_list[5][0]`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 7 (5 points, non-coding task)

This part follows Part 6.

**Do the following tasks.**

1. Explain why token lists of all samples begin with token ID 101.
2. Explain why token lists of all samples end with token ID 102.

\#\#\# WRITE YOUR SOLUTION HERE ###

1. Token ID 101 is a `[CLS]` token. It denotes the start of a sentence.
2. Token ID 101 is a `[SEP]` token. It denotes the end of a sentence.

> Note:
>
> ```python
> tokenizer.convert_ids_to_tokens([101, 102])  # -> ['[CLS]', '[SEP]']
> ```

""" END OF THIS PART """

## Part 8 (5 points, coding task)

**In this part, we prepare our CLIP dataset.**

1. Define class `MyDataset` that subclasses `Dataset`.
   - `__init__`
      - Inputs: `images_pt`, `token_id_list`.
      - Attributes: Same as inputs.
   - `__len__`
      - Output: total number of samples.
   - `__getitem__`
      - Input: sample index `idx`.
      - Outputs: `images_pt[idx]`, `token_id_list[idx]`.
2. Define dataset `CLIP_dataset` that is an object of `MyDataset`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 9 (5 points, coding task)

### Part 9.1

**Define your own collate function.**

- The function name is `my_collate_fn`.
- Padding
  - For text data, let the longest sample be with `K` tokens.
  - Consider another text sample with `L` tokens satisfying `L < K`. Then, in addition to those `L` tokens, this sample is padded with `K-L` padding tokens whose values are 0.
- Outputs
  - `image_batch`. This is a tensor that has shape `(B,3,224,224)`.
  - `token_id_batch`. If the batch size is `B` and the longest sample in the text data has `K` tokens, then `token_id_batch` is a tensor with shape `(B,K)`.
  - `attention_mask_batch`. This is a tensor that has shape `(B,K)`. If a position is occupied by a non-padding token, its value is 1. Otherwise, if it is occupied by a padding token, its value is 0. Data types are `int64`.

### Part 9.2

**Define a DataLoader object called `CLIP_dataloader`.**

- Set `batch_size = 16`.
- Set `shuffle = True`.
- Use the collate function defined in Part 9.1.

\#\#\# WRITE YOUR SOLUTION HERE ###

---

""" END OF THIS PART """

## Part 10 (5 points, non-coding task)

**In this part, you are asked to answer some questions about a CLIP model that you shall build in the next part.**

- Write your answers in the text cell below.
- To get answers, you may need to run experimental code to better learn the ViT and BERT models.
- We only grade your answers in the text cell.

1. **Image encoder**
   - Define `model_image = ViTModel.from_pretrained('google/vit-base-patch16-224')`. We use all blocks except the last pooler layer. That is, this ViT model has two outputs, with their key names as `last_hidden_state` and `pooler_output`. You should take the value associated with the key `last_hidden_state`.
   - From the last hidden state, we project from position 0 to a latent space with dimension `embedding_size` (e.g., 512). The output is called image embedding.
2. **Text encoder**
   - Define `model_text = BertModel.from_pretrained('bert-base-uncased')`. We use all blocks except the last pooler layer. That is, this BERT model has two outputs, with their key names as `last_hidden_state` and `pooler_output`. You should take the value associated with the key `last_hidden_state`.
   - From the last hidden state, we project from position 0 to a latent space with dimension `embedding_size` (e.g., 512). The output is called text embedding.

**Answer the following questions.** (Reasoning is required only for Question 3.)

1. Let `image_batch` be with shape `(B,3,224,224)`. What is the shape of `model_image(image_batch)['last_hidden_state']`?
2. Let `token_id_batch` and `attention_mask_batch` be with shape `(B,L)`. What is the shape of `model_text(input_ids = token_id_batch, attention_mask = attention_mask_batch)['last_hidden_state']`?
3. For both the image encoder and the text encoder, we project the last hidden state from position 0 to a latent space with the same dimension `embedding_size`. \
   3.1. Why do we add this additional out-projection layer? \
   3.2. Why this layer is added on position 0 only? \
   3.3. Why are the output dimensions from these two encoders the same?

\#\#\# DO YOU EXPERIMENTAL STUDY HERE ###

""" END OF THIS PART """

\#\#\# WRITE YOUR SOLUTION HERE ###

1. The output shape is `(B,197,768)`.
   - ViT divides the $224\times224$ image into $16\times16$ patches, which gives $\frac{224}{16}\times\frac{224}{16}=14\times14=196$ patches.
   - ViT prepends a `[CLS]` token, making the sequence length 197.
   - The hidden size is 768.
2. The output shape is `(B,L,768)`.
   - The hidden size is 768.
3. 3.1. To map both image and text features into a shared embedding space. \
   3.2. The first token `[CLS]` is a learnable embedding that represents the whole image/sentence. \
   3.3. So that they can be compared, e.g., by cosine similarity.

""" END OF THIS PART """

## Part 11 (5 points, coding task)

**In this part, you are asked to build your CLIP model.**

- The class name is `MyCLIP`. It subclasses `nn.Module`.
- `__init__`:
  - It takes one input argument – the size of the final embedding of text and image data. Set its default value as 512.
  - Attribute `log_tau` is the log of temperature. It is a learnable parameter. Its initial value follows the standard normal distribution.
- `forward`:
  - It returns two objects: image embedding, text embedding.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 12 (5 points, non-coding task)

**Explain why we use $\log\tau$ as an attribute, not $\tau$.**

\#\#\# WRITE YOUR SOLUTION HERE ###

$\tau$ must remain strictly positive; otherwise, it will break the loss function. By parameterizing $\log\tau$, we don't need to worry about bounds, since $\exp(\cdot)$ always yields positive values.

""" END OF THIS PART """

## Part 13 (5 points, coding task)

**Do the following tasks:**

1. Define your model by calling `model_CLIP = MyCLIP()`.

2. Fix all parameter values in the ViT and Bert blocks in your model. That is, you are only allowed to train
   - Out-projection matrices in the image and text encoders.
   - Temperature.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 14 (5 points, coding task)

**Do the following tasks:**

1. Set the learning rate as `1e-3`.
2. Choose your optimization algorithm as `Adam`.
3. Define an optimizer.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 15 (5 points, coding task)

**In this part, you are asked to define a loss function.**

Let $I_i$ and $T_j$ be image $i$'s embedding and text $j$'s embedding, respectively. Let $B$ be the batch size. Let $\tau$ be the temperature.

Then the loss function is defined as

$$
L = \frac{1}{2} \left(- \frac{1}{B} \sum_{i = 0}^{B-1} \log \frac{\exp \left( \text{SIM} \left( I_i, T_i \right) / \tau \right) } {\sum_{j = 0}^{B-1} \exp \left( \text{SIM} \left( I_i, T_j \right) / \tau \right)} - \frac{1}{B} \sum_{i = 0}^{B-1} \log \frac{\exp \left( \text{SIM} \left( I_i, T_i \right) / \tau \right)} {\sum_{j = 0}^{B-1} \exp \left( \text{SIM} \left( I_j, T_i \right) / \tau \right)} \right) ,
$$

where

$$
\text{SIM} \left( I_i, T_j \right) = \frac{I_i^\top T_j}{|| I_i ||_2 || T_j ||_2} .
$$

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 16 (5 points, coding task)

**In this part, you are asked to train your model.**

1. Set the number of epochs as 100.
2. Do training on GPU.
3. For every epoch, print the average loss per sample in this epoch.
4. You may use `tqdm` to track your progress and help you manage your time.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

So far, we use the cosine function to measure the similarity between two vectors. Next, you are asked to do a theoretical study of its reasonableness.

**Your task is to prove the following theorem.**

**Theorem:**

- Let $\mathbf{x}, \mathbf{y} \in \Bbb R^d$ be two independent $d$-dim vectors that follow the same multivariate standard normal distribution $\mathcal N \left( \mathbf{0}_d , \mathbf{I}_{d \times d} \right)$.

Then for any $\epsilon>0$, when $d$ is large,

$$
\Bbb P \left( \frac{\mathbf{x}^\top \mathbf{y}}{|| \mathbf{x} ||_2 || \mathbf{y}||_2 } > \epsilon \right) \leq \frac{1}{\epsilon^2 d} .
$$

**We prove this in multiple steps.**

## Part 17 (5 points, non-coding task)

**First, you are asked to prove the following lemma.**

**Lemma 1:**

- If $\mathbf{x} \sim \mathcal N \left( \mathbf{0}_d , \mathbf{I}_{d \times d} \right)$, then for any unit vector $\mathbf{\hat e} \in \Bbb R^d$, $$\mathbf{\hat e}^\top \mathbf{x} \sim \mathcal N \left( 0 , 1 \right) .$$

That is, the projection of $\mathbf{x}$ onto $\mathbf{\hat e}$ is a standard normal random variable.

**Hint:** You can directly use the result that $\mathbf{\hat e}^\top \mathbf{x}$ is normal. Therefore, you only need to prove that $\mathbf{\hat e}^\top \mathbf{x}$ has mean 0 and variance 1.

\#\#\# WRITE YOUR SOLUTION HERE ###

> **Recap:**
>
> For a random variable $X$,
> - $\text E[aX\pm b] = a\text E[X] \pm b$.
> - $\text{Var}[X] = \text E[X^2] - (\text E[X])^2$.
> - $\text{Var}[aX\pm b] = a^2\text{Var}[X]$.

Given $\text E(\mathbf{x})=0$ and $\text{Var}(\mathbf{x})=1$, we have

$$
\begin{aligned}
\text E[\mathbf{\hat e}^\top \mathbf{x}] &= \mathbf{\hat e}^\top \text E[\mathbf{x}] \\
                                         &= \mathbf{\hat e}^\top \mathbf{0}_d \\
                                         &= 0
\end{aligned}
$$

and

$$
\begin{aligned}
\text{Var}[\mathbf{\hat e}^\top \mathbf{x}] &= \text E[\mathbf{\hat e}^\top \mathbf{x} \mathbf{x}^\top \mathbf{\hat e}] - (\text E[\mathbf{\hat e}^\top \mathbf{x}])^2 \\
                                            &= \mathbf{\hat e}^\top \text{Cov}(\mathbf{x}) \mathbf{\hat e} \\
                                            &= \mathbf{\hat e}^\top \mathbf{I}_{d \times d} \mathbf{\hat e} \\
                                            &= \|\mathbf{\hat e}\|^2 \\
                                            &= 1.
\end{aligned}
$$

Shown.

""" END OF THIS PART """

## Part 18 (5 points, non-coding task)

Lemma 1 implies that the projection of $\mathbf{x}$ onto any direction is a standard normal. Therefore, all directions are homogeneous.

Therefore,

$$
\Bbb P \left( \frac{\mathbf{x}^\top \mathbf{y}}{|| \mathbf{x} ||_2 || \mathbf{y}||_2 } > \epsilon \right) = \Bbb P \left( \frac{\mathbf{x}^\top \mathbf{y}}{|| \mathbf{x} ||_2 || \mathbf{y}||_2 } > \epsilon \mid \mathbf{x} = \mathbf{\hat x} \right), \ \forall \ \mathbf{\hat x} \in \Bbb R^d .
$$

For simplicity, we consider

$$
\mathbf{\hat x} = \begin{bmatrix} 1 \\ 0 \\ \vdots \\ 0 \end{bmatrix} \in \Bbb R^d .
$$

Therefore, we only need to bound

$$
\Bbb P \left( \frac{y_0}{|| \mathbf{y}||_2 } > \epsilon \right) .
$$

By symmetry, it is easy to see that

$$
\text{E} \left[ \frac{y_0}{|| \mathbf{y}||_2} \right] = 0 .
$$

Hence, we get

$$
\begin{align*} \Bbb P \left( \frac{y_0}{|| \mathbf{y}||_2 } > \epsilon \right) & \leq \frac{\text{Var} \left[ \frac{y_0}{|| \mathbf{y}||_2} \right]}{\epsilon^2} \\ & = \frac{\text{E} \left[ \frac{y_0^2}{|| \mathbf{y}||_2^2} \right]}{\epsilon^2} \\ & = \frac{1}{\epsilon^2 d} \ \text{E} \left[ \frac{y_0^2}{\frac{1}{d}\sum_{i=0}^{d-1} y_i^2} \right] \end{align*}
$$

where the first inequality follows from Chebyshev’s inequality.

To prove the theorem, it is equivalent to prove the following lemma.

**Lemma 2:**

Let $y_0, \cdots , y_{d-1}$ be identically independent variables that are all standard normals. Then for large $d$,

$$
\text{E} \left[ \frac{y_0^2}{\frac{1}{d}\sum_{i=0}^{d-1} y_i^2} \right] \approx 1 .
$$

In this part, your task is to prove this lemma.

**Hint:** It is hard to prove this statement in an exact way. You can make any reasonable approximation.

\#\#\# WRITE YOUR SOLUTION HERE ###

> **Recap:**
>
> Suppose $Z_1, Z_2, \cdot, Z_k \overset{\text{i.i.d.}}{\sim} \mathcal N(0,1)$, then the variable
> $$X = \sum_{i=1}^{k} Z_i^2$$
> follows a chi-square distribution with $k$ degrees of freedom: $\sim \chi^2_k$.
>
> Also, $\text E[X]=d$ and $\text{Var}[X]=2k$.

Consider

$$
\frac{1}{d}\sum_{i=0}^{d-1} y_i^2 \sim \chi^2_d ,
$$

which has mean $\frac{1}{d}\cdot d=1$ and variance $\frac{1}{d^2}\cdot 2d=\frac{2}{d}$.

For large $d$, we approximate the denominator by its mean, so

$$
\text{E} \left[ \frac{y_0^2}{\frac{1}{d}\sum_{i=0}^{d-1} y_i^2} \right] \approx \text{E} \left[ y_0^2 \right] = 1 ,
$$

noting that $y_0^2 \sim \chi^2_1$.

""" END OF THIS PART """

## Part 19 (5 points, non-coding task)

Lemmas 1 and 2 jointly imply the theorem above. **Please use the result in this theorem to explain why it is reasonable to use the cosine function to measure the similarity of two embedding vectors and why the latent space needs to be high dimensional (such as 512, 768, 1024).**

\#\#\# WRITE YOUR SOLUTION HERE ###

In high dimensions, randomly sampled vectors from a standard normal distribution are almost always nearly orthogonal (i.e., their cosine similarity tends toward zero). So if we measure cosine similarity between two vectors and find a large value, it's statistically very unlikely to happen by chance. It strongly suggests actual semantic or structural similarity.

""" END OF THIS PART """

## Part 20 (5 points, non-coding task)

In the loss function, we introduced a crucial learnable parameter $\tau$, called temperature.

Let us explore some properties of $\tau$.

Let $z_0 > z_1 > \cdots > z_{N-1}$.

Define

$$
f_i = \frac{\exp \left( z_i / \tau \right)} {\sum_{j = 0}^{N-1} \exp \left( z_j / \tau \right)} .
$$

**Do the following analysis. Reasoning is required.**

1. Compute $$\lim_{\tau \rightarrow 0^+} f_i .$$
2. Compute $$\lim_{\tau \rightarrow \infty} f_i .$$

\#\#\# WRITE YOUR SOLUTION HERE ###

1. Divide numerator and denominator by $\exp(z_0/\tau)$, we get
   $$f_i = \frac{\exp \left( (z_i-z_0) / \tau \right)} {\sum_{j = 0}^{N-1} \exp \left( (z_j-z_0) / \tau \right)} .$$
   For all $j\ne0$, $\exp \left( (z_j-z_0) / \tau \right) \rightarrow 0$ when $\tau \rightarrow 0^+$, since $z_j-z_0<0$. Therefore,
   $$ \lim_{\tau \rightarrow 0^+} f_i = \begin{cases} 1 & \mbox{if } i = 0 \\ 0 & \mbox{otherwise}. \end{cases}$$
2. As $\tau \rightarrow \infty$, all $z_i / \tau \rightarrow 0$. So, we have \
   $$\lim_{\tau \rightarrow \infty} f_i = \frac{\exp \left( 0 \right)} {\sum_{j = 0}^{N-1} \exp \left( 0 \right)} = \frac{1}{N} . $$

> When the temperature is very small, the softmax becomes sharp and behaves like an argmax. In this case, if the prediction is incorrect, the loss becomes very high, leading to large gradients and potentially unstable training.
>
> On the other hand, when the temperature is very large, the softmax output approaches a uniform distribution, indicating that the model has low confidence and treats all classes almost equally. This results in a higher but more stable loss, with smaller gradients that can slow down learning.
>
> So, choosing a suitable temperature is important, and it is often beneficial to let the model learn and adjust this parameter during training.

""" END OF THIS PART """

---

## Editorial & Solutions

Official competition notebook available at jaredliw/ioai-tsp-2025.
