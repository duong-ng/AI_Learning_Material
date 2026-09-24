---
id: "usnaao-2025-round1-prob1-spectral"
competition: "US-NAAO"
year: 2025
stage: "Round 1 - Online Qualifier"
title: "Spectral Decomposition & Matrix Approximation for Data Compression"
domain: "Theory/Math"
difficulty: "Hard"
evaluation_metric: "MSE"
tags:
  - "linear-algebra"
  - "svd"
  - "spectral-decomposition"
  - "compression"
  - "usaaio-2025"
dataset_links: []
starter_code_url: "https://github.com/jaredliw/ioai-tsp-2025/blob/main/usaaio-2025/round1/problem-1.ipynb"
source_url: "https://www.usaaio.org/past-problems"
crawled_at: "2026-09-18T14:50:11.286845"
version: 1
---
# Problem 1 (100 points)

Let us consider the following sequence:

$$
F_n = F_{n-1} + F_{n-2}, \forall n \geq 2.
$$


Before starting this problem, make sure to run the following code first without any change:

> WARNING !!!


- Beyond importing libraries/modules/classes/functions in the preceding cell, you are **NOT allowed to import anything else for the following purposes**:
    - **As a part of your final solution.** For instance, if a problem asks you to build a model without using sklearn but you use it, then you will not earn points.
    - **Temporarily import something to assist you to get a solution.** For instance, if a problem asks you to manually compute eigenvalues but you temporarily use `np.linalg.eig` to get an answer and then delete your code, then you violate the rule.

    **Rule of thumb:** Each part has its particular purpose to intentionally test you something. Do not attempt to find a shortcut to circumvent the rule.

- All coding tasks shall run on CPUs, **not GPUs**.

## Part 1 (10 points, non-coding task)

Let $F_0=3$, $F_1=1$.

Manually write down $F_n$ for $n=2,3,4,5$.

- Reasoning is not required.

\#\#\# WRITE YOUR SOLUTION HERE ###

$$
\begin{aligned}
F_2 &= F_1 + F_0 &F_3 &= F_2 + F_1 &F_4 &= F_3 + F_2 &F_5 &= F_4 + F_3\\
    &= 1 + 3     &    &= 4 + 1     &    &= 5 + 4     &    &= 9 + 5 \\
    &= 4         &    &= 5         &    &= 9         &    &= 14 \\
\end{aligned}
$$

""" END OF THIS PART """

## Part 2 (10 points, non-coding task)

The recursive equation that defines the sequence in this problem can be written in a matrix form:

$$
\begin{bmatrix} F_n \\ F_{n-1} \end{bmatrix} = \mathbf{A} \begin{bmatrix} F_{n-1} \\ F_{n-2} \end{bmatrix}, \ \forall \ n \geq 2 ,
$$

where $\mathbf{A} \in \Bbb R^{2 \times 2}$.

**Compute $\mathbf{A}$.**

- Reasoning is not required.
- The value of each entry in $\mathbf{A}$ must be exact. For instance, the following values are exact: $\sqrt3$, $\frac{2}{\sqrt7}$, $\pi+\frac{3}{8}$, $e^2$, $\sin 40\degree$. However, their float approximations are not exact.

\#\#\# WRITE YOUR SOLUTION HERE ###

Let $\mathbf{A} = \begin{bmatrix}a &b \\ c &d\end{bmatrix}$, we have

$$
\begin{cases}
aF_{n-1} + bF_{n-2} &= F_n \\
cF_{n-1} + dF_{n-2} &= F_{n-1}
\end{cases}.
$$

From the definition of sequence $F_n$, we can easily obtain:

$$
\mathbf{A} = \begin{bmatrix} 1 &1 \\ 1 &0 \end{bmatrix}.
$$

""" END OF THIS PART """

## Part 3 (10 points, non-coding task)

**Explain why $\mathbf{A}$ is a symmetric matrix.**

\#\#\# WRITE YOUR SOLUTION HERE ###

