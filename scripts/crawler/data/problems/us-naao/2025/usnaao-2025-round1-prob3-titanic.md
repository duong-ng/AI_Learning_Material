---
id: "usnaao-2025-round1-prob3-titanic"
competition: "US-NAAO"
year: 2025
stage: "Round 1 - Online Qualifier"
title: "Tabular Feature Engineering & Classification on Passenger Survival"
domain: "Tabular ML"
difficulty: "Medium"
evaluation_metric: "ROC-AUC"
tags:
  - "tabular-ml"
  - "feature-engineering"
  - "gradient-boosting"
  - "usaaio-2025"
dataset_links:
  - "https://drive.google.com/file/d/125YsFPS2nCNRvYyy1tgnD8RhYIUglLX9/view?usp=sharing"
  - "https://raw.githubusercontent.com/jaredliw/ioai-tsp-2025/main/usaaio-2025/round1/USAAIO_2025_round1_prob3_train.csv"
starter_code_url: "https://github.com/jaredliw/ioai-tsp-2025/blob/main/usaaio-2025/round1/problem-3.ipynb"
source_url: "https://www.usaaio.org/past-problems"
crawled_at: "2026-09-18T14:50:12.654311"
version: 1
---
# Problem 3 (100 points)

Before starting this problem, make sure to run the following code first **without change**:

> WARNING !!!

- Beyond importing libraries/modules/classes/functions in the preceding cell, you are **NOT allowed to import anything else for the following purposes**:
    - **As a part of your final solution.** For instance, if a problem asks you to build a model without using sklearn but you use it, then you will not earn points.
    - **Temporarily import something to assist you to get a solution.** For instance, if a problem asks you to manually compute eigenvalues but you temporarily use `np.linalg.eig` to get an answer and then delete your code, then you violate the rule.

    **Rule of thumb:** Each part has its particular purpose to intentionally test you something. Do not attempt to find a shortcut to circumvent the rule.

- All coding tasks shall run on CPUs, **not GPUs**.

## Part 1 (5 points, coding task)

We study the dataset `USAAIO_2025_round1_prob3_train.csv` provided in this contest.

The dataset can be found here:

```python
url = "https://drive.google.com/file/d/125YsFPS2nCNRvYyy1tgnD8RhYIUglLX9/view?usp=sharing"
```

**Do the following tasks in this part.**

1. Load `USAAIO_2025_round1_prob3_train.csv` into a pandas DataFrame object called `df_1`.
2. Print the first 10 rows.
3. Define a function called `data_summary` that
    - Takes a DataFrame object as an input.
    - Prints the shape of the DataFrame.
    - Prints the data type for each column.
    - Prints the count of missing values for each column.
    - Delivers no output.
4. After defining the above function, call it by feeding `df_1` to it.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 2 (5 points, coding task)

**Do the following tasks in this part.**

1. Create a DataFrame object called `df_2` that keeps the following columns in `df_1` (all other columns in `df_1` shall not appear in `df_2`):
    - Survived
    - Sex
    - Age
    - SibSp
    - Parch
    - Fare
    - Embarked
2. Print the first 5 rows of `df_2`.
3. Print the shape of `df_2`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 3 (5 points, coding task)

**Do the following tasks in this part.**

1. In `df_2`, remove all rows that contain null (missing) values.
2. Save the updated DateFrame object as `df_3` (that is, the change of `df_2` should not be inplace).
3. For `df_3`, print the count of missing values per column.
4. Print the shape of `df_3`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 4 (5 points, coding task)

**Do the following tasks in this part.**

1. Create a deep copy of `df_3`, named `df_4`.
2. In `df_4`, create a new column called `GroupSize`. Its value is equal to `SibSp + Parch + 1`.
3. Print the first five rows of `df_3` and `df_4`.
4. Print the shapes of `df_3` and `df_4`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 5 (5 points, coding task)

**Do the following tasks in this part.**

1. Remove columns `SibSp` and `Parch` in `df_4`, and save this new DataFrame object as `df_5` (changes on `df_4` should not be inplace).
2. Print the first five rows of `df_4` and `df_5`.
3. Print the shapes of `df_4` and `df_5`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 6 (5 points, coding and conceptual reasoning task)

In `df_5`, columns `Sex` and `Embarked` are categorical data.

**Do the following tasks to process these categorical data.**

1. To do logistic regression on this dataset, we need to do one hot encoding on these two columns. Explain why?
2. Do one hot encoding on these two columns. Set `drop_first = True` and `dtype = np.int8`. Save the new dataframe object as `df_6`.
3. Explain what `drop_first = True` means and why we do so.
4. Print the first five rows of `df_5` and `df_6`.
5. Print the shapes of `df_5` and `df_6`.

