import Link from "next/link";
import { Badge } from "./ui/badge";
import { formatDifficulty, formatDomain, formatCompetition } from "@/lib/utils";
import { BookOpen, Database, Sparkles, ArrowRight, Layers } from "lucide-react";

export interface ProblemCardData {
  id: string;
  slug: string;
  competition: string;
  year: number;
  stage: string;
  title: string;
  domain: string;
  difficulty: string;
  evaluationMetric?: string | null;
  tags?: string | null;
  datasetUrl?: string | null;
  editorial?: string | null;
}

interface ProblemCardProps {
  problem: ProblemCardData;
}

export function ProblemCard({ problem }: ProblemCardProps) {
  const diffInfo = formatDifficulty(problem.difficulty);
  const domainInfo = formatDomain(problem.domain);
  const compInfo = formatCompetition(problem.competition);

  const tagsList = problem.tags
    ? problem.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const hasEditorial = !!problem.editorial && problem.editorial.length > 50;

  return (
    <div className="group relative rounded-xl border border-border/80 bg-card/80 backdrop-blur-sm p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 flex flex-col justify-between">
      <div>
        {/* Top Badges */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`rounded-md px-2 py-0.5 text-xs font-bold ${compInfo.badgeColor}`}
            >
              {problem.competition} {problem.year}
            </span>
            <span className="rounded-md bg-secondary/80 px-2 py-0.5 text-[11px] font-medium text-secondary-foreground border border-border/40">
              {problem.stage}
            </span>
          </div>

          <span
            className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${diffInfo.color}`}
          >
            {diffInfo.label}
          </span>
        </div>

        {/* Title */}
        <Link href={`/problems/${problem.slug}`} className="block group-hover:text-indigo-400 transition-colors">
          <h3 className="text-base font-bold text-foreground leading-snug line-clamp-2 mb-2">
            {problem.title}
          </h3>
        </Link>

        {/* Domain & Metric Info */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-4">
          <div className="flex items-center gap-1">
            <span>{domainInfo.icon}</span>
            <span className="font-medium text-slate-300">{domainInfo.label}</span>
          </div>

          {problem.evaluationMetric && (
            <div className="flex items-center gap-1 border-l border-border pl-3">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span className="font-mono text-[11px] text-indigo-300">{problem.evaluationMetric}</span>
            </div>
          )}
        </div>

        {/* Tags */}
        {tagsList.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {tagsList.slice(0, 3).map((tag, idx) => (
              <span
                key={idx}
                className="rounded bg-muted/60 px-1.5 py-0.5 text-[10px] font-medium text-slate-400 border border-border/30"
              >
                #{tag}
              </span>
            ))}
            {tagsList.length > 3 && (
              <span className="rounded bg-muted/30 px-1 py-0.5 text-[10px] text-muted-foreground">
                +{tagsList.length - 3}
              </span>
            )}
          </div>
        )}
      </div>

      {/* Card Footer Features */}
      <div className="border-t border-border/50 pt-3 mt-1 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          {hasEditorial ? (
            <span className="inline-flex items-center gap-1 font-semibold text-emerald-400 text-[11px] bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
              <Sparkles className="w-3 h-3 text-emerald-400" />
              <span>Editorial PyTorch</span>
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-muted-foreground text-[11px]">
              <BookOpen className="w-3 h-3" />
              <span>Đề bài chính thức</span>
            </span>
          )}

          {problem.datasetUrl && (
            <span className="inline-flex items-center gap-1 text-blue-400 text-[11px] bg-blue-500/10 px-1.5 py-0.5 rounded border border-blue-500/20" title="Có tập dữ liệu">
              <Database className="w-3 h-3" />
              <span>Dataset</span>
            </span>
          )}
        </div>

        <Link
          href={`/problems/${problem.slug}`}
          className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
        >
          <span>Xem chi tiết</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>
    </div>
  );
}
