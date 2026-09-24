"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal } from "lucide-react";
import { Button } from "./ui/button";

interface CodeViewerProps {
  code: string;
  language?: string;
  filename?: string;
}

export function CodeViewer({ code, language = "python", filename }: CodeViewerProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Lỗi khi sao chép mã nguồn:", err);
    }
  };

  const lines = code.split("\n");

  return (
    <div className="rounded-xl border border-slate-800 bg-[#0d1117] text-slate-100 shadow-2xl overflow-hidden font-mono text-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-indigo-400" />
          <span className="text-xs font-semibold text-slate-300">
            {filename || (language === "python" ? "solution.py (PyTorch)" : language)}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleCopy}
          className="h-7 px-2.5 text-xs text-slate-300 hover:text-white hover:bg-slate-800 gap-1.5 transition-all"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 font-medium">Đã sao chép!</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Sao chép code</span>
            </>
          )}
        </Button>
      </div>

      {/* Code content with line numbers */}
      <div className="p-4 overflow-x-auto max-h-[600px] scrollbar-thin scrollbar-thumb-slate-700">
        <pre className="flex">
          {/* Line numbers */}
          <div className="select-none pr-4 text-right text-slate-600 font-mono text-xs leading-6">
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>
          {/* Actual code */}
          <code className="text-xs leading-6 text-slate-200 block whitespace-pre flex-1 font-mono">
            {code}
          </code>
        </pre>
      </div>
    </div>
  );
}
