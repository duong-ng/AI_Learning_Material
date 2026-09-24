"use client";

import React, { useState } from "react";
import { MarkdownMath } from "@/components/markdown-math";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles, Eye, Edit3, Send, PlusCircle } from "lucide-react";
import { createProblemAction } from "./actions";

export function NewProblemForm() {
  const [descPreview, setDescPreview] = useState(false);
  const [editorialPreview, setEditorialPreview] = useState(false);
  const [descContent, setDescContent] = useState(
    `### 1. Mô tả Bài toán
Cho tập dữ liệu ảnh viễn thám độ phân giải cao gồm $N$ mẫu. Thí sinh cần xây dựng mô hình phân đoạn ngữ nghĩa để phát hiện các vùng lũ lụt.

### 2. Định dạng Đầu vào & Đầu ra
- Đầu vào: Ảnh RGB kích thước $512 \\times 512$.
- Đầu ra: Mặt nạ nhị phân (Binary Mask) với pixel $1$ là vùng ngập lụt, $0$ là vùng cạn.

### 3. Tiêu chí Đánh giá
Điểm số được tính theo chỉ số **Dice Coefficient**:
$$\\text{Dice}(A, B) = \\frac{2 |A \\cap B|}{|A| + |B|}$$`
  );

  const [editorialContent, setEditorialContent] = useState(
    `### 1. Phân tích Thuật toán
Sử dụng kiến trúc U-Net kết hợp backbone ResNet-34 tiền huấn luyện trên ImageNet.

### 2. Hàm Mất Mát Tối Ưu
Do diện tích ngập lụt chiếm tỷ lệ nhỏ (< 5% tổng số pixel), ta áp dụng kết hợp **BCE Loss + Dice Loss**:
$$\\mathcal{L} = \\mathcal{L}_{\\text{BCE}} + (1 - \\text{Dice})$$

\`\`\`python
import torch
import torch.nn as nn

class DiceLoss(nn.Module):
    def __init__(self, smooth=1.0):
        super().__init__()
        self.smooth = smooth

    def forward(self, pred, target):
        pred = torch.sigmoid(pred)
        intersection = (pred * target).sum(dim=(2, 3))
        union = pred.sum(dim=(2, 3)) + target.sum(dim=(2, 3))
        dice = (2.0 * intersection + self.smooth) / (union + self.smooth)
        return 1.0 - dice.mean()
\`\`\``
  );

  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      action={async (formData) => {
        setIsSubmitting(true);
        try {
          await createProblemAction(formData);
        } catch (err: any) {
          alert(err.message || "Đã xảy ra lỗi khi tạo đề thi!");
          setIsSubmitting(false);
        }
      }}
      className="space-y-8 rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md p-6 sm:p-10 shadow-2xl"
    >
      {/* Basic Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Tiêu Đề Bài Toán *
          </label>
          <Input
            name="title"
            required
            placeholder="Ví dụ: Phân Đoạn Ảnh Viễn Thám Vùng Ngập Lũ (Radar Flood Segmentation)"
            className="text-sm"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Kỳ Thi Olympic *
          </label>
          <select
            name="competition"
            className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="IOAI">IOAI (Olympic AI Quốc Tế)</option>
            <option value="IAIO">IAIO (Olympic AI Ứng Dụng & Lý Thuyết)</option>
            <option value="US-NAAO">USA NAAO (Bắc Mỹ)</option>
            <option value="CHINA_NOAI">China NOAI (Trung Quốc)</option>
            <option value="POLISH_OAI">Polish OAI (Ba Lan)</option>
            <option value="ROMANIAN_ROAI">Romania ROAI (Romania)</option>
            <option value="AICC">AICC (AI Community Contest)</option>
            <option value="VIETNAM_AI">Vietnam AI Contest (Trong nước)</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Năm Tổ Chức *
            </label>
            <Input
              name="year"
              type="number"
              defaultValue={2026}
              required
              className="text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Vòng Thi *
            </label>
            <Input
              name="stage"
              defaultValue="Vòng Chung Kết Quốc Tế"
              required
              className="text-sm"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Lĩnh Vực Chuyên Môn *
          </label>
          <select
            name="domain"
            className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="Thị giác máy tính (CV)">Thị giác máy tính (CV)</option>
            <option value="Xử lý ngôn ngữ tự nhiên (NLP)">Xử lý ngôn ngữ tự nhiên (NLP)</option>
            <option value="Học tăng cường (RL)">Học tăng cường (RL)</option>
            <option value="Đa phương thức (Multimodal)">Đa phương thức (Multimodal)</option>
            <option value="Lý thuyết & Toán học AI">Lý thuyết & Toán học AI</option>
            <option value="Âm thanh & Tiếng nói">Âm thanh & Tiếng nói</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Độ Khó *
            </label>
            <select
              name="difficulty"
              className="w-full h-10 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Cơ bản">Cơ bản</option>
              <option value="Trung bình">Trung bình</option>
              <option value="Nâng cao" selected>Nâng cao (Olympic)</option>
              <option value="Cực khó">Cực khó (Chung kết)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
              Chỉ Số Đánh Giá (Metric)
            </label>
            <Input
              name="evaluationMetric"
              defaultValue="Macro F1"
              placeholder="VD: Dice Score, ROC-AUC..."
              className="text-sm"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Tags (Phân cách bằng dấu phẩy)
          </label>
          <Input
            name="tags"
            defaultValue="computer-vision,segmentation,dice-loss,u-net"
            placeholder="pytorch,cnn,transformer,pac..."
            className="text-sm font-mono"
          />
        </div>
      </div>

      {/* Description with KaTeX Preview */}
      <div className="space-y-3 pt-4 border-t border-border/60">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Nội Dung Đề Bài (Hỗ trợ Markdown & KaTeX: $inline$, $$block$$) *
          </label>
          <button
            type="button"
            onClick={() => setDescPreview(!descPreview)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300"
          >
            {descPreview ? (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>Chuyển sang Soạn thảo</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Xem Trước KaTeX Live</span>
              </>
            )}
          </button>
        </div>

        {descPreview ? (
          <div className="rounded-xl border border-indigo-500/40 bg-background/80 p-5 min-h-[220px]">
            <MarkdownMath content={descContent} />
          </div>
        ) : (
          <textarea
            name="description"
            rows={8}
            required
            value={descContent}
            onChange={(e) => setDescContent(e.target.value)}
            className="w-full rounded-xl border border-border bg-background/80 p-4 font-mono text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
          />
        )}
      </div>

      {/* Editorial Solution with KaTeX Preview */}
      <div className="space-y-3 pt-4 border-t border-border/60">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
            Lời Giải & Editorial PyTorch (Toán học & Code)
          </label>
          <button
            type="button"
            onClick={() => setEditorialPreview(!editorialPreview)}
            className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 hover:text-emerald-300"
          >
            {editorialPreview ? (
              <>
                <Edit3 className="w-3.5 h-3.5" />
                <span>Chuyển sang Soạn thảo</span>
              </>
            ) : (
              <>
                <Eye className="w-3.5 h-3.5" />
                <span>Xem Trước KaTeX Live</span>
              </>
            )}
          </button>
        </div>

        {editorialPreview ? (
          <div className="rounded-xl border border-emerald-500/40 bg-background/80 p-5 min-h-[220px]">
            <MarkdownMath content={editorialContent} />
          </div>
        ) : (
          <textarea
            name="editorial"
            rows={10}
            value={editorialContent}
            onChange={(e) => setEditorialContent(e.target.value)}
            className="w-full rounded-xl border border-border bg-background/80 p-4 font-mono text-xs text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          />
        )}
      </div>

      {/* External Resource Links */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-border/60">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Link Tải Dataset
          </label>
          <Input
            name="datasetUrl"
            placeholder="https://..."
            className="text-xs font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Link Starter Code (Notebook)
          </label>
          <Input
            name="starterCode"
            placeholder="https://github.com/.../starter.ipynb"
            className="text-xs font-mono"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
            Link Tài Liệu Đề Gốc (PDF)
          </label>
          <Input
            name="officialPdfUrl"
            placeholder="https://ioai-official.org/..."
            className="text-xs font-mono"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6 border-t border-border/60 flex items-center justify-end gap-3">
        <Button
          type="submit"
          variant="gradient"
          size="lg"
          disabled={isSubmitting}
          className="font-bold shadow-xl px-8"
        >
          {isSubmitting ? (
            <span>Đang Lưu Đề Bài...</span>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Đăng Bài Lên Hệ Thống</span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
