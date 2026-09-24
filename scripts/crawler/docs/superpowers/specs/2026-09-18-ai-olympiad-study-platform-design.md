# Tài liệu Thiết kế Đặc tả: Nền tảng Luyện thi & Nghiên cứu Olympic Trí tuệ Nhân tạo (AI Olympiad Training Platform)

**Ngày lập:** 18-09-2026  
**Trạng thái:** Bản thiết kế đã phê duyệt (Approved)  
**Tác giả:** Kỹ sư Full-Stack & Huấn luyện viên AI Olympiad  

---

## 1. Mục tiêu & Tổng quan Hệ thống

Xây dựng một nền tảng web hiện đại, chuyên sâu và thân thiện nhằm phục vụ công tác bồi dưỡng, luyện thi học sinh giỏi và sinh viên tham gia các kỳ thi Olympic Trí tuệ Nhân tạo quốc tế và quốc gia:
- **IOAI** (International Olympiad in Artificial Intelligence)
- **IAIO** (International Artificial Intelligence Olympiad)
- **USA-NAAO / USAAIO** (USA - North America AI Olympiad)
- **China NOAI** (National Olympiad in AI - Trung Quốc)
- **Polish OAI** (Olimpiada Sztucznej Inteligencji - Ba Lan)
- **Romania ROAI / ONIA** (Olimpiada Nationala de Inteligenta Artificiala - Romania)
- **AICC** (IOAI Community Contests)

### Yêu cầu Cốt lõi
1. **100% Tiếng Việt Chuẩn mực:** Toàn bộ giao diện người dùng (UI), điều hướng, nhãn form, thông báo (toast), đề bài và lời giải đều sử dụng tiếng Việt học thuật chuẩn xác cho lĩnh vực AI/ML.
2. **Kho Đề Thực hành Chuyên sâu (Practical Problems):** Tích hợp toàn bộ 50 bài toán thực tế đã crawl được, đầy đủ đề bài, dataset link, mã nguồn khởi tạo (starter code), và đặc biệt là **Lời giải chi tiết (Editorial)** với phân tích thuật toán, code mẫu PyTorch, và kinh nghiệm thi đấu.
3. **Phân hệ Lý thuyết & Trắc nghiệm Tương tác (Theory & Quiz Center):** Ngân hàng câu hỏi trắc nghiệm lý thuyết và bài toán tự luận toán học AI theo các chuyên đề cốt lõi (Toán giải tích ma trận, Xác suất thống kê, Mạng nơ-ron sâu, Transformers & Attention, Học tăng cường, Đạo đức & An toàn AI), hỗ trợ chấm điểm tức thì kèm giải thích chi tiết bằng KaTeX, và chế độ thi thử bấm giờ (Timed Mock Exam).

---

## 2. Kiến trúc Kỹ thuật & Công nghệ

- **Framework:** Next.js 15 (App Router, Server Actions, React 19, TypeScript)
- **Giao diện & Styling:** Tailwind CSS, shadcn/ui components (Button, Input, Textarea, Select, Badge, Card, Tabs, Resizable Panels, Dialog, Sonner Toast, Progress, Accordion)
- **Cơ sở Dữ liệu & ORM:** Prisma ORM với SQLite (`file:./dev.db`) chạy độc lập không cần cài đặt server CSDL, tương thích 100% để chuyển đổi sang PostgreSQL (Supabase / Neon) khi deploy production.
- **Biểu diễn Toán học & Markdown:** `react-markdown`, `remark-math`, `rehype-katex`, `katex` (hiển thị mượt mà các công thức LaTeX phức tạp: hàm mất mát, ma trận Attention, phân tích kỳ dị SVD, phương trình Bellman).
- **Tô màu Cú pháp Mã nguồn:** Cú pháp Python, PyTorch, C++ với chế độ Copy nhanh.
- **Form & Validation:** React Hook Form + Zod schema validation.

---

## 3. Mô hình Cơ sở Dữ liệu (`prisma/schema.prisma`)

