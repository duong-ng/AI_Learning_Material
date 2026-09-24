---
id: "polish-oai-2025-stage2-source-extraction"
competition: "Polish-OAI"
year: 2025
stage: "Stage 2 - Regional Finals"
title: "Source Extraction: Aligning Queries and Document Embeddings with GPT-2"
domain: "NLP"
difficulty: "Olympiad Final"
evaluation_metric: "Accuracy"
tags:
  - "nlp"
  - "information-retrieval"
  - "embeddings"
  - "gpt2"
  - "polish-oai"
dataset_links: []
starter_code_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/blob/main/2_etap/ekstrakcja_zrodel/ekstrakcja_zrodel.ipynb"
solution_notebook_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/tree/main/2_etap/ekstrakcja_zrodel"
source_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI"
crawled_at: "2026-09-18T14:50:21.918355"
version: 1
---
# Ekstrakcja Źródeł

<img src="https://live.staticflickr.com/65535/54443002259_4a8e1249dd_b.jpg" alt="Embedded Photo" width="500">

*Obraz wygenerowany za pomocą ChatGPT.*

## Wstęp

Modele językowe bywają skłonne do mówienia nieprawdy lub półprawdy, a także zmyślania faktów bez podawania źródeł. Obecnie coraz częściej używane są systemy, które zamiast odpowiadać na pytania bezpośrednio, wpierw przeszukują bazę danych, np. zbiór dokumentów, i dopiero na podstawie najlepiej pasujących dokumentów generują odpowiedź. Taka odpowiedź ma większe szanse być oparta na rzeczywistości i może być zweryfikowana przez człowieka -- o ile poprawnie odnalezione zostały właściwe źródła.

Oczywiście, źródeł może być bardzo dużo, więc metody przeszukiwania muszą być efektywne -- przetworzenie wszystkiego "na raz" bezpośrednio modelem językowym nie wchodzi w grę! W tym zadaniu skupisz się na znajdowaniu najlepszych źródeł dla zadanego zdania, korzystając z metody **embeddingów** (pl. zanurzeń wektorów).

Wyobraź sobie, że jesteś inżynierem AI w firmie opracowującej narzędzie do weryfikacji faktów naukowych. Twoim zadaniem jest stworzenie modułu, który potrafi szybko i skutecznie odnajdywać wiarygodne publikacje naukowe potwierdzające lub obalające konkretne stwierdzenia. Dzięki Twojemu rozwiązaniu, naukowcy, dziennikarze i decydenci będą mogli weryfikować informacje w oparciu o solidne podstawy naukowe, co jest szczególnie istotne w dobie dezinformacji.


## Zadanie

Twoim zadaniem jest opracowanie systemu, który generuje wysokiej jakości wektorowe reprezentacje (embeddingi) zarówno dla zapytań, jak i dokumentów źródłowych, umożliwiające precyzyjne dopasowanie właściwych źródeł do zapytań.

Mając do dyspozycji **queries** (pl. zbiór zapytań; zapytania na które szukamy źródeł) oraz **corpus** (pl. baza dokumentów/źródeł; zbiór rozważanych dokumentów), musisz zaimplementować funkcje, które przypisują zapytaniom oraz źródłom wektory liczb rzeczywistych o wymiarze $768$. Te wektory będą użyte do znalezienia źródeł dla każdego zapytania przez dostarczoną przez nas funkcję ewaluacyjną, która dla danego zapytania, ze zbioru dokumentów wybiera $k=10$ najbliższych sąsiadów (ang. $k$-Nearest Neighbours).

W rozwiązaniu możesz skorzystać z dostarczonego modelu bazującego na architekturze GPT2, który został specjalnie dotrenowany, aby był pomocny w otrzymywaniu dobrej jakości embeddingów.

W trakcie pracy nad rozwiązaniem będziesz mógł testować jego skuteczność na zbiorze walidacyjnym, który pozwoli Ci ocenić jakość generowanych embeddingów w kontekście zadania wyszukiwania właściwych dokumentów źródłowych.

