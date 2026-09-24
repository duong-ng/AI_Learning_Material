---
id: "usnaao-2025-round2-prob2-nlp-tokenization"
competition: "US-NAAO"
year: 2025
stage: "Round 2 - In-Person Finals"
title: "Morphological Subword Segmentation & Masked Language Probing"
domain: "NLP"
difficulty: "Olympiad Final"
evaluation_metric: "Macro F1"
tags:
  - "nlp"
  - "tokenization"
  - "bpe"
  - "transformers"
  - "usaaio-2025"
dataset_links: []
starter_code_url: "https://github.com/jaredliw/ioai-tsp-2025/blob/main/usaaio-2025/round2/problem-2.ipynb"
source_url: "https://www.usaaio.org/past-problems"
crawled_at: "2026-09-18T14:50:14.189911"
version: 1
---
# Problem 2 (100 points)

**Multi-head attention (MHA)** is a big breakthrough in AI. Based on its original form, there are many variants that improved it.

In this problem, you are asked to study multi-head attention and its variants.

We use the following notation in this problem.

- $B$: batch size. $b$: index of a sample.
- $L_1$: length of an attending sequence. $l_1$: index of a position in this sequence.
- $L_2$: length of a being attended sequence. $l_2$: index of a position in this sequence.
- $D_1$: dimension of a hidden state/token in an attending sequence.
- $D_2$: dimension of a hidden state/token in a being attended sequence.
- $H$: number of heads. $h$: index of a head.
- $D_v$: dimension of a value vector.
- $D_{qk}$: dimension of a query/key vector.

> WARNING !!!
> 
- Beyond importing libraries/modules/classes/functions in the preceding cell, you are **NOT allowed to import anything else for the following purposes**:
    - **As a part of your final solution.** For instance, if a problem asks you to build a model without using sklearn but you use it, then you will not earn points.
    - **Temporarily import something to assist you to get a solution.** For instance, if a problem asks you to manually compute eigenvalues but you temporarily use `np.linalg.eig` to get an answer and then delete your code, then you violate the rule.

    **Rule of thumb:** Each part has its particular purpose to intentionally test you something. Do not attempt to find a shortcut to circumvent the rule.

## Part 1 (5 points, non-coding task)

**Do the following tasks (Reasoning is not required).**

1. For each hidden state at position $l_1$ in an attending sequence, $\mathbf{x}_{l_1} \in \Bbb R^{D_1}$, we project it into a query vector for head $h$ according to
   $$\mathbf{q}_{l_1,h} = \mathbf{W}^{\mathbf{Q}}_h \mathbf{x}_{l_1} .$$ \
   What is the shape of $\mathbf{W}^{\mathbf{Q}}_h$?
2. For each hidden state at position $l_2$ in a being attended sequence, $\mathbf{y}_{l_2} \in \Bbb R^{D_2}$, we project it into a key vector for head $h$ according to
   $$\mathbf{k}_{l_2,h} = \mathbf{W}^{\mathbf{K}}_h \mathbf{y}_{l_2} .$$ \
   What is the shape of $\mathbf{W}^{\mathbf{K}}_h$?
3. For each hidden state at position $l_2$ in a being attended sequence, $\mathbf{y}_{l_2} \in \Bbb R^{D_2}$, we project it into a value vector for head $h$ according to
   $$\mathbf{v}_{l_2,h} = \mathbf{W}^{\mathbf{V}}_h \mathbf{y}_{l_2} .$$ \
   What is the shape of $\mathbf{W}^{\mathbf{V}}_h$?

\#\#\# WRITE YOUR SOLUTION HERE ###

1. $\mathbf{W}^{\mathbf{Q}}_h$ projects from $\Bbb R^{D_1}$ to $\Bbb R^{D_{qk}}$. Therefore, it has shape $(D_{qk},D_1)$.
2. $\mathbf{W}^{\mathbf{K}}_h$ projects from $\Bbb R^{D_2}$ to $\Bbb R^{D_{qk}}$. Therefore, it has shape $(D_{qk},D_2)$.
3. $\mathbf{W}^{\mathbf{V}}_h$ projects from $\Bbb R^{D_2}$ to $\Bbb R^{D_v}$. Therefore, it has shape $(D_v,D_2)$.

""" END OF THIS PART """

## Part 2 (5 points, non-coding task)

For $\mathbf{M} \in \left\{ \mathbf{Q}, \mathbf{K}, \mathbf{V} \right\}$, we concatenate $\mathbf{M}$-projection matrices $\left\{ \mathbf{W}^{\mathbf{M}}_h : h \in \left\{ 0, 1, \cdots , H-1 \right\} \right\}$ along axis 0 as

$$
\mathbf{W}^{\mathbf{M}} = \begin{bmatrix} \mathbf{W}^{\mathbf{M}}_0 \\ \mathbf{W}^{\mathbf{M}}_1 \\ \vdots \\ \mathbf{W}^{\mathbf{M}}_{H-1} \end{bmatrix} .
$$

At each position $l_1$ in an attending sequence, we concatenate queries $\left\{ \mathbf{q}_{l_1,h} : h \in \left\{ 0, 1, \cdots , H-1 \right\} \right\}$ along axis 0 to get

