---
id: "ioai-2026-athome-task-2"
competition: "IOAI"
year: 2026
stage: "Scientific Round - At-Home"
title: "Cross-Modal Alignment: Zero-Shot Audio-Vision Retrieval"
domain: "Multimodal"
difficulty: "Hard"
evaluation_metric: "mAP"
tags:
  - "ioai-2026"
  - "multimodal"
  - "map"
dataset_links: []
starter_code_url: "https://github.com/IOAI-official/IOAI-2026/blob/main/At-Home-Round/Home-Task-2.ipynb"
source_url: "https://github.com/IOAI-official/IOAI-2026/tree/main/At-Home-Round"
crawled_at: "2026-09-18T14:50:06.229805"
version: 1
---
<a href="https://colab.research.google.com/github/IOAI-official/IOAI-2026/blob/main/At-Home-Round/Home-Task-2.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

# Robot Delivery Academy: Preparatory Program

## 1. Problem Description

Welcome to the **Robot Delivery Academy**, the preparatory program for the Robot Training task.

You are working with a small delivery robot on an `8 x 8` city map. In each episode, the robot starts somewhere on the map, picks up a package from one depot, and delivers it to another depot. Some cells are blocked, and every map is slightly different.

For a human programmer, this kind of task may look easy: inspect the map, find a path, pick up the package, deliver it. But the goal here is different. We want to check whether an AI model can learn this behavior from examples instead of being given the full hand-written strategy.

The training principle is supervised learning. We prepare many examples of the form:

```text
observation -> action
```

The model sees what action was taken in each situation and tries to learn the pattern. Later, it must act on new scenarios where the answers are not provided.

### Your Mission

Train a model that can:

1. Learn from provided demonstrations.
2. Predict a useful next action from the current observation.
3. Run for a complete episode and deliver the package.
4. Generalize to validation and test scenarios that were not shown as demonstrations.

### The Challenge

You are given a deliberately small demonstration budget. The interesting question is not whether the task can be solved by a search algorithm, but whether you can train a model that learns enough from limited examples.

A single wrong action can move the robot into states that were rare in the demonstrations, so high action accuracy does not always mean high episode success.


## 2. Download the data

This task's data (three `.pkl` files) lives in the shared **`IOAI-2026/RobotDelivery`** Drive folder. The cell below downloads it into a local `data/` folder — no sign-in or setup, just run it.

## 3. Understanding the Task Simulator

For this preparatory task, we also provide a small simulator. It is mainly here to make the task easier to understand: you can use it to inspect scenario conditions, replay demonstration trajectories, and visualize the solutions produced by your model.

The task is a small grid delivery problem.

- The grid size is `8 x 8`.
- There are six depot cells: `A`, `B`, `C`, `D`, `E`, `F`.
- One depot contains the package.
- Another depot is the destination.
- The robot must move to the package, pick it up, move to the destination, and drop it off.
- Walls block movement.

The simulator is included directly in this notebook so it works as a single Google Colab file. It is used to show examples and to check complete episodes after training. The visual helper below can also save and display animated GIFs.


## 4. Dataset

### 4.1 Provided Training Data

You are provided with expert demonstrations saved in `data/train_demos.pkl`.

Each trajectory contains observations and expert actions from one successful delivery episode.

**Data Format:**

```python
{
    "trajectories": [
        {
            "layout_id": str,
            "episode_seed": int,
            "scenario": dict,
            "observations": [
                {
                    "grid": np.array,       # shape: (6, 8, 8)
                    "vector": np.array,     # shape: (13,)
                    "action_mask": np.array,# shape: (6,)
                    "state": tuple
                },
                ...
            ],
            "actions": [int, ...],       # action IDs 0-5
            "success": bool,
            "num_steps": int
        },
        ...
    ]
}
```

### 4.2 Validation and Test Scenarios

You are also provided with:

- `data/valid_scenarios.pkl`
- `data/test_scenarios.pkl`

These files contain delivery scenarios without expert action labels. They are used to run your trained model and check complete-episode success.


## 5. Task

### 5.1 Objective

Train a behavioral cloning action model that:

1. Takes the current observation as input.
2. Predicts the expert's next action.
3. Runs step by step in a full delivery episode.
4. Achieves high success rate on validation and test scenarios.

### 5.2 Input and Output

