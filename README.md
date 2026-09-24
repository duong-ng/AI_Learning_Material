# 🏆 AI Olympiad Training Platform & Multi-Source Crawler Pipeline

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.7-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?style=for-the-badge&logo=tailwindcss)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-6.4-2d3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![KaTeX](https://img.shields.io/badge/KaTeX-Math%20Engine-00d084?style=for-the-badge&logo=katex)](https://katex.org/)
[![Python 3.10+](https://img.shields.io/badge/Python-3.10%2B-yellow?style=for-the-badge&logo=python)](https://www.python.org/)
[![NVIDIA Nemotron-3 Ultra](https://img.shields.io/badge/AI%20Assistant-Nemotron--3%20Ultra%20550B-76b900?style=for-the-badge&logo=nvidia)](https://build.nvidia.com/)

> **Nền tảng Ôn luyện Chuyên sâu & Hệ thống Thu thập Đề thi Olympic Trí tuệ Nhân tạo (Olympic AI)** chuẩn quốc tế và quốc gia (IOAI, IAIO, VOAI, VAIC, NOAI, Polish OAI, US-NAAO, ROAI...). Tích hợp ngân hàng câu hỏi lý thuyết KaTeX, bài thi bấm giờ và **Trợ lý AI NVIDIA Nemotron-3 Ultra 550B (Reasoning Model)** đồng hành phân tích sâu bản chất toán học.

---

## 📑 Mục Lục

- [✨ Tính Năng Nổi Bật](#-tính-năng-nổi-bật)
- [🏗 Kiến Trúc Dự Án](#-kiến-trúc-dự-án)
- [📋 Yêu Cầu Môi Trường (Prerequisites)](#-yêu-cầu-môi-trường-prerequisites)
- [🚀 Hướng Dẫn Cài Đặt & Chạy Local Trên Máy Khác](#-hướng-dẫn-cài-đặt--chạy-local-trên-máy-khác)
  - [Bước 1: Clone Repository](#bước-1-clone-repository)
  - [Bước 2: Chuẩn bị Ngân hàng Câu hỏi Lý thuyết (Python Crawler)](#bước-2-chuẩn-bị-ngân-hàng-câu-hỏi-lý-thuyết-python-crawler)
  - [Bước 3: Cấu hình Biến Môi trường (.env)](#bước-3-cấu-hình-biến-môi-trường-env)
  - [Bước 4: Cài đặt Dependencies & Khởi tạo Database (Prisma)](#bước-4-cài-đặt-dependencies--khởi-tạo-database-prisma)
  - [Bước 5: Khởi chạy Nền tảng Web](#bước-5-khởi-chạy-nền-tảng-web)
- [🤖 Cấu Hình Trợ Lý AI (NVIDIA Nemotron-3 Ultra 550B)](#-cấu-hình-trợ-lý-ai-nvidia-nemotron-3-ultra-550b)
- [🛠 Khắc Phục Sự Cố Thường Gặp (Troubleshooting)](#-khắc-phục-sự-cố-thường-gặp-troubleshooting)
- [📤 Hướng Dẫn Push Lên GitHub Cá Nhân](#-hướng-dẫn-push-lên-github-cá-nhân)
- [📄 Giấy Phép (License)](#-giấy-phép-license)

---

## ✨ Tính Năng Nổi Bật

### 1. 📚 Ngân hàng 162 câu hỏi lý thuyết Olympic AI chuẩn hóa
- Tổng hợp từ các kỳ thi chính thức: **VOAI 2025** (100 câu), **AI/ML Benchmark Suite v2** (30 câu), **VAIC 2026** (20 câu), **IOAI 2024** (6 câu), **Core Olympiad Math** (6 câu).
- Toàn bộ công thức toán học, ma trận, vector, gradient, hàm mục tiêu đều được render sắc nét qua **KaTeX Engine** ($...$ và $$...$$).
- Phân loại trực quan theo chuyên đề: *Toán học & Ma trận, Tối ưu hóa & Đạo đức AI, Học tăng cường (RL), AI Tạo sinh (Generative AI), Xác suất & Thống kê*.

### 2. 🎯 Chế độ Luyện thi Tập trung (Single-Question Focus Mode)
- **1 câu duy nhất tại một thời điểm**: Giúp học sinh tập trung tối đa, không bị phân tâm bởi việc cuộn trang.
- **Xáo câu hỏi ngẫu nhiên (Fisher-Yates Shuffle)**: Tạo đề ngẫu nhiên chỉ bằng 1 cú click với huy hiệu *"Đã xáo đề"*.
- **Khóa đáp án & Đối soát tức thì**: Chọn phương án $\to$ khóa tương tác $\to$ hiện viền xanh/đỏ $\to$ hiển thị lời giải chi tiết từ Ban Giám khảo.
- **Điều hướng tuần tự (Sequential Flow)**: Chỉ mở khóa nút `Câu tiếp theo →` sau khi học sinh đã hoàn thành câu hỏi hiện tại.

### 3. 🚩 Bảng Ma trận Chọn nhanh (Question Palette) & Hệ thống Gắn Cờ (Flagging)
- Ma trận 162 câu hiển thị trạng thái màu trực quan:
  - 🟢 **Xanh lá**: Đã trả lời đúng.
  - 🔴 **Đỏ**: Đã trả lời sai.
  - ⚪ **Xám**: Chưa làm.
  - 🔵 **Viền sáng**: Câu đang làm hiện tại.
- **Hệ thống Gắn cờ (Flag)**:
  - Nút **`🚩 Gắn cờ lưu`** trên thẻ câu hỏi để đánh dấu các câu quan trọng cần xem lại.
  - Tự động hiển thị **huy hiệu cờ màu vàng cam ở góc trên ô số** kèm viền sáng màu hổ phách.
  - Nút lọc nhanh **`🚩 Đã gắn cờ (N)`** trong bảng câu hỏi giúp lọc tức thì các câu đã lưu chỉ với 1 click.

### 4. 🤖 Trợ lý AI NVIDIA Nemotron-3 Ultra 550B (Reasoning Model)
- Tích hợp mô hình suy luận khổng lồ **550 tỷ tham số** của NVIDIA qua OpenRouter.
- **Bài giảng sư phạm 4 phần toàn diện**:
  1. 🎯 *Bản chất cốt lõi & Cơ sở lý thuyết*: Định lý, đạo hàm, hàm mất mát.
  2. 🔬 *Chứng minh & Phân tích vì sao đáp án đúng*: Diễn giải suy luận từng bước.
  3. ❌ *Bảng so sánh phân tích bẫy tư duy các phương án sai (Markdown GFM Table)*.
  4. 💡 *Mẹo nhận diện nhanh trong phòng thi Olympic (30s)*.
- **Xem chuỗi suy luận logic (Reasoning Chain)**: Mở rộng tư duy phân tích ẩn (Chain-of-Thought) của AI.
- **Hỏi & Đáp tương tác đa lượt (Multi-turn Q&A)**: Hộp chat riêng cho từng câu hỏi với các gợi ý nhanh (*Cho ví dụ số ma trận, Chứng minh toán học từ đầu, Thêm bài tập biến thể...*).
- **Chuẩn hóa định dạng tự động**: Các phương án A, B, C, D luôn được xuống dòng riêng biệt dạng `- **A.** ...`, bảng so sánh features hiển thị chuẩn Dark Mode Glassmorphic.

### 5. ⏱ Thi Thử Bấm Giờ (Mock Exam) & 10 Bài Chứng Minh Toán Học
- Chế độ thi thử 20, 30 hoặc 50 câu trắc nghiệm ngẫu nhiên với đồng hồ đếm ngược.
- 10 bài chứng minh toán học nền tảng chuyên sâu: *Self-Attention Gradient, Adam vs SGD Convergence, Cross-Entropy Loss, Gradient Descent...*

### 6. 🕷 Hệ thống Crawler Đa Nguồn (Python Pipeline)
- Crawler thu thập tự động các bài thi thực hành và lý thuyết từ IOAI, IAIO, VOAI, VAIC, NOAI, Polish OAI, US-NAAO, ROAI ra chuẩn JSON và Markdown.

---

## 🏗 Kiến Trúc Dự Án

```text
Study_AI/
├── .gitignore                          # Cấu hình bỏ qua rác, node_modules, .env, dev.db
├── README.md                           # Tài liệu hướng dẫn dự án chi tiết
├── data/                               # Dữ liệu bài tập đã tổng hợp
│   └── problems/                       # Đề thi thực hành & lý thuyết các kỳ thi
└── scripts/
    └── crawler/                        # Pipeline thu thập & chuẩn hóa câu hỏi
        ├── base.py                     # Lớp cơ sở Crawler (BaseCrawler, RateLimit)
        ├── run_crawlers.py             # CLI điều khiển chính (--theory, --ioai, --all)
        ├── generate_theory_data.py     # Script đóng gói 162 câu lý thuyết KaTeX
        ├── theory_crawler.py           # Crawler thu thập câu hỏi lý thuyết
        ├── ioai_crawler.py             # Crawler International Olympiad in AI
        ├── iaio_crawler.py             # Crawler IAIO
        ├── national_crawlers.py        # Crawler các kỳ thi quốc gia (US, Ba Lan, Romania)
        ├── models.py                   # Data models (Problem, TestCase, Source)
        ├── storage.py                  # Module lưu trữ JSON/Markdown
        ├── theory_packs/               # Gói câu hỏi nguồn chuẩn hóa
        │   ├── voai_2025.py            # Đề thi VOAI 2025 (100 câu)
        │   ├── aiml_v2.py              # Bộ câu hỏi AI/ML Suite v2 (30 câu)
        │   ├── vaic_2026.py            # Đề thi VAIC 2026 (20 câu)
        │   └── ioai_2024.py            # Đề thi IOAI 2024 (6 câu)
        └── platform/                   # Nền tảng Web Application (Next.js 15)
            ├── .env.example            # Mẫu biến môi trường (an toàn để chia sẻ)
            ├── package.json            # Web dependencies & scripts
            ├── tsconfig.json           # Cấu hình TypeScript
            ├── tailwind.config.ts      # Cấu hình giao diện Dark Mode & Animation
            ├── prisma/
            │   ├── schema.prisma       # Mô hình cơ sở dữ liệu SQLite
            │   └── seed.ts             # Script nạp 162 câu hỏi & 10 bài chứng minh
            └── src/
                ├── app/
                │   ├── page.tsx        # Dashboard tổng quan
                │   ├── theory/         # Trang luyện thi lý thuyết chính
                │   │   ├── page.tsx
                │   │   └── theory-center.tsx # Bộ điều khiển Focus Mode, Flag, Palette
                │   ├── api/
                │   │   └── ai-explain/ # API Route kết nối NVIDIA Nemotron 550B
                │   │       └── route.ts
                │   ├── problems/       # Danh mục bài thi thực hành
                │   └── syllabus/       # Khung chương trình chuẩn thi đấu
                └── components/
                    ├── markdown-math.tsx # Renderer KaTeX + GFM Table + Auto-format
                    ├── navbar.tsx      # Thanh điều hướng công nghệ cao
                    └── footer.tsx      # Chân trang
```

---

## 📋 Yêu Cầu Môi Trường (Prerequisites)

Trước khi cài đặt trên máy mới, hãy đảm bảo máy tính đã cài đặt:

| Phần mềm | Phiên bản yêu cầu | Kiểm tra phiên bản |
| :--- | :--- | :--- |
| **Node.js** | $\ge 18.18.0$ (Khuyên dùng $20.x$ hoặc $22.x$) | `node -v` |
| **npm** | $\ge 9.x$ | `npm -v` |
| **Python** | $\ge 3.10$ | `python --version` |
| **Git** | $\ge 2.30$ | `git --version` |

---

## 🚀 Hướng Dẫn Cài Đặt & Chạy Local Trên Máy Khác

### Bước 1: Clone Repository

Mở Terminal (hoặc PowerShell trên Windows) và clone mã nguồn về máy:

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git Study_AI
cd Study_AI
```

---

### Bước 2: Chuẩn bị Ngân hàng Câu hỏi Lý thuyết (Python Crawler)

Từ thư mục gốc `Study_AI`, chạy lệnh sau để tổng hợp và đóng gói 162 câu hỏi lý thuyết KaTeX:

```bash
# Windows PowerShell / CMD / Linux / macOS
python -m scripts.crawler.run_crawlers --theory
```

> **Kết quả:** File dữ liệu chuẩn hóa sẽ được xuất ra tại `scripts/crawler/data/theory/all_theory_questions.json`.
> *(Tùy chọn: Nếu muốn thu thập thêm bài tập thực hành quốc tế IOAI, chạy lệnh: `python -m scripts.crawler.run_crawlers --ioai`)*

---

### Bước 3: Cấu hình Biến Môi trường (.env)

Di chuyển vào thư mục web `scripts/crawler/platform`:

```bash
cd scripts/crawler/platform
```

Sao chép file mẫu `.env.example` thành file `.env`:

* **Trên Windows PowerShell:**
  ```powershell
  Copy-Item .env.example .env
  ```
* **Trên Linux / macOS:**
  ```bash
  cp .env.example .env
  ```

Mở file `.env` vừa tạo và điền `OPENROUTER_API_KEY` của bạn (xem hướng dẫn lấy key miễn phí ở mục bên dưới):

```env
DATABASE_URL="file:./dev.db"
OPENROUTER_API_KEY="sk-or-v1-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
OPENROUTER_MODEL="nvidia/nemotron-3-ultra-550b-a55b:free"
OPENROUTER_BASE_URL="https://openrouter.ai/api/v1"
OPENROUTER_MAX_TOKENS="4096"
```

---

### Bước 4: Cài đặt Dependencies & Khởi tạo Database (Prisma)

Vẫn tại thư mục `scripts/crawler/platform`, tiến hành cài đặt các gói phụ thuộc và nạp dữ liệu vào cơ sở dữ liệu SQLite:

```bash
# 1. Cài đặt các gói npm
npm install

# 2. Sinh Prisma Client
npm run prisma:generate

# 3. Đẩy schema vào SQLite dev.db
npm run prisma:push

# 4. Nạp 162 câu hỏi lý thuyết + 10 bài chứng minh toán học
npm run prisma:seed
```

---

### Bước 5: Khởi chạy Nền tảng Web

Khởi động máy chủ phát triển cục bộ:

```bash
npm run dev
```

Mở trình duyệt và truy cập:
- 🌐 **Trang chủ Dashboard:** [http://localhost:3000](http://localhost:3000)
- 📝 **Đấu trường Luyện thi Lý thuyết:** [http://localhost:3000/theory](http://localhost:3000/theory)

---

## 🤖 Cấu Hình Trợ Lý AI (NVIDIA Nemotron-3 Ultra 550B)

Hệ thống sử dụng mô hình **NVIDIA Nemotron-3 Ultra 550B (Reasoning Model)** để đóng vai trò Huấn luyện viên Olympic AI:

1. **Lấy API Key miễn phí:**
   - Truy cập [OpenRouter.ai](https://openrouter.ai/).
   - Đăng ký tài khoản $\to$ vào mục **Keys** $\to$ bấm **Create Key**.
   - Sao chép khóa (bắt đầu bằng `sk-or-v1-...`) và dán vào biến `OPENROUTER_API_KEY` trong file `scripts/crawler/platform/.env`.
2. **Cơ chế hoạt động:**
   - **Tự động mở rộng Token (`OPENROUTER_MAX_TOKENS=4096`)**: Đảm bảo bài giảng dài với công thức KaTeX không bị ngắt câu giữa chừng.
   - **Tự động viết tiếp (Auto-continuation)**: Nếu gặp câu hỏi cực lớn chạm trần token (`finish_reason === "length"`), backend sẽ tự động gọi tiếp nối chuỗi liền mạch.
   - **Bảo mật tuyệt đối**: Khóa API chỉ nằm ở môi trường Server (`process.env.OPENROUTER_API_KEY`), không bao giờ bị lộ ra ngoài client.

---

## 🛠 Khắc Phục Sự Cố Thường Gặp (Troubleshooting)

### 1. Lỗi `npm : File ... cannot be loaded because running scripts is disabled on this system` (Windows PowerShell)
- **Nguyên nhân:** Chính sách ExecutionPolicy mặc định của PowerShell chặn file script `npm.ps1`.
- **Cách khắc phục:**
  - Cách 1 (Khuyên dùng): Luôn gõ `npm.cmd` thay vì `npm` (ví dụ: `npm.cmd install`, `npm.cmd run dev`).
  - Cách 2: Mở PowerShell với quyền Administrator và chạy lệnh:
    ```powershell
    Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
    ```

### 2. Lỗi `PrismaClientKnownRequestError` hoặc không có câu hỏi nào trên giao diện
- **Nguyên nhân:** Chưa chạy nạp dữ liệu vào file `dev.db`.
- **Cách khắc phục:** Tại thư mục `scripts/crawler/platform`, chạy lại lệnh:
  ```bash
  npm run prisma:seed
  ```

### 3. Cổng 3000 đang bị chiếm dụng (`Port 3000 is in use`)
- **Cách khắc phục:** Next.js sẽ tự động chuyển sang cổng tiếp theo (ví dụ: `http://localhost:3001`). Bạn chỉ cần mở URL theo thông báo trên terminal. Hoặc chỉ định cổng tùy ý:
  ```bash
  npm run dev -- -p 3005
  ```

### 4. Trợ lý AI báo lỗi `Chưa cấu hình OPENROUTER_API_KEY`
- **Cách khắc phục:** Kiểm tra xem bạn đã tạo file `scripts/crawler/platform/.env` và điền key OpenRouter hợp lệ chưa. Sau khi sửa file `.env`, khởi động lại `npm run dev`.

---

## 📤 Hướng Dẫn Push Lên GitHub Cá Nhân

Dự án đã được cấu hình `.gitignore` chuẩn mực để **ngăn chặn hoàn toàn việc rò rỉ API key, file `node_modules`, cache build và cơ sở dữ liệu `dev.db`**.

Để đẩy dự án lên GitHub cá nhân của bạn:

```bash
# 1. Trở về thư mục gốc của dự án
cd d:\Study_AI

# 2. Kiểm tra trạng thái git (đảm bảo chỉ có code sạch)
git status

# 3. Thêm toàn bộ các file sạch vào staging
git add .

# 4. Tạo commit đầu tiên
git commit -m "feat: initial commit AI Olympiad Training Platform & Crawler Pipeline"

# 5. Đổi tên nhánh mặc định thành main (nếu chưa)
git branch -M main

# 6. Liên kết với repository GitHub cá nhân của bạn
# (Thay <username> và <repo-name> bằng link repo GitHub bạn vừa tạo)
git remote add origin https://github.com/<username>/<repo-name>.git

# 7. Đẩy code lên GitHub
git push -u origin main
```

---

## 📄 Giấy Phép (License)

Dự án được phát triển nhằm mục đích giáo dục, nghiên cứu và hỗ trợ cộng đồng học sinh, sinh viên ôn luyện đội tuyển Olympic AI Việt Nam và Quốc tế.

Phát hành theo giấy phép **MIT License**. Bạn được tự do sử dụng, chỉnh sửa và phát triển tiếp cho mục đích học thuật và giáo dục.