$$
\mathbf{q}_{l_1} = \begin{bmatrix} \mathbf{q}_{l_1,0} \\ \mathbf{q}_{l_1,1} \\ \vdots \\ \mathbf{q}_{l_1,H-1} \end{bmatrix} .
$$

At each position $l_1$ in an attending sequence, we concatenate keys/values $\mathbf{m} \in \left\{ \mathbf{k}, \mathbf{v} \right\}$ $\left\{ \mathbf{m}_{l_2,h} : h \in \left\{ 0, 1, \cdots , H-1 \right\} \right\}$ along axis 0 to get

$$
\mathbf{m}_{l_2} = \begin{bmatrix} \mathbf{m}_{l_2,0} \\ \mathbf{m}_{l_2,1} \\ \vdots \\ \mathbf{m}_{l_2,H-1} \end{bmatrix} .
$$

**Do the following tasks (Reasoning is not required).**

1. What is the shape of $\mathbf{W}^{\mathbf{M}}$ for $\mathbf{M} \in \left\{ \mathbf{Q}, \mathbf{K}, \mathbf{V} \right\}$?
2. What is the shape of $\mathbf{q}_{l_1}$?
3. What is the relationship between $\mathbf{q}_{l_1}$ and $\mathbf{W}^{\mathbf{Q}}$?
4. For $\mathbf{m} \in \left\{ \mathbf{k}, \mathbf{v} \right\}$, what is the shape of $\mathbf{m}_{l_2}$?
5. What is the relationship between $\mathbf{m}_{l_2}$ and $\mathbf{W}^{\mathbf{M}}$?

\#\#\# WRITE YOUR SOLUTION HERE ###

1. The shape of $\mathbf{W}^{\mathbf{Q}}$ is $(H\cdot D_{qk},D_1)$. \
   The shape of $\mathbf{W}^{\mathbf{K}}$ is $(H\cdot D_{qk},D_2)$. \
   The shape of $\mathbf{W}^{\mathbf{V}}$ is $(H\cdot D_{v},D_2)$.
2. The shape of $\mathbf{q}_{l_1}$ is $(H\cdot D_{qk},)$.
3. $\mathbf{q}_{l_1} = \mathbf{W}^{\mathbf{Q}}\mathbf{x}_{l_1}$.
4. The shape of $\mathbf{k}_{l_2}$ is $(H\cdot D_{qk},)$. \
   The shape of $\mathbf{v}_{l_2}$ is $(H\cdot D_{v},)$.
5. $\mathbf{m}_{l_2} = \mathbf{W}^{\mathbf{M}}\mathbf{y}_{l_2}$.

""" END OF THIS PART """

## Part 3 (10 points, non-coding task)

Define function $\text{Softmax}: \Bbb R^d \rightarrow \Bbb R^d$, with the $i$th output value as

$$
\text{Softmax}_i \left( \mathbf{z} \right) = \frac{\exp \left( z_i \right)}{\sum_{j=0}^{d-1} \exp \left( z_j \right)} .
$$

At position $l_1$ in the attending sequence, its attention score to position $l_2$ in the being attended sequence for head $h$ is denoted as $\alpha_{h, l_1 l_2}$.

We can write $\alpha_{h, l_1 l_2}$ in the following form:

$$
\alpha_{h, l_1 l_2} = \text{Softmax}_{l_2} \left( {\color{red} \boxed{???}} \right) ,
$$

**What is the formula in the above red box (reasoning is not required)?**

\#\#\# WRITE YOUR SOLUTION HERE ###

Let 

$$
\mathbf{K}_h = \begin{bmatrix} \mathbf{k}_{0,h}^\top \\ \mathbf{k}_{1,h}^\top \\ \vdots \\ \mathbf{k}_{L_2-1,h}^\top\end{bmatrix} ,
$$

then

$$
\alpha_{h, l_1 l_2} = \text{Softmax}_{l_2} \left( \frac{\mathbf{K}_h \mathbf{q}_{l_1,h}}{\sqrt{D_{qk}}} \right) .
$$

> Here, we divide by $\sqrt{D_{qk}}$ for numerical stability.
>
> Let us consider a pair of query/key vectors, $\mathbf{a}, \mathbf{b} \in \mathbb R^{D_{qk}}$, where each component is drawn independently from a standard normal distribution,
> $$a_i, b_i \overset{\text{i.i.d.}}{\sim} \mathcal N(0,1) .$$
>
> Their dot product is
> $$\mathbf{a}\cdot \mathbf{b} = \sum_{i=0}^{D_{qk}} a_ib_i .$$
>
> Since $a_ib_i$ has $\text{E}[a_ib_i]=0$ and $\text{Var}[a_ib_i]=1$, it follows that
> $$\text{E}[\mathbf{a}\cdot \mathbf{b}]=0, \quad \text{Var}[\mathbf{a}\cdot \mathbf{b}] = \sum_{i=0}^{D_{qk}} \text{Var}[a_ib_i]=D_{qk} .$$
>
> Thus, the standard deviation of the dot product grows with $\sqrt{D_{qk}}$. Here comes the factor in the denominator.

""" END OF THIS PART """

## Part 4 (5 points, non-coding task)

