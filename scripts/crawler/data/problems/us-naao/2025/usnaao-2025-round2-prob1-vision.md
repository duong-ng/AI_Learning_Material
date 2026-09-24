---
id: "usnaao-2025-round2-prob1-vision"
competition: "US-NAAO"
year: 2025
stage: "Round 2 - In-Person Finals"
title: "Robust Convolutional Classification under Synthetic Artifacts"
domain: "CV"
difficulty: "Olympiad Final"
evaluation_metric: "Macro F1"
tags:
  - "cv"
  - "cnn"
  - "robustness"
  - "augmentation"
  - "usaaio-2025"
dataset_links: []
starter_code_url: "https://github.com/jaredliw/ioai-tsp-2025/blob/main/usaaio-2025/round2/problem-1.ipynb"
source_url: "https://www.usaaio.org/past-problems"
crawled_at: "2026-09-18T14:50:13.619929"
version: 1
---
# Problem 1 (100 points)

Many physics systems are governed by the following type of partial differential equations (PDEs)

$$
F \left( t, \mathbf{r}, u, u_t, u_{tt}, \nabla_{\mathbf{r}} \ u, \nabla^2_{\mathbf{r}} \ u \right) = 0 , \ \forall \ t \in \left[ 0 , T \right], \ \mathbf{r} \in \mathcal S
$$

where

* $t \in \Bbb R$: Time.
* $\mathbf{r} \in \Bbb R^3$: Position.
* $u \left( t, \mathbf{r} \right) \in \Bbb R$: A function of $t$ and $\mathbf{r}$ that is differentiable.
* $u_t$: $\frac{\partial u}{\partial t}$.
* $u_{tt}$: $\frac{\partial^2 u}{\partial t^2}$.
* $\mathcal S$: A convex set in $\Bbb R^3$.

For such a physics system, if we know

1. **Initial condition (IC)**
    * $u \left( 0, \mathbf{r} \right)$ for all $\mathbf{r} \in \mathcal S$.
    * $u_t \left( 0, \mathbf{r} \right)$ for all $\mathbf{r} \in \mathcal S$ (This term is required if $u_{tt}$ appears in $F$. Otherwise, it is not needed.).
2. **Boundary condition (BC)**
   * $u \left( t, \mathbf{r} \right)$ for all $t \in \left[ 0 , T \right]$ and $\mathbf{r} \in \text{Boundary} \left( \mathcal S \right)$.

Then the value of $u \left( t , \mathbf{r} \right)$ for any $t \in \left[ 0 , T \right]$ and $\mathbf{r} \in \mathcal S$ is uniquely determined.

However, many such systems do not admit closed-form solutions. The canonical approach of discretizing a PDE to find numeric solutions has many limitations.

To avoid those challenges, in this problem, you are asked to use the deep neural network approach to solve a physics-informed PDE, hereafter called as **Physics-Informed Neural Network (PINN)**.

In this problem, let us consider the following specific **1-dim thermal system**:

* A 1-dim rod with unit length.
* The thermal diffusivity is $\alpha > 0$.
* Two endpoints of the rod are connected to two heat reservoirs whose temperatures are constant and normalized as 0.
* At time $t = 0$, the temperature distribution on the rod follows a sinusoidal pattern.

Denote by $u \left( t, x \right)$ the temperature at time $t$ on position $x$ in the rod.

Thus, $u \left( t, x \right)$ satisfies:

1. **PDE**

   $$
   u_t - \alpha \ u_{xx} = 0 , \ x \in \left[ 0, 1 \right] , \ t \in \left[ 0, 1 \right] ,
   $$

   where
   * $u_t$: $\frac{\partial u}{\partial t}$.
   * $u_x$: $\frac{\partial u}{\partial x}$.
   * $u_{xx}$: $\frac{\partial^2 u}{\partial x^2}$.

3. **IC**

   $$
   u \left( 0, x \right) = \sin  \left( \pi x \right) , \ \forall \ x \in \left[ 0, 1 \right] .
   $$

4. **BC**

   $$
   u \left( t, 0 \right) = u \left( t, 1 \right) = 0 , \ \forall \ t \in \left[ 0, 1 \right] .
   $$

Before starting this problem, make sure to run the following code first **without any change**:

> WARNING !!!
> 
- Beyond importing libraries/modules/classes/functions in the preceding cell, you are **NOT allowed to import anything else for the following purposes**:
    - **As a part of your final solution.** For instance, if a problem asks you to build a model without using sklearn but you use it, then you will not earn points.
    - **Temporarily import something to assist you to get a solution.** For instance, if a problem asks you to manually compute eigenvalues but you temporarily use `np.linalg.eig` to get an answer and then delete your code, then you violate the rule.

    **Rule of thumb:** Each part has its particular purpose to intentionally test you something. Do not attempt to find a shortcut to circumvent the rule.

