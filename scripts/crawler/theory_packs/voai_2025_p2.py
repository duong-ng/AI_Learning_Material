# -*- coding: utf-8 -*-
"""
Bộ GD&ĐT - Đề thi Tuyển chọn Đội tuyển Olympic AI Quốc gia (VOAI 2025)
Mã đề: 006 (Phần 2: Câu 51 đến Câu 100).
"""

VOAI_P2_QUESTIONS = [
    {
        "slug": "voai-2025-q51-gpu-oom-solutions",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Khi huấn luyện mạng học sâu bằng PyTorch, nếu GPU bị lỗi đầy bộ nhớ (CUDA Out-of-Memory - OOM), bạn nên thử giải pháp nào đầu tiên?",
        "options": [
            ("A", "Chuyển sang dùng CPU"),
            ("B", "Thêm nhiều lớp bỏ ngẫu nhiên (Dropout)"),
            ("C", "Dùng mô hình có kích thước lớn hơn"),
            ("D", "Giảm kích thước lô (batch size) hoặc dùng kỹ thuật tích lũy gradient (Gradient Accumulation)")
        ],
        "correctAnswer": "D",
        "explanation": "Giảm batch size lập tức giải phóng bộ nhớ lưu trữ các bản đồ kích hoạt (activation tensors) cần cho lan truyền ngược. Nếu muốn duy trì effective batch size lớn, kỹ thuật tích lũy gradient (Gradient Accumulation) cho phép cộng dồn gradient qua nhiều mini-batch nhỏ trước khi gọi `optimizer.step()`.",
        "tags": "voai-2025,pytorch,cuda,oom,batch-size"
    },
    {
        "slug": "voai-2025-q52-not-supervised-learning",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Phương pháp nào sau đây KHÔNG thuộc nhóm học máy có giám sát (Supervised Learning)?",
        "options": [
            ("A", "Cây quyết định (Decision Tree)"),
            ("B", "Hồi quy tuyến tính với Ridge Regularization"),
            ("C", "Naive Bayes"),
            ("D", "Phân cụm K-means")
        ],
        "correctAnswer": "D",
        "explanation": "K-means là giải thuật học không giám sát (Unsupervised Learning) nhằm gom nhóm các mẫu dữ liệu dựa trên sự tương đồng khoảng cách mà không hề sử dụng bất kỳ nhãn mục tiêu nào.",
        "tags": "voai-2025,unsupervised-learning,kmeans"
    },
    {
        "slug": "voai-2025-q53-knn-tasks-applicable",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Phát biểu nào sau đây là ĐÚNG về phạm vi ứng dụng của thuật toán K-láng giềng gần nhất (k-NN)?",
        "options": [
            ("A", "Chỉ được sử dụng cho bài toán hồi quy"),
            ("B", "Thuộc lớp bài toán học tham số phức tạp"),
            ("C", "Chỉ được sử dụng cho bài toán phân loại"),
            ("D", "Được sử dụng hiệu quả cho cả bài toán phân loại (Classification) và hồi quy (Regression)")
        ],
        "correctAnswer": "D",
        "explanation": "k-NN dự đoán nhãn phân loại thông qua cơ chế bỏ phiếu đa số (Majority Voting) của k láng giềng, và dự đoán giá trị liên tục trong bài toán hồi quy bằng trung bình cộng (hoặc trung bình có trọng số khoảng cách) của k láng giềng gần nhất.",
        "tags": "voai-2025,knn,regression,classification"
    },
    {
        "slug": "voai-2025-q54-data-augmentation-objective",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Mục đích chính của việc tăng cường dữ liệu (Data Augmentation) trong huấn luyện mô hình học máy/học sâu là gì?",
        "options": [
            ("A", "Tăng tốc độ huấn luyện của mô hình"),
            ("B", "Giảm số lượng tham số của mô hình"),
            ("C", "Giảm kích thước vật lý của tập dữ liệu gốc"),
            ("D", "Cải thiện khả năng tổng quát hóa (Generalization) và giảm thiểu nguy cơ quá khớp (Overfitting)")
        ],
        "correctAnswer": "D",
        "explanation": "Tăng cường dữ liệu tạo ra các biến thể nhân tạo hợp lý của mẫu huấn luyện (xoay, lật, cắt, đổi độ sáng), buộc mô hình phải học các đặc trưng bất biến thay vì ghi nhớ từng pixel cụ thể, từ đó nâng cao năng lực tổng quát hóa.",
        "tags": "voai-2025,data-augmentation,generalization,regularization"
    },
    {
        "slug": "voai-2025-q55-huggingface-bert-tokenizer",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Trung bình",
        "question": "Khi sử dụng `BertTokenizer` từ thư viện Hugging Face Transformers, điều nào sau đây là ĐÚNG?",
        "options": [
            ("A", "Bộ mã hóa không hỗ trợ xử lý theo lô (batch)"),
            ("B", "Phương thức `tokenizer.encode_plus()` (hoặc gọi trực tiếp `tokenizer()`) trả về từ điển chứa `input_ids` và `attention_mask`"),
            ("C", "BERT chỉ dùng được duy nhất cho tiếng Anh"),
            ("D", "Bộ mã hóa không cần thêm token đệm (padding)")
        ],
        "correctAnswer": "B",
        "explanation": "`tokenizer.encode_plus()` xử lý toàn diện chuỗi văn bản: tách từ thành WordPiece subwords, thêm các token đặc biệt `[CLS]`, `[SEP]`, cắt/đệm độ dài và trả về các tensor `input_ids`, `attention_mask` và `token_type_ids`.",
        "tags": "voai-2025,huggingface,bert,tokenizer"
    },
    {
        "slug": "voai-2025-q56-zero-weight-initialization-flaw",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Trung bình",
        "question": "Dưới đây là một số lựa chọn khi huấn luyện mạng nơ-ron. Trường hợp nào sẽ khiến mạng KHÔNG THỂ học được các biểu diễn phức tạp (thất bại phá vỡ tính đối xứng - Symmetry Breaking)?",
        "options": [
            ("A", "Đảo ngẫu nhiên lại dữ liệu khi bắt đầu mỗi epoch"),
            ("B", "Khởi tạo tất cả bộ tham số trọng số bằng 0 (Zero initialization)"),
            ("C", "Sử dụng momentum"),
            ("D", "Sử dụng Dropout")
        ],
        "correctAnswer": "B",
        "explanation": "Nếu tất cả trọng số trong cùng một lớp được khởi tạo bằng 0, mọi neuron sẽ nhận cùng giá trị đầu vào và có gradient y hệt nhau trong suốt quá trình lan truyền ngược. Các neuron sẽ cập nhật hoàn toàn đối xứng, biến mạng sâu thành một neuron duy nhất.",
        "tags": "voai-2025,weight-initialization,symmetry-breaking"
    },
    {
        "slug": "voai-2025-q57-ssd-anchor-boxes-role",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Cơ bản",
        "question": "Trong mô hình phát hiện vật thể Single Shot MultiBox Detector (SSD), hộp neo (anchor boxes / default boxes) đóng vai trò gì?",
        "options": [
            ("A", "Định nghĩa trước các tỷ lệ khung hình (aspect ratios) và kích thước tỉ lệ tham chiếu trên từng feature map để mô hình hồi quy độ lệch vị trí"),
            ("B", "Làm nhẹ mô hình bằng cách loại bỏ các kênh tích chập"),
            ("C", "Làm tăng số lượng lớp tích chập"),
            ("D", "Tăng độ phân giải của ảnh gốc")
        ],
        "correctAnswer": "A",
        "explanation": "SSD đặt các hộp neo với nhiều kích thước và tỷ lệ khung hình khác nhau tại mỗi vị trí trên các feature map đa tỉ lệ, mô hình chỉ cần học độ lệch tương đối $(\\Delta x, \\Delta y, \\Delta w, \\Delta h)$ so với anchor box thay vì dự đoán tọa độ tuyệt đối.",
        "tags": "voai-2025,ssd,anchor-boxes,object-detection"
    },
    {
        "slug": "voai-2025-q58-confusion-matrix-overfitting-gap",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Quan sát hai ma trận nhầm lẫn: Trên Train Set đường chéo chính đạt ~95% chính xác trên mỗi lớp; trên Test Set đường chéo chính giảm xuống chỉ còn ~65-70%. Nhận định nào sau đây là chính xác nhất?",
        "options": [
            ("A", "Mô hình có dấu hiệu quá khớp rõ rệt (Overfitting)"),
            ("B", "Mô hình có dấu hiệu kém khớp (Underfitting)"),
            ("C", "Độ chính xác trên tập kiểm thử và huấn luyện là gần như tương đương nhau"),
            ("D", "Mô hình đã đạt trạng thái cân bằng Bayes tối ưu")
        ],
        "correctAnswer": "A",
        "explanation": "Khoảng cách lớn giữa hiệu năng trên tập huấn luyện (rất cao) và tập kiểm thử (thấp hơn nhiều) là dấu hiệu kinh điển của hiện tượng quá khớp (Overfitting), mô hình đã ghi nhớ dữ liệu huấn luyện thay vì khái quát hóa quy luật tổng thể.",
        "tags": "voai-2025,overfitting,confusion-matrix,diagnostics"
    },
    {
        "slug": "voai-2025-q59-id3-high-entropy-meaning",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Trong thuật toán cây quyết định ID3, một tập hợp mẫu dữ liệu có giá trị Entropy cao mang ý nghĩa gì?",
        "options": [
            ("A", "Thuần khiết (Pure): Các điểm dữ liệu tập trung đa số vào một lớp"),
            ("B", "Không có ý nghĩa gì"),
            ("C", "Không thuần khiết (Not pure): Các điểm dữ liệu phân bố tương đối đồng đều giữa các lớp khác nhau (độ hỗn loạn cao)"),
            ("D", "Có thể suy ra độ đo F1-score cao")
        ],
        "correctAnswer": "C",
        "explanation": "Entropy đo lường mức độ hỗn loạn của thông tin. Entropy đạt giá trị cực đại khi xác suất các lớp bằng nhau (hoàn toàn không thuần khiết), và bằng 0 khi tất cả các mẫu đều thuộc về duy nhất một lớp.",
        "tags": "voai-2025,id3,entropy,decision-tree"
    },
    {
        "slug": "voai-2025-q60-gaussian-noise-input-purpose",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Mục đích của việc cộng thêm một lượng nhỏ nhiễu Gaussian ngẫu nhiên vào dữ liệu đầu vào khi huấn luyện mô hình học sâu là gì?",
        "options": [
            ("A", "Giảm số lớp cần thiết của mạng"),
            ("B", "Tăng tính ổn định, độ bền vững (robustness) và khả năng chống chịu nhiễu ngoại cảnh của mô hình"),
            ("C", "Giảm thời gian huấn luyện"),
            ("D", "Làm mô hình luôn dự đoán đúng nhãn")
        ],
        "correctAnswer": "B",
        "explanation": "Cộng nhiễu Gaussian vào đầu vào tương đương với một hình thức chính quy hóa dữ liệu (data regularization), ngăn các trọng số phụ thuộc quá cứng nhắc vào các giá trị pixel cụ thể và làm phẳng mặt hàm mất mát.",
        "tags": "voai-2025,gaussian-noise,regularization,robustness"
    },
    {
        "slug": "voai-2025-q61-gan-gray-image-failure",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "AI Tạo sinh (Generative AI)",
        "difficulty": "Trung bình",
        "question": "Khi huấn luyện mạng đối nghịch tạo sinh (GAN), nếu bộ tạo (generator) luôn sinh ra ảnh toàn một màu xám đồng nhất, nguyên nhân phổ biến nhất có thể là gì?",
        "options": [
            ("A", "Mất mát (loss) của generator quá nhỏ"),
            ("B", "Tỷ lệ học quá nhỏ"),
            ("C", "Kích thước lô quá lớn"),
            ("D", "Mất cân bằng nghiêm trọng giữa bộ phân biệt (discriminator) và bộ tạo, dẫn đến hiện tượng sụp đổ mốt (Mode Collapse)")
        ],
        "correctAnswer": "D",
        "explanation": "Hiện tượng sụp đổ mốt (Mode Collapse) xảy ra khi Generator tìm thấy một đầu ra an toàn đánh lừa được Discriminator (hoặc Discriminator quá mạnh áp đảo khiến gradient truyền về Generator bị triệt tiêu), khiến Generator chỉ sinh ra một mẫu trung bình xám đơn điệu.",
        "tags": "voai-2025,gan,mode-collapse,generative-ai"
    },
    {
        "slug": "voai-2025-q62-attention-improves-context",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": "Trong bài toán phân loại văn bản, cơ chế nào giúp mô hình giải quyết triệt để hạn chế của các phương pháp Bag-of-Words bằng cách nắm bắt quan hệ phụ thuộc xa giữa các từ?",
        "options": [
            ("A", "Dùng mô hình dựa trên cơ chế chú ý (attention-based) như Transformer / BERT"),
            ("B", "Bỏ nhúng từ và dùng vector one-hot"),
            ("C", "Chuyển sang dùng TF-IDF"),
            ("D", "Giảm chiều vector nhúng xuống 2")
        ],
        "correctAnswer": "A",
        "explanation": "Cơ chế Attention tính toán trực tiếp trọng số tương quan giữa mọi cặp từ trong câu với độ dài đường đi thông tin là $O(1)$, giúp mô hình nắm bắt tức thì ngữ cảnh dù hai từ nằm cách xa nhau hàng trăm tokens.",
        "tags": "voai-2025,attention,bert,nlp"
    },
    {
        "slug": "voai-2025-q63-overfitting-first-remedies",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Nếu mô hình học sâu bị học quá mức (overfitting), phương pháp chính quy hóa tiêu chuẩn nào nên được thử nghiệm đầu tiên?",
        "options": [
            ("A", "Tăng số vòng lặp (epoch)"),
            ("B", "Thêm lớp bỏ ngẫu nhiên (Dropout) hoặc tăng trọng số suy giảm (Weight Decay / L2 Regularization)"),
            ("C", "Tăng tỷ lệ học lên cao hơn"),
            ("D", "Giảm kích thước lô về 1")
        ],
        "correctAnswer": "B",
        "explanation": "Dropout làm giảm sự phụ thuộc đồng thời giữa các neuron, trong khi Weight Decay phạt các trọng số có độ lớn quá cao, kéo mô hình về miền biểu diễn phẳng và đơn giản hơn, chống overfitting hiệu quả.",
        "tags": "voai-2025,regularization,dropout,weight-decay"
    },
    {
        "slug": "voai-2025-q64-train-acc-up-val-acc-oscillating",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Trung bình",
        "question": "Khi huấn luyện mạng nơ-ron, nếu độ chính xác huấn luyện (train accuracy) tăng đều nhưng độ chính xác kiểm tra (val accuracy) dao động mạnh và không cải thiện, nguyên nhân có thể là gì?",
        "options": [
            ("A", "Mô hình đang học quá mức (overfitting) hoặc dữ liệu kiểm tra chưa được xáo trộn kỹ/quá nhỏ"),
            ("B", "Không sử dụng bỏ ngẫu nhiên"),
            ("C", "Mô hình quá nhỏ"),
            ("D", "Số vòng lặp quá ít")
        ],
        "correctAnswer": "A",
        "explanation": "Độ chính xác train tăng liên tục trong khi val dao động ngẫu nhiên và chững lại là triệu chứng chuẩn đoán rõ ràng của Overfitting, mô hình không còn học được quy luật chung mà đang khớp nhiễu của tập train.",
        "tags": "voai-2025,training-diagnostics,overfitting"
    },
    {
        "slug": "voai-2025-q65-bert-finetuning-classification-head",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": "Mục tiêu và thao tác chính khi tinh chỉnh (fine-tune) mô hình BERT cho bài toán phân loại văn bản là gì?",
        "options": [
            ("A", "Tạo nhúng từ mới từ đầu"),
            ("B", "Giữ lại backbone BERT và thay thế lớp phân loại cuối cùng (Classification Head) bằng một lớp tuyến tính phù hợp với số lớp mục tiêu"),
            ("C", "Dùng mô hình sinh tự hồi quy"),
            ("D", "Tạo một bộ mã hóa (tokenizer) mới hoàn toàn")
        ],
        "correctAnswer": "B",
        "explanation": "Khi fine-tune BERT cho phân loại chuỗi, ta đặt một lớp Fully Connected (`Linear(hidden_size, num_classes)`) trên đỉnh vector đầu ra của token `[CLS]` và huấn luyện end-to-end với tốc độ học nhỏ.",
        "tags": "voai-2025,bert,fine-tuning,text-classification"
    },
    {
        "slug": "voai-2025-q66-learning-rate-too-high",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Tối ưu hóa & Đạo đức AI",
        "difficulty": "Cơ bản",
        "question": "Nếu tỷ lệ học (learning rate) được đặt quá cao trong quá trình huấn luyện mạng nơ-ron, điều gì có khả năng cao sẽ xảy ra?",
        "options": [
            ("A", "Hàm mất mát dao động dữ dội, mô hình không hội tụ hoặc thậm chí bùng nổ mất mát (NaN loss)"),
            ("B", "Tăng khả năng chính quy hóa của mô hình"),
            ("C", "Hàm mất mát giảm đều đặn và mượt mà"),
            ("D", "Mô hình hội tụ nhanh hơn về điểm cực tiểu toàn cục")
        ],
        "correctAnswer": "A",
        "explanation": "Learning rate quá lớn làm các bước nhảy vượt quá thung lũng cực tiểu (overshooting), khiến quỹ đạo tối ưu bị văng ra xa và phân kỳ (divergence).",
        "tags": "voai-2025,learning-rate,divergence,optimization"
    },
    {
        "slug": "voai-2025-q67-val-set-vs-test-set-difference",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Sự khác biệt cốt lõi giữa tập kiểm tra (Test set) và tập xác thực (Validation set) là gì?",
        "options": [
            ("A", "Tập xác thực là không cần thiết trong học máy"),
            ("B", "Tập xác thực (Validation set) dùng để điều chỉnh siêu tham số và lựa chọn checkpoint tốt nhất; tập kiểm tra (Test set) chỉ dùng một lần duy nhất để đánh giá hiệu suất khách quan cuối cùng"),
            ("C", "Tập xác thực và tập kiểm tra hoàn toàn là một"),
            ("D", "Tập xác thực chỉ dùng cho hồi quy, tập kiểm tra chỉ dùng cho phân loại")
        ],
        "correctAnswer": "B",
        "explanation": "Tập validation tham gia gián tiếp vào quá trình lựa chọn mô hình qua siêu tham số. Để có một đánh giá hoàn toàn không bị rò rỉ thông tin (data snooping / data leakage), ta bắt buộc phải giữ lại một tập Test set độc lập chưa từng được tiếp xúc.",
        "tags": "voai-2025,validation-set,test-set,methodology"
    },
    {
        "slug": "voai-2025-q68-random-forest-regression-formula",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": """Xét một mô hình Random Forest gồm $K$ cây quyết định cho bài toán hồi quy (Regression). Mỗi cây quyết định thứ $i$ đưa ra dự đoán $T_i(x)$. Hàm dự đoán của toàn bộ Random Forest được biểu diễn bằng công thức nào?""",
        "options": [
            ("A", "$y(x) = \\sum_{i=1}^K T_i(x)$"),
            ("B", "$y(x) = \\max_{i=1..K} T_i(x)$"),
            ("C", "$y(x) = \\prod_{i=1}^K T_i(x)$"),
            ("D", "$y(x) = \\frac{1}{K} \\sum_{i=1}^K T_i(x)$")
        ],
        "correctAnswer": "D",
        "explanation": "Trong bài toán hồi quy, cơ chế tổng hợp (aggregation) của Bagging / Random Forest là tính trung bình cộng không trọng số kết quả dự đoán của tất cả $K$ cây quyết định thành viên.",
        "tags": "voai-2025,random-forest,regression,formula"
    },
    {
        "slug": "voai-2025-q69-gensim-load-word2vec-format",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": "Để tải các vector nhúng từ Word2Vec định dạng văn bản/nhị phân đã huấn luyện trước trong thư viện Gensim (phiên bản hiện đại), bạn sử dụng câu lệnh nào?",
        "options": [
            ("A", "`gensim.models.load('word2vec')`"),
            ("B", "`import word2vec.load_model(path)`"),
            ("C", "`KeyedVectors.load_word2vec_format(path, binary=True/False)`"),
            ("D", "`spacy.load_word2vec(path)`")
        ],
        "correctAnswer": "C",
        "explanation": "Trong thư viện Gensim, các vector nhúng từ tĩnh được quản lý bởi lớp `KeyedVectors`, và hàm chuẩn để nạp file Google News hoặc pre-trained vector là `KeyedVectors.load_word2vec_format()`.",
        "tags": "voai-2025,gensim,word2vec,keyedvectors"
    },
    {
        "slug": "voai-2025-q70-cross-entropy-loss-pytorch-input",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Trung bình",
        "question": "Khi sử dụng hàm mất mát `nn.CrossEntropyLoss` trong PyTorch, tham số đầu vào đầu tiên truyền vào (dự đoán của mạng) bắt buộc phải là gì?",
        "options": [
            ("A", "Các giá trị Logits thô chưa qua hàm kích hoạt Softmax"),
            ("B", "Vector one-hot của các lớp mục tiêu"),
            ("C", "Xác suất sau khi đã áp dụng hàm Softmax thủ công"),
            ("D", "Log-xác suất sau khi đã gọi LogSoftmax")
        ],
        "correctAnswer": "A",
        "explanation": "`nn.CrossEntropyLoss` trong PyTorch đã tích hợp sẵn bên trong phép tính `LogSoftmax` và `NLLLoss`. Nếu người dùng gọi Softmax trước rồi truyền vào `CrossEntropyLoss`, kết quả đạo hàm và giá trị mất mát sẽ bị sai nghiêm trọng.",
        "tags": "voai-2025,pytorch,cross-entropy,logits"
    },
    {
        "slug": "voai-2025-q71-train-loss-down-val-loss-up",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Trong quá trình huấn luyện, nếu mất mát tập huấn luyện (training loss) tiếp tục giảm nhưng mất mát tập kiểm định (validation loss) bắt đầu tăng dần, hiện tượng này khẳng định điều gì?",
        "options": [
            ("A", "Mô hình đang bị học quá mức (Overfitting)"),
            ("B", "Mô hình đang hội tụ tối ưu"),
            ("C", "Cần tăng tỷ lệ học"),
            ("D", "Mô hình học chưa đủ (Underfitting)")
        ],
        "correctAnswer": "A",
        "explanation": "Điểm mà tại đó Validation Loss bắt đầu tăng ngược trong khi Training Loss vẫn giảm là điểm bắt đầu của quá trình Overfitting, báo hiệu mô hình đang mất dần năng lực tổng quát hóa trên dữ liệu chưa thấy.",
        "tags": "voai-2025,overfitting,validation-loss,early-stopping"
    },
    {
        "slug": "voai-2025-q72-segmentation-imbalance-dice-loss",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Trung bình",
        "question": "Trong bài toán phân đoạn ảnh (Image Segmentation), khi diện tích của đối tượng tiền cảnh (foreground) cực kỳ nhỏ so với nền hậu cảnh (background), hàm mất mát nào thường được ưu tiên sử dụng thay thế cho Cross-Entropy tiêu chuẩn?",
        "options": [
            ("A", "Mean Squared Error (MSE)"),
            ("B", "Hinge Loss"),
            ("C", "L1 Loss"),
            ("D", "Dice Loss hoặc Focal Loss")
        ],
        "correctAnswer": "D",
        "explanation": "Dice Loss trực tiếp tối ưu hóa chỉ số trùng khớp vùng giao F1/Sørensen-Dice Coefficient, không bị chi phối bởi hàng triệu pixel nền như Cross-Entropy. Focal Loss bổ sung hệ số điều chế $(1 - p_t)^\\gamma$ để hạ thấp đóng góp của các pixel nền dễ phân loại.",
        "tags": "voai-2025,segmentation,dice-loss,focal-loss"
    },
    {
        "slug": "voai-2025-q73-resnet-skip-connection-code-line",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Trung bình",
        "question": """Trong đoạn mã khối `identity_block` của ResNet:
```python
X = Conv2d(...)(X); X = BatchNormalization(...)(X); X = Activation('relu')(X)
X = Conv2d(...)(X); X = BatchNormalization(...)(X); X = Activation('relu')(X)
X = Conv2d(...)(X); X = BatchNormalization(...)(X)
X = Add()([X_shortcut, X]) # <--- dòng 21
X = Activation('relu')(X)
```
Cơ chế kết nối tắt (Skip Connection) được thực hiện như thế nào?""",
        "options": [
            ("A", "Ba cặp Conv2D-BatchNorm-ReLU; kết nối tắt ở dòng 8"),
            ("B", "Hai cặp Conv2D-BatchNorm-ReLU"),
            ("C", "Không có cơ chế kết nối tắt"),
            ("D", "Ba cặp Conv2D-BatchNorm-ReLU; kết nối tắt thực hiện qua phép cộng tensor tại dòng 21 (`X = Add()([X_shortcut, X])`) trước khi kích hoạt ReLU cuối cùng")
        ],
        "correctAnswer": "D",
        "explanation": "Khối ResNet identity block sử dụng 3 lớp tích chập dạng bottleneck ($1\\times 1 \\to 3\\times 3 \\to 1\\times 1$). Phép kết nối tắt cộng trực tiếp đặc trưng ban đầu `X_shortcut` vào đầu ra của khối tại dòng 21 trước khi qua hàm kích hoạt ReLU ngoài cùng.",
        "tags": "voai-2025,resnet,skip-connection,residual"
    },
    {
        "slug": "voai-2025-q74-transformer-attention-role",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Transformers & Attention",
        "difficulty": "Cơ bản",
        "question": "Trong mô hình Transformer, cơ chế tự chú ý (Self-Attention) giúp mô hình đạt được khả năng gì nổi bật nhất?",
        "options": [
            ("A", "Tự động sinh từ ngẫu nhiên"),
            ("B", "Tập trung linh hoạt vào các phần/từ quan trọng và liên quan nhất trong câu khi tính toán biểu diễn cho mỗi vị trí"),
            ("C", "Cố định vị trí của từ"),
            ("D", "Chuẩn hóa dữ liệu đầu vào về khoảng $[0, 1]$")
        ],
        "correctAnswer": "B",
        "explanation": "Self-attention cho phép mỗi từ trong câu tính toán điểm tương đồng với mọi từ khác, từ đó tổng hợp thông tin có chọn lọc dựa trên ngữ cảnh toàn cục.",
        "tags": "voai-2025,transformer,self-attention"
    },
    {
        "slug": "voai-2025-q75-unet-skip-connection-axis",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Trung bình",
        "question": "Trong kiến trúc phân đoạn ảnh U-Net, thao tác kết nối tắt (skip connection) giữa bộ mã hóa (encoder) và bộ giải mã (decoder) được thực hiện bằng phép toán nào và dọc theo trục nào?",
        "options": [
            ("A", "Phép nhân ma trận theo chiều batch"),
            ("B", "Phép nối tensor (Concatenation) dọc theo chiều kênh (channel dimension: axis=-1 trong TF/Keras hoặc dim=1 trong PyTorch)"),
            ("C", "Phép cộng từng phần tử (Element-wise Addition)"),
            ("D", "Phép tích chập 1D")
        ],
        "correctAnswer": "B",
        "explanation": "Khác với ResNet dùng phép cộng (Element-wise Addition), U-Net sử dụng phép nối tensor (Concatenation) dọc theo chiều kênh (Channels), ghép các đặc trưng không gian chi tiết từ encoder với các đặc trưng ngữ nghĩa từ decoder.",
        "tags": "voai-2025,unet,skip-connection,concatenation"
    },
    {
        "slug": "voai-2025-q76-large-language-model-definition",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": "Mô hình ngôn ngữ lớn (Large Language Model - LLM) về mặt bản chất kỹ thuật được định nghĩa chuẩn xác nhất là gì?",
        "options": [
            ("A", "Một công cụ tìm kiếm dựa trên các luật cứng if-else"),
            ("B", "Một mô hình học sâu (Deep Learning) quy mô lớn được huấn luyện trên lượng khổng lồ dữ liệu văn bản để dự đoán phân phối xác suất của từ/token tiếp theo trong chuỗi"),
            ("C", "Hệ thống chuyên gia bảng tính"),
            ("D", "Cơ sở dữ liệu lưu trữ các câu văn mẫu")
        ],
        "correctAnswer": "B",
        "explanation": "Về mặt toán học, LLM mô hình hóa xác suất đồng thời $P(w_1, w_2, ..., w_T) = \\prod P(w_t | w_{<t})$ bằng kiến trúc mạng học sâu Transformer trên kho ngữ liệu khổng lồ.",
        "tags": "voai-2025,llm,definition,language-modeling"
    },
    {
        "slug": "voai-2025-q77-stable-diffusion-model-type",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "AI Tạo sinh (Generative AI)",
        "difficulty": "Cơ bản",
        "question": "Mô hình sinh ảnh nổi tiếng Stable Diffusion thuộc lớp mô hình tạo sinh (Generative Model) nào dưới đây?",
        "options": [
            ("A", "Mô hình Transformer thuần túy"),
            ("B", "Mô hình khuếch tán không gian tiềm ẩn (Latent Diffusion Model)"),
            ("C", "Mạng đối nghịch tạo sinh (GAN)"),
            ("D", "Bộ tự mã hóa biến phân (VAE) thuần túy")
        ],
        "correctAnswer": "B",
        "explanation": "Stable Diffusion (Rombach et al., 2022) là một Latent Diffusion Model (LDM), thực hiện quá trình khuếch tán ngược (denoising diffusion) trong không gian tiềm ẩn nén (latent space) của một pretrained VAE để tiết kiệm chi phí tính toán.",
        "tags": "voai-2025,stable-diffusion,latent-diffusion,generative-ai"
    },
    {
        "slug": "voai-2025-q78-early-stopping-tracked-metric",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Tối ưu hóa & Đạo đức AI",
        "difficulty": "Cơ bản",
        "question": "Để áp dụng kỹ thuật dừng sớm (Early Stopping) trong quá trình huấn luyện mạng nơ-ron, bạn cần theo dõi chỉ số nào để ra quyết định thời điểm dừng?",
        "options": [
            ("A", "Hàm mất mát kiểm tra (Validation Loss) hoặc độ chính xác kiểm tra (Validation Accuracy)"),
            ("B", "Tốc độ học (Learning rate)"),
            ("C", "Số vòng lặp đã chạy"),
            ("D", "Hàm mất mát huấn luyện (Training Loss)")
        ],
        "correctAnswer": "A",
        "explanation": "Early stopping giám sát hàm mất mát hoặc độ chính xác trên tập Validation. Khi chỉ số này ngừng cải thiện sau một số epoch quy định (patience), thuật toán sẽ dừng huấn luyện và khôi phục trọng số tại checkpoint tốt nhất.",
        "tags": "voai-2025,early-stopping,validation,callbacks"
    },
    {
        "slug": "voai-2025-q79-pytorch-move-model-gpu",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Lệnh chuẩn mực trong PyTorch để chuyển toàn bộ tham số của một mô hình nơ-ron `model` sang bộ nhớ GPU xử lý là gì?",
        "options": [
            ("A", "`model.gpu()`"),
            ("B", "`model.to('cuda')` (hoặc `model.cuda()`)"),
            ("C", "`model.cuda.enable()`"),
            ("D", "`model.device('GPU')`")
        ],
        "correctAnswer": "B",
        "explanation": "Trong PyTorch, phương thức `.to(device)` (ví dụ `model.to('cuda')` hoặc `model.to(torch.device('cuda:0'))`) là cú pháp chuẩn để chuyển đổi tensor và module giữa các thiết bị.",
        "tags": "voai-2025,pytorch,cuda,gpu"
    },
    {
        "slug": "voai-2025-q80-mse-calculation-values",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Trung bình",
        "question": """Hàm mất mát trung bình bình phương sai số (MSE) từ tập dữ liệu gồm 8 quan sát sau:
- Giá trị kỳ vọng $\\hat{y}$: $[15, 17, 10, 26, 14, 12, 11, 13]$
- Giá trị thực tế $y$: $[12, 19, 15, 24, 13, 14, 8, 11]$

Giá trị MSE bằng bao nhiêu?""",
        "options": [
            ("A", "8.5"),
            ("B", "6.5"),
            ("C", "5.5"),
            ("D", "7.0")
        ],
        "correctAnswer": "D",
        "explanation": """Tính độ lệch $(y_i - \\hat{y}_i)$:
- $(12-15)^2 = 9$
- $(19-17)^2 = 4$
- $(15-10)^2 = 25$
- $(24-26)^2 = 4$
- $(13-14)^2 = 1$
- $(14-12)^2 = 4$
- $(8-11)^2 = 9$
- $(11-13)^2 = 4$
Tổng bình phương sai số: $9 + 4 + 25 + 4 + 1 + 4 + 9 + 4 = 56$.
Giá trị $\\text{MSE} = 56 / 8 = 7.0$.""",
        "tags": "voai-2025,mse,calculation,regression"
    },
    {
        "slug": "voai-2025-q81-langchain-purpose",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": "Thư viện mã nguồn mở LangChain được sử dụng phổ biến nhất cho mục đích gì trong kỹ nghệ AI?",
        "options": [
            ("A", "Phân tích âm thanh"),
            ("B", "Dịch máy ngữ pháp"),
            ("C", "Sinh văn bản ngẫu nhiên không điều kiện"),
            ("D", "Kết nối và xây dựng chuỗi quy trình ứng dụng cho mô hình ngôn ngữ lớn (LLM Orchestration & Agent Pipelines)")
        ],
        "correctAnswer": "D",
        "explanation": "LangChain cung cấp các module trừu tượng hóa để liên kết LLMs với nguồn dữ liệu ngoài (RAG), vector databases, bộ nhớ ngữ cảnh và các công cụ thực thi (tools/agents).",
        "tags": "voai-2025,langchain,llm,agents"
    },
    {
        "slug": "voai-2025-q82-scikit-learn-logistic-weights-attr",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Trong mô hình `LogisticRegression` của thư viện Scikit-learn sau khi đã gọi phương thức `.fit()`, thuộc tính nào chứa các trọng số hệ số góc đã học của mô hình?",
        "options": [
            ("A", "`model.weights_`"),
            ("B", "`model.intercept_`"),
            ("C", "`model.coefficients_`"),
            ("D", "`model.coef_`")
        ],
        "correctAnswer": "D",
        "explanation": "Trong Scikit-learn, các trọng số đặc trưng của mô hình tuyến tính được lưu trong mảng `model.coef_`, còn hệ số chặn (bias) được lưu trong `model.intercept_`.",
        "tags": "voai-2025,scikit-learn,logistic-regression,attributes"
    },
    {
        "slug": "voai-2025-q83-silhouette-coefficient-calc",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Trung bình",
        "question": """Hệ số Silhouette của điểm $p$ được định nghĩa: $s(p) = \\frac{b(p) - a(p)}{\\max(a(p), b(p))}$.
Một điểm pixel $p$ thuộc cụm $C_1$ có:
- Khoảng cách trung bình tới các pixel trong cùng cụm $C_1$ là $a(p) = 0.35$.
- Khoảng cách trung bình tới cụm lân cận $C_2$ là $d(p, C_2) = 0.60$.
- Khoảng cách trung bình tới cụm lân cận $C_3$ là $d(p, C_3) = 0.45$.

Tính giá trị hệ số Silhouette $s(p)$ cho pixel $p$.""",
        "options": [
            ("A", "0.0"),
            ("B", "0.222"),
            ("C", "0.125"),
            ("D", "0.308")
        ],
        "correctAnswer": "B",
        "explanation": """$b(p)$ là khoảng cách trung bình nhỏ nhất tới một cụm khác: $b(p) = \\min(0.60, 0.45) = 0.45$.
$\\max(a(p), b(p)) = \\max(0.35, 0.45) = 0.45$.
Hệ số Silhouette:
$$s(p) = \\frac{0.45 - 0.35}{0.45} = \\frac{0.10}{0.45} \\approx 0.2222 \\approx 0.222$$.
Giá trị dương thể hiện mẫu đã được phân vào cụm phù hợp.""",
        "tags": "voai-2025,clustering,silhouette-coefficient,calculation"
    },
    {
        "slug": "voai-2025-q84-poor-weight-init-consequences",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Nếu khởi tạo trọng số (Weight Initialization) không phù hợp (quá lớn hoặc quá nhỏ), hiện tượng nguy hiểm nào có thể xảy ra trong quá trình huấn luyện mạng sâu?",
        "options": [
            ("A", "Mô hình học nhanh hơn"),
            ("B", "Không ảnh hưởng vì bộ tối ưu sẽ tự điều chỉnh"),
            ("C", "Học quá mức nhẹ"),
            ("D", "Hiện tượng gradient biến mất (Vanishing Gradient) hoặc bùng nổ gradient (Exploding Gradient)")
        ],
        "correctAnswer": "D",
        "explanation": "Khởi tạo quá lớn làm tích lũy gradient qua nhiều tầng bùng nổ theo hàm mũ (Exploding), còn khởi tạo quá nhỏ làm gradient co lại về 0 qua các tầng sâu (Vanishing), khiến các tầng đầu tiên không thể cập nhật trọng số.",
        "tags": "voai-2025,weight-initialization,vanishing-gradient,exploding-gradient"
    },
    {
        "slug": "voai-2025-q85-imbalanced-macro-f1-metric",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Để đánh giá mô hình phân loại ảnh với các lớp phân bố không cân bằng, chỉ số nào sau đây nên được dùng thay cho độ chính xác tổng thể (Accuracy)?",
        "options": [
            ("A", "AUC"),
            ("B", "Điểm F1 trung bình vĩ mô (Macro F1-score)"),
            ("C", "RMSE"),
            ("D", "Top-1 Accuracy")
        ],
        "correctAnswer": "B",
        "explanation": "Macro F1 tính chỉ số F1 riêng rẽ cho từng lớp rồi lấy trung bình cộng không trọng số, gán tầm quan trọng như nhau cho tất cả các lớp bất kể số lượng mẫu ít hay nhiều, phản ánh chính xác hiệu năng trên các lớp hiếm.",
        "tags": "voai-2025,macro-f1,metrics,class-imbalance"
    },
    {
        "slug": "voai-2025-q86-deploy-tensorrt-onnx",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Sau khi huấn luyện mô hình phân loại đạt độ chính xác 90%, bước tiếp theo để tối ưu hóa mô hình trước khi triển khai sản xuất thực tế (Production Deployment) với độ trễ thấp là gì?",
        "options": [
            ("A", "Nén ảnh đầu vào"),
            ("B", "Xuất mô hình sang định dạng chuẩn trung gian ONNX và tối ưu hóa tăng tốc suy luận bằng TensorRT / OpenVINO"),
            ("C", "Tăng thêm số epoch để đạt 95%"),
            ("D", "Thay đổi mô hình sang BERT")
        ],
        "correctAnswer": "B",
        "explanation": "ONNX và TensorRT cung cấp các kỹ thuật tối ưu hóa mức thấp như hợp nhất lớp (layer fusion), lượng tử hóa trọng số (FP16/INT8 quantization) và cấp phát bộ nhớ tối ưu, giảm đáng kể độ trễ suy luận trên phần cứng triển khai.",
        "tags": "voai-2025,deployment,onnx,tensorrt"
    },
    {
        "slug": "voai-2025-q87-corrupted-image-dataloader-handling",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Thị giác máy tính (CV)",
        "difficulty": "Cơ bản",
        "question": "Khi xử lý tập dữ liệu ảnh lớn, nếu một số file ảnh bị hỏng không thể mở được, cách xử lý chuyên nghiệp và an toàn nhất trong DataLoader là gì?",
        "options": [
            ("A", "Tăng kích thước lô để bù lại"),
            ("B", "Bỏ qua toàn bộ thư mục chứa ảnh đó"),
            ("C", "Sử dụng khối `try-except` bắt lỗi giải mã ảnh, bỏ qua ảnh hỏng và nạp mẫu hợp lệ thay thế"),
            ("D", "Dừng toàn bộ quá trình huấn luyện")
        ],
        "correctAnswer": "C",
        "explanation": "Trong Dataset class của PyTorch, bao bọc lệnh nạp ảnh bằng `try-except` cho phép bỏ qua các file hỏng mà không làm sập (crash) quy trình huấn luyện của DataLoader đa luồng.",
        "tags": "voai-2025,dataloader,error-handling,data-pipeline"
    },
    {
        "slug": "voai-2025-q88-pytorch-dropout-syntax",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Trong PyTorch, để thêm lớp bỏ ngẫu nhiên (Dropout) với xác suất ngắt kết nối là 0.5 vào mạng nơ-ron, bạn sử dụng câu lệnh nào?",
        "options": [
            ("A", "`F.dropout(0.5)`"),
            ("B", "`nn.dropout(0.5)`"),
            ("C", "`nn.Dropout(p=0.5)`"),
            ("D", "`nn.Dropout2d(0.5)` cho vector phẳng")
        ],
        "correctAnswer": "C",
        "explanation": "Trong submodule `torch.nn`, lớp Dropout chuẩn cho vector 1D là `nn.Dropout(p=0.5)`, trong đó tham số `p` xác định tỷ lệ neuron bị vô hiệu hóa ngẫu nhiên trong pha train.",
        "tags": "voai-2025,pytorch,dropout,syntax"
    },
    {
        "slug": "voai-2025-q89-threat-detection-recall-priority",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Trong hệ thống an ninh mạng phát hiện các gói tin tấn công độc hại (chiếm tỷ lệ rất nhỏ), yêu cầu tối thượng là KHÔNG ĐƯỢC BỎ SÓT bất kỳ mối đe dọa nào. Độ đo nào là quan trọng nhất để đánh giá hệ thống?",
        "options": [
            ("A", "Độ chính xác tổng thể (Accuracy)"),
            ("B", "Điểm F1"),
            ("C", "Độ thu hồi (Recall / Sensitivity)"),
            ("D", "Độ chuẩn xác (Precision)")
        ],
        "correctAnswer": "C",
        "explanation": "$\\text{Recall} = \\frac{\\text{TP}}{\\text{TP} + \\text{FN}}$. Khi mục tiêu là cực tiểu hóa số lượng mối đe dọa bị bỏ lọt (False Negatives - FN), ta phải tối đại hóa chỉ số Recall.",
        "tags": "voai-2025,recall,metrics,security"
    },
    {
        "slug": "voai-2025-q90-decision-tree-scale-invariance",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": "Phương pháp học máy nào dưới đây mà việc chuẩn hóa thang đo các thuộc tính đầu vào (Feature Scaling) hoàn toàn KHÔNG ẢNH HƯỞNG đến kết quả phân chia và dự đoán của mô hình?",
        "options": [
            ("A", "Mạng nơ-ron sâu (Neural Networks)"),
            ("B", "Cây quyết định (Decision Tree / Random Forest)"),
            ("C", "Soft-margin SVM"),
            ("D", "K-láng giềng gần nhất (k-NN)")
        ],
        "correctAnswer": "B",
        "explanation": "Cây quyết định phân chia tại mỗi nút dựa trên các điều kiện so sánh đơn biến ($x_j \\le \\theta$). Phép biến đổi đơn điệu (như nhân với hằng số dương hoặc chuẩn hóa Min-Max) chỉ làm dịch chuyển giá trị ngưỡng $\\theta$ tương ứng mà không hề thay đổi thứ tự tương đối hay giá trị Information Gain.",
        "tags": "voai-2025,decision-tree,scale-invariance"
    },
    {
        "slug": "voai-2025-q91-cbow-word2vec-objective",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": "Mục tiêu huấn luyện của kiến trúc CBOW (Continuous Bag-of-Words) trong mô hình Word2Vec là gì?",
        "options": [
            ("A", "Sử dụng toàn bộ văn bản để dự đoán một từ bất kỳ"),
            ("B", "Sử dụng vị trí của từ trong câu để dự đoán nghĩa của câu"),
            ("C", "Sử dụng ngữ cảnh các từ xung quanh để dự đoán từ trung tâm"),
            ("D", "Sử dụng từ trung tâm để dự đoán các từ ngữ cảnh xung quanh")
        ],
        "correctAnswer": "C",
        "explanation": "CBOW lấy trung bình các vector nhúng của các từ ngữ cảnh xung quanh trong cửa sổ để dự đoán từ mục tiêu ở giữa ($P(w_t | w_{t-c}, ..., w_{t+c})$). Ngược lại, Skip-gram dùng từ trung tâm để dự đoán các từ xung quanh.",
        "tags": "voai-2025,cbow,word2vec,nlp"
    },
    {
        "slug": "voai-2025-q92-contrastive-learning-core-goal",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Trung bình",
        "question": "Mục tiêu chính của phương pháp học tương phản (Contrastive Learning) trong học tự giám sát (Self-supervised learning) là gì?",
        "options": [
            ("A", "Tối thiểu hóa khoảng cách Euclidean giữa mọi cặp ảnh ngẫu nhiên trong batch"),
            ("B", "Khôi phục ảnh gốc từ ảnh đã bị thêm nhiễu Gaussian"),
            ("C", "Đưa các biểu diễn của các góc nhìn biến đổi từ cùng một ảnh gốc tới gần nhau, đồng thời đẩy xa biểu diễn của các ảnh khác nhau trên không gian nhúng"),
            ("D", "Tối ưu hóa hàm cross-entropy có nhãn đầy đủ")
        ],
        "correctAnswer": "C",
        "explanation": "Hàm mất mát tương phản (như InfoNCE loss) tối đa hóa sự tương đồng giữa các cặp tích cực (positive pairs - sinh từ cùng một ảnh qua biến đổi) và tối thiểu hóa sự tương đồng giữa các cặp tiêu cực (negative pairs).",
        "tags": "voai-2025,contrastive-learning,infonce,self-supervised"
    },
    {
        "slug": "voai-2025-q93-sgd-vs-minibatch-difference",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Tối ưu hóa & Đạo đức AI",
        "difficulty": "Cơ bản",
        "question": "Điểm khác biệt cốt lõi giữa Stochastic Gradient Descent (SGD thuần túy) và Mini-Batch Gradient Descent là gì?",
        "options": [
            ("A", "SGD luôn hội tụ nhanh hơn"),
            ("B", "Mini-Batch Gradient Descent là một thuật toán hoàn toàn khác"),
            ("C", "SGD không dùng được trong mạng nơ-ron"),
            ("D", "SGD cập nhật tham số sau mỗi mẫu dữ liệu đơn lẻ, trong khi Mini-Batch cập nhật sau một lô gồm nhiều mẫu dữ liệu")
        ],
        "correctAnswer": "D",
        "explanation": "SGD thuần túy tính gradient trên đúng 1 mẫu ($B=1$), có độ nhiễu cao. Mini-Batch SGD tính trung bình gradient trên một nhóm $B$ mẫu ($B$ thường từ 32 đến 512), cân bằng giữa tốc độ tính toán phần cứng song song của GPU và độ ổn định của gradient.",
        "tags": "voai-2025,sgd,mini-batch,optimization"
    },
    {
        "slug": "voai-2025-q94-cosine-similarity-vector-w1-w4",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Toán học & Ma trận",
        "difficulty": "Trung bình",
        "question": """Cho 4 vector đặc trưng nhúng:
- $w_1 = [0.8, 0.6, 0.0, 0.2]$
- $w_2 = [0.9, 0.5, 0.1, 0.3]$
- $w_3 = [1.0, 0.1, 0.0, 0.0]$
- $w_4 = [0.0, 0.1, 0.9, 0.3]$

Dựa vào độ tương đồng Cosine $\\text{sim}(A, B) = \\frac{A \\cdot B}{\\|A\\| \\|B\\|}$, vector nào gần nhất (có góc nhỏ nhất) với vector $w_1$?""",
        "options": [
            ("A", "Có nhiều hơn một từ gần nhất với $w_1$"),
            ("B", "$w_3$"),
            ("C", "$w_4$"),
            ("D", "$w_2$")
        ],
        "correctAnswer": "D",
        "explanation": """Xét tích vô hướng $w_1 \\cdot w_i$:
- $w_1 \\cdot w_2 = 0.8(0.9) + 0.6(0.5) + 0 + 0.2(0.3) = 0.72 + 0.30 + 0.06 = 1.08$. Độ dài: $\\|w_1\\| = \\sqrt{0.64+0.36+0.04} = \\sqrt{1.04} \\approx 1.02$. $\\|w_2\\| = \\sqrt{0.81+0.25+0.01+0.09} = \\sqrt{1.16} \\approx 1.077$. $\\text{sim}(w_1, w_2) = 1.08 / (1.02 \\times 1.077) \\approx 0.983$ (Gần như trùng khớp hướng).
- $w_1 \\cdot w_3 = 0.8(1.0) + 0.6(0.1) = 0.86 \\implies \\text{sim} \\approx 0.86 / 1.025 \\approx 0.839$.
- $w_1 \\cdot w_4 = 0.6(0.1) + 0.2(0.3) = 0.12$ (Rất nhỏ).
Do đó $w_2$ có độ tương đồng cosin cao nhất.""",
        "tags": "voai-2025,cosine-similarity,vector,calculation"
    },
    {
        "slug": "voai-2025-q95-gan-two-core-subnetworks",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "AI Tạo sinh (Generative AI)",
        "difficulty": "Cơ bản",
        "question": "Mạng đối nghịch tạo sinh (Generative Adversarial Network - GAN) bao gồm hai mạng nơ-ron chính nào cạnh tranh đối kháng với nhau?",
        "options": [
            ("A", "Bộ phát hiện (Detector) và Bộ phân đoạn (Segmentor)"),
            ("B", "Bộ chuyển đổi (Transformer) và Cơ chế chú ý (Attention)"),
            ("C", "Bộ mã hóa (Encoder) và Bộ giải mã (Decoder)"),
            ("D", "Bộ tạo (Generator) và Bộ phân biệt (Discriminator)")
        ],
        "correctAnswer": "D",
        "explanation": "Trong GAN (Goodfellow et al., 2014), Generator học cách sinh dữ liệu giả từ vector nhiễu ngẫu nhiên, còn Discriminator học cách phân biệt giữa dữ liệu thật từ tập huấn luyện và dữ liệu giả từ Generator thông qua trò chơi minimax hai người.",
        "tags": "voai-2025,gan,generator,discriminator,generative-ai"
    },
    {
        "slug": "voai-2025-q96-causes-of-overfitting",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Mạng nơ-ron & Học sâu",
        "difficulty": "Cơ bản",
        "question": "Hiện tượng quá khớp (Overfitting) trong mô hình học máy có thể bắt nguồn từ nguyên nhân chủ yếu nào?",
        "options": [
            ("A", "Lựa chọn mô hình có dung lượng tham số quá phức tạp so với lượng dữ liệu huấn luyện hạn chế"),
            ("B", "Độ phức tạp của bài toán quá nhỏ"),
            ("C", "Dùng hàm kích hoạt ReLU"),
            ("D", "Huấn luyện quá ít epoch")
        ],
        "correctAnswer": "A",
        "explanation": "Khi năng lực biểu diễn (capacity) của mô hình quá lớn so với số lượng điểm dữ liệu, mô hình có xu hướng 'học vẹt' và ghi nhớ chi tiết từng mẫu kể cả nhiễu ngẫu nhiên thay vì học được cấu trúc phân phối tổng thể.",
        "tags": "voai-2025,overfitting,model-capacity,bias-variance"
    },
    {
        "slug": "voai-2025-q97-autoencoder-blurry-reconstructions",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "AI Tạo sinh (Generative AI)",
        "difficulty": "Trung bình",
        "question": "Khi huấn luyện bộ tự mã hóa (Autoencoder / VAE), nếu ảnh đầu ra tái tạo bị hiện tượng mờ (blurry) và mất các chi tiết sắc nét tần số cao, nguyên nhân có thể là gì?",
        "options": [
            ("A", "Tỷ lệ bỏ ngẫu nhiên quá thấp"),
            ("B", "Bộ tối ưu sai"),
            ("C", "Số chiều của lớp không gian ẩn (latent bottleneck) quá nhỏ hoặc chính quy hóa mất mát tái tạo (L2 / MSE loss) có xu hướng làm mượt trung bình các pixel"),
            ("D", "Kích thước lô quá lớn")
        ],
        "correctAnswer": "C",
        "explanation": "Hàm mất mát $L_2$ (MSE) đạt cực tiểu tại giá trị trung bình pixel của các khả năng có thể, dẫn đến các cạnh sắc bị mờ hóa. Ngoài ra, nghẽn cổ chai tiềm ẩn quá hẹp làm mất mát thông tin tần số cao.",
        "tags": "voai-2025,autoencoder,blurriness,latent-space"
    },
    {
        "slug": "voai-2025-q98-dalle-primary-capability",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "AI Tạo sinh (Generative AI)",
        "difficulty": "Cơ bản",
        "question": "Mô hình DALL-E của OpenAI nổi tiếng thế giới nhờ khả năng vượt trội nào?",
        "options": [
            ("A", "Phân đoạn vật thể trong ảnh"),
            ("B", "Sinh ra các hình ảnh nghệ thuật và chân thực có độ phân giải cao từ câu mô tả văn bản tự nhiên (Text-to-Image Generation)"),
            ("C", "Nén video"),
            ("D", "Nhận dạng giọng nói")
        ],
        "correctAnswer": "B",
        "explanation": "DALL-E là mô hình tạo sinh đa phương thức (Multimodal Generative Model) có khả năng hiểu sâu sắc văn bản ngôn ngữ tự nhiên và chuyển hóa thành hình ảnh chất lượng cao tương ứng.",
        "tags": "voai-2025,dalle,text-to-image,generative-ai"
    },
    {
        "slug": "voai-2025-q99-stopword-removal-purpose",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Xử lý ngôn ngữ tự nhiên (NLP)",
        "difficulty": "Cơ bản",
        "question": "Trong tiền xử lý ngôn ngữ tự nhiên (NLP) cổ điển, mục đích chính của việc loại bỏ các từ dừng (stopwords như 'và', 'của', 'là', 'the', 'is') khỏi văn bản là gì?",
        "options": [
            ("A", "Để giảm số lượng từ trong tập huấn luyện xuống 0"),
            ("B", "Để tạo ra các câu văn mới hoàn chỉnh"),
            ("C", "Để làm giảm độ phức tạp chiều từ vựng và giúp mô hình tập trung vào các từ mang nội dung ngữ nghĩa quan trọng"),
            ("D", "Để giữ lại tất cả các từ ngữ pháp")
        ],
        "correctAnswer": "C",
        "explanation": "Các từ dừng xuất hiện với tần suất cực cao trong hầu như mọi văn bản nhưng mang rất ít giá trị thông tin phân biệt lớp. Loại bỏ chúng giúp thu hẹp kích thước không gian vector đặc trưng và tăng tỷ lệ tín hiệu trên nhiễu.",
        "tags": "voai-2025,nlp,stopwords,preprocessing"
    },
    {
        "slug": "voai-2025-q100-svm-linear-decision-calc",
        "competition": "VOAI (Bộ GD&ĐT)",
        "year": 2025,
        "stage": "Vòng sơ loại Quốc gia",
        "topic": "Học máy Cổ điển",
        "difficulty": "Cơ bản",
        "question": """Cho các tham số của mô hình SVM tuyến tính đã huấn luyện:
Vector trọng số $w = [2, -3]$, độ lệch bias $b = 1$.
Dự đoán nhãn $\\text{sign}(w_1 X_1 + w_2 X_2 + b)$ cho mẫu dữ liệu có chỉ số 0 với tọa độ $X_1 = 1, X_2 = 2$ là gì?""",
        "options": [
            ("A", "Không xác định được"),
            ("B", "Không phân loại"),
            ("C", "$+1$"),
            ("D", "$-1$")
        ],
        "correctAnswer": "D",
        "explanation": """Hàm quyết định:
$$f(x) = w^T x + b = 2(1) + (-3)(2) + 1 = 2 - 6 + 1 = -3$$
Vì $f(x) = -3 < 0$, giá trị dự đoán là $\\text{sign}(-3) = -1$.""",
        "tags": "voai-2025,svm,decision-boundary,calculation"
    }
]