At position $l_1$ in an attending sequence, for head $h$, the information extracted from attending to a being attended sequence is given by 

$$
\mathbf{o}_{h,l_1} = \sum_{l_2 = 0}^{L_2 - 1} \alpha_{h, l_1 l_2} \mathbf{v}_{l_2,h} .
$$

We hereafter call $\mathbf{o}_{h,l_1}$ a **pre-out-projection output vector**.

**Do the following tasks.**

1. What is the shape of vector $\mathbf{o}_{h,l_1}$?
2. We concatenate $\left\{\mathbf{o}_{h,l_1} : h \in \left\{ 0, 1 , \cdots , H-1 \right\} \right\}$ along axis 0: $$\mathbf{o}_{l_1} = \begin{bmatrix} \mathbf{o}_{0,l_1} \\ \mathbf{o}_{1,l_1} \\ \vdots \\ \mathbf{o}_{H-1,l_1} \end{bmatrix}$$ \
   What is the shape of $\mathbf{o}_{l_1}$?
3. We project $\mathbf{o}_{l_1}$ to a **post-out-projection output vector** via an out-projection matrix: $$\mathbf{x}_{l_1}^{out} = \mathbf{W}^O \mathbf{o}_{l_1} \in \Bbb R^{D_1} ,$$ where $$\mathbf{W}^O = \begin{bmatrix} \mathbf{W}^O_0 & \mathbf{W}^O_1 & \cdots & \mathbf{W}^O_{H-1} \end{bmatrix}.$$ \
   What is the shape of $\mathbf{W}^O_h$ for each $h \in \left\{ 0 , 1 , \cdots , H-1 \right\}$ and $\mathbf{W}^O$?

\#\#\# WRITE YOUR SOLUTION HERE ###

1. $\alpha_{h, l_1 l_2}$ is a scalar; the shape follows $\mathbf{v}_{l_2,h}$, which is $(D_v,)$.
2. The shape is $(H\cdot D_v,)$.
3. $\mathbf{W}^O$ projects from $\Bbb R^{H\cdot D_v}$ to $\Bbb R^{D_1}$. Therefore, it has shape $(D_1, H\cdot D_v)$. \
   The shape of $\mathbf{W}^O_h$ is $(D_1,D_v)$.

""" END OF THIS PART """

## Part 5 (10 points, coding task)

**In this part, you are asked to build your own multi-head attention module that subclasses `nn.Module`.**

- For simplicity, we ignore any masking. That is, each position in an attending sequence attends to all positions in a being attended sequence.
- In your code, you do not need to worry about whether your code is efficient in an autoprogressive token generation process when your module is used in inference in a GPT-like task. \
  That is, if we use your code in a GPT-like task to autoprogressively generate tokens, it is totally fine if you repeatly generate the same key and value at a given position rather than more efficiently storing their values in cache.
- The class name is `MyMHA`.
- Attributes:
  - `D_1`: Dimension of a hidden state/token in an attending sequence.
  - `D_2`: Dimension of a hidden state/token in a being attended sequence.
  - `D_v`: Dimension of a value vector.
  - `D_qk`: Dimension of a query/key vector.
  - `H`: Number of heads.
  - `W_Q`: A linear module whose weight is a query-projection matrix. The shape should be consistent with your answer in Part 2. No bias.
  - `W_K`: A linear module whose weight is a key-projection matrix. The shape should be consistent with your answer in Part 2. No bias.
  - `W_V`: A linear module whose weight is a value-projection matrix. The shape should be consistent with your answer in Part 2. No bias.
  - `W_O`: A linear module whose weight is an out-projection matrix. The shape should be consistent with your answer in Part 4. No bias.
- Method `__init__`:
  - Inputs:
    - `D_1`
    - `D_2`
    - `D_qk`
    - `D_v`
    - `H`
  - Outputs:
    - None.
  - What to do inside this method:
    - Initialize attribute values.
- Method `forward`:
  - Inputs:
    - An attending sequence (tensor) with shape `(B,L_1,D_1)`.
    - A being attended sequence (tensor) with shape `(B,L_2,D_2)`.
  - Outputs:
    - Post-out-projection outputs with shape `(B,L_1,D_1)`.
  - What to do inside this method:
    - Compute the outputs.
    - After each operation, add a comment on the tensor shape.
    - **Do not use any loop.**

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

Next, let us study a variant of MHA: **Group Query Attention (GQA)**.

Recall that in MHA, the number of heads in queries, keys and values are the same, $H$. Thus, query $\mathbf{q}_{l_1, h}$ attends to key $\mathbf{k}_{l_2, h}$ with the same head index $h$.

In GQA, we relax this constraint by allowing keys and values to have $G$ heads ($G\le H$), where $G$ is a factor of $H$. For instance, if $H=12$, then $G \in \left\{ 1, 2, 3, 4, 6, 12 \right\}$.

In GQA, a query $\mathbf{q}_{l_1, \color{red}{h}}$ with head $\color{red}{h}$ is permitted to attend to a key $\mathbf{k}_{l_2, \color{blue}{g}}$ and use value $\mathbf{v}_{l_2, \color{blue}{g}}$ in computing its output with head $\color{blue}{g}$ if

