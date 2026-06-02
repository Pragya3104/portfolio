"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";
import { useCallback } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    id: "01", status: "SHIPPED",
    title: "Emotion-Aware Wellness Chatbot",
    desc: "NLP-driven chatbot using BERT/RoBERTa to classify user sentiment across 5+ categories. Groq LLM for context-aware responses — <300ms latency across 1,000+ interactions.",
    tech: ["Python", "Hugging Face", "Groq LLM", "BERT"],
    year: "2026", github: "https://github.com/Pragya3104/EmoWellbeing.git",
    accent: "var(--accent)", glow: "rgba(192,132,252,0.18)",
  },
  {
    id: "02", status: "SHIPPED",
    title: "Student Analytics Platform",
    desc: "Full-stack platform tracking 1,000+ study sessions. K-Means clustering on 5+ behavioural features. 12+ REST APIs for auth, analytics, and admin workflows.",
    tech: ["FastAPI", "Next.js", "K-Means", "Pandas"],
    year: "2025", github: "https://github.com/tarun0714/Study-Track-AI-based-Student-Study-Habit-Recommender---Infosys.git",
    accent: "var(--accent2)", glow: "rgba(34,211,238,0.15)",
  },
  {
    id: "03", status: "SHIPPED",
    title: "LLM Travel Planning Agent",
    desc: "Conversational AI agent with LangGraph orchestration + ReAct architecture. 500+ multi-turn interactions, 3+ external API integrations, <400ms latency.",
    tech: ["IBM watsonx.ai", "LangGraph", "Granite-3-3-8B"],
    year: "2025", github: "https://github.com/Pragya3104/Travel_ai_agent.git",
    accent: "var(--warm)", glow: "rgba(244,114,182,0.15)",
  },
  {
    id: "04", status: "COMPLETE",
    title: "Exoplanet Data Analysis",
    desc: "EDA pipeline on 10,000+ NASA records. Multi-dimensional plots, habitability zone mapping, time-series analysis on exoplanet discovery patterns.",
    tech: ["Python", "Pandas", "Matplotlib", "Seaborn"],
    year: "2025", github: "https://github.com/Pragya3104/Exoplanet-Exploratory-Analysis.git",
    accent: "var(--accent)", glow: "rgba(192,132,252,0.18)",
  },
];

type Project = typeof projects[0];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  const closeModal = useCallback(() => setSelected(null), []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(".work-header",
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(".work-card-main .project-card",
          { x: -100, opacity: 0, rotation: -3, scale: 0.96 },
          { x: 0, opacity: 1, rotation: 0, scale: 1, duration: 1.1 },
          "-=0.25"
        )
        .fromTo(".work-card-stack .project-card",
          { x: 100, opacity: 0, rotation: 3, scale: 0.96 },
          { x: 0, opacity: 1, rotation: 0, scale: 1, stagger: 0.15, duration: 0.9 },
          "-=0.75"
        )
        .fromTo(".work-card-wide .project-card",
          { y: 90, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 1 },
          "-=0.5"
        );
      }, sectionRef);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="work" ref={sectionRef} style={{ padding: "100px 40px", position: "relative", overflow: "hidden" }}>
      <div aria-hidden="true" style={{
        position: "absolute", top: -10, right: -15,
        fontSize: "clamp(130px, 21vw, 260px)",
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        color: "rgba(255,255,255,0.018)", letterSpacing: "-0.04em",
        userSelect: "none", pointerEvents: "none", lineHeight: 1, whiteSpace: "nowrap",
      }}>WORK</div>
      <div className="work-header" style={{ marginBottom: 56, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color: "var(--accent)", fontSize: 11, opacity: 0.6 }}>$</span>
        <span style={{ color: "var(--muted)", fontSize: 11 }}>ls -la</span>
        <span style={{ color: "var(--accent)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textShadow: "0 0 8px var(--accent)" }}>
          <ScrambleText text="./projects/" />
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--border-bright), transparent)" }} />
        <span style={{ color: "var(--muted)", fontSize: 10 }}>01</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <div className="work-card-main">
          <ProjectCard project={projects[0]} big onOpen={setSelected} />
        </div>
        <div className="work-card-stack" style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <ProjectCard project={projects[1]} onOpen={setSelected} />
          <ProjectCard project={projects[2]} onOpen={setSelected} />
        </div>
        <div className="work-card-wide" style={{ gridColumn: "1 / -1" }}>
          <ProjectCard project={projects[3]} wide onOpen={setSelected} />
        </div>
      </div>

      {selected && <ProjectModal project={selected} onClose={closeModal} />}

      <style>{`
        @media (max-width: 900px) {
          #work { padding: 80px 20px !important; }
          #work .work-card-main,
          #work .work-card-stack,
          #work .work-card-wide { grid-column: 1 !important; }
        }
      `}</style>
    </section>
  );
}