\#\#\# WRITE YOUR SOLUTION HERE ###

Answer to question 1: Logistic regression takes numerical data.

Answer to question 3: For a feature with $k$ categories, setting `drop_first = True` results in only $k-1$ indicator (dummy) columns. This is done to **avoid multicollinearity**, where one dummy variable can be perfectly predicted from the others.

""" END OF THIS PART """

## Part 7 (5 points, coding task)

**Do the following tasks in this part.**

1. Define `X` that keeps all features in `df_6` and drops the label column `Survived`.
2. Define `y` that keeps the label column `Survived` in `df_6` only.
3. Print the types of objects `X` and `y`.
4. Print the first five rows of `X` and the first five elements in `y`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 8 (5 points, coding task)

**Do the following tasks in this part.**

1. Define a function called `my_train_test_split` that splits the whole dataset into the training component and the test/validation component.
    - The split is random
    - Inputs
        - `X`: A DataFrame object of features of all sample data.
        - `y`: A Series object of labels of all sample data.
        - `test_size`: It takes a value between 0 and 1 that denotes the fraction of samples used for testing. That is, the number of samples used for testing is `int(total number of samples * test_size)`.
    - Outputs
        - `X_train`: It keeps samples in `X` for training.
        - `X_test`: It keeps samples in `X` for testing.
        - `y_train`: It keeps samples in `y` for training.
        - `y_test`: It keeps samples in `y` for testing.
2. Call this function with inputs
    - `X = X`
    - `y = y`
    - `test_state = 0.2`
3. Print object types and shapes of `X_train`, `X_test`, `y_train`, `y_test`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Problem 9 (5 points, coding task)

**Use `StandardScaler` that has been imported from `sklearn.preprocessing` (DO NOT IMPORT IT AGAIN) to do the following tasks.**

1. Create an object called `scaler`.
2. Use `scaler.fit_transform` to scale each column in `X_train` to standard normal. Save the scaled training dataset as `X_train_scaled`.
3. Use `scaler.transform` to scale `X_test`. Save the scaled test dataset as `X_test_scaled`.
4. Add a column to `X_train_scaled` with all 1s. Do the same thing for `X_test_scaled`.
5. Print the types of objects `X_train_scaled` and `X_test_scaled`.
6. Print the shapes of objects `X_train_scaled` and `X_test_scaled`.
7. Print the first five rows of `X_train_scaled` and `X_test_scaled`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 10 (5 points, non-coding task)

So far, we have finished preprocessing our dataset. We use this dataset for the purpose of doing **binary classification**.

**In all remaining parts in this problem, we will train a logistic regression model with our preprocessed data and test its performance.**

Let all training samples be indexed as $0, 1, \cdots , N-1$. For the $n$th sample, denote by $\mathbf{x}^{(n)} \in \Bbb R^{d \times 1}$ a column vector of all features and $y^{(n)} \in \left\{ 0, 1 \right\}$ its ground-truth label.

In the logistic regression, denote by $\mathbf{\beta} \in \Bbb R^{d \times 1}$ the learnable parameters.

Thus, our predicted label is determined according to:

$$
y^{(n)}_{predict} = \begin{cases} 1 , & \text{with probability } \sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right) \\ 0, & \text{with probability } 1 - \sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right) \\ \end{cases}
$$

where

$$
\sigma \left( z \right) = \frac{1}{1 + e^{-z}}
$$

is the sigmoid function.

**Do the following task in this part.**

To train our model, we need to solve the following optimization problem:

$$
\min_{\mathbf{\beta}} \ L \left(\mathbf{\beta} \right) .
$$

Write down the loss function $L(\beta)$ in the following form (reasoning is not required):

$$
L \left(\mathbf{\beta} \right) = \sum_{n=0}^{N-1} \cdots .
$$

\#\#\# WRITE YOUR SOLUTION HERE ###

For a binary classification task, the probability model is defined as

$$
\begin{aligned}
P(y^{(n)}=1|\mathbf{x}^{(n)};\beta) &= \sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right) \\
P(y^{(n)}=0|\mathbf{x}^{(n)};\beta) &= 1 - \sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right) .
\end{aligned}
$$

We can further express them in a single equation:

$$
P(y^{(n)}|\mathbf{x}^{(n)};\beta) = \sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right)^{y^{(n)}} \cdot \left(1 - \sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right)\right)^{1-y^{(n)}} .
$$

The log-likelihood function is then