$$
{\color{red}{h}} \equiv {\color{blue}{g}} \pmod{G} .
$$

Thus, each head in keys and values is mapped to $\frac{H}{G} \geq 1$ heads in queries.

As an example, suppose $H=12$ and $G=3$. Then

- Head ${\color{blue}{g}} = 0$ in keys and values is associated with heads ${\color{red}{h}} = 0, 3, 6, 9$ in queries.
- Head ${\color{blue}{g}} = 1$ in keys and values is associated with heads ${\color{red}{h}} = 1, 4, 7, 10$ in queries.
- Head ${\color{blue}{g}} = 2$ in keys and values is associated with heads ${\color{red}{h}} = 2, 5, 8, 11$ in queries.

## Part 6 (5 points, non-coding task)

For $\mathbf{M} \in \left\{ \mathbf{K}, \mathbf{V} \right\}$, denote the $\mathbf{M}$-projection matrix as 

$$
\mathbf{W}^{\mathbf{M}, GQA} = \begin{bmatrix} \mathbf{W}^{\mathbf{M}, GQA}_0 \\ \vdots \\ \mathbf{W}^{\mathbf{M}, GQA}_{G-1} \end{bmatrix} .
$$

Now, we concatenate $\frac{H}{G}$ copies of the above matrix along axis 0:

$$
\mathbf{\tilde W}^{\mathbf{M}, GQA} = \begin{bmatrix} \mathbf{W}^{\mathbf{M}, GQA} \\ \mathbf{W}^{\mathbf{M}, GQA} \\ \vdots \\ \mathbf{W}^{\mathbf{M}, GQA} \end{bmatrix} .
$$

**What is the relationship between $\text{rank} \left( \mathbf{\tilde W}^{\mathbf{M}, GQA} \right)$ and $\text{rank} \left( \mathbf{W}^{\mathbf{M}, GQA} \right)$?**

- Reasoning is required.

\#\#\# WRITE YOUR SOLUTION HERE ###

When we vertically stack identical copies of a matrix, we are repeating the same row space multiple times. The set of linearly independent rows does not increase. Thus,

$$
\text{rank} \left( \mathbf{\tilde W}^{\mathbf{M}, GQA} \right) = \text{rank} \left( \mathbf{W}^{\mathbf{M}, GQA} \right) .
$$

""" END OF THIS PART """

## Part 7 (10 points, coding task)

**In this part, please build your own GQA module called `MyGQA`.**

- The requirement is pretty much the same as Part 5.
- Do NOT create $H/G$ copies of key-projection and value-projection matrices. Otherwise, you will use too much unnecessary memory.
- No loop is allowed.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 8 (5 points, non-coding task)

**MHA is a special case of GQA. Explain why.**

\#\#\# WRITE YOUR SOLUTION HERE ###

When we let $G=H$, GQA is exactly MHA.

""" END OF THIS PART """

Now, let us study another variant of MHA: **Multi-head Latent Attention (MLA)**. MLA was introduced by **DeepSeek**. It is a core component of DeepSeek’s large language model (LLM).

The key intuition of MLA is as follows. In MHA, the key and value projection matrices

$$
\mathbf{W}^{\mathbf{K}, MHA} \in \Bbb R^{H \cdot D_{qk} \times D_2} , \quad \mathbf{W}^{\mathbf{V}, MHA} \in \Bbb R^{H \cdot D_v \times D_2}
$$

may be high dimensional.

For instance, suppose $H \cdot D_{qk} = H \cdot D_v = D_2 = 4096$.

However, it is not necessarily the case that these matrices are of high ranks (such as 4096). Their actual ranks (or top few ranks that make their truncated singular value decomposition (SVD) to be close to the actual matrices) may be much lower than that.

To capture the low-rank feature, MLA proposed the following model:

$$
\begin{aligned}
\mathbf{W}^{\mathbf{K}, MHA} & = {\color{blue}{\mathbf{W}^{\mathbf{UK}, MLA}}} {\color{red}{\mathbf{W}^{\mathbf{DKV}, MLA}}} \\ {\mathbf{W}^{\mathbf{V}, MHA}} & = {\color{green}{\mathbf{W}^{\mathbf{UV}, MLA}}} {\color{red}{\mathbf{W}^{\mathbf{DKV}, MLA}}} ,
\end{aligned}
$$
where

- ${\color{red}{\mathbf{W}^{\mathbf{DKV}, MLA}}} \in \Bbb R^{r \times D_2}$: down-projection matrix for computing keys and values.
- ${\color{blue}{\mathbf{W}^{\mathbf{UK}, MLA}}} \in \Bbb R^{H \cdot D_{qk} \times r}$: up-projection matrix for computing keys.
- ${\color{green}{\mathbf{W}^{\mathbf{UV}, MLA}}} \in \Bbb R^{H \cdot D_v \times r}$: up-projection matrix for computing values.

In practice, rank $r$ is typically much smaller than $\min \left\{ H \cdot D_{qk} , H \cdot D_v , D_2 \right\}$.

**In all remaining parts of this problem, to simplify your analysis and highlight the relationships of MHA, GQA and MLA, we make the following assumptions:**

- $D_1 = D_2 = D$.
- $D_{qk} = D_v = d$.
- $d$ is a factor of $D$.