function ProjectModal({ project: p, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 9000,
        background: "rgba(4,0,14,0.88)", backdropFilter: "blur(8px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 24, animation: "fadeIn 0.2s ease",
      }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(640px, 100%)", maxHeight: "80vh", overflowY: "auto",
          border: `1px solid ${p.accent}`,
          borderTop: `3px solid ${p.accent}`,
          background: "rgba(4,0,14,0.97)",
          boxShadow: `0 32px 80px rgba(0,0,0,0.8), 0 0 40px ${p.glow}`,
          animation: "slideUp 0.3s cubic-bezier(0.16,1,0.3,1)",
          padding: "36px 40px",
          fontFamily: "'DM Mono', monospace",
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 9, color: "var(--muted)" }}>{p.id}</span>
            <span style={{ fontSize: 9, padding: "2px 8px", border: `1px solid ${p.accent}`, color: p.accent, boxShadow: `0 0 6px ${p.glow}` }}>{p.status}</span>
            <span style={{ fontSize: 9, color: "var(--muted)" }}>{p.year}</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "var(--muted)", cursor: "none", fontSize: 16, lineHeight: 1 }}>✕</button>
        </div>

        <h2 style={{ fontSize: "clamp(20px,3vw,28px)", fontWeight: 700, color: p.accent, textShadow: `0 0 16px ${p.accent}`, marginBottom: 20, lineHeight: 1.3, letterSpacing: "-0.02em" }}>
          {p.title}
        </h2>

        <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.9, marginBottom: 28 }}>{p.desc}</p>

        {/* Tech */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.12em", marginBottom: 10 }}>// TECH STACK</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {p.tech.map(t => (
              <span key={t} style={{ fontSize: 10, color: p.accent, border: `1px solid ${p.accent}40`, padding: "3px 10px", letterSpacing: "0.08em", textTransform: "uppercase" }}>{t}</span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, borderTop: "1px solid var(--border)", paddingTop: 24 }}>
          <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
            padding: "9px 22px", border: `1px solid ${p.accent}`,
            color: p.accent, textDecoration: "none", fontSize: 11,
            letterSpacing: "0.08em", transition: "all 0.2s",
            boxShadow: `0 0 8px ${p.glow}`,
          }}>[view_on_github ↗]</a>
        </div>
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(24px); opacity: 0; } to { transform: none; opacity: 1; } }
      `}</style>
    </div>
  );
}

function ProjectCard({ project: p, big, wide, onOpen }: { project: Project; big?: boolean; wide?: boolean; onOpen: (p: Project) => void }) {
  const [hovered, setHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    gsap.to(el, {
      rotateY: x * 7,
      rotateX: -y * 5,
      transformPerspective: 900,
      duration: 0.25,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const onLeave = () => {
    setHovered(false);
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  };

  return (
    <div
      ref={cardRef}
      className="project-card"
      style={{
        borderTop: `1px solid ${hovered ? p.accent : "var(--border)"}`,
        borderRight: `1px solid ${hovered ? p.accent : "var(--border)"}`,
        borderBottom: `1px solid ${hovered ? p.accent : "var(--border)"}`,
        borderLeft: `3px solid ${p.accent}`,
        padding: big ? "40px" : wide ? "28px 40px" : "28px",
        background: hovered ? "rgba(22, 10, 56, 0.75)" : "rgba(11, 4, 33, 0.55)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        position: "relative", overflow: "hidden", transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
        boxShadow: hovered
          ? `0 12px 48px rgba(0,0,0,0.55), 0 0 36px ${p.glow}, inset 0 1px 0 rgba(255,255,255,0.09)`
          : "0 4px 28px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.05)",
        display: wide ? "grid" : "flex",
        gridTemplateColumns: wide ? "1fr 2fr auto" : undefined,
        flexDirection: wide ? undefined : "column",
        gap: wide ? 40 : undefined,
        alignItems: wide ? "center" : undefined,
        minHeight: big ? 360 : undefined,
        justifyContent: wide ? undefined : "space-between",
        transformStyle: "preserve-3d",
      }}
      onClick={() => onOpen(p)}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {hovered && (
        <div style={{
          position: "absolute", top: 0, right: 0, width: 160, height: 160,
          background: `radial-gradient(circle at top right, ${p.glow.replace("0.18", "0.22").replace("0.15", "0.22")}, transparent 70%)`,
          pointerEvents: "none",
        }} />
      )}

      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: big ? 24 : 16 }}>
          <span style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.1em" }}>{p.id}</span>
          <span style={{
            fontSize: 9, letterSpacing: "0.12em", padding: "2px 8px",
            border: `1px solid ${p.accent}`, color: p.accent, boxShadow: `0 0 6px ${p.glow}`,
          }}>{p.status}</span>
          <span style={{ fontSize: 9, color: "var(--muted)" }}>{p.year}</span>
        </div>
        <h3 style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: big ? "clamp(18px,2vw,26px)" : 16,
          fontWeight: 700, letterSpacing: "-0.02em",
          color: hovered ? p.accent : "var(--text)",
          textShadow: hovered ? `0 0 12px ${p.accent}` : "none",
          marginBottom: 12, transition: "all 0.25s", lineHeight: 1.3,
        }}>{p.title}</h3>
        {!wide && <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8, fontFamily: "'DM Mono', monospace" }}>{p.desc}</p>}
      </div>

      {wide && <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8, fontFamily: "'DM Mono', monospace" }}>{p.desc}</p>}

      <div style={{
        display: "flex", alignItems: wide ? "center" : "flex-end",
        justifyContent: "space-between", marginTop: wide ? 0 : 24,
        flexWrap: "wrap", gap: 12,
      }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.tech.map(t => (
            <span key={t} style={{
              fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase",
              color: "var(--muted)", border: "1px solid var(--border)",
              padding: "2px 8px", fontFamily: "'DM Mono', monospace",
            }}>{t}</span>
          ))}
        </div>
        <a href={p.github} target="_blank" rel="noopener noreferrer" style={{
          fontSize: 11, color: hovered ? p.accent : "var(--muted)",
          textDecoration: "none", letterSpacing: "0.08em",
          transition: "all 0.2s", whiteSpace: "nowrap",
          textShadow: hovered ? `0 0 8px ${p.accent}` : "none",
        }}>[view_↗]</a>
      </div>
    </div>
  );
}
