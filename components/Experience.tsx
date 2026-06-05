"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    role: "AI Paper Generation Agent",
    company: "Freelance Project for International Client",
    period: "Mar 2026 – May 2026",
    current: false,
    accent: "var(--warm)",
    glow: "rgba(244,114,182,0.18)",
    tech: ["Python", "GPT-4.1 MINI",  "REACT",   "FASTAPI",  "REST APIs", "Azure"],
    bullets: [
      "Built an end-to-end AI paper generation system using GPT-4.1 Mini and React + FastAPI, producing fully structured 50-page question papers in under 2 clicks.",
      "Engineered prompt pipelines to generate syllabus-aligned, multi-subject papers with configurable difficulty levels and consistent formatting.",
      "Delivered a production-ready full-stack product solo for an international client, handling requirements, iteration, and handoff end-to-end.",
    ],
  },
  {
    role: "AI & Data Science Intern",
    company: "Infosys Springboard",
    period: "Oct 2025 – Dec 2025",
    current: false,
    accent: "var(--accent)",
    glow: "rgba(192,132,252,0.18)",
    tech: ["FastAPI", "Next.js", "K-Means", "Scikit-learn", "Pandas", "Python"],
    bullets: [
      "Developed a full-stack student analytics platform using FastAPI and Next.js, enabling tracking of 1,000+ study sessions and delivering personalised performance insights.",
      "Created multiple REST APIs for managing study sessions, student data, OTP-based authentication, and admin analytics workflows.",
      "Built an ML pipeline using K-Means clustering (K=3) on 5+ behavioural features to segment students into performance categories, improving identification of at-risk students.",
      "Designed a rule-based recommendation engine with 10+ decision rules, producing actionable insights to improve study efficiency and reduce distractions.",
      "Deployed data processing and visualisation pipelines using Pandas, Scikit-learn, and charting tools — supporting real-time dashboards and reducing analysis time by ~30%.",
    ],
  },
  {
    role: "AI & Cloud Intern",
    company: "Edunet Foundation — AICTE & IBM SkillsBuild",
    period: "Jul 2025 – Aug 2025",
    current: false,
    accent: "var(--accent2)",
    glow: "rgba(34,211,238,0.15)",
    tech: ["IBM watsonx.ai", "LangGraph", "LLM Integration", "Python", "React"],
    bullets: [
      "Engineered an LLM-powered conversational AI agent using IBM watsonx.ai, implementing LangGraph-based orchestration with React architecture for reasoning and tool invocation.",
      "Integrated Granite-3-3-8B-Instruct LLM with optimised decoding parameters, enabling context-aware itinerary generation across 500+ multi-turn interactions.",
      "Built tool-augmented pipelines for travel planning by integrating multiple external APIs for itinerary generation, destination recommendations, and weather-aware adjustments.",
      "Architected a stateful multi-turn conversation system with orchestrated decision-making, improving response relevance across complex user queries across 500+ interactions.",
      "Engineered modular Python-based tool calling and workflow orchestration, enabling extensible travel planning pipelines with clean structured outputs and consistent response quality across diverse query types",
    ],
  },
  {
    role: "SDE Intern",
    company: "Xyronix Labs Pvt Ltd",
    period: "Jan 2025 – June 2025",
    current: false,
    accent: "var(--warm)",
    glow: "rgba(244,114,182,0.15)",
    tech: ["Django", "REST APIs", "OAuth2", "Python","Azure"],
    bullets: [
      "Developed and maintained multiple RESTful APIs using Django, handling authentication, data retrieval, and third-party service integration.",
      "Integrated OAuth2 authentication into cloud-based services, enabling secure third-party login for production users.",
      "Deployed APIs into live systems via CI/CD pipelines, coordinating integration with frontend and DevOps teams to validate integration and resolve blockers.",
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(".exp-header",
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(".exp-entry",
          { x: -60, opacity: 0, scale: 0.97 },
          { x: 0, opacity: 1, scale: 1, stagger: 0.18, duration: 0.9 },
          "-=0.2"
        );
      }, sectionRef);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="experience" ref={sectionRef} style={{
      padding: "100px 40px",
      position: "relative", overflow: "hidden",
    }}>
      {/* Watermark */}
      <div aria-hidden="true" style={{
        position: "absolute", top: -10, right: -15,
        fontSize: "clamp(100px, 16vw, 200px)",
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        color: "rgba(255,255,255,0.018)", letterSpacing: "-0.04em",
        userSelect: "none", pointerEvents: "none", lineHeight: 1, whiteSpace: "nowrap",
      }}>EXPERIENCE</div>

      {/* Section header */}
      <div className="exp-header" style={{ marginBottom: 64, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color: "var(--accent)", fontSize: 11, opacity: 0.6 }}>$</span>
        <span style={{ color: "var(--muted)", fontSize: 11 }}>cat</span>
        <span style={{ color: "var(--accent)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textShadow: "0 0 8px var(--accent)" }}>
          <ScrambleText text="./experience/timeline.log" />
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--border-bright), transparent)" }} />
        <span style={{ color: "var(--muted)", fontSize: 10 }}>01b</span>
      </div>

      {/* Timeline */}
      <div style={{ position: "relative", paddingLeft: 32 }}>
        {/* Vertical line */}
        <div style={{
          position: "absolute", left: 7, top: 8, bottom: 8,
          width: 1,
          background: "linear-gradient(180deg, var(--accent), var(--accent2), var(--warm))",
          opacity: 0.35,
        }} />

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {experiences.map((exp, idx) => (
            <ExperienceCard key={idx} exp={exp} last={idx === experiences.length - 1} />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #experience { padding: 80px 20px !important; }
        }
      `}</style>
    </section>
  );
}

function ExperienceCard({ exp: e, last }: { exp: typeof experiences[0]; last: boolean }) {
  return (
    <div className="exp-entry" style={{ position: "relative", paddingBottom: last ? 0 : 2 }}>
      {/* Timeline dot */}
      <div style={{
        position: "absolute", left: -28, top: 28,
        width: 14, height: 14,
        background: e.current ? e.accent : "transparent",
        border: `1px solid ${e.accent}`,
        borderRadius: 0, transform: "rotate(45deg)",
        boxShadow: e.current ? `0 0 12px ${e.accent}` : "none",
        animation: e.current ? "pulse-glow 2s ease-in-out infinite" : "none",
      }} />

      {/* Card */}
      <div style={{
        borderTop: `2px solid ${e.accent}`,
        borderRight: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        borderLeft: "1px solid var(--border)",
        padding: "28px 32px",
        background: "rgba(11,4,33,0.6)",
        backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
        boxShadow: `0 4px 28px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)`,
      }}>
        {/* Header row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 20 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
              {e.current && (
                <span style={{
                  fontSize: 9, letterSpacing: "0.12em", padding: "2px 8px",
                  border: `1px solid ${e.accent}`, color: e.accent,
                  boxShadow: `0 0 6px ${e.glow}`,
                }}>CURRENT</span>
              )}
              <span style={{ fontSize: 9, color: "var(--muted)", letterSpacing: "0.1em" }}>{e.period}</span>
            </div>
            <h3 style={{
              fontFamily: "'DM Mono', monospace", fontSize: "clamp(16px, 2vw, 20px)",
              fontWeight: 700, color: e.accent,
              textShadow: `0 0 10px ${e.accent}`,
              marginBottom: 4, letterSpacing: "-0.01em",
            }}>{e.role}</h3>
            <div style={{ fontSize: 12, color: "var(--muted)", letterSpacing: "0.04em" }}>{e.company}</div>
          </div>
        </div>

        {/* Bullet points */}
        <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px 0", display: "flex", flexDirection: "column", gap: 10 }}>
          {e.bullets.map((b, i) => (
            <li key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <span style={{ color: e.accent, flexShrink: 0, fontSize: 10, marginTop: 3, opacity: 0.7 }}>▸</span>
              <span style={{
                fontFamily: "'DM Mono', monospace", fontSize: 12,
                color: "var(--muted)", lineHeight: 1.8,
              }}>{b}</span>
            </li>
          ))}
        </ul>

        {/* Tech tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {e.tech.map(t => (
            <span key={t} style={{
              fontSize: 9, letterSpacing: "0.1em", textTransform: "uppercase",
              color: e.accent, border: `1px solid ${e.accent}40`,
              padding: "2px 10px", fontFamily: "'DM Mono', monospace",
            }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