Under these assumptions, the number heads $H$ satisfies

$$
H = \frac{D}{d}.
$$

## Part 9 (10 points, non-coding task)

**In this part, you are asked to prove that GQA can be equivalently represented by MLA.**

In your solution, it is sufficient for you to prove that for $\mathbf{M} \in \left\{ \mathbf{K}, \mathbf{V} \right\}$, for matrix

$$
\mathbf{\tilde W}^{\mathbf{M}, GQA} = \begin{bmatrix} \color{orange}{\mathbf{W}^{\mathbf{M}, GQA}} \\ \color{orange}{\mathbf{W}^{\mathbf{M}, GQA}} \\ \vdots \\ \color{orange}{\mathbf{W}^{\mathbf{M}, GQA}} \end{bmatrix} \in \Bbb R^{D \times D}
$$

(defined in Part 6) who is the concatenation of $\frac{H}{G}$ copies of

$$
{\color{orange}{\mathbf{W}^{\mathbf{M}, GQA}}} = \begin{bmatrix} \mathbf{W}^{\mathbf{M}, GQA}_0 \\ \vdots \\ \mathbf{W}^{\mathbf{M}, GQA}_{G-1} \end{bmatrix} \in \Bbb R^{G \cdot d \times D}
$$

matrix $\mathbf{\tilde W}^{\mathbf{M}, GQA}$ can be decomposed as

$$
\mathbf{\tilde W}^{\mathbf{M}, GQA} = \color{blue}{\mathbf{W}^{\mathbf{UM}, MLA}} \color{red}{\mathbf{W}^{\mathbf{DKV}, MLA}}
$$

where

- ${\color{red}{\mathbf{W}^{\mathbf{DKV}, MLA}}} \in \Bbb R^{r \times D}$: down-projection matrix for computing keys and values.
- ${\color{blue}{\mathbf{W}^{\mathbf{UM}, MLA}}} \in \Bbb R^{D \times r}$: up-projection matrix for computing $\mathbf{M}$ (keys or values).
- $r = G \cdot d$.

\#\#\# WRITE YOUR SOLUTION HERE ###

Follow Part 6, we have

$$
\begin{aligned}
\text{rank} \left( \mathbf{\tilde W}^{\mathbf{M}, GQA} \right) &= \text{rank} \left( \mathbf{W}^{\mathbf{M}, GQA} \right) \\ 
                                                               &\leq \min \left\{ G \cdot d, D \right\} \\ 
                                                               &= \min \left\{ r, D \right\} \\
                                                               &= r.
\end{aligned}
$$

That means it is sufficient to keep the first $r$ singular vectors/values after SVD. Thus, $\mathbf{\tilde W}^{\mathbf{M}, GQA}$ can be decomposed into

$$
\begin{aligned}
\mathbf{\tilde W}^{\mathbf{M}, GQA} &= \sum_{i=0}^{r-1} \sigma_i \mathbf{u}_i \mathbf{v}_i^\top \\
                                    &= \underbrace{\begin{bmatrix} \mathbf{u}_0 & \mathbf{u}_1 & \cdots & \mathbf{u}_{r-1} \end{bmatrix}}_{\color{blue}{\mathbf{W}^{\mathbf{UM}, MLA}}} \underbrace{\begin{bmatrix} \sigma_0 \mathbf{v}_0^\top \\ \sigma_1 \mathbf{v}_1^\top \\ \vdots \\ \sigma_{r-1} \mathbf{v}_{r-1}^\top \end{bmatrix}}_{\color{red}{\mathbf{W}^{\mathbf{DKV}, MLA}}} .
\end{aligned}
$$

""" END OF THIS PART """

## Part 10 (5 points, coding task)

This question follows Part 9.

**You are asked to define a function called `GQA_2_MLA` that performs the following tasks:**

- Input:
  - `W_M_GQA`: A numpy array with shape `(r,D)`, where `r` is guaranteed to be a factor of `D` (not something you need to worry about).
- Outputs:
  - `W_DKV_MLA`: A numpy array with shape `(r,D)`.
  - `W_UM_MLA`: A numpy array with shape `(D,r)`.
- Things to do inside this function:
  - Compute `W_M_GQA_tilde` that concatenates `D/r` copies of `W_M_GQA` along axis 0.
  - Print the shapes of `W_UM_MLA` and `W_DKV_MLA`.
  - Print the mean squared error between `W_M_GQA_tilde` and `W_UM_MLA @ W_DKV_MLA`.

**Hints:**

- You may use `np.linalg`.
- PyTorch is not allowed.
- No loop in your code.

**After defining this function, test it with the input `np.random.randn(4,24)`.**

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 11 (10 points, non-coding task)

So far, we have proved that GQA can always be represented by MLA.

**In this part, you are asked to prove that GQA is not equivalent to MLA. What you need to do is to find one example that MLA cannot be represented as GQA.**

To be specific, please do the following things:

1. Construct ${\color{red}{\mathbf{W}^{\mathbf{DKV}, MLA}}} \in \Bbb R^{1 \times 2}$.
2. Construct ${\color{blue}{\mathbf{W}^{\mathbf{UM}, MLA}}} \in \Bbb R^{2 \times 1}$.
3. Do matrix multiplication $\color{blue}{\mathbf{W}^{\mathbf{UM}, MLA}} \color{red}{\mathbf{W}^{\mathbf{DKV}, MLA}}$.
4. Show that this product matrix is not the concatenation of two copies of 1-by-2 matrices along axis 0.