$$
\begin{aligned}
L(\beta) &= -\ln \prod_{n=0}^{N-1} {P(y^{(n)}|\mathbf{x}^{(n)};\beta)} \\
             &= - \sum_{n=0}^{N-1} \ln\left(\sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right)^{y^{(n)}} \cdot \left(1 - \sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right)\right)^{1-y^{(n)}}\right) \\
             &= \sum_{n=0}^{N-1} \left(- y^{(n)} \ln \sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right) - (1 - y^{(n)}) \ln \left( 1 - \sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right) \right) \right) .
\end{aligned}
$$

""" END OF THIS PART """

## Part 11 (5 points, non-coding task)

**Compute**

$$
\frac{d \sigma \left( z \right)}{dz} .
$$

- Express your answer using $\sigma \left( z \right)$ ($e^z$ or $e^{-z}$ should not appear in your final solution).
- Reasoning is required.

\#\#\# WRITE YOUR SOLUTION HERE ###

$$
\begin{aligned}
\frac{d \sigma \left( z \right)}{dz} &= \frac{d}{dz} \left(1+\exp(-z)\right)^{-1} \\
                                     &= -\left(1+\exp(-z)\right)^{-2} \cdot -\exp(-z) \\
                                     &= \frac{\exp(-z)}{(1+\exp(-z))^2} \\
                                     &= \frac{1}{1+\exp(-z)} \cdot \frac{\exp(-z)+1-1}{1+\exp(-z)} \\
                                     &= \frac{1}{1+\exp(-z)} \left(1-\frac{1}{1+\exp(-z)}\right) \\
                                     &= \sigma(z) (1-\sigma(z)) .
\end{aligned}
$$

""" END OF THIS PART """

## Part 12 (5 points, non-coding task)

**In this part, you are asked to compute $\nabla_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right)$ and express your solutions in two forms. Reasoning is not required.**

1. Write $\nabla_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right)$ in the following summation form:
   $$\nabla_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right) = \sum_{n=0}^{N-1} \cdots .$$
2. Denote
   $$\mathbf{X} = \begin{bmatrix} \mathbf{x}^{(0), \top} \\ \mathbf{x}^{(1), \top} \\ \vdots \\ \mathbf{x}^{(N-1), \top} \end{bmatrix}$$
   and
   $$\mathbf{y} = \begin{bmatrix} y^{(0)} \\ y^{(1)} \\ \vdots \\ y^{(N-1)} \end{bmatrix}$$
   and
   $$\mathbf{z} = \begin{bmatrix} \sigma \left( \mathbf{x}^{(0), \top} \mathbf{\beta} \right) \\ \sigma \left( \mathbf{x}^{(1), \top} \mathbf{\beta} \right) \\ \vdots \\ \sigma \left( \mathbf{x}^{(N-1), \top} \mathbf{\beta} \right) \end{bmatrix}.$$
   Write $\nabla_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right)$ in terms of $\mathbf{X}$, $\mathbf{y}$, $\mathbf{z}$ with matrix operations (the summation symbol is not allowed).

\#\#\# WRITE YOUR SOLUTION HERE ###

We have

$$
\begin{aligned}
\big[\nabla_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right)\big]_i &= \frac{\partial L(\beta)}{\partial \beta_i} \\
                                                                      &= -\frac{\partial}{\partial \beta_i} \sum_{n=0}^{N-1} \left(y^{(n)} \ln \sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right) + (1 - y^{(n)}) \ln \left( 1 - \sigma \left( \mathbf{x}^{(n), \top} \mathbf{\beta} \right) \right) \right) \\
                                                                      &= -\sum_{n=0}^{N-1} \left(y^{(n)} \frac{\frac{\partial}{\partial \beta_i} \sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)}{\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)} + (1-y^{(n)}) \frac{-\frac{\partial}{\partial \beta_i} \sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)}{1-\frac{\partial}{\partial \beta_i} \sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)} \right) \\
                                                                      &= -\sum_{n=0}^{N-1} \left(y^{(n)} \frac{1}{\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)} - (1-y^{(n)}) \frac{1}{1-\frac{\partial}{\partial \beta_i} \sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)}\right) \sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) \left( 1 - \sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) \right) x^{(n)}_i \\
                                                                      &= -\sum_{n=0}^{N-1} \left(y^{(n)} - y^{(n)}\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) - \frac{\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) - \sigma^2\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)}{1-\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)} + \frac{y^{(n)}\left(\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)-\sigma^2\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)\right)}{1-\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)} \right) x^{(n)}_i \\
                                                                      &= -\sum_{n=0}^{N-1} \left(y^{(n)} - y^{(n)}\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) - \sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) + y^{(n)}\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) \right) x^{(n)}_i \\
                                                                      &= \sum_{n=0}^{N-1} \left(\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) - y^{(n)} \right) x^{(n)}_i \\
        \nabla_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right) &= \sum_{n=0}^{N-1} \left(\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) - y^{(n)} \right) \mathbf{x}^{(n)} .
