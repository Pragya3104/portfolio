"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const COMMANDS: Record<string, string[]> = {
  help: [
    "┌──────────────────────────────────────────────┐",
    "│  Available commands:                         │",
    "│                                              │",
    "│  whoami    — about pragya                    │",
    "│  skills    — technical skills                │",
    "│  projects  — project list                    │",
    "│  contact   — contact information             │",
    "│  date      — current date & time             │",
    "│  clear     — clear terminal output           │",
    "│  exit / q  — close terminal                  │",
    "└──────────────────────────────────────────────┘",
  ],
  whoami: [
    "PRAGYA JHA",
    "──────────────────────────────────────",
    "Role     : AI & Full Stack Developer",
    "Status   : ● Available for work",
    "Location : Haryana, India",
    "Education: Final-year CS @ SRM University",
    "",
    "Shipped production AI at Infosys, Edunet, Xyronix.",
    "Building at the intersection of ML and software.",
  ],
  skills: [
    "TECHNICAL SKILLS",
    "──────────────────────────────────────",
    "Languages  : Python · JavaScript · TypeScript · R · SQL",
    "Frameworks : FastAPI · Flask · Next.js · React",
    "AI/ML      : Scikit-learn · HuggingFace · LangGraph",
    "LLMs       : Groq · IBM watsonx.ai · Granite-3",
    "Databases  : PostgreSQL · MongoDB · MySQL",
    "DevOps     : Docker · IBM Cloud · CI/CD · Git",
  ],
  projects: [
    "PROJECTS",
    "──────────────────────────────────────",
    "[01] Emotion-Aware Wellness Chatbot   DEPLOYED",
    "     BERT/RoBERTa · Groq LLM · <300ms latency",
    "",
    "[02] Student Analytics Platform      SHIPPED",
    "     FastAPI · Next.js · K-Means · 12+ APIs",
    "",
    "[03] LLM Travel Planning Agent       SHIPPED",
    "     LangGraph · IBM watsonx.ai · ReAct arch",
    "",
    "[04] Exoplanet Data Analysis         COMPLETE",
    "     10K+ NASA records · EDA pipeline",
  ],
  contact: [
    "CONTACT INFORMATION",
    "──────────────────────────────────────",
    "Email    : pragyajha314@gmail.com",
    "GitHub   : github.com/Pragya314",
    "LinkedIn : linkedin.com/in/pragya-jha-a6b328250",
    "Phone    : +91 8700019478",
    "",
    "Status   : ● OPEN TO INTERNSHIPS / FREELANCE / COLLABS",
  ],
};

interface Line { type: "input" | "output" | "error"; text: string }

export default function Terminal({ onClose }: { onClose: () => void }) {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: "Welcome to pragya-jha terminal. Type 'help' for available commands." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [histIdx, setHistIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);
  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [lines]);

  const run = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [{ type: "input", text: cmd }];

    if (!trimmed) {
      setLines(l => [...l, ...newLines]);
      return;
    }

    if (trimmed === "clear") {
      setLines([]);
      return;
    }

    if (trimmed === "exit" || trimmed === "q" || trimmed === "close") {
      onClose();
      return;
    }

    if (trimmed === "date") {
      newLines.push({ type: "output", text: new Date().toString() });
    } else if (COMMANDS[trimmed]) {
      COMMANDS[trimmed].forEach(t => newLines.push({ type: "output", text: t }));
    } else if (trimmed.startsWith("echo ")) {
      newLines.push({ type: "output", text: trimmed.slice(5) });
    } else {
      newLines.push({ type: "error", text: `bash: ${trimmed}: command not found. Type 'help'.` });
    }

    setLines(l => [...l, ...newLines]);
    setHistory(h => [cmd, ...h.filter(x => x !== cmd)].slice(0, 50));
    setHistIdx(-1);
  }, [onClose]);

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      run(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const idx = Math.min(histIdx + 1, history.length - 1);
      setHistIdx(idx);
      setInput(history[idx] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const idx = Math.max(histIdx - 1, -1);
      setHistIdx(idx);
      setInput(idx === -1 ? "" : history[idx]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9500,
        background: "rgba(4,0,14,0.85)",
        backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(680px, 94vw)",
          maxHeight: "70vh",
          border: "1px solid rgba(192,132,252,0.4)",
          background: "rgba(4,0,14,0.96)",
          boxShadow: "0 24px 80px rgba(0,0,0,0.8), 0 0 40px rgba(192,132,252,0.15)",
          display: "flex", flexDirection: "column",
          animation: "slideUp 0.25s cubic-bezier(0.16,1,0.3,1)",
        }}
      >
        {/* Title bar */}
        <div style={{
          padding: "10px 16px",
          borderBottom: "1px solid rgba(192,132,252,0.2)",
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(11,4,33,0.8)",
          userSelect: "none",
        }}>
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#28c840" }} />
          <span style={{
            marginLeft: "auto", marginRight: "auto",
            fontFamily: "'DM Mono', monospace", fontSize: 11,
            color: "rgba(157,135,191,0.7)", letterSpacing: "0.08em",
          }}>visitor@pragya-jha — bash — 80×24</span>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", color: "var(--muted)", cursor: "none", fontSize: 14, lineHeight: 1 }}
          >✕</button>
        </div>

        {/* Output */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "16px",
          fontFamily: "'DM Mono', monospace", fontSize: 12, lineHeight: 1.9,
        }}>
          {lines.map((l, i) => (
            <div key={i} style={{
              color: l.type === "input" ? "var(--text)"
                : l.type === "error" ? "var(--warm)"
                : "var(--muted)",
              display: "flex", gap: 8,
            }}>
              {l.type === "input" && (
                <span style={{ color: "var(--accent)", flexShrink: 0 }}>
                  <span style={{ color: "var(--accent2)" }}>visitor</span>@pragya:~$
                </span>
              )}
              <span style={{ whiteSpace: "pre" }}>{l.text}</span>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{
          borderTop: "1px solid rgba(192,132,252,0.15)",
          padding: "10px 16px",
          display: "flex", alignItems: "center", gap: 8,
          fontFamily: "'DM Mono', monospace", fontSize: 12,
        }}>
          <span style={{ color: "var(--accent)", flexShrink: 0, whiteSpace: "nowrap" }}>
            <span style={{ color: "var(--accent2)" }}>visitor</span>@pragya:~$
          </span>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            style={{
              flex: 1, background: "transparent", border: "none", outline: "none",
              fontFamily: "'DM Mono', monospace", fontSize: 12,
              color: "var(--text)", caretColor: "var(--accent)",
            }}
            autoComplete="off" spellCheck={false}
          />
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
