"use client";

import React, { useState, useMemo, useEffect } from "react";
import {
  BrainCircuit,
  CheckCircle2,
  XCircle,
  Clock,
  Sparkles,
  BookOpen,
  RotateCcw,
  Award,
  ChevronRight,
  ChevronLeft,
  Flame,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  Flag,
  Check,
  AlertCircle,
  HelpCircle,
  Layers,
  BarChart3,
  Shuffle,
  ArrowRight,
  ArrowLeft,
  Trophy,
  RotateCw,
  Bot,
  Cpu,
  Zap,
  Loader2,
  RefreshCw,
  Send,
  MessageSquare,
  User,
  Trash2,
} from "lucide-react";
import confetti from "canvas-confetti";
import { MarkdownMath } from "@/components/markdown-math";
import { Button } from "@/components/ui/button";

export interface TheoryQuestionData {
  id: string;
  slug: string;
  competition: string;
  year: number;
  stage: string;
  topic: string;
  difficulty: string;
  question: string;
  options: string; // JSON array string of {id: string, text: string}
  correctAnswer: string;
  explanation: string;
  tags?: string | null;
}

interface TheoryCenterProps {
  questions: TheoryQuestionData[];
}

export function TheoryCenter({ questions }: TheoryCenterProps) {
  const [activeTab, setActiveTab] = useState<"quiz" | "exam" | "written">("quiz");

  // States for Topic Quiz Mode
  const [selectedTopic, setSelectedTopic] = useState<string>("all");
  const [selectedCompetition, setSelectedCompetition] = useState<string>("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [isShuffled, setIsShuffled] = useState<boolean>(false);
  const [shuffleSeed, setShuffleSeed] = useState<number>(0);
  const [showPalette, setShowPalette] = useState<boolean>(false);
  const [showSummaryModal, setShowSummaryModal] = useState<boolean>(false);

  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<string, boolean>>({});
  const [paletteFilterFlagged, setPaletteFilterFlagged] = useState<boolean>(false);

  // States for NVIDIA Nemotron-3 Ultra Assistant
  const [aiExplanations, setAiExplanations] = useState<Record<string, { explanation: string; reasoning?: string; model?: string }>>({});
  const [loadingAi, setLoadingAi] = useState<Record<string, boolean>>({});
  const [aiErrors, setAiErrors] = useState<Record<string, string>>({});
  const [showReasoning, setShowReasoning] = useState<Record<string, boolean>>({});

  // States for Interactive Q&A Chat with Nemotron-3 Ultra
  const [chatConversations, setChatConversations] = useState<
    Record<string, Array<{ id: string; role: "user" | "assistant"; content: string; reasoning?: string; createdAt: number }>>
  >({});
  const [userCustomInputs, setUserCustomInputs] = useState<Record<string, string>>({});
  const [sendingChat, setSendingChat] = useState<Record<string, boolean>>({});
  const [chatErrors, setChatErrors] = useState<Record<string, string>>({});

  // States for Timed Mock Exam Mode
  const [examConfig, setExamConfig] = useState<{
    questionCount: number;
    timeMinutes: number;
    competitionFilter: string;
  }>({
    questionCount: 30,
    timeMinutes: 45,
    competitionFilter: "all",
  });

  const [examStarted, setExamStarted] = useState<boolean>(false);
  const [examFinished, setExamFinished] = useState<boolean>(false);
  const [examQuestions, setExamQuestions] = useState<any[]>([]);
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
  const [currentExamIndex, setCurrentExamIndex] = useState<number>(0);
  const [examTimeRemaining, setExamTimeRemaining] = useState<number>(45 * 60);

  // Parse questions options safely
  const parsedQuestions = useMemo(() => {
    return questions.map((q) => {
      let opts: Array<{ id: string; text: string }> = [];
      try {
        opts = JSON.parse(q.options);
      } catch {
        opts = [];
      }
      return { ...q, parsedOptions: opts };
    });
  }, [questions]);

  // Unique lists for filtering
  const topics = useMemo(() => {
    return Array.from(new Set(questions.map((q) => q.topic))).filter(Boolean);
  }, [questions]);

  const competitions = useMemo(() => {
    return Array.from(new Set(questions.map((q) => q.competition))).filter(Boolean);
  }, [questions]);

  // Filter questions for Quiz
  const filteredQuestions = useMemo(() => {
    return parsedQuestions.filter((q) => {
      if (selectedTopic !== "all" && q.topic !== selectedTopic) return false;
      if (selectedCompetition !== "all" && q.competition !== selectedCompetition) return false;
      if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchQ = q.question.toLowerCase().includes(query);
        const matchTopic = q.topic.toLowerCase().includes(query);
        const matchTags = (q.tags || "").toLowerCase().includes(query);
        const matchOpts = q.parsedOptions.some((o) => o.text.toLowerCase().includes(query));
        if (!matchQ && !matchTopic && !matchTags && !matchOpts) return false;
      }
      return true;
    });
  }, [parsedQuestions, selectedTopic, selectedCompetition, selectedDifficulty, searchQuery]);

  // Active questions considering shuffle mode
  const activeQuestions = useMemo(() => {
    if (!isShuffled) return filteredQuestions;
    const arr = [...filteredQuestions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [filteredQuestions, isShuffled, shuffleSeed]);

  // Reset current question index when filters or search change
  useEffect(() => {
    setCurrentQuizIndex(0);
    setShowSummaryModal(false);
  }, [selectedTopic, selectedCompetition, selectedDifficulty, searchQuery]);

  // Handlers for Quiz
  const handleShuffle = () => {
    setIsShuffled(true);
    setShuffleSeed((prev) => prev + 1);
    setCurrentQuizIndex(0);
    setShowSummaryModal(false);
  };

  const handleResetOrder = () => {
    setIsShuffled(false);
    setCurrentQuizIndex(0);
    setShowSummaryModal(false);
  };

  const handleSelectAnswer = (qSlug: string, optionId: string) => {
    if (userAnswers[qSlug]) return; // lock once answered
    setUserAnswers((prev) => ({ ...prev, [qSlug]: optionId }));
    setShowExplanations((prev) => ({ ...prev, [qSlug]: true }));
  };

  const handleResetCurrentQuestion = (qSlug: string) => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[qSlug];
      return copy;
    });
    setShowExplanations((prev) => {
      const copy = { ...prev };
      delete copy[qSlug];
      return copy;
    });
  };

  const handleToggleBookmark = (qSlug: string) => {
    setBookmarkedQuestions((prev) => ({ ...prev, [qSlug]: !prev[qSlug] }));
  };

  const handleResetQuiz = () => {
    setUserAnswers({});
    setShowExplanations({});
    setCurrentQuizIndex(0);
    setShowSummaryModal(false);
  };

  // Safe question calculation
  const validQuizIndex = activeQuestions.length > 0
    ? Math.min(Math.max(0, currentQuizIndex), activeQuestions.length - 1)
    : 0;
  const currentQuestion = activeQuestions[validQuizIndex];

  // Handler for NVIDIA Nemotron-3 Ultra Assistant Explanation
  const handleRequestAiExplanation = async (qSlug: string) => {
    if (!currentQuestion || loadingAi[qSlug]) return;

    setLoadingAi((prev) => ({ ...prev, [qSlug]: true }));
    setAiErrors((prev) => {
      const copy = { ...prev };
      delete copy[qSlug];
      return copy;
    });

    try {
      const res = await fetch("/api/ai-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          options: currentQuestion.parsedOptions,
          correctAnswer: currentQuestion.correctAnswer,
          userAnswer: userAnswers[qSlug],
          topic: currentQuestion.topic,
          competition: currentQuestion.competition,
          baseExplanation: currentQuestion.explanation,
        }),
      });

      const data = await res.json();
      if (data.success && data.explanation) {
        setAiExplanations((prev) => ({
          ...prev,
          [qSlug]: {
            explanation: data.explanation,
            reasoning: data.reasoning,
            model: data.model,
          },
        }));
      } else {
        setAiErrors((prev) => ({
          ...prev,
          [qSlug]: data.error || "Không thể kết nối đến Trợ lý AI Nemotron.",
        }));
      }
    } catch (err: any) {
      setAiErrors((prev) => ({
        ...prev,
        [qSlug]: err.message || "Lỗi mạng khi kết nối đến Trợ lý AI Nemotron.",
      }));
    } finally {
      setLoadingAi((prev) => ({ ...prev, [qSlug]: false }));
    }
  };

  // Handler for custom user questions to Nemotron-3 Ultra
  const handleSendCustomQuestion = async (qSlug: string, customQuestion?: string) => {
    const questionText = customQuestion || userCustomInputs[qSlug] || "";
    if (!questionText.trim() || sendingChat[qSlug]) return;
    if (!currentQuestion) return;

    const userMsgId = "user-" + Date.now();
    const newMsg = {
      id: userMsgId,
      role: "user" as const,
      content: questionText.trim(),
      createdAt: Date.now(),
    };

    // Optimistically update conversation
    setChatConversations((prev) => ({
      ...prev,
      [qSlug]: [...(prev[qSlug] || []), newMsg],
    }));

    // Clear input
    setUserCustomInputs((prev) => ({ ...prev, [qSlug]: "" }));
    setSendingChat((prev) => ({ ...prev, [qSlug]: true }));
    setChatErrors((prev) => {
      const copy = { ...prev };
      delete copy[qSlug];
      return copy;
    });

    try {
      const currentThread = chatConversations[qSlug] || [];
      const historyForApi = currentThread.map((m) => ({
        role: m.role,
        content: m.content,
      }));

      const res = await fetch("/api/ai-explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: currentQuestion.question,
          options: currentQuestion.parsedOptions,
          correctAnswer: currentQuestion.correctAnswer,
          userAnswer: userAnswers[qSlug],
          topic: currentQuestion.topic,
          competition: currentQuestion.competition,
          baseExplanation: currentQuestion.explanation,
          userQuestion: questionText.trim(),
          chatHistory: historyForApi,
        }),
      });

      const data = await res.json();
      if (data.success && data.explanation) {
        const aiMsg = {
          id: "ai-" + Date.now(),
          role: "assistant" as const,
          content: data.explanation,
          reasoning: data.reasoning,
          createdAt: Date.now(),
        };
        setChatConversations((prev) => ({
          ...prev,
          [qSlug]: [...(prev[qSlug] || []), aiMsg],
        }));
      } else {
        setChatErrors((prev) => ({
          ...prev,
          [qSlug]: data.error || "Không nhận được phản hồi từ Trợ lý AI Nemotron.",
        }));
      }
    } catch (err: any) {
      setChatErrors((prev) => ({
        ...prev,
        [qSlug]: err.message || "Lỗi mạng khi gửi câu hỏi tới Trợ lý AI.",
      }));
    } finally {
      setSendingChat((prev) => ({ ...prev, [qSlug]: false }));
    }
  };

  const handleClearChat = (qSlug: string) => {
    setChatConversations((prev) => {
      const copy = { ...prev };
      delete copy[qSlug];
      return copy;
    });
    setChatErrors((prev) => {
      const copy = { ...prev };
      delete copy[qSlug];
      return copy;
    });
  };

  // Stats for Quiz
  const quizStats = useMemo(() => {
    let answered = 0;
    let correct = 0;
    let incorrect = 0;

    activeQuestions.forEach((q) => {
      const ans = userAnswers[q.slug];
      if (ans) {
        answered++;
        if (ans === q.correctAnswer) {
          correct++;
        } else {
          incorrect++;
        }
      }
    });

    const accuracy = answered > 0 ? Math.round((correct / answered) * 100) : 0;
    return { answered, correct, incorrect, accuracy, total: activeQuestions.length };
  }, [activeQuestions, userAnswers]);

  const handleOpenSummary = () => {
    setShowSummaryModal(true);
    if (quizStats.accuracy >= 70 && quizStats.answered > 0) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  // Handlers for Exam
  const startExam = () => {
    let pool = [...parsedQuestions];
    if (examConfig.competitionFilter !== "all") {
      pool = pool.filter((q) => q.competition === examConfig.competitionFilter);
    }
    if (pool.length === 0) {
      pool = [...parsedQuestions];
    }
    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(examConfig.questionCount, shuffled.length));

    setExamQuestions(selected);
    setExamAnswers({});
    setCurrentExamIndex(0);
    setExamTimeRemaining(examConfig.timeMinutes * 60);
    setExamStarted(true);
    setExamFinished(false);
  };

  const finishExam = () => {
    setExamFinished(true);
    const score = examQuestions.reduce((acc, q) => {
      return acc + (examAnswers[q.slug] === q.correctAnswer ? 1 : 0);
    }, 0);
    const pct = (score / examQuestions.length) * 100;
    if (pct >= 70) {
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }
    }
  };

  // Timer effect for Exam
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (examStarted && !examFinished && examTimeRemaining > 0) {
      interval = setInterval(() => {
        setExamTimeRemaining((prev) => {
          if (prev <= 1) {
            finishExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [examStarted, examFinished, examTimeRemaining]);

  const examScore = examQuestions.reduce((acc, q) => {
    return acc + (examAnswers[q.slug] === q.correctAnswer ? 1 : 0);
  }, 0);

  const formatTimer = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-br from-indigo-950/40 via-card/70 to-card/60 backdrop-blur-md p-6 sm:p-8 shadow-2xl">
        <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-wider mb-2">
          <BrainCircuit className="w-4 h-4 text-indigo-400" />
          <span>Trung Tâm Huấn Luyện Lý Thuyết Olympic AI Quốc Gia & Quốc Tế</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
          Đấu Trường Lý Thuyết & Toán Học AI
        </h1>
        <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
          Ngân hàng câu hỏi chuẩn hóa toàn diện gồm <strong className="text-emerald-400">{questions.length} câu trắc nghiệm</strong> từ{" "}
          <strong className="text-white">Bộ Giáo dục và Đào tạo (VOAI 2025)</strong>,{" "}
          <strong className="text-white">Olympic Trí tuệ Nhân tạo Quốc tế (IOAI & IAIO)</strong>, và giải vô địch{" "}
          <strong className="text-white">VAIC 2026</strong>. Hỗ trợ hiển thị công thức toán KaTeX và giải thích chi tiết từng bước.
        </p>
      </div>

      {/* Tabs Switcher */}
      <div className="border-b border-border/60">
        <div className="flex space-x-2 overflow-x-auto pb-px scrollbar-none">
          <button
            onClick={() => setActiveTab("quiz")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "quiz"
                ? "border-indigo-500 text-indigo-400 bg-indigo-500/5"
                : "border-transparent text-muted-foreground hover:text-slate-200"
            }`}
          >
            <BrainCircuit className="w-4 h-4" />
            <span>Ngân Hàng Trắc Nghiệm ({filteredQuestions.length}/{questions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab("exam")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "exam"
                ? "border-amber-500 text-amber-400 bg-amber-500/5"
                : "border-transparent text-muted-foreground hover:text-slate-200"
            }`}
          >
            <Clock className="w-4 h-4 text-amber-400" />
            <span>Phòng Thi Thử Bấm Giờ Giả Lập</span>
          </button>

          <button
            onClick={() => setActiveTab("written")}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-bold border-b-2 transition-colors whitespace-nowrap ${
              activeTab === "written"
                ? "border-purple-500 text-purple-400 bg-purple-500/5"
                : "border-transparent text-muted-foreground hover:text-slate-200"
            }`}
          >
            <BookOpen className="w-4 h-4 text-purple-400" />
            <span>10 Chuyên Đề Tự Luận & Chứng Minh Sâu</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: Topic-based Quiz */}
      {/* ========================================================================= */}
      {activeTab === "quiz" && (
        <div className="space-y-6">
          {/* Multi-tier Filter Toolbar */}
          <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-5 shadow-lg space-y-4">
            {/* Row 1: Search, Shuffle & Reset Actions */}
            <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Tìm kiếm công thức, thuật ngữ, câu hỏi..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border border-border/70 bg-background/80 pl-9 pr-3 py-1.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2 justify-between lg:justify-end">
                <span className="text-xs text-muted-foreground mr-1 hidden sm:inline">
                  Tổng <strong className="text-foreground">{activeQuestions.length}</strong> câu
                </span>

                {/* Shuffle Button */}
                <Button
                  variant={isShuffled ? "default" : "outline"}
                  size="sm"
                  onClick={handleShuffle}
                  className={`gap-1.5 text-xs font-semibold transition-all ${
                    isShuffled
                      ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-md shadow-indigo-500/20"
                      : "border-indigo-500/40 text-indigo-300 hover:bg-indigo-500/10"
                  }`}
                  title="Xáo ngẫu nhiên thứ tự các câu hỏi"
                >
                  <Shuffle className="w-3.5 h-3.5" />
                  <span>{isShuffled ? "Xáo lại ngẫu nhiên" : "Xáo câu hỏi"}</span>
                </Button>

                {/* Reset Order Button */}
                {isShuffled && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleResetOrder}
                    className="gap-1 text-xs text-muted-foreground hover:text-slate-200"
                    title="Khôi phục về thứ tự gốc"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Thứ tự gốc</span>
                  </Button>
                )}

                {/* Reset Quiz Answers */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleResetQuiz}
                  className="gap-1.5 text-xs text-slate-300"
                  title="Xóa kết quả đã chọn để làm lại từ đầu"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Làm lại từ đầu</span>
                </Button>
              </div>
            </div>

            {/* Row 2: Competition Source Filter */}
            <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/40">
              <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
                <Layers className="w-3.5 h-3.5" /> Nguồn thi:
              </span>
              <button
                onClick={() => setSelectedCompetition("all")}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  selectedCompetition === "all"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-muted/60 text-slate-300 hover:bg-muted"
                }`}
              >
                Tất cả nguồn ({questions.length})
              </button>
              {competitions.map((comp) => {
                const count = parsedQuestions.filter((q) => q.competition === comp).length;
                return (
                  <button
                    key={comp}
                    onClick={() => setSelectedCompetition(comp)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      selectedCompetition === comp
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-muted/60 text-slate-300 hover:bg-muted"
                    }`}
                  >
                    {comp} ({count})
                  </button>
                );
              })}
            </div>

            {/* Row 3: Topic Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Chuyên đề:
              </span>
              <button
                onClick={() => setSelectedTopic("all")}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  selectedTopic === "all"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-muted/60 text-slate-300 hover:bg-muted"
                }`}
              >
                Tất cả
              </button>
              {topics.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTopic(t)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                    selectedTopic === t
                      ? "bg-indigo-600 text-white shadow-sm"
                      : "bg-muted/60 text-slate-300 hover:bg-muted"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Row 4: Difficulty Filter */}
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-semibold text-muted-foreground mr-1 flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5" /> Độ khó:
              </span>
              <button
                onClick={() => setSelectedDifficulty("all")}
                className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                  selectedDifficulty === "all"
                    ? "bg-indigo-600 text-white shadow-sm"
                    : "bg-muted/60 text-slate-300 hover:bg-muted"
                }`}
              >
                Tất cả độ khó
              </button>
              {["Dễ", "Trung bình", "Khó"].map((diff) => {
                const count = parsedQuestions.filter((q) => q.difficulty === diff).length;
                if (count === 0) return null;
                return (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      selectedDifficulty === diff
                        ? "bg-indigo-600 text-white shadow-sm"
                        : "bg-muted/60 text-slate-300 hover:bg-muted"
                    }`}
                  >
                    {diff} ({count})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Progress & Live Action Strip */}
          <div className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md p-4 sm:p-5 shadow-lg space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 border border-indigo-500/40">
                    CÂU {validQuizIndex + 1} / {activeQuestions.length}
                  </span>
                  {isShuffled && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/15 border border-purple-500/30 px-2.5 py-0.5 text-[11px] font-semibold text-purple-300">
                      <Shuffle className="w-3 h-3" /> Đã xáo đề
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs text-muted-foreground border-l border-border/60 pl-3">
                  <span>Đã làm: <strong className="text-foreground">{quizStats.answered}/{quizStats.total}</strong></span>
                  <span>Đúng: <strong className="text-emerald-400">{quizStats.correct}</strong></span>
                  <span>Sai: <strong className="text-rose-400">{quizStats.incorrect}</strong></span>
                  <span className="hidden sm:inline">Độ chính xác: <strong className="text-indigo-400">{quizStats.accuracy}%</strong></span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowPalette((v) => !v)}
                  className={`gap-1.5 text-xs ${
                    showPalette
                      ? "bg-indigo-600/20 border-indigo-500 text-indigo-300"
                      : "text-slate-300"
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Bảng câu hỏi ({quizStats.answered}/{quizStats.total})</span>
                </Button>

                {quizStats.answered > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleOpenSummary}
                    className="gap-1.5 text-xs text-amber-300 border-amber-500/40 hover:bg-amber-500/10"
                  >
                    <Award className="w-3.5 h-3.5 text-amber-400" />
                    <span>Tổng kết</span>
                  </Button>
                )}
              </div>
            </div>

            {/* Visual Animated Progress Bar */}
            <div className="w-full bg-muted/60 h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500 transition-all duration-300 rounded-full"
                style={{
                  width: `${activeQuestions.length > 0 ? ((validQuizIndex + 1) / activeQuestions.length) * 100 : 0}%`,
                }}
              />
            </div>
          </div>

          {/* Collapsible Question Palette (Quick Jump Matrix) */}
          {showPalette && activeQuestions.length > 0 && (
            <div className="rounded-2xl border border-indigo-500/30 bg-card/85 backdrop-blur-md p-4 sm:p-5 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border/40 pb-2.5">
                <div className="text-xs font-bold text-foreground flex items-center gap-2">
                  <Layers className="w-4 h-4 text-indigo-400" />
                  <span>Bảng Chọn Câu Nhanh ({activeQuestions.length} câu)</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-[11px] text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Đã đúng ({quizStats.correct})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block" /> Đã sai ({quizStats.incorrect})
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-muted border border-border inline-block" /> Chưa làm ({quizStats.total - quizStats.answered})
                  </span>
                  {/* Flagged questions indicator and toggle filter */}
                  <button
                    type="button"
                    onClick={() => setPaletteFilterFlagged((prev) => !prev)}
                    className={`flex items-center gap-1.5 px-2 py-0.5 rounded-md border text-[11px] font-semibold transition-all cursor-pointer ${
                      paletteFilterFlagged
                        ? "bg-amber-500/25 text-amber-300 border-amber-500/60 shadow-sm"
                        : "bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20"
                    }`}
                    title="Bấm để lọc xem danh sách các câu đã gắn cờ lưu"
                  >
                    <Flag className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>Đã gắn cờ ({activeQuestions.filter((q) => bookmarkedQuestions[q.slug]).length})</span>
                    {paletteFilterFlagged && <span className="text-[10px] text-amber-200 ml-1">✕ Hủy lọc</span>}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-6 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-15 gap-2 max-h-56 overflow-y-auto pr-1">
                {activeQuestions.map((q, idx) => {
                  const ans = userAnswers[q.slug];
                  const isCurrent = idx === validQuizIndex;
                  const isCorrect = ans && ans === q.correctAnswer;
                  const isWrong = ans && ans !== q.correctAnswer;
                  const isBookmarked = !!bookmarkedQuestions[q.slug];

                  if (paletteFilterFlagged && !isBookmarked) {
                    return null;
                  }

                  let style = "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground";
                  if (isCorrect) {
                    style = "bg-emerald-500/25 text-emerald-300 border border-emerald-500/50 font-bold";
                  } else if (isWrong) {
                    style = "bg-rose-500/25 text-rose-300 border border-rose-500/50 font-bold";
                  }

                  if (isCurrent) {
                    style += " ring-2 ring-indigo-400 font-black scale-105 z-10 shadow-md";
                  }

                  if (isBookmarked) {
                    style += " ring-1 ring-amber-400/90 border-amber-400/70 shadow-amber-500/20 shadow-sm";
                  }

                  return (
                    <button
                      key={q.id || q.slug || idx}
                      onClick={() => setCurrentQuizIndex(idx)}
                      className={`relative h-8 rounded-lg text-xs font-mono transition-all flex items-center justify-center ${style}`}
                      title={`Câu ${idx + 1}${isBookmarked ? " [🚩 Đã gắn cờ lưu]" : ""}${isCorrect ? " • Đúng" : isWrong ? " • Sai" : ""}`}
                    >
                      <span>{idx + 1}</span>
                      {isBookmarked && (
                        <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-slate-950 shadow-md ring-1 ring-background z-20">
                          <Flag className="w-2.5 h-2.5 fill-slate-950 text-slate-950" />
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Single Question Focus Card */}
          {!currentQuestion ? (
            <div className="rounded-2xl border border-dashed border-border/80 p-12 text-center text-muted-foreground">
              <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-sm font-semibold text-foreground">Không tìm thấy câu hỏi phù hợp với bộ lọc</p>
              <p className="text-xs text-muted-foreground mt-1">Vui lòng thử lại với từ khóa khác hoặc xóa bớt bộ lọc.</p>
            </div>
          ) : (
            <div className="rounded-3xl border border-border/80 bg-card/75 backdrop-blur-md p-6 sm:p-8 shadow-2xl space-y-6 transition-all">
              {/* Top Question Information */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/40 pb-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1 text-xs font-mono font-bold text-white shadow-md shadow-indigo-500/20">
                    CÂU {validQuizIndex + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-200 bg-secondary/60 px-2.5 py-1 rounded-lg">
                    {currentQuestion.topic}
                  </span>
                  <span className="text-[11px] text-muted-foreground">
                    ({currentQuestion.competition} • {currentQuestion.year})
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-secondary/80 px-2.5 py-0.5 text-[11px] font-medium text-slate-300">
                    {currentQuestion.difficulty}
                  </span>

                  {userAnswers[currentQuestion.slug] && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleResetCurrentQuestion(currentQuestion.slug)}
                      className="h-7 px-2 text-[11px] text-slate-400 hover:text-slate-200"
                      title="Làm lại câu hỏi này"
                    >
                      <RotateCcw className="w-3 h-3 mr-1" />
                      <span>Làm lại</span>
                    </Button>
                  )}

                  <button
                    onClick={() => handleToggleBookmark(currentQuestion.slug)}
                    title={bookmarkedQuestions[currentQuestion.slug] ? "Bỏ đánh dấu cờ lưu" : "Gắn cờ (Flag) lưu câu hỏi này để xem lại trên bảng câu hỏi"}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                      bookmarkedQuestions[currentQuestion.slug]
                        ? "bg-amber-500/20 border border-amber-500/50 text-amber-300 shadow-sm"
                        : "text-muted-foreground hover:text-amber-400 hover:bg-muted/50 border border-transparent"
                    }`}
                  >
                    <Flag className={`w-3.5 h-3.5 ${bookmarkedQuestions[currentQuestion.slug] ? "fill-amber-400 text-amber-400" : ""}`} />
                    <span>{bookmarkedQuestions[currentQuestion.slug] ? "Đã gắn cờ lưu" : "Gắn cờ lưu"}</span>
                  </button>
                </div>
              </div>

              {/* Question Content (KaTeX & Math) */}
              <div className="text-slate-100 text-base sm:text-lg font-medium leading-relaxed">
                <MarkdownMath content={currentQuestion.question} />
              </div>

              {/* Options List */}
              <div className="grid grid-cols-1 gap-3 pt-2">
                {currentQuestion.parsedOptions.map((opt) => {
                  const selectedOpt = userAnswers[currentQuestion.slug];
                  const isAnswered = !!selectedOpt;
                  const isOptionSelected = selectedOpt === opt.id;
                  const isOptionCorrect = currentQuestion.correctAnswer === opt.id;

                  let buttonStyle = "border-border/70 bg-background/60 hover:bg-muted/70 hover:border-indigo-500/50 text-slate-200 cursor-pointer";

                  if (isAnswered) {
                    if (isOptionCorrect) {
                      buttonStyle = "border-emerald-500 bg-emerald-500/15 text-emerald-200 font-semibold ring-1 ring-emerald-500/50 shadow-md shadow-emerald-500/10 cursor-default";
                    } else if (isOptionSelected && !isOptionCorrect) {
                      buttonStyle = "border-rose-500 bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/40 cursor-default line-through";
                    } else {
                      buttonStyle = "border-border/30 bg-background/20 text-slate-500 opacity-50 cursor-default";
                    }
                  }

                  return (
                    <button
                      key={opt.id}
                      disabled={isAnswered}
                      onClick={() => handleSelectAnswer(currentQuestion.slug, opt.id)}
                      className={`group flex items-start gap-3.5 rounded-2xl border p-4 text-left text-sm transition-all duration-200 ${buttonStyle}`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-xl font-mono text-xs font-bold transition-all ${
                          isAnswered && isOptionCorrect
                            ? "bg-emerald-500 text-white shadow-sm"
                            : isAnswered && isOptionSelected
                            ? "bg-rose-500 text-white"
                            : "bg-muted text-foreground group-hover:bg-indigo-600 group-hover:text-white"
                        }`}
                      >
                        {opt.id}
                      </span>
                      <div className="flex-1 mt-0.5 leading-relaxed font-normal">
                        <MarkdownMath content={opt.text} />
                      </div>
                      {isAnswered && isOptionCorrect && (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 animate-in zoom-in-50" />
                      )}
                      {isAnswered && isOptionSelected && !isOptionCorrect && (
                        <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5 animate-in zoom-in-50" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Immediate Explanation Feedback */}
              {userAnswers[currentQuestion.slug] && (
                <div className="space-y-4">
                  {/* Base Official Explanation */}
                  <div
                    className={`rounded-2xl border p-5 sm:p-6 text-sm leading-relaxed animate-in fade-in slide-in-from-top-3 duration-300 shadow-xl ${
                      userAnswers[currentQuestion.slug] === currentQuestion.correctAnswer
                        ? "border-emerald-500/40 bg-emerald-950/30 text-emerald-100"
                        : "border-rose-500/40 bg-rose-950/30 text-rose-100"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 font-bold text-base mb-3">
                      {userAnswers[currentQuestion.slug] === currentQuestion.correctAnswer ? (
                        <>
                          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                          <span className="text-emerald-400">Chính xác! (+1 điểm)</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0" />
                          <span className="text-rose-400">
                            Chưa chính xác! Đáp án đúng là {currentQuestion.correctAnswer}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="pt-3 border-t border-border/40 text-slate-200">
                      <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Phân tích & Lời giải từ Ban Giám Khảo:</span>
                      </div>
                      <div className="prose prose-invert max-w-none text-sm leading-relaxed">
                        <MarkdownMath content={currentQuestion.explanation} />
                      </div>
                    </div>
                  </div>

                  {/* NVIDIA Nemotron-3 Ultra 550B AI Assistant Card */}
                  <div className="rounded-2xl border border-emerald-500/35 bg-gradient-to-br from-emerald-950/25 via-card/90 to-slate-900/80 p-5 sm:p-6 backdrop-blur-md shadow-2xl space-y-4 animate-in fade-in duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/40 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center text-emerald-400 shadow-md shadow-emerald-500/20 shrink-0">
                          <Bot className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="text-xs sm:text-sm font-bold text-foreground">
                              Trợ Lý AI Nemotron-3 Ultra
                            </span>
                            <span className="rounded-full bg-emerald-500/15 border border-emerald-500/40 px-2 py-0.5 text-[10px] font-mono font-bold text-emerald-300">
                              550B Reasoning
                            </span>
                            <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 border border-indigo-500/40 px-2 py-0.5 text-[10px] font-semibold text-indigo-300">
                              <Cpu className="w-2.5 h-2.5 text-indigo-400" /> NVIDIA AI
                            </span>
                          </div>
                          <p className="text-[11px] text-muted-foreground mt-0.5">
                            Huấn luyện viên Olympic AI: phân tích sâu bản chất toán học, đạo hàm, ma trận & bẫy tư duy
                          </p>
                        </div>
                      </div>

                      {/* AI Action Trigger Button */}
                      <div className="shrink-0">
                        {!aiExplanations[currentQuestion.slug] ? (
                          <Button
                            size="sm"
                            disabled={loadingAi[currentQuestion.slug]}
                            onClick={() => handleRequestAiExplanation(currentQuestion.slug)}
                            className="w-full sm:w-auto gap-2 text-xs font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-indigo-600 hover:from-emerald-500 hover:to-indigo-500 text-white shadow-lg shadow-emerald-500/20 rounded-xl transition-all scale-100 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            {loadingAi[currentQuestion.slug] ? (
                              <>
                                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                                <span>Nemotron 550B đang suy luận...</span>
                              </>
                            ) : (
                              <>
                                <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
                                <span>✨ Nhờ Trợ Lý AI Phân Tích Sâu</span>
                              </>
                            )}
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] text-emerald-400 font-semibold flex items-center gap-1 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Đã phân tích xong
                            </span>
                            <Button
                              variant="outline"
                              size="sm"
                              disabled={loadingAi[currentQuestion.slug]}
                              onClick={() => handleRequestAiExplanation(currentQuestion.slug)}
                              className="h-8 px-2.5 text-xs text-slate-300 border-border/60 hover:bg-muted"
                              title="Yêu cầu AI phân tích lại câu hỏi này"
                            >
                              <RefreshCw className={`w-3.5 h-3.5 mr-1 ${loadingAi[currentQuestion.slug] ? "animate-spin" : ""}`} />
                              <span>Phân tích lại</span>
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* AI Loading Skeleton */}
                    {loadingAi[currentQuestion.slug] && (
                      <div className="rounded-xl border border-emerald-500/25 bg-emerald-950/15 p-5 space-y-3 animate-pulse">
                        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-400" />
                          <span>NVIDIA Nemotron-3 Ultra 550B đang xây dựng chuỗi suy luận logic (Reasoning)...</span>
                        </div>
                        <div className="space-y-2 pt-1">
                          <div className="h-3.5 bg-emerald-500/20 rounded-md w-5/6" />
                          <div className="h-3.5 bg-emerald-500/15 rounded-md w-full" />
                          <div className="h-3.5 bg-emerald-500/15 rounded-md w-4/5" />
                        </div>
                      </div>
                    )}

                    {/* AI Error Display */}
                    {aiErrors[currentQuestion.slug] && !loadingAi[currentQuestion.slug] && (
                      <div className="rounded-xl border border-rose-500/40 bg-rose-950/25 p-4 text-xs text-rose-200 space-y-2">
                        <div className="flex items-center gap-2 font-semibold">
                          <AlertCircle className="w-4 h-4 text-rose-400" />
                          <span>Không thể kết nối đến Trợ lý AI Nemotron:</span>
                        </div>
                        <p className="text-muted-foreground">{aiErrors[currentQuestion.slug]}</p>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleRequestAiExplanation(currentQuestion.slug)}
                          className="text-xs text-rose-300 border-rose-500/40 hover:bg-rose-500/10"
                        >
                          Thử kết nối lại
                        </Button>
                      </div>
                    )}

                    {/* AI Explanation Content */}
                    {aiExplanations[currentQuestion.slug] && !loadingAi[currentQuestion.slug] && (
                      <div className="space-y-3.5 animate-in fade-in duration-300">
                        {/* Reasoning Chain Collapsible Toggle */}
                        {aiExplanations[currentQuestion.slug].reasoning && (
                          <div className="rounded-xl border border-indigo-500/30 bg-indigo-950/20 p-3 text-xs">
                            <button
                              onClick={() =>
                                setShowReasoning((prev) => ({
                                  ...prev,
                                  [currentQuestion.slug]: !prev[currentQuestion.slug],
                                }))
                              }
                              className="flex items-center justify-between w-full text-left font-mono text-[11px] text-indigo-300 hover:text-indigo-200"
                            >
                              <span className="flex items-center gap-1.5">
                                <Zap className="w-3.5 h-3.5 text-amber-400" />
                                <span>Xem chuỗi suy luận logic (Reasoning Chain của Nemotron 550B)</span>
                              </span>
                              <span className="text-[10px] text-muted-foreground font-sans">
                                {showReasoning[currentQuestion.slug] ? "Thu gọn ▲" : "Mở rộng ▼"}
                              </span>
                            </button>
                            {showReasoning[currentQuestion.slug] && (
                              <div className="mt-2.5 pt-2.5 border-t border-indigo-500/30 text-slate-300 font-mono text-[11px] leading-relaxed max-h-56 overflow-y-auto whitespace-pre-wrap bg-background/40 p-3 rounded-lg">
                                {aiExplanations[currentQuestion.slug].reasoning}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Markdown Math Response */}
                        <div className="text-slate-100 text-sm leading-relaxed prose prose-invert max-w-none pt-1">
                          <MarkdownMath content={aiExplanations[currentQuestion.slug].explanation} />
                        </div>
                      </div>
                    )}

                    {/* Pre-trigger friendly prompt */}
                    {!aiExplanations[currentQuestion.slug] && !loadingAi[currentQuestion.slug] && !aiErrors[currentQuestion.slug] && (
                      <div className="rounded-xl border border-dashed border-border/60 bg-background/30 p-3.5 text-xs text-muted-foreground flex items-center justify-between gap-3">
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-emerald-400 shrink-0" />
                          <span>Bạn muốn hiểu sâu hơn về bản chất toán học, các phương án nhiễu hoặc mẹo giải nhanh? Hãy nhờ Trợ lý AI Nemotron-3 Ultra hỗ trợ.</span>
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRequestAiExplanation(currentQuestion.slug)}
                          className="shrink-0 text-xs text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 font-semibold"
                        >
                          Khám phá ngay →
                        </Button>
                      </div>
                    )}

                    {/* Interactive Follow-up Q&A Section with Nemotron-3 Ultra */}
                    <div className="pt-4 border-t border-border/40 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                          <MessageSquare className="w-4 h-4 text-emerald-400" />
                          <span>Đặt Câu Hỏi Cho Trợ Lý AI (Hỏi & Đáp Chuyên Sâu)</span>
                        </div>
                        {(chatConversations[currentQuestion.slug]?.length || 0) > 0 && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleClearChat(currentQuestion.slug)}
                            className="h-6 px-2 text-[11px] text-muted-foreground hover:text-rose-400 gap-1"
                            title="Xóa lịch sử hội thoại câu hỏi này"
                          >
                            <Trash2 className="w-3 h-3" />
                            <span>Xóa hội thoại</span>
                          </Button>
                        )}
                      </div>

                      {/* Quick Prompt Chips */}
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="text-[11px] text-muted-foreground mr-1">Gợi ý nhanh:</span>
                        {[
                          "🔢 Cho ví dụ số ma trận minh họa cụ thể",
                          "📐 Chứng minh toán học công thức này từ đầu",
                          "🎯 Thêm 1 bài tập biến thể tương tự kèm lời giải",
                          "⚠️ Những bẫy tư duy thí sinh hay mắc phải nhất",
                        ].map((promptText) => (
                          <button
                            key={promptText}
                            type="button"
                            disabled={sendingChat[currentQuestion.slug]}
                            onClick={() => handleSendCustomQuestion(currentQuestion.slug, promptText)}
                            className="rounded-lg border border-border/60 bg-background/50 hover:bg-emerald-500/10 hover:border-emerald-500/40 px-2.5 py-1 text-[11px] text-slate-300 hover:text-emerald-300 transition-all text-left disabled:opacity-50 cursor-pointer"
                          >
                            {promptText}
                          </button>
                        ))}
                      </div>

                      {/* Chat Messages History */}
                      {(chatConversations[currentQuestion.slug]?.length || 0) > 0 && (
                        <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                          {chatConversations[currentQuestion.slug]?.map((msg) => (
                            <div
                              key={msg.id}
                              className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                                msg.role === "user"
                                  ? "bg-indigo-950/40 border border-indigo-500/30 text-indigo-100 ml-4 sm:ml-8"
                                  : "bg-emerald-950/20 border border-emerald-500/35 text-slate-100 mr-4 sm:mr-8"
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2 font-semibold text-xs">
                                <span className="flex items-center gap-1.5">
                                  {msg.role === "user" ? (
                                    <>
                                      <User className="w-3.5 h-3.5 text-indigo-400" />
                                      <span className="text-indigo-300">Câu hỏi của bạn:</span>
                                    </>
                                  ) : (
                                    <>
                                      <Bot className="w-3.5 h-3.5 text-emerald-400" />
                                      <span className="text-emerald-300">Trợ lý Nemotron 550B giải đáp:</span>
                                    </>
                                  )}
                                </span>
                              </div>

                              <div className="prose prose-invert max-w-none text-xs sm:text-sm leading-relaxed">
                                <MarkdownMath content={msg.content} />
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Loading indicator when waiting for answer */}
                      {sendingChat[currentQuestion.slug] && (
                        <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-3.5 flex items-center gap-2.5 text-xs text-emerald-300 animate-pulse">
                          <Loader2 className="w-4 h-4 animate-spin text-emerald-400 shrink-0" />
                          <span>NVIDIA Nemotron-3 Ultra 550B đang suy luận và biên soạn câu trả lời...</span>
                        </div>
                      )}

                      {/* Chat error display */}
                      {chatErrors[currentQuestion.slug] && (
                        <div className="rounded-xl border border-rose-500/40 bg-rose-950/20 p-3 text-xs text-rose-300 flex items-center gap-2">
                          <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                          <span>{chatErrors[currentQuestion.slug]}</span>
                        </div>
                      )}

                      {/* Chat Input Bar */}
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSendCustomQuestion(currentQuestion.slug);
                        }}
                        className="flex items-center gap-2 pt-1"
                      >
                        <div className="relative flex-1">
                          <input
                            type="text"
                            placeholder="Đặt câu hỏi cho Trợ lý AI Nemotron (nhấn Enter hoặc nút Gửi)..."
                            value={userCustomInputs[currentQuestion.slug] || ""}
                            onChange={(e) =>
                              setUserCustomInputs((prev) => ({
                                ...prev,
                                [currentQuestion.slug]: e.target.value,
                              }))
                            }
                            disabled={sendingChat[currentQuestion.slug]}
                            className="w-full rounded-xl border border-border/80 bg-background/80 px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-emerald-500 disabled:opacity-50"
                          />
                        </div>

                        <Button
                          type="submit"
                          disabled={
                            sendingChat[currentQuestion.slug] ||
                            !(userCustomInputs[currentQuestion.slug] || "").trim()
                          }
                          className="gap-1.5 px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-md shadow-emerald-500/20 disabled:opacity-40"
                        >
                          {sendingChat[currentQuestion.slug] ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <>
                              <Send className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Gửi câu hỏi</span>
                            </>
                          )}
                        </Button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {/* Bottom Action Bar for Moving to Next Question */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/40">
                <Button
                  variant="outline"
                  disabled={validQuizIndex === 0}
                  onClick={() => setCurrentQuizIndex((p) => Math.max(0, p - 1))}
                  className="w-full sm:w-auto gap-2 rounded-xl text-xs font-semibold"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Câu trước</span>
                </Button>

                <div className="text-xs text-muted-foreground text-center">
                  {!userAnswers[currentQuestion.slug] ? (
                    <span className="text-amber-400/90 font-medium animate-pulse flex items-center justify-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Vui lòng chọn đáp án để xem giải thích và chuyển sang câu tiếp theo
                    </span>
                  ) : (
                    <span className="text-emerald-400 font-medium flex items-center justify-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Đã trả lời xong! Nhấn "Câu tiếp theo" để tiếp tục
                    </span>
                  )}
                </div>

                {validQuizIndex < activeQuestions.length - 1 ? (
                  <Button
                    disabled={!userAnswers[currentQuestion.slug]}
                    onClick={() => setCurrentQuizIndex((p) => p + 1)}
                    className={`w-full sm:w-auto gap-2 rounded-xl px-6 py-2 text-xs font-bold transition-all ${
                      userAnswers[currentQuestion.slug]
                        ? "bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25 scale-100 hover:scale-[1.02] active:scale-[0.98]"
                        : "opacity-40 cursor-not-allowed bg-muted text-muted-foreground"
                    }`}
                  >
                    <span>Câu tiếp theo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                ) : (
                  <Button
                    disabled={!userAnswers[currentQuestion.slug]}
                    onClick={handleOpenSummary}
                    className={`w-full sm:w-auto gap-2 rounded-xl px-6 py-2 text-xs font-bold transition-all ${
                      userAnswers[currentQuestion.slug]
                        ? "bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25 scale-100 hover:scale-[1.02]"
                        : "opacity-40 cursor-not-allowed bg-muted text-muted-foreground"
                    }`}
                  >
                    <span>Xem tổng kết kết quả</span>
                    <Award className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Practice Summary Modal */}
          {showSummaryModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 animate-in fade-in duration-200">
              <div className="rounded-3xl border border-indigo-500/40 bg-card/95 backdrop-blur-xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-200 text-center">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30 text-white">
                  <Trophy className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-black text-foreground">Tổng Kết Kết Quả Luyện Tập</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {isShuffled ? "Bộ đề thi đã xáo ngẫu nhiên" : "Thứ tự câu hỏi tiêu chuẩn"}
                  </p>
                </div>

                {/* Score Big Display */}
                <div className="rounded-2xl border border-border/80 bg-background/60 p-5 grid grid-cols-3 gap-3">
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-emerald-400">{quizStats.correct}</div>
                    <div className="text-[11px] text-muted-foreground font-semibold mt-0.5">Số câu đúng</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-rose-400">{quizStats.incorrect}</div>
                    <div className="text-[11px] text-muted-foreground font-semibold mt-0.5">Số câu sai</div>
                  </div>
                  <div>
                    <div className="text-2xl sm:text-3xl font-black text-indigo-400">{quizStats.accuracy}%</div>
                    <div className="text-[11px] text-muted-foreground font-semibold mt-0.5">Độ chính xác</div>
                  </div>
                </div>

                {/* Evaluation text */}
                <p className="text-xs text-slate-300 leading-relaxed">
                  {quizStats.accuracy >= 85
                    ? "Xuất sắc! Bạn đã nắm vững lý thuyết và các công thức toán AI cấp độ Huy Chương Vàng Olympic!"
                    : quizStats.accuracy >= 70
                    ? "Rất tốt! Kiến thức nền tảng của bạn rất vững chắc. Hãy tiếp tục củng cố thêm các phần chứng minh sâu!"
                    : quizStats.accuracy >= 50
                    ? "Khá tốt! Bạn đã vượt qua hơn một nửa câu hỏi. Hãy xem lại giải thích các câu làm sai để ghi nhớ lâu hơn!"
                    : "Cần luyện tập thêm! Hãy đọc kỹ phần giải thích chi tiết KaTeX để bổ sung kiến thức còn thiếu!"}
                </p>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-2 pt-2">
                  <Button
                    onClick={handleShuffle}
                    className="w-full gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs"
                  >
                    <Shuffle className="w-3.5 h-3.5" />
                    <span>Xáo câu hỏi & Luyện lại</span>
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleResetQuiz}
                    className="w-full gap-2 rounded-xl text-xs"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Làm lại từ đầu</span>
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => setShowSummaryModal(false)}
                    className="w-full rounded-xl text-xs text-muted-foreground hover:text-slate-200"
                  >
                    Đóng
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: Timed Mock Exam */}
      {/* ========================================================================= */}
      {activeTab === "exam" && (
        <div className="space-y-6">
          {!examStarted && !examFinished && (
            <div className="rounded-2xl border border-amber-500/30 bg-card/70 backdrop-blur-md p-8 sm:p-12 text-center max-w-2xl mx-auto shadow-2xl">
              <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-5 text-amber-400">
                <Flame className="w-8 h-8" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-3">
                Phòng Thi Thử Lý Thuyết Chuẩn Olympic
              </h2>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                Giả lập kỳ thi bấm giờ áp lực cao: Thử thách kiến thức toán ma trận, tối ưu hóa gradient, thị giác máy tính, NLP và đạo đức AI.
              </p>

              {/* Exam Options Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 text-left">
                <button
                  onClick={() => setExamConfig({ questionCount: 20, timeMinutes: 30, competitionFilter: "all" })}
                  className={`rounded-xl border p-4 text-xs transition-all ${
                    examConfig.questionCount === 20
                      ? "border-amber-500 bg-amber-500/10 text-amber-300 ring-1 ring-amber-500"
                      : "border-border/60 bg-card/40 text-slate-300 hover:bg-card"
                  }`}
                >
                  <div className="font-bold text-sm mb-1">Đề Rút Gọn (Mini)</div>
                  <div className="text-muted-foreground">20 câu trắc nghiệm • 30 phút</div>
                </button>

                <button
                  onClick={() => setExamConfig({ questionCount: 30, timeMinutes: 45, competitionFilter: "all" })}
                  className={`rounded-xl border p-4 text-xs transition-all ${
                    examConfig.questionCount === 30
                      ? "border-amber-500 bg-amber-500/10 text-amber-300 ring-1 ring-amber-500"
                      : "border-border/60 bg-card/40 text-slate-300 hover:bg-card"
                  }`}
                >
                  <div className="font-bold text-sm mb-1">Đề Tiêu Chuẩn (Standard)</div>
                  <div className="text-muted-foreground">30 câu trắc nghiệm • 45 phút</div>
                </button>

                <button
                  onClick={() => setExamConfig({ questionCount: 50, timeMinutes: 90, competitionFilter: "all" })}
                  className={`rounded-xl border p-4 text-xs transition-all ${
                    examConfig.questionCount === 50
                      ? "border-amber-500 bg-amber-500/10 text-amber-300 ring-1 ring-amber-500"
                      : "border-border/60 bg-card/40 text-slate-300 hover:bg-card"
                  }`}
                >
                  <div className="font-bold text-sm mb-1">Đề Vòng Loại (Intensive)</div>
                  <div className="text-muted-foreground">50 câu trắc nghiệm • 90 phút</div>
                </button>
              </div>

              <Button
                size="lg"
                onClick={startExam}
                className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white font-bold gap-2 px-8 shadow-xl shadow-amber-600/20"
              >
                <Clock className="w-5 h-5" />
                <span>Bắt Đầu Làm Bài Thi ({examConfig.questionCount} Câu)</span>
              </Button>
            </div>
          )}

          {/* Running Exam */}
          {examStarted && !examFinished && examQuestions.length > 0 && (
            <div className="space-y-6">
              {/* Exam Sticky Status Bar */}
              <div className="sticky top-16 z-30 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/80 bg-card/90 backdrop-blur-md p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 font-mono text-lg font-black text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-lg">
                    <Clock className="w-4 h-4 text-amber-400" />
                    <span>{formatTimer(examTimeRemaining)}</span>
                  </div>
                  <span className="text-xs text-muted-foreground hidden sm:inline">
                    Đã làm: <strong className="text-emerald-400 font-mono">{Object.keys(examAnswers).length}</strong>/{examQuestions.length} câu
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={finishExam}
                    className="font-bold text-xs"
                  >
                    <span>Nộp bài ngay</span>
                  </Button>
                </div>
              </div>

              {/* Current Question View */}
              {examQuestions[currentExamIndex] && (
                <div className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-6">
                  <div className="flex items-center justify-between border-b border-border/50 pb-3">
                    <span className="rounded-md bg-amber-500/10 px-3 py-1 font-mono font-black text-sm text-amber-400 border border-amber-500/30">
                      Câu {currentExamIndex + 1} / {examQuestions.length}
                    </span>
                    <span className="text-xs text-muted-foreground font-semibold">
                      {examQuestions[currentExamIndex].topic}
                    </span>
                  </div>

                  <div className="text-slate-100 font-medium leading-relaxed text-base">
                    <MarkdownMath content={examQuestions[currentExamIndex].question} />
                  </div>

                  <div className="grid grid-cols-1 gap-3 pt-2">
                    {examQuestions[currentExamIndex].parsedOptions.map((opt: any) => {
                      const isSelected = examAnswers[examQuestions[currentExamIndex].slug] === opt.id;
                      return (
                        <button
                          key={opt.id}
                          onClick={() =>
                            setExamAnswers((p) => ({
                              ...p,
                              [examQuestions[currentExamIndex].slug]: opt.id,
                            }))
                          }
                          className={`flex items-start gap-3 rounded-xl border p-4 text-left text-xs transition-all ${
                            isSelected
                              ? "border-amber-500 bg-amber-500/10 text-amber-200 ring-1 ring-amber-500"
                              : "border-border/70 bg-background/60 hover:bg-muted/60 text-slate-200"
                          }`}
                        >
                          <span
                            className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold ${
                              isSelected ? "bg-amber-500 text-slate-950 font-black" : "bg-muted text-foreground"
                            }`}
                          >
                            {opt.id}
                          </span>
                          <div className="flex-1 mt-0.5 leading-relaxed">
                            <MarkdownMath content={opt.text} />
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Navigation prev / next */}
                  <div className="flex items-center justify-between pt-6 border-t border-border/50">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={currentExamIndex === 0}
                      onClick={() => setCurrentExamIndex((p) => p - 1)}
                      className="gap-1 text-xs"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Câu trước</span>
                    </Button>

                    <div className="text-xs text-muted-foreground font-mono">
                      {currentExamIndex + 1} of {examQuestions.length}
                    </div>

                    {currentExamIndex < examQuestions.length - 1 ? (
                      <Button
                        variant="default"
                        size="sm"
                        onClick={() => setCurrentExamIndex((p) => p + 1)}
                        className="gap-1 text-xs"
                      >
                        <span>Câu kế tiếp</span>
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    ) : (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={finishExam}
                        className="gap-1 text-xs font-bold"
                      >
                        <span>Nộp bài thi</span>
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {/* Complete Question Palette Grid */}
              <div className="rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="font-semibold text-foreground">Bảng câu hỏi (Question Sheet)</span>
                  <span>Nhấp vào ô số để chuyển nhanh đến câu tương ứng</span>
                </div>

                <div className="flex flex-wrap gap-2">
                  {examQuestions.map((q, idx) => {
                    const isAnswered = !!examAnswers[q.slug];
                    const isCurrent = idx === currentExamIndex;
                    return (
                      <button
                        key={q.id}
                        onClick={() => setCurrentExamIndex(idx)}
                        className={`h-8 w-8 rounded-lg text-xs font-mono font-bold transition-all ${
                          isCurrent
                            ? "bg-amber-500 text-slate-950 ring-2 ring-amber-400 scale-105"
                            : isAnswered
                            ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                            : "bg-muted/60 text-muted-foreground border border-border hover:bg-muted"
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Exam Result Report */}
          {examFinished && (
            <div className="rounded-2xl border border-border/80 bg-card/70 backdrop-blur-md p-8 sm:p-10 shadow-2xl space-y-8">
              <div className="text-center max-w-md mx-auto">
                <div className="w-20 h-20 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center mx-auto mb-4 text-amber-400 shadow-xl">
                  <Award className="w-10 h-10" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-1">
                  Kết Quả Bài Thi Thử Lý Thuyết
                </h2>
                <div className="text-5xl font-mono font-black text-amber-400 mt-4 mb-2">
                  {examScore} / {examQuestions.length}
                </div>
                <p className="text-sm font-semibold text-slate-300">
                  Tỷ lệ chính xác: {Math.round((examScore / examQuestions.length) * 100)}%
                </p>

                {/* Olympiad Medal Classification */}
                <div className="mt-4 p-3 rounded-xl border border-border bg-background/50 text-xs">
                  {(examScore / examQuestions.length) >= 0.85 ? (
                    <span className="text-amber-400 font-bold">🥇 Xếp hạng: Huy chương Vàng (Gold Medal)</span>
                  ) : (examScore / examQuestions.length) >= 0.70 ? (
                    <span className="text-slate-200 font-bold">🥈 Xếp hạng: Huy chương Bạc (Silver Medal)</span>
                  ) : (examScore / examQuestions.length) >= 0.55 ? (
                    <span className="text-amber-600 font-bold">🥉 Xếp hạng: Huy chương Đồng (Bronze Medal)</span>
                  ) : (
                    <span className="text-muted-foreground font-medium">Bằng Khen Danh Dự (Honorable Mention)</span>
                  )}
                </div>

                <div className="mt-6 flex justify-center gap-3">
                  <Button variant="outline" size="sm" onClick={startExam}>
                    Làm lại bài thi
                  </Button>
                  <Button variant="default" size="sm" onClick={() => setActiveTab("quiz")}>
                    Xem lời giải chi tiết từng câu
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: 10 Written Theory & Proof Modules */}
      {/* ========================================================================= */}
      {activeTab === "written" && (
        <div className="space-y-6">
          {/* Module 1 */}
          <div className="rounded-2xl border border-purple-500/30 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-purple-400 font-bold text-sm border-b border-border/60 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>Chuyên Đề 1: Định Lý PAC Learnability & Độ Phức Tạp Mẫu (Sample Complexity)</span>
            </div>
            <MarkdownMath
              content={`### 1. Phát biểu Bài toán
Cho không gian giả thuyết hữu hạn $\\mathcal{H}$. Với các tham số $\\epsilon > 0$ (độ chính xác) và $\\delta \\in (0, 1)$ (độ tin cậy), hãy chứng minh thuật toán Empirical Risk Minimization (ERM) chỉ cần kích thước mẫu:
$$m \\ge \\frac{1}{\\epsilon} \\left( \\ln |\\mathcal{H}| + \\ln \\frac{1}{\\delta} \\right)$$
để đảm bảo $\\mathbb{P}[\\text{err}_D(\\hat{h}) \\le \\epsilon] \\ge 1 - \\delta$.

### 2. Chứng minh Toán học
1. Gọi $\\mathcal{H}_{\\text{bad}} = \\{ h \\in \\mathcal{H} \\mid \\text{err}_D(h) > \\epsilon \\}$.
2. Với $h \\in \\mathcal{H}_{\\text{bad}}$, xác suất nó dự đoán đúng trên cả $m$ mẫu độc lập là:
$$\\mathbb{P}[\\text{err}_S(h) = 0] = (1 - \\text{err}_D(h))^m < (1 - \\epsilon)^m \\le e^{-\\epsilon m}$$
3. Theo Bất đẳng thức Hợp tử (Union Bound):
$$\\mathbb{P}[\\exists h \\in \\mathcal{H}_{\\text{bad}}: \\text{err}_S(h) = 0] \\le |\\mathcal{H}| e^{-\\epsilon m}$$
4. Đặt $|\\mathcal{H}| e^{-\\epsilon m} \\le \\delta \\implies m \\ge \\frac{1}{\\epsilon} (\\ln |\\mathcal{H}| + \\ln \\frac{1}{\\delta}) \\quad \\blacksquare$$`}
            />
          </div>

          {/* Module 2 */}
          <div className="rounded-2xl border border-indigo-500/30 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm border-b border-border/60 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>Chuyên Đề 2: Suy Dẫn Cận Dưới Bằng Chứng (ELBO) & Reparameterization Trick trong VAE</span>
            </div>
            <MarkdownMath
              content={`### 1. Suy dẫn Cận dưới ELBO
Ta muốn tối đại hóa $\\log p_\\theta(x) = \\log \\int p_\\theta(x, z) dz$. Sử dụng phân phối xấp xỉ biến phân $q_\\phi(z|x)$:
$$\\log p_\\theta(x) = \\log \\mathbb{E}_{z \\sim q_\\phi(z|x)} \\left[ \\frac{p_\\theta(x, z)}{q_\\phi(z|x)} \\right]$$
Áp dụng Bất đẳng thức Jensen:
$$\\log p_\\theta(x) \\ge \\mathbb{E}_{q_\\phi(z|x)} \\left[ \\log \\frac{p_\\theta(x, z)}{q_\\phi(z|x)} \\right] = \\mathbb{E}_{q_\\phi(z|x)} [\\log p_\\theta(x|z)] - D_{\\text{KL}}(q_\\phi(z|x) \\parallel p(z)) \\equiv \\text{ELBO}$$

### 2. Kỹ thuật Reparameterization Trick
Tách tính ngẫu nhiên của $z \\sim \\mathcal{N}(\\mu, \\sigma^2)$ qua biến phụ $z = \\mu + \\sigma \\odot \\epsilon$ với $\\epsilon \\sim \\mathcal{N}(0, I)$, cho phép truyền đạo hàm gradient $\\nabla_\\phi$ trực tiếp qua mạng nơ-ron.`}
            />
          </div>

          {/* Module 3 (from VAIC 2026) */}
          <div className="rounded-2xl border border-emerald-500/30 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm border-b border-border/60 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>Chuyên Đề 3: Mô Hình Tổ Hợp Ensemble 5 Bộ Phân Loại Độc Lập & Xác Suất Lỗi Đa Số (VAIC 2026)</span>
            </div>
            <MarkdownMath
              content={`### 1. Đề bài
Xét mô hình tổ hợp gồm 5 bộ phân loại độc lập $h_1, h_2, h_3, h_4, h_5$ kết hợp theo cơ chế bỏ phiếu đa số (Majority Vote). Mỗi bộ phân loại có xác suất dự đoán sai bằng $p = 0.3$. Tính xác suất mô hình tổ hợp đưa ra dự đoán sai.

### 2. Lời giải Chi tiết
Mô hình tổ hợp bị sai khi có ít nhất 3 trong số 5 bộ phân loại dự đoán sai ($k \\in \\{3, 4, 5\\}$).
Vì các sai số xảy ra độc lập, số bộ phân loại bị sai tuân theo phân phối nhị thức $B(5, p)$:
$$P(\\text{sai}) = \\sum_{k=3}^5 \\binom{5}{k} p^k (1 - p)^{5-k}$$
- Với $k = 3$: $\\binom{5}{3} (0.3)^3 (0.7)^2 = 10 \\times 0.027 \\times 0.49 = 0.1323$
- Với $k = 4$: $\\binom{5}{4} (0.3)^4 (0.7)^1 = 5 \\times 0.0081 \\times 0.7 = 0.02835$
- Với $k = 5$: $\\binom{5}{5} (0.3)^5 = 1 \\times 0.00243 = 0.00243$
$$\\implies P(\\text{sai}) = 0.1323 + 0.02835 + 0.00243 = 0.16308 \\approx 16.31\\%$$
*Nhận xét:* Bỏ phiếu đa số đã giảm xác suất sai từ $30\\%$ xuống còn $16.31\\%$, minh họa cho Định lý Bồi thẩm đoàn Condorcet.`}
            />
          </div>

          {/* Module 4 (from VAIC 2026) */}
          <div className="rounded-2xl border border-cyan-500/30 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm border-b border-border/60 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>Chuyên Đề 4: Hồi Quy Tuyến Tính Có Trọng Số (Weighted Linear Regression Closed-Form - VAIC 2026)</span>
            </div>
            <MarkdownMath
              content={`### 1. Đề bài
Hàm mất mát hồi quy có trọng số $r_i > 0$:
$$E(w) = \\sum_{i=1}^n r_i (w^T x_i - y_i)^2$$
(a) Tính gradient $\\frac{dE}{dw}$. (b) Tìm công thức nghiệm đóng (closed-form solution) của $w^*$.

### 2. Lời giải Chi tiết
Viết dưới dạng ma trận: Gọi $X \\in \\mathbb{R}^{n \\times d}, y \\in \\mathbb{R}^n$, và $R = \\text{diag}(r_1, ..., r_n)$.
$$E(w) = (Xw - y)^T R (Xw - y)$$
1. **Tính Gradient:**
$$\\frac{\\partial E}{\\partial w} = 2 X^T R (Xw - y) = 2 \\sum_{i=1}^n r_i x_i (w^T x_i - y_i)$$
2. **Nghiệm Đóng:**
Đặt $\\frac{\\partial E}{\\partial w} = 0$:
$$X^T R X w = X^T R y \\implies w^* = (X^T R X)^{-1} X^T R y \\quad \\blacksquare$$`}
            />
          </div>

          {/* Module 5 (from VAIC 2026) */}
          <div className="rounded-2xl border border-amber-500/30 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm border-b border-border/60 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>Chuyên Đề 5: Bộ Phân Loại Tâm Gần Nhất CLOSE & Phương Trình Ranh Giới Tuyến Tính (VAIC 2026)</span>
            </div>
            <MarkdownMath
              content={`### 1. Đề bài
Cho tâm lớp dương $C_+$ và lớp âm $C_-$. Một mẫu kiểm tra $x$ được gán vào lớp có tâm gần nhất theo khoảng cách Euclid. Hãy chứng minh bộ phân loại có dạng $\\hat{y}(x) = \\text{sign}(\\omega^T x + b)$ và biểu diễn $\\omega, b$ theo $C_+, C_-$.

### 2. Lời giải Chi tiết
Mẫu $x$ được gán nhãn $+1$ khi và chỉ khi:
$$\\|x - C_+\\|^2 \\le \\|x - C_-\\|^2$$
Khai triển bình phương khoảng cách:
$$x^T x - 2 C_+^T x + \\|C_+\\|^2 \\le x^T x - 2 C_-^T x + \\|C_-\\|^2$$
Triệt tiêu $x^T x$ và chuyển vế:
$$2 (C_+ - C_-)^T x + (\\|C_-\\|^2 - \\|C_+\\|^2) \\ge 0$$
Chia cho 2:
$$(C_+ - C_-)^T x + \\frac{1}{2}(\\|C_-\\|^2 - \\|C_+\\|^2) \\ge 0$$
Do đó bộ phân loại có dạng tuyến tính $\\hat{y}(x) = \\text{sign}(\\omega^T x + b)$ với:
$$\\omega = C_+ - C_-, \\quad b = \\frac{1}{2}(\\|C_-\\|^2 - \\|C_+\\|^2) \\quad \\blacksquare$$`}
            />
          </div>

          {/* Module 6 (from IOAI 2024) */}
          <div className="rounded-2xl border border-rose-500/30 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold text-sm border-b border-border/60 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>Chuyên Đề 6: Thuật Toán K-Means 2D & Chứng Minh Tính Hội Tụ Hữu Hạn Bước (IOAI 2024)</span>
            </div>
            <MarkdownMath
              content={`### 1. Đề bài
Xét thuật toán K-means ($K=2$) trên tập dữ liệu 10 điểm trong mặt phẳng 2 chiều với tâm ban đầu $\\theta_{A, 0} = (1.90, 0.97)$ và $\\theta_{B, 0} = (3.17, 4.96)$. Hãy chứng minh K-means không bao giờ lặp lại một cấu hình phân hoạch và luôn hội tụ hữu hạn bước.

### 2. Chứng minh Toán học
1. Một cấu hình phân hoạch là cách chia $N$ điểm thành $K$ tập hợp không rỗng $S_1, ..., S_K$. Số lượng cách phân chia là số Stirling loại hai $S(N, K) \\le K^N$, là một số hữu hạn.
2. Hàm mất mát bình phương khoảng cách sai số (SSE):
$$\\text{SSE}(S, \\mu) = \\sum_{k=1}^K \\sum_{x \\in S_k} \\|x - \\mu_k\\|^2$$
3. Tại bước gán nhãn: mỗi điểm chọn tâm gần nhất, $\\text{SSE}$ giảm hoặc bằng.
4. Tại bước cập nhật tâm: đạo hàm $\\nabla_{\\mu_k} \\text{SSE} = 0 \\implies \\mu_k = \\frac{1}{|S_k|} \\sum_{x \\in S_k} x$, cực tiểu hóa đơn điệu SSE.
5. Vì SSE giảm nghiêm ngặt sau mỗi lần thay đổi phân hoạch và bị chặn dưới bởi 0, thuật toán không bao giờ quay lại cấu hình cũ, buộc phải dừng lại sau tối đa $K^N$ bước.`}
            />
          </div>

          {/* Module 7 (from IOAI 2024) */}
          <div className="rounded-2xl border border-blue-500/30 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-blue-400 font-bold text-sm border-b border-border/60 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>Chuyên Đề 7: Tính Toán Tham Số Mô Hình DALL-E & Feed-Forward Transformer (IOAI 2024)</span>
            </div>
            <MarkdownMath
              content={`### 1. Đề bài
DALL-E sử dụng discrete VAE để mã hóa ảnh thành $V = 8192$ visual tokens, mỗi token nhúng thành vector $d = 512$. Mạng FFN trong mỗi khối Transformer gồm 2 phép biến đổi $d \\to f$ và $f \\to d$ với $f = 2048$ (không bias). Tính tổng tham số của ma trận nhúng và FFN.

### 2. Lời giải Chi tiết
1. **Ma trận nhúng từ vựng (Visual Vocabulary Embedding Matrix):**
$$E \\in \\mathbb{R}^{V \\times d} \\implies \\text{Params} = 8192 \\times 512 = 4,194,304 \\text{ tham số}$$
2. **Mạng Feed-Forward (FFN):**
- Tuyến tính lớp 1 ($W_1 \\in \\mathbb{R}^{d \\times f}$): $512 \\times 2048 = 1,048,576$ tham số
- Tuyến tính lớp 2 ($W_2 \\in \\mathbb{R}^{f \\times d}$): $2048 \\times 512 = 1,048,576$ tham số
- Tổng số tham số của FFN trong một khối Transformer:
$$\\text{Total} = 1,048,576 + 1,048,576 = 2,097,152 \\text{ tham số} \\quad \\blacksquare$$`}
            />
          </div>

          {/* Module 8 (from IOAI 2024) */}
          <div className="rounded-2xl border border-teal-500/30 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-teal-400 font-bold text-sm border-b border-border/60 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>Chuyên Đề 8: Định Lý Novikoff & Chặn Số Bước Cập Nhật Của Kernel Perceptron (IOAI 2024)</span>
            </div>
            <MarkdownMath
              content={`### 1. Đặt Vấn Đề
Định lý Novikoff đảm bảo thuật toán Perceptron luôn hội tụ nếu tập dữ liệu khả phân tuyến tính với lề (margin) $\\gamma > 0$ và bán kính bao $R = \\max_i \\|x_i\\|$. Hãy tìm cận trên cho số lần cập nhật trọng số của Perceptron.

### 2. Chứng minh Định lý Novikoff
1. Giả sử tồn tại vector đơn vị $u$ ($\\|u\\| = 1$) sao cho $y_i (u^T x_i) \\ge \\gamma > 0, \\forall i$.
2. Sau $k$ bước cập nhật $w_k = w_{k-1} + y_i x_i$:
- **Chặn dưới tích vô hướng:**
$$u^T w_k = u^T w_{k-1} + y_i (u^T x_i) \\ge u^T w_{k-1} + \\gamma \\implies u^T w_k \\ge k \\gamma$$
Theo Bất đẳng thức Cauchy-Schwarz: $\\|w_k\\| = \\|u\\| \\|w_k\\| \\ge u^T w_k \\ge k\\gamma \\implies \\|w_k\\|^2 \\ge k^2 \\gamma^2$.
- **Chặn trên độ dài vector:**
$$\\|w_k\\|^2 = \\|w_{k-1} + y_i x_i\\|^2 = \\|w_{k-1}\\|^2 + 2 y_i w_{k-1}^T x_i + \\|x_i\\|^2 \\le \\|w_{k-1}\\|^2 + R^2 \\implies \\|w_k\\|^2 \\le k R^2$$
3. Kết hợp hai bất đẳng thức:
$$k^2 \\gamma^2 \\le \\|w_k\\|^2 \\le k R^2 \\implies k \\le \\left( \\frac{R}{\\gamma} \\right)^2 \\quad \\blacksquare$$`}
            />
          </div>

          {/* Module 9 (from IOAI 2024) */}
          <div className="rounded-2xl border border-yellow-500/30 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-yellow-400 font-bold text-sm border-b border-border/60 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>Chuyên Đề 9: Giải Hệ Phương Trình Bellman Tuyến Tính Trong Môi Trường Grid World (IOAI 2024)</span>
            </div>
            <MarkdownMath
              content={`### 1. Đề bài
Tác tử trong lưới $3 \\times 3$. Phần thưởng tức thì: $R(s_1, \\text{right}) = 1$, $R(s_2, \\text{down}) = 2$. Hệ số chiết khấu $\\gamma = 0.9$. Chính sách $\\pi$ chọn 'sang phải' ở $s_1$ và 'xuống dưới' ở mọi trạng thái khác.

### 2. Thiết lập Ma trận và Lời giải
Vì không thể quay ngược lên hàng 1 sau khi rơi xuống hàng 2 và 3, giá trị $V(s_i) = 0$ với mọi $i \\ge 4$.
Ta thu được hệ 3 phương trình Bellman tuyến tính cho hàng 1:
$$\\begin{cases}
V(s_1) = 1 + 0.9 [0.1 V(s_1) + 0.8 V(s_2)] \\\\
V(s_2) = 2 + 0.9 [0.1 V(s_1) + 0.1 V(s_3)] \\\\
V(s_3) = 0.9 [0.1 V(s_3) + 0.1 V(s_2)]
\\end{cases}$$
Viết dưới dạng ma trận $(I - \\gamma P^\\pi) V^\\pi = R^\\pi$:
$$\\begin{bmatrix}
0.91 & -0.72 & 0 \\\\
-0.09 & 1.0 & -0.09 \\\\
0 & -0.09 & 0.91
\\end{bmatrix}
\\begin{bmatrix} V(s_1) \\\\ V(s_2) \\\\ V(s_3) \\end{bmatrix} =
\\begin{bmatrix} 1 \\\\ 2 \\\\ 0 \\end{bmatrix}$$
Giải hệ phương trình cho ra nghiệm giải tích:
$$V(s_1) \\approx 2.904, \\quad V(s_2) \\approx 2.282, \\quad V(s_3) \\approx 0.226 \\quad \\blacksquare$$`}
            />
          </div>

          {/* Module 10 (from IOAI 2024 Ethics) */}
          <div className="rounded-2xl border border-pink-500/30 bg-card/70 backdrop-blur-md p-6 sm:p-8 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-pink-400 font-bold text-sm border-b border-border/60 pb-3">
              <BookOpen className="w-4 h-4" />
              <span>Chuyên Đề 10: 7 Tình Huống Đạo Đức AI & Tiêu Chí Đánh Giá Chuẩn Quốc Tế IOAI (IOAI 2024)</span>
            </div>
            <MarkdownMath
              content={`### 1. Phân Tích Các Tình Huống Đạo Đức Trọng Điểm
1. **The Biased Job Applicant (Thiên lệch tuyển dụng):**
   - *Vấn đề:* Dữ liệu lịch sử mang định kiến kinh tế - xã hội.
   - *Giải pháp IOAI:* Phải kết hợp cả việc hiệu chỉnh thuật toán (de-biasing algorithms) và thu thập tập dữ liệu đa dạng mới, đồng thời cân nhắc chi phí và tính nhất quán lịch sử.
2. **The Ethical Self-Driving Car (Xe tự hành khẩn cấp):**
   - *Vấn đề:* Va chạm không thể tránh khỏi giữa người già và trẻ nhỏ.
   - *Giải pháp IOAI:* Xe tự hành bắt buộc phải tuân thủ bộ nguyên tắc đạo đức lập trình sẵn nhằm **cực tiểu hóa tổng mức độ nguy hại (minimizing overall harm)** thay vì tự ý phân biệt đối xử theo độ tuổi hay chọn ngẫu nhiên.
3. **The Surveillance Dilemma (Giám sát đô thị):**
   - *Vấn đề:* Camera AI nhận diện khuôn mặt thiên lệch vào một số nhóm chủng tộc.
   - *Giải pháp IOAI:* Thành phố cần kết hợp giám sát độc lập (independent oversight) và sửa đổi thuật toán để cân bằng giữa an ninh và quyền công dân.
4. **The Transparent Algorithm & Fair Use Copyright:**
   - Cân bằng giữa bảo vệ tài sản sở hữu trí tuệ của doanh nghiệp và kiểm toán độc lập (independent audits) để đảm bảo thuật toán không thao túng quan điểm chính trị.
   - Với bản quyền huấn luyện AI: Cần đàm phán cấp phép sử dụng dữ liệu với chủ sở hữu nội dung và phát triển hệ thống ghi nhận công lao tác giả (creator attribution).`}
            />
          </div>
        </div>
      )}
    </div>
  );
}
