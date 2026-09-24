---
id: "ioai-2026-athome-task-3"
competition: "IOAI"
year: 2026
stage: "Scientific Round - At-Home"
title: "Latent Space Disentanglement for Controllable Generation"
domain: "Generative AI"
difficulty: "Hard"
evaluation_metric: "Perplexity"
tags:
  - "ioai-2026"
  - "generative-ai"
  - "perplexity"
dataset_links: []
starter_code_url: "https://github.com/IOAI-official/IOAI-2026/blob/main/At-Home-Round/Home-Task-3.ipynb"
source_url: "https://github.com/IOAI-official/IOAI-2026/tree/main/At-Home-Round"
crawled_at: "2026-09-18T14:50:07.096621"
version: 1
---
<a href="https://colab.research.google.com/github/IOAI-official/IOAI-2026/blob/main/At-Home-Round/Home-Task-3.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

# 🗄️ The Analytical Language of John Wilkins

> *"These ambiguities, redundancies, and deficiencies recall those attributed by Dr. Franz Kuhn to a certain Chinese encyclopedia called the *Celestial Emporium of Benevolent Knowledge*. On those remote pages it is written that animals are divided into (a) those that belong to the Emperor, (b) embalmed ones, (c) those that are trained, (d) suckling pigs, (e) mermaids, (f) fabulous ones, (g) stray dogs, (h) those that are included in this classification..."*
>
> — Jorge Luis Borges, *The Analytical Language of John Wilkins*

## The story

In the seventeenth century a churchman named John Wilkins set out to build a perfect language — one in which the very *spelling* of a word would declare the nature of the thing it named. Each animal would be filed under a rigorous tree of yes-and-no distinctions: beast or fish, winged or finned, tame or wild, until the creature stood alone at the end of a single branch, named by the path that led to it.

The scheme failed, as all such schemes fail. But somewhere a clerk kept building it anyway. He bound every animal of the world into a great **Cabinet of Distinctions** — and then, before the index could be written, he died. The drawers remain. Each holds one creature behind a small brass grille, and the creature will not say its name. It will only answer **yes** or **no** to questions about its own nature.

The Cabinet has come to you with its labels lost. Two lists survived in the clerk's hand:

- `animals_pool.txt` — every creature filed in the Cabinet (~1,400 entries).
- `questions_pool.txt` — every distinction the clerk thought to draw (~500 yes/no questions).

Open a drawer. Ask your distinctions. Find the path that names the beast.

## Your task

Each hidden creature sits inside a sealed oracle called an **Interactor** — a brass grille over a drawer, holding one animal. You cannot see it. You may put to it one of two kinds of question:

| Call | Returns | What you are asking |
|---|---|---|
| `interactor.ask(question)` | `"yes"` or `"no"` | A yes/no question about the hidden animal. The question must be a line from `questions_pool.txt`. |
| `interactor.guess(animal)` | `"correct"` or `"wrong"` | "Is this the hidden animal?" `"correct"` ends the row. The animal must be a word from `animals_pool.txt`. |

Each question in the pool refers to the creature generically — *"is it a mammal?"*, *"does it live in water?"*, *"can it fly?"* — and the oracle answers about whichever animal is hidden in that drawer.

If you submit a question or animal not in the relevant pool, the oracle refuses without spending its strength: a `ValueError` is raised and your budget is unchanged. Typos cost nothing.

Each drawer will entertain at most **fifteen questions** before the grille falls shut.

### Scoring

For each creature:

```
score = max(0, (1 if you ever guessed correctly else 0) - 0.02 × queries_used)
```

- Correct guess on question 1 → 0.98
- Correct guess on question 5 → 0.90
- Correct guess on question 15 → 0.70
- Never correct → 0

Your score is the mean across all creatures in a test set. Tune on `dev`, then run the final cell to get your **`test1`** score — that summary table is what you submit a screenshot of. The organizers keep a second, **hidden** test set for official grading, so a solution that genuinely deduces (rather than overfits `dev`/`test1`) is what scores well.

## The oracle

In plain language, the oracle inside each Interactor is a local language model — by default, `Qwen/Qwen2.5-3B-Instruct`. When you call `ask(question)` it prompts the model with:

```
You are answering a question about one specific animal.
The animal is: <hidden animal>.
Answer with a single word, yes or no.
Question: <question>
```

at temperature 0, parses the first word of the reply, and returns `"yes"` or `"no"` to your code.

The model is deterministic (the same `(animal, question)` pair always gives the same answer) and runs entirely inside the Interactor. You are free to run the same model in your own code to **predict** what it will say without spending the oracle's strength — that is a large part of what makes a clever solution. Note the oracle answers from the model's *beliefs* about the animal, which are usually right but not infallible; a good solution is robust to the occasional surprising answer.

