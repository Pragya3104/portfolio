"use client";
import { useEffect, useRef, useState, useCallback } from "react";

const COMMANDS: Record<string, string[]> = {
  help: [
    "┌──────────────────────────────────────────────┐",
    "│  Available commands:                         │",
    "│                                              │",
    "│  whoami       — about pragya                 │",
    "│  skills       — technical skills              │",
    "│  projects     — project list                 │",
    "│  project <n>  — view project details (1-5)    │",
    "│  contact      — contact information           │",
    "│  date         — current date & time           │",
    "│  clear        — clear terminal output         │",
    "│  exit / q     — close terminal                │",
    "└──────────────────────────────────────────────┘",
  ],
  whoami: [
    "PRAGYA JHA",
    "──────────────────────────────────────",
    "Role     : AI & Full Stack Developer",
    "Status   : ● Available for work",
    "Location : Delhi, India",
    "Education: B.Tech CSE (Data Science & AI), SRM University",
    "",
    "Shipped production AI at Infosys, Edunet, Xyronix + freelance client in Australia.",
    "Building at the intersection of ML and software.",
  ],
  skills: [
    "TECHNICAL SKILLS",
    "──────────────────────────────────────",
    "Languages  : Python · JavaScript · TypeScript · R ",
    "Frameworks : FastAPI · Django · Next.js · React",
    "AI/ML      : Scikit-learn · HuggingFace · Seaborn · Pandas · Matplotlib ·  LangGraph",
    "LLMs       : OpenAI · Groq · IBM watsonx.ai",
    "Databases  : PostgreSQL · MongoDB · MySQL",
    "DevOps     : Docker · IBM Cloud · CI/CD · Git · Azure · Postman",
  ],
  projects: [
    "PROJECTS",
    "──────────────────────────────────────",
    "[01] AI Paper Generation System      SHIPPED   2026",
    "[02] Emotion-Aware Wellness Chatbot  SHIPPED   2025",
    "[03] Student Analytics Platform      SHIPPED   2025",
    "[04] LLM Travel Planning Agent       SHIPPED   2025",
    "[05] Exoplanet Data Analysis         RESEARCH  2025",
    "",
    "→ type 'project <n>' to view details, e.g. project 1",
  ],
  contact: [
    "CONTACT INFORMATION",
    "──────────────────────────────────────",
    "Email    : pragyajha314@gmail.com",
    "GitHub   : github.com/Pragya3104",
    "LinkedIn : linkedin.com/in/pragya-jha-a6b328250",
    "",
    "Status   : ● OPEN TO FULL-TIME / FREELANCE / COLLABS",
  ],
};