\#\#\# WRITE YOUR SOLUTION HERE ###

1. Choose ${\color{red}{\mathbf{W}^{\mathbf{DKV}, MLA}}} = \begin{bmatrix} 1 & 2 \end{bmatrix}$.
2. Choose ${\color{blue}{\mathbf{W}^{\mathbf{UM}, MLA}}} = \begin{bmatrix} 1 \\ 2 \end{bmatrix}$.
3. ${\color{blue}{\mathbf{W}^{\mathbf{UM}, MLA}}} {\color{red}{\mathbf{W}^{\mathbf{DKV}, MLA}}} = \begin{bmatrix} 2 & 1 \\ 4 & 2 \end{bmatrix}$.
4. The product is not in the form of $\begin{bmatrix} a & b \\ a & b \end{bmatrix}$. Shown.


In other words, **MLA is strictly more expressive than GQA**.

""" END OF THIS PART """

MLA does not only enjoy its advantage of being more general than MHA and GQA, it is also computationally more efficient.

An intuitive approach of computing MLA.

1. Compute the key-projection matrix $\mathbf{W}^{\mathbf{UK}, MLA} \mathbf{W}^{\mathbf{DKV}, MLA} \in \Bbb R^{D \times D}$ and the value-projection matrix $\mathbf{W}^{\mathbf{UV}, MLA} \mathbf{W}^{\mathbf{DKV}, MLA} \in \Bbb R^{D \times D}$.
2. Follow the standard steps in MHA.

This approach is hereafter called a **vanilla approach**. This approach fails to enjoy the low-rank feature of $\mathbf{W}^{\mathbf{DKV}, MLA}$, $\mathbf{W}^{\mathbf{UK}, MLA}$, and $\mathbf{W}^{\mathbf{UV}, MLA}$.

## Part 12 (10 points, non-coding task)

**In this part, you are asked to study an alternative approach to compute MLA.**

1. Find a **head-independent reduced key-projection matrix** ${\color{red}{\hat {\mathbf W}^{\mathbf{K}, MLA}}} \in \Bbb R^{r \times D}$ and a **reduced query-projection matrix** ${\color{blue}{\hat {\mathbf W}^{\mathbf{Q}, MLA}}} \in \Bbb R^{H \cdot r \times D}$, such that
   - The **reduced key** at position $l_2$ for head $h$ in a being attended sequence is head-independent and is given by:
     $$\mathbf{\hat k}_{l_2} = {\color{red}{\hat {\mathbf W}^{\mathbf{K}, MLA}}} \mathbf{y}_{l_2} \in \Bbb R^r .$$
   - The **reduced query** at position $l_1$ for head $h$ in an attending sequence is given by:
     $$\mathbf{\hat q}_{l_1, h} = {\color{blue}{\hat {\mathbf W}^{\mathbf{Q}, MLA}_h}} \mathbf{x}_{l_1} \in \Bbb R^r ,$$
     where
     $${\color{blue}{\hat {\mathbf W}^{\mathbf{Q}, MLA}}} = \begin{bmatrix} {\color{blue}{\hat {\mathbf W}^{\mathbf{Q}, MLA}_0}} \\ {\color{blue}{\hat {\mathbf W}^{\mathbf{Q}, MLA}_1 }} \\ \vdots \\ {\color{blue}{\hat {\mathbf W}^{\mathbf{Q}, MLA}_{H-1}}} \end{bmatrix} .$$
   - The attention score (query-key similarity) is invariant in both the original and the reduced forms. That is
     $$\frac{\mathbf{q}_{l_1,h}^\top \mathbf{k}_{l_2,h}}{\sqrt{D/H}} = \frac{\mathbf{\hat q}_{l_1,h}^\top \mathbf{\hat k}_{l_2}}{\sqrt{r}} . \quad (1)$$
2. Find a **head-independent reduced value-projection matrix** ${\color{green}{\hat {\mathbf W}^{\mathbf{V}, MLA}}} \in \Bbb R^{r \times D}$ and a **reduced out-projection matrix** ${\color{orange}{\hat {\mathbf W}^{O, MLA}}} \in \Bbb R^{D \times H \cdot r}$, such that
   - The **reduced value** with head $h$ on position $l_2$ in a being attended sequence is head-independent and is given by:
     $$\mathbf{\hat v}_{l_2} = {\color{green}{\hat {\mathbf W}^{\mathbf{V}, MLA}}} \mathbf{y}_{l_2} \in \Bbb R^r .$$
   - Post-out-projection is invariant in both the original and the reduced forms. \
     Let
     $${\color{orange}{\hat {\mathbf W}^{O, MLA}}} = \begin{bmatrix} {\color{orange}{\hat {\mathbf W}^{O, MLA}_0}} & {\color{orange}{\hat {\mathbf W}^{O, MLA}_1}} & \cdots & {\color{orange}{\hat {\mathbf W}^{O, MLA}_{H-1}}} \end{bmatrix} ,$$
     then we must have
     $$\sum_{h=0}^{H-1} \mathbf W^O_h \sum_{l_2 = 0}^{L_2 - 1} \alpha_{h, l_1 l_2} \mathbf{v}_{l_2,h} = \sum_{h=0}^{H-1} {\color{orange}{\hat {\mathbf W}^{O, MLA}_h}} \sum_{l_2 = 0}^{L_2 - 1} \alpha_{h, l_1 l_2} \mathbf{\hat v}_{l_2} . \quad (2)$$