### Dane

Dostępne dla Ciebie w tym zadaniu dane to:

- Zbiór zapytań (queries), dla których należy znaleźć odpowiednie źródła
- Korpus dokumentów (corpus), zawierający publikacje naukowe, które mogą być źródłami dla zapytań
- Informacje o dopasowaniu zapytań do dokumentów w zbiorze walidacyjnym

Twoje rozwiązanie będzie oceniane na benchmarku *SciFact*. Służy on do oceny systemów wyszukiwania i weryfikacji faktów w kontekście naukowym. Składa się z zestawu stwierdzeń (ang. queries) opartych na rzeczywistych publikacjach naukowych, a baza dokumentów (ang. corpus) to publikacje z zakresu nauk przyrodniczych i medycznych. Do każdego stwierdzenia istnieje co najmniej jedna publikacja, która je popiera lub obala. Dostarczamy kod służący do ładowania danych, więc dane opisujemy tu wyłącznie informacyjnie.


**Plik `corpus.jsonl`** zawiera unikalne identyfikatory, tytuły i streszczenia prac naukowych

Przykład pojedynczego dokumentu:
```
{
    "text_id": 13734012,
    "title": "Prevalent abnormal prion protein in human appendixes after bovine spongiform encephalopathy epizootic: large scale survey",
    "text": "OBJECTIVES To carry out a further survey (...) CONCLUSIONS This study corroborates previous studies and suggests a high prevalence of infection with abnormal PrP, indicating vCJD carrier status in the population compared with the 177 vCJD cases to date. These findings have important implications for the management of blood and blood products and for the handling of surgical instruments."
}
```

**Plik `queries_val.jsonl`** zawiera treści stwierdzeń oraz identyfikator pasującego tekstu źródłowego. Zbiór testowy, na których finalnie będzie oceniane Twoje rozwiązanie **nie będzie zawierał** identyfikatorów pasujących tekstów źródłowych.

Przykład pojedynczego zapytania:
```
{
    "query": "1 in 5 million in UK have abnormal PrP positivity.",
    "matching_text_id": 13734012
}
```

### Kryterium Oceny
Zaimplementowane przez Ciebie metody (funkcje) `Embedder.encode_queries` oraz `Embedder.encode_corpus` zostaną wykorzystane aby przetworzyć odpowiednio zapytania $q \in Q$ a także dokumenty $d \in C$ na wektory. W dalszej części będziemy wymiennie używać $q$ i $d$ zarówno w kontekście tekstów jak i ich embeddingów.

Załóżmy, że zapytaniu $q\in Q$ odpowiada złoty dokument $d\in C$.
Kod ewaluacyjny sortuje wszystkie dokumenty według odległości od $q$, otrzymując dokumenty $K_1, K_2, ..., K_n$, tak że $K_1$ jest najbliżej. Następnie oznaczamy jako $I$, indeks złotego dokumentu $d$ w tym ciągu. To znaczy, że $I - 1$ jest liczbą dokumentów, których odległość od $q$ jest mniejsza, niż odległość $q$ od $d$.

Odległość między wektorami liczymy za pomocą podobieństwa cosinusowego (ang. cosine similarity), które dla wektorów $v, w \in \mathbb{R}^n$ jest określone jako $\frac{v^Tw}{||v|| \cdot ||w||}$, gdzie $||v||$ to długość wektora $v$.

Wynik dla zapytania $q$ określamy jako  

$$\text{nDCG@10}(q) = \begin{cases}
\frac{1}{\log_2(I + 1)} & \text{jeśli $I \leq 10$} \\
0 & \text{w przeciwnym wypadku.}
\end{cases}$$

Czyli, im bliżej złoty dokument został umieszczony zapytania względem innych dokumentów, tym wyższy wynik -- jeśli 10 "złych" dokumentów jest bliżej zapytania to wynik za ten przykład to 0.