**Input observation:**

- `grid`: `6 x 8 x 8` tensor with walls, depots, robot position, package position, destination, and carrying flag.
- `vector`: 13 numerical features with normalized position and target information.
- `action_mask`: 6 binary values showing which actions are currently valid.

**Output action:**

A single integer from `0` to `5`:

| id | action |
|---:|---|
| 0 | south |
| 1 | north |
| 2 | east |
| 3 | west |
| 4 | pickup |
| 5 | dropoff |

### 5.3 Training Approach

Behavioral cloning is supervised learning:

1. Extract `(observation, expert_action)` pairs from demonstrations.
2. Train a neural network classifier.
3. Use cross-entropy loss between predicted action logits and expert actions.
4. Run the trained model in complete episodes.

### 5.4 Improving Beyond the Baseline

The baseline below is intentionally simple. Better solutions may come from better input representation, a model that matches the structure of the task, stronger training, and careful analysis of failed episodes.


## 6. Submission

### 6.1 What to Submit

Submit a notebook that produces a file named `predictions.zip` containing:

1. `predictions.jsonl` — predicted action sequences for all test scenarios.

### 6.2 Prediction Format

Each line in `predictions.jsonl` should be one JSON object:

```json
{"layout_id": "test_0000", "episode_seed": 300000, "actions": [1, 1, 2, 4, 0, 5]}
```

**Fields:**

- `layout_id`: scenario layout identifier.
- `episode_seed`: scenario seed.
- `actions`: list of action IDs, each integer from `0` to `5`.

### 6.3 How Evaluation Works

1. The evaluator reads your predicted actions.
2. For each test scenario, it starts from the provided scenario state.
3. It replays your actions step by step.
4. Success means the package is delivered to the destination.

### 6.4 Constraints

- Use the provided demonstrations for training.
- Do not use expert action labels for validation or test scenarios.
- Do not generate additional expert trajectories with search, planning, or another expert model.
- Your final prediction process should be deterministic.
- Your submitted notebook should generate `predictions.zip` from scratch.
- Rule-based or hard-coded solutions may be reviewed by the Scientific Committee.


## 7. Scoring

### 7.1 Evaluation Metric

**Success Rate (SR):**

```text
SR = (# successful delivery episodes) / (# total episodes)
```

An episode is successful if the package is delivered to the destination within the step limit.

### 7.2 Diagnostics

The notebook also reports:

- `avg_steps`: average number of steps used per episode.
- `avg_invalid_pickup_or_dropoff`: average number of invalid pickup/dropoff attempts.

These diagnostics are not a replacement for success rate, but they help debug model behavior.


## 8. Baseline & Training

Below is a complete baseline implementation using a simple MLP.

**Baseline Key Limitations:**

- The grid is flattened, so spatial structure is mostly lost.
- Rare actions such as `pickup` and `dropoff` are harder to learn.
- Action masking is used only during inference, not during training.
- The architecture is small and intended only as a starting point.

**Your task:** improve the model and training procedure to achieve better episode success.


### 8.1 Create Supervised Training Samples


### 8.2 Define Action Model

This baseline uses a small MLP. Stronger solutions should preserve the `8 x 8` spatial structure.


### 8.3 Train the Action Model


### 8.4 Evaluation Functions

Action accuracy is useful, but the main check is complete-episode success. A model can predict many individual actions correctly and still fail after one early mistake.


### 8.5 Inspect One Validation Episode


### 8.6 Generate Submission Files

The test set contains scenarios without expert actions. A prediction is a list of actions for each scenario.


## 9. Hints for Improvement

Here are some questions worth thinking about after you run the baseline.

### Representation

- Does the input format make the important geometry easy for the model to see?
- Are all parts of the observation equally useful, or should some parts be encoded differently?
- Does flattening the grid lose information that a model could otherwise use?

### Model

- Is the baseline model a good match for this kind of structured input?
- Should the model process the map and the numerical features in the same way?
- Can the model learn both local decisions and longer-range navigation patterns?

### Failure Analysis

- Does high action accuracy lead to high complete-episode success?
- Which episodes fail most often: before pickup, after pickup, near walls, or near the destination?
- Are there rare actions or rare situations that the model does not learn well?
- When you replay failed episodes, do the mistakes look random, systematic, or caused by earlier drift?