```prisma
datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Problem {
  id               String   @id @default(cuid())
  slug             String   @unique
  competition      String   // "IOAI", "IAIO", "US-NAAO", "NOAI", "Polish-OAI", "ROAI", "AICC"
  year             Int      
  stage            String   // "Vòng thi Thực hành - On-Site", "Vòng thi Khoa học - At-Home", "Chung kết Quốc gia"
  title            String   // Tiêu đề bài toán (Tiếng Việt)
  domain           String   // "Thị giác máy tính (CV)", "Xử lý ngôn ngữ tự nhiên (NLP)", "Học máy bảng số (Tabular ML)", "Lý thuyết & Toán AI", "Học tăng cường & Tìm kiếm", "Âm thanh & Tín hiệu", "AI Tạo sinh (Generative AI)", "Đa phương thức (Multimodal)"
  difficulty       String   // "Cơ bản", "Trung bình", "Nâng cao", "Chung kết Quốc tế"
  evaluationMetric String?  // "Macro F1", "Accuracy", "ROC-AUC", "MSE", "RMSE", "IoU", "mAP", "Perplexity"
  tags             String   // Chuỗi nhãn cách nhau bằng dấu phẩy
  description      String   // Nội dung đề bài dạng Markdown + LaTeX
  editorial        String?  // Lời giải chi tiết: Trực giác toán học, Chiến lược thuật toán, PyTorch Code, Cạm bẫy
  starterCode      String?  // Mã nguồn mẫu / template ban đầu (Python/PyTorch)
  datasetUrl       String?  // Đường dẫn tải dataset (Kaggle / Drive / Direct link)
  officialPdfUrl   String?  // Đường dẫn xem tài liệu chính thức
  createdAt        DateTime @default(now())
  updatedAt        DateTime @updatedAt
}

model TheoryQuestion {
  id            String   @id @default(cuid())
  slug          String   @unique
  competition   String   // "IAIO", "IOAI", "NOAI", "US-NAAO", "Luyện tập Olympic"
  year          Int
  stage         String   // "Vòng thi Lý thuyết", "Vòng loại Trắc nghiệm"
  topic         String   // "Toán học & Ma trận", "Xác suất & Thống kê", "Mạng nơ-ron & Học sâu", "Transformers & Attention", "Học tăng cường", "Tối ưu hóa & Đạo đức AI"
  difficulty    String   // "Cơ bản", "Trung bình", "Nâng cao", "Chung kết Quốc tế"
  question      String   // Nội dung câu hỏi (Markdown + LaTeX)
  options       String   // JSON string lưu mảng: [{"id":"A","text":"..."},{"id":"B","text":"..."},{"id":"C","text":"..."},{"id":"D","text":"..."}]
  correctAnswer String   // "A", "B", "C", hoặc "D"
  explanation   String   // Lời giải thích toán học chi tiết, giải thích vì sao A/B/C/D đúng/sai (Markdown + LaTeX)
  tags          String   // Chuỗi nhãn phân loại
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model UserProgress {
  id          String   @id @default(cuid())
  targetId    String   // ID của Problem hoặc TheoryQuestion
  targetType  String   // "PROBLEM" hoặc "THEORY"
  status      String   // "COMPLETED", "IN_PROGRESS", "BOOKMARKED"
  selectedAns String?  // Đáp án đã chọn (nếu là trắc nghiệm)
  isCorrect   Boolean? // Kết quả trả lời đúng/sai
  notes       String?  // Ghi chú học tập cá nhân
  updatedAt   DateTime @updatedAt
}
```

---

## 4. Cấu trúc Điều hướng & Các Trang Chức năng

### 4.1. Trang chủ (`/`)
- **Hero Section:** Tiêu đề ấn tượng, tôn vinh sứ mệnh chinh phục Olympic AI quốc tế.
- **Thống kê Tổng quan (Live Dashboard Metrics):**
  - Số lượng bài toán thực hành (50 bài toán từ 7 giải đấu).
  - Ngân hàng trắc nghiệm lý thuyết (hàng chục câu hỏi có lời giải KaTeX chi tiết).
  - Phân bổ theo 8 lĩnh vực chuyên môn (CV, NLP, Tabular ML, Audio, Math/Theory, RL, GenAI, Multimodal).
  - Phân bổ theo độ khó và giải đấu.
- **Đề thi Nổi bật & Mới nhất:** Danh sách thẻ bài toán tiêu biểu (IOAI 2025 Radar, IAIO FlashAttention, NOAI Basketball, Polish-OAI Coin Counter).
- **Lộ trình Chinh phục AI Olympiad:** 4 cấp độ từ Nhập môn Toán AI -> ML Truyền thống -> Deep Learning & PyTorch -> Olympic Quốc tế.

