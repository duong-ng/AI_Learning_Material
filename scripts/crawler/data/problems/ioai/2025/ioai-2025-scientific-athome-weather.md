---
id: "ioai-2025-scientific-athome-weather"
competition: "IOAI"
year: 2025
stage: "Scientific Round - At-Home"
title: "Weather: Spatio-Temporal Climate Forecasting & Multi-Station Prediction"
domain: "Tabular ML"
difficulty: "Hard"
evaluation_metric: "MSE"
tags:
  - "ioai-2025"
  - "at-home"
  - "tabular-ml"
  - "mse"
dataset_links: []
starter_code_url: "https://github.com/IOAI-official/IOAI-2025/tree/main/At-Home-Round/Weather"
source_url: "https://github.com/IOAI-official/IOAI-2025/tree/main/At-Home-Round/Weather"
crawled_at: "2026-09-18T14:49:55.755680"
version: 1
---
<img src="./figs/IOAI-Logo.png" alt="IOAI Logo" width="200" height="auto">

[IOAI 2025 (Beijing, China), At-Home Round](https://ioai-official.org/china-2025)

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/IOAI-official/IOAI-2025/blob/main/At-Home-Round/Weather/Weather.ipynb)

# Satellite Weather Forecasting

Please use Google Colab to verify your solution first. 
We are very sorry about the issue of submitting a solution. The reason is that due to the fact that mainland China cannot directly access huggingface.co, there are too many network obstacles between the Testing Server and huggingface.co as well as hf-mirror.com. We are currently identifying the issue, which may take some time.

The Google Colab link for this task is https://colab.research.google.com/drive/14tI_EARXubr6NNl7T_Ikhz0A5-Jhy2hZ?usp=sharing. The contestants can download the datasets and debug offline. However, it is strongly recommended that the contestants use Bohrium to be familiar with the contest platform. The on-site stage task will not provide the Google Colab links.

You're a high school student interning at a regional climate lab, working alongside a small team of scientists focused on improving rainfall prediction using only satellite imagery. Traditionally, rain is measured by radar and ground sensors — but these systems are costly and often unavailable in remote regions.

<img src="./figs/Weather Fig 1.png" width="400">

While analyzing GOES-16 satellite images, you come up with an idea:

> "What if we could train a model to detect rain directly from satellite images — even without ground-based data? And what if we used additional context like sun angle, time of day, and location to improve its accuracy?"

The scientists are intrigued. You're given access to a large archive of satellite data and precipitation masks — and one challenge: prove it can work. If successful, your approach could help small farmers in underserved regions plan irrigation more effectively and reduce crop losses.

Your mission: build a model that looks at the sky — and tells us whether it’s going to rain.


## Task

Your task is to develop an AI model that takes satellite imagery from the GOES-16 satellite as the input; and predicts — for each pixel — whether rainfall is occurring at the corresponding location on Earth. This is a **semantic segmentation** task: your model should output a binary mask indicating "rain" or "no rain" at each pixel.

You can train and evaluate your model using ground-truth precipitation data provided by the MRMS (Multi-Radar Multi-Sensor) dataset.

A baseline segmentation model based on a pretrained U-Net is provided to help you get started.

**You ARE allowed to:**
- Fine-tune or modify the baseline U-Net
- Use metadata (e.g., latitude, longitude, time, sun elevation)
- Modify the inference logic (e.g., thresholding, post-processing)

**You are NOT allowed to:**
- Use any external datasets
- Use external pretrained models other than the provided baseline
- Look for the weather-forecasting articles on the internet. While this is a home task, it is intended to prepare you for the on-site contest.

## Data

The dataset includes satellite observations from the year 2024 and includes the following:

- **GOES-16 ABI Multichannel Imagery**  
  16 spectral channels (C01–C16), covering a range of wavelengths:  
  - C01–C03: visible light  
  - C04–C06: near-infrared  
  - C07–C16: infrared  
  Images are cropped into patches of either 128×128 or 256×256 pixels.

- **Precipitation masks** from the MRMS system, providing binary labels (rain/no rain) per pixel.

- **Metadata**, including:  
  - Latitude and longitude of the patch's top-left corner  
  - Start and end time in UTC (capturing all 16 channels takes ~10 minutes)  
  - A Python utility to compute **sun elevation angle** based on time and location


