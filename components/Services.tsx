"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
  { cmd: "run ai_ml_engineering.py", name: "AI & ML Engineering", desc: "End-to-end ML pipelines — preprocessing, training, deployment. NLP, classification, clustering. Reproducible, scalable, production-ready.", tools: ["Python", "Scikit-learn", "Hugging Face", "Groq", "Pandas"], accent: "var(--accent)" },
  { cmd: "serve backend_apis --prod", name: "Backend & API Dev", desc: "Scalable REST APIs with FastAPI and Flask. 12+ production APIs shipped covering auth, analytics, and data management.", tools: ["FastAPI", "Flask", "PostgreSQL", "MongoDB", "REST"], accent: "var(--accent2)" },
  { cmd: "deploy llm_agent --stream", name: "LLM & Agentic Systems", desc: "Multi-turn conversational agents with tool-calling and memory. IBM watsonx.ai, LangGraph orchestration, ReAct architectures.", tools: ["LangGraph", "watsonx.ai", "LLM", "ReAct", "Prompting"], accent: "var(--warm)" },
];

const experience = [
  { role: "AI & Data Science Intern", company: "Infosys Springboard", period: "Oct–Dec 2025", current: true },
  { role: "AI & Cloud Intern", company: "Edunet Foundation / AICTE & IBM", period: "Jul–Aug 2025", current: false },
  { role: "SDE Intern", company: "Xyronix Labs", period: "Jan–Jul 2025", current: false },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".service-block",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: "#services", start: "top 80%" } }
        );
      }, sectionRef);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="services" ref={sectionRef} style={{ padding: "100px 40px" }}>
      <div style={{ marginBottom: 56, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color: "var(--accent)", fontSize: 11, opacity: 0.6 }}>$</span>
        <span style={{ color: "var(--muted)", fontSize: 11 }}>ps aux |</span>
        <span style={{ color: "var(--accent)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textShadow: "0 0 8px var(--accent)" }}>grep services</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span style={{ color: "var(--muted)", fontSize: 10 }}>02</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 2, marginBottom: 2 }}>
        {services.map(s => <ServiceCard key={s.name} service={s} />)}
      </div>

      <div className="service-block" style={{ border: "1px solid var(--border)", padding: "32px 40px", background: "var(--surface)", marginTop: 2 }}>
        <div style={{ fontSize: 10, color: "var(--muted)", marginBottom: 28, letterSpacing: "0.1em" }}>$ cat ./experience/timeline.log</div>
        {experience.map((e, i) => <ExperienceRow key={i} {...e} last={i === experience.length - 1} />)}
      </div>

      <style>{`
        @media (max-width: 900px) {
          #services { padding: 80px 20px !important; }
          #services > div[style*="1.2fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ServiceCard({ service: s }: { service: typeof services[0] }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="service-block" style={{
      border: `1px solid ${hovered ? s.accent : "var(--border)"}`,
      padding: "32px 28px", background: hovered ? "var(--surface2)" : "var(--surface)",
      transition: "all 0.25s", position: "relative", overflow: "hidden",
      boxShadow: hovered ? "0 0 24px rgba(191,95,255,0.08)" : "none",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: 9, color: hovered ? s.accent : "var(--muted)", letterSpacing: "0.1em", marginBottom: 20, transition: "color 0.25s" }}>$ {s.cmd}</div>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 16, fontWeight: 700, color: hovered ? s.accent : "var(--text)", textShadow: hovered ? `0 0 10px ${s.accent}` : "none", marginBottom: 14, transition: "all 0.25s" }}>{s.name}</div>
      <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.85, fontFamily: "'DM Mono', monospace", marginBottom: 24 }}>{s.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {s.tools.map(t => (
          <span key={t} style={{ fontSize: 9, color: "var(--muted)", border: "1px solid var(--border)", padding: "2px 8px", fontFamily: "'DM Mono', monospace" }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function ExperienceRow({ role, company, period, current, last }: typeof experience[0] & { last: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: "grid", gridTemplateColumns: "20px 1fr 1fr auto", gap: 20, padding: "16px 0", borderBottom: last ? "none" : "1px solid var(--border)", alignItems: "center" }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
    >
      <span style={{ color: current ? "var(--accent)" : "var(--muted)", fontSize: 10, textShadow: current ? "0 0 6px var(--accent)" : "none" }}>{current ? "▶" : "○"}</span>
      <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700, color: hovered ? "var(--accent)" : "var(--text)", transition: "all 0.2s", textShadow: hovered ? "0 0 8px var(--accent)" : "none" }}>{role}</div>
      <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'DM Mono', monospace" }}>{company}</div>
      <div style={{ fontSize: 10, color: current ? "var(--accent)" : "var(--muted)", fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em", border: current ? "1px solid rgba(191,95,255,0.3)" : "none", padding: current ? "3px 10px" : "3px 0", boxShadow: current ? "0 0 6px rgba(191,95,255,0.2)" : "none", whiteSpace: "nowrap" }}>{period}</div>
    </div>
  );
}
