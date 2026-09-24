import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-10 text-center max-w-md shadow-2xl">
        <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center mx-auto mb-4 text-indigo-400">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-foreground mb-2">404 - Không Tìm Thấy Trang</h1>
        <p className="text-xs text-muted-foreground leading-relaxed mb-6">
          Bài toán hoặc trang bạn đang tìm kiếm không tồn tại hoặc đã được chuyển vị trí trong hệ thống.
        </p>
        <Link
          href="/problems"
          className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 px-4 py-2.5 text-xs font-bold text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại Kho Đề Thi</span>
        </Link>
      </div>
    </div>
  );
}
