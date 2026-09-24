import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";
import { ProblemView } from "./problem-view";
import type { Metadata } from "next";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const problem = await prisma.problem.findUnique({
    where: { slug: params.slug },
  });

  if (!problem) {
    return {
      title: "Không tìm thấy bài toán - AI Olympiad VN",
    };
  }

  return {
    title: `${problem.title} | Lời Giải Olympic AI - AI Olympiad VN`,
    description: `Đề thi chính thức và lời giải chi tiết cho bài toán ${problem.title} (${problem.competition} ${problem.year}). Phân tích toán học và mã nguồn PyTorch.`,
  };
}

export default async function ProblemDetailPage(props: Props) {
  const params = await props.params;
  const problem = await prisma.problem.findUnique({
    where: { slug: params.slug },
  });

  if (!problem) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <ProblemView problem={problem} />
    </div>
  );
}