Your answer of $\color{red}{\hat {\mathbf W}^{\mathbf{K}, MLA}}$, $\color{green}{\hat {\mathbf W}^{\mathbf{V}, MLA}}$, $\color{blue}{\hat {\mathbf W}^{\mathbf{Q}, MLA}}$, and $\color{orange}{\hat {\mathbf W}^{O, MLA}}$ should be written in terms of $\mathbf{W}^{\mathbf{DKV}}$, $\mathbf{W}^{\mathbf{UK}}$, $\mathbf{W}^{\mathbf{UV}}$, $\mathbf{W}^{\mathbf{Q}}$, and $\mathbf{W}^O$.

\#\#\# WRITE YOUR SOLUTION HERE ###

1. From (1),
   $$
   \begin{aligned}
   \frac{\mathbf{q}_{l_1,h}^\top \mathbf{v}_{l_2,h}}{\sqrt{D/H}} &= \frac{\mathbf{\hat q}_{l_1,h}^\top \mathbf{\hat v}_{l_2}}{\sqrt{r}} \\
   \frac{\left( \mathbf{W}^{\mathbf{Q}}_h \mathbf{x}_{l_1} \right)^\top \left( \mathbf{W}^{\mathbf{UK}}_h \mathbf{W}^{\mathbf{DKV}} \mathbf{y}_{l_2} \right)}{\sqrt{D/(D/d)}} &= \frac{\left( {\color{blue}{\hat {\mathbf W}^{\mathbf{Q}, MLA}_h}} \mathbf{x}_{l_1} \right)^\top \left( {\color{red}{\hat {\mathbf W}^{\mathbf{K}, MLA}}} \mathbf{y}_{l_2} \right)}{\sqrt{r}} \\
   \frac{\mathbf{x}_{l_1}^\top \mathbf{W}^{\mathbf{Q}, \top}_h \mathbf{W}^{\mathbf{UK}}_h \mathbf{W}^{\mathbf{DKV}} \mathbf{y}_{l_2}}{\sqrt{d}} &= \frac{\mathbf{x}_{l_1}^\top   {\color{blue}{\hat {\mathbf W}^{\mathbf{Q}, MLA, \top}_h}} {\color{red}{\hat {\mathbf W}^{\mathbf{K}, MLA}}} \mathbf{y}_{l_2}}{\sqrt{r}} .
   \end{aligned}
   $$
   We can set ${\color{red}{\hat {\mathbf W}^{\mathbf{K}, MLA}}} = \mathbf{W}^{\mathbf{DKV}}$ and ${\color{blue}{\hat {\mathbf W}^{\mathbf{Q}, MLA, \top}_h}} = \frac{1}{\sqrt G} \mathbf{W}^{\mathbf{Q}, \top}_h \mathbf{W}^{\mathbf{UK}}_h$. Thus,
   $$
   {\color{blue}{\hat {\mathbf W}^{\mathbf{Q}, MLA}}} = \sqrt{\frac{r}{d}} \begin{bmatrix} \mathbf{W}^{\mathbf{UK}, \top}_0 \mathbf{W}^{\mathbf{Q}}_0 \\ \mathbf{W}^{\mathbf{UK}, \top}_1 \mathbf{W}^{\mathbf{Q}}_1 \\ \vdots \\ \mathbf{W}^{\mathbf{UK}, \top}_{H-1} \mathbf{W}^{\mathbf{Q}}_{H-1} \end{bmatrix} .
   $$