## Part 1 (10 points, non-coding task)

**Prove that the solution to the above PDE, IC, and BC takes the following form:**

$$
u \left( t, x \right) = e^{- \alpha \pi^2 t} \sin \left( \pi x \right) .
$$

* Reasoning is required.
* This part is used for the purpose of verifying the correctness of our subsequent PINN solution.

\#\#\# WRITE YOUR SOLUTION HERE ###

We have

$$
\begin{aligned}
u_t &= -\alpha\pi^2 e^{-\alpha\pi^2t} \sin\left({\pi x}\right) \\
    &= -\alpha\pi^2 u \left( t, x \right)
\end{aligned}
$$

and

$$
\begin{aligned}
u_{xx} &= \frac{\partial}{\partial x} \left(\pi e^{-\alpha\pi^2t} \cos\left(\pi x\right)\right) \\
       &= -\pi^2 e^{-\alpha\pi^2t} \sin\left({\pi x}\right) \\
       &= -\pi^2 u \left( t, x \right).
\end{aligned}
$$

Hence, the form satisfies the PDE $u_t - \alpha \ u_{xx} = 0$.

When $t=0$, $u \left( 0, x \right) = \sin\left({\pi x}\right)$. The form satisfies the IC.

When $x\in\{0,1\}$, $\sin\left(0\right)=0$ and $u \left( t, x \right) = 0$. The form satisfies the BC.


""" END OF THIS PART """

The high-level idea of PINN is as follows:

1. **(Neural network)** We design a neural network (functional mapping) $U \left( \cdot, \cdot \mid \mathbf{\theta} \right): \left[ 0 , 1 \right]^2 \rightarrow \Bbb R$, such that

   - $\theta$: learnable parameters in $U$.
   - Inputs are time $t$ and position $x$.
   - Output is the predicted temperature.

2. **(Training data)** To train $U$ (equivalently, to learn $\theta$), we use the following three groups of temporal-spacial data $(t,x)$:

   - **(Training data for PDE)** $(t,x)$ are randomly sampled from $[0,1]^2$. \
     Denote by $\mathcal D_{PDE}$ the set of these data points.
   - **(Training data for IC)** $(0,x)$ with $x$ that are evenly distributed on $[0,1]$. \
     Denote by $\mathcal D_{IC}$ the set of these data points.
   - **(Training data for BC)** $(t,0)$ and $(t,1)$ with $t$ that are evenly distributed on $[0,1]$. \
     Denote by $\mathcal D_{BC}$ the set of these data points.

3. **(Loss function in training)** $$L_{total} = L_{PDE} + L_{IC} + L_{BC} ,$$ where

   - Residual loss in PDE: $$L_{PDE} = \frac{1}{| \mathcal D_{PDE} |} \sum_{\left( t, x \right) \in \mathcal D_{PDE}} \left( \frac{\partial U \left( t, x \mid \mathbf{\theta} \right)}{\partial t} - \alpha \frac{\partial^2 U \left( t, x \mid \mathbf{\theta} \right)}{\partial x^2} \right)^2 .$$
   - IC loss: $$L_{IC} = \frac{1}{| \mathcal D_{IC} |} \sum_{\left( t, x \right) \in \mathcal D_{IC}} \left( U \left( t, x \mid \mathbf{\theta} \right) - u \left( t, x \right) \right)^2 .$$
   - BC loss: $$L_{BC} = \frac{1}{| \mathcal D_{BC} |} \sum_{\left( t, x \right) \in \mathcal D_{BC}} \left( U \left( t, x \mid \mathbf{\theta} \right) - u \left( t, x \right) \right)^2 .$$

## Part 2 (10 points, coding task)

In this part, you are asked to build a deep neural network that is used to output PDE solutions.

1. The class name is `HeatPINN`. \
   It subclasses `nn.Module`.

2. The model consists of the following layers that are sequentially connected: \
   (1) Fully connected layer with `out_features = 64` (you need to determine `in_features` taken from the input). \
   (2) Activation layer with tanh function. \
   (3) Fully connected layer with `in_features = 64` and `out_features = 64`. \
   (4) Activation layer with tanh function. \
   (5) Fully connected layer with `in_features = 64` (you need to determine `out_features` as the output of the entire model).

3. Construct a model who is an object of this class and is called as `model`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 3 (5 points, coding task)

Do the following tasks:

Let x be a tensor with shape `(N,2)`.

1. What is the number of dimensions of `model(x)`?
2. What is the shape of `model(x)`?
3. Explain the reasoning of your answers.

\#\#\# WRITE YOUR SOLUTION HERE ###

1. The dimension of `model(x)` is 2.
2. The shape of `model(x)` is `(N,1)`.
3. Each set of input gives an output of shape `(1,)`. There are `N` sets of them. Therefore, the output shape is `(N,1)`.

