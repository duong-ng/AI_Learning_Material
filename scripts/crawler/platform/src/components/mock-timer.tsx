"use client";

import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, Timer, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";

interface MockTimerProps {
  initialMinutes?: number;
  title?: string;
  onFinish?: () => void;
}

export function MockTimer({
  initialMinutes = 120, // Mặc định 2 tiếng cho thi Olympic
  title = "Đồng hồ Giả lập Thời gian Thi Olympic",
  onFinish
}: MockTimerProps) {
  const [totalSeconds, setTotalSeconds] = useState(initialMinutes * 60);
  const [remainingSeconds, setRemainingSeconds] = useState(initialMinutes * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isActive && remainingSeconds > 0) {
      interval = setInterval(() => {
        setRemainingSeconds((prev) => {
          if (prev <= 1) {
            setIsActive(false);
            if (onFinish) onFinish();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (remainingSeconds === 0) {
      setIsActive(false);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, remainingSeconds, onFinish]);

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = (mins: number) => {
    setIsActive(false);
    setTotalSeconds(mins * 60);
    setRemainingSeconds(mins * 60);
  };

  const hours = Math.floor(remainingSeconds / 3600);
  const minutes = Math.floor((remainingSeconds % 3600) / 60);
  const seconds = remainingSeconds % 60;

  const formatNum = (n: number) => String(n).padStart(2, "0");

  const progressPercent = ((totalSeconds - remainingSeconds) / totalSeconds) * 100;
  const isUrgent = remainingSeconds < 300 && remainingSeconds > 0; // dưới 5 phút

  return (
    <div className="rounded-xl border border-border/80 bg-card/60 backdrop-blur-md p-4 shadow-lg">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Timer className={`w-5 h-5 ${isUrgent ? "text-rose-500 animate-pulse" : "text-indigo-400"}`} />
          <span className="font-semibold text-sm text-foreground">{title}</span>
        </div>
        <div className="flex gap-1.5">
          <button
            onClick={() => resetTimer(30)}
            className="text-xs px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
          >
            30p
          </button>
          <button
            onClick={() => resetTimer(120)}
            className="text-xs px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
          >
            2h
          </button>
          <button
            onClick={() => resetTimer(300)}
            className="text-xs px-2 py-0.5 rounded bg-muted hover:bg-muted/80 text-muted-foreground transition-colors"
          >
            5h (IOAI)
          </button>
        </div>
      </div>

      {/* Clock display */}
      <div className="flex items-center justify-between bg-background/80 rounded-lg p-3 border border-border/50">
        <div className="font-mono text-3xl font-black tracking-wider text-foreground">
          {formatNum(hours)}:{formatNum(minutes)}:{formatNum(seconds)}
        </div>

        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant={isActive ? "secondary" : "default"}
            onClick={toggleTimer}
            className="gap-1.5 h-8 px-3"
          >
            {isActive ? (
              <>
                <Pause className="w-3.5 h-3.5" />
                <span>Tạm dừng</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Bắt đầu</span>
              </>
            )}
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => resetTimer(totalSeconds / 60)}
            className="h-8 w-8 p-0"
            title="Thiết lập lại"
          >
            <RotateCcw className="w-3.5 h-3.5 text-muted-foreground" />
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-muted/60 rounded-full h-1.5 mt-3 overflow-hidden">
        <div
          className={`h-full transition-all duration-1000 ${
            isUrgent ? "bg-rose-500" : "bg-gradient-to-r from-blue-500 to-indigo-500"
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {isUrgent && (
        <div className="flex items-center gap-1.5 mt-2 text-rose-400 text-xs font-medium">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Thời gian sắp hết! Hãy hoàn thiện code và kiểm tra kết quả test!</span>
        </div>
      )}
    </div>
  );
}
