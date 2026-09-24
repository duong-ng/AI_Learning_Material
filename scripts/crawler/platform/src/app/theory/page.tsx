import prisma from "@/lib/prisma";
import { TheoryCenter } from "./theory-center";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đấu Trường Lý Thuyết Olympic AI | Trắc Nghiệm & Bài Tập Vòng Thuyết - AI Olympiad VN",
  description:
    "Trung tâm ôn tập lý thuyết Olympic AI chuyên sâu (IOAI, IAIO): Ngân hàng câu hỏi trắc nghiệm toán học, giải thuật học sâu, bất đẳng thức PAC, và thi thử giả lập 45 phút có chấm điểm tức thì.",
};

export const revalidate = 60;

export default async function TheoryPage() {
  const questions = await prisma.theoryQuestion.findMany({
    orderBy: [{ year: "desc" }, { competition: "asc" }],
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <TheoryCenter questions={questions} />
    </div>
  );
}