## Step 1: Setup

The dataset and helper code (`interactor.py`, `evaluate.py`, the two pools, the dev/test CSVs) live in the shared **`IOAI-2026/AnimalDeduction/dataset`** Drive folder. The cell below just downloads them into Colab — no sign-in, no shortcuts, just run it. Use a **GPU** runtime: *Runtime → Change runtime type → T4* (free tier is enough).

## Step 2: Load data and try the oracle

The `Interactor` owns the hidden gold animal and runs a local LLM (Qwen 2.5 3B Instruct by default) to answer yes/no questions about it. The first `Interactor(...)` instantiation triggers the LLM download (~6 GB on first run, takes 30-60 s on T4). Every subsequent Interactor reuses the same LLM that's already loaded in memory.

## Step 3: Solution interface

Your solution is a class with two methods:

- `__init__(self, animals_pool, questions_pool)` — runs once. Load models, precompute tables, etc.
- `solve(self, interactor)` — runs once per test row. Use the oracle to identify the hidden animal.

Inside `solve`, you have:

```
interactor.ask(question)      -> 'yes' or 'no'        (question must be in questions_pool)
interactor.guess(animal)      -> 'correct' or 'wrong' (animal must be in animals_pool)
interactor.is_done()          -> True after a correct guess or budget exhausted
interactor.remaining_budget() -> int
```

**Scoring per row**: `score = max(0, (1 if you ever guess correctly else 0) - 0.02 * total_queries)`.

Budget is **15 questions** per row. Information theory: `log₂(1400) ≈ 10.5 bits`, each yes/no answer is at most 1 bit — so ~11 well-chosen questions plus 1 final guess fit the budget, *if* each question splits the remaining candidates in half. Most don't: *"does it have a backbone?"* sounds decisive but the model calls a great many creatures vertebrates. A good question splits the *remaining* candidates roughly in half, given everything you have already learned — so the right next question depends on the answers so far.

### Baseline: random guessing (the floor)

Ignores `ask()` entirely. Just guesses random animals until the budget runs out. Expected score: ~0 (15 random guesses out of ~1,400 candidates ≈ 1% solve rate). Any reasonable solution needs to beat this by a lot.

### Reference: a non-adaptive 20-questions sketch

This reference shows the *shape* of a real solution without giving away the points. In `__init__` it precomputes, with its own copy of the model, the oracle's yes/no answer to a small **fixed** list of broad questions for every animal — a bit-vector per animal. In `solve` it asks those same fixed questions, reads off the oracle's bit-vector, and guesses the animals whose precomputed vector is closest.

It works, but it's deliberately weak: the questions are the **same for every row** (not chosen adaptively to split the *remaining* candidates), and it uses only a handful. Beating it is mostly about (1) precomputing the full `animal × question` table and (2) choosing each next question *greedily* to most evenly split the animals still consistent with the answers so far. That's your job in Step 4.

> Precomputing even this small table calls the model a few thousand times (~5-15 min on T4). Skip this cell if you just want to get to your own solution — it is only a reference.

### 💡 Speed tip

Building the animal×question table by calling `interactor.ask()` **one at a time** is slow.
You can make your precompute **much** faster — without changing any answers — by **batching**
your model calls (many prompts through the model per forward pass). That optimization is up to you.

## Step 4: Your solution

Replace the body of `MySolution.solve` (and `__init__` if you precompute anything) with your strategy. Iterate on `dev.csv` until you're happy with the score, then jump to Step 5 to evaluate on test1 + test2.

**The intended approach:**
1. In `__init__`, precompute once — with your own copy of the model — the oracle's yes/no answer for every `(animal, question)` pair you care about. This costs no oracle budget.
2. In `solve`, keep a set of candidate animals still consistent with the answers so far. At each step pick the **question whose answer most evenly splits that set** (maximize information gain), ask it, and shrink the set. Guess when one candidate dominates or the budget is nearly gone.
3. Be robust: the oracle occasionally answers in a way your table didn't predict. Don't let one surprising bit eliminate the true animal forever.

## Step 5: Final scoring

Once you're happy with your dev score, run this cell. It scores `dev` and `test1` (and `test2` automatically, if that file is present). The **FINAL** line — the *n*-weighted mean over the available test split(s) — is what you submit a screenshot of.

> The organizers also score your submitted `MySolution` on a separate **hidden** test set that is not included here. Aim for a strategy that deduces the animal from scratch each row, so it transfers to unseen creatures.
