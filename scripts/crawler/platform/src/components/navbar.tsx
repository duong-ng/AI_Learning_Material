"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, BookOpen, Trophy, Sparkles, PlusCircle, Award } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    {
      name: "Kho Đề Thi Olympic",
      href: "/problems",
      icon: Trophy,
    },
    {
      name: "Đấu Trường Lý Thuyết",
      href: "/theory",
      icon: BrainCircuit,
      badge: "Mới",
    },
    {
      name: "Khung Chương Trình",
      href: "/syllabus",
      icon: BookOpen,
    },
    {
      name: "Đóng Góp Đề",
      href: "/problems/new",
      icon: PlusCircle,
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
            <Award className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-black tracking-tight text-foreground group-hover:text-primary transition-colors">
                AI Olympiad
              </span>
              <span className="rounded bg-indigo-500/10 px-1.5 py-0.2 text-[10px] font-bold text-indigo-400 border border-indigo-500/30">
                VN
              </span>
            </div>
            <span className="text-[11px] text-muted-foreground font-medium hidden sm:inline-block">
              Nền tảng Ôn luyện & Lời giải Olympic AI
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative flex items-center gap-2 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-150",
                  isActive
                    ? "bg-secondary text-foreground font-semibold shadow-sm"
                    : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"
                )}
              >
                <Icon className={cn("h-4 w-4", isActive ? "text-indigo-400" : "text-muted-foreground")} />
                <span>{link.name}</span>
                {link.badge && (
                  <span className="rounded-full bg-gradient-to-r from-pink-500 to-rose-500 px-1.5 py-0.2 text-[9px] font-bold text-white uppercase tracking-wider">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Button & Indicators */}
        <div className="flex items-center gap-3">
          <Link
            href="/theory"
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 hover:bg-indigo-500/20 border border-indigo-500/30 px-3 py-1.5 text-xs font-semibold text-indigo-400 transition-all shadow-sm"
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-400 animate-pulse" />
            <span>Thi Thử Lý Thuyết Chuẩn IOAI</span>
          </Link>

          <Link
            href="/problems"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-3.5 py-2 text-xs font-semibold text-primary-foreground shadow-md hover:bg-primary/90 transition-all"
          >
            Vào Luyện Đề
          </Link>
        </div>
      </div>
    </header>
  );
}