""" END OF THIS PART """

## Part 4 (10 points, coding task)

In this part, you are asked to create the dataset $\mathcal D_{PDE}$.

1. The dataset object is called `dataset_train_PDE`. It is in a class called `Dataset_PDE` that you need to build.
2. Class `Dataset_PDE` subclasses `Dataset`.
3. Each $\left( t, x \right) \in \mathcal D_{PDE}$ is randomly sampled from $[0,1]^2$.
4. Set $|\mathcal D_{PDE}| = 500$.
5. *Set `requires_grad = True`.*

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 5 (5 points, coding task)

In this part, you are asked to define a `Dataloader` object called `dataloader_PDE`:

1. `dataset = dataset_train_PDE`
2. `batch_size = 32`
3. `shuffle = True`

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 6 (10 points, coding task)

In this part, you are asked to create the dataset $\mathcal D_{IC}$.

1. Define dataset $\mathcal D_{IC}$ in the way that for each $(t,x) \in\mathcal D_{IC}$, $t$ is fixed at 0 and $x$ is evenly sampled from $\left\{ 0, 0.01, 0.02, \cdots , 0.98, 0.99, 1 \right\}$. Therefore, $|\mathcal D_{IC}|= 101$.
2. The dataset shall be a tensor with name `dataset_train_IC` and shape `(101,2)`.
3. <del>Set `dataset_train_IC.requires_grad = True`.</del>
4. Print `dataset_train_IC.requires_grad` and `dataset_train_IC.shape`.
5. Define tensor `u_IC` to be the ground-truth functional values of all data in $\mathcal D_{IC}$ (You can find the formula from Part 1).
6. Set <del>`u_IC.requires_grad = True` and</del> `u_IC.shape = (101,1)`.
7. Print `u_IC.requires_grad` and `u_IC.shape`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 7 (10 points, coding task)

In this part, you are asked to create the dataset $\mathcal D_{BC}$.

1. Define dataset $\mathcal D_{BC}$ in the way that for each $(t,x) \in\mathcal D_{BC}$, $x$ is either 0 or 1, and $t$ is evenly sampled from $\left\{ 0, 0.01, 0.02, \cdots , 0.98, 0.99, 1 \right\}$. Therefore, $|\mathcal D_{BC}|= 2 \cdot 101 = 202$.
2. The dataset shall be a tensor with name `dataset_train_BC` and shape `(202,2)`.
3. <del>Set `dataset_train_BC.requires_grad = True`.</del>
4. Print `dataset_train_BC.requires_grad` and `dataset_train_BC.shape`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 8 (5 points, coding task)

In this part, you are asked to configure your optimizer.

1. Define an optimizer object called `optimizer`.
2. Configure the optimization method as `Adam`.
3. Set the learning rate as `1e-3`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 9 (10 points, coding task)

The purpose of this part is to guide you to learn using `torch.autograd.grad`.

For each given input $(t,x)$, we not only compute $U \left( t, x \mid \mathbf{\theta} \right)$ (output from the model), but also its 1st and 2nd order partial derivatives.

In PyTorch, these can be done by using `torch.autograd.grad`.

### Part 9.1

Consider the following function

$$
f \left( p, q \right) = p^2 + q^3 + p q^2 .
$$

**Do the following tasks at** $\left( p, q \right) = \left( 1, 2 \right)$:

1. Define tensors `p` and `q` that have values `1.0` and `2.0` (float data type), respectively, an identical shape `()` (that is, 0-dim), and `requires_grad = True`.
2. Compute tensor `f` according to the formula above.
3. Compute $\frac{\partial f \left( p, q \right)}{\partial p}$ by using
   ```python
   f_p = autograd.grad(f, p, create_graph=True)[0]
   ```
   Print `f_p`.
4. Compute $\frac{\partial f \left( p, q \right)}{\partial q}$ by using
   ```python
   f_q = autograd.grad(f, q, create_graph=True)[0]
   ```
   Print `f_q`.
5. Compute $\frac{\partial^2 f \left( p, q \right)}{\partial p^2}$ by using
   ```python
   f_pp = autograd.grad(f_p, p, create_graph=True)[0]
   ```
   Print `f_pp`.
6. Compute $\frac{\partial^2 f \left( p, q \right)}{\partial q^2}$ by using
   ```python
   f_qq = autograd.grad(f_q, q, create_graph=True)[0]
   ```
   Print `f_qq`.
7. Compute $\frac{\partial^2 f \left( p, q \right)}{\partial p \partial q}$ by using
   ```python
   f_pq = autograd.grad(f_p, q, create_graph=True)[0]
   ```
   Print `f_pq`.
8. Compute $\frac{\partial^3 f \left( p, q \right)}{\partial q^3}$ by using
   ```python
   f_qqq = autograd.grad(f_qq, q, create_graph=True)[0]
   ```
   Print `f_qqq`.