### Train-Validation Split

- The **training set** is biased toward rainy scenes: only patches where at least 3% of pixels contain rain are included.
  
- The **validation set** is designed to reflect real-world conditions: many patches contain little or no rainfall. Additionally, some samples may include transmission issues — for example, certain spectral channels might be deliberately missing or corrupted.


## Evaluation

Your model will be evaluated on two metrics:

- **Mean Dice Score**:  
  Measures how well your predicted mask matches the ground truth, pixel-by-pixel. The Formula is 2 × |intersection| / (|prediction| + |ground_truth|).


- **Image-level Rain Accuracy**:  
  Measures whether your model correctly classifies if any rain is present in the image. This is because sometimes you do not need to segment every drop of rain — it is enough to simply know whether it will rain at all. Even a single accurate prediction can help protect an entire field of crops.

- **Final Score**:
  Final Score = (Mean Dice Score + Image-level Rain Accuracy) / 2.

## Copyright

All data used in this challenge is publicly available:

- **GOES-16 ABI** satellite data from NOAA and NESDIS  
- **MRMS** precipitation data from NOAA's National Severe Storms Laboratory (NSSL)


## Submission

Your notebook needs to generate a `submission.zip` file containing your predictions on the public testing set `pred_a.npz` and your predictions on the private testing set `pred_b.npz`. Each `.npz` file should contain `Y_pred_128` (shape $51 \times 128 \times 128$) and `Y_pred_256` (shape $183 \times 256 \times 256$), your boolean predictions for each testing set.

```python
# first generate pred_a.npz

model.eval()
model.to(DEVICE)

Y_pred_128 = []
with torch.no_grad():
    for i in tqdm(range(len(X_test[128]))):
        x = X_test[128][i]
        metadata = df[(df['size'] == 128) & (df['split'] == 'test') & (df['ind'] == i)] # sample metadata usage
        logits = model(x.unsqueeze(0).to(torch.float32).to(DEVICE))
        probs = torch.sigmoid(logits)
        preds = (probs > 0.5).float().squeeze(0)
        Y_pred_128.append(preds.cpu().detach().numpy())
Y_pred_128 = np.concatenate(Y_pred_128, axis=0)

print(Y_pred_128.shape)

Y_pred_256 = []
with torch.no_grad():
    for i in tqdm(range(len(X_test[256]))):
        x = X_test[256][i]
        metadata = df[(df['size'] == 256) & (df['split'] == 'test') & (df['ind'] == i)]
        logits = model(x.unsqueeze(0).to(torch.float32).to(DEVICE))
        probs = torch.sigmoid(logits)
        preds = (probs > 0.5).float().squeeze(0)
        Y_pred_256.append(preds.cpu().detach().numpy())
Y_pred_256 = np.concatenate(Y_pred_256, axis=0)

print(Y_pred_256.shape)

# You must name your prediction arrays `Y_pred_128` and `Y_pred_256`, and name the file `pred_a.npz` for the public leaderboard
np.savez('pred_a.npz', Y_pred_128=Y_pred_128, Y_pred_256=Y_pred_256)
```

```
100%|██████████| 51/51 [00:00<00:00, 53.08it/s]
(51, 128, 128)
100%|██████████| 183/183 [00:08<00:00, 21.31it/s]
(183, 256, 256)
```

```python
# Your notebook will gain access to the test dataset via the DATA_PATH environment variable after submission.
TEST_PATH = os.environ.get('DATA_PATH', "test")

test = np.load(Path(TEST_PATH) / "X_test.npz") # Read test data from X_test.npz under the provided path

X_test = {
    128: torch.from_numpy(test['X_test_128']),
    256: torch.from_numpy(test['X_test_256']),
} # only X_test will be provided

df_test = pd.read_csv(Path(TEST_PATH) / "metadata_test.csv") # Read metadata from metadata_test.csv under the provided path
```

