"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import remarkGfm from "remark-gfm";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { CodeViewer } from "./code-viewer";

interface MarkdownMathProps {
  content: string;
  className?: string;
}

function preprocessMarkdownContent(text: string): string {
  if (!text) return "";
  let processed = text;

  // 1. Normalize LaTeX delimiters
  // Normalize \[ ... \] to $$ ... $$
  processed = processed.replace(/\\\[([\s\S]*?)\\\]/g, (_, eq) => `\n$$\n${eq.trim()}\n$$\n`);
  // Normalize \( ... \) to $ ... $
  processed = processed.replace(/\\\(([\s\S]*?)\\\)/g, (_, eq) => `$${eq.trim()}$`);

  // 2. Fix multiple-choice options formatting when crammed on one line
  // e.g. "Các phương án lựa chọn: A. ... B. ... C. ... D. ..." or "A. ... B. ... C. ... D. ..."
  if (/\b[A]\.\s+[\s\S]*?\b[B]\.\s+[\s\S]*?\b[C]\.\s+[\s\S]*?\b[D]\.\s+/i.test(processed)) {
    // Format label header
    processed = processed.replace(/(Các phương án(?: lựa chọn)?:\s*)/gi, "\n\n**$1**\n\n");
    // Ensure A. starts on its own bullet line
    processed = processed.replace(/(?:^|\n|:\s*|\*\*\s*)\b([A])\.\s+/g, "\n\n- **A.** ");
    // Ensure B, C, D are separated into bullet lines
    processed = processed.replace(/\s+\b([B-D])\.\s+/g, (_, p1) => `\n- **${p1.toUpperCase()}.** `);
  }

  // 3. Fix tables when table rows are concatenated with "| |" without newlines
  // e.g. "| col1 | col2 | | :--- | :--- | | val1 | val2 |"
  processed = processed.replace(/\|\s*\|\s*/g, "|\n| ");

  // Ensure table header has an empty line before it if preceded by normal text
  processed = processed.replace(/([^\n])\n(\|[\s\S]*?\|)\n(\|[\s-:]+\|)/g, "$1\n\n$2\n$3");

  // 4. Wrap naked LaTeX formulas if whole string is LaTeX formula
  const trimmed = processed.trim();
  if (!trimmed.includes("$") && !trimmed.includes("```")) {
    if (
      trimmed.startsWith("\\") ||
      /\\(sqrt|sum|prod|frac|alpha|beta|gamma|delta|epsilon|sigma|theta|lambda|mu|pi|rho|tau|omega|nabla|int|mathbf|mathbb|mathcal|le|ge|times)/.test(trimmed) ||
      /^[A-Za-z]\^\*\(.+?\)\s*=/.test(trimmed) || // e.g. Q^*(s, a) = ...
      /^[A-Za-z]_[A-Za-z0-9]+\s*=/.test(trimmed) // e.g. d_k = ...
    ) {
      processed = `$${trimmed}$`;
    }
  }

  return processed;
}

export function MarkdownMath({ content, className = "" }: MarkdownMathProps) {
  if (!content) return null;
  const sanitizedContent = preprocessMarkdownContent(content);

  return (
    <div className={`prose prose-slate dark:prose-invert max-w-none leading-relaxed break-words ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code({ className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || "");
            const isInline = !match && !String(children).includes("\n");
            
            if (isInline) {
              return (
                <code
                  className="rounded bg-muted/80 px-1.5 py-0.5 font-mono text-xs font-semibold text-primary border border-border/40"
                  {...props}
                >
                  {children}
                </code>
              );
            }

            const language = match ? match[1] : "python";
            const codeString = String(children).replace(/\n$/, "");

            return (
              <div className="my-4 not-prose">
                <CodeViewer code={codeString} language={language} />
              </div>
            );
          },
          h1({ children }) {
            return <h1 className="text-2xl font-black tracking-tight text-foreground border-b border-border pb-2 mt-6 mb-4">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-bold tracking-tight text-foreground border-b border-border/50 pb-1.5 mt-6 mb-3">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-bold text-foreground mt-5 mb-2 text-indigo-400">{children}</h3>;
          },
          p({ children }) {
            return <p className="mb-3 text-slate-300 leading-relaxed">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc pl-6 mb-4 space-y-1.5 text-slate-300">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-6 mb-4 space-y-1.5 text-slate-300">{children}</ol>;
          },
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-indigo-500 bg-indigo-950/20 pl-4 py-2 italic text-slate-300 rounded-r my-4">
                {children}
              </blockquote>
            );
          },
          table({ children }) {
            return (
              <div className="overflow-x-auto my-5 rounded-xl border border-border/80 bg-card/60 backdrop-blur-sm shadow-lg">
                <table className="w-full text-sm text-left border-collapse">{children}</table>
              </div>
            );
          },
          thead({ children }) {
            return <thead className="bg-muted/80 text-foreground font-bold border-b border-border/80">{children}</thead>;
          },
          th({ children }) {
            return <th className="px-4 py-3 font-bold text-xs uppercase tracking-wider text-indigo-300 border-r border-border/40 last:border-r-0">{children}</th>;
          },
          td({ children }) {
            return <td className="px-4 py-2.5 border-b border-border/40 border-r border-border/40 last:border-r-0 text-slate-300 align-top leading-relaxed">{children}</td>;
          },
          tr({ children }) {
            return <tr className="hover:bg-muted/40 transition-colors odd:bg-transparent even:bg-muted/15">{children}</tr>;
          }
        }}
      >
        {sanitizedContent}
      </ReactMarkdown>
    </div>
  );
}
