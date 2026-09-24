---
id: "polish-oai-2025-stage1-coin-counter"
competition: "Polish-OAI"
year: 2025
stage: "Stage 1 - Online Qualifier"
title: "Coin Counting Machine: Computer Vision Detection and Denomination Tallying"
domain: "CV"
difficulty: "Medium"
evaluation_metric: "MAE"
tags:
  - "cv"
  - "object-detection"
  - "hough-circles"
  - "contour-analysis"
  - "polish-oai"
dataset_links:
  - "https://kili-technology.com/data-labeling/machine-learning/mean-average-precision-map-a-complete-guide"
starter_code_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/blob/main/1_etap/1_maszynka_do_liczenia_monet/1_maszynka_do_liczenia_monet.ipynb"
solution_notebook_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/tree/main/1_etap/1_maszynka_do_liczenia_monet"
source_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI"
crawled_at: "2026-09-18T14:50:18.858937"
version: 1
---
# Maszynka do Liczenia Monet

![coin_counter_image.png](https://live.staticflickr.com/65535/54326911769_4e446cdd97_k.jpg)
*Obraz wygenerowany przy użyciu modelu Flux-dev.*

## Wstęp
Wyobraź sobie, że na strychu odkrywasz duży kufer pełen monet i postanawiasz policzyć ich łączną wartość. Ręczne przeliczanie każdej z monet byłoby czasochłonne i nudne, dlatego decydujesz się na zautomatyzowanie rozwiązania. Na podstawie zdjęć rozrzuconych monet, twoim celem jest określenie ich wspólnej wartości.
Rozbijając to zadanie na czynniki pierwsze, Twoim zadaniem będzie:
* zlokalizowanie każdej monety na zdjęciu,
* przypisanie ich do odpowiednich kategorii według nominałów (np. 1 grosz czy 2 złote).

Zadanie to w dziedzinie wizji komputerowej nazywamy detekcją obiektów. Zwróć uwagę, że zadanie detekcji oznacza jednoczesne zadanie klasyfikacji, jak i regresji - musisz bowiem określić zarówno klasę obiektu, jak i jego położenie na zdjęciu. Dodatkowym wyzwaniem, który odróżnia detekcję od zwykłego zadania klasyfikacji jest fakt, że zamiast jednego obiektu reprezentującego jedną z klas, na zdjęciu może znajdować się wiele obiektów różnych klas.

Formalnie możemy powiedzieć, że rozwiązaniem $\hat{\mathcal{B}}$ powinien być zbiór krotek, zawierających, kolejno, współrzędne prostokąta, w którym znajduje się moneta, etykietę, która określa nominał monety, a także pewność, z jaką model jest przekonany, że znalazł monetę.
$$
\hat{\mathcal{B}} = \{(x_{min}, y_{min}, x_{max}, y_{max}, c, \phi), \dots\}
$$
gdzie $(x_{min}, y_{min})$ to lewy górny róg prostokąta, $(x_{max}, y_{max})$ to prawy dolny róg prostokąta, $c$ to etykieta monety, a $\phi$ to pewność modelu co do predykcji. W zależności od zdjęcia, zbiór $\hat{\mathcal{B}}$ może posiadać różną ilość elementów, odpowiadającą ilości znalezionych monet. Kolejność monet w zbiorze nie ma znaczenia.

*Uwaga*: Przy pozycjach prostokątów na zdjęciu, warto zwrócić uwagę, że punkt (0, 0) znajduje się w lewym górnym rogu obrazu, a oś Y rośnie w dół. Jest to standardowy układ współrzędnych stosowany w grafice komputerowej, który różni się od układu współrzędnych stosowanego w matematyce.

Podczas wykonywania detekcji możemy popełnić pięć rodzajów błędów, które zostały przedstawione na poniższych obrazkach:
- Model wykrył obiekt, w miejscu gdzie go nie ma (taką sytuację nazywamy False Positive)
- Model nie wykrył obiektu, który jest na obrazie (taką sytuację nazywamy False Negative)
- Model wykrył obiekt, ale niepoprawnie go zaklasyfikował
- Model poprawnie wykrył i zaklasyfikował obiekt, ale zwrócił nieprecyzyjne współrzędne prostokąta
- Model wykrył ten sam obiekt kilka razy

![coin_counter_prediction.png](https://live.staticflickr.com/65535/54327101055_460ce3640e_k.jpg)

W tym przypadku bierzemy pod uwagę tylko polskie monety i ograniczamy się do stron nominalnych. Zarówno banknoty, jak i strona z wizerunkiem orła nie są zawarte w zbiorze danych i nie są brane pod uwagę. 

[Link](https://github.com/OlimpiadaAI/szkolenia/blob/main/12_Zadania_detekcji_i_segmentacji.pdf) do slajdów z wykładu na temat detekcji i segmentacji obiektów.

## Zadanie
Twoim zadaniem jest zaimplementowanie klasy ```YourDetector```, w której metoda ```forward``` przyjmuje obraz i zwraca zbiór zawierający predykcje monet w formacie opisanym przy definicji zbioru $\hat{\mathcal{B}}$.

### Kryterium Oceny
*Uwaga*: Zarówno metody obliczające metryki, jak i ładowanie danych zostały zaimplementowane w zadaniu. Twoim jedynym celem jest zaimplementowanie modelu detekcji, jednak zachęcamy do zapoznania się z opisem metryk, aby lepiej zrozumieć problem.

Zadanie zostanie ocenione na podstawie metryki [mAP](https://kili-technology.com/data-labeling/machine-learning/mean-average-precision-map-a-complete-guide) (ang. *mean Average Precision*), która jest standardową metryką w dziedzinie detekcji obiektów.  
Wyznaczenie tej metryki zaczyna się od sparowania predykcji z prawdziwymi obiektami. W tym celu wykorzystuje się metrykę IoU (ang. *Intersection over Union*), która określa stopień pokrycia dwóch prostokątów. Wartość IoU jest zdefiniowana jako stosunek pola wspólnego dla obu prostokątów $A_{\text{inter}}$ do pola ich sumy $A_{\text{union}}$.
$$ IoU = \frac{A_{\text{inter}}}{A_{\text{union}}} $$
Patrząc na poniższy rysunek, możemy powiedzieć, że IoU to stosunek pola żółtego do pola niebieskiego. Warto zauważyć, że jeśli prostokąty nie miałyby części wspólnej, to wartość IoU wynosiłaby $0$, a jeśli oba prostokąty byłyby identyczne, to wartość IoU wynosiłaby $1$.
Wartość IoU musi przekroczyć ustalony próg, abyśmy mogli uznać, że dwa prostokąty się pokrywają. Im wyższy próg, tym bardziej dokładne muszą być wskazane lokalizacje obiektów przez model, żeby zostały one sparowane z prostokątami utworzonymi na podstawie rzeczywistych współrzędnych.

![coin_counter_explanation_1.png](https://live.staticflickr.com/65535/54326929064_3927b29b3b_k.jpg)

Po dopasowaniu predykcji modelu do rzeczywistych obiektów możemy obliczyć dwie kluczowe miary: precyzję (ang. *precision*) oraz czułość (ang. *recall*). Obie miary liczymy dla każdej klasy z osobna.
- Precyzja wyraża odsetek obiektów poprawnie sklasyfikowanych do danej klasy wśród wszystkich obiektów, które zostały do niej przypisane.
- Czułość opisuje odsetek prawidłowo sklasyfikowanych obiektów danej klasy w stosunku do wszystkich obiektów tej konkretnej klasy.

Te dwie miary pomagają ocenić skuteczność modelu. Jednak ponieważ modele są niedoskonałe i popełniają różnego rodzaju błędy, próba poprawy jednej z metryk wiąże się z reguły z pogorszeniem drugiej. Gdy dla przykładu zmniejszymy próg pewności modelu, będziemy brać pod uwagę większą liczbę obiektów wskazanych przez model, ale jednocześnie może to zwiększyć ilość obiektów fałszywie wskazanych przez model za istotne.

Aby lepiej zrozumieć ten kompromis, korzystamy z wartości pewności modelu (oznaczanej jako $\phi$) i wyznaczamy na ich podstawie krzywą precision-recall. Ta krzywa pokazuje, jak zmieniają się precyzja i czułość w zależności od ustawionego progu pewności.

Pole pod poniżej narysowaną krzywą to średnia precyzja (AP) dla danej klasy.

![coin_counter_explanation_2.png](https://live.staticflickr.com/65535/54326928103_12e06df704_z.jpg)

Metryka mAP, to średnia precyzja dla wszystkich klas, czyli średnie pole pod krzywą precision-recall dla wszystkich klas, opisane wzorem:
$$ mAP = \frac{1}{K} \sum_{k=1}^K {AP}_{k}, $$
gdzie $K$ to liczba klas, a ${AP}_{k}$ to średnia precyzja dla klasy $k$.

Ostatnim krokiem jest wybór wartości IoU, dla której chcemy wyznaczyć mAP. Standardową praktyką, którą wykorzystamy do ocenienia twojego rozwiązania, jest wyznaczanie mAP dla różnych wartości IoU (zaczynając od 0.5 i zwiększając wartość o 0.05 aż do 0.95) i uśrednianie wyników. Dzięki temu metryka lepiej odzwierciedla nie tylko jakość klasyfikacji ale także jakość lokalizacji obiektów (dla progu IoU=0.95 model musi zwracać predykcje niemal idealnie pokrywające się z docelowymi prostokątami, a w przypadku IoU=0.5 metryka "wybacza" znacznie większe różnice w położeniu).

**Ostatecznie Twoje rozwiązanie oceniane będzie na tajnym zbiorze testowym na podstawie metryki mAP.** Zbiór testowy nie różni się znacząco od zbioru walidacyjnego.

- Gdy wartość mAP dla Twojego modelu będzie wynosiła 0.2 (lub poniżej), otrzymasz 0 punktów za zadanie.
- Gdy wartość mAP dla Twojego modelu będzie wynosiła 0.85 (lub powyżej), otrzymasz 100 punktów za zadanie.
- W przeciwnym wypadku, liczba punktów zostanie wyznaczona proporcjonalnie do wartości mAP:
$$
\text{score} = \frac{mAP - 0.2}{0.85 - 0.2} \times 100
$$


## Ograniczenia
- Twoje rozwiazanie będzie testowane na Platformie Konkursowej bez dostępu do internetu oraz w środowisku z GPU.
- Ewaluacja Twojego finalnego rozwiązania na Platformie Konkursowej nie może trwać dłużej niż 10 minut z GPU, natomiast ewaluacja dla pojedyńczego zdjęcia nie może trwać dłużej niż 5 sekund.
- Model nie może korzystać z innych zbiorów danych oraz z pre-trenowanych wag na innych zbiorach danych.
- Model musi zwracać wyniki w formacie, który jest kompatybilny z funkcją ```predict_all_bounding_boxes``` (podobnie jak przykładowe rozwiązanie).
- Model musi dziedziczyć po klasie ```nn.Module```.

## Pliki Zgłoszeniowe
Ten notebook uzupełniony o Twoje rozwiązanie (patrz klasa `YourDetector`).

## Ewaluacja
Pamiętaj, że podczas sprawdzania flaga `FINAL_EVALUATION_MODE` zostanie ustawiona na `True`.

Za to zadanie możesz zdobyć pomiędzy 0 a 100 punktów. Liczba punktów, którą zdobędziesz, będzie wyliczona na (tajnym) zbiorze testowym na Platformie Konkursowej na podstawie wyżej wspomnianego wzoru, zaokrąglona do liczby całkowitej. Jeśli Twoje rozwiązanie nie będzie spełniało powyższych kryteriów lub nie będzie wykonywać się prawidłowo, otrzymasz za zadanie 0 punktów.

# Kod Startowy
W tej sekcji inicjalizujemy środowisko poprzez zaimportowanie potrzebnych bibliotek i funkcji. Przygotowany kod ułatwi Tobie efektywne operowanie na danych i budowanie właściwego rozwiązania.

## Ładowanie Danych
Za pomocą poniższego kodu dane zostaną wczytane i odpowiednio przygotowane.

### Klasy Obiektów i ich Etykiety
Poniżej znajduje się tabelka z etykietami klas znajduących się w zbiorze danych wraz z ich krótkim opisem.

| Etykieta | Opis |
| --- | --- |
| 0 | Moneta o nominale 1 grosza |
| 1 | Moneta o nominale 2 grosze |
| 2 | Moneta o nominale 5 groszy |
| 3 | Moneta o nominale 10 groszy |
| 4 | Moneta o nominale 20 groszy |
| 5 | Moneta o nominale 50 groszy |
| 6 | Moneta o nominale 1 złoty |
| 7 | Moneta o nominale 2 złote |
| 8 | Moneta o nominale 5 złotych |


## Przykładowe Rozwiązanie
Poniżej przedstawiamy uproszczone rozwiązanie, które służy jako przykład demonstrujący podstawową funkcjonalność notatnika. Może ono posłużyć jako punkt wyjścia do opracowania Twojego rozwiązania.

Jako prosty przykład może posłuży sieć konwolucyjna aplikowana na okno przesuwne. Metoda ta polega na wyciąganiu fragmentów zdjęcia (w naszym przypadku o rozmiarach typowych dla monet w zbiorze danych) i klasyfikacji każdego z nich przez sieć konwolucyjną. Sieć ta na wyjściu zwraca jedną z 10 klas: dziewięć z nich należy do różnych nominałów, natomiast ostatnia klasa jest zarezerwowania dla tła, czyli miejsca gdzie nie ma żadnej monety. Operację klasyfikacji przeprowadzamy dla każdego fragmentu zdjęcia, przesuwając się o określoną wartość. W przypadku, gdy sieć zwraca klasę tła, pomijamy ten fragment, w przeciwnym przypadku, do analizowanego fragmentu przypisujemy etykietę monety. W ten sposób otrzymujemy zbiór prostokątów, które zawierają monety.

Przy implementacji należy wziąć pod uwagę dodatkową klasę, która będzie reprezentować tło (prostokąt, w którym nie ma żadnej monety). W procesie treningu możemy robić losowe wycinki zdjęcia. Jeśli wycinek pokrywa się z monetą z wartością IoU wyższą niż $0.5$, to wybieramy jej nominał jako etykietę. W przypadku gdy wycinek nie pokrywa się z żadną monetą - wybieramy tło jako etykietę.

Zaczniemy od zdefiniowania prostego modelu, a w następnych komórkach zajmiemy się implementacją funkcji trenującej.

Warto zwrócić uwagę na rozbieżności w wartościach mAP z użyciem progu IoU=0.5 oraz dla wielu różnych wartości IoU (0.5, ..., 0.95). Podobna rozbieżność jest widoczna w macierzy pomyłek dla różnych wartości IoU. Oznacza to, że model potrafi całkiem dobrze predykować klasy, jednak ma problem z dokładną lokalizacją obiektów.

Jest to spodziewany wynik, ponieważ model używa techniki okna przesuwnego, która nie umieszcza prostokąta dokładnie na monecie, a jedynie przesuwa je o konkretną wartość (u nas 32 piksele), co sprawia, że proponowane przez model pozycje są jedynie w okolicach prawdziwych monet. Dodatkowo wielkość zwracanych okien jest stała, co dodatkowo pogarsza wyniki mAP dla wyższych wartości progu IoU.

Twoim zadaniem jest zaimplementowanie modelu, który poprawi te wyniki.

# Twoje Rozwiązanie
W tej sekcji należy umieścić Twoje rozwiązanie. Wprowadzaj zmiany wyłącznie tutaj!

# Ewaluacja

Uruchomienie poniższej komórki pozwoli sprawdzić, ile punktów zdobyłoby Twoje rozwiązanie na danych walidacyjnych. Przed wysłaniem upewnij się, że cały notebook wykonuje się od początku do końca bez błędów i bez konieczności ingerencji użytkownika po wybraniu opcji "Run All".

Podczas sprawdzania model zostanie zapisany jako `your_model.pkl` i oceniony na zbiorze testowym.

---

## Editorial & Solutions

Full benchmark notebooks and model solutions published by the Polish AI Olympiad committee.
