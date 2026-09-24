import Link from "next/link";
import prisma from "@/lib/prisma";
import { ProblemCard } from "@/components/problem-card";
import {
  Trophy,
  BrainCircuit,
  BookOpen,
  ArrowRight,
  Sparkles,
  Award,
  Layers,
  CheckCircle2,
  TrendingUp,
  Cpu,
} from "lucide-react";
import { formatCompetition } from "@/lib/utils";

export const revalidate = 60; // ISR cache

export default async function HomePage() {
  // Lấy thống kê thực tế từ SQLite database
  const [
    totalProblems,
    totalTheoryQuestions,
    competitionsCount,
    featuredProblems,
  ] = await Promise.all([
    prisma.problem.count(),
    prisma.theoryQuestion.count(),
    prisma.problem.groupBy({
      by: ["competition"],
      _count: true,
    }),
    prisma.problem.findMany({
      take: 6,
      orderBy: { year: "desc" },
    }),
  ]);

  const domainCategories = [
    {
      name: "Thị giác máy tính (CV)",
      code: "Thị giác máy tính (CV)",
      desc: "Phân đoạn ảnh radar, phát hiện vật thể, OCR cổ thư và mô hình khuếch tán hình ảnh.",
      icon: "👁️",
      color: "from-blue-600/20 to-cyan-600/20 border-blue-500/30",
    },
    {
      name: "Xử lý ngôn ngữ tự nhiên (NLP)",
      code: "Xử lý ngôn ngữ tự nhiên (NLP)",
      desc: "LLM fine-tuning, RAG y sinh, DPO căn chỉnh đạo đức và dịch máy ít tài nguyên.",
      icon: "💬",
      color: "from-indigo-600/20 to-purple-600/20 border-indigo-500/30",
    },
    {
      name: "Học tăng cường (RL)",
      code: "Học tăng cường (RL)",
      desc: "Double DQN, PPO điều khiển robot vi mô, Monte Carlo Tree Search trong trò chơi cờ.",
      icon: "🎮",
      color: "from-emerald-600/20 to-teal-600/20 border-emerald-500/30",
    },
    {
      name: "Đa phương thức (Multimodal)",
      code: "Đa phương thức (Multimodal)",
      desc: "Vision-Language Navigation, khớp giọng nói và hình ảnh, CLIP căn chỉnh vector.",
      icon: "🔮",
      color: "from-purple-600/20 to-pink-600/20 border-purple-500/30",
    },
    {
      name: "Lý thuyết & Toán học AI",
      code: "Lý thuyết & Toán học AI",
      desc: "PAC Learning bounds, hội tụ Adam/SGD, xấp xỉ ma trận hạng thấp Eckart-Young.",
      icon: "📐",
      color: "from-amber-600/20 to-orange-600/20 border-amber-500/30",
    },
    {
      name: "Âm thanh & Tiếng nói",
      code: "Âm thanh & Tiếng nói",
      desc: "Phân tách nguồn âm học sâu, biến đổi phổ Spectrogram, nhận dạng tiếng nói ít tài nguyên.",
      icon: "🎙️",
      color: "from-rose-600/20 to-red-600/20 border-rose-500/30",
    },
  ];

  return (
    <div className="space-y-20 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold text-indigo-400 mb-6 backdrop-blur-md shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span>Kho tài liệu Olympic Trí Tuệ Nhân Tạo chuẩn Quốc tế đầu tiên tại Việt Nam</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-foreground max-w-4xl mx-auto leading-[1.15] mb-6">
          Chinh Phục Đấu Trường{" "}
          <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Olympic AI Quốc Tế
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Nền tảng huấn luyện chuyên sâu cho thí sinh dự thi <strong className="text-white">IOAI</strong>,{" "}
          <strong className="text-white">IAIO</strong>, <strong className="text-white">USA NAAO</strong>,{" "}
          <strong className="text-white">China NOAI</strong> với <span className="text-indigo-300 font-semibold">{totalProblems} đề thi thực chiến</span>, 
          lời giải toán học bài bản và mã nguồn PyTorch tối ưu.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/problems"
            className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-3.5 text-sm font-bold text-white shadow-xl shadow-indigo-500/25 hover:opacity-95 hover:scale-[1.02] transition-all"
          >
            <Trophy className="w-4 h-4" />
            <span>Kho Đề Thi & Lời Giải Chi Tiết</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          <Link
            href="/theory"
            className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-secondary/80 hover:bg-secondary px-6 py-3.5 text-sm font-bold text-foreground shadow-sm hover:border-indigo-500/50 transition-all backdrop-blur-md"
          >
            <BrainCircuit className="w-4 h-4 text-indigo-400" />
            <span>Đấu Trường Trắc Nghiệm Lý Thuyết</span>
          </Link>
        </div>

        {/* Metrics Counters Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 text-center shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-indigo-400 font-mono">
              {totalProblems}+
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
              Đề thi Thực Chiến
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">IOAI, IAIO, NOAI, OAI...</div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 text-center shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-emerald-400 font-mono">
              100%
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
              Kèm Lời Giải Editorial
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Toán học & Code PyTorch</div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 text-center shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-purple-400 font-mono">
              {totalTheoryQuestions}+
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
              Câu Trắc Nghiệm Chuyên Sâu
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Giải thích KaTeX từng bước</div>
          </div>

          <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-md p-6 text-center shadow-lg">
            <div className="text-3xl sm:text-4xl font-black text-amber-400 font-mono">
              8
            </div>
            <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mt-1">
              Hệ Thống Đấu Trường
            </div>
            <div className="text-[11px] text-muted-foreground mt-0.5">Toàn cầu & Quốc gia</div>
          </div>
        </div>
      </section>

      {/* Domain Categories Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Layers className="w-4 h-4" />
              <span>Phân Ngành Chuyên Môn</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Lĩnh Vực Huấn Luyện Olympic AI
            </h2>
          </div>
          <Link
            href="/problems"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>Xem tất cả danh mục</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {domainCategories.map((cat, idx) => (
            <Link
              key={idx}
              href={`/problems?domain=${encodeURIComponent(cat.code)}`}
              className={`group rounded-2xl border bg-gradient-to-br ${cat.color} bg-card/70 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
            >
              <div className="text-3xl mb-3">{cat.icon}</div>
              <h3 className="text-lg font-bold text-foreground group-hover:text-indigo-300 transition-colors mb-1.5">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                {cat.desc}
              </p>
              <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-indigo-400">
                <span>Vào luyện tập</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Problems Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Trophy className="w-4 h-4 text-amber-400" />
              <span>Đề Thi Tiêu Biểu</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground">
              Các Bài Toán Olympic Mới Nhất
            </h2>
          </div>
          <Link
            href="/problems"
            className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 mt-2 sm:mt-0"
          >
            <span>Khám phá toàn bộ 50 đề thi</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProblems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      </section>

      {/* Olympiad Training Roadmap */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-border/80 bg-card/60 backdrop-blur-xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
              <TrendingUp className="w-4 h-4" />
              <span>Lộ Trình Huấn Luyện Toàn Diện</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">
              4 Giai Đoạn Chuẩn Bị Cho Đội Tuyển Olympic AI
            </h2>
            <p className="text-sm text-slate-300 leading-relaxed">
              Phương pháp tiếp cận có hệ thống kết hợp giữa đào sâu nền tảng toán học lý thuyết và tôi luyện phản xạ lập trình thực chiến trên GPU.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="rounded-2xl border border-border/60 bg-background/60 p-6 relative">
              <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-500/40 text-blue-400 font-bold flex items-center justify-center text-sm mb-4">
                01
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">Toán Học & Nền Tảng</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Đại số tuyến tính ma trận, giải tích ma trận, lý thuyết xác suất thống kê, PAC Learnability và định lý xấp xỉ phổ quát.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background/60 p-6 relative">
              <div className="w-8 h-8 rounded-full bg-indigo-600/20 border border-indigo-500/40 text-indigo-400 font-bold flex items-center justify-center text-sm mb-4">
                02
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">Kiến Trúc Học Sâu</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Mô hình Transformers, Scaled Attention, FlashAttention, Vision Transformers (ViT), mô hình khuếch tán Diffusion và GNN.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background/60 p-6 relative">
              <div className="w-8 h-8 rounded-full bg-purple-600/20 border border-purple-500/40 text-purple-400 font-bold flex items-center justify-center text-sm mb-4">
                03
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">Kỹ Năng Thực Chiến 5h</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Xây dựng pipeline huấn luyện PyTorch tốc độ cao, xử lý mất cân bằng nhãn dữ liệu, kỹ thuật chống OOM GPU và Ensemble.
              </p>
            </div>

            <div className="rounded-2xl border border-border/60 bg-background/60 p-6 relative">
              <div className="w-8 h-8 rounded-full bg-pink-600/20 border border-pink-500/40 text-pink-400 font-bold flex items-center justify-center text-sm mb-4">
                04
              </div>
              <h3 className="text-base font-bold text-foreground mb-2">Vòng Thi Lý Thuyết</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Thi trắc nghiệm tốc độ cao (IAIO/IOAI), chứng minh toán học giải tích, tính toán đạo hàm chuỗi ngược và phân tích độ phức tạp.
              </p>
            </div>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/syllabus"
              className="inline-flex items-center gap-2 text-sm font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              <span>Xem chi tiết Khung chương trình chuẩn IOAI & IAIO</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
