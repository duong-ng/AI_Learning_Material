---
id: "ioai-2026-athome-task-1"
competition: "IOAI"
year: 2026
stage: "Scientific Round - At-Home"
title: "Neural Representation Learning on Disjoint Graph Topologies"
domain: "RL & Search"
difficulty: "Hard"
evaluation_metric: "Macro F1"
tags:
  - "ioai-2026"
  - "rl-&-search"
  - "macro f1"
dataset_links: []
starter_code_url: "https://github.com/IOAI-official/IOAI-2026/blob/main/At-Home-Round/Home-Task-1.ipynb"
source_url: "https://github.com/IOAI-official/IOAI-2026/tree/main/At-Home-Round"
crawled_at: "2026-09-18T14:50:05.280735"
version: 1
---
<a href="https://colab.research.google.com/github/IOAI-official/IOAI-2026/blob/main/At-Home-Round/Home-Task-1.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

# 🎧 Operation Night Watch: Teaching an Old Classifier New Sounds

Welcome! In this task you will take a **deployed audio event classifier** and teach it to recognize **13 brand-new sound classes** — *without* destroying what the model already knows.
## The story

Your company runs a network of low-power acoustic monitoring stations. The production model on these stations is an **Audio Spectrogram Transformer (AST)** that recognizes **16 everyday and wildlife sound classes**: dogs, roosters, thunderstorms, sea waves, even keyboard typing.

Two new customers just signed contracts:

- 🌲 **A national park** wants to detect **illegal logging and poaching activity**: axes, chainsaws, hand saws, generators, vehicle engines, helicopters, gunshots, fireworks, and crackling fires.
- 🦗 **An entomology institute** runs an acoustic insect survey and needs the model to distinguish **four singing insect species** by their calls: *Pterophylla camellifolia*, *Cicada orni*, *Gryllus campestris*, and *Tettigonia viridissima*.

That is **13 new classes**, and the upgraded model must keep serving the existing customers — so the 16 old classes must keep working too.

## Why can't we just retrain from scratch?

Your base model is built on Audio Spectrogram Transformer (AST). AST starts from large-scale ImageNet + AudioSet pre-training (millions of clips, GPU-weeks). Then the model was trained as a classifier for 16 base classes from `train.classes.csv`. Your budget is a **single GPU for up to 10 mins of training time**. The pre-trained model is a way to get strong audio features — treat it as a precious, irreplaceable artifact and build on top of it. Retraining the model from scratch on all data samples is too expensive.

## The rules

1. ✅ You **must start from the provided checkpoint** (`model/`) and reuse its encoder weights. You may add parameters (extra classifier rows, adapters, …) and fine-tune any subset of weights
2. ✅ Your final model must classify **all 29 classes** (16 old + 13 new) in a single forward pass
3. ❌ No training from scratch, and no other pre-trained audio models
4. ⏱️ Keep it lightweight: everything should run on a single GPU ~ 10 mins of training time

Your submission is scored as a **50/50 weighted average of accuracy on old classes and accuracy on new classes** (details in Section 4) — forgetting the old classes is exactly as costly as failing to learn the new ones.

# First things first: Set up Google Drive

# 0. Setup

What you have inside the ```/content/audioclassifier_data```:

| Artifact | Description |
|---|---|
| `model/` | Pre-trained AST checkpoint (16-class classifier) |
| `train.csv` | The retained subset of the *old* data — 16 classes, `train`/`val` splits |
| `fine_tune.csv` | The *new* data — 13 classes, `train`/`val` splits |
| `audio/` | All audio clips (5 s, mono, 16 kHz `.wav`) |


## 1. Meet the data

### The old world: 16 base classes

These are the classes the deployed model already recognizes. `train.csv` is the small retained subset — note how few training clips per class are left.


Let's actually *listen*. Audio tasks reward using your ears — a confusion that looks mysterious in a table is often obvious after ten seconds of listening. Below: one **validation**-split sample for each of the 16 base classes.

### The new world: 13 new classes

The park-protection classes are mostly **mechanical / impulsive** sounds; the insect-survey classes are **periodic, narrow-band calls** that differ between species in subtle ways. Note the **class imbalance**: e.g. *Crackling Fire* has only 24 training clips, the insects have 60 each.