```python
Y_pred_128 = []
with torch.no_grad():
    for i in tqdm(range(len(X_test[128]))):
        x = X_test[128][i]
        metadata = df_test[(df_test['size'] == 128) & (df_test['ind'] == i)] # sample metadata usage
        logits = model(x.unsqueeze(0).to(torch.float32).to(DEVICE))
        probs = torch.sigmoid(logits)
        preds = (probs > 0.5).float().squeeze(0)
        Y_pred_128.append(preds.cpu().detach().numpy())
Y_pred_128 = np.concatenate(Y_pred_128, axis=0)

print(Y_pred_128.shape)

Y_pred_256 = []
with torch.no_grad():
    for i in tqdm(range(len(X_test[256]))):
        x = X_test[256][i]
        metadata = df_test[(df_test['size'] == 256) & (df_test['ind'] == i)]
        logits = model(x.unsqueeze(0).to(torch.float32).to(DEVICE))
        probs = torch.sigmoid(logits)
        preds = (probs > 0.5).float().squeeze(0)
        Y_pred_256.append(preds.cpu().detach().numpy())
Y_pred_256 = np.concatenate(Y_pred_256, axis=0)

print(Y_pred_256.shape)

# You must name your prediction arrays `Y_pred_128` and `Y_pred_256`, and name the file `pred_b.npz` for private leaderboard
np.savez('pred_b.npz', Y_pred_128=Y_pred_128, Y_pred_256=Y_pred_256)
```
```
100%|██████████| 51/51 [00:00<00:00, 58.14it/s]
(51, 128, 128)
100%|██████████| 183/183 [00:08<00:00, 22.31it/s]
(183, 256, 256)
```

```python
# zip `pred_a.npz` and `pred_b.npz` into `submission.zip`
with zipfile.ZipFile('submission.zip', 'w') as zipf:
    zipf.write('pred_a.npz')
    zipf.write('pred_b.npz')
```


## Imports

## Data Utility Functions

## Model Utility Functions

## Let's load the data and take a look on it

## Load model

## This is how you can run training

## Evaluate model

Note: you can use a separate model for the image-level (rain/no-rain) classification.

Here, we've provided you with a baseline: just utilize segmentation results for it.


## 💡 Which channels could help with rain detection?

- C07, C13–C15 → Show cloud-top temperature — cold tops often mean strong storms

- C08–C10 → Show how much water vapor is in the air

- C04, C05, C06 → Help differentiate cloud types (ice vs. water)

- C11 → Good for identifying cloud phase and dusty conditions

- C16 → Useful for estimating cloud height (important for tall rain clouds)

| Channel | Type       | Wavelength | What it sees / Why it matters                 |
| ------- | ---------- | ---------- | --------------------------------------------- |
| **C01** | Visible    | 0.47 μm    | Blue light: detects smoke, haze, small clouds |
| **C02** | Visible    | 0.64 μm    | Red light: useful for detailed cloud edges    |
| **C03** | Near-IR    | 0.86 μm    | Vegetation, cloud phase, land/water contrast  |
| **C04** | Near-IR    | 1.38 μm    | Thin high clouds (cirrus), upper atmosphere   |
| **C05** | Near-IR    | 1.61 μm    | Snow vs. cloud detection                      |
| **C06** | Near-IR    | 2.25 μm    | Cloud particle size and ice content           |
| **C07** | Infrared   | 3.90 μm    | Fog at night, surface heat                    |
| **C08** | IR (WV)    | 6.19 μm    | Upper-level water vapor                       |
| **C09** | IR (WV)    | 6.95 μm    | Mid-level water vapor                         |
| **C10** | IR (WV)    | 7.34 μm    | Lower-level water vapor                       |
| **C11** | Infrared   | 8.50 μm    | Cloud phase, volcanic ash, dust               |
| **C12** | Infrared   | 9.61 μm    | Ozone detection                               |
| **C13** | IR (Clean) | 10.3 μm    | Clean infrared: cloud tops, clear air         |
| **C14** | Infrared   | 11.2 μm    | Standard IR for cloud-top temperature         |
| **C15** | Infrared   | 12.3 μm    | Dirty window: deeper clouds & water vapor     |
| **C16** | IR (CO₂)   | 13.3 μm    | CO₂ band: used for estimating cloud height    |


## Submission

Your notebook needs to generate a `submission.zip` file containing your predictions on the public testing set `pred_a.npz` and your predictions on the private testing set `pred_b.npz`. Each `.npz` file should contain `Y_pred_128` (shape $51\times128\times128$) and `Y_pred_256` (shape $183\times256\times256$), your boolean predictions for each testing set.