### Part 9.2

Consider the following function

$$
g \left( x \right) = x^2 .
$$

Let $x$ be a vector with values $0, 0.1, \cdots , 0.9, 1$.

**Do the following tasks.**

1. Generate `x` as a 1-dim tensor and set `x.requires_grad = True`.

2. Generate `g = x**2`. Thus, `g` has the same shape as `x`.

3. Define `g_x` to be an element-wise 1st-order derivative of function $g$ with respect to $x$. Thus, `g_x` has the same shape as `x`. \
   Write code to compute `g_x`. Print `g_x` and `g_x.shape`. \
   Hint: by using `autograd.grad(f, x, create_graph=True)[0]`, tensor `x` can be with any dimension, but tensor `f` must be with dimension 0. In this problem, tensor `g` is not with dimension 0. So you need to think about how to address this issue.

4. Define `g_xx` to be an element-wise 2nd-order derivative of function $g$ with respect to $x$. Thus, `g_xx` has the same shape as `x`. Write code to compute `g_xx`. Print it out `g_xx` and `g_xx.shape`.

\#\#\# WRITE YOUR SOLUTION HERE ###

---

""" END OF THIS PART """

## Part 10 (10 points, coding task)

This part asks you to do a mini-batch training of the model.

1. Set the parameter in the PDE `alpha = 0.1`. (This is not for learning. In PINN, we know the exact form of a PDE. We just need neural networks to help us solve it.)
2. Set the number of epochs as 1000.
3. Define
   ```python
   device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
   ```
4. While iterating over epochs, use tqdm to track the progress:
   ```python
   for epoch in tqdm(range(num_epochs)):
   
   ```
5. In each epoch, \
   (1) Configure the model to the training mode. \
   (2) Iterate over all mini-batches of `dataset_train_PDE`. \
   (3) For each of the above mini-batches of the PDE dataset, while computing the total loss function, you also need to use **all** data in `dataset_train_IC` and `dataset_train_BC`. \
   (4) Do all these tasks on **GPU**.
6. In each epoch, after training over all mini-batches, if the epoch index is divisible by 100, do the following tasks: \
   (1) Configure the model to the evaluation mode. \
   (2) Compute the total loss over the entire three datasets: `dataset_train_PDE`, `dataset_train_IC`, `dataset_train_BC`. \
   (3) Print the epoch index, the residual loss from PDE, the IC loss, the BC loss, and the total loss. \
   (4) Do all these tasks on **CPU**.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 11 (5 points, non-coding task)

**Answer the following free-response question.**

- **In each epoch, while iterating over each mini-batch of `dataset_PDE`, why do we consider the entire data points in `dataset_IC` and `dataset_BC`, rather than also a mini-batch in these two datasets?**

To be specific, recall that the mini-batch size of `dataset_PDE` is 32. The sizes of `dataset_IC` and `dataset_BC` are 101 and 202, respectively.

Then in each iteration, the number of data points that we use to compute the total loss value is $32+101+202=335$.

Suppose we also do mini-batch on the IC and BC datasets with the same mini-batch size, say, 32. Then in each iteration, the number of data points that we use is $32+32+32=96$.

We adopt the former approach, not the latter approach. You need to explain why.

\#\#\# WRITE YOUR SOLUTION HERE ###

IC and BC are constraints. We need to enforce them every time during training.

""" END OF THIS PART """

## Part 12 (10 points, coding task)

**In this part, you are asked to do the following tasks to test the effectiveness of our PINN model.**

1. Generate a dataset $\left\{ \left( t , x \right) \in \left\{ 0, 0.01, \cdots, 1 \right\}^2 \right\}$. Save the dataset as a tensor with name `tx_test` and shape <del>`(101,2)`</del> `(10201,2)`.
2. For each data point, compute $u \left( t , x \right)$ whose formula is given in Part 1. Save the result as a tensor with name `u_test` and shape <del>`(101,2)`</del> `(10201,)`.
3. For each data point, use our trained PINN model to compute the predicted value $U \left( t, x \mid \mathbf{\theta} \right)$. Save the result as a tensor with name `U_test` and shape <del>`(101,2)`</del> `(10201,)`.
4. Print the mean squared error between `u_test` and `U_test`.
5. Generate two 2-dim scatter plots for $\left( t, x \right)$ by using the above data points.
   - In Figure 1, the value in each position is the ground-truth temperature $u \left( t , x \right)$.
   - In Figure 2, the value in each position is the predicted temperature $U \left( t, x \mid \mathbf{\theta} \right)$.
   - In each plot,
     - Set `c` as the values on those scattered positions.
     - Set `cmap='viridis'`.
     - Add `plt.colorbar(label='Value')`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

---

## Editorial & Solutions

Official competition notebook available at jaredliw/ioai-tsp-2025.
