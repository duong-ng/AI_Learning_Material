import prisma from "@/lib/prisma";
import { ProblemCard } from "@/components/problem-card";
import { Trophy, Search, Filter, Sparkles, BookOpen } from "lucide-react";
import Link from "next/link";

interface PageProps {
  searchParams: Promise<{
    competition?: string;
    domain?: string;
    difficulty?: string;
    q?: string;
  }>;
}

export const revalidate = 60;

export default async function ProblemsPage(props: PageProps) {
  const searchParams = await props.searchParams;
  const selectedCompetition = searchParams.competition || "all";
  const selectedDomain = searchParams.domain || "all";
  const selectedDifficulty = searchParams.difficulty || "all";
  const searchQuery = searchParams.q || "";

  // Build Prisma where filter
  const where: any = {};

  if (selectedCompetition !== "all") {
    where.competition = selectedCompetition;
  }

  if (selectedDomain !== "all") {
    where.domain = selectedDomain;
  }

  if (selectedDifficulty !== "all") {
    where.difficulty = selectedDifficulty;
  }

  if (searchQuery.trim()) {
    where.OR = [
      { title: { contains: searchQuery.trim() } },
      { tags: { contains: searchQuery.trim() } },
      { slug: { contains: searchQuery.trim() } },
    ];
  }

  const [problems, totalInDb] = await Promise.all([
    prisma.problem.findMany({
      where,
      orderBy: [{ year: "desc" }, { competition: "asc" }],
    }),
    prisma.problem.count(),
  ]);

  const competitionsList = [
    { code: "all", label: "Tất cả kỳ thi" },
    { code: "IOAI", label: "IOAI (Quốc tế)" },
    { code: "IAIO", label: "IAIO" },
    { code: "US-NAAO", label: "USA NAAO" },
    { code: "CHINA_NOAI", label: "China NOAI" },
    { code: "POLISH_OAI", label: "Polish OAI" },
    { code: "ROMANIAN_ROAI", label: "Romania ROAI" },
    { code: "AICC", label: "AICC" },
  ];

  const domainsList = [
    { code: "all", label: "Tất cả lĩnh vực" },
    { code: "Thị giác máy tính (CV)", label: "Thị giác máy tính (CV)" },
    { code: "Xử lý ngôn ngữ tự nhiên (NLP)", label: "Xử lý ngôn ngữ tự nhiên (NLP)" },
    { code: "Học tăng cường (RL)", label: "Học tăng cường (RL)" },
    { code: "Đa phương thức (Multimodal)", label: "Đa phương thức (Multimodal)" },
    { code: "Lý thuyết & Toán học AI", label: "Lý thuyết & Toán học" },
    { code: "Âm thanh & Tiếng nói", label: "Âm thanh & Tiếng nói" },
  ];

  const difficultiesList = [
    { code: "all", label: "Mọi độ khó" },
    { code: "Cơ bản", label: "Cơ bản" },
    { code: "Trung bình", label: "Trung bình" },
    { code: "Nâng cao", label: "Nâng cao (Olympic)" },
    { code: "Cực khó", label: "Cực khó (Chung kết)" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border/60 pb-6">
        <div>
          <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Kho Đề Thi Olympic Chính Thức</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground">
            Ngân Hàng Đề Thi & Lời Giải PyTorch
          </h1>
          <p className="text-sm text-slate-300 mt-1">
            Tổng hợp các đề thi thực tế từ IOAI, IAIO, USA-NAAO, China NOAI, Ba Lan, Romania và AICC kèm Editorial toán học và mã nguồn chuẩn.
          </p>
        </div>

        <div className="text-right">
          <div className="text-xs font-semibold text-muted-foreground">
            Hiển thị <span className="text-indigo-400 font-bold font-mono">{problems.length}</span> / {totalInDb} đề thi
          </div>
        </div>
      </div>

      {/* Filter & Search Bar Controls */}
      <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-5 shadow-lg space-y-4">
        {/* Search Input form */}
        <form method="GET" action="/problems" className="relative">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            name="q"
            defaultValue={searchQuery}
            placeholder="Tìm kiếm theo tên đề bài, từ khóa (ví dụ: radar, flash attention, pac, diffusion, rlhf)..."
            className="w-full rounded-xl border border-border bg-background/80 pl-10 pr-24 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
          {selectedCompetition !== "all" && <input type="hidden" name="competition" value={selectedCompetition} />}
          {selectedDomain !== "all" && <input type="hidden" name="domain" value={selectedDomain} />}
          {selectedDifficulty !== "all" && <input type="hidden" name="difficulty" value={selectedDifficulty} />}
          <button
            type="submit"
            className="absolute right-2 top-1.5 bottom-1.5 px-3.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-bold text-white transition-colors"
          >
            Tìm
          </button>
        </form>

        {/* Filters Row */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {/* Competitions */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full scrollbar-none">
            <span className="text-xs font-bold text-muted-foreground flex items-center gap-1 shrink-0 mr-1">
              <Filter className="w-3.5 h-3.5" /> Kỳ thi:
            </span>
            {competitionsList.map((item) => {
              const isActive = selectedCompetition === item.code;
              const url = new URLSearchParams();
              if (item.code !== "all") url.set("competition", item.code);
              if (selectedDomain !== "all") url.set("domain", selectedDomain);
              if (selectedDifficulty !== "all") url.set("difficulty", selectedDifficulty);
              if (searchQuery) url.set("q", searchQuery);

              return (
                <Link
                  key={item.code}
                  href={`/problems?${url.toString()}`}
                  className={`shrink-0 rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-muted/70 text-slate-300 hover:bg-muted hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Domain Filters */}
        <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-border/40">
          <span className="text-xs font-bold text-muted-foreground shrink-0 mr-1">
            Lĩnh vực:
          </span>
          {domainsList.map((item) => {
            const isActive = selectedDomain === item.code;
            const url = new URLSearchParams();
            if (selectedCompetition !== "all") url.set("competition", selectedCompetition);
            if (item.code !== "all") url.set("domain", item.code);
            if (selectedDifficulty !== "all") url.set("difficulty", selectedDifficulty);
            if (searchQuery) url.set("q", searchQuery);

            return (
              <Link
                key={item.code}
                href={`/problems?${url.toString()}`}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                  isActive
                    ? "bg-secondary text-foreground font-bold border border-indigo-500/40"
                    : "text-slate-400 hover:text-white hover:bg-muted/40"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Problems Grid */}
      {problems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {problems.map((problem) => (
            <ProblemCard key={problem.id} problem={problem} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-border/80 bg-card/40 p-12 text-center max-w-lg mx-auto">
          <BookOpen className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-40" />
          <h3 className="text-lg font-bold text-foreground mb-2">Không tìm thấy bài toán phù hợp</h3>
          <p className="text-xs text-muted-foreground leading-relaxed mb-6">
            Không có bài toán nào khớp với bộ lọc hiện tại. Thử chọn lại bộ lọc kỳ thi hoặc từ khóa tìm kiếm.
          </p>
          <Link
            href="/problems"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
          >
            Xóa bộ lọc & Xem tất cả
          </Link>
        </div>
      )}
    </div>
  );
}
