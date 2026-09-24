# -*- coding: utf-8 -*-
"""
Bộ GD&ĐT - Đề thi Tuyển chọn Đội tuyển Olympic AI Quốc gia (VOAI 2025)
Mã đề: 006 (Phần 1: Câu 1 đến Câu 50).
"""

VOAI_P1_QUESTIONS = [
    {
        "slug": "voai-2025-q01-batchnorm-placement",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Trong mạng nơ-ron, chuẩn hóa lô (Batch Normalization) thường được đặt ở đâu theo thiết kế chuẩn mực?",
        "options": [
            ("A", "Trước hàm kích hoạt ReLU và sau lớp tuyến tính (Linear/Conv)"),
            ("B", "Sau hàm kích hoạt ReLU"),
            ("C", "Sau lớp bỏ ngẫu nhiên (Dropout)"),
            ("D", "Trước lớp đầu vào (Input layer)")
        ],
        "correctAnswer": "A",
        "explanation": "Theo bài báo gốc của Ioffe & Szegedy (2015), Batch Normalization được thiết kế để đặt ngay sau phép biến đổi affine tuyến tính $z = Wx + b$ và trước hàm kích hoạt phi tuyến (ReLU) nhằm chuẩn hóa dữ liệu vào vùng hoạt động tối ưu của hàm phi tuyến.",
        "tags": "voai-2025,batchnorm,deep-learning"
    },
    {
        "slug": "voai-2025-q02-conv-learnable-parameters",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Cơ bản",
        "question": "Thành phần nào sau đây là một tham số có thể học (learnable parameter) trong một lớp tích chập (Convolutional layer)?",
        "options": [
            ("A", "Kích thước của dữ liệu đầu vào (Input shape)"),
            ("B", "Các giá trị trọng số và độ lệch trong bộ lọc (Filter kernel weights & bias)"),
            ("C", "Kích thước bước nhảy (Stride)"),
            ("D", "Kích thước vùng đệm (Padding)")
        ],
        "correctAnswer": "B",
        "explanation": "Các giá trị trong bộ lọc (kernel weights) và bias được tối ưu hóa qua lan truyền ngược (Backpropagation). Trong khi đó Stride, Padding, Kernel size và Input shape là các siêu tham số cấu trúc cố định.",
        "tags": "voai-2025,cnn,convolution,parameters"
    },
    {
        "slug": "voai-2025-q03-loss-not-decreasing-early",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Trung bình",
        "question": "Nếu hàm mất mát (loss) không hề giảm sau 5 vòng lặp (epoch) đầu tiên dù tỷ lệ học là 0.001, bạn nên ưu tiên làm gì đầu tiên?",
        "options": [
            ("A", "Dừng lại và chọn mô hình khác"),
            ("B", "Kiểm tra lại quy trình tiền xử lý dữ liệu (data pipeline), tăng cường dữ liệu (augmentation) và cấu hình bộ tối ưu"),
            ("C", "Tăng vọt tỷ lệ học lên 0.1"),
            ("D", "Tăng gấp đôi số lớp của mô hình")
        ],
        "correctAnswer": "B",
        "explanation": "Khi mô hình không học được ngay từ các epoch đầu tiên, nguyên nhân phổ biến nhất là nhãn sai lệch, chuẩn hóa sai thang đo, rò rỉ dữ liệu hoặc lỗi pipeline. Kiểm tra tính toàn vẹn của dữ liệu và bộ tối ưu là bước chẩn đoán bắt buộc đầu tiên.",
        "tags": "voai-2025,debugging,data-pipeline"
    },
    {
        "slug": "voai-2025-q04-gpt-full-finetuning-limitations",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Trung bình",
        "question": "Hạn chế lớn nhất khi tinh chỉnh (fine-tune) toàn bộ tham số của mô hình ngôn ngữ lớn như GPT là gì?",
        "options": [
            ("A", "Không dùng được với tiếng Việt"),
            ("B", "Cần tài nguyên tính toán và bộ nhớ VRAM rất lớn"),
            ("C", "Không thể gọi qua API"),
            ("D", "Mô hình không sinh được hình ảnh")
        ],
        "correctAnswer": "B",
        "explanation": "Tinh chỉnh toàn bộ tham số (Full Parameter Fine-tuning) của LLM đòi hỏi lưu trữ trọng số, gradient và các optimizer states (như Adam cần gấp 4-8 lần bộ nhớ mô hình), đòi hỏi cụm phần cứng GPU chuyên dụng cực kỳ đắt đỏ. Vì vậy các kỹ thuật PEFT (LoRA, QLoRA) ra đời để giải quyết bài toán này.",
        "tags": "voai-2025,gpt,llm,fine-tuning"
    },
    {
        "slug": "voai-2025-q05-resnet50-feature-extraction",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Cơ bản",
        "question": "Khi muốn trích xuất vector đặc trưng ngữ nghĩa (feature embeddings) từ ResNet-50 cho bài toán tìm kiếm ảnh tương đồng, bạn nên làm gì?",
        "options": [
            ("A", "Sử dụng bộ tối ưu Adam"),
            ("B", "Sử dụng đầu ra từ lớp gần cuối (lớp trung bình toàn cục avgpool / penultimate layer)"),
            ("C", "Thêm nhiều lớp bỏ ngẫu nhiên (dropout)"),
            ("D", "Thêm lớp kết nối đầy đủ siêu tốc mới")
        ],
        "correctAnswer": "B",
        "explanation": "Để biến mô hình phân loại thành bộ trích xuất đặc trưng (feature extractor), ta bỏ lớp phân loại cuối cùng (Linear FC) và lấy đầu ra tại lớp `avgpool`, thu được vector đặc trưng cô đọng 2048 chiều cho mỗi ảnh.",
        "tags": "voai-2025,resnet50,feature-extraction"
    },
    {
        "slug": "voai-2025-q06-bow-pytorch-binary-classification",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Trung bình",
        "question": "Trong PyTorch, đoạn mã nào sau đây là chuẩn mực và ổn định số học nhất để huấn luyện mô hình phân loại nhị phân đơn giản với vector đặc trưng Bag-of-Words (1 lớp tuyến tính)?",
        "options": [
            ("A", "`model = nn.Linear(X_train.shape[1], 1)` kết hợp `loss_fn = nn.BCEWithLogitsLoss()`"),
            ("B", "`model = nn.Sequential(nn.Linear(X_train.shape[1], 10), nn.ReLU(), nn.Linear(10, 2))` kết hợp `nn.NLLLoss()`"),
            ("C", "`model = nn.Linear(X_train.shape[1], 2)` kết hợp `nn.CrossEntropyLoss()` mà không định nghĩa nhãn dạng LongTensor"),
            ("D", "`model = nn.Linear(X_train.shape[1], 1)` kết hợp `nn.MSELoss()`")
        ],
        "correctAnswer": "A",
        "explanation": "Với phân loại nhị phân, thiết kế tối ưu nhất trong PyTorch là xuất 1 logit duy nhất và sử dụng `BCEWithLogitsLoss()`. Hàm này gộp phép biến đổi sigmoid và binary cross-entropy bằng kỹ thuật log-sum-exp, đảm bảo tính ổn định số học chống tràn số (numerical stability).",
        "tags": "voai-2025,pytorch,bow,binary-classification"
    },
    {
        "slug": "voai-2025-q07-svm-vs-knn-comparison",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Điều nào sau đây là ĐÚNG khi so sánh thuật toán Máy vector hỗ trợ (SVM) với K-láng giềng gần nhất (k-NN)?",
        "options": [
            ("A", "Cả hai phương pháp chỉ được sử dụng cho các bài toán phân loại, không thể dùng cho hồi quy"),
            ("B", "Huấn luyện SVM có thể tốn kém tính toán trên tập dữ liệu lớn ($O(N^2) - O(N^3)$), trong khi k-NN là thuật toán 'học lười' (lazy learning) không có pha huấn luyện tường minh"),
            ("C", "SVM luôn cho kết quả vượt trội hơn k-NN trên mọi tập dữ liệu"),
            ("D", "Dự đoán của cả hai phương pháp đều chậm như nhau khi có mẫu mới")
        ],
        "correctAnswer": "B",
        "explanation": "k-NN chỉ đơn giản lưu trữ toàn bộ dữ liệu mẫu trong pha huấn luyện ($O(1)$) và chỉ tính khoảng cách khi có truy vấn dự đoán ($O(N \\cdot D)$). Ngược lại, SVM cần giải bài toán tối ưu lồi bậc hai Quadratic Programming có chi phí lớn trong pha huấn luyện, nhưng pha dự đoán cực nhanh vì chỉ phụ thuộc vào số lượng Support Vectors.",
        "tags": "voai-2025,svm,knn,comparison"
    },
    {
        "slug": "voai-2025-q08-nonlinear-svm-inference-kernel",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Đối với mô hình SVM phi tuyến sử dụng hàm nhân (kernel SVM), để thực hiện dự đoán trên mẫu dữ liệu mới, khẳng định nào sau đây là ĐÚNG?",
        "options": [
            ("A", "Cần sử dụng cùng hàm chuyển đổi nhân (kernel function) với các tham số tương tự như trong giai đoạn huấn luyện"),
            ("B", "Sử dụng một hàm chuyển đổi nhân khác để tăng tính đa dạng"),
            ("C", "SVM phi tuyến luôn tốt hơn SVM tuyến tính trong mọi trường hợp"),
            ("D", "Giai đoạn dự đoán không cần sử dụng hàm chuyển đổi")
        ],
        "correctAnswer": "A",
        "explanation": "Hàm quyết định của SVM phi tuyến là $f(x) = \\text{sign}\\left(\\sum_{i \\in SV} \\alpha_i y_i K(x_i, x) + b\\right)$. Việc tính toán khoảng cách/tích vô hướng trong không gian đặc trưng bắt buộc phải sử dụng cùng hàm nhân $K(x_i, x)$ đã dùng để tối ưu các trọng số $\\alpha_i$.",
        "tags": "voai-2025,svm,kernel-trick"
    },
    {
        "slug": "voai-2025-q09-torchvision-pretrained-resnet18",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Cơ bản",
        "question": "Khi sử dụng lệnh `torchvision.models.resnet18(pretrained=True)` trong PyTorch, mục đích chính là gì?",
        "options": [
            ("A", "Huấn luyện lại mô hình từ đầu với trọng số ngẫu nhiên"),
            ("B", "Tăng kích thước lô dữ liệu huấn luyện"),
            ("C", "Thử nghiệm cấu trúc mô hình mới"),
            ("D", "Sử dụng trọng số huấn luyện trước (pre-trained weights) trên ImageNet để trích xuất đặc trưng hoặc làm điểm khởi tạo tốt cho transfer learning")
        ],
        "correctAnswer": "D",
        "explanation": "Trọng số tiền huấn luyện trên tập dữ liệu lớn ImageNet-1K giúp mô hình sở hữu khả năng nhận diện các đặc trưng thị giác khái quát (cạnh, vân bề mặt, hình dạng), đẩy nhanh tốc độ hội tụ và cải thiện độ chính xác trên các bài toán mục tiêu mới.",
        "tags": "voai-2025,pytorch,torchvision,transfer-learning"
    },
    {
        "slug": "voai-2025-q10-nms-iou-filtering-boxes",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Trung bình",
        "question": """Áp dụng thuật toán Non-Maximum Suppression (NMS) với ngưỡng $\\text{IoU\\_threshold} = 0.40$ trên 3 bounding box sau:
- $B_1: (0, 0, 100, 100)$, độ tin cậy $0.95$
- $B_2: (10, 10, 90, 90)$, độ tin cậy $0.90$
- $B_3: (105, 105, 200, 200)$, độ tin cậy $0.85$

Những hộp nào sẽ được giữ lại trong danh sách kết quả cuối cùng?""",
        "options": [
            ("A", "$B_1$ và $B_2$"),
            ("B", "Chỉ $B_1$"),
            ("C", "$B_1$ và $B_3$"),
            ("D", "$B_2$ và $B_3$")
        ],
        "correctAnswer": "C",
        "explanation": """1. Sắp xếp: $B_1 (0.95) > B_2 (0.90) > B_3 (0.85)$.
2. Chọn $B_1$ vào tập kết quả.
3. So sánh $B_2$ với $B_1$: Vùng giao nhau là $[10, 90] \\times [10, 90]$ có diện tích $80 \\times 80 = 6400$. Diện tích $B_1 = 10000, B_2 = 6400$. Diện tích hợp: $10000 + 6400 - 6400 = 10000$. Chỉ số $\\text{IoU} = 6400 / 10000 = 0.64 > 0.40 \\implies B_2$ bị loại!
4. So sánh $B_3$ với $B_1$: $B_3$ bắt đầu từ tọa độ 105, không chồng lấn với $B_1$ (tối đa 100) $\\implies \\text{IoU} = 0 \\le 0.40 \\implies B_3$ được chọn.
Kết quả giữ lại $B_1$ và $B_3$.""",
        "tags": "voai-2025,nms,iou,object-detection"
    },
    {
        "slug": "voai-2025-q11-pandas-head-method",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Trong thư viện Pandas, phương thức nào dùng để lấy 5 dòng đầu tiên của một DataFrame?",
        "options": [
            ("A", "`df.head()`"),
            ("B", "`df.take(5)`"),
            ("C", "`df.top()`"),
            ("D", "`df.first(5)`")
        ],
        "correctAnswer": "A",
        "explanation": "`df.head(n=5)` trả về $n$ hàng đầu tiên của DataFrame, mặc định nếu không truyền tham số sẽ lấy 5 dòng.",
        "tags": "voai-2025,pandas,dataframe"
    },
    {
        "slug": "voai-2025-q12-bagging-random-forest",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Thuật toán học máy nào sau đây là phổ biến và hiệu quả nhất, dựa trên nguyên lý kết hợp Bagging (Bootstrap Aggregating)?",
        "options": [
            ("A", "XGBoost"),
            ("B", "Hồi quy tuyến tính (Linear Regression)"),
            ("C", "Cây quyết định đơn lẻ (Decision Tree)"),
            ("D", "Rừng ngẫu nhiên (Random Forest)")
        ],
        "correctAnswer": "D",
        "explanation": "Random Forest áp dụng kỹ thuật Bagging (lấy mẫu có hoàn lại trên tập dữ liệu) kết hợp lấy mẫu ngẫu nhiên không gian đặc trưng (Feature Random Subspace) để huấn luyện song song nhiều cây quyết định, giúp giảm phương sai (variance) hiệu quả. XGBoost thuộc họ Boosting.",
        "tags": "voai-2025,bagging,random-forest,ensemble"
    },
    {
        "slug": "voai-2025-q13-pca-noise-outlier-reduction",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Toán học & Ma trận",
        "difficulty": "Trung bình",
        "question": "Kỹ thuật nào sau đây được sử dụng để giảm chiều không gian dữ liệu, giúp hạn chế ảnh hưởng của nhiễu và các đặc trưng tương quan dư thừa?",
        "options": [
            ("A", "Phân tích thành phần chính (Principal Component Analysis - PCA)"),
            ("B", "Chính quy hóa (Regularization)"),
            ("C", "Xác thực chéo (Cross-validation)"),
            ("D", "Tăng cường dữ liệu (Data Augmentation)")
        ],
        "correctAnswer": "A",
        "explanation": "PCA tìm các trục trực giao có phương sai lớn nhất. Bằng cách chỉ giữ lại các thành phần chính mang phần lớn phương sai của dữ liệu và loại bỏ các thành phần có phương sai cực nhỏ (thường đại diện cho nhiễu ngẫu nhiên), PCA giúp nén dữ liệu và giảm nhiễu hiệu quả.",
        "tags": "voai-2025,pca,dimensionality-reduction"
    },
    {
        "slug": "voai-2025-q14-nlp-preprocessing-order",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": """Trong quy trình xử lý ngôn ngữ tự nhiên (NLP) kinh điển, thứ tự đúng của các bước xử lý cơ bản là:
1. Tách từ (Tokenization)
2. Chuẩn hóa văn bản (Normalization)
3. Rút gọn từ (Stemming/Lemmatization)
4. Gắn nhãn từ loại (Part-of-speech tagging)""",
        "options": [
            ("A", "$2 \\to 1 \\to 4 \\to 3$"),
            ("B", "$2 \\to 1 \\to 3 \\to 4$"),
            ("C", "$1 \\to 3 \\to 2 \\to 4$"),
            ("D", "$1 \\to 2 \\to 4 \\to 3$")
        ],
        "correctAnswer": "B",
        "explanation": "Trình tự chuẩn: (2) Chuẩn hóa văn bản (viết thường, xóa khoảng trắng thừa, loại bỏ ký tự lạ) $\\to$ (1) Tách từ thành chuỗi token $\\to$ (3) Rút gọn gốc từ $\\to$ (4) Phân tích cú pháp / Gắn nhãn từ loại.",
        "tags": "voai-2025,nlp,pipeline,tokenization"
    },
    {
        "slug": "voai-2025-q15-adaptive-learning-rate-benefit",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Tối ưu hóa & Đạo đức AI",
        "difficulty": "Cơ bản",
        "question": "Tại sao các bộ tối ưu có tốc độ học thích ứng (Adaptive Learning Rate như Adam, RMSprop) lại rất hữu ích trong thực tế?",
        "options": [
            ("A", "Làm mô hình huấn luyện ngẫu nhiên hơn"),
            ("B", "Tự động điều chỉnh tốc độ học riêng biệt cho từng tham số dựa trên độ lớn lịch sử của gradient"),
            ("C", "Tránh tràn số bộ nhớ RAM"),
            ("D", "Loại bỏ hoàn toàn nguy cơ quá khớp")
        ],
        "correctAnswer": "B",
        "explanation": "Các tham số xuất hiện thưa thớt (sparse features) nhận được bước cập nhật lớn hơn, trong khi các tham số có gradient dao động mạnh nhận được bước cập nhật cẩn thận hơn, giúp tăng tốc độ hội tụ mà không cần tinh chỉnh thủ công tốc độ học cho từng lớp.",
        "tags": "voai-2025,optimizer,adaptive-lr,adam"
    },
    {
        "slug": "voai-2025-q16-chain-of-thought-prompting",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": "Kỹ thuật Chuỗi suy luận (Chain-of-Thought - CoT) trong mô hình ngôn ngữ lớn (LLM) là gì?",
        "options": [
            ("A", "Yêu cầu mô hình trả lời càng ngắn gọn càng tốt để tiết kiệm tokens"),
            ("B", "Huấn luyện mô hình dự đoán từ tiếp theo bằng dữ liệu song ngữ"),
            ("C", "Yêu cầu mô hình sinh câu hỏi thay vì câu trả lời"),
            ("D", "Thúc đẩy mô hình giải bài toán bằng cách liệt kê từng bước suy luận trung gian trước khi đưa ra đáp án cuối cùng")
        ],
        "correctAnswer": "D",
        "explanation": "Chain-of-Thought prompting (Wei et al., 2022) yêu cầu mô hình phân rã bài toán thành các bước lý giải tuần tự, giúp tận dụng không gian tính toán qua từng token sinh ra để tăng đột biến độ chính xác trong suy luận toán học và logic.",
        "tags": "voai-2025,llm,chain-of-thought,prompting"
    },
    {
        "slug": "voai-2025-q17-weighted-knn-distance",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Trung bình",
        "question": "Khi gán trọng số cho các thuộc tính đặc trưng trong thuật toán k-NN, điều này được thực hiện như thế nào trong phép toán?",
        "options": [
            ("A", "Cập nhật giá trị thuộc tính theo thời gian"),
            ("B", "Thêm các thuộc tính quan trọng vào cuối vector"),
            ("C", "Điều chỉnh phép tính khoảng cách bằng cách nhân từng thuộc tính với trọng số tầm quan trọng tương ứng ($d_w = \\sqrt{\\sum w_i (x_i - y_i)^2}$)"),
            ("D", "Nhân ma trận nhầm lẫn với ma trận nghịch đảo")
        ],
        "correctAnswer": "C",
        "explanation": "Trong Weighted k-NN theo đặc trưng, các chiều dữ liệu quan trọng hơn được nhân với hệ số trọng số $w_i > 0$ lớn hơn, khiến khoảng cách giữa các mẫu nhạy bén hơn với sự khác biệt trên các thuộc tính mang tính quyết định.",
        "tags": "voai-2025,knn,distance-metric,weighted"
    },
    {
        "slug": "voai-2025-q18-kmeans-centroid-update-step",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": """Trong không gian 2 chiều, sau vòng lặp đầu tiên của K-means ($K=3$), các cụm chứa các điểm dữ liệu như sau:
- $C_1$ chứa: $(0, 6)$ và $(6, 0)$
- $C_2$ chứa: $(2, 2), (4, 4)$ và $(6, 6)$
- $C_3$ chứa: $(5, 5)$ và $(7, 7)$

Tọa độ tâm cụm mới của $C_1, C_2, C_3$ sau bước cập nhật là:""",
        "options": [
            ("A", "$C_1: (0, 0), C_2: (48, 48), C_3: (35, 35)$"),
            ("B", "$C_1: (3, 3), C_2: (4, 4), C_3: (6, 6)$"),
            ("C", "$C_1: (6, 6), C_2: (12, 12), C_3: (12, 12)$"),
            ("D", "$C_1: (3, 3), C_2: (6, 6), C_3: (12, 12)$")
        ],
        "correctAnswer": "B",
        "explanation": """Tâm cụm là trung bình cộng tọa độ:
- $C_1 = ((0+6)/2, (6+0)/2) = (3, 3)$
- $C_2 = ((2+4+6)/3, (2+4+6)/3) = (4, 4)$
- $C_3 = ((5+7)/2, (5+7)/2) = (6, 6)$.""",
        "tags": "voai-2025,kmeans,centroids,calculation"
    },
    {
        "slug": "voai-2025-q19-glove-embedding-creation",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Trung bình",
        "question": "Phương pháp biểu diễn từ GloVe (Global Vectors) được xây dựng dựa trên nguyên lý nền tảng nào?",
        "options": [
            ("A", "Được tạo ra trong quá trình huấn luyện dịch máy nơ-ron"),
            ("B", "Sử dụng cơ chế self-attention để mã hóa ngữ cảnh"),
            ("C", "Được tối ưu hóa dựa trên việc phân rã ma trận đồng xuất hiện (co-occurrence matrix) toàn cục của các từ trong văn bản"),
            ("D", "Biểu diễn dưới dạng vector one-hot thưa thớt")
        ],
        "correctAnswer": "C",
        "explanation": "GloVe (Pennington et al., 2014) kết hợp thế mạnh của thống kê tần suất đồng xuất hiện toàn cục (global co-occurrence statistics) với phương pháp cửa sổ ngữ cảnh cục bộ (như Skip-Gram), tối ưu hóa hàm log-bilinear model.",
        "tags": "voai-2025,nlp,glove,word-embeddings"
    },
    {
        "slug": "voai-2025-q20-bert-input-components",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": "Một mô hình BERT tiêu chuẩn nhận các tensor đầu vào nào để biểu diễn văn bản?",
        "options": [
            ("A", "Token IDs (từ vựng), Attention Mask (mặt nạ chú ý), và Token Type IDs / Segment IDs (phân biệt câu A và B)"),
            ("B", "Chỉ duy nhất một chuỗi văn bản thô (raw string)"),
            ("C", "Ma trận tương đồng ngữ nghĩa cosin"),
            ("D", "Các vector one-hot không qua nhúng")
        ],
        "correctAnswer": "A",
        "explanation": "Đầu vào biểu diễn của BERT tại mỗi vị trí token được cấu thành từ tổng của 3 lớp nhúng: Token Embeddings + Segment Embeddings (Token Type) + Position Embeddings, kèm theo tensor Attention Mask để bỏ qua các token đệm ([PAD]).",
        "tags": "voai-2025,bert,nlp,token-embeddings"
    },
    {
        "slug": "voai-2025-q21-gpt-qa-model-choice",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": "Nếu muốn sử dụng mô hình sinh văn bản tự động để giải đáp câu hỏi dựa trên một đoạn tài liệu cho trước, phương án nào sau đây mang lại hiệu quả cao nhất?",
        "options": [
            ("A", "BERT cơ sở không fine-tune"),
            ("B", "GPT-2 bản gốc"),
            ("C", "Word2Vec"),
            ("D", "GPT-3.5 hoặc GPT-4 kết hợp với kỹ thuật tạo câu nhắc (Prompt Engineering / RAG) phù hợp")
        ],
        "correctAnswer": "D",
        "explanation": "Các mô hình ngôn ngữ lớn hiện đại (GPT-3.5/GPT-4) được huấn luyện qua RLHF có khả năng tuân thủ chỉ thị cao và trích xuất thông tin chính xác từ đoạn ngữ cảnh được cung cấp trong prompt.",
        "tags": "voai-2025,gpt,qa,rag"
    },
    {
        "slug": "voai-2025-q22-dropout-val-acc-drop",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Trung bình",
        "question": "Nếu bạn thêm lớp bỏ ngẫu nhiên (Dropout) vào mạng nơ-ron nhưng thấy độ chính xác trên tập kiểm định (validation accuracy) bị sụt giảm mạnh, bạn nên thử giải pháp nào đầu tiên?",
        "options": [
            ("A", "Dùng bộ tối ưu khác"),
            ("B", "Giảm xác suất bỏ ngẫu nhiên $p$ xuống mức nhỏ hơn (ví dụ: từ 0.5 xuống 0.1 - 0.2)"),
            ("C", "Tắt toàn bộ hàm kích hoạt phi tuyến"),
            ("D", "Tăng xác suất bỏ ngẫu nhiên lên 0.8")
        ],
        "correctAnswer": "B",
        "explanation": "Tỷ lệ dropout quá cao làm suy giảm dung lượng biểu diễn của mạng, khiến mô hình không đủ sức học các đặc trưng cốt lõi (underfitting). Giảm tỷ lệ dropout là bước cân bằng chuẩn xác.",
        "tags": "voai-2025,dropout,regularization,hyperparameter-tuning"
    },
    {
        "slug": "voai-2025-q23-context-aware-text-classification",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": "Trong bài toán phân loại văn bản, nếu mô hình học tốt các từ khóa riêng lẻ nhưng không hiểu được ngữ cảnh phức tạp và quan hệ đảo nghĩa, phương pháp nào giúp cải thiện khả năng hiểu ngữ cảnh?",
        "options": [
            ("A", "Giảm số chiều của vector nhúng"),
            ("B", "Sử dụng các mô hình dựa trên cơ chế chú ý ngữ cảnh hai chiều (attention-based) như BERT / RoBERTa"),
            ("C", "Chuyển sang dùng bảng từ vựng TF-IDF"),
            ("D", "Dùng vector one-hot nhị phân")
        ],
        "correctAnswer": "B",
        "explanation": "BERT sử dụng Transformer Encoder với cơ chế Self-Attention đa đầu hai chiều, cho phép mỗi từ tương tác và nhận biết ngữ cảnh từ toàn bộ các từ xung quanh trong câu, khắc phục nhược điểm mất ngữ cảnh của BoW và TF-IDF.",
        "tags": "voai-2025,nlp,bert,attention,context"
    },
    {
        "slug": "voai-2025-q24-1nn-prediction-formula",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": """Trong phương pháp 1-Láng giềng gần nhất (1-NN), nhãn dự đoán $y^*$ cho điểm truy vấn $x$ dựa trên tập huấn luyện $D = \\{(a_i, y_i)\\}$ và thước đo khoảng cách $d$ được biểu diễn chính xác bằng công thức nào?""",
        "options": [
            ("A", "$y^* = \\max_{(a, y) \\in D} d(x, a)$"),
            ("B", "$y^*$ trong đó $(a^*, y^*) = \\arg\\min_{(a, y) \\in D} d(x, a)$"),
            ("C", "$a^*$ trong đó $(a^*, y^*) = \\arg\\min_{(a, y) \\in D} d(x, a)$"),
            ("D", "$y^* = \\min_{(a, y) \\in D} d(x, a)$")
        ],
        "correctAnswer": "B",
        "explanation": "1-NN tìm điểm huấn luyện $a^*$ có khoảng cách Euclid nhỏ nhất tới $x$ ($a^* = \\arg\\min d(x, a)$) và gán nhãn dự đoán $y^*$ chính là nhãn tương ứng của mẫu láng giềng đó.",
        "tags": "voai-2025,knn,1nn,math-formula"
    },
    {
        "slug": "voai-2025-q25-3nn-classification-query",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Trung bình",
        "question": """Cho tập huấn luyện 8 mẫu với 3 đặc trưng $(F_1, F_2, F_3)$:
- $S_1: (2, 2, 0)$ [Đỏ], $S_2: (1, 3, 1)$ [Đỏ], $S_3: (0, 2, 2)$ [Đỏ]
- $S_4: (8, 7, 7)$ [Xanh dương], $S_5: (9, 6, 6)$ [Xanh dương], $S_6: (7, 7, 8)$ [Xanh dương]
- $S_7: (5, 2, 5)$ [Xanh lá], $S_8: (6, 1, 4)$ [Xanh lá]

Sử dụng thuật toán 3-NN (khoảng cách Euclid), điểm truy vấn $Q = (6, 2, 6)$ được dự đoán thuộc lớp nào?""",
        "options": [
            ("A", "Xanh dương"),
            ("B", "Đỏ"),
            ("C", "Xanh lá"),
            ("D", "Hòa thuật toán không thể quyết định")
        ],
        "correctAnswer": "C",
        "explanation": """Tính bình phương khoảng cách $d^2$ từ $Q(6,2,6)$:
- $S_7(5,2,5): (6-5)^2 + 0^2 + (6-5)^2 = 1 + 0 + 1 = 2$ (Rất gần)
- $S_8(6,1,4): 0^2 + (2-1)^2 + (6-4)^2 = 0 + 1 + 4 = 5$
- $S_6(7,7,8): (6-7)^2 + (2-7)^2 + (6-8)^2 = 1 + 25 + 4 = 30$
- $S_4(8,7,7): (6-8)^2 + (2-7)^2 + (6-7)^2 = 4 + 25 + 1 = 30$
3 láng giềng gần nhất là $S_7$ [Xanh lá], $S_8$ [Xanh lá] và $S_6$ hoặc $S_4$ [Xanh dương].
Số phiếu: 2 Xanh lá vs 1 Xanh dương $\\implies$ Dự đoán lớp Xanh lá.""",
        "tags": "voai-2025,knn,euclidean-distance,calculation"
    },
    {
        "slug": "voai-2025-q26-conv2d-feature-map-edges",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Cơ bản",
        "question": "Khi áp dụng một bộ lọc Conv2D dạng toán tử vi sai (Sobel / Laplacian) lên ảnh đầu vào, bản đồ đặc trưng thu được làm nổi bật yếu tố thị giác nào rõ ràng nhất?",
        "options": [
            ("A", "Các đường biên cạnh và viền chi tiết (Edges / Contours)"),
            ("B", "Các đốm màu đồng nhất (Color blobs)"),
            ("C", "Độ sáng trung bình toàn ảnh"),
            ("D", "Độ sâu 3D của camera")
        ],
        "correctAnswer": "A",
        "explanation": "Các bộ lọc đạo hàm bậc nhất hoặc bậc hai phản ứng mạnh với các vùng có cường độ pixel biến thiên đột ngột, giúp trích xuất và làm sắc nét các đường biên cạnh (edges) trong ảnh.",
        "tags": "voai-2025,edge-detection,conv2d,feature-maps"
    },
    {
        "slug": "voai-2025-q27-tf-conv2d-output-shape",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Trung bình",
        "question": """Đoạn mã sau sử dụng TensorFlow:
```python
input_tensor = tf.constant(tf.random.normal(shape=(1, 32, 32, 3)))
conv_layer = tf.keras.layers.Conv2D(filters=32, kernel_size=(5, 5), strides=(2, 2), padding='same')
output_tensor = conv_layer(input_tensor)
```
Kích thước `output_tensor.shape` là bao nhiêu?""",
        "options": [
            ("A", "$(1, 16, 16, 32)$"),
            ("B", "$(1, 16, 16, 3)$"),
            ("C", "$(1, 14, 14, 32)$"),
            ("D", "$(1, 32, 32, 32)$")
        ],
        "correctAnswer": "A",
        "explanation": "Với `padding='same'` và `stride=2`, kích thước không gian được tính theo: $\\lceil 32 / 2 \\rceil = 16$. Số bộ lọc `filters=32` quyết định số kênh đầu ra. Kích thước batch giữ nguyên = 1. Do đó shape là $(1, 16, 16, 32)$.",
        "tags": "voai-2025,tensorflow,conv2d,shapes"
    },
    {
        "slug": "voai-2025-q28-negative-sampling-purpose",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Trung bình",
        "question": "Mục đích chính của kỹ thuật Lấy mẫu phủ định (Negative Sampling) trong mô hình Word2Vec (Skip-gram) là gì?",
        "options": [
            ("A", "Tăng số lượng tham số của mô hình"),
            ("B", "Giúp mô hình sinh ra văn bản dài hơn"),
            ("C", "Giúp cải thiện độ chính xác trên bài toán dịch máy"),
            ("D", "Giảm thiểu chi phí tính toán hàm Softmax mẫu số trên toàn bộ tập từ vựng khổng lồ")
        ],
        "correctAnswer": "D",
        "explanation": "Thay vì tính hàm softmax trên toàn bộ từ vựng $V$ (đòi hỏi tính tổng mẫu số với $10^5 - 10^6$ từ có độ phức tạp $O(|V|)$), Negative Sampling biến bài toán thành phân loại nhị phân giữa cặp từ đúng và $k$ từ âm tính ngẫu nhiên, giảm độ phức tạp xuống $O(k)$.",
        "tags": "voai-2025,word2vec,negative-sampling,optimization"
    },
    {
        "slug": "voai-2025-q29-adam-loss-plateau-action",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Tối ưu hóa & Đạo đức AI",
        "difficulty": "Trung bình",
        "question": "Khi sử dụng bộ tối ưu Adam, nếu hàm mất mát huấn luyện ngừng giảm sớm (plateau), bạn nên thử bước xử lý nào tiếp theo?",
        "options": [
            ("A", "Khởi tạo lại toàn bộ mô hình ngẫu nhiên"),
            ("B", "Tăng kích thước lô (batch size) lên tối đa"),
            ("C", "Bỏ qua lớp chuẩn hóa lô (BatchNorm)"),
            ("D", "Giảm tỷ lệ học (learning rate decay / scheduler) hoặc thử chuyển sang SGD với Momentum để thoát khỏi cực tiểu cục bộ hẹp")
        ],
        "correctAnswer": "D",
        "explanation": "Khi hàm mất mát bị đình trệ (loss plateau), việc giảm learning rate (ví dụ dùng ReduceLROnPlateau) giúp bộ tối ưu tinh chỉnh các bước đi nhỏ hơn. Ngoài ra, chuyển sang SGD có đà (Momentum) thường giúp mô hình khái quát hóa tốt hơn.",
        "tags": "voai-2025,adam,learning-rate,plateau"
    },
    {
        "slug": "voai-2025-q30-self-supervised-contrastive-learning",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Trung bình",
        "question": "Trong học tự giám sát (Self-supervised Learning) cho thị giác máy tính, phương pháp nào sau đây được sử dụng phổ biến nhất để học biểu diễn đặc trưng không cần nhãn?",
        "options": [
            ("A", "Đầu phân loại nhị phân thủ công"),
            ("B", "Phân cụm K-means trên ảnh thô"),
            ("C", "Tăng cường dữ liệu (Data Augmentation) kết hợp hàm mất mát đối lập (Contrastive Loss như SimCLR, MoCo)"),
            ("D", "Gán nhãn bằng tay cho một phần dữ liệu")
        ],
        "correctAnswer": "C",
        "explanation": "Học đối lập (Contrastive Learning) tạo ra hai góc nhìn (views) khác nhau từ cùng một ảnh gốc qua data augmentation và kéo biểu diễn của chúng lại gần nhau, đồng thời đẩy xa biểu diễn của các ảnh khác trong batch.",
        "tags": "voai-2025,self-supervised,contrastive-learning,simclr"
    },
    {
        "slug": "voai-2025-q31-knn-feature-scaling-importance",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Chuẩn hóa đặc trưng (Feature Scaling / Normalization) đặc biệt quan trọng đối với thuật toán k-NN vì lý do gì?",
        "options": [
            ("A", "Giúp tránh việc thuộc tính có thang đo lớn áp đảo và chi phối hoàn toàn phép tính khoảng cách Euclid"),
            ("B", "Bắt buộc đưa tất cả giá trị về đoạn $[0, 1]$ để máy tính không bị lỗi"),
            ("C", "Làm thay đổi số lượng láng giềng $k$"),
            ("D", "Chuyển bài toán phi tuyến thành bài toán tuyến tính")
        ],
        "correctAnswer": "A",
        "explanation": "Khoảng cách Euclid $d = \\sqrt{\\sum (x_i - y_i)^2}$ rất nhạy cảm với thang đo. Nếu một thuộc tính có phạm vi $0 - 100,000$ (như thu nhập) và thuộc tính khác có phạm vi $0 - 1$ (như tuổi chuẩn hóa), thuộc tính lớn sẽ chiếm 99.9% giá trị khoảng cách, biến các thuộc tính nhỏ thành vô nghĩa.",
        "tags": "voai-2025,knn,normalization,scaling"
    },
    {
        "slug": "voai-2025-q32-average-pooling-calculation",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Trung bình",
        "question": """Cho bản đồ đặc trưng ma trận $4 \\times 4$:
$$\\begin{bmatrix}
10 & 20 & 30 & 40 \\\\
50 & 60 & 70 & 80 \\\\
90 & 100 & 110 & 120 \\\\
130 & 140 & 150 & 160
\\end{bmatrix}$$
Tính giá trị tại vị trí $(0, 0)$ của bản đồ đầu ra sau khi áp dụng lớp gộp trung bình (Average Pooling) với kích thước cửa sổ $3 \\times 3$ và bước trượt stride = 2.""",
        "options": [
            ("A", "55"),
            ("B", "70"),
            ("C", "60"),
            ("D", "50")
        ],
        "correctAnswer": "C",
        "explanation": """Cửa sổ $3 \\times 3$ tại vị trí $(0, 0)$ bao gồm 9 phần tử:
- Hàng 1: 10, 20, 30
- Hàng 2: 50, 60, 70
- Hàng 3: 90, 100, 110
Tổng = $(10+20+30) + (50+60+70) + (90+100+110) = 60 + 180 + 300 = 540$.
Giá trị trung bình: $540 / 9 = 60$.""",
        "tags": "voai-2025,average-pooling,calculation,cv"
    },
    {
        "slug": "voai-2025-q33-resnet50-identity-fc-code",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Trung bình",
        "question": """Xét đoạn mã PyTorch:
```python
import torch, torchvision.models as models
model = models.resnet50(weights='DEFAULT')
for p in model.parameters(): p.requires_grad = False
model.fc = torch.nn.Identity()
x = torch.randn(1, 3, 224, 224)
# <--- điền vào đây
print(features.shape) # Output mong đợi: torch.Size([1, 2048])
```
Dòng lệnh nào dưới đây để gán vào `features` nhằm trả về vector đặc trưng?""",
        "options": [
            ("A", "`features = model(x)`"),
            ("B", "`features = model.layer4(x)`"),
            ("C", "`features = model.avgpool(x)`"),
            ("D", "`features = x`")
        ],
        "correctAnswer": "A",
        "explanation": "Bằng cách gán `model.fc = torch.nn.Identity()`, lớp phân loại tuyến tính cuối cùng được thay thế bằng hàm đồng nhất. Khi gọi trực tiếp `model(x)`, luồng tính toán đi qua toàn bộ backbone và lớp `avgpool`, trả về tensor đặc trưng $(1, 2048)$.",
        "tags": "voai-2025,pytorch,resnet50,feature-extraction"
    },
    {
        "slug": "voai-2025-q34-finetuning-not-an-advantage",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Trung bình",
        "question": "Khi áp dụng tinh chỉnh (Fine-tuning) mô hình CNN tiền huấn luyện từ ImageNet cho bài toán phân tích ảnh viễn thám/vệ tinh, điều nào dưới đây KHÔNG phải là một ưu điểm điển hình?",
        "options": [
            ("A", "Giảm nguy cơ quá khớp (overfitting) vì có ít tham số cần cập nhật hơn"),
            ("B", "Khắc phục được hoàn toàn vấn đề về sự khác biệt giữa phân phối ảnh tự nhiên và ảnh viễn thám (domain gap)"),
            ("C", "Mô hình hội tụ nhanh hơn do kế thừa trọng số đặc trưng cơ bản"),
            ("D", "Tận dụng được các bộ lọc trích xuất cạnh và kết cấu góc nhìn tổng quát")
        ],
        "correctAnswer": "B",
        "explanation": "Ảnh viễn thám chụp từ trên cao có góc nhìn khác biệt hoàn toàn (nadir view, đa phổ, không có trọng lực/chiều trên-dưới cố định) so với ảnh tự nhiên ImageNet. Fine-tuning không thể tự động giải quyết triệt để 'Domain Gap' này nếu không có chiến lược thích ứng miền (Domain Adaptation).",
        "tags": "voai-2025,fine-tuning,remote-sensing,domain-gap"
    },
    {
        "slug": "voai-2025-q35-conv-no-padding-formula",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Cơ bản",
        "question": "Một bộ lọc kích thước $k \\times k$ trượt qua bức ảnh gốc có chiều ngang $m$ ô vuông và chiều dọc $n$ ô vuông với bước trượt stride = 2, không thêm padding. Kích thước chiều ngang và chiều dọc của bản đồ đặc trưng đầu ra là:",
        "options": [
            ("A", "$(\\frac{m}{2}, \\frac{n}{2})$"),
            ("B", "$(\\lfloor \\frac{m - k}{2} \\rfloor + 1, \\lfloor \\frac{n - k}{2} \\rfloor + 1)$"),
            ("C", "$(\\frac{m - k}{2} + k, \\frac{n - k}{2} + k)$"),
            ("D", "$(\\frac{m - k + 1}{2}, \\frac{n - k + 1}{2})$")
        ],
        "correctAnswer": "B",
        "explanation": "Công thức tổng quát tính kích thước đầu ra: $O = \\lfloor \\frac{W - K + 2P}{S} \\rfloor + 1$. Với $P = 0, S = 2$, kích thước là $\\lfloor \\frac{m - k}{2} \\rfloor + 1$ và $\\lfloor \\frac{n - k}{2} \\rfloor + 1$.",
        "tags": "voai-2025,conv-dimensions,feature-map"
    },
    {
        "slug": "voai-2025-q36-vit-last-layer-classification",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Cơ bản",
        "question": "Khi sử dụng mô hình Vision Transformer (ViT) cho bài toán phân loại ảnh, lớp kiến trúc cuối cùng nhận đầu ra của token `[CLS]` để xuất ra phân phối xác suất lớp là gì?",
        "options": [
            ("A", "Khối tự chú ý (Self-Attention block)"),
            ("B", "Lớp bỏ ngẫu nhiên (Dropout)"),
            ("C", "Lớp kết nối đầy đủ (MLP Head / Fully Connected layer) kết hợp với hàm Softmax"),
            ("D", "Khối LSTM hai chiều")
        ],
        "correctAnswer": "C",
        "explanation": "Trong ViT, biểu diễn vector của token đặc biệt `[CLS]` ở tầng Transformer cuối cùng được đưa qua một MLP Head (gồm LayerNorm và Linear layer) rồi áp dụng Softmax để tính xác suất cho các lớp phân loại.",
        "tags": "voai-2025,vit,classification-head,mlp"
    },
    {
        "slug": "voai-2025-q37-entropy-calculation-table",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Trung bình",
        "question": """Xét tập dữ liệu 6 sinh viên dự đoán kết quả thi `Passed`:
- SV 1: CGPA = H, Ôn tập = F $\\to$ Passed = T
- SV 2: CGPA = H, Ôn tập = T $\\to$ Passed = T
- SV 3: CGPA = M, Ôn tập = F $\\to$ Passed = F
- SV 4: CGPA = M, Ôn tập = T $\\to$ Passed = T
- SV 5: CGPA = L, Ôn tập = F $\\to$ Passed = F
- SV 6: CGPA = L, Ôn tập = T $\\to$ Passed = T

Tính giá trị Entropy $H(\\text{Passed})$ theo logarit cơ số 2.""",
        "options": [
            ("A", "0.66"),
            ("B", "1.92"),
            ("C", "0.92"),
            ("D", "1.32")
        ],
        "correctAnswer": "C",
        "explanation": """Trong 6 mẫu, số mẫu Passed = T là 4 mẫu, Passed = F là 2 mẫu.
$P(T) = 4/6 = 2/3 \\approx 0.667$.
$P(F) = 2/6 = 1/3 \\approx 0.333$.
$H = -\\frac{2}{3} \\log_2(2/3) - \\frac{1}{3} \\log_2(1/3) = -[0.667 \\times (-0.585) + 0.333 \\times (-1.585)] = 0.390 + 0.528 \\approx 0.918 \\approx 0.92$.""",
        "tags": "voai-2025,decision-tree,entropy,calculation"
    },
    {
        "slug": "voai-2025-q38-bce-loss-dog-cat",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Ảnh thuộc lớp 'mèo' có nhãn one-hot $[0, 1]$ (vị trí thứ hai là mèo). Mô hình dự đoán xác suất là $[0.3, 0.7]$. Tính giá trị hàm mất mát cross-entropy (dùng logarit tự nhiên $\\ln$):",
        "options": [
            ("A", "0.105"),
            ("B", "0.247"),
            ("C", "0.357"),
            ("D", "0.713")
        ],
        "correctAnswer": "C",
        "explanation": "Loss $= -\\sum y_i \\ln(\\hat{y}_i) = -[0 \\cdot \\ln(0.3) + 1 \\cdot \\ln(0.7)] = -\\ln(0.7) \\approx 0.35667 \\approx 0.357$.",
        "tags": "voai-2025,cross-entropy,loss-calculation"
    },
    {
        "slug": "voai-2025-q39-speedup-resnet34-inference",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Cơ bản",
        "question": "Khi triển khai thực tế mô hình ResNet-34, nếu tốc độ suy luận (inference) quá chậm không đáp ứng thời gian thực, bạn nên thử giải pháp nào đầu tiên?",
        "options": [
            ("A", "Chuyển sang sử dụng cấu trúc mạng nhẹ và tối ưu biên (Edge/Mobile) như MobileNet / ShuffleNet"),
            ("B", "Thêm các lớp bỏ ngẫu nhiên (Dropout) vào lúc suy luận"),
            ("C", "Tăng số vòng lặp huấn luyện"),
            ("D", "Tăng số lớp tích chập")
        ],
        "correctAnswer": "A",
        "explanation": "MobileNet sử dụng kỹ thuật tích chập tách biệt chiều sâu (Depthwise Separable Convolution), giúp giảm số lượng phép tính FLOPs và tham số từ 8-10 lần so với ResNet tiêu chuẩn, tăng tốc độ suy luận rõ rệt trên CPU và thiết bị di động.",
        "tags": "voai-2025,inference-optimization,mobilenet"
    },
    {
        "slug": "voai-2025-q40-minibatch-sgd-shuffle",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Tối ưu hóa & Đạo đức AI",
        "difficulty": "Cơ bản",
        "question": "Khi huấn luyện mạng nơ-ron bằng phương pháp tối ưu hóa theo lô nhỏ (Mini-batch SGD), bạn cần làm gì sau mỗi vòng lặp (epoch) để đảm bảo mô hình học hiệu quả và tránh thiên lệch thứ tự?",
        "options": [
            ("A", "Xáo trộn ngẫu nhiên dữ liệu (Shuffle)"),
            ("B", "Sử dụng toàn bộ dữ liệu (Full-batch) để cập nhật trọng số"),
            ("C", "Đặt lại trọng số về giá trị ban đầu"),
            ("D", "Chuyển sang dùng giải thuật di truyền")
        ],
        "correctAnswer": "A",
        "explanation": "Xáo trộn dữ liệu sau mỗi epoch đảm bảo các mini-batch liên tục thay đổi thành phần mẫu, tránh hiện tượng chu kỳ lặp lại gradient và giảm phương sai ước lượng của bước cập nhật.",
        "tags": "voai-2025,sgd,mini-batch,shuffle"
    },
    {
        "slug": "voai-2025-q41-negative-sampling-distribution",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Trung bình",
        "question": "Trong kỹ thuật Lấy mẫu phủ định (Negative Sampling) của Word2Vec, các từ âm tính (noise words) được rút ra như thế nào?",
        "options": [
            ("A", "Là các từ có độ tương đồng ngữ nghĩa cao nhất với từ mục tiêu"),
            ("B", "Là các từ đứng gần nhất với từ mục tiêu trong văn bản"),
            ("C", "Là các từ có nhãn đúng trong tập huấn luyện"),
            ("D", "Được rút ngẫu nhiên từ toàn bộ từ vựng theo phân phối Unigram lũy thừa $3/4$ ($P_n(w) \\propto U(w)^{0.75}$)")
        ],
        "correctAnswer": "D",
        "explanation": "Mikolov et al. (2013) đề xuất phân phối Unigram biến đổi $U(w)^{3/4}$ để cân bằng giữa các từ quá phổ biến (như 'the', 'is') và các từ hiếm, giúp các từ hiếm có cơ hội được chọn làm mẫu phủ định cao hơn một cách hợp lý.",
        "tags": "voai-2025,word2vec,negative-sampling,unigram"
    },
    {
        "slug": "voai-2025-q42-kmeans-multiple-restarts-selection",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": """Cho tập dữ liệu $N$ điểm. Chúng ta chạy K-means với 50 lần khởi tạo ngẫu nhiên tâm cụm khác nhau (n_init=50). Tiêu chuẩn chuẩn xác nhất để chọn ra 1 kết quả phân cụm tốt nhất là:""",
        "options": [
            ("A", "Chọn lần chạy có tổng bình phương khoảng cách tới tâm cụm (Inertia / SSE = $\\sum \\|x_i - m_{z_i}\\|^2$) đạt giá trị nhỏ nhất"),
            ("B", "Chọn lần chạy thứ mấy cũng như nhau"),
            ("C", "Luôn chọn lần chạy cuối cùng thứ 50"),
            ("D", "Chỉ chọn được nếu dữ liệu có nhãn thực tế")
        ],
        "correctAnswer": "A",
        "explanation": "K-means tối ưu hóa hàm mục tiêu không lồi (Inertia / Sum of Squared Errors). Do nhạy cảm với khởi tạo ban đầu, việc chạy nhiều lần và chọn giải pháp có giá trị SSE thấp nhất là phương pháp chuẩn trong scikit-learn (`n_init`).",
        "tags": "voai-2025,kmeans,inertia,restarts"
    },
    {
        "slug": "voai-2025-q43-resnet18-block-params-flops",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Nâng cao",
        "question": """Mô hình ResNet-18 có khối `block 4-2` gồm hai lớp tích chập liên tiếp:
$$\\text{Conv}_1: 512 \\xrightarrow{3\\times 3, s=1} 512, \\quad \\text{Conv}_2: 512 \\xrightarrow{3\\times 3, s=1} 512$$
Bỏ qua bias và BatchNorm. Tensor đặc trưng đầu vào có kích thước $(B=1, C=512, H=7, W=7)$.
Số tham số có thể huấn luyện và tổng số phép tính FLOPs (ước tính $\\approx 2 \\times \\text{MACs}$) của khối `block 4-2` lần lượt là:""",
        "options": [
            ("A", "$11.7\\text{M}; 1.8\\text{GFLOPs}$"),
            ("B", "$4.7\\text{M}; 0.46\\text{GFLOPs}$"),
            ("C", "$0.50\\text{M}; 0.05\\text{GFLOPs}$"),
            ("D", "$8.4\\text{M}; 0.82\\text{GFLOPs}$")
        ],
        "correctAnswer": "B",
        "explanation": """1. Số tham số:
Mỗi lớp Conv: $3 \\times 3 \\times 512 \\times 512 = 9 \\times 262,144 = 2,359,296$ weights.
Hai lớp Conv: $2 \\times 2,359,296 = 4,718,592 \\approx 4.7\\text{M}$ tham số.

2. Số FLOPs:
Mỗi lớp Conv trên feature map $7 \\times 7$:
$\\text{FLOPs}_1 = 2 \\times (3 \\times 3 \\times 512) \\times (7 \\times 7) \\times 512 = 2 \\times 2,359,296 \\times 49 \\approx 231.2\\text{MFLOPs}$.
Hai lớp Conv: $2 \\times 231.2\\text{M} \\approx 462.4\\text{MFLOPs} \\approx 0.46\\text{GFLOPs}$.
Đáp án chính xác: B.""",
        "tags": "voai-2025,resnet18,params,flops,calculation"
    },
    {
        "slug": "voai-2025-q44-adagrad-adam-benefit",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Tối ưu hóa & Đạo đức AI",
        "difficulty": "Cơ bản",
        "question": "Tỷ lệ học thích ứng (Adaptive Learning Rate) trong AdaGrad, RMSprop và Adam giúp ích gì trực tiếp nhất cho mô hình?",
        "options": [
            ("A", "Giảm kích thước mô hình"),
            ("B", "Tăng kích thước lô"),
            ("C", "Giảm số vòng lặp cần thiết"),
            ("D", "Tự động điều chỉnh tốc độ học cho từng tham số dựa trên tần suất và độ lớn cập nhật của chúng")
        ],
        "correctAnswer": "D",
        "explanation": "Bộ tối ưu thích ứng chia gradient cho căn bậc hai của trung bình bình phương gradient tích lũy, giúp các tham số cập nhật ít nhận bước học lớn hơn và ngược lại, cân bằng tốc độ học trên toàn mạng.",
        "tags": "voai-2025,optimizer,adagrad,adam"
    },
    {
        "slug": "voai-2025-q45-small-batch-size-variance",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Tối ưu hóa & Đạo đức AI",
        "difficulty": "Cơ bản",
        "question": "Trong tối ưu hóa theo lô nhỏ (Mini-batch SGD), nếu kích thước lô (batch size) quá nhỏ (ví dụ: batch size = 1 hoặc 2), hệ quả thường gặp là gì?",
        "options": [
            ("A", "Giảm thời gian huấn luyện"),
            ("B", "Gradient ước lượng có phương sai quá lớn, gây dao động mạnh trong hàm mất mát"),
            ("C", "Độ chính xác tăng nhanh và ổn định"),
            ("D", "Không ảnh hưởng gì")
        ],
        "correctAnswer": "B",
        "explanation": "Batch size quá nhỏ khiến ước lượng gradient của từng bước bị chi phối bởi các mẫu ngẫu nhiên riêng lẻ, gây ra nhiễu phương sai cao (high variance noise), làm quỹ đạo cập nhật trọng số dao động mạnh và khó hội tụ.",
        "tags": "voai-2025,batch-size,sgd,variance"
    },
    {
        "slug": "voai-2025-q46-decision-tree-pruning-overfitting",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Trung bình",
        "question": """Những chiến lược nào sau đây có thể giúp giảm vấn đề quá khớp (overfitting) trong Cây quyết định?
(i) Giới hạn độ sâu tối đa của cây (max_depth)
(ii) Áp đặt số lượng mẫu tối thiểu tại các nút lá (min_samples_leaf)
(iii) Cắt tỉa cây sau huấn luyện (Cost-complexity pruning)
(iv) Đảm bảo mỗi nút lá chỉ chứa duy nhất một lớp""",
        "options": [
            ("A", "Không có lựa chọn nào đúng"),
            ("B", "Tất cả 4 chiến lược"),
            ("C", "(i), (ii) và (iii)"),
            ("D", "(i), (iii) và (iv)")
        ],
        "correctAnswer": "C",
        "explanation": "Chiến lược (iv) chính là nguyên nhân gây ra Overfitting nghiêm trọng nhất. Các kỹ thuật (i) tiền tỉa bằng độ sâu, (ii) tiền tỉa bằng số mẫu tối thiểu, và (iii) hậu tỉa (cost-complexity pruning) là 3 giải pháp kinh điển chống overfitting cho cây quyết định.",
        "tags": "voai-2025,decision-tree,pruning,regularization"
    },
    {
        "slug": "voai-2025-q47-linear-neuron-forward-calc",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Một neuron có 3 đầu vào với trọng số lần lượt là $w = [1, 4, 3]$, không có bias. Hàm truyền là hàm tuyến tính với hằng số tỷ lệ bằng 3 ($f(z) = 3z$). Các giá trị đầu vào lần lượt là $[4, 8, 5]$. Đầu ra của neuron sẽ là bao nhiêu?",
        "options": [
            ("A", "162"),
            ("B", "153"),
            ("C", "139"),
            ("D", "160")
        ],
        "correctAnswer": "B",
        "explanation": "$z = w^T x = 1(4) + 4(8) + 3(5) = 4 + 32 + 15 = 51$. Đầu ra của neuron: $f(z) = 3 \\times 51 = 153$.",
        "tags": "voai-2025,neuron,forward-pass,calculation"
    },
    {
        "slug": "voai-2025-q48-multivariable-gradient-vector",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Toán học & Ma trận",
        "difficulty": "Cơ bản",
        "question": "Gradient của hàm số hai biến $f(x, y) = 2x^2 - 3y^2 + 4y - 10$ tại điểm $(0, 0)$ là vector nào?",
        "options": [
            ("A", "$1i + 10j$"),
            ("B", "$2i - 3j$"),
            ("C", "$-3i + 4j$"),
            ("D", "$0i + 4j$")
        ],
        "correctAnswer": "D",
        "explanation": "Đạo hàm riêng theo $x$: $\\frac{\\partial f}{\\partial x} = 4x \\implies$ tại $(0, 0)$ bằng 0. Đạo hàm riêng theo $y$: $\\frac{\\partial f}{\\partial y} = -6y + 4 \\implies$ tại $(0, 0)$ bằng 4. Vector gradient: $\\nabla f(0, 0) = (0, 4) = 0i + 4j$.",
        "tags": "voai-2025,gradient,calculus,vector"
    },
    {
        "slug": "voai-2025-q49-rare-class-imbalance-loss",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Khi huấn luyện mô hình phân loại nhiều lớp với tập dữ liệu mất cân bằng nghiêm trọng về nhãn lớp (lớp hiếm gần như không bao giờ được dự đoán), cách xử lý nào sau đây là phù hợp nhất?",
        "options": [
            ("A", "Giảm số vòng lặp (epoch)"),
            ("B", "Xóa toàn bộ lớp hiếm khỏi tập dữ liệu"),
            ("C", "Tăng bỏ ngẫu nhiên (Dropout) lên 0.9"),
            ("D", "Sử dụng hàm mất mát có trọng số nghịch đảo tần suất lớp (Weighted Cross-Entropy Loss / Focal Loss)")
        ],
        "correctAnswer": "D",
        "explanation": "Gán trọng số phạt cao hơn cho các mẫu thuộc lớp hiếm buộc mô hình phải chú ý và tối ưu hóa dự đoán cho lớp thiểu số thay vì chỉ tối ưu theo lớp đa số.",
        "tags": "voai-2025,class-imbalance,weighted-loss"
    },
    {
        "slug": "voai-2025-q50-mobilenetv2-freeze-early-layers",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Cơ bản",
        "question": "Khi tinh chỉnh (fine-tune) MobileNetV2 trên tập dữ liệu mục tiêu có kích thước nhỏ, bước đầu tiên bạn nên làm để tránh overfitting và bảo toàn đặc trưng là gì?",
        "options": [
            ("A", "Tăng thêm số lớp tích chập"),
            ("B", "Thay thế toàn bộ mô hình bằng mạng MLP"),
            ("C", "Đóng băng trọng số (Freeze) của các lớp đầu tiên / toàn bộ phần backbone"),
            ("D", "Tăng tỷ lệ học lên 1.0")
        ],
        "correctAnswer": "C",
        "explanation": "Đóng băng các tầng đặc trưng trích xuất cơ sở (feature extractor) và chỉ huấn luyện lớp phân loại cuối cùng (classifier head) ngăn việc phá vỡ các đặc trưng đã học tốt từ pretraining khi dữ liệu mới quá ít.",
        "tags": "voai-2025,mobilenetv2,freezing,transfer-learning"
    }
]