A symmetric matrix is a square matrix that is equal to its transpose matrix.

In our case,

$$
\mathbf{A}^\top = \begin{bmatrix} 1 &1 \\ 1 &0 \end{bmatrix} = \mathbf{A}.
$$

""" END OF THIS PART """

## Part 4 (10 points, non-coding task)

**In this part, you are asked to prove a general result that holds for any real-valued symmetric matrix.**

Let $\mathbf{U} \in \Bbb R^{N \times N}$ be a real-valued symmetric matrix.

Consider the following eigenvalue equation

$$
\mathbf{U} \mathbf{v} = \lambda \mathbf{v} ,
$$

where $\lambda \in \Bbb R$ and $\mathbf{v} \in \Bbb R^{N \times 1}$.

Let $\lambda_i$ and $\lambda_j$ be two distinct real eigenvalues and $\mathbf{v}_i, \mathbf{v}_j \in \Bbb R^{N \times 1}$ be two eigenvectors associated with them, respectively.

Prove that

$$
\mathbf{v}_i^\top \mathbf{v}_j = 0 .
$$

That is, vectors $\mathbf{v}_i$ and $\mathbf{v}_j$ are orthogonal.

\#\#\# WRITE YOUR SOLUTION HERE ###

Start with the given eigenvalue equations:

$$
\begin{aligned}
\mathbf{U} \mathbf{v}_i &= \lambda_i \mathbf{v}_i\ \quad\textemdash\textemdash\ (1) \\
\mathbf{U} \mathbf{v}_j &= \lambda_j \mathbf{v}_j. \quad\textemdash\textemdash\ (2)
\end{aligned}
$$

Pre-multiply $(2)$ by $\mathbf{v}_i^\top$,

$$
\mathbf{v}_i^\top \left(\mathbf{U} \mathbf{v}_j\right) = \mathbf{v}_i^\top \left(\lambda_j \mathbf{v}_j\right) = \lambda_j \mathbf{v}_i^\top \mathbf{v}_j. \quad\textemdash\textemdash\ (3)
$$

On the other hand, take the transpose of $(1)$ and post-multiply it by $\mathbf{v}_j$,

$$
\left(\mathbf{U} \mathbf{v}_i\right)^\top \mathbf{v}_j = \left(\lambda_i \mathbf{v}_i\right)^\top \mathbf{v}_j = \lambda_i \mathbf{v}_i^\top \mathbf{v}_j. \quad\textemdash\textemdash\ (4)
$$

