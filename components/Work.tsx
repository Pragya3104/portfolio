"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const projects = [
  { id: "01", status: "DEPLOYED", title: "Emotion-Aware Wellness Chatbot", desc: "NLP-driven chatbot using BERT/RoBERTa to classify user sentiment across 5+ categories. Groq LLM for context-aware responses — <300ms latency across 1,000+ interactions.", tech: ["Python", "Hugging Face", "Groq LLM", "BERT"], year: "2026", github: "https://github.com/Pragya314", accent: "var(--accent)" },
  { id: "02", status: "SHIPPED", title: "Student Analytics Platform", desc: "Full-stack platform tracking 1,000+ study sessions. K-Means clustering on 5+ behavioural features. 12+ REST APIs for auth, analytics, and admin workflows.", tech: ["FastAPI", "Next.js", "K-Means", "Pandas"], year: "2025", github: "https://github.com/Pragya314", accent: "var(--accent2)" },
  { id: "03", status: "SHIPPED", title: "LLM Travel Planning Agent", desc: "Conversational AI agent with LangGraph orchestration + ReAct architecture. 500+ multi-turn interactions, 3+ external API integrations, <400ms latency.", tech: ["IBM watsonx.ai", "LangGraph", "Granite-3-3-8B"], year: "2025", github: "https://github.com/Pragya314", accent: "var(--warm)" },
  { id: "04", status: "COMPLETE", title: "Exoplanet Data Analysis", desc: "EDA pipeline on 10,000+ NASA records. Multi-dimensional plots, habitability zone mapping, time-series analysis on exoplanet discovery patterns.", tech: ["Python", "Pandas", "Matplotlib", "Seaborn"], year: "2025", github: "https://github.com/Pragya314", accent: "var(--accent)" },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".project-card",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: "#work", start: "top 80%" } }
        );
      }, sectionRef);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="work" ref={sectionRef} style={{ padding: "100px 40px" }}>
      <div style={{ marginBottom: 56, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color: "var(--accent)", fontSize: 11, opacity: 0.6 }}>$</span>
        <span style={{ color: "var(--muted)", fontSize: 11 }}>ls -la</span>
        <span style={{ color: "var(--accent)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textShadow: "0 0 8px var(--accent)" }}>./projects/</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span style={{ color: "var(--muted)", fontSize: 10 }}>01</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <ProjectCard project={projects[0]} big />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <ProjectCard project={projects[1]} />
          <ProjectCard project={projects[2]} />
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <ProjectCard project={projects[3]} wide />
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #work { padding: 80px 20px !important; }
          #work > div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
          #work > div > div[style*="grid-column"] { grid-column: 1 !important; }
        }
      `}</style>
    </section>
  );
}

function ProjectCard({ project: p, big, wide }: { project: typeof projects[0]; big?: boolean; wide?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="project-card" style={{
      border: `1px solid ${hovered ? p.accent : "var(--border)"}`,
      padding: big ? "40px" : wide ? "28px 40px" : "28px",
      background: hovered ? "var(--surface2)" : "var(--surface)",
      position: "relative", overflow: "hidden", transition: "all 0.25s",
      boxShadow: hovered ? `0 0 28px rgba(191,95,255,0.08)` : "none",
      display: wide ? "grid" : "flex",
      gridTemplateColumns: wide ? "1fr 2fr auto" : undefined,
      flexDirection: wide ? undefined : "column",
      gap: wide ? 40 : undefined,
      alignItems: wide ? "center" : undefined,
      minHeight: big ? 360 : undefined,
      justifyContent: wide ? undefined : "space-between",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {hovered && (
        <div style={{ position: "absolute", top: 0, right: 0, width: 140, height: 140, background: `radial-gradient(circle at top right, rgba(191,95,255,0.1), transparent 70%)`, pointerEvents: "none" }} />
      )}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: big ? 24 : 16 }}>
          <span style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.1em" }}>{p.id}</span>
          <span style={{ fontSize: 9, letterSpacing: "0.12em", padding: "2px 8px", border: `1px solid ${p.id === "01" ? "var(--accent)" : "var(--border)"}`, color: p.id === "01" ? "var(--accent)" : "var(--muted)", boxShadow: p.id === "01" ? "0 0 6px rgba(191,95,255,0.3)" : "none" }}>{p.status}</span>
          <span style={{ fontSize: 9, color: "var(--muted)" }}>{p.year}</span>
        </div>
        <h3 style={{ fontFamily: "'DM Mono', monospace", fontSize: big ? "clamp(18px,2vw,26px)" : 16, fontWeight: 700, letterSpacing: "-0.02em", color: hovered ? p.accent : "var(--text)", textShadow: hovered ? `0 0 10px ${p.accent}` : "none", marginBottom: 12, transition: "all 0.25s", lineHeight: 1.3 }}>{p.title}</h3>
        {!wide && <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8, fontFamily: "'DM Mono', monospace" }}>{p.desc}</p>}
      </div>
      {wide && <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.8, fontFamily: "'DM Mono', monospace" }}>{p.desc}</p>}
      <div style={{ display: "flex", alignItems: wide ? "center" : "flex-end", justifyContent: "space-between", marginTop: wide ? 0 : 24, flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {p.tech.map(t => (
            <span key={t} style={{ fontSize: 9, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--border)", padding: "2px 8px", fontFamily: "'DM Mono', monospace" }}>{t}</span>
          ))}
        </div>
        <a href={p.github} target="_blank" rel="noopener noreferrer" style={{ fontSize: 11, color: hovered ? p.accent : "var(--muted)", textDecoration: "none", letterSpacing: "0.08em", transition: "all 0.2s", whiteSpace: "nowrap", textShadow: hovered ? `0 0 8px ${p.accent}` : "none" }}>[view_↗]</a>
      </div>
    </div>
  );
}