### 4.2. Kho Đề Thực hành & Luyện giải Mã nguồn (`/problems`)
- **Bộ lọc đa chiều:**
  - Lọc theo Giải đấu: IOAI, IAIO, US-NAAO, China NOAI, Polish OAI, Romania ROAI, AICC.
  - Lọc theo Lĩnh vực (Domain): Thị giác máy tính, Xử lý ngôn ngữ tự nhiên, Dữ liệu bảng số, Âm thanh, Lý thuyết/Toán, Học tăng cường...
  - Lọc theo Độ khó: Cơ bản, Trung bình, Nâng cao, Chung kết Quốc tế.
  - Lọc theo Tiêu chí chấm (Metric): Macro F1, Accuracy, IoU, RMSE, ROC-AUC...
- **Tìm kiếm toàn văn (Search):** Tìm theo tên bài toán, nhãn (tags), nội dung.
- **Thẻ bài toán (Problem Card):** Hiển thị rõ ràng năm, giải đấu, độ khó, badge lĩnh vực, tiêu chí chấm, chỉ báo có sẵn Dataset và Lời giải chi tiết.

### 4.3. Phòng Luyện thi & Xem Lời giải Chi tiết (`/problems/[slug]`)
- **Thanh tiêu đề:** Thông tin bài thi, link tải Dataset, link Notebook giải mẫu, link bài thi gốc.
- **Hệ thống Tab tương tác:**
  - **Tab 1: Đề bài & Yêu cầu:** Hiển thị toàn văn đề bài, bối cảnh, mô tả các trường dữ liệu, tiêu chí đánh giá, định dạng nộp bài (render Markdown + LaTeX KaTeX mượt mà).
  - **Tab 2: Lời giải Chi tiết (Editorial) [TRỌNG TÂM]:**
    1. *Trực giác Toán học & Phân tích Lý thuyết:* Tại sao chọn phương pháp này, phân tích hàm mục tiêu, gradient, cấu trúc dữ liệu.
    2. *Chiến lược Xây dựng Mô hình:* Từ Baseline đơn giản (điểm cơ bản) đến Chiến lược Top 1 Huy chương Vàng (điểm tối đa).
    3. *Mã nguồn PyTorch Hoàn chỉnh:* Code sạch, chú thích tiếng Việt từng bước (tiền xử lý dữ liệu, định nghĩa kiến trúc mạng, vòng lặp huấn luyện, inference).
    4. *Cạm bẫy & Mẹo thi đấu:* Xử lý overfitting, mất cân bằng nhãn (class imbalance), tối ưu GPU/memory, thủ thuật cải thiện điểm số.
  - **Tab 3: Mã nguồn Mẫu (Starter Code):** Đoạn mã khởi tạo để thí sinh copy và bắt đầu làm bài ngay.
  - **Tab 4: Ghi chú & Luyện tập Cá nhân:**
    - Đồng hồ đếm giờ làm bài thi thử (Mock Exam Timer: 3 giờ hoặc 5 giờ).
    - Đánh dấu trạng thái: "Đã hoàn thành", "Đang giải quyết", "Lưu xem lại".
    - Khung ghi chép cá nhân (Personal Notes) lưu trực tiếp vào CSDL.

### 4.4. Trung tâm Luyện thi Lý thuyết & Trắc nghiệm (`/theory`)
- **Phân khu 1: Luyện tập Trắc nghiệm theo Chủ đề (`/theory` -> Tab Trắc nghiệm):**
  - Phân loại theo 6 chuyên đề Olympic: Đại số tuyến tính & Ma trận, Xác suất & Thống kê AI, Deep Learning, Transformers & Attention, Học tăng cường, Tối ưu hóa & Đạo đức AI.
  - Chọn đáp án A, B, C, D.
  - Hiển thị kết quả tức thì: Màu Xanh nếu Đúng, Đỏ nếu Sai.
  - Hộp giải thích KaTeX chuyên sâu: Chứng minh toán học vì sao phương án được chọn là đúng, phân tích chi tiết lỗi sai của các phương án còn lại.
- **Phân khu 2: Thi thử Lý thuyết Bấm giờ (`/theory` -> Tab Thi thử Bấm giờ):**
  - Chế độ phòng thi mô phỏng đề thi vòng loại Olympic (20 - 30 câu trong 45 - 60 phút).
  - Đồng hồ đếm ngược tự động nộp bài khi hết giờ.
  - Bảng tổng kết kết quả: Điểm số, phần trăm chính xác, xếp loại Huy chương Olympic (Vàng, Bạc, Đồng, Khuyến khích).