// Deep-dive content for each project. Keyed 1-5 to match the index shown in `projects`.
const PROJECT_DETAILS: Record<string, string[]> = {
  "1": [
    "[01] AI PAPER GENERATION SYSTEM                        SHIPPED",
    "──────────────────────────────────────────────────────────────",
    "Stack    : Python · GPT-4.1 Mini (OpenAI) · React · FastAPI · Azure VM · Azure SQL",
    "",
    "Problem",
    "  A test-prep client needed NAPLAN / OC / Selective-school papers",
    "  generated on demand instead of hand-built — without sacrificing",
    "  syllabus alignment or formatting consistency.",
    "",
    "What I built",
    "  · Prompt pipeline that produces fully structured 50-page papers",
    "    in under 2 clicks, with configurable subject + difficulty.",
    "  · Solved a concurrency bug in topic-tracking writes by replacing",
    "    a race-prone read-then-write with a SQL Server MERGE upsert.",
    "  · Deployed + maintained the system on an Azure free-tier VM,",
    "    including DB recreation and access-role handoffs for the client.",
    "",
    "Result",
    "  Delivered solo, end-to-end (requirements → build → handoff),",
    "  in active use generating real assessment papers for a live client.",
    "",
  ],
  "2": [
    "[02] EMOTION-AWARE WELLNESS CHATBOT                    SHIPPED",
    "──────────────────────────────────────────────────────────────",
    "Stack    : Python · FastAPI · j-hartmann/emotion-distilroberta · Groq (LLaMA 3 70B)",
    "",
    "Problem",
    "  Most mental-wellness bots respond generically. I wanted responses",
    "  to actually adapt to the user's detected emotional state, not just",
    "  their words.",
    "",
    "What I built",
    "  · Emotion classifier (distilRoBERTa) scoring 5+ emotion categories",
    "    per message, feeding context into the response prompt.",
    "  · Groq-hosted LLaMA 3 70B for low-latency generation — <300ms",
    "    across 1,000+ test interactions.",
    "  · Wrote this up as an IEEE-format research paper documenting the",
    "    architecture and evaluation.",
    "",
    "Result",
    "  Functional research prototype + a formal paper — good evidence of",
    "  taking an ML idea from notebook to documented, working system.",
    "",
    "[view_↗] github.com/Pragya3104/EmoWellbeing",
  ],
  "3": [
    "[03] STUDENT ANALYTICS PLATFORM                        SHIPPED",
    "──────────────────────────────────────────────────────────────",
    "Stack    : FastAPI · Next.js · K-Means (Scikit-learn) · Pandas",
    "",
    "Problem",
    "  Infosys Springboard needed a way to turn raw study-session logs",
    "  into actionable insight — which students were falling behind, and why.",
    "",
    "What I built",
    "  · Full-stack platform tracking 1,000+ study sessions with REST APIs",
    "    for sessions, OTP auth, and admin analytics.",
    "  · K-Means clustering (K=3) on 5+ behavioural features to segment",
    "    students into performance bands.",
    "  · A rule-based recommendation engine (10+ rules) layered on top of",
    "    the clusters to surface specific, actionable suggestions.",
    "",
    "Result",
    "  Reduced manual analysis time by ~30% and improved early identification",
    "  of at-risk students for instructors.",
    "",
    "[view_↗] github.com/tarun0714/Study-Track-AI-based-Student-Study-Habit-Recommender---Infosys",
  ],
  "4": [
    "[04] LLM TRAVEL PLANNING AGENT                         SHIPPED",
    "──────────────────────────────────────────────────────────────",
    "Stack    : IBM watsonx.ai (Granite-3-3-8B) · LangGraph · Python · React",
    "",
    "Problem",
    "  Single-turn travel bots can't handle the back-and-forth real trip",
    "  planning needs — changing dates, weather, multi-stop itineraries.",
    "",
    "What I built",
    "  · Stateful multi-turn agent using LangGraph + ReAct architecture",
    "    for orchestrated, tool-augmented reasoning.",
    "  · Integrated multiple external APIs for itinerary generation,",
    "    destination recommendations, and weather-aware re-planning.",
    "  · Tuned decoding parameters on Granite-3-3-8B for consistent,",
    "    context-aware output across 500+ multi-turn sessions.",
    "",
    "Result",
    "  Measurably improved response relevance on complex, multi-step",
    "  queries vs a single-shot baseline.",
    "",
    "[view_↗] github.com/Pragya3104/Travel_ai_agent",
  ],
  "5": [
    "[05] EXOPLANET DATA ANALYSIS                          RESEARCH",
    "──────────────────────────────────────────────────────────────",
    "Stack    : Python · Pandas · Matplotlib · Seaborn",
    "",
    "Problem",
    "  Wanted to practice EDA on a genuinely large, messy real-world",
    "  dataset rather than a cleaned-up tutorial CSV.",
    "",
    "What I built",
    "  · EDA pipeline over 10,000+ NASA exoplanet discovery records.",
    "  · Multi-dimensional plots + habitability-zone mapping to surface",
    "    patterns across discovery method, era, and planet type.",
    "  · Time-series view of discovery-rate trends over the mission's history.",
    "",
    "Result",
    "  A self-directed research piece showing comfort with large public",
    "  scientific datasets, not just framework usage.",
    "",
    "[view_↗] github.com/Pragya3104/Exoplanet-Exploratory-Analysis",
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
    } else if (
      // matches: "project 1", "project1", "cat project_01.md", "cat project1.md"
      /^project\s*0?([1-5])$/.test(trimmed) ||
      /^cat\s+project_?0?([1-5])\.md$/.test(trimmed)
    ) {
      const match = trimmed.match(/([1-5])/);
      const key = match ? match[1] : "";
      if (PROJECT_DETAILS[key]) {
        PROJECT_DETAILS[key].forEach(t => newLines.push({ type: "output", text: t }));
      }
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
        display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",
        animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        className="terminal-window"
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
        @media (max-width: 640px) {
          .terminal-window {
            width: 100% !important;
            max-height: 85vh !important;
            border-radius: 0 !important;
            align-self: flex-end !important;
          }
        }
      `}</style>
    </div>
  );
}
