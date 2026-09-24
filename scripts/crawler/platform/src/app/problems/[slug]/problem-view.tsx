"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Trophy,
  BookOpen,
  Sparkles,
  Code2,
  FileText,
  Database,
  ExternalLink,
  Layers,
  CheckCircle,
  Clock,
  Download,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { MarkdownMath } from "@/components/markdown-math";
import { CodeViewer } from "@/components/code-viewer";
import { MockTimer } from "@/components/mock-timer";
import { formatDifficulty, formatDomain, formatCompetition } from "@/lib/utils";

interface ProblemViewProps {
  problem: {
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
    description: string;
    editorial?: string | null;
    starterCode?: string | null;
    datasetUrl?: string | null;
    officialPdfUrl?: string | null;
  };
}

export function ProblemView({ problem }: ProblemViewProps) {
  const [activeTab, setActiveTab] = useState<"description" | "editorial" | "starter" | "practice">("description");
  const [checklist, setChecklist] = useState({
    format: false,
    noNan: false,
    cvMetric: false,
    inferenceTime: false,
    reproducibility: false,
  });
  const [notes, setNotes] = useState("");

  // Load saved notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(`notes_${problem.slug}`);
    if (saved) setNotes(saved);
  }, [problem.slug]);

  const handleNotesChange = (val: string) => {
    setNotes(val);
    localStorage.setItem(`notes_${problem.slug}`, val);
  };

  const diffInfo = formatDifficulty(problem.difficulty);
  const domainInfo = formatDomain(problem.domain);
  const compInfo = formatCompetition(problem.competition);
  const tagsList = problem.tags
    ? problem.tags.split(",").map((t) => t.trim()).filter(Boolean)
    : [];

  const hasEditorial = !!problem.editorial && problem.editorial.length > 30;

  return (
    <div className="space-y-8">
      {/* Top Breadcrumb & Metadata Header */}
      <div className="rounded-2xl border border-border/80 bg-card/80 backdrop-blur-md p-6 sm:p-8 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${compInfo.badgeColor}`}>
              {problem.competition} {problem.year}
            </span>
            <span className="rounded-md bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground border border-border/50">
              {problem.stage}
            </span>
            <span className={`rounded-full px-3 py-0.5 text-xs font-semibold border ${diffInfo.color}`}>
              {diffInfo.label}
            </span>
          </div>

          {problem.evaluationMetric && (
            <div className="flex items-center gap-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 px-3 py-1 text-xs font-semibold text-indigo-400">
              <Layers className="w-3.5 h-3.5" />
              <span>Tiêu chí đánh giá: <strong className="font-mono text-white">{problem.evaluationMetric}</strong></span>
            </div>
          )}
        </div>

        <h1 className="text-2xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
          {problem.title}
        </h1>

        <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground mb-6">
          <div className="flex items-center gap-1.5">
            <span>{domainInfo.icon}</span>
            <span className="font-medium text-slate-200">{domainInfo.label}</span>
          </div>
          {tagsList.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 border-l border-border pl-4">
              {tagsList.map((tag, idx) => (
                <span
                  key={idx}
                  className="rounded bg-muted/60 px-1.5 py-0.5 text-[11px] font-mono text-slate-300"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Quick Resource Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-border/60">
          {problem.datasetUrl && (
            <a
              href={problem.datasetUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 px-3.5 py-2 text-xs font-semibold text-blue-400 transition-colors"
            >
              <Database className="w-3.5 h-3.5" />
              <span>Tập Dữ Liệu Thi Đấu</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {problem.starterCode && (
            <a
              href={problem.starterCode}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/30 border border-purple-500/40 px-3.5 py-2 text-xs font-semibold text-purple-400 transition-colors"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Jupyter Starter Code</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}

          {problem.officialPdfUrl && (
            <a
              href={problem.officialPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg bg-muted/60 hover:bg-muted border border-border px-3.5 py-2 text-xs font-semibold text-slate-300 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Tài Liệu Đề Gốc</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-border/60">
        <nav className="flex space-x-2 overflow-x-auto pb-px scrollbar-none">
          <button
            onClick={() => setActiveTab("description")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "description"
                ? "border-indigo-500 text-indigo-400 bg-indigo-500/5"
                : "border-transparent text-muted-foreground hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>1. Đề Bài & Dữ Liệu</span>
          </button>

          <button
            onClick={() => setActiveTab("editorial")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "editorial"
                ? "border-emerald-500 text-emerald-400 bg-emerald-500/5"
                : "border-transparent text-muted-foreground hover:text-slate-200"
            }`}
          >
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>2. Lời Giải & Editorial PyTorch</span>
            {hasEditorial && (
              <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-bold text-emerald-400">
                Có sẵn
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab("starter")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "starter"
                ? "border-purple-500 text-purple-400 bg-purple-500/5"
                : "border-transparent text-muted-foreground hover:text-slate-200"
            }`}
          >
            <Code2 className="w-4 h-4" />
            <span>3. Mã Nguồn Khởi Động</span>
          </button>

          <button
            onClick={() => setActiveTab("practice")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "practice"
                ? "border-amber-500 text-amber-400 bg-amber-500/5"
                : "border-transparent text-muted-foreground hover:text-slate-200"
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>4. Ghi Chú & Thi Thử (5h)</span>
          </button>
        </nav>
      </div>

      {/* Tab 1: Description */}
      {activeTab === "description" && (
        <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-6">
          <div className="prose-container">
            <MarkdownMath content={problem.description} />
          </div>

          {problem.datasetUrl && (
            <div className="rounded-xl border border-blue-500/30 bg-blue-950/20 p-5 mt-6">
              <div className="flex items-center gap-2 text-blue-400 font-bold text-sm mb-2">
                <Database className="w-4 h-4" />
                <span>Hướng Dẫn Tải Dataset Thi Đấu:</span>
              </div>
              <p className="text-xs text-slate-300 mb-3 leading-relaxed">
                Tập dữ liệu thi đấu chính thức được lưu trữ an toàn. Bạn có thể tải trực tiếp file zip hoặc sử dụng lệnh wget trong Google Colab / Kaggle.
              </p>
              <div className="flex items-center justify-between bg-black/40 rounded-lg p-2.5 font-mono text-xs text-slate-200 overflow-x-auto">
                <code>wget {problem.datasetUrl}</code>
                <a
                  href={problem.datasetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 ml-3 inline-flex items-center gap-1 rounded bg-blue-600 hover:bg-blue-500 px-3 py-1 text-xs font-semibold text-white transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải File</span>
                </a>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Editorial */}
      {activeTab === "editorial" && (
        <div className="space-y-6">
          {hasEditorial ? (
            <div className="rounded-2xl border border-emerald-500/30 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-4 pb-2 border-b border-border/60">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>Phân Tích Sư Phạm & Lời Giải Chuẩn PyTorch</span>
              </div>
              <MarkdownMath content={problem.editorial || ""} />
            </div>
          ) : (
            <div className="rounded-2xl border border-border bg-card/50 p-12 text-center">
              <Lightbulb className="w-12 h-12 text-amber-400/60 mx-auto mb-4" />
              <h3 className="text-lg font-bold text-foreground mb-2">
                Đang biên soạn Editorial toán học nâng cao
              </h3>
              <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed mb-6">
                Ban chuyên môn Olympic AI đang hoàn thiện bản giải thích toán học chi tiết và mã nguồn tối ưu GPU cho bài toán này.
              </p>
              {problem.officialPdfUrl && (
                <a
                  href={problem.officialPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white"
                >
                  <FileText className="w-4 h-4" />
                  <span>Tham khảo tài liệu đề thi gốc</span>
                </a>
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Starter Code */}
      {activeTab === "starter" && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-6 sm:p-8 shadow-xl">
            <h3 className="text-base font-bold text-foreground mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-purple-400" />
              <span>Mẫu Pipeline Khởi Động Chuẩn Olympic</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Mẫu khởi động tiêu chuẩn bao gồm: thiết lập seed ngẫu nhiên để tái lặp thí nghiệm (reproducibility), cấu hình thiết bị GPU (CUDA/MPS), tiền xử lý DataLoader và vòng lặp huấn luyện mẫu.
            </p>

            <CodeViewer
              language="python"
              filename="baseline_starter.py"
              code={`import os
import random
import numpy as np
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader

# 1. Cố định Seed ngẫu nhiên (Bắt buộc trong các kỳ thi IOAI/IAIO để đảm bảo tính tái lập)
def set_seed(seed=42):
    random.seed(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)
        torch.backends.cudnn.deterministic = True

set_seed(42)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Đang chạy trên thiết bị: {device}")

# 2. Pipeline nạp dữ liệu mẫu
class CompetitionDataset(Dataset):
    def __init__(self, data_path, is_train=True):
        self.is_train = is_train
        # TODO: Đọc dữ liệu từ file csv hoặc numpy
        print(f"Đã khởi tạo dataset từ {data_path}")

    def __len__(self):
        return 1000

    def __getitem__(self, idx):
        # Giả lập feature và nhãn
        x = torch.randn(64)
        y = torch.randint(0, 2, (1,)).squeeze()
        return x, y

# 3. Khởi tạo DataLoader
train_loader = DataLoader(CompetitionDataset("train.csv"), batch_size=32, shuffle=True)
print("DataLoader sẵn sàng huấn luyện!")`}
            />

            {problem.starterCode && (
              <div className="mt-6 flex items-center justify-between rounded-xl border border-purple-500/30 bg-purple-950/20 p-4">
                <span className="text-xs text-purple-300 font-medium">
                  Xem Jupyter Notebook chính thức từ ban tổ chức:
                </span>
                <a
                  href={problem.starterCode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Mở trên GitHub / Kaggle</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Practice & Mock Timer */}
      {activeTab === "practice" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Timer & Checklist (Left col) */}
          <div className="lg:col-span-1 space-y-6">
            <MockTimer
              initialMinutes={300} // 5 tiếng thi IOAI
              title="Đồng hồ thi thực tế IOAI (5 giờ)"
            />

            {/* Pre-submission Checklist */}
            <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-5 shadow-lg">
              <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>Checklist Trước Khi Nộp Bài</span>
              </h3>
              <p className="text-[11px] text-muted-foreground mb-4">
                Các lỗi phổ biến dẫn đến 0 điểm trong vòng thi IOAI/IAIO:
              </p>

              <div className="space-y-3">
                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={checklist.format}
                    onChange={(e) => setChecklist({ ...checklist, format: e.target.checked })}
                    className="mt-0.5 rounded border-border text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Định dạng file nộp chính xác (cột Id, Prediction theo đúng file sample_submission.csv)</span>
                </label>

                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={checklist.noNan}
                    onChange={(e) => setChecklist({ ...checklist, noNan: e.target.checked })}
                    className="mt-0.5 rounded border-border text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Không có giá trị NaN hoặc Inf trong file nộp (dùng <code>df.isna().sum()</code> kiểm tra)</span>
                </label>

                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={checklist.cvMetric}
                    onChange={(e) => setChecklist({ ...checklist, cvMetric: e.target.checked })}
                    className="mt-0.5 rounded border-border text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Điểm Cross-Validation (K-Fold) đồng nhất và không rò rỉ dữ liệu (Data Leakage)</span>
                </label>

                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={checklist.inferenceTime}
                    onChange={(e) => setChecklist({ ...checklist, inferenceTime: e.target.checked })}
                    className="mt-0.5 rounded border-border text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Thời gian suy luận (Inference Time) dưới giới hạn quy định của đề thi (thường &lt; 15 phút)</span>
                </label>

                <label className="flex items-start gap-2.5 text-xs text-slate-300 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={checklist.reproducibility}
                    onChange={(e) => setChecklist({ ...checklist, reproducibility: e.target.checked })}
                    className="mt-0.5 rounded border-border text-indigo-600 focus:ring-indigo-500"
                  />
                  <span>Đã cố định random seed và mã nguồn có thể chạy lại từ đầu ra cùng kết quả</span>
                </label>
              </div>
            </div>
          </div>

          {/* Personal Notebook & Scratchpad (Right col) */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-6 shadow-xl flex flex-col h-full min-h-[450px]">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                  <FileText className="w-4 h-4 text-indigo-400" />
                  <span>Sổ Tay Ghi Chép Chiến Thuật & Ý Tưởng</span>
                </h3>
                <span className="text-[11px] text-muted-foreground">Tự động lưu vào trình duyệt</span>
              </div>
              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Ghi chú các thử nghiệm kiến trúc mạng, learning rate, kỹ thuật augmentation và điểm số kiểm thử cục bộ trong quá trình giải đề.
              </p>

              <textarea
                value={notes}
                onChange={(e) => handleNotesChange(e.target.value)}
                placeholder="Ví dụ:&#10;- Thử nghiệm 1: ResNet-18 baseline, LR=1e-3, F1=0.72&#10;- Thử nghiệm 2: Đổi sang Focal Loss gamma=2.0 để khắc phục class imbalance, F1 tăng lên 0.79&#10;- Thử nghiệm 3: Thêm MixUp và Cosine Annealing scheduler, F1 đạt 0.84&#10;- Cần chú ý: GPU batch_size tối đa = 32 để không tràn RAM..."
                className="w-full flex-1 min-h-[320px] rounded-xl border border-border bg-background/80 p-4 font-mono text-xs text-slate-200 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500/50 resize-y"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
