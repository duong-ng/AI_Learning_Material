import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDifficulty(diff: string): { label: string; color: string } {
  switch (diff.toLowerCase()) {
    case "easy":
      return { label: "Cơ bản", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30" };
    case "medium":
      return { label: "Trung bình", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30" };
    case "hard":
      return { label: "Nâng cao (Olympic)", color: "bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30" };
    case "olympiad":
    default:
      return { label: "Cực khó (Chung kết)", color: "bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30" };
  }
}

export function formatDomain(domain: string): { label: string; icon: string } {
  switch (domain.toLowerCase()) {
    case "computer vision":
    case "cv":
      return { label: "Thị giác máy tính (CV)", icon: "👁️" };
    case "nlp":
    case "natural language processing":
      return { label: "Xử lý ngôn ngữ tự nhiên (NLP)", icon: "💬" };
    case "reinforcement learning":
    case "rl":
      return { label: "Học tăng cường (RL)", icon: "🎮" };
    case "audio / speech":
    case "audio":
      return { label: "Âm thanh & Tiếng nói", icon: "🎙️" };
    case "multimodal":
      return { label: "Đa phương thức (Multimodal)", icon: "🔮" };
    case "theory / math":
    case "theory":
      return { label: "Lý thuyết & Toán học AI", icon: "📐" };
    default:
      return { label: domain, icon: "🤖" };
  }
}

export function formatCompetition(comp: string): { name: string; full: string; badgeColor: string } {
  switch (comp.toUpperCase()) {
    case "IOAI":
      return { name: "IOAI", full: "Olympic AI Quốc Tế (International Olympiad in AI)", badgeColor: "bg-blue-600 text-white" };
    case "IAIO":
      return { name: "IAIO", full: "Olympic Trí Tuệ Nhân Tạo Ứng Dụng & Lý Thuyết", badgeColor: "bg-indigo-600 text-white" };
    case "US-NAAO":
    case "US_NAAO":
      return { name: "USA NAAO", full: "Kỳ thi Olympic AI Bắc Mỹ (USA NAAO)", badgeColor: "bg-red-600 text-white" };
    case "CHINA_NOAI":
      return { name: "Trung Quốc NOAI", full: "Olympic AI Quốc Gia Trung Quốc (NOAI)", badgeColor: "bg-amber-600 text-white" };
    case "POLISH_OAI":
      return { name: "Ba Lan OAI", full: "Olympic AI Ba Lan (Olimpiada Sztucznej Inteligencji)", badgeColor: "bg-pink-600 text-white" };
    case "ROMANIAN_ROAI":
      return { name: "Romania ROAI", full: "Olympic AI Quốc Gia Romania (ROAI)", badgeColor: "bg-cyan-600 text-white" };
    case "AICC":
      return { name: "AICC", full: "AI Community Championship", badgeColor: "bg-emerald-600 text-white" };
    default:
      return { name: comp, full: comp, badgeColor: "bg-slate-700 text-white" };
  }
}
