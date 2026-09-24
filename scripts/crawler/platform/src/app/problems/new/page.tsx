import { PlusCircle, Sparkles } from "lucide-react";
import { NewProblemForm } from "./new-problem-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đóng Góp Đề Thi & Lời Giải Mới - AI Olympiad VN",
  description:
    "Cổng đóng góp đề thi Olympic Trí Tuệ Nhân Tạo dành cho huấn luyện viên và cộng đồng học thuật Việt Nam. Hỗ trợ công thức toán học KaTeX và mã nguồn PyTorch.",
};

export default function NewProblemPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 px-3.5 py-1 text-xs font-semibold text-indigo-400 mb-3">
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Cổng Đóng Góp Học Thuật</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-2">
          Đóng Góp Đề Thi & Editorial Mới
        </h1>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Chia sẻ các đề thi tuyển chọn đội tuyển quốc gia, đề thi Olympic khu vực hoặc lời giải phân tích toán học mẫu để làm giàu ngân hàng dữ liệu cho học sinh Việt Nam.
        </p>
      </div>

      <NewProblemForm />
    </div>
  );
}
