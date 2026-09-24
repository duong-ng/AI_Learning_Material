---
id: "polish-oai-2025-stage2-borrowing-credit-scoring"
competition: "Polish-OAI"
year: 2025
stage: "Stage 2 - Regional Finals"
title: "Borrowing (Kredytobranie): Interpretable Credit Scoring & Explanations"
domain: "Tabular ML"
difficulty: "Hard"
evaluation_metric: "ROC-AUC"
tags:
  - "tabular-ml"
  - "credit-risk"
  - "interpretability"
  - "shap"
  - "polish-oai"
dataset_links: []
starter_code_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/blob/main/2_etap/kredytobranie/kredytobranie.ipynb"
solution_notebook_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/tree/main/2_etap/kredytobranie"
source_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI"
crawled_at: "2026-09-18T14:50:21.349942"
version: 1
---
# Kredytobranie - Wyjaśnianie Decyzji Modelu

![](https://live.staticflickr.com/65535/54368714616_e90a2c644c_z.jpg)

*Obraz wygenerowany za pomocą ChatGPT.*

## Wstęp
Wyobraź sobie, że jesteś analitykiem danych w firmie zajmującej się oceną ryzyka kredytowego. 
Twój zespół opracował model, który na podstawie kluczowych wskaźników finansowych 
podejmuje decyzje o przyznaniu kredytu klientom. Model działa sprawnie, ale pojawił się 
problem - klienci, którym odmówiono kredytu, domagają się konkretnych wyjaśnień.

Kierownictwo firmy zdaje sobie sprawę, że samo powiedzenie "komputer tak zdecydował" 
nie jest wystarczające. Potrzebują czegoś więcej - konkretnych wskazówek dla klientów, 
co mogliby zmienić w swojej sytuacji finansowej, aby otrzymać pozytywną decyzję kredytową.

Jako specjalista ds. uczenia maszynowego zostajesz poproszony o opracowanie systemu, 
który pomoże zrozumieć decyzje modelu i wskaże klientom ścieżkę do uzyskania kredytu.


## Zadanie
Na szczęście, aby lepiej zrozumieć problem i wypracować rozwiązanie, będziesz pracował na uproszczonym,
dwuwymiarowym zbiorze danych. Umożliwi to wizualizację wyników i lepsze zrozumienie działania
Twojego systemu wyjaśnień.

Twoim zadaniem jest zaproponowanie *metody do generowania wyjaśnień* dla odrzuconych wniosków kredytowych, która będzie proponować realistyczne zmiany w wartościach wskaźników finansowych i ostatecznie doprowadzi do pozytywnej decyzji klasyfikatora - sieci neuronowej.

W trakcie pracy nad rozwiązaniem będziesz mógł zobaczyć rezultaty na wykresach, które pokażą:
- Początkowe położenie obserwacji do wyjaśnienia;
- Granicę decyzyjną klasyfikatora;
- Proponowane zmiany w postaci wektorów oraz końcowych propozycji wyjaśnień;
- Wyestymowany rozkład gęstości danych treningowych, który pomoże ocenić realność proponowanych zmian.

### Dane
Dostępne dla Ciebie w tym zadaniu dane to:
- Zbiór danych treningowych;
- Zbiór danych do wyjaśnienia;
- Model dyskryminujący wytrenowany na danych treningowych; ten model będziesz wyjaśniać;
- Model generatywny wykorzystywany do estymacji gęstości rozkładu danych treningowych.

W szczególności, w swojej metodzie do generowania wyjaśnień możesz wykorzystywać jedynie model dyskryminujący, model generatywny oraz dane do wyjaśnienia. Dane treningowe służą jedynie do lepszego zobrazowania celu zadania. 

Twoje rozwiązanie zostanie ostatecznie przetestowane na Platformie Konkursowej na ukrytym zestawie danych testowych, który obejmuje nowe dane treningowe, dane do wyjaśnień oraz model dyskryminatywny i generatywny. Charakterystyka danych testowych nie będzie znacząco odbiegać od zestawu danych udostępnionego do zbudowania rozwiązania. Dodatkowe będą dostępne dla Ciebie dane walidacyjne na Platformie Konkursowej, na których będziesz mógł upewnić się, że całość rozwiązania wykonuje się poprawnie.

### Kryterium Oceny
Jak możesz się spodziewać, w ewaluacji będziemy oceniać trzy kluczowe aspekty Twojego rozwiązania:
1. **Skuteczność Zmiany Decyzji Klasyfikatora** - czy Twoje propozycje faktycznie prowadzą do przyznania kredytu;
2. **Realistyczność Wyjaśnień** - czy znajdują się one w obszarze podobnym do danych treningowych, czyli czy są osiągalne dla klientów;
3. **Odległość Wyjaśnień** - czy proponowane modyfikacje są możliwie najmniejsze, aby nie obciążać klienta nadmiernymi zmianami w jego sytuacji finansowej.

Ponieważ zależy nam na satysfakcji klientów, każdy z tych aspektów będzie musiał przekroczyć pewien próg, abyś otrzymał za niego punkty. Dodatkowo, każdy z nich będzie miał wpływ na końcową ocenę Twojego rozwiązania, zgodnie z formułami przedstawionymi poniżej, a Twój finalny wynik będzie znajdował się w przedziale $[0, 100]$.

Ocena rozwiązania opiera się na trzech głównych metrykach:

**Skuteczność Zmiany Decyzji Klasyfikatora ($V$)** - Miara określająca procent wygenerowanych wyjaśnień, które skutecznie zmieniają decyzję klasyfikatora:

$$V = \begin{cases}
0, & \text{jeśli } validity < 0.50 \\
\frac{validity - 0.50}{1.00 - 0.50}, & \text{jeśli } 0.50 \leq validity \leq 1.00 \\
1, & \text{jeśli } validity > 1.00
\end{cases}$$

gdzie *validity* jest zdefiniowane w następujący sposób:
$$\text{validity} = \frac{1}{N} \sum_{i=1}^{N} \mathbb{1}[f(\mathbf{{x'}_i}) > 0.5],$$
gdzie $\mathbf{{x'}_i}$ to zapronowane wyjaśnienie dla obserwacji $i$, $f$ to model dyskryminatywny, a $N$ to liczba obserwacji.

**Realistyczność Wyjaśnień ($P$)** - Miara określająca procent wygenerowanych wyjaśnień, które są uznawane za realistyczne:

$$P = \begin{cases}
0, & \text{jeśli } plausibility < 0.50 \\
\frac{plausibility - 0.50}{1.00 - 0.50}, & \text{jeśli } 0.50 \leq plausibility \leq 1.00 \\
1, & \text{jeśli } plausibility > 1.00
\end{cases}$$

gdzie *plausibility* jest zdefiniowane w następujący sposób:
$$\text{plausibility} = \frac{1}{N} \sum_{i=1}^{N} \mathbb{1}[\log{P(\mathbf{{x'}_i}|y')} \geq \text{log\_prob\_threshold}],$$
gdzie $\log{P(\mathbf{{x'}_i}|y')}$ to logarytm prawdopodobieństwa zapronowanego $i$-tego wyjaśnienia $\mathbf{{x'}_i}$ pod warunkiem klasy docelowej $y'$ - jest to wynik funkcji `forward` modelu generatywnego `gen_model`. Natomiast $\text{log\_prob\_threshold}$ to próg logarytmu prawdopodobieństwa, który zapronowane wyjaśnienie musi przekroczyć i został on wcześniej wyznaczony na podstawie danych treningowych.

**Odległość Wyjaśnień ($D$)** - Miara określająca, jak bardzo proponowane zmiany różnią się od oryginalnych danych klienta:

$$D = \begin{cases} 
1, & \text{jeśli } \text{odległość L2} < 0.22 \\
\frac{0.30 - \text{odległość L2}}{0.30 - 0.22}, & \text{jeśli } 0.22 \leq \text{odległość L2} \leq 0.30 \\
0, & \text{jeśli } \text{odległość L2} > 0.30.
\end{cases}$$

**Ostateczna Formuła Oceny**
Końcowa ocena jest kombinacją powyższych metryk zgodnie ze wzorem:

$$S = 100 \cdot V \cdot \left(\frac{D}{2} + \frac{P}{2}\right)$$

Ta formuła wyraża, że Skuteczność Zmiany Decyzji Klasyfikatora ($V$) jest mnożona przez Odległość Wyjaśnień ($D$) i Realistyczność Wyjaśnień ($P$). Oznacza to, że aby uzyskać dobry wynik, rozwiązanie musi być skuteczne w zmianie decyzji klasyfikatora, jednocześnie proponując zmiany, które są zarówno realistyczne, jak i efektywne (minimalne). Finalny wynik $S$ mieści się w przedziale $[0, 100]$, gdzie:
- Wartości bliskie $0$ wskazują na słabe rozwiązanie;
- Wartości bliskie $100$ wskazują na doskonałe rozwiązanie, które skutecznie zmienia decyzje klasyfikatora przy jednoczesnym zachowaniu realistyczności i minimalności zmian.

## Ograniczenia
- Twoje rozwiązanie będzie testowane na Platformie Konkursowej bez dostępu do internetu.
- Ewaluacja Twojego finalnego rozwiązania na Platformie Konkursowej nie może trwać dłużej niż 2 minuty.
- Twoje rozwiązanie nie może korzystać ze zbioru treningowego, i.e., `X_train`, `y_train`.
- Dostępne biblioteki: Matplotlib, Numpy, Pandas, PyTorch, Scikit-Learn

## Uwagi i Wskazówki
- Warto zmienić funkcję straty, aby uzyskać lepsze wyniki.
- Warto wykorzystać dostarczony model generatywny do estymacji gęstości rozkładu danych treningowych.

## Pliki Zgłoszeniowe
Ten notebook uzupełniony o Twoje rozwiązanie (patrz funkcja `your_generate_explanations`).

## Ewaluacja
Pamiętaj, że podczas sprawdzania flaga `FINAL_EVALUATION_MODE` zostanie ustawiona na `True`.

Za to zadanie możesz zdobyć pomiędzy 0 a 100 punktów. Liczba punktów, którą zdobędziesz, będzie wyliczona na (tajnym) zbiorze testowym na Platformie Konkursowej na podstawie wyżej wspomnianego wzoru, zaokrąglona do liczby całkowitej. Jeśli Twoje rozwiązanie nie będzie spełniało powyższych kryteriów lub nie będzie wykonywać się prawidłowo, otrzymasz za zadanie 0 punktów.


# Kod Startowy
W tej sekcji inicjalizujemy środowisko poprzez zaimportowanie potrzebnych bibliotek i funkcji. Przygotowany kod ułatwi Tobie efektywne operowanie na danych i budowanie właściwego rozwiązania.

## Ładowanie Danych
W tej części zadania załadujemy dane treningowe, które zostały wykorzystane do treningu modelu dyskryminującego.

Wyświetlmy dane treningowe.

## Ładowanie Modelu Dyskryminujacęgo

W tym zadaniu będziemy wyjaśniać model prostej sieci neuronowej, która została wcześniej wytrenowana.

Wyświetlmy zbiór danych oraz granice decyzjną modelu.

## Realistyczność Wyjaśnień

W tym zadaniu skupimy się na ważnym aspekcie generowania wyjaśnień - chcemy, aby wygenerowane punkty były realistyczne, a w naszym przypadku będziemy to defniować jako pochodzenie z obszaru o wysokiej gęstości rozkładu danych treningowych.
   
Zacznijmy od zapoznania się z zagadnieniem estymacji gęstości rozkładu danych. Estymacja gęstości rozkładu (density estimation) to zadanie polegające na znalezieniu funkcji $p(x)$,
która przybliża prawdziwy rozkład prawdopodobieństwa danych $p^*(x)$. Formalnie, mając zbiór próbek
${x_1, ..., x_n}$ pochodzących z nieznanego rozkładu $p^*(x)$, chcemy znaleźć model $p(x)$, który
najlepiej przybliża ten rozkład.

W tym zadaniu wykorzystamy model estymatora jądrowego (ang. Kernel Density Estimation (KDE)), który jest jednym z najpopularniejszych modeli estymacji gęstości rozkładu. Jako kryterium progu akceptowalności realistyczności przyjmiemy jako medianę wartości funkcji gęstości dla punktów treningowych, którą wcześniej dla Ciebie została policzona. Oznacza to, że funkcja gęstości KDE dla propozycji nowych zmiennych dla klienta powinna mieć wartość powyżej progu akceptowalności. Ten koncept jest zwizualizowany na kolejnym wykresie w postaci czerwonego obszaru. 


## Ładowanie Modelu Generatywnego wraz z Progiem Akceptowalności

Wyświetlmy setup modelu, danych oraz gęstości rozkładu danych

## Ładowanie Danych do Wyjaśnienia
W tej części zadania załadujemy zbiór danych do wyjaśnienia. Twoim zdaniem będzie wygenerowanie wyjaśnień dla punktów z tego zbioru danych.


## Przykładowe Rozwiazanie
Poniżej przedstawiamy uproszczone rozwiązanie, które służy jako przykład demonstrujący podstawową funkcjonalność notatnika. Może ono posłużyć jako punkt wyjścia do opracowania Twojego rozwiązania.

Jednym ze sposobów rozwiązania powyższego problemu jest metoda optymalizacji punktu docelowego $x^*$ poprzez minimalizację następującej funkcji celu:

$$ L(x^*) = \text{BCE}(f(x^*), y^*) + \lambda \cdot |x^* - x|^2_2 $$

gdzie:
- $\text{BCE}$ to funkcja straty binary cross-entropy
- $f(x^*)$ to predykcja modelu dla punktu $x^*$
- $y^*$ to pożądana klasa docelowa 
- $|x^* - x|_2^2$ to kwadrat odległości euklidesowej między punktem x* a punktem wyjściowym x
- $\lambda$ to parametr regulacji kompromisu między składowymi funkcji straty (w implementacji $\lambda$=0.1)

Jest to podstawowe podejście, które nie uwzględnia rozkładu danych treningowych. Poniżej znajdziesz przykładowa implementacje.

## Wizualizacja Wyjaśnień

# Twoje Rozwiązanie
W tej sekcji należy umieścić Twoje rozwiązanie. Wprowadzaj zmiany wyłącznie tutaj!

Twoim zadaniem jest implementacja funkcji ```your_generate_explanations```.
Pamiętaj, że definicja funkcji nie powinna być zmieniana, a także wynikowa tablica rezultatów powinna być tego samego rozmiaru co tablica wejściowa punktów do wyjaśnień.

# Ewaluacja

Uruchomienie poniższej komórki pozwoli sprawdzić, ile punktów zdobyłoby Twoje rozwiązanie na dostępnych danych. Przed wysłaniem upewnij się, że cały notebook wykonuje się od początku do końca bez błędów i bez konieczności ingerencji użytkownika po wybraniu opcji "Run All".

Podczas sprawdzania model zostanie zapisany jako `your_model.pkl` i oceniony na zbiorze walidacyjnym oraz testowym.

---

## Editorial & Solutions

Full benchmark notebooks and model solutions published by the Polish AI Olympiad committee.
