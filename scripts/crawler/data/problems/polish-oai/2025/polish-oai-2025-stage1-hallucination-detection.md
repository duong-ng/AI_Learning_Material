---
id: "polish-oai-2025-stage1-hallucination-detection"
competition: "Polish-OAI"
year: 2025
stage: "Stage 1 - Online Qualifier"
title: "Hallucination Detection in Large Language Model Generated Summaries"
domain: "NLP"
difficulty: "Hard"
evaluation_metric: "Macro F1"
tags:
  - "nlp"
  - "llm-evaluation"
  - "factuality"
  - "hallucination-detection"
  - "polish-oai"
dataset_links:
  - "https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.kde.html"
starter_code_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/blob/main/1_etap/2_wykrywanie_halucynacji/2_wykrywanie_halucynacji_modelowe_rozwiazanie.ipynb"
solution_notebook_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/tree/main/1_etap/2_wykrywanie_halucynacji"
source_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI"
crawled_at: "2026-09-18T14:50:19.624709"
version: 1
---
# Wykrywanie Halucynacji

<img src="https://live.staticflickr.com/65535/54208132682_73767c3560_b.jpg" alt="Embedded Photo" width="500">

*Obraz wygenerowany przy użyciu modelu DALL-E.*

## Wstęp

Modele językowe pomagają nam w codziennych zadaniach, takich jak poprawianie tekstów, pisanie kodu czy odpowiadanie na pytania. 
Są one również coraz częściej wykorzystywane w takich dziedzinach jak medycyna czy edukacja.

Jednak skąd możemy wiedzieć, czy wygenerowane przez nie odpowiedzi są poprawne? Modele językowe nie zawsze posiadają pełną wiedzę na zadany temat, a mimo to mogą formułować odpowiedzi, które brzmią wiarygodnie, lecz w rzeczywistości wprowadzają w błąd. Takie niepoprawne odpowiedzi nazywamy halucynacjami.

## Zadanie

W tym zadaniu zmierzysz się z wykrywaniem halucynacji w odpowiedziach na pytania faktograficzne generowane przez duże modele językowe (LLM).
Przeanalizujesz zbiór danych, który pomoże w ocenie, czy odpowiedzi generowane przez model językowy są faktycznie poprawne, czy zawierają halucynacje.

Każdy przykład w zbiorze danych zawiera:

- **Pytanie** np. "Jaka jest główna odpowiedzialność Departamentu Obrony USA?"
- **Odpowiedź modelu językowego** np. "Główną odpowiedzialnością jest obrona kraju."
- **Tokeny** związane z generacją odpowiedzi.
- **Cztery alternatywne odpowiedzi** wygenerowane z przez ten sam model z większą temperaturą.
- **Tokeny alternatywnych odpowiedzi** wygenerowane z przez ten sam model z większą temperaturą.
- **Prawdopodobieństwa alternatywnych odpowiedzi** wygenerowane z przez ten sam model z większą temperaturą.
- **Etykietę (`is_correct`)** wskazującą, czy główna odpowiedź jest poprawna według zaufanego źródła.


Przykład:
```json
[
    {
        "question_id": 34,
        "question": "What is the name of the low-cost carrier that operates as a wholly owned subsidiary of Singapore Airlines?",
        "answer": "Scoot is the low-cost carrier that operates as a wholly owned subsidiary of Singapore Airlines.",
        "tokens": [" Sco", "ot", " is", ..., " Airlines", ".", "\n"],
        "supporting_answers": [
            "As a wholly owned subsidiary of Singapore Airlines, <answer> Scoot </answer> stands as a low-cost carrier that revolutionized air travel in the region.",
            "Scoot, a subsidiary of <answer> Singapore Airlines </answer> , is the low-cost carrier that operates under the same brand.",
            "<answer> Scoot </answer> is the low-cost carrier that operates as a wholly owned subsidiary of Singapore Airlines.",
            "Singapore Airlines operates a low-cost subsidiary named <answer> Scoot </answer> , offering affordable and efficient air travel options to passengers."
        ],
        "supporting_tokens": [
            [" As", " a", ..., ".", "<answer>"],
            [" Sco", "ot", ..., " brand", ".", "\n"],
            ["<answer>", " Sco", ..., ".", "\n"],
            [" Singapore", " Airlines", ..., ".", "\n"]
        ],
        "supporting_probabilities": [
            [0.0029233775567263365, 0.8621460795402527, ..., 0.018515007570385933],
            [0.42073577642440796, 0.9999748468399048, ..., 0.9166142344474792],
            [0.3258324861526489, 0.9969879984855652, ..., 0.921079695224762],
            [0.11142394691705704, 0.960810661315918, ..., 0.9557166695594788]
        ],
        "is_correct": true
    },
    .
    .
    .
]
```

### Dane
Dane dostępne dla Ciebie w tym zadaniu to:

