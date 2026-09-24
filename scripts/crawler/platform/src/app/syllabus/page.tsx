import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  Trophy,
  BrainCircuit,
  ArrowRight,
  Layers,
  GraduationCap,
  Sparkles,
  Cpu,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Khung Chương Trình Chuẩn Olympic AI (IOAI & IAIO) - AI Olympiad VN",
  description:
    "Giáo trình chi tiết 5 phần chuẩn quốc tế phục vụ đội tuyển Olympic Trí Tuệ Nhân Tạo: Toán học, Học máy, Học sâu Transformers, và Kỹ thuật thi đấu thực chiến.",
};

export default function SyllabusPage() {
  const modules = [
    {
      id: "math",
      badge: "Phần 1",
      title: "Toán Học Nền Tảng Cho AI & Machine Learning",
      desc: "Nền tảng toán học chiếm 40% số điểm của vòng thi lý thuyết IOAI/IAIO.",
      icon: "📐",
      color: "border-blue-500/30 bg-blue-950/20",
      topics: [
        {
          name: "Đại số tuyến tính & Phân rã ma trận",
          items: [
            "Phân rã giá trị kỳ dị (SVD) và Định lý Eckart-Young",
            "Phân tích thành phần chính (PCA) và Ma trận hiệp phương sai",
            "Giá trị riêng, Vector riêng và Định lý phổ (Spectral Theorem)",
            "Chuẩn ma trận: Chuẩn Frobenius, Spectral Norm (Chuẩn phổ)",
          ],
          link: "/theory",
        },
        {
          name: "Giải tích nhiều biến & Tối ưu hóa",
          items: [
            "Đạo hàm ma trận (Matrix Calculus) và Quy tắc dây chuyền (Chain Rule)",
            "Ma trận Hessian, Điểm yên ngựa (Saddle Points) và Độ cong",
            "Thuật toán tối ưu: SGD với Momentum, AdamW, RMSProp",
            "Bất đẳng thức Jensen và tối ưu hóa hàm lồi (Convex Optimization)",
          ],
          link: "/theory",
        },
        {
          name: "Lý thuyết xác suất & Thông tin",
          items: [
            "Entropy thông tin Shannon, Joint Entropy, Conditional Entropy",
            "Khoảng cách Kullback-Leibler (KL Divergence) và Mutual Information",
            "Ước lượng Hợp lý Cực đại (MLE) và Ước lượng Hậu nghiệm (MAP)",
          ],
          link: "/theory",
        },
      ],
    },
    {
      id: "deep-learning",
      badge: "Phần 2",
      title: "Kiến Trúc Học Sâu Tiên Tiến & Transformers",
      desc: "Trọng tâm kỹ thuật xuất hiện trong 90% bài thi lập trình 5 giờ.",
      icon: "🧠",
      color: "border-indigo-500/30 bg-indigo-950/20",
      topics: [
        {
          name: "Mạng Nơ-ron Tích chập (CNN) & Phân đoạn",
          items: [
            "Kiến trúc ResNet, Skip Connections và luồng Gradient",
            "Mô hình U-Net và ConvTranspose trong phân đoạn ảnh",
            "Kỹ thuật chuẩn hóa: Batch Normalization, Layer Normalization, Group Normalization",
          ],
          link: "/problems?domain=Th%E1%BB%8B%20gi%C3%A1c%20m%C3%A1y%20t%C3%ADnh%20(CV)",
        },
        {
          name: "Kiến trúc Transformers & Cơ chế Attention",
          items: [
            "Scaled Dot-Product Attention và chứng minh chia cho căn bậc hai d_k",
            "Mã hóa vị trí: Sinusoidal, Learned Positional Embeddings, RoPE",
            "FlashAttention: Thuật toán Online Softmax chia khối tiết kiệm bộ nhớ O(N)",
            "Vision Transformers (ViT) và Patch Embeddings",
          ],
          link: "/problems/iaio-2025-practical-coding-flash-attention",
        },
        {
          name: "Mô hình Tạo sinh Tiên tiến",
          items: [
            "Variational Autoencoders (VAE) và chứng minh toán học ELBO",
            "Mô hình Khuếch tán (Diffusion Models): Denoising Score Matching, DDPM, DDIM",
            "Contrastive Learning: InfoNCE Loss, SimCLR, CLIP",
          ],
          link: "/theory",
        },
      ],
    },
    {
      id: "practical",
      badge: "Phần 3",
      title: "Kỹ Năng Thi Đấu Thực Chiến Vòng Lập Trình (5 Giờ)",
      desc: "Chiến thuật sinh tồn và tối ưu hóa giải thưởng trên máy thi GPU tiêu chuẩn.",
      icon: "⚡",
      color: "border-emerald-500/30 bg-emerald-950/20",
      topics: [
        {
          name: "Kỹ thuật Xử lý Dữ liệu & Pipeline PyTorch",
          items: [
            "Xử lý mất cân bằng nhãn: Weighted Cross-Entropy, Focal Loss, Class-Balanced Loss",
            "Data Augmentation chuyên sâu: MixUp, CutMix, RandAugment",
            "DataLoader đa luồng không tắc nghẽn GPU (num_workers, pin_memory)",
          ],
          link: "/problems",
        },
        {
          name: "Tối ưu hóa GPU & Chống tràn RAM (OOM)",
          items: [
            "Mixed Precision Training (AMP - torch.cuda.amp.autocast, GradScaler)",
            "Gradient Accumulation khi bị giới hạn kích thước Batch Size",
            "Gradient Checkpointing khi mô hình quá lớn",
          ],
          link: "/problems",
        },
        {
          name: "Validation & Kỹ thuật Ensemble",
          items: [
            "Stratified K-Fold Cross-Validation nghiêm ngặt tránh rò rỉ dữ liệu",
            "Model Averaging, Weighted Blending và Test-Time Augmentation (TTA)",
            "Hạn chế rủi ro quá khớp (Overfitting) trên Leaderboard công khai",
          ],
          link: "/problems",
        },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md p-6 sm:p-10 shadow-xl text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-3">
          <GraduationCap className="w-4 h-4" />
          <span>Giáo Trình Chuẩn Quốc Tế</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-foreground mb-4">
          Khung Chương Trình Huấn Luyện Olympic AI
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          Được thiết kế dựa trên syllabus chính thức của kỳ thi <strong className="text-white">IOAI</strong> (International Olympiad in Artificial Intelligence) và <strong className="text-white">IAIO</strong>.
        </p>
      </div>

      {/* Module Cards */}
      <div className="space-y-8">
        {modules.map((m) => (
          <div
            key={m.id}
            className={`rounded-2xl border ${m.color} backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-6`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{m.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-xs font-bold text-indigo-400">
                      {m.badge}
                    </span>
                    <h2 className="text-xl sm:text-2xl font-black text-foreground">
                      {m.title}
                    </h2>
                  </div>
                  <p className="text-xs text-slate-300 mt-1">{m.desc}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {m.topics.map((t, idx) => (
                <div
                  key={idx}
                  className="rounded-xl border border-border/70 bg-background/60 p-5 flex flex-col justify-between"
                >
                  <div>
                    <h3 className="text-sm font-bold text-foreground mb-3 text-indigo-300">
                      {t.name}
                    </h3>
                    <ul className="space-y-2 text-xs text-slate-300">
                      {t.items.map((item, itemIdx) => (
                        <li key={itemIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 mt-4 border-t border-border/40">
                    <Link
                      href={t.link}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span>Luyện tập chuyên đề này</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
