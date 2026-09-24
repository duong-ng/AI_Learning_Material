---
id: "polish-oai-2025-stage1-ecg-anomaly"
competition: "Polish-OAI"
year: 2025
stage: "Stage 1 - Online Qualifier"
title: "ECG Anomaly Detection: 1D Temporal Signal Classification"
domain: "Audio"
difficulty: "Hard"
evaluation_metric: "Macro F1"
tags:
  - "signal-processing"
  - "ecg"
  - "time-series"
  - "1d-cnn"
  - "polish-oai"
dataset_links: []
starter_code_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/blob/main/1_etap/3_wykrywanie_zaburzen_sygnalu_ekg/3_wykrywanie_zaburzen_sygnalu_ekg.ipynb"
solution_notebook_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI/tree/main/1_etap/3_wykrywanie_zaburzen_sygnalu_ekg"
source_url: "https://github.com/OlimpiadaAI/II-OlimpiadaAI"
crawled_at: "2026-09-18T14:50:20.209132"
version: 1
---
# Wykrywanie Zaburzeń Sygnału EKG

![ECG_anomaly_detection_intro.png](https://live.staticflickr.com/65535/54253200317_77c251c48c_o.png)

*Obraz wygenerowany przy użyciu modelu DALL-E.*

## Wstęp

Rozwój sztucznej inteligencji otwiera nowe możliwości w diagnostyce medycznej, zwłaszcza w analizie złożonych danych, takich jak [sygnały elektrokardiograficzne (EKG)](https://www.healio.com/cardiology/learn-the-heart/ecg-review/ecg-interpretation-tutorial). EKG to jedno z najczęściej stosowanych narzędzi diagnostycznych w medycynie, umożliwiające ocenę i wykrywanie nieprawidłowości pracy serca.

Tradycyjnie sygnał EKG powstaje z dwunastu odprowadzeń, jednak w tym zadaniu skupimy się na sygnale jednoodprowadzeniowym, czyli dysponujemy
jedną zmienną reprezentującą napięcie elektryczne generowane przez serce w czasie. Dane te są rejestrowane w postaci krzywej zależnej od czasu, czyli można tutaj mówić o szeregu czasowym. Z sygnału EKG można wydzielić charakterystyczne fragmenty, czyli **załamki** (ang. waves) P, Q, R, S, T oraz **odstępy** pomiędzy dwoma zdarzeniami w EKG (ang. intervals), spośród których istotną rolę odgrywa odstęp R-R (czas między wystąpieniem dwóch kolejnych załamków R). Oprócz tego mówimy o **odcinkach** (ang. segments), czyli długości między dwoma określonymi załamkami w EKG, pomiędzy którymi powinna występować bazowa amplituda sygnału. Z kolei **zespół** (ang. complex) stanowi kilka zgrupowanych załamków. Głównie wyrózniamy tutaj zespół QRS. Schematyczny rysunek EKG wraz z podpisanymi fragmentami, jest prezentowany poniżej.

![ECG.png](https://live.staticflickr.com/65535/54254099351_213d47784d_o.png)

W EKG pochodzącym od zdrowej osoby można zauważyć sekwencję PQRST. Na początku wyróżniamy załamek P, która reprezentuje skurcz przedsionków i jest małym pionowym wychyleniem przed zespołem QRS. Następnie, zespół QRS wskazuje na skurcz komór i tworzony jest przez trzy wygięcia: załamek Q, załamek R oraz załamek S. Dalej można zauważyć odcinek ST, czyli płaski odcinek między zespołem QRS a załamkiem T, który odpowiada wczesnej fazie repolaryzacji komór. Finalnie, załamek T, który jest zaokrąglonym, pionowym wychyleniem, dotyczy repolaryzacji komór i ich powrotu do wyjściowego stanu.  Sekwencja PQRST przypomina sinusoidę, której maksimum jest osiągane dla załamka R. W przypadku zaburzeń pracy serca, EKG może wykazywać różne anomalie, takie jak dodatkowe minima lub maksima, czy też znacznie zwiększone odchylenie standardowe podczas całego pomiaru. Charakterystyka tych anomalii zależy od rodzaju i przyczyny zaburzenia.

W poniższym zadaniu musisz zmierzyć się z próbkami zawierającymi pojedyncze sekwencje PQRST oraz ich okolice. Większość próbek będzie odpowiadała danym bez anomalii, których przykład zaprezentowany jest na poniższym obrazku:

![normal_example.png](https://live.staticflickr.com/65535/54253200322_f0173af129_o.png)

Występować będą też pomiary odpowiadające czterem rodzajom zaburzeń:  **AFib**, czyli migotaniu przedsionków, **PAC**, czyli przedwczesnemu pobudzeniu przedsionkowemu, **PVC**, czyli przedwczesnym skurczom komorowym oraz **STEMI**, czyli zawałowi mięśnia sercowego z uniesieniem odcinka ST.

**UWAGA**: Poniższe dane są danymi syntetycznymi i są tylko pewnym przybliżeniem rzeczywistych danych EKG!

EKG jest typowym przykładem szeregu czasowego, który można analizować za pomocą dedykowanych metod uczenia maszynowego, w tym sieci neuronowych, np. sieci rekurencyjnych. Jednak nie zawsze wykorzystanie sieci neuronowych jest konieczne, a nawet wskazane. W przypadku niektórych problemów satysfakcjonujące wyniki można uzyskać za pomocą prostszych metod, gdzie kluczowe jest odpowiednie przygotowanie danych. Ich umiejętna analiza pozwala na selekcję kliku metacech - cech zwięźle opisujących próbki ze zbioru danych, np. średniej, minimum, maksimum, odchylenia standardowego, itp. Mogą być one wykorzystane do klasyfikacji zamiast oryginalnych cech. Dzięki temu korzystamy z niskowymiarowych danych wejściowych, przykładowo redukujemy 150-wymiarowy wektor zawierający informacje z oryginalnych kroków czasowych do wektora 4-wymiarowego zawierającego specjalnie przygotowane cechy.

Przykładem zastosowania niewielkiej liczby metacech są modele uczenia maszynowego, które mają działać na urządzeniach wbudowanych lub małych urządzeniach mobilnych, gdzie kluczowe są takie ograniczenia, jak wymóg niskiego poboru energii, mała ilość dostępnej pamięci operacyjnej czy ograniczona moc obliczeniowa. W takich przypadkach wymagane jest zastosowanie prostszych modeli, które są w stanie zapewnić odpowiednią dokładność klasyfikacji przy jednoczesnym zachowaniu wymaganych ograniczeń.

## Zadanie

Przygotuj rozwiązanie (wraz z wytrenowaniem modelu lasu losowego), które spełni wymagania naszego urządzenia wbudowanego. Przeanalizuj dane i przygotuj zestaw **4 metacech**, które dadzą najlepszą zrównoważoną dokładność (ang. *balanced accuracy*) dla problemu klasyfikacji sygnałów EKG. Zbiór danych składa się ze zbioru treningowego oraz walidacyjnego (wraz z etykietami), na którym możesz weryfikować swoje podejście. Twoje rozwiązanie będzie sprawdzane na osobnym (tajnym) zbiorze testowym, w którym liczba obserwacji będzie się różnić od liczby obserwacji w zbiorach treningowym i walidacyjnym. Każda próbka jest opisana 150 wartościami odpowiadającymi kolejnym krokom czasowym oraz jest przypisana do jednej z pięciu następujących klas:

| ID klasy  | Nazwa klasy   | Opis  | Próbki w zbiorze treningowym | Próbki w zbiorze walidacyjnym |
| ------    | ------        | ----  | ---------------------------- | ----------------------------- |
| 0         | normal        | brak anomalii | 1400 | 819 |
| 1         | afib          | Atrial Fibrillation (migotanie przedsionków)| 150 | 142 |
| 2         | pac           | Premature Atrial Contractions (przedwczesne pobudzenie przedsionkowe)| 150 | 191 |
| 3         | pvc           | Premature Ventricular Complex (przedwczesne skurcze komorowe)| 150 | 197 |
| 4         | st_elevation  | ST-elevation myocardial infarction (zawał mięśnia sercowego z uniesieniem odcinka ST) | 150 | 151 |

Nowe cechy powinny zawierać kluczowe informacje diagnostyczne róznicujące powyższe klasy, które pozwolą na skuteczną klasyfikację wymienionych anomalii.

Klasyfikatorem dla tego zadania jest [las losowy](https://pl.wikipedia.org/wiki/Las_losowy) z liczbą drzew decyzyjnych nie większą niż 10 oraz maksymalną głębokością 10. **Rozwiązania niespełniające tych warunków będą dyskwalifikowane!** W przypadku innych parametrów lasu nie ma ograniczeń. Dozwolony jest także preprocessing, czyli wstępne przetwarzanie danych wejściowych (np. zastosowanie normalizacji danych).

### Kryterium Oceny

Twoje rozwiązanie oceniane będzie na tajnym zbiorze testowym na podstawie [zrównoważonej dokładności klasyfikacji (balanced accuracy)](https://scikit-learn.org/dev/modules/generated/sklearn.metrics.balanced_accuracy_score.html):

$$\text{score}(balanced\_accuracy) = 
\begin{cases} 
    0 &\quad \text{jeżeli }  balanced\_accuracy \leq 75 \% \\
    100 &\quad \text{jeżeli }  balanced\_accuracy \geq 98 \% \\
    \dfrac{balanced\_accuracy - 75 \%}{98 \% - 75 \%} &\quad \text{w pozostałych przypadkach}
\end{cases}$$

Oznacza to, że wszystkie rozwiązania, które na zbiorze testowym uzyskają do $75\%$ zrównoważonej dokładności klasyfikacji, otrzymają $0$ punktów, zaś co najmniej $98\%$ zrównoważonej dokładności klasyfikacji, uzyskają maksymalną liczbę punktów za zadanie. Wszystkie zaś wartości z przedziału $75-98\%$ zostaną zamienione na liczbę punktów (między $0$ a $100$) zgodnie z powyższym wzorem.

*Wskazówka*: Twoim wyznacznikiem jakości proponowanego rozwiązania powinien być wynik na zbiorze walidacyjnym.

W zagadnieniach dot. wykrywania chorób dość często mamy do czynienia z niezrównoważonym (niezbalansowanym) zbiorem danych. Chodzi o to, że zazwyczaj wśród danych dominują przykłady *normalne*, odpowiadające osobom zdrowym, a próbki reprezentujące osoby chore zwykle należą do mniejszości. Wyobraźmy sobie sytuację, w której na 100 próbek jedynie 10 dotyczy osób chorych, a pozostałe 90 zdrowych. Wówczas model, który każdej próbce przyporządkowywałby klasę *zdrowy*, osiągnąłby 90% dokładności klasyfikacji, lecz jedynie 50% zrównoważonej dokładności klasyfikacji! Oczywiście taki model byłby bezużyteczny. W takich przypadkach potrzebujemy miary, która lepiej odpowiada potrzebom wynikającym z postawionego problemu i informuje o skuteczności modelu w sposób użyteczny z punktu widzenia jego późniejszego użytkownika.

W tym zadaniu musisz się więc skupić się na tym, by każda z klas była przyporządkowywana prawidłowo.

## Ograniczenia
- Twoje rozwiazanie będzie testowane na Platformie Konkursowej bez dostępu do internetu oraz w środowisku bez GPU.
- Ewaluacja Twojego finalnego rozwiązania na Platformie Konkursowej nie może trwać dłużej niż 1 minutę bez GPU.
- Podczas przygotowania danych należy pamiętać o tym, że:
    - zakazane jest korzystanie z innych niż lasy losowe metod uczenia maszynowego, zarówno nadzorowanego jak i nienadzorowanego (np. autokodery, wielowarstwowe perceptrony i inne sieci neuronowe, maszyny wektorów nośnych (SVM), i inne), dozwolone są jednak metody redukcji wymiarowości, w stylu analizy składowych głównych (PCA);
    - przy konstrukcji metacech można korzystać wyłącznie z funkcji dostępnych standardowo w Pythonie (`v3.11`), a także Numpy (`v2.0.2`) oraz Scipy (`v1.14.1`);
    - można wyznaczyć maksymalnie 4 metacechy,
- Do klasyfikacji można wykorzystać wyłącznie [las losowy (RandomForestClassifier) z biblioteki scikit-learn](https://scikit-learn.org/stable/modules/generated/sklearn.ensemble.RandomForestClassifier.html) (`v1.5.2`):
    - złożony z maksymalnie 10 drzew decyzyjnych (`n_estimators` $\leq 10$);
    - każde drzewo ma mieć maksymalną głębokość równą 10 (`max_depth` $\leq 10$);
    - pozostałe hiperparametry można modyfikować bez ograniczeń;

## Pliki Zgłoszeniowe
Ten notebook uzupełniony o Twoje rozwiązanie (patrz klasa `YourSolution`), w którym przygotujesz zestaw 4 metacech opisujących zbiór danych oraz zestaw hiperparametrów lasu losowego.

## Ewaluacja
Pamiętaj, że podczas sprawdzania flaga `FINAL_EVALUATION_MODE` zostanie ustawiona na `True`.

Za to zadanie możesz zdobyć pomiędzy 0 a 100 punktów. Liczba punktów, którą zdobędziesz, będzie wyliczona na (tajnym) zbiorze testowym na Platformie Konkursowej na podstawie wyżej wspomnianego wzoru, zaokrąglona do liczby całkowitej. Jeśli Twoje rozwiązanie nie będzie spełniało powyższych kryteriów lub nie będzie wykonywać się prawidłowo, otrzymasz za zadanie 0 punktów.

---

## Informacje Uzupełniające

### Zrównoważona Dokładność Klasyfikacji

Niech $C$ będzie liczbą klas, a $N_j$ odpowiada ilości próbek należących do $j$-tej klasy, gdzie $j \in \lbrace 1, ..., C \rbrace$. Ponadto, niech $\hat{y}_{i,j}$ będzie przewidywaną przez model klasą dla $j$-tej próbki należącej w rzeczywistości do $i$-tej klasy. Wówczas zrównoważoną (zbalansowaną) dokładność klasyfikacji możemy wyliczyć następująco:

$$
balanced\_accuracy = \dfrac{1}{C} \sum\limits_{i=1}^{C} \sum\limits_{j=1}^{|N_c|} \dfrac{1}{|N_c|} \cdot \mathbf{1} \left( \hat{y}_{i, j} = i \right),
$$

gdzie $\mathbf{1} \left( \hat{y}_{i, j} = i \right)$ jest funkcją indykatorową, która przyjmuje wartość 1, jeśli $\hat{y}_{i, j} = i$, czyli w sytuacji, w której klasa przewidywana dla $j$-tej próbki jest taka sama jak rzeczywista klasa tej próbki oraz 0 w przeciwnym przypadku. Suma zewnętrzna przebiega po kolejnych klasach, a wewnętrzna po kolejnych próbkach należących do danej klasy.

**Przykład**: Niech
$$\mathbf{y} = [0, 0, 0, 1, 1, 2, 2, 2, 2, 3, 3, 3]$$

będzie wektorem reprezentującym rzeczywiste klasy dla kolejnych próbek, a

$$\mathbf{\hat{y}} = [0, 0, 0, 0, 0, 2, 2, 2, 2, 3, 3, 3]$$

wektorem reprezentującym predykcje modelu dla tychże próbek. Mamy więc do czynienia z czterema klasami, gdzie model miał problem z klasą o numerze $1$. Wszystkie pozostałe przykłady zostały przypisane bezbłędnie. Łącznie 10 na 12 próbek zostało sklasyfikowanych prawidłowo, co oznacza, że gdybyśmy mieli mierzyć "zwykłą" dokładność klasyfikacji, otrzymalibyśmy ok. $83.3\%$ . Jednak gdy przyjrzymy się zbalansowanej dokładności klasyfikacji, otrzymamy wynik $75\%$.

Załóżmy teraz, że

$$\mathbf{\hat{y}} = [0, 0, 0, 1, 0, 2, 2, 2, 2, 3, 3, 3]$$

czyli model klasyfikuje poprawnie $50\%$ próbek z klasy 1 oraz $100\%$ próbek z pozostałych klas. "Zwykła" dokładność klasyfikacji wynosi tutaj niespełna $92\%$, podczas gdy zbalansowana dokładność klasyfikacji wynosi $87.5\%$.

### Anomalie Występujące w Rozważanym Zbiorze Danych

#### AFib
**Atrial Fibrillation (AFib)**, czyli migotanie przedsionków, występuje wtedy, gdy potencjały czynnościowe wyzwalają się bardzo szybko i chaotycznie, w związku z tym rytm serca jest nieregularny. W tym zaburzeniu załamki P mogą nie być widoczne w EKG, a zespół QRS staje się nieregularny.

![AFIB_example.png](https://live.staticflickr.com/65535/54253219357_78c51f06ff_o.png)

#### PAC
**Premature Atrial Contractions (PACs)**, czyli przedwczesne pobudzenie przedsionkowe, związane jest z nieprawidłowym załamkiem P, po którym następuje prawidłowy zespół QRS. *Uwaga!* W próbkach z zadania występują przykłady, w których w ramach jednej próbki ze zbioru danych widoczny jest jedynie przedwczesny załamek P.

![PAC_example.png](https://live.staticflickr.com/65535/54254324138_df77fdd62a_o.png)

#### PVC
**Premature Ventricular Contractions (PVCs)**, czyli przedwczesne skurcze komorowe, są dodatkowymi uderzeniami serca, które rozpoczynają się w jednej z dwóch komór serca i zakłócają jego regularny rytm. Są jednym z powszechnych rodzajów arytmii. Skurcze te zachodzą wcześniej niż byłoby to oczekiwane na podstawie poprzednich odstępów R-R.

![PVC_example.png](https://live.staticflickr.com/65535/54254518540_12ba23c53f_o.png)

#### STEMI
**ST-elevation myocardial infarction (STEMI)**, czyli zawał mięśnia sercowego z uniesieniem odcinka ST, powoduje zablokowanie przepływu krwi do mięśnia sercowego i jego obumarcie. Segment ST występuje tuż po zespole QRS. W normalnej sytuacji nie ma tam żadnej aktywności elektrycznej, przez co jest on płaski. Jeśli zaś występuje uniesienie odcinka ST, oznacza to blokadę jednej z głównych tętnic doprowadzających krew do serca.

![STEMI_example.png](https://live.staticflickr.com/65535/54254099356_422c23144e_o.png)

---

**Źródła opisu medycznego dot. EKG**: [1](https://www.healio.com/cardiology/learn-the-heart/ecg-review/ecg-topic-reviews-and-criteria/premature-ventricular-contractions-review), [2](https://www.mayoclinic.org/diseases-conditions/premature-ventricular-contractions/symptoms-causes/syc-20376757), [3](https://litfl.com/premature-atrial-complex-pac/), [4](https://www.healio.com/cardiology/learn-the-heart/ecg-review/ecg-topic-reviews-and-criteria/premature-atrial-contractions-review), [5](https://www.mayoclinic.org/diseases-conditions/atrial-fibrillation/symptoms-causes/syc-20350624), [6](https://www.healio.com/cardiology/learn-the-heart/ecg-review/ecg-topic-reviews-and-criteria/atrial-fibrillation-review), [7](https://my.clevelandclinic.org/health/diseases/22068-stemi-heart-attack), obraz załamków PQRST na podstawie [8](https://www.sciencedirect.com/science/article/pii/S0213911121002466).

# Kod Startowy

W tej sekcji inicjalizujemy środowisko poprzez zaimportowanie potrzebnych bibliotek i funkcji. Przygotowany kod ułatwi Tobie efektywne operowanie na danych i budowanie właściwego rozwiązania.

## Ładowanie Danych
Za pomocą poniższego kodu wczytujemy dane.

## Publiczny Interfejs Rozwiązania

Tylko tego wymagamy od Twojej klasy. W Twoim rozwiązaniu możesz modyfikować swoją klasę do woli dodając atrybuty oraz nowe metody obliczające metacechy - cokolwiek co będzie Ci potrzebne do rozwiązania zadania.

## Kod z Kryterium Oceniającym
Kod, zbliżony do poniższego, będzie używany do oceny rozwiązania na zbiorze testowym.

## Przykładowe Rozwiązanie

Poniżej przedstawiamy uproszczone rozwiązanie, które służy jako przykład demonstrujący podstawową funkcjonalność notatnika. Może ono posłużyć jako punkt wyjścia do opracowania Twojego rozwiązania.

# Twoje Rozwiązanie

W tej sekcji należy umieścić Twoje rozwiązanie. Wprowadzaj zmiany wyłącznie tutaj!

# Ewaluacja

Uruchomienie poniższej komórki pozwoli sprawdzić, ile punktów zdobyłoby Twoje rozwiązanie na danych walidacyjnych. Przed wysłaniem upewnij się, że cały notebook wykonuje się od początku do końca bez błędów i bez konieczności ingerencji użytkownika po wybraniu opcji "Run All".

Podczas sprawdzania model zostanie zapisany jako `your_model.pkl` i oceniony na zbiorze testowym.

---

## Editorial & Solutions

Full benchmark notebooks and model solutions published by the Polish AI Olympiad committee.
