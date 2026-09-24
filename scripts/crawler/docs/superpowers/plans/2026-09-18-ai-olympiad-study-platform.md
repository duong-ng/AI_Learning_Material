# AI Olympiad Study & Training Platform Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a complete, production-grade Next.js 15 web platform in Vietnamese for studying, practicing, and mastering AI Olympiad problems (IOAI, IAIO, US-NAAO, China NOAI, Polish OAI, Romanian ROAI, AICC) with comprehensive PyTorch editorials, LaTeX math rendering, interactive theory quiz center, and mock exam timers.

**Architecture:** Next.js 15 (App Router) full-stack application backed by Prisma ORM and SQLite (`dev.db`). Includes automated seed data ingestion from `data/problems/`, interactive KaTeX math rendering, syntax highlighting for PyTorch/Python, topic-based multiple choice quizzes with instant feedback, and timed mock olympiad rooms.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS, shadcn/ui, Prisma ORM, SQLite, KaTeX, `react-markdown`, `remark-math`, `rehype-katex`, `lucide-react`, `canvas-confetti`, `sonner`.

**Spec:** [`docs/superpowers/specs/2026-09-18-ai-olympiad-study-platform-design.md`](file:///d:/Study_AI/scripts/crawler/docs/superpowers/specs/2026-09-18-ai-olympiad-study-platform-design.md)

## Global Constraints
- 100% natural, academically precise Vietnamese for all UI text, navigation, badges, labels, and explanations.
- All LaTeX formulas must render smoothly via KaTeX (both `$inline$` and `$$block$$`).
- Database schema must reside in `platform/prisma/schema.prisma` using SQLite with PostgreSQL cross-compatibility.
- All 50 problems crawled in Step 1 must be ingested with detailed editorials and code samples.

---

### Task 1: Scaffold Next.js 15 Project with TypeScript, Tailwind CSS, and Dependencies

**Files:**
- Create: `platform/package.json`
- Create: `platform/tsconfig.json`
- Create: `platform/next.config.ts`
- Create: `platform/tailwind.config.ts`
- Create: `platform/postcss.config.mjs`
- Create: `platform/src/app/globals.css`

**Interfaces:**
- Produces: Runnable Next.js 15 development environment in `platform/` with Tailwind CSS and KaTeX styling.

- [ ] **Step 1: Create directory `platform` and initialize `package.json` with all required dependencies**
- [ ] **Step 2: Install dependencies using `npm.cmd install`**
- [ ] **Step 3: Configure `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, and `postcss.config.mjs`**
- [ ] **Step 4: Create `src/app/globals.css` with dark Olympic theme color variables and KaTeX fonts import**
- [ ] **Step 5: Verify minimal Next.js build passes**

---

### Task 2: Prisma ORM Configuration & Database Schema

**Files:**
- Create: `platform/prisma/schema.prisma`
- Create: `platform/src/lib/prisma.ts`

**Interfaces:**
- Consumes: Environment variable `DATABASE_URL="file:./dev.db"`
- Produces: Prisma Client singleton in `src/lib/prisma.ts` exporting `prisma` with models `Problem`, `TheoryQuestion`, `UserProgress`.

- [ ] **Step 1: Create `platform/prisma/schema.prisma` with `Problem`, `TheoryQuestion`, and `UserProgress` models**
- [ ] **Step 2: Generate Prisma Client via `npx.cmd prisma generate`**
- [ ] **Step 3: Push schema to SQLite via `npx.cmd prisma db push`**
- [ ] **Step 4: Create singleton client in `platform/src/lib/prisma.ts`**

---

### Task 3: Comprehensive Seed Script (50 Crawled Problems + Theory Quiz Bank)

**Files:**
- Create: `platform/prisma/seed.ts`
- Modify: `platform/package.json` (add prisma seed config)

**Interfaces:**
- Consumes: JSON and MD files from `data/problems/`
- Produces: Populated SQLite database with 50 practical olympiad problems and comprehensive theory quiz questions.

- [ ] **Step 1: Write `platform/prisma/seed.ts` to scan `../data/problems/` and normalize all 50 problems into Vietnamese academic format**
- [ ] **Step 2: Populate rich editorials for key problems (IOAI 2025 Radar, Chicken Counting, Concepts, Antique, Restroom; IAIO FlashAttention, DQN; NOAI Basketball; Polish-OAI Coin Counter; USAAIO Spectral)**
- [ ] **Step 3: Add comprehensive Theory Quiz Questions bank covering Linear Algebra, Probability & Statistics, Deep Learning, Attention & Transformers, RL, and AI Ethics**
- [ ] **Step 4: Execute seed script via `npx.cmd prisma db seed` and verify problem counts**

---

### Task 4: Core UI & Math Rendering Components

**Files:**
- Create: `platform/src/lib/utils.ts`
- Create: `platform/src/components/markdown-math.tsx`
- Create: `platform/src/components/code-viewer.tsx`
- Create: `platform/src/components/navbar.tsx`
- Create: `platform/src/components/footer.tsx`
- Create: `platform/src/components/mock-timer.tsx`
- Create: `platform/src/components/ui/button.tsx`
- Create: `platform/src/components/ui/badge.tsx`
- Create: `platform/src/components/ui/card.tsx`
- Create: `platform/src/components/ui/tabs.tsx`

**Interfaces:**
- Produces:
  - `<MarkdownMath content={string} />` (renders LaTeX KaTeX + Markdown)
  - `<CodeViewer code={string} language="python" />` (code viewer with line numbers & copy)
  - `<MockTimer initialMinutes={180} />` (exam countdown timer)
  - `<Navbar />` and `<Footer />` (navigation and footer)

- [ ] **Step 1: Implement `src/lib/utils.ts` with `cn()` utility**
- [ ] **Step 2: Implement `src/components/markdown-math.tsx` using `react-markdown`, `remark-math`, `rehype-katex`**
- [ ] **Step 3: Implement `src/components/code-viewer.tsx` with copy button and clean formatting**
- [ ] **Step 4: Implement UI primitives (`button.tsx`, `badge.tsx`, `card.tsx`, `tabs.tsx`)**
- [ ] **Step 5: Implement `src/components/navbar.tsx` and `footer.tsx` with Vietnamese navigation links**
- [ ] **Step 6: Implement `src/components/mock-timer.tsx` with start/pause/reset and sound/notification alerts**

---

### Task 5: Home Page (`src/app/page.tsx`)

**Files:**
- Create: `platform/src/app/page.tsx`
- Create: `platform/src/app/layout.tsx`

**Interfaces:**
- Consumes: `prisma.problem.count()`, `prisma.theoryQuestion.count()`, problem domain grouping
- Produces: Live dashboard with Hero, metrics, domain shortcuts, featured problems, and syllabus roadmap.

- [ ] **Step 1: Implement `src/app/layout.tsx` with fonts, theme classes, Navbar, and Footer**
- [ ] **Step 2: Implement `src/app/page.tsx` Server Component fetching live stats from Prisma**
- [ ] **Step 3: Build Hero section with Olympic medals, live problem count, and call-to-actions**
- [ ] **Step 4: Build Domain grid (CV, NLP, Tabular ML, Audio, Math/Theory, RL, GenAI) with problem counts**
- [ ] **Step 5: Build Featured Problems carousel highlighting top IOAI, IAIO, and national tasks**
- [ ] **Step 6: Build Olympiad Roadmap section**

---

### Task 6: Problems Archive Page (`src/app/problems/page.tsx`)

**Files:**
- Create: `platform/src/app/problems/page.tsx`
- Create: `platform/src/components/problem-card.tsx`
- Create: `platform/src/components/problem-filters.tsx`

**Interfaces:**
- Consumes: URL searchParams (`competition`, `domain`, `difficulty`, `search`)
- Produces: Interactive problem explorer with multi-filter pills, search input, and responsive grid.

- [ ] **Step 1: Implement `src/components/problem-card.tsx` displaying problem metadata, badges, and dataset tags**
- [ ] **Step 2: Implement `src/components/problem-filters.tsx` Client Component handling filter state and search**
- [ ] **Step 3: Implement `src/app/problems/page.tsx` Server Component querying filtered problems from Prisma**
- [ ] **Step 4: Verify search and filtering responsiveness**

---

### Task 7: Problem Detail & Competition Room (`src/app/problems/[slug]/page.tsx`)

**Files:**
- Create: `platform/src/app/problems/[slug]/page.tsx`
- Create: `platform/src/actions/user-progress.ts`

**Interfaces:**
- Consumes: `params.slug`
- Produces: Rich 4-tab interactive problem environment:
  - Tab 1: Đề bài & Dữ liệu
  - Tab 2: Lời giải Chi tiết (Editorial: Math intuition, baseline -> gold medal, clean PyTorch code, pitfalls)
  - Tab 3: Mã nguồn khởi tạo (Starter Code)
  - Tab 4: Ghi chú cá nhân & Timer

- [ ] **Step 1: Implement `src/app/problems/[slug]/page.tsx` fetching problem by unique slug**
- [ ] **Step 2: Render Tab 1 (Problem Description + Dataset Download buttons)**
- [ ] **Step 3: Render Tab 2 (Editorial with mathematical proof, PyTorch implementation, and tips)**
- [ ] **Step 4: Render Tab 3 (Starter Code viewer with copy and download)**
- [ ] **Step 5: Render Tab 4 (Personal Notes editor with Server Action saving to `UserProgress`, plus MockTimer)**

---

### Task 8: Theory & Quiz Center (`src/app/theory/page.tsx`)

**Files:**
- Create: `platform/src/app/theory/page.tsx`
- Create: `platform/src/components/theory-quiz-view.tsx`
- Create: `platform/src/components/timed-exam-view.tsx`

**Interfaces:**
- Consumes: `prisma.theoryQuestion.findMany()`
- Produces:
  - Tab 1: Luyện tập theo chuyên đề (Topic practice with instant feedback & KaTeX explanations)
  - Tab 2: Thi thử Bấm giờ (Timed Mock Theory Exam with medal rating & score summary)
  - Tab 3: Tự luận Toán học (Written Theory proofs)

- [ ] **Step 1: Implement `src/components/theory-quiz-view.tsx` with topic tabs, instant right/wrong indicators, and KaTeX detailed solution box**
- [ ] **Step 2: Implement `src/components/timed-exam-view.tsx` with 30-minute exam timer, answer sheet tracker, and Olympiad medal result dialog with confetti**
- [ ] **Step 3: Implement Written Theory tab with mathematical derivations**
- [ ] **Step 4: Wire all components into `src/app/theory/page.tsx`**

---

### Task 9: Syllabus & Knowledge Map (`src/app/syllabus/page.tsx`)

**Files:**
- Create: `platform/src/app/syllabus/page.tsx`

**Interfaces:**
- Produces: Complete IOAI & IAIO curriculum breakdown with topic modules, formula references, and links to corresponding practice problems in the database.

- [ ] **Step 1: Construct curriculum data structure based on official IOAI/IAIO syllabus**
- [ ] **Step 2: Implement accordion-based syllabus view with learning goals, core formulas, and practice problem links**
- [ ] **Step 3: Verify navigation to problems and theory quizzes**

---

### Task 10: Problem Contribution / Editor (`src/app/problems/new/page.tsx`)

**Files:**
- Create: `platform/src/app/problems/new/page.tsx`
- Create: `platform/src/actions/problem-actions.ts`

**Interfaces:**
- Produces: Form with Zod validation, live Markdown/KaTeX preview, and Server Action to create new problem.

- [ ] **Step 1: Create `src/actions/problem-actions.ts` with `createProblem` Server Action**
- [ ] **Step 2: Build `src/app/problems/new/page.tsx` with form fields for metadata, description, editorial, code**
- [ ] **Step 3: Add split live-preview panel for Markdown and LaTeX math**

---

### Task 11: End-to-End Build & Verification

- [ ] **Step 1: Run `npm.cmd run build` inside `platform/` and ensure zero TypeScript or build errors**
- [ ] **Step 2: Launch development server with `npm.cmd run dev` on port 3000**
- [ ] **Step 3: Test all pages via browser or curl (Home, Problems, Problem Details with Editorial, Theory Quiz, Exam, Syllabus)**
- [ ] **Step 4: Create `walkthrough.md` with demonstration and verification details**