- **Phân khu 3: Bài toán Tự luận Lý thuyết (`/theory` -> Tab Tự luận):**
  - Tuyển tập các bài toán chứng minh giải tích chuyên sâu (PAC learning bounds, chứng minh ma trận hiệp phương sai trong PCA, tốc độ hội tụ của Momentum, phân tích suy biến Gradient).

### 4.5. Khung Chương trình & Chuẩn Kiến thức (`/syllabus`)
- Toàn bộ đề cương chi tiết chuẩn IOAI và IAIO:
  - Nền tảng Toán học: Không gian vector, Tích vô hướng, Định thức, Phân rã giá trị kỳ dị (SVD), Đạo hàm ma trận.
  - Xác suất & Thống kê: Biến ngẫu nhiên đa chiều, Ước lượng MLE/MAP, Entropy & KL Divergence, Định lý Bayes.
  - Kỹ thuật Học máy: Hồi quy tuyến tính, SVM, Cây quyết định, Random Forest, K-Means, PCA, T-SNE.
  - Học sâu & Kiến trúc: CNN, ResNet, ViT, RNN, LSTM, Transformer (Self-Attention, Cross-Attention, Multi-Head).
  - Kỹ thuật Huấn luyện: Khởi tạo trọng số, Hàm mất mát, Regularization, Kỹ thuật tối ưu (SGD, Momentum, AdamW), Tinh chỉnh mô hình (Fine-tuning, LoRA).
  - Học tăng cường: MDP, Bellman Equation, Q-Learning, Policy Gradient.
  - Đạo đức & An toàn: Thiên kiến thuật toán, Bảo vệ quyền riêng tư, Tấn công đối kháng.
- Kèm liên kết trực tiếp tới các bài toán thực hành và câu hỏi lý thuyết tương ứng trên trang web.

---

## 5. Kế hoạch Triển khai (Implementation Steps)

1. **Khởi tạo Dự án Next.js 15:**
   - Tạo thư mục `platform` với Next.js 15, TypeScript, Tailwind CSS, App Router.
   - Cài đặt các thư viện phụ thuộc: `@prisma/client`, `prisma`, `lucide-react`, `class-variance-authority`, `clsx`, `tailwind-merge`, `react-markdown`, `remark-math`, `rehype-katex`, `katex`, `canvas-confetti`, `sonner`.
2. **Cấu hình Prisma & Viết Script Nạp Dữ liệu (Seed Data):**
   - Tạo `prisma/schema.prisma` chuẩn SQLite `dev.db`.
   - Viết script `prisma/seed.ts` đọc toàn bộ 50 file JSON/MD đã crawl từ `data/problems/`, chuyển hóa sang tiếng Việt học thuật, tạo lời giải chi tiết (Editorial), PyTorch code, và khởi tạo ngân hàng trắc nghiệm lý thuyết phong phú.
   - Chạy `npx prisma db push` và `npx prisma db seed`.
3. **Xây dựng Thư viện Thành phần Giao diện (UI Components):**
   - Thiết lập hệ thống thiết kế màu sắc Dark/Light mode cao cấp phong cách Olympic AI (Navy sâu `#0B0F19`, Indigo Accent `#4F46E5`, Emerald Gold `#EAB308` & `#10B981`).
   - Xây dựng component render công thức toán `MarkdownMath` hỗ trợ đầy đủ LaTeX KaTeX.
   - Xây dựng component xem code `CodeViewer` hỗ trợ sao chép, đánh số dòng.
   - Xây dựng thanh điều hướng `Navbar` và chân trang `Footer` 100% tiếng Việt.
4. **Triển khai Các Trang Chức năng:**
   - Trang chủ (`/`): Dashboard số liệu, lộ trình, đề thi nổi bật.
   - Trang danh sách bài toán (`/problems`): Bộ lọc đa tiêu chí, tìm kiếm, danh thiếp bài toán.
   - Trang chi tiết bài toán (`/problems/[slug]`): 4 tabs (Đề bài, Lời giải PyTorch chi tiết, Starter code, Ghi chú & Timer).
   - Trung tâm Luyện thi Lý thuyết (`/theory`): 3 tabs (Trắc nghiệm có giải thích tức thì, Thi thử bấm giờ, Tự luận toán học).
   - Khung chương trình chuẩn thi (`/syllabus`): Bản đồ kiến thức liên kết bài tập.
5. **Kiểm thử Toàn diện & Xác thực (Verification):**
   - Kiểm tra build thành công `npm run build`.
   - Khởi chạy server local và kiểm tra hiển thị công thức toán học, trắc nghiệm, lời giải và điều hướng.