* `train.json` - zbiór danych zawierający 2967 pytań oraz odpowiedzi.
* `valid.json` - 990 dodatkowych pytań.


### Kryterium Oceny

ROC AUC (ang. *Receiver Operating Characteristic Area Under Curve*) to miara jakości klasyfikatora binarnego. Pokazuje zdolność modelu do odróżniania między dwiema klasami - tutaj halucynacją (false) i poprawną odpowiedzią (true). 

- **ROC (Receiver Operating Characteristic)**: Wykres pokazujący zależność między *True Positive Rate* (czułość) a *False Positive Rate* (1-specyficzność) przy różnych progach decyzyjnych.
- **AUC (Area Under Curve)**: Pole pod wykresem ROC, które przyjmuje wartości od 0 do 1:
  - **1.0**: Model perfekcyjny.
  - **0.5**: Model losowy (brak zdolności do odróżniania klas).

Im wyższa wartość AUC, tym lepiej model radzi sobie z klasyfikacją.

Za to zadanie możesz zdobyć pomiędzy 0 a 100 punktów. Wynik będzie skalowany liniowo w zależności od wartości ROC AUC:

- **ROC AUC ≤ 0.7**: 0 punktów.
- **ROC AUC ≥ 0.82**: 100 punktów.
- **Wartości pomiędzy 0.7 a 0.82**: skalowane liniowo.

Wzór na wynik:  
$$
\text{Punkty} = 
\begin{cases} 
0 & \text{dla } \text{ROC AUC} \leq 0.7 \\
100 \times \frac{\text{ROC AUC} - 0.7}{0.82 - 0.7} & \text{dla } 0.7 < \text{ROC AUC} < 0.82 \\
100 & \text{dla } \text{ROC AUC} \geq 0.82
\end{cases}
$$


## Ograniczenia
* Twoje rozwiazanie będzie testowane na Platformie Konkursowej bez dostępu do internetu oraz w środowisku bez GPU.
* Ewaluacja Twojego finalnego rozwiązania na Platformie Konkursowej nie może trwać dłużej niż 5 minut bez GPU.
* Lista dopuszczalnych bibliotek: `xgboost`, `scikit-learn`, `numpy`, `pandas`, `matplotlib`.


## Pliki Zgłoszeniowe
Ten notebook uzupełniony o Twoje rozwiązanie (patrz funkcja `predict_hallucinations`).

## Ewaluacja
Pamiętaj, że podczas sprawdzania flaga `FINAL_EVALUATION_MODE` zostanie ustawiona na `True`.

Za to zadanie możesz zdobyć pomiędzy 0 a 100 punktów. Liczba punktów, którą zdobędziesz, będzie wyliczona na (tajnym) zbiorze testowym na Platformie Konkursowej na podstawie wyżej wspomnianego wzoru, zaokrąglona do liczby całkowitej. Jeśli Twoje rozwiązanie nie będzie spełniało powyższych kryteriów lub nie będzie wykonywać się prawidłowo, otrzymasz za zadanie 0 punktów.


# Kod Startowy
W tej sekcji inicjalizujemy środowisko poprzez zaimportowanie potrzebnych bibliotek i funkcji. Przygotowany kod ułatwi Tobie efektywne operowanie na danych i budowanie właściwego rozwiązania.

## Ładowanie Danych
Za pomocą poniższego kodu dane zostaną wczytane i odpowiednio przygotowane.

# Modelowe Rozwiązanie

Poniższe rozwiązanie przechodzi przez cały proces uczenia maszynowego, od eksploracji danych po ewaluację modelu na zbiorze walidacyjnym.
Jako klasyfikator wykorzystano model XGBoost.
Do uzyskania dobrych wyników wymagane jest stworzenie odpowiednich cech, które pozwolą na wykrycie halucynacji w odpowiedziach modelu językowego.

Rozwiązanie zostało podzielone na poszczególne kroki:

* [1. Eksploracja danych](#1.-Eksploracja-danych)
  * [1.1 Podstawowe informacje](#11-Podstawowe-informacje)
  * [1.2 Dane statystyczne](#12-Dane-statystyczne)
  * [1.3 Walidacja danych](#13-Walidacja-danych)
  * [1.4 Czyszczenie danych](#14-Czyszczenie-danych)
* [2. Ekstrakcja cech](#2.-Ekstrakcja-cech)
  * [2.1 Cechy statystyczne](#2.1-Cechy-statystyczne)
  * [2.2 Cechy semantyczne](#2.2-Cechy-semantyczne)
  * [2.3 Spójność odpowiedzi alternatywnych](#23-soa)
  * [2.4 Styl i struktura odpowiedzi](#2.4-Styl-i-struktura-odpowiedzi)
  * [2.5 Typ pytania](#2.5-Typ-pytania)
  * [2.6 Analiza prawdopodobieństw odpowiedzi](#26-apo)
* [3. Agregacja cech](#3.-Agregacja-cech)
* [4. Klasa do trenowania modelu](#4.-Klasa-do-trenowania-modelu)
* [5. Klasa do ewaluacji modelu](#5.-Klasa-do-ewaluacji-modelu)
* [6. Demo - cykl uczenia maszynowego](#6.-Demo---cykl-uczenia-maszynowego)
  * [6.1 Wytrenowanie modelu](#6.1-Wytrenowanie-modelu)
  * [6.2 Ewaluacja modelu na zbiorze walidacyjnym](#6.2-Ewaluacja-modelu-na-zbiorze-walidacyjnym)
* [7. (Opcjonalne) Ocena podzbiorów cech](#7-opc)
  * [7.1 Modele z pojedynczymi zestawami cech](#71-modele-z-pojedynczymi-zestawami-cech)
  * [7.2 Modele z wykluczeniem pojedynczych zestawów cech](#72-mzwpzc)
  * [7.3 Model na wszystkich cechach](#73-model-na-wszystkich-cechach)
  * [7.4 Model bazowy (losowy klasyfikator)](#74-model-bazowy-losowy-klasyfikator)
  * [7.5 Porównanie wyników](#75-pw)
  * [7.6 Analiza ważności cech](#76-awc)

## 1. Eksploracja danych

Podstawową częścią każdego projektu jest eksploracja danych.
Jej celem jest zrozumienie struktury danych, ich zawartości oraz potencjalnych problemów, które mogą wystąpić podczas analizy.
W tej sekcji przeanalizujemy dane, aby zrozumieć ich strukturę i zawartość, oraz w przypadku problemów, które mogą wystąpić podczas analizy, spróbujemy je naprawić.

### 1.1 Podstawowe informacje

Zaczynamy od podstawowej analizy typowej dla eksploracji danych każdego zbioru danych (liczba próbek, liczba cech, typy cech, brakujące wartości, obejrzenie losowych próbek).

### 1.2 Dane statystyczne

Sprawdzamy ogólne statystyki zbioru danych odnośnie długości odpowiedzi, liczby tokenów oraz liczby alternatywnych odpowiedzi.

Wykorzystujemy do tego takie statystyki jak:
- średnia, mediana, odchylenie standardowe, minimum i maksimum długości odpowiedzi głównej
- średnia, mediana, odchylenie standardowe, minimum i maksimum długości odpowiedzi alternatywnych
- wykresy [KDE](https://pandas.pydata.org/docs/reference/api/pandas.DataFrame.plot.kde.html) (estymujące i wygładzające dystrybucje) dla długości odpowiedzi głównej, alternatywnych oraz liczby tokenów w odpowiedziach głównych i alternatywnych
- histogram i wykres KDE dla rozkładu prawdopodobieństw odpowiedzi alternatywnych
- rozkład zmiennej docelowej (cechy `is_correct`)

Z informacji statystycznych można zauważyć, że dane ze zbioru treningowego mają bardzo zbliżone wartości do wartości ze zbioru walidacyjnego. Pod względem statystycznym są one do siebie bardzo podobne co jest porządane do trenowania modelu uczenia maszynowego (chcemy, aby dane walidacyjne pochodziły z tej samej dystrybucji co dane treningowe).

Rozkłady zmiennej docelowej są bardzo zbliżone dla siebie dla zbioru treningowego i testowego, co jest dobrą wiadomością, ponieważ chcemy, aby oba zbiory pochodziły z tej samej dystrybucji.

Natomiast, etykiety są zdecydowanie niezbilansowane, ponieważ mamy dwa razy więcej przykładów z etykietą `False` niż `True`. Musimy mieć to na uwadze podczas trenowania modelu, ponieważ może to wpłynąć na jego wydajność. Możemy to zrównoważyć w późniejszych krokach, np. ważenie klas.

### 1.3 Walidacja danych

W tej sekcji sprawdzamy czystość danych, aby upewnić się, że nie zawierają one błędów, które mogą wpłynąć na wyniki analizy.

- **Sprawdzanie poprawności składniowej odpowiedzi:**
  - Każda odpowiedź alternatywna powinna zawierać dokładnie jeden otwierający znacznik `<answer>` i jeden zamykający `</answer>`. W przypadku odchyleń, określamy, ile rekordów posiada niepoprawną liczbę znaczników.
  
- **Sprawdzanie zawartości odpowiedzi:**
  - Upewniamy się, że wewnątrz tagów `<answer>` i `</answer>` znajduje się tekst. Jeśli znajdą się odpowiedzi puste, określamy liczbę takich przypadków.
  
- **Analiza rekordów odstających:**
  - Wyświetlamy kilka rekordów danych, które zawierają nietypowe wartości, np. bardzo długie odpowiedzi.

- **Sprawdzanie poprawności odpowiedzi alternatywnych i tokenów:**
  - Sprawdzamy, czy za pomocą tokenów można odtworzyć odpowiedzi alternatywne. Jeśli nie, określamy liczbę takich przypadków i wyświetlamy kilka przykładów.

Pomimo, że odpowiedzi są bardzo długie, nie są one odstające. W przypadku długich odpowiedzi, model językowy może odbiegać od tematu, co może prowadzić do halucynacji, dlatego warto wziąć takie przykłady pod uwagę podczas analizy danych.

Przeglądając również dokładnie dane treningowego zauważamy, że niektóre odpowiedzi alternatywne zawierają dodatkowe tokeny w liście tokenów alternatywnych, które nie są częścią odpowiedzi alternatywnej. W takich przypadkach tokeny alternatywne są niepoprawne, ponieważ nie można ich użyć do odtworzenia odpowiedzi alternatywnej. 

Przykład tego problemu pokazany jest dla `question_id` 82, gdzie jedna z odpowiedzi alternatywnych zawiera dodatkowe tokeny, które nie są częścią odpowiedzi alternatywnej. Głębiej analizując ten problem zauważamy, że istnieje on, gdy w środku listy z tokenami alternatywnymi istnieje znak `'\n\n'`. Widzimy, że po znaku `'\n\n'` są nieporządane tokeny, które zaburzają nasze dane dla `supporting_tokens` i `supporting_probabilities`.

```json
{
    "question_id": 82,
    "question": "What are the reservoirs of low speed current flow in canals commonly referred to as?",
    "answer": "The answer is Canals .",
    "tokens": [" The", " answer", " is", " Can", "als", ".", "\n"],
    "supporting_answers": [
        ...,
        "Waterways with low water speed are commonly referred to as <answer> slow-speed streams </answer> .",
        ...
    ],
    "supporting_tokens": [
        ...,
        [" Water", "ways", " with", " low", " water", " speed", " are", " commonly", " referred", " to", " as", "<answer>", " slow", "-", "speed", " streams", "</answer>", ".", "\n\n", "<answer>", "Question", ":", " In", " which", " country", " is", " the", " capital", " city", " of", " Tehran", "?", "<answer>", "<answer>", "Answer", ":", " In", "<answer>", " Iran", "</answer>", ",", " the", " capital", " city", " is", " Tehran", ".", "<answer>", "<answer>", "Question", ":", " In", " which", " state", " of", " India", " is", " the", " Taj", " Mahal", " located", "?", "<answer>", "<answer>", "Answer", ":", " The", " Taj", " Mahal", ",", " a", " magnificent", " monument", " of", " love", ",", " is", " situated", " in", "<answer>", " Uttar", " Pradesh", "</answer>", ",", " a", " state", " in", " northern", " India", ".", "<answer>", "<answer>", "Question", ":", " Who", " is", " the", " god", " of", " light"],
        ...
    ],
    ...
}
```

W tej sekcji diagnozujemy ten problem w celu poprawienia jakości danych.


Liczba prawdopodobieństw dla odpowiedzi alternatywnych jest również niepoprawna, czyli razem z usuwaniem błędnych tokenów, będziemy musieli również usunąć błędne prawdopodobieństwa.

### 1.4 Czyszczenie danych

W tej sekcji naprawiamy błędy w danych, które wykryliśmy w poprzedniej sekcji.

## 2. Ekstrakcja cech

W ramach ekstrakcji cech zastosowano podejście oparte na analizie odpowiedzi modelu językowego.
Zamieniamy odpowiedzi na numeryczne cechy, które zawierają informacje odnośnie halucynacji i mogą być wykorzystane do trenowania naszego klasyfikatora XGBoost.

Poszczególne typy cech zostały wyeksportowane:
* [2.1 Cechy statystyczne](#2.1-Cechy-statystyczne)
* [2.2 Cechy semantyczne](#2.2-Cechy-semantyczne)
* [2.3 Spójność odpowiedzi alternatywnych](#23-soa)
* [2.4 Styl i struktura odpowiedzi](#2.4-Styl-i-struktura-odpowiedzi)
* [2.5 Typ pytania](#2.5-Typ-pytania)
* [2.6 Analiza prawdopodobieństw odpowiedzi](#26-apo)


**Disclaimer** - ekstrakcja cech to proces, który jest zarówno czasochłonny, jak i kreatywny. Podczas tego procesu **nie ma jednej, uniwersalnej "poprawnej" odpowiedzi**. W zależności od kontekstu i założeń modelu, różni specjaliści mogą wybrać różne cechy, które uznają za najistotniejsze dla rozwiązywanego problemu. Dlatego wyniki uzyskane przez różnych ekspertów w tej samej dziedzinie mogą się różnić, a różne podejścia mogą prowadzić do równie dobrych rezultatów.

<p align="center">
  <img src="https://miro.medium.com/v2/resize:fit:742/0*eySmc2fSF96yXIW0.png" alt="Feature eng" width="300">
</p>

Warto pamiętać, że proces ekstrakcji cech jest dynamiczny, zależy od danych, algorytmu oraz celu modelu. Często wymaga iteracyjnego dostosowywania i testowania różnych kombinacji cech w celu znalezienia najlepszej reprezentacji danych, która pozwoli uzyskać jak najdokładniejsze wyniki.



### 2.1 Cechy statystyczne

Definiujemy klasę `StatisticalFeatureExtractor`, której zadaniem jest wyliczanie różnych statystycznych cech na podstawie prawdopodobieństw tokenów uzyskanych dla odpowiedzi wspierających. 

Kod oblicza:
- **Minimum Token Probability (`mtp`)** – najmniejsze prawdopodobieństwo przypisane któremuś tokenowi, co może wskazywać na niepewność modelu.
- **Average Token Probability (`avgtp`)** – średnie prawdopodobieństwo wszystkich tokenów, reprezentujące ogólną pewność modelu.
- **Maximum Probability Deviation (`mpd`)** – różnica między najwyższym a najniższym prawdopodobieństwem, mierząca zmienność w pewności modelu.
<!-- - **Minimum Probability Spread (`mps`)** – minimalna rozpiętość prawdopodobieństw, najmniejsza różnica między najwyższym a najniższym prawdopodobieństwem, mierząca zmienność w pewności modelu. -->
- **Generalized Negative Log-Likelihood (`g_nll`)** – uśredniona wartość ujemnego logarytmu prawdopodobieństwa, pozwalająca ocenić ogólną wiarygodność odpowiedzi.
- **Variance of Token Probabilities (`var_prob`)** – wariancja prawdopodobieństw, która pokazuje rozrzut wartości i potencjalne niespójności.

Te cechy są obliczane zarówno dla całej odpowiedzi, jak i dla tokenów znajdujących się wewnątrz znaczników `<answer>...</answer>`, które są kluczowymi frazami dla spójności odpowiedzi.

Przykładowe statystyczne atrybuty wygenerowane dla pojedynczej próbki danych (4 odpowiedzi alternatywne):

### 2.2 Cechy semantyczne

Definiujemy klasę `SemanticFeatureExtractor`, której zadaniem jest związków semantycznych między pytaniem, główną odpowiedzią i alternatywnymi odpowiedziami. Jej celem jest wykrycie potencjalnych niespójności i ocenienie jakości generowanych odpowiedzi za pomocą technik przetwarzania języka naturalnego.  

Kluczowe wyodrębnione cechy to:
1. **Bag-of-Words Overlap (`bow_unique_ratio`)**  
   - Oblicza stosunek unikalnych słów w `<answer>` do całkowitej liczby słów w alternatywnych odpowiedziach.  
   - Wysoka wartość oznacza większą różnorodność słownictwa ([lexical diversity](https://en.wikipedia.org/wiki/Lexical_diversity)).  

2. **TF-IDF Average (`tfidf_avg`)**  
   - Mierzy średnią wartość `TF-IDF` ([Term Frequency-Inverse Document Frequency](https://pl.wikipedia.org/wiki/TFIDF)) dla odpowiedzi wspierających.  
   - Ocenia ważność słów w kontekście całego zbioru danych.  

3. **Question-Answer Cosine Similarity (`qa_cosine_similarity`)**  
   - Mierzy podobieństwo semantyczne pytania i głównej odpowiedzi za pomocą podobieństwa cosinusów ([cosine similarity](https://en.wikipedia.org/wiki/Cosine_similarity)) wektorów `TF-IDF` policzonych dla pytania i odpowiedzi.

<h3 id="23-soa">2.3 Spójność odpowiedzi alternatywnych</h3>

Definiujemy klasę `CrossAnswerConsistencyExtractor`, której zadaniem jest ocena zgodności odpowiedzi alternatywnych z główną odpowiedzią.
Analizując zawartość pomiędzy tagami `<answer>...</answer>` w różnych odpowiedziach alternatywnych, identyfikuje wzorce, które mogą wskazywać na wiarygodność lub niepewność głównej odpowiedzi.

Kluczowe wyodrębnione cechy to:
- **Liczba unikalnych odpowiedzi (`num_unique_answers`)**: Liczy, ile różnych odpowiedzi występuje w odpowiedziach alternatywnych. Większa różnorodność może wskazywać na niepewność w odpowiedzi.
- **Liczba najczęstszej odpowiedzi (`most_common_answer_count`)**: Określa częstotliwość najczęściej powtarzanej odpowiedzi, odzwierciedlając zgodność odpowiedzi alternatywnych.
- **Wskaźnik zgody (`agreement_ratio`)**: Oblicza proporcję odpowiedzi alternatywnych, które zgadzają się z najczęściej powtarzaną odpowiedzią, podkreślając poziom konsensusu.

Te cechy pomagają określić, czy odpowiedzi alternatywne zbiegają się do jednej odpowiedzi, czy prezentują sprzeczne informacje, co jest kluczowe w wykrywaniu potencjalnych halucynacji.


### 2.4 Styl i struktura odpowiedzi

Definiujemy klasę `StyleFeatureExtractor`, której zadaniem jest analiza cech stylistycznych i strukturalnych odpowiedzi generowanych przez model językowy. Dzięki badaniu struktury zdań i podobieństw leksykalnych dostarcza informacji o spójności odpowiedzi alternatywnych z główną odpowiedzią.

Kluczowe wyodrębnione cechy to:  
1. **Zmienność długości zdań (`sentence_length_variance`)** – mierzy, jak bardzo różnią się długości zdań w głównej i odpowiedziach alternatywnych, co wskazuje na spójność stylistyczną.  
2. **Średnia długość zdania (`average_sentence_length`)** – oblicza średnią liczbę słów na zdanie, co odzwierciedla złożoność i rozwlekłość odpowiedzi.  
3. **Średnia długość najdłuższego wspólnego podciągu (`average_lcs`)** – określa średnią długość najdłuższego wspólnego podciągu między główną odpowiedzią a każdą z odpowiedzi wspierających, co pozwala ocenić ich podobieństwo leksykalne.  

Dzięki tym cechom można skutecznie ocenić stylistyczną spójność odpowiedzi, upewniając się, że wszystkie części wypowiedzi utrzymują jednolitą strukturę narracyjną.  


### 2.5 Typ pytania

Definiujemy klasę `QuestionTypeExtractor`, której zadaniem jest określenie typu pytania na podstawie jego początkowego słowa.
Tworzymy binarne cechy (one-hot) dla każdego z typu pytań - **Who (Kto), What (Co), Where (Gdzie), When (Kiedy), Why (Dlaczego), How (Jak) oraz Which (Który)**, które zawierają kontekst wpływający na odpowiedź.
Te cechy stanowią dodatkowe informacje odnośnie wrodzonego charakteru pytania, co zwiększa dokładność wykrywania halucynacji.

Kluczowe wyodrębnione cechy to:
- `is_who`: Czy pytanie dotyczy osoby?
- `is_what`: Czy pytanie prosi o definicję lub opis?
- `is_where`: Czy pytanie dotyczy miejsca?
- `is_when`: Czy pytanie odnosi się do czasu?
- `is_why`: Czy pytanie szuka przyczyny lub wyjaśnienia?
- `is_how`: Czy pytanie dotyczy procesu lub metody?
- `is_which`: Czy pytanie wymaga wyboru między opcjami?

Do identyfikacji pytania używamy [regexów](https://regexone.com/) do dopasowania pierwszego słowa pytania do wzorców odpowiadających różnym typom pytań.

Przykładowo `'^\s*who\b'` dopasowuje pytania zaczynające się od słowa "Who"z opcjonalnymi białymi znakami (spacja, tabulator) na początku zdania. 
`'\b'` oznacza granicę słowa, co oznacza, że dopasowanie musi być dokładne, a nie częściowe.
Dodatkowo, wykorzystujemy funkcję `re.IGNORECASE` do ignorowania wielkości liter.

<h3 id="26-apo">2.6 Analiza prawdopodobieństw odpowiedzi</h3>

Definiujemy klasę `AnswerProbabilityFeatureExtractor`, której zadaniem jest wyodrębnienie cech związanych z prawdopodobieństwem tokenów wewnątrz tagów `<answer>...</answer>` znajdujących się w każdej alternatywnej odpowiedzi. Jego celem jest **ilościowe określenie pewności modelu** co do treści odpowiedzi oraz ocena, jak spójnie generowane tokeny odpowiedzi alternatywnych pokrywają się z główną odpowiedzią. W szczególności wykonuje on następujące kroki:


**1. `find_answer_probability()`**  
Lokalizuje tokeny pomiędzy `<answer>` i `</answer>` dla pojedynczej alternatywnej odpowiedzi i oblicza **średnie prawdopodobieństwo** tych tokenów.  

**2. `generate_answer_probabilities()`**  
Stosuje powyższą funkcję do wszystkich wspierających odpowiedzi i dzieli wyniki na dwie grupy:  
- **Prawdopodobieństwa „Answer”** – gdy wyodrębniony tekst wewnątrz tagów `<answer>` znajduje się w głównej odpowiedzi, co sugeruje zgodnośc z główną odpowiedzią.  
- **Prawdopodobieństwa „Other”** – gdy wyodrębniony tekst nie pojawia się w głównej odpowiedzi, co może sugerować rozbieżność.  

**3. Agregacja statystyczna**  
Oblicza szereg **statystyk** dla każdej z dwóch grup prawdopodobieństw, w tym:  
- **Dla prawdopodobieństw „answer”**:  
  - Minimum (`answer_min`)  
  - Średnia (`answer_mean`)  
  - Maksimum (`answer_max`)  
  - Odchylenie standardowe (`answer_std`)  
  - Liczność (`answer_len`)  

- **Dla prawdopodobieństw „other”**:  
  - Minimum (`other_min`)  
  - Średnia (`other_mean`)  
  - Maksimum (`other_max`)  
  - Odchylenie standardowe (`other_std`)  
  - Liczność (`other_len`)  

**4. Statystyki dla każdej wspierającej odpowiedzi**  
Dodatkowo, dla każdej z **czterech** wspierających odpowiedzi, ekstraktor oblicza podsumowanie statystyczne (minimum, średnia, maksimum, odchylenie standardowe i długość tablicy prawdopodobieństw), zapisując je w postaci `supporting_proba_0_min`, `supporting_proba_0_mean`, ..., aż do `supporting_proba_3_*`.  

Te cechy pozwalają na ocenę nie tylko **pewności modelu** względem wygenerowanych fragmentów odpowiedzi, ale także stopnia ich **zgodności z główną odpowiedzią** oraz ogólnej zmienności prawdopodobieństw tokenów wśród wspierających odpowiedzi.


## 3. Agregacja cech

Po uzyskaniu cech z różnych kategorii dla pojedynczej próbki, łączymy je razem w jeden skonsolidowany słownik cech, aby móc wykorzystać je do trenowania modelu klasyfikacji XGBoost.

Celem klasy `FeatureAggregator` jest uproszczenie procesu ekstrakcji cech poprzez centralizację logiki wywoływania różnych ekstraktorów cech i łączenia wyników w jeden spójny zestaw cech. Dzięki temu kod staje się bardziej modularny i łatwiejszy do zarządzania.

## 4. Klasa do trenowania modelu

Do klasyfikacji używamy modelu [XGBoost](https://xgboost.readthedocs.io/en/stable/python/python_api.html#xgboost.XGBClassifier), który jest popularnym algorytmem uczenia maszynowego w konkursach Kaggle i w praktyce. XGBoost jest algorytmem gradient boostingowym, który łączy wiele słabych modeli w celu uzyskania silnego modelu predykcyjnego. Jest on wydajny, skalowalny i zapewnia dobre wyniki dla różnych problemów klasyfikacji i regresji.

Klasa `Trainer` pozwala na:
- Przeprowadzenia walidacji krzyżowej w celu optymalizacji hiperparametrów modelu [XGBoost](https://xgboost.readthedocs.io/en/stable/python/python_api.html#xgboost.XGBClassifier). 
- Wytrenowanie modelu [XGBoost](https://xgboost.readthedocs.io/en/stable/python/python_api.html#xgboost.XGBClassifier) na podanym zbiorze danych treningowych i wykorzystuje zbiór walidacyjny do wczesnego zatrzymywania (ang. early stopping) w celu uniknięcia przeuczenia modelu.

## 5. Klasa do ewaluacji modelu

Do pełnego cyklu uczenia maszynowego musimy również ocenić skuteczność naszego modelu na zbiorze nie widzianym podczas treningu. W tym celu wykorzystujemy zbiór walidacyjny, który pozwala na sprawdzenie, jak dobrze nasz model generalizuje przewidywanie etykiet na nowych danych.

Klasa `Evaluator` ocenia jakość zapisanego modelu XGBoost na podanym zbiorze danych. Używa modelu do prognozowania etykiet i oblicza miarę ROC AUC, która ocenia jakość klasyfikatora binarnego. Przed prognozowaniem, dane walidacyjne są przetwarzane tak samo jak dane treningowe, aby wyodrębnić cechy potrzebne do prognozowania.


## 6. Demo - Cykl uczenia maszynowego

Poniżej znajduje się przykładowy kod, który używa zaimplementowane klasy i demonstruje pełny cykl uczenia maszynowego, od ekstrakcji cech do ewaluacji modelu na zbiorze walidacyjnym. 

### 6.1 Wytrenowanie modelu

W pierwszej kolejności tworzymy instancję klasy `FeatureAggregator`, która pozwala na ekstrakcję cech z danych treningowych. Następnie przekazujemy te cechy do klasy `Trainer`, która trenuje model XGBoost i optymalizuje hiperparametry za pomocą walidacji krzyżowej. Po zakończeniu trenowania, zapisujemy wytrenowany model do pliku `xgb_model_all_features`.

### 6.2 Ewaluacja modelu na zbiorze walidacyjnym

W kolejnym kroku wczytujemy zapisany model i dane walidacyjne, a następnie używamy klasy `Evaluator` do oceny jakości modelu na zbiorze walidacyjnym. Ewaluacja obejmuje ekstrakcję cech, prognozowanie etykiet i obliczanie miary ROC AUC. Wynik jest wyświetlany na ekranie, co pozwala na ocenę skuteczności modelu w wykrywaniu halucynacji w odpowiedziach modelu językowego.

Model osiąga wynik ROC AUC na poziomie 0.82 na zbiorze walidacyjnym, więc przy podobnym wyniku na zbiorze testowym otrzymałby maksymalną liczbę punktów w zadaniu konkursowym.

<h2 id="7-opc">7. (Opcjonalne) Ocena podzbiorów cech</h2>

W przypadku, gdy nie chcemy używać wszystkich cech, możemy wybrać podzbiór cech, które uważamy za najbardziej istotne dla naszego modelu. 

W tej sekcji dokładnie analizujemy różne podzbiory cech za pomocą trenowania i ewaluacji modelów XGBoost z różnymi zestawami cech.

### 7.1 Modele z pojedynczymi zestawami cech

W tej sekcji oceniamy różne zestawy cech (zdefiniowane w [Sekcji 2](#2-ekstrakcja-cech)), aby sprawdzić, które z nich są najbardziej istotne dla naszego modelu.

Trenujemy następujące 5 modeli XGBoost:
- `ONLY_statistical`: Model trenowany wyłącznie na [cechach statystycznych](#2.1-cechy-statystyczne).
- `ONLY_semantic`: Model trenowany wyłącznie na [cechach semantycznych](#2.2-cechy-semantyczne).
- `ONLY_cross_answer_consistency`: Model trenowany wyłącznie na [cechach spójności odpowiedzi](#2.3-spójność-odpowiedzi-alternatywnych).
- `ONLY_style`: Model trenowany wyłącznie na [cechach stylistycznych](#2.4-styl-i-struktura-odpowiedzi).
- `ONLY_question_type`: Model trenowany wyłącznie na [cechach typu pytania](#2.5-typ-pytania).

<h3 id="72-mzwpzc">7.2 Modele z wykluczeniem pojedynczych zestawów cech</h3>

W tej sekcji oceniamy różne zestawy cech, wykluczając pojedyncze zestawy cech (zdefiniowane w [sekcji 2](#2-ekstrakcja-cech)), aby sprawdzić, które z nich są najbardziej istotne dla naszego modelu.

Trenujemy następujące 5 modeli XGBoost:
- `NO_statistical`: Model trenowany ze wszystkimi cechami z wyjątkiem [cech statystycznych](#2.1-cechy-statystyczne).
- `NO_semantic`: Model trenowany ze wszystkimi cechami z wyjątkiem [cech semantycznych](#2.2-cechy-semantyczne).
- `NO_cross_answer_consistency`: Model trenowany ze wszystkimi cechami z wyjątkiem [cech spójności odpowiedzi](#2.3-spójność-odpowiedzi-alternatywnych).
- `NO_style`: Model trenowany ze wszystkimi cechami z wyjątkiem [cech stylistycznych](#2.4-styl-i-struktura-odpowiedzi).
- `NO_question_type`: Model trenowany ze wszystkimi cechami z wyjątkiem [cech typu pytania](#2.5-typ-pytania).

### 7.3 Model na wszystkich cechach

W tej sekcji oceniamy model XGBoost trenowany na wszystkich cechach (zdefiniowanych w [Sekcji 2](#2-ekstrakcja-cech)).

### 7.4 Model bazowy (losowy klasyfikator)

Model bazowy to losowy klasyfikator, który przypisuje etykiety `True` i `False` z równym prawdopodobieństwem. Używamy go jako punktu odniesienia do oceny wydajności naszego modelu XGBoost. Model bazowy osiąga wynik ROC AUC na poziomie 0.5, co oznacza, że nie jest w stanie odróżnić między etykietami `True` i `False`.

<h3 id="75-pw">7.5 Porównanie wyników</h3>

Za pomocą wykresów porównujemy wartości AUC dla wszystkich modeli, aby zobaczyć, które cechy są najbardziej istotne dla naszego modelu XGBoost. 

Z wykresu wynika, że zdecydowanie najważniejszym zestawem cech dla modelu jest analiza prawdopodobieństw odpowiedzi. Dodatkowo, możemy zauważyć, że szczególnie zestaw cech o typ pytania i cechy statystyczne bardzo mało wnoszą do modelu.

<h3 id="76-awc">7.6 Analiza ważności cech</h3>

W tej sekcji używamy bardzo popularnej metody analizy ważności cech, aby ocenić, które cechy mają największy wpływ na nasz model XGBoost. Wykorzystujemy atrybut `feature_importances_` z wytrenowanego modelu XGBoost, aby zwizualizować ważność cech w postaci wykresu słupkowego. Dzięki temu możemy zobaczyć, które cechy mają największy wpływ na prognozowanie etykiet przez nasz model.

---

## Editorial & Solutions

Full benchmark notebooks and model solutions published by the Polish AI Olympiad committee.