\end{aligned}
$$

*Note: $\left(\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) - y^{(n)}\right)$ is a scalar.*

An equivalent matrix operation is

$$
\nabla_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right) = \mathbf{X}^\top(\mathbf{z}-\mathbf{y}) .
$$

""" END OF THIS PART """

## Part 13 (5 points, non-coding task)

In this part, you are asked to compute $\nabla_{\mathbf{\beta}}^2 \ L \left( \mathbf{\beta} \right)$ and express your solutions in two forms. Reasoning is not required.

1. Write $\nabla_{\mathbf{\beta}}^2 \ L \left( \mathbf{\beta} \right)$ in the following summation form:
   $$\nabla_{\mathbf{\beta}}^2 \ L \left( \mathbf{\beta} \right) = \sum_{n=0}^{N-1} \cdots .$$
2. Denote
   $$\mathbf{Z} = \begin{bmatrix} z_0 & 0 & \cdots & 0 \\ 0 & z_1 & \cdots & 0 \\ \vdots & \vdots & \ddots & 0 \\ 0 & 0 & \cdots & z_{N-1} \end{bmatrix} .$$
   Write $\nabla_{\mathbf{\beta}}^2 \ L \left( \mathbf{\beta} \right)$ in terms of $\mathbf{X}$, $\mathbf{Z}$ with matrix operations (the summation symbol is not allowed).

\#\#\# WRITE YOUR SOLUTION HERE ###

We have

$$
\begin{aligned}
\big[\nabla^2_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right)\big]_{ij} &= \frac{\partial}{\partial \beta_j} \sum_{n=0}^{N-1} \left(\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) - y^{(n)} \right) x^{(n)}_i \\
                                                                        &= \sum_{n=0}^{N-1} \sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) \left(1-\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)\right) x^{(n)}_i x^{(n)}_j \\
            \nabla^2_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right) &= \sum_{n=0}^{N-1} \sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) \left(1-\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)\right) \mathbf{x}^{(n)} \mathbf{x}^{(n),\top} .
\end{aligned}
$$

*Note: $\mathbf{x}^{(n)} \mathbf{x}^{(n),\top}$ gives a $d\times d$ matrix and $\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right) \left(1-\sigma\left(\mathbf{x}^{(n),\top}\mathbf{\beta}\right)\right)$ is a scalar.*

An equivalent matrix operation is

$$
\nabla^2_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right) = \mathbf{X}^\top\mathbf{Z}\left(\mathbf{I}-\mathbf{Z}\right)\mathbf{X}.
$$

""" END OF THIS PART """

## Part 14 (5 points, non-coding task)

**Prove that $L(\beta)$ is a (weakly) concave function.**

- Reasoning is required.

\#\#\# WRITE YOUR SOLUTION HERE ###

> *Definition.* A symmetric matrix $\mathbf{A}\in \Bbb R^{n \times n}$ is called **positive semidefinite** if
> $$\forall \mathbf{v} \in \Bbb R^n, \mathbf{v}\ne0, \quad \mathbf{v}^\top\mathbf{Av}\ge0.$$

> *Lemma.* A symmetric matrix $\mathbf{A}\in \Bbb R^{n \times n}$ is positive semidefinite if all of its eigenvalues $\lambda_i$ are non-negative.
>
> *Proof.* Since $\mathbf{A}$ is symmetric, we can decompose it spectrally as $\mathbf{A} = \mathbf{Q\Lambda Q^\top}$ (done this in Problem 1 Part 6). Then, for any $\mathbf{x}\ne 0$, let $\mathbf{y}=\mathbf{Q^\top x}$. We have
> $$ \begin{aligned}\mathbf{x^\top A x} &= \mathbf{x^\top Q\Lambda Q^\top x} \\ &= \mathbf{(Qx^\top)^\top \Lambda y} \\ &= \mathbf{y^\top \Lambda y} \\ &= \sum_{i=1}^n \lambda_i y_i^2 \ge 0 \quad \because \lambda_i \ge 0. \end{aligned}$$
> 
> *Note: In the previous part, we converted the summation into a matrix expression. Now, we follow a similar process, but in reverse.*