2. From (2),
   $$
   \begin{aligned}
   \sum_{h=0}^{H-1} \mathbf W^O_h \sum_{l_2 = 0}^{L_2 - 1} \alpha_{h, l_1 l_2} \mathbf{v}_{l_2,h} &= \sum_{h=0}^{H-1} {\color{orange}{\hat {\mathbf W}^{O, MLA}_h}} \sum_{l_2 = 0}^{L_2 - 1} \alpha_{h, l_1 l_2} \mathbf{\hat v}_{l_2} \\
   \sum_{h=0}^{H-1} \mathbf W^O_h \sum_{l_2 = 0}^{L_2 - 1} \alpha_{h, l_1 l_2} \mathbf{W}^{\mathbf{UV}}_h \mathbf{W}^{\mathbf{DKV}} \mathbf{y}_{l_2} &= \sum_{h=0}^{H-1} {\color{orange}{\hat {\mathbf W}^{O, MLA}_h}} \sum_{l_2 = 0}^{L_2 - 1} \alpha_{h, l_1 l_2} {\color{green}{\hat {\mathbf W}^{\mathbf{V}, MLA}}} \mathbf{y}_{l_2} \\
   \sum_{h=0}^{H-1} \sum_{l_2 = 0}^{L_2 - 1} \alpha_{h, l_1 l_2} \mathbf W^O_h  \mathbf{W}^{\mathbf{UV}}_h \mathbf{W}^{\mathbf{DKV}} \mathbf{y}_{l_2} &= \sum_{h=0}^{H-1} \sum_{l_2 = 0}^{L_2 - 1} \alpha_{h, l_1 l_2} {\color{orange}{\hat {\mathbf W}^{O, MLA}_h}} {\color{green}{\hat {\mathbf W}^{\mathbf{V}, MLA}}} \mathbf{y}_{l_2}
   \end{aligned}
   $$
   We can set ${\color{green}{\hat {\mathbf W}^{\mathbf{V}, MLA}}} = \mathbf{W}^{\mathbf{DKV}}$ and ${\color{orange}{\hat {\mathbf W}^{\mathbf{O}, MLA}_h}} = \mathbf{W}^{\mathbf{O}}_h \mathbf{W}^{\mathbf{UV}}_h$. Thus,
   $$
   {\color{orange}{\hat {\mathbf W}^{O, MLA}}} = \begin{bmatrix} \mathbf{W}^{\mathbf{O}}_0 \mathbf{W}^{\mathbf{UV}}_0 & \mathbf{W}^{\mathbf{O}}_1 \mathbf{W}^{\mathbf{UV}}_1 & \cdots & \mathbf{W}^{\mathbf{O}}_{H-1} \mathbf{W}^{\mathbf{UV}}_{H-1} \end{bmatrix} .
   $$

""" END OF THIS PART """

## Part 13 (5 points, coding task)

**Do the following tasks:**

1. Define a function called `reduced_matrices`.
   - Input arguments
     - `W_DKV`, `W_UK`, `W_UV`, `W_Q`, `W_O`, `H`.
   - Outputs
     - `W_K_MLA_hat`, `W_V_MLA_hat`, `W_Q_MLA_hat`, `W_O_MLA_hat`.
   - Requirement of your code:
     - The code for computing each output must be in one line.
     - Loop is not allowed.
2. Set your device as `gpu`:
   ```python
   device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
   ```
3. Construct the following synthetic data:
   ```python
   D = 1024
   H = 32
   D_qkv = D // H
   r = 50
    
   W_DKV = torch.randn(r, D)
   W_UK = torch.randn(D, r)
   W_UV = torch.randn(D, r)
   W_Q = torch.randn(D, D)
   W_O = torch.randn(D, D)
    
   B = 32
   L_1 = 100
   L_2 = 300
    
   x = torch.randn(B, L_1, D).to(device)
   y = torch.randn(B, L_2, D).to(device)
   ```
4. Study a vanilla attention model
   - Initialize the model
     ```python
     model_MHA_vanilla = MyMHA(D, D, D_qkv, D_qkv, H)
     ```
   - Update model parameters
     ```python
     model_MHA_vanilla.W_K.weight, model_MHA_vanilla.W_V.weight, model_MHA_vanilla.W_Q.weight, model_MHA_vanilla.W_O.weight
     ```
   - Compute the output
     ```python
     output_vanilla = model_MHA_vanilla(x, y)
     ```
5. Study a reduced attention model
   - Initialize the model
     ```python
     model_MHA_reduced = MyMHA(D, D, r, r, H)
     ```
   - Update model parameters
     ```python
     model_MHA_reduced.W_K.weight, model_MHA_reduced.W_V.weight, model_MHA_reduced.W_Q.weight, model_MHA_reduced.W_O.weight
     ```
   - Compute the output
     ```python
     output_reduced = model_MHA_reduced(x, y)
     ```
6. Check the correctness of the reduced model by computing and printing a relative error:
   ```python
   relative_error = mse_output**.5 / torch.mean(output_vanilla**2)**.5
   ```

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 14 (5 points, non-coding task)

In generative AI, such as GPT, we autoprogressively generate tokens. For a given position $l$, the keys and values on this position $\mathbf{k}_l$ and $\mathbf{v}_l$ are repeatedly used in generating tokens for positions $l' > l$.

Therefore, the values of $\mathbf{k}_l$ and $\mathbf{v}_l$ are typically stored in cache (no need to revise your code in earlier parts if your code does not support this). We call such storage as $kv$-cache.

**Do the following tasks to compute kv-cache in different models while doing autoregressive inference:** (reasoning is required)

1. In MHA, the $kv$-cache at each position is $2D$. Explain why.
2. In MLA, what is the $kv$-cache at each position?

\#\#\# WRITE YOUR SOLUTION HERE ###

1. $\mathbf{k}_l,\mathbf{v}_l \in \mathbb R^D$. Therefore, the $kv$-cache at each position is $2D$.
2. $\mathbf{\hat k}_l,\mathbf{\hat v}_l \in \mathbb R^r$ and $\mathbf{\hat k}_l = \mathbf{\hat v}_l$ (remember we did `W_K_MLA_hat = W_DKV`, `W_V_MLA_hat = W_DKV` in the previous part). Therefore, the $kv$-cache at each position is only $r$.

""" END OF THIS PART """

---

## Editorial & Solutions

Official competition notebook available at jaredliw/ioai-tsp-2025.
