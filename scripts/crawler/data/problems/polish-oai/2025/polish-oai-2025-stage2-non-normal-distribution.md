---
id: "polish-oai-2025-stage2-non-normal-distribution"
competition: "Polish-OAI"
year: 2025
stage: "Stage 2 - Regional Finals"
title: "Non-Normal Distribution: Image Denoising & Heavy-Tailed Noise Estimation"
domain: "CV"
difficulty: "Olympiad Final"
evaluation_metric: "MSE"
tags:
  - "cv"
  - "denoising"
  - "noise-estimation"
  - "autoencoders"
  - "polish-oai"
dataset_links: []
starter_code_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/blob/main/2_etap/rozklad_nienormalny/rozklad_nienormalny.ipynb"
solution_notebook_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/tree/main/2_etap/rozklad_nienormalny"
source_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI"
crawled_at: "2026-09-18T14:50:20.780059"
version: 1
---
# Rozkład Nienormalny

![robot.png](https://live.staticflickr.com/65535/54430891765_38ef5cb61e_z.jpg)

*Obraz wygenrowany za pomocą ChatGPT.*

## Wstęp

Szum towarzyszy nam przynajmniej tak długo, jak długo rejestrujemy obserwacje wszelkiego rodzaju. Czy wynika to z faktu, że nie żyjemy w świecie klasycznych filozoficznych abstrakcji, czy może prawda jest o wiele bardziej prozaiczna—w kadr aparatu, obiektyw teleskopu, urywek tekstu czy nagranie dźwiękowe bardzo często dostają się zupełnie przez nas niepożądane sygnały, które—owszem—współtworzą rzeczywistość, lecz w momencie przeprowadzenia obserwacji wolelibyśmy ich uniknąć. W kontekście tego zadania, taką nadmiarową informację nałożoną na informację bazową (prawdziwą), będziemy nazywać szumem.

Szum rozważa się, a więc i opisuje matematycznie—w naukach ścisłych, szczególnie w tzw. *teorii informacji*. W grafice komputerowej szumem (*funkcją zaszumiającą*) nazwiemy f:

$$f: X → X$$

gdzie X to określona dziedzina zdjęć. Dla zdjęć o rozmiarze 28x28 w skali szarości zakodowanej w zakresie liczb rzeczywistych [0, 1]:

$$X = [0,1]^{28 * 28} $$

Sensownym założeniem jest, że f istotnie różni się od funkcji identycznościowej, tj. w istotny sposób zniekształca bazowe zdjęcie.

*Szum gaussowski* definiuje się na podstawie **rozkładu Gaussa**, o gęstości prawdopowodobieństwa zadanej wzorem:

$$f_{\mu, \sigma}(x) = \frac{1}{\sigma \sqrt{2π}}e^{\frac{-(x - \mu)^2}{2\sigma^2}}$$

**Rozkład Gaussa** jest parametryzowany przez dwie stałe: $\mu$ - *średnią* i $\sigma$ - *odchylenie standardowe* lub równoważnie: $\mu$ - *średnią* i $\sigma^2$ - *wariancję* (kwadrat odchylenia standardowego). Popularne biblioteki do obliczeń zawierają implementację *samplowania* próbek z tego rozkładu. By zaszumić obraz parametryzowanym rozkładem, próbkujemy z niego tablicę o rozmiarze równym rozmiarowi zdjęcia, dodajemy szum do zdjęcia (dodajemy *po pikselach*), po czym zapewniamy, by wartości pikseli pozostały w przedziale [0, 1] (funkcja **clamp**).

**Rozkład jednostajny** ma prostą intuicję—określamy przedział $[a,b]$ i chcemy, by szanse wylosowania dowolnych dwóch różnych liczb z przedziału były takie same, natomiast dowolnej liczby spoza przedziału—zerowe. Formalnie, gęstość prawdopodobieństwa rozkładu jednostajnego określa wzór:

$$    
  f(x) =
  \begin{cases}
    \frac{1}{b-a}, & \text{for } a \leq x \leq b \\
    0
  \end{cases}
\
$$

Zaszumiając obrazek szumem jednostajnym, postępujemy analogicznie jak przy szumie gaussowskim. Losujemy próbkę z rozkładu, dodajemy ją do zdjęcia i ewentualne piksele wykraczające poza przedział $[0,1]$ ustawiamy na odpowiednie ograniczenie zakresu.

## Zadanie

Wyobraź sobie, że jesteś specjalistą ds. przetwarzania obrazu w firmie zajmującej się analizą i rekonstrukcją obrazów. Twój zespół pracuje nad systemem, który potrafi nie tylko usuwać szum z obrazów, ale również identyfikować jego rodzaj i parametry, co może dostarczyć cennych informacji o źródle zakłóceń.

Twoim zadaniem jest zaprojektowanie i wytrenowanie pojedynczej architektury sieci neuronowej, która będzie w stanie jednocześnie realizować trzy cele:

- **Odszumianie obrazów** - przywracanie oryginalnego wyglądu zdjęć zaszumionych jednym z dwóch rodzajów szumów: gaussowskim albo jednostajnym;
- **Klasyfikacja typu szumu** - określenie, czy zdjęcie zostało zaszumione szumem gaussowskim (etykieta 0) czy jednostajnym (etykieta 1);
- **Estymacja parametrów szumu gaussowskiego** - dla zdjęć zaszumionych szumem gaussowskim, model powinien dodatkowo estymować parametry tego szumu: średnią $\mu$ i odchylenie standardowe $\sigma$

**Zwróć uwagę, że każde poszczególne zdjęcie zostało zaszumione losowo wybranym rozkładem z losowo wybranymi (potencjalnie różnymi na całym zbiorze danych) parametrami.**

### Dane
Dostępne dla Ciebie w tym zadaniu dane to:

- **Zbiór danych treningowych**, zawierający zarówno obrazy oryginalne, jak i ich zaszumione wersje wraz z etykietami rodzaju szumu
- **Zbiór danych walidacyjnych**, który pomoże Ci ocenić jakość Twojego modelu w trakcie treningu

Przygotowaliśmy dla Ciebie dataloader. W zbiorze treningowym, każdy przykład składa się z:

- Zdjęcia przed zaszumieniem - klucz `['original']`
- Zdjęcia po zaszumieniu - klucz `['noised']`
- Etykiety rodzaju szumu - klucz `['label']`
- Parametrów szumu - klucz `['params']` (dostępne tylko dla zbioru walidacyjnego i testowego)

Poniższa grafika ilustruje przykładowy proces powstawania zaszumionych zdjęć dla obu szumów parametryzowanych przykładowymi argumentami.

![noise_schema.png](https://live.staticflickr.com/65535/54429663172_1014ff20d7_z.jpg")

Twoje rozwiązanie zostanie ostatecznie przetestowane na Platformie Konkursowej na ukrytym zestawie danych testowych, który jest zbalansowany pod względem typów szumów, a obrazki w nim cechują się takimi samymi charakterystykami, jak te dostarczone uczestnikom.


### Kryterium Oceny

Jak możesz się spodziewać, w ewaluacji będziemy oceniać cztery kluczowe aspekty Twojego rozwiązania:

1. **Dokładność klasyfikacji binarnej szumu** (waga 25%) - jak skutecznie model rozpoznaje rodzaj szumu:

$$    
  accuracyScore =
  \begin{cases}
    \frac{accuracy - 0.5}{0.45}, & \text{dla } 0.5 < accuracy < 0.95 \\
    0.0, & \text{dla } accuracy \leq 0.5 \\
    1.0, & \text{dla } 0.95 \leq accuracy
  \end{cases}
\
$$

2. **Jakość rekonstrukcji obrazu** (waga 25%) - mierzona metryką PSNR (Peak Signal-to-Noise Ratio):

$$    
  psnrScore =
  \begin{cases}
    \frac{PSNR - 10}{6}, & \text{dla } 10 < PSNR < 16 \\
    0.0, & \text{dla } PSNR \leq 10 \\
    1.0, & \text{dla } 16 \leq PSNR
  \end{cases}
\
$$

gdzie PSNR jest zdefiniowane jako:

$$PSNR = 10 log_{10}\frac{MAX_{I}^{2}}{MSE},$$

gdzie $MAX_{I}$ to maksymalna możliwa wartość piksela przy zadanej reprezentacji i w naszym przypadku $MAX_{I} = 1$.


3. **Dokładność estymacji parametru średniej $\mu$ szumu gaussowskiego** (waga 25%) - mierzona błędem średniokwadratowym (MSE) i liczona po elementach zbioru testowego z etykietą 0 (szum *gaussowski*):

$$    
  meanMseScore =
  \begin{cases}
   1.0, & \text{dla } MSE < 0.005 \\
   0.0, & \text {w przeciwnym przypadku}
  \end{cases}
\
$$

4. **Dokładność estymacji parametru odchylenia standardowego $\sigma$ szumu gaussowskiego** (waga 25%) - również mierzona błędem średniokwadratowym (MSE) i liczona po elementach zbioru testowego z etykietą 0 (szum *gaussowski*):

$$    
  stdMseScore =
  \begin{cases}
   1.0, & \text{dla } MSE < 0.005 \\
   0.0, & \text {w przeciwnym przypadku}
  \end{cases}
\
$$

**Ostateczna Formuła Oceny**

Końcowa ocena jest ważoną sumą powyższych metryk zgodnie ze wzorem:
$$ finalScore = 25 \cdot accuracyScore + 25 \cdot psnrScore + 25 \cdot meanMseScore + 25 \cdot stdMseScore $$

Za to zadanie możesz zdobyć od 0 do 100 punktów, gdzie:

- Wartości bliskie 0 wskazują na słabe rozwiązanie;
- Wartości bliskie 100 wskazują na doskonałe rozwiązanie, które skutecznie klasyfikuje rodzaj szumu, rekonstruuje oryginalne obrazy i precyzyjnie estymuje parametry szumu gaussowskiego.

## Ograniczenia

- Do uczenia modelu możesz używać jedynie zbioru treningowego.
- Twoje rozwiazanie będzie testowane na Platformie Konkursowej bez dostępu do internetu oraz w środowisku z GPU.
- Ewaluacja Twojego finalnego rozwiązania na Platformie Konkursowej nie może trwać dłużej niż 5 minut z GPU.

## Pliki zgłoszeniowe

Ten notebook uzupełniony o Twoje rozwiązanie (patrz klasa `Model`).

# Kod Startowy
W tej sekcji inicjalizujemy środowisko poprzez zaimportowanie potrzebnych bibliotek i funkcji. Przygotowany kod ułatwi Tobie efektywne operowanie na danych i budowanie właściwego rozwiązania.

## Ładowanie Danych
Za pomocą poniższego kodu dane zostaną wczytane i odpowiednio przygotowane.

## Kod z Kryterium Oceniającym
Kod, zbliżony do poniższego, będzie używany do oceny rozwiązania na zbiorze testowym.

# Twoje Rozwiązanie
W tej sekcji należy umieścić Twoje rozwiązanie. Wprowadzaj zmiany wyłącznie tutaj!

# Ewaluacja
Uruchomienie poniższej komórki pozwoli sprawdzić, ile punktów zdobyłoby Twoje rozwiązanie na danych walidacyjnych. Przed wysłaniem upewnij się, że cały notebook wykonuje się od początku do końca bez błędów i bez konieczności ingerencji użytkownika po wybraniu opcji "Run All".

Podczas sprawdzania model zostanie zapisany jako `your_model.pkl` i oceniony na zbiorze testowym.

---

## Editorial & Solutions

Full benchmark notebooks and model solutions published by the Polish AI Olympiad committee.
