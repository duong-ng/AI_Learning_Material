import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "katex/dist/katex.min.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AI Olympiad VN - Nền tảng Ôn luyện & Lời giải Olympic Trí Tuệ Nhân Tạo",
  description:
    "Cổng thông tin học thuật, ngân hàng 50+ đề thi Olympic AI thực tế (IOAI, IAIO, USA-NAAO, China NOAI, Polish OAI) kèm lời giải toán học và PyTorch editorial, trung tâm trắc nghiệm lý thuyết chuyên sâu.",
  keywords: [
    "IOAI",
    "IAIO",
    "Olympic AI",
    "Trí tuệ nhân tạo",
    "Đề thi IOAI",
    "Lời giải IOAI",
    "PyTorch",
    "Deep Learning",
    "Machine Learning",
    "NAAO",
    "NOAI",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark scroll-smooth">
      <body
        className={`${inter.variable} min-h-screen bg-[#07090e] text-slate-100 font-sans antialiased selection:bg-indigo-500 selection:text-white flex flex-col justify-between`}
      >
        {/* Background glow decorative effects */}
        <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[20%] h-[500px] w-[500px] rounded-full bg-blue-600/10 blur-[130px]" />
          <div className="absolute top-[30%] right-[10%] h-[600px] w-[600px] rounded-full bg-indigo-600/10 blur-[140px]" />
          <div className="absolute bottom-[10%] left-[10%] h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[150px]" />
        </div>

        <div>
          <Navbar />
          <main className="min-h-[calc(100vh-16rem)]">{children}</main>
        </div>

        <Footer />
      </body>
    </html>
  );
}