Let $\mathbf{W}=\mathbf{Z(I-Z)}$.

Since $\mathbf{Z}$ is diagonal, the operation $\mathbf{Z(I-Z)}=\mathbf{Z-Z^2}$ reduces to an element-wise operation on the diagonal entries. The eigenvalues of $\mathbf{W}$ are simply the diagonal entries $z_i(1-z_i)$, which are all non-negative as $0 \le \sigma(\cdot) \le 1$. Therefore, $\mathbf{W}$ is positive semidefinite and we have

$$
\nabla^2_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right) = \mathbf{X}^\top\mathbf{W}\mathbf{X} \ge 0.
$$

The second derivative (Hessian) of the loss function is thus positive semidefinite. This means that the loss function is (weakly) convex.

*Note: We can show "$\mathbf{W}$ is positive semidefinite implies that $\mathbf{x^\top A x}$ is also positive semidefinite" using the same reasoning as in the proof of the lemma above.*

""" END OF THIS PART """

## Problem 15 (5 points, non-coding task)

To learn $\beta$, we do whole-batch iteration with the gradient descent algorithm and the Netwon’s method.

In this part, denote by $\eta>0$ the learning rate.

**Do the following tasks in this part (reasoning is not required).**

1. Write down the gradient descent algorithm in the following form:
   $$\mathbf{\beta} \leftarrow \mathbf{\beta} - \eta \cdot \boxed{???} .$$
2. Write down the Newton’s method in the following form:
   $$\mathbf{\beta} \leftarrow \mathbf{\beta} - \eta \cdot \boxed{???} .$$

\#\#\# WRITE YOUR SOLUTION HERE ###

1. $\mathbf{\beta} \leftarrow \mathbf{\beta} - \eta \cdot \nabla_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right)$.
2. $\mathbf{\beta} \leftarrow \mathbf{\beta} - \eta \cdot \left(\nabla^2_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right)\right)^{-1} \nabla_{\mathbf{\beta}} \ L \left( \mathbf{\beta} \right)$.

""" END OF THIS PART """

## Part 16 (5 points, coding task)

**Define a function called `my_signoid`:**

- Input: A numpy array with any shape.
- Output: Elementwise sigmoid functional values.
- No loop in the body of your function.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 17 (15 points, coding task)

**Construct a class called `My_Log_Reg` whose objects are logistic regression models.**

- Method `__init__`
    - Inputs
        - `solver`: The value must be `GD` or `Newton`. Otherwise, it raises an error message `Invalid solver`.
        - `lr`: The learning rate.
        - `num_iter`: The total number of iterations.
    - Attributes
        - `solver`
        - `lr`
        - `num_iter`
        - `coef_`: $\beta$ in our theoretical model. It shall be a 1-dim numpy array with shape `(d,)`.
- Method `fit`
    - Inputs
        - `X`: Features in a training dataset. The shape is `(N_train,d)`.
        - `y`: Ground-truth labels in a training dataset. The shape is `(N_train,)`.
    - In the body of this method
        - Use the configured solver to compute `coef_`.
        - Do whole-batch iteration.
        - After finishing training `coef_`, generate a plot about the loss function vs iteration.
            - The x-label is `iter`.
            - The y-label is `loss`.
            - The title is the optimization method: either `GD` or `Newton`.
        - **The only loop that you can use is the whole-batch iteration. Within each iteration, when you update `coef_` by applying either `GD` or `Newton`, you are not allowed to use any loop.**
    - Output
        - None
- Method `predict`
    - Input
        - `X`: Features in a test dataset. The shape is `(N_test,d)`.
    - Output
        - `y_pred`: Predicted labels in the test dataset. The shape is `(N_test,)`.
- Method `score`
    - Input
        - `X`: Features in a test dataset. The shape is `(N_test,d)`.
        - `y`: Ground-truth labels in the test dataset. The shape is `(N_test,)`.
    - Output
        - `accuracy_score`: The accuracy score of the prediction of `y`.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

## Part 18 (5 points, coding task)

**Do the following tasks in this problem.**

1. Define two models:
    - `model_GD = My_Log_Reg(solver='GD', lr=.01, num_iter=200)`
    - `model_Newton = My_Log_Reg(solver='Newton', lr=.1, num_iter=200)`
2. For each model,
    - Use the training dataset to train it.
    - Print the trained coefficients `coef_`.
    - Use the test dataset to compute the accuracy score. Print it.

\#\#\# WRITE YOUR SOLUTION HERE ###

""" END OF THIS PART """

---

## Editorial & Solutions

Official competition notebook available at jaredliw/ioai-tsp-2025.