## 3. Diagnostic tools: waveform & spectrogram

Here are some helpful diagnostic tools for working with audio:

- **Waveform** (amplitude vs. time) — reveals the *temporal envelope*: a gunshot is a single sharp transient, rain is a stationary wash, a cricket pulses rhythmically.
- **Log-mel spectrogram** (energy per mel-frequency band vs. time) — this is literally what the model sees. Insects concentrate energy in narrow high-frequency bands; engines sit in low-frequency harmonics; rain spreads energy everywhere.

Compare the four examples below — an impulse, an insect, a machine, and weather.


## 4. The model: Audio Spectrogram Transformer (AST)

The checkpoint in `model/` is an **Audio Spectrogram Transformer (AST)** ([Gong et al., *AST: Audio Spectrogram Transformer*, Interspeech 2021](https://arxiv.org/abs/2104.01778)). The key idea: **treat audio classification as image classification**.

![AST architecture](images/ast.png)

The pipeline:

1. The waveform is converted into a **128-band log-mel spectrogram** — a 2D "image" of shape `128 mel bins × 1024 time frames` (≈10 s, padded).
2. The spectrogram is cut into overlapping **16×16 patches**, each linearly projected to a 768-dim embedding (plus positional embeddings) — exactly like a Vision Transformer (ViT).
3. A stack of **12 Transformer encoder layers** lets every patch attend to every other patch — capturing both harmonic structure (across frequency) and temporal structure (across time).
4. The `[CLS]`-style tokens are pooled and a small **linear classification head** maps the 768-dim embedding to class logits.

Crucially, AST is initialized from **ImageNet-pre-trained ViT weights** and then pre-trained on **AudioSet** (~2M clips) before being fine-tuned for our 16 classes. That cascade of pre-training is what makes its features so strong — and what you cannot reproduce within this task's budget.

The architecture splits naturally into:
- the **encoder** (~86M parameters) — a general-purpose audio feature extractor, and
- the **head** - a tiny linear layer with 16 output rows

To support 29 classes you will need a head with 29 output rows. How you grow it — and how you fine-tune without forgetting — is the heart of this task.


## 5. Baseline model diagnostics: what does the pre-trained model do?

Before changing anything, **measure**. The helper below runs the model over a manifest and returns both predictions and **768-dim embeddings** (the pooled encoder output that feeds the head) — we'll need those for visualization.


### 5.1 - Confusion matrix on the old validation set

The model is doing a good job in classifying samples from old classes.


### 5.2 - Where do the *new* sounds go?

The pre-trained model has never heard a chainsaw — but it still has to answer with one of its 16 classes. Watching *where* each new class lands tells you which old classes it sounds similar to, i.e. **where confusions (and forgetting pressure) will appear during fine-tuning**.


## 6 - Evaluation metric

Your model will be evaluated on a held-out test set covering **all 29 classes** in a single 29-way classification. The score is a **50/50 weighted average** of accuracy on old and new classes:

$$\text{Score} \;=\; \tfrac{1}{2}\,\text{Acc}_{\text{old}} \;+\; \tfrac{1}{2}\,\text{Acc}_{\text{new}}$$

where $\text{Acc}_{\text{old}}$ is accuracy over test clips whose true label is one of the 16 old classes, and $\text{Acc}_{\text{new}}$ over clips from the 13 new classes.


## Finally! Your mission

Build a 29-class model that maximizes the score. A suggested path:

1. **Fine-tune carefully**: naive training on `fine_tune.csv` alone will torch the old classes within a few hundred steps — watch it happen at least once, it's instructive.
2. **Fight forgetting**: mix in old clips from `train.csv` (experience replay — what ratio?), try knowledge distillation against the frozen original model, freeze or LoRA-ify parts of the encoder, tune learning rates per module.
3. **Diagnose relentlessly**: per-class accuracy over training, confusion matrices (which old class absorbs which new one?), embeddings, and your ears. The class imbalance in the new data (24–60 train clips per class) and acoustically-similar pairs (crickets vs. *Gryllus campestris*? rain vs. crackling fire?) are where points hide.
4. **Validate on `val`** — the final evaluation uses a hidden test set with the same metric.

Good luck — and remember: a model that learns everything new but forgets everything old scores no better than the one you started with. 🦉
