import Link from "next/link";
import { Award, Github, BookOpen, BrainCircuit } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-card/40 backdrop-blur-sm text-slate-400 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="container mx-auto max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-white">
                <Award className="h-4 w-4" />
              </div>
              <span className="font-bold text-base text-foreground tracking-tight">AI Olympiad VN</span>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">
              Hệ thống ôn luyện, ngân hàng đề thi và lời giải chi tiết phục vụ đội tuyển Olympic Trí tuệ Nhân tạo Việt Nam tham dự IOAI, IAIO và các đấu trường quốc tế.
            </p>
          </div>

          {/* Kỳ thi quốc tế */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Kỳ thi Quốc tế & Quốc gia</h4>
            <ul className="text-xs space-y-1.5 text-muted-foreground">
              <li>
                <Link href="/problems?competition=IOAI" className="hover:text-foreground transition-colors">
                  IOAI (Olympic AI Quốc tế)
                </Link>
              </li>
              <li>
                <Link href="/problems?competition=IAIO" className="hover:text-foreground transition-colors">
                  IAIO (Olympic AI Ứng dụng & Lý thuyết)
                </Link>
              </li>
              <li>
                <Link href="/problems?competition=US-NAAO" className="hover:text-foreground transition-colors">
                  USA NAAO (Bắc Mỹ)
                </Link>
              </li>
              <li>
                <Link href="/problems?competition=CHINA_NOAI" className="hover:text-foreground transition-colors">
                  China NOAI (Trung Quốc)
                </Link>
              </li>
              <li>
                <Link href="/problems?competition=POLISH_OAI" className="hover:text-foreground transition-colors">
                  Polish OAI (Ba Lan) & ROAI (Romania)
                </Link>
              </li>
            </ul>
          </div>

          {/* Lĩnh vực AI */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Phân ngành Huấn luyện</h4>
            <ul className="text-xs space-y-1.5 text-muted-foreground">
              <li>
                <Link href="/problems?domain=Th%E1%BB%8B%20gi%C3%A1c%20m%C3%A1y%20t%C3%ADnh%20(CV)" className="hover:text-foreground transition-colors">
                  Thị giác máy tính (Computer Vision)
                </Link>
              </li>
              <li>
                <Link href="/problems?domain=X%E1%BB%AD%20l%C3%BD%20ng%C3%B4n%20ng%E1%BB%AF%20t%E1%BB%B1%20nhi%C3%AAn%20(NLP)" className="hover:text-foreground transition-colors">
                  Xử lý ngôn ngữ tự nhiên (NLP)
                </Link>
              </li>
              <li>
                <Link href="/problems?domain=H%E1%BB%8Dc%20t%C4%83ng%20c%C6%B0%E1%BB%9Dng%20(RL)" className="hover:text-foreground transition-colors">
                  Học tăng cường (Reinforcement Learning)
                </Link>
              </li>
              <li>
                <Link href="/theory" className="hover:text-foreground transition-colors">
                  Lý thuyết & Toán học AI Olympic
                </Link>
              </li>
              <li>
                <Link href="/syllabus" className="hover:text-foreground transition-colors">
                  Khung chương trình chuẩn IOAI
                </Link>
              </li>
            </ul>
          </div>

          {/* Tài nguyên */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-foreground">Tài nguyên Huấn luyện</h4>
            <ul className="text-xs space-y-1.5 text-muted-foreground">
              <li className="flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-indigo-400" />
                <span>50 Đề thi thực chiến kèm Editorial</span>
              </li>
              <li className="flex items-center gap-1.5">
                <BrainCircuit className="w-3.5 h-3.5 text-indigo-400" />
                <span>Ngân hàng trắc nghiệm lý thuyết</span>
              </li>
              <li className="flex items-center gap-1.5">
                <Github className="w-3.5 h-3.5 text-indigo-400" />
                <span>Mã nguồn chuẩn PyTorch & Jupyter</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
          <p>© 2026 AI Olympiad Study & Training Platform. Xây dựng cho cộng đồng học thuật Olympic AI Việt Nam.</p>
          <div className="flex gap-4">
            <Link href="/syllabus" className="hover:underline">Giáo trình</Link>
            <Link href="/theory" className="hover:underline">Lý thuyết</Link>
            <Link href="/problems" className="hover:underline">Bài tập</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