Ostatecznie ocena Twojego rozwiązania będzie opierać się na metryce **nDCG@10**, obliczanej jako średnia wartość tej metryki dla wszystkich zapytań $(q \in Q )$.

- Jeśli wynik **nDCG@10** będzie **niższy niż 0.2**, otrzymasz **0 punktów**.  
- Jeśli wynik **przekroczy 0.5**, otrzymasz **maksymalną liczbę punktów**, czyli **100**.  

Punktacja dla wartości pomiędzy tymi progami będzie naliczana proporcjonalnie.


## Ograniczenia

- Twoje rozwiazanie będzie testowane na Platformie Konkursowej bez dostępu do internetu oraz w środowisku z GPU.
- Ewaluacja Twojego finalnego rozwiązania na Platformie Konkursowej nie może trwać dłużej niż 10 minut z GPU.
- Embedding każdego zapytania oraz tekstu powinien mieć wymiar 768
- Lista dopuszczalnych bibliotek: `torch`, `pandas`, `numpy`, `nltk`, `transformers`.

## Pliki Zgłoszeniowe

Należy przesłać tylko ten notebook uzupełniony o Twoje rozwiązanie (patrz klasa `Embedder`).

## Wskazówki

- Model GPT2 jest modelem językowym typu dekoder. Modele typu dekoder działają tak, że dla danego ciągu tokenów (np. prefiksu przetwarzanego zdania) $t_1, t_2, \dots, t_n$ wyliczają ukryty wektor $h_{n+1} \in \mathbb{R}^d$, a następnie transformują go jedną ze swoich macierzy z wagami na $p_{n+1} \in \mathbb{R}^m$ -- rozkład prawdopodobieństwa na tokenach w słowniku.
- W porównaniu z dostępnym czasem wykonania, dokumentów jest wiele.

## Ewaluacja

Podczas sprawdzania flaga `FINAL_EVALUATION_MODE` zostanie ustawiona na `True`.

Za to zadanie możesz zdobyć pomiędzy 0 a 100 punktów. Liczba punktów, którą zdobędziesz, będzie wyliczona na (tajnym) zbiorze testowym na Platformie Konkursowej na podstawie wyżej wspomnianego wzoru, zaokrąglona do liczby całkowitej. Jeśli Twoje rozwiązanie nie będzie spełniało powyższych kryteriów lub nie będzie wykonywać się prawidłowo, otrzymasz za zadanie 0 punktów.

# Kod Startowy

W tej sekcji inicjalizujemy środowisko poprzez zaimportowanie potrzebnych bibliotek i funkcji. Przygotowany kod tokenizatora, ładowania danych i ewaluacji ulatwi Ci operowanie na danych i pozwoli rozwiązać zadanie.

## Ładowanie Danych
W tej części zadania załadujemy dane treningowe.

## Kod z Kryterium Oceniającym

Kod, zbliżony do poniższego, będzie używany do oceny rozwiązania na zbiorze testowym.

### Przeszukiwanie
Poniżej jest kod, który służy do wybierania dla danego zapytania $top\_k$ najlepszych dokumentów z korpusu.

# Twoje Rozwiązanie
W tej sekcji należy umieścić Twoje rozwiązanie. Wprowadzaj zmiany wyłącznie tutaj!

# Ewaluacja

Uruchomienie poniższej komórki pozwoli sprawdzić, ile punktów zdobyłoby Twoje rozwiązanie na danych walidacyjnych. Przed wysłaniem upewnij się, że cały notebook wykonuje się od początku do końca bez błędów i bez konieczności ingerencji użytkownika po wybraniu opcji "Run All".

Podczas sprawdzania model zostanie zapisany jako `your_model.pkl` i oceniony na zbiorze testowym.

---

## Editorial & Solutions

Full benchmark notebooks and model solutions published by the Polish AI Olympiad committee.