> *Lemma.* Let $\mathbf{A} \in \mathbb{R}^{m \times n}$ and $\mathbf{B} \in \mathbb{R}^{n \times p}$ be real-valued matrices. Then the transpose of their product satisfies
> $$(\mathbf{A}\mathbf{B})^\top = \mathbf{B}^\top \mathbf{A}^\top.$$
> 
> *Proof.* [StackExchange](https://math.stackexchange.com/a/1670655).

Back to the problem, since $\mathbf{U}$ is symmetric (i.e. $\mathbf{U}=\mathbf{U}^\top$),

$$
\begin{aligned}
\mathbf{v}_i^\top \left(\mathbf{U} \mathbf{v}_j\right) &= \left(\mathbf{v}_i^\top \mathbf{U}\right) \mathbf{v}_j \\
                                                       &= \left(\mathbf{v}_i^\top \mathbf{U}^\top\right) \mathbf{v}_j \\
                                                       &= \left(\mathbf{U} \mathbf{v}_i\right)^\top \mathbf{v}_j.
\end{aligned}
$$

We have shown that $(3)=(4)$,

$$
\begin{aligned}
              \lambda_j \mathbf{v}_i^\top \mathbf{v}_j &= \lambda_i \mathbf{v}_i^\top \mathbf{v}_j \\
(\lambda_i - \lambda_j) \mathbf{v}_i^\top \mathbf{v}_j &= 0.
\end{aligned}
$$

$\lambda_i \ne \lambda_j$, we conclude

$$
\mathbf{v}_i^\top \mathbf{v}_j = 0.
$$

""" END OF THIS PART """

## Part 5 (10 points, non-coding task)

Let us go back to our matrix $\mathbf{A}$.

In the following eigenvalue equation

$$
\mathbf{A} \mathbf{x} = \lambda \mathbf{x} ,
$$

**compute two eigenvalues $\lambda_0$ and $\lambda_1$ whose values are in a descending order**.

- Reasoning is required.

\#\#\# WRITE YOUR SOLUTION HERE ###

$$
\begin{aligned}
\mathbf{A} \mathbf{x} &= \lambda \mathbf{x} \\
(\mathbf{A} - \lambda \mathbf{I})\mathbf{x} &= 0
\end{aligned}
$$

The equation has a non-zero solution for $\mathbf{x}$ only if the matrix $(\mathbf{A} - \lambda \mathbf{I})$ is singular. Hence,

$$
\begin{aligned}
\det(\mathbf{A} - \lambda \mathbf{I}) &= 0 \\
                                    0 &= \det(\begin{bmatrix} 1-\lambda &1 \\ 1 &-\lambda \end{bmatrix}) \\
                                      &= (1-\lambda)(-\lambda) - 1 \\
                                      &= \lambda^2 - \lambda - 1 \\
                              \lambda &= \frac{(-1) \pm \sqrt{(-1)^2 - 4\cdot1\cdot-1}}{2\cdot1} \\
                                      &= \frac{1 \pm \sqrt5}{2}.
\end{aligned}
$$

$\lambda_0 = \frac{1 + \sqrt5}{2}$ and $\lambda_1 = \frac{1 - \sqrt5}{2}$.

""" END OF THIS PART """

In the remaining parts of this problem, for all non-coding tasks, when you need to use those eigenvalues,

> keep them as $\lambda_0$ and $\lambda_1$. No need to apply their formulae.

## Part 6 (10 points, non-coding task)

Since matrix $\mathbf{A}$ is symmetric, let us do the spectral decomposition of it.

That is, you should write $\mathbf{A}$ in the following form:

$$
\mathbf{A} = \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^\top ,
$$

where

- $\mathbf{Q} \in \Bbb R^{2 \times 2}$ is an orthonormal matrix.
- $\mathbf{\Lambda} = \begin{bmatrix} \lambda_0 & 0 \\ 0 & \lambda_1 \end{bmatrix} \in \Bbb R^{2 \times 2}$ is a diagnonal matrix with $\lambda_0 > \lambda_1$.

**In this task, you need to compute $\mathbf{Q}$.**

- Reasoning is required.

\#\#\# WRITE YOUR SOLUTION HERE ###

$\mathbf{Q}$ is a matrix whose columns are unit eigenvectors of $\mathbf{A}$.

> In part 4, we have shown that the eigenvectors of a symmetric matrix are orthogonal. For the diagonalization formula
> $$ \mathbf{Q}^\top = \mathbf{Q}^{-1} $$
> to hold, we need orthonormal eigenvectors — meaning they are both orthogonal and of unit length.
> 
> When $\mathbf{Q}$ is composed of orthonormal columns, then
> $$ \mathbf{Q}^\top = \mathbf{Q}^{-1} \quad\because \mathbf{Q}^\top \mathbf{Q} = \mathbf{I}.$$
>
> So the diagonalization becomes
> $$ \mathbf{A} = \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^{-1} = \mathbf{Q} \mathbf{\Lambda} \mathbf{Q}^\top.$$

Let $\mathbf{x}=\begin{bmatrix}a \\ b \end{bmatrix}$. Then
$$
\begin{bmatrix} 1 &1 \\ 1 &0 \end{bmatrix} \begin{bmatrix}a \\ b \end{bmatrix} = \lambda \begin{bmatrix}a \\ b \end{bmatrix},
$$

which gives the system

$$
\begin{cases}
a + b &= \lambda a \\
    a &= \lambda b.
\end{cases}
$$

When $\lambda = \lambda_0$, let $b=1$. Then $a=\lambda_0$. Let's verify:

$$
\begin{aligned}
\frac{1 + \sqrt5}{2} + 1 &\stackrel{?}{=} \left(\frac{1 + \sqrt5}{2}\right)^2 \\
    \frac{3 + \sqrt5}{2} &= \frac{3 + \sqrt5}{2}
\end{aligned}
$$

So the eigenvector corresponding to $\lambda_0$ is $\begin{bmatrix} \lambda_0 \\ 1 \end{bmatrix}$. Similarly, for $\lambda=\lambda_1$, the eigenvector is  $\begin{bmatrix} \lambda_1 \\ 1 \end{bmatrix}$.

Now normalize the vectors. Then $\mathbf{Q} = \begin{bmatrix} \frac{\lambda_0}{\sqrt{1+\lambda_0^2}} &\frac{\lambda_1}{\sqrt{1+\lambda_1^2}} \\ \frac{1}{\sqrt{1+\lambda_0^2}} &\frac{1}{\sqrt{1+\lambda_1^2}} \end{bmatrix}$.

""" END OF THIS PART """

# Part 7 (10 points, non-coding task)

**Use the spectral decomposition result to derive a closed form of $F_n$ for $n \in \left\{ 0, 1, \cdots \right\}$.**

- Reasoning is required.
- Your answer shall be written in terms of $\lambda_0$, $\lambda_1$, and $F_0$ and $F_1$.

\#\#\# WRITE YOUR SOLUTION HERE ###

For $n \ge 1$, we have

$$
\begin{bmatrix} F_n \\ F_{n-1} \end{bmatrix} = A^{n-1} \begin{bmatrix} F_1 \\ F_0 \end{bmatrix}
$$

> *Lemma.* Let $\mathbf{A}$ be a square matrix and let $\lambda$ be an eigenvalue of $\mathbf{A}$ with corresponding eigenvector $\mathbf{x} \neq \mathbf{0}$. Then for any positive integer $k$, $\lambda^k$ is an eigenvalue of $\mathbf{A}^k$, and $\mathbf{x}$ is a corresponding eigenvector of $\mathbf{A}^k$.
> 
> *Proof.* Suppose $\mathbf{A} \mathbf{x} = \lambda \mathbf{x}$. Then, applying $\mathbf{A}$ repeatedly:
> $$ \mathbf{A}^2 \mathbf{x} = \mathbf{A} (\mathbf{A} \mathbf{x}) = \mathbf{A} (\lambda \mathbf{x}) = \lambda \mathbf{A} \mathbf{x} = \lambda (\lambda \mathbf{x}) = \lambda^2 \mathbf{x}.$$
> By induction, we can generalize this to:
> $$\mathbf{A}^k \mathbf{x} = \lambda^k \mathbf{x}. \quad\square$$
> 
> Taking a step further, if $\mathbf{A}$ is diagonalizable, then:
> $$\mathbf{A}^k = (\mathbf{Q}\mathbf{\Lambda}\mathbf{Q}^{-1})^k = \mathbf{Q}\mathbf{\Lambda}^k\mathbf{Q}^{-1}.$$

Back to the problem,

$$
\begin{aligned}
\begin{bmatrix} F_n \\ F_{n-1} \end{bmatrix} &= \mathbf{Q}\mathbf{\Lambda}^{n-1}\mathbf{Q}^\top \begin{bmatrix} F_1 \\ F_0 \end{bmatrix} \\
                                             &= \begin{bmatrix} \frac{\lambda_0}{\sqrt{1+\lambda_0^2}} &\frac{\lambda_1}{\sqrt{1+\lambda_1^2}} \\ \frac{1}{\sqrt{1+\lambda_0^2}} &\frac{1}{\sqrt{1+\lambda_1^2}} \end{bmatrix} \begin{bmatrix} \lambda_0^{n-1} & 0 \\ 0 & \lambda_1^{n-1} \end{bmatrix} \begin{bmatrix} \frac{\lambda_0}{\sqrt{1+\lambda_0^2}} &\frac{1}{\sqrt{1+\lambda_0^2}} \\ \frac{\lambda_1}{\sqrt{1+\lambda_1^2}} &\frac{1}{\sqrt{1+\lambda_1^2}} \end{bmatrix} \begin{bmatrix} F_1 \\ F_0 \end{bmatrix} \\
                                             &= \begin{bmatrix} \frac{\lambda_0^n}{\sqrt{1+\lambda_0^2}} &\frac{\lambda_1^n}{\sqrt{1+\lambda_1^2}} \\ \frac{\lambda_0^{n-1}}{\sqrt{1+\lambda_0^2}} &\frac{\lambda_1^{n-1}}{\sqrt{1+\lambda_1^2}} \end{bmatrix} \begin{bmatrix} \frac{\lambda_0}{\sqrt{1+\lambda_0^2}} &\frac{1}{\sqrt{1+\lambda_0^2}} \\ \frac{\lambda_1}{\sqrt{1+\lambda_1^2}} &\frac{1}{\sqrt{1+\lambda_1^2}} \end{bmatrix} \begin{bmatrix} F_1 \\ F_0 \end{bmatrix} \\
                                             &= \begin{bmatrix} \frac{\lambda_0^{n+1}}{1+\lambda_0^2}+\frac{\lambda_1^{n+1}}{1+\lambda_1^2} &\frac{\lambda_0^n}{1+\lambda_0^2}+\frac{\lambda_1^n}{1+\lambda_1^2} \\ \frac{\lambda_0^n}{1+\lambda_0^2}+\frac{\lambda_1^n}{1+\lambda_1^2} &\frac{\lambda_0^{n-1}}{1+\lambda_0^2}+\frac{\lambda_1^{n-1}}{1+\lambda_1^2} \end{bmatrix} \begin{bmatrix} F_1 \\ F_0 \end{bmatrix} \\
                                         F_n &= \left(\frac{\lambda_0^{n+1}}{1+\lambda_0^2}+\frac{\lambda_1^{n+1}}{1+\lambda_1^2}\right) F_1 + \left(\frac{\lambda_0^n}{1+\lambda_0^2}+\frac{\lambda_1^n}{1+\lambda_1^2}\right) F_0
\end{aligned}
$$

For $n=0$, notice that

$$
\frac{\lambda_0^{0+1}}{1+\lambda_0^2}+\frac{\lambda_1^{0+1}}{1+\lambda_1^2} = 0
$$

and 

$$
\frac{\lambda_0^{0}}{1+\lambda_0^2}+\frac{\lambda_1^{0}}{1+\lambda_1^2} = 1,
$$

so the equation should work fine for all integer $n \ge 0$.

""" END OF THIS PART """

## Part 8 (10 points, non-coding task)

**Compute**

$$
\lim_{n \rightarrow \infty} \ \frac{F_n}{F_{n-1}} .
$$

- Reasoning is required.
- Your answer shall be written in terms of one or two eigenvalues.

\#\#\# WRITE YOUR SOLUTION HERE ###

We have $|\lambda_1| < 1$. As $n \rightarrow \infty$, the terms involving $\lambda_1$ become negligible.

$$
\begin{aligned}
\lim_{n \rightarrow \infty} \frac{F_n}{F_{n-1}} &= \lim_{n \rightarrow \infty} \frac{\left(\frac{F_1\lambda_0}{1 + \lambda_0^2} + \frac{F_0}{1 + \lambda_0^2} \right) \lambda_0^{n}}{\left(\frac{F_1\lambda_0}{1 + \lambda_0^2} + \frac{F_0}{1 + \lambda_0^2} \right) \lambda_0^{n-1}} \\
                                                &= \lim_{n \rightarrow \infty} \frac{\lambda_0^n}{\lambda_0^{n-1}} \\
                                                &= \lambda_0.
\end{aligned}
$$

""" END OF THIS PART """

## Part 9 (15 points, coding task)

**Define a class called `My_Fib`.**

- Attributes:
    - `Q`: This attribute is matrix $Q$ computed above. It is a numpy array with shape `(2,2)`.
    - `lambdas`: This attribute is a numpy array with shape `(2,)` that includes two eigenvalues computed above.
- Method `__init__`:
    - All attribute values shall be initialized when an object in this class is constructed.
- Method `compute_fib`:
    - This method computes the sequence values on designated indices.
    - You must use the spectral decomposition result to write this method.
    - **You are not allowed to use any loop.**
    - Inputs:
        - `f0`: The value of $F_0$
        - `f1`: The value of $F_1$
        - `indices`: a list/tuple/range object that includes indices with which the sequence values shall be computed. \
    For instance, if `indices` takes the value `[3, 5, 9]`, we need to compute $F_3$, $F_5$, $F_9$. \
    In our test cases, you are guaranteed that `len(indices)` is at least 1. You do not need to worry about the size of the test cases or whether the sequence values are too big (that is, on your side, you do not need to worry about those corner cases).
    - Outputs:
        - Return a numpy array `fib_values` with shape `(len(indices),)` and datatype `int32`.
        - `fib_values[i]` takes the value of $F_{indices[i]}$. \
        For instance, if `indices` takes the value `[3, 5, 9]`, then fib_values has shape `(3,)`. The values of `fib_values[0]`, `fib_values[1]`, `fib_values[2]` are $F_3$, $F_5$, $F_9$, respectively.
    - Inside this method:
        - Print `fib_values`.
- Method `plot_fib`:
    - This method plots indices vs. sequence values on those indices.
    - Inputs: The same as the method `compute_fib(f0, f1, indices)`.
    - Outputs: None.
    - In your plot,
        - All data points with input indices are with marker `x`.
        - The linestyle is `--`.
        - The color is red.
        - The x-label is: $n$.
        - The y-label is: $F_n$.
        - The title is: Fibonacci sequence.

\#\#\# WRITE YOUR SOLUTION HERE ###

Recall that

$$
\begin{aligned}
\begin{bmatrix} F_n \\ F_{n-1} \end{bmatrix} &= \mathbf{Q}\mathbf{\Lambda}^{n-1}\mathbf{Q}^\top \begin{bmatrix} F_1 \\ F_0 \end{bmatrix} \\
                                             &= \begin{bmatrix} \frac{\lambda_0^n}{\sqrt{1+\lambda_0^2}} &\frac{\lambda_1^n}{\sqrt{1+\lambda_1^2}} \\ \frac{\lambda_0^{n-1}}{\sqrt{1+\lambda_0^2}} &\frac{\lambda_1^{n-1}}{\sqrt{1+\lambda_1^2}} \end{bmatrix} \mathbf{Q}^\top \begin{bmatrix} F_1 \\ F_0 \end{bmatrix} \\
                                         F_n &= \begin{bmatrix} \frac{\lambda_0^n}{\sqrt{1+\lambda_0^2}} &\frac{\lambda_1^n}{\sqrt{1+\lambda_1^2}} \end{bmatrix} \mathbf{Q}^\top \begin{bmatrix} F_1 \\ F_0 \end{bmatrix}.
\end{aligned}
$$

We will use this result in `compute_fib`.

""" END OF THIS PART """

## Part 10 (5 points, coding task)

**Do the following tasks in this part.**

- Define an object of the class `My_Fib` called `my_fib`.
- Set `f0 = 0`, `f1 = 1`, `indices = range(10)`.
- Call method `my_fib.plot_fib(f0, f1, indices)`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

---

## Editorial & Solutions

Official competition notebook available at jaredliw/ioai-tsp-2025.
