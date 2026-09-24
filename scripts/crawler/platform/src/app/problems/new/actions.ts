"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createProblemAction(formData: FormData) {
  const title = (formData.get("title") as string)?.trim();
  const competition = (formData.get("competition") as string)?.trim() || "IOAI";
  const year = parseInt((formData.get("year") as string) || "2026", 10);
  const stage = (formData.get("stage") as string)?.trim() || "Vòng Chung Kết";
  const domain = (formData.get("domain") as string)?.trim() || "Thị giác máy tính (CV)";
  const difficulty = (formData.get("difficulty") as string)?.trim() || "Nâng cao";
  const evaluationMetric = (formData.get("evaluationMetric") as string)?.trim() || "Macro F1";
  const tags = (formData.get("tags") as string)?.trim() || "";
  const description = (formData.get("description") as string)?.trim() || "";
  const editorial = (formData.get("editorial") as string)?.trim() || "";
  const datasetUrl = (formData.get("datasetUrl") as string)?.trim() || null;
  const starterCode = (formData.get("starterCode") as string)?.trim() || null;
  const officialPdfUrl = (formData.get("officialPdfUrl") as string)?.trim() || null;

  if (!title || !description) {
    throw new Error("Tiêu đề và nội dung đề bài không được để trống!");
  }

  // Create clean slug
  const baseSlug = title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  
  const slug = `${competition.toLowerCase()}-${year}-${baseSlug}`;

  await prisma.problem.upsert({
    where: { slug },
    update: {
      title,
      competition,
      year,
      stage,
      domain,
      difficulty,
      evaluationMetric,
      tags,
      description,
      editorial: editorial || null,
      datasetUrl,
      starterCode,
      officialPdfUrl,
    },
    create: {
      slug,
      title,
      competition,
      year,
      stage,
      domain,
      difficulty,
      evaluationMetric,
      tags,
      description,
      editorial: editorial || null,
      datasetUrl,
      starterCode,
      officialPdfUrl,
    },
  });

  revalidatePath("/problems");
  revalidatePath("/");
  redirect(`/problems/${slug}`);
}
