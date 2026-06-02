"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    cmd: "run ai_ml_engineering.py",
    name: "AI & ML Engineering",
    desc: "End-to-end ML pipelines — preprocessing, training, deployment. NLP, classification, clustering. Reproducible, scalable, production-ready.",
    tools: ["Python", "Scikit-learn", "Hugging Face", "Groq", "Pandas"],
    accent: "var(--accent)", glow: "rgba(192,132,252,0.18)",
  },
  {
    cmd: "serve backend_apis --prod",
    name: "Backend & API Dev",
    desc: "Scalable REST APIs with FastAPI and Flask. 12+ production APIs shipped covering auth, analytics, and data management.",
    tools: ["FastAPI", "Flask", "PostgreSQL", "MongoDB", "REST"],
    accent: "var(--accent2)", glow: "rgba(34,211,238,0.15)",
  },
  {
    cmd: "deploy llm_agent --stream",
    name: "LLM & Agentic Systems",
    desc: "Multi-turn conversational agents with tool-calling and memory. IBM watsonx.ai, LangGraph orchestration, ReAct architectures.",
    tools: ["LangGraph", "watsonx.ai", "LLM", "ReAct", "Prompting"],
    accent: "var(--warm)", glow: "rgba(244,114,182,0.15)",
  },
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
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(".services-header",
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(".service-card",
          { y: 70, opacity: 0, rotation: 2, scale: 0.95 },
          { y: 0, opacity: 1, rotation: 0, scale: 1, stagger: 0.14, duration: 0.9, ease: "back.out(1.4)" },
          "-=0.2"
        )
        .fromTo(".experience-row",
          { x: 60, opacity: 0 },
          { x: 0, opacity: 1, stagger: 0.1, duration: 0.7 },
          "-=0.4"
        );
      }, sectionRef);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="services" ref={sectionRef} style={{ padding: "100px 40px" }}>
      <div className="services-header" style={{ marginBottom: 56, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color: "var(--accent)", fontSize: 11, opacity: 0.6 }}>$</span>
        <span style={{ color: "var(--muted)", fontSize: 11 }}>ps aux |</span>
        <span style={{ color: "var(--accent)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textShadow: "0 0 8px var(--accent)" }}>
          <ScrambleText text="grep services" />
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--border-bright), transparent)" }} />
        <span style={{ color: "var(--muted)", fontSize: 10 }}>02</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr 1fr", gap: 2, marginBottom: 2 }}>
        {services.map(s => <ServiceCard key={s.name} service={s} />)}
      </div>

      {/* Experience timeline */}
      <div className="service-block" style={{
        border: "1px solid var(--border)",
        borderTop: "2px solid var(--accent2)",
        padding: "32px 40px",
        background: "var(--surface)",
        marginTop: 2,
      }}>
        <div style={{ fontSize: 10, color: "var(--accent2)", marginBottom: 28, letterSpacing: "0.1em" }}>$ cat ./experience/timeline.log</div>
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
  const cardRef = useRef<HTMLDivElement>(null);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    gsap.to(el, {
      rotateY: x * 8, rotateX: -y * 6,
      transformPerspective: 900, duration: 0.25,
      ease: "power2.out", overwrite: "auto",
    });
  };

  const onLeave = () => {
    setHovered(false);
    gsap.to(cardRef.current, {
      rotateY: 0, rotateX: 0,
      duration: 0.7, ease: "elastic.out(1, 0.4)", overwrite: "auto",
    });
  };

  return (
    <div ref={cardRef} className="service-card" style={{
      border: `1px solid ${hovered ? s.accent : "var(--border)"}`,
      borderTop: `2px solid ${s.accent}`,
      padding: "32px 28px",
      background: hovered ? "var(--surface2)" : "var(--surface)",
      transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
      position: "relative", overflow: "hidden",
      boxShadow: hovered ? `0 0 28px ${s.glow}` : "none",
      transformStyle: "preserve-3d",
    }}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {hovered && (
        <div style={{
          position: "absolute", top: 0, right: 0, width: 120, height: 120,
          background: `radial-gradient(circle at top right, ${s.glow}, transparent 70%)`,
          pointerEvents: "none",
        }} />
      )}
      <div style={{ fontSize: 9, color: s.accent, letterSpacing: "0.1em", marginBottom: 20 }}>$ {s.cmd}</div>
      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: 16, fontWeight: 700,
        color: hovered ? s.accent : "var(--text)",
        textShadow: hovered ? `0 0 10px ${s.accent}` : "none",
        marginBottom: 14, transition: "all 0.25s",
      }}>{s.name}</div>
      <p style={{ fontSize: 12, color: "var(--muted)", lineHeight: 1.85, fontFamily: "'DM Mono', monospace", marginBottom: 24 }}>{s.desc}</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {s.tools.map(t => (
          <span key={t} style={{
            fontSize: 9, color: "var(--muted)", border: "1px solid var(--border)",
            padding: "2px 8px", fontFamily: "'DM Mono', monospace",
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function ExperienceRow({ role, company, period, current, last }: typeof experience[0] & { last: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="experience-row"
      style={{
        display: "grid", gridTemplateColumns: "20px 1fr 1fr auto", gap: 20,
        padding: "18px 0",
        borderBottom: last ? "none" : "1px solid var(--border)",
        alignItems: "center",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span style={{
        color: current ? "var(--accent2)" : "var(--muted)", fontSize: 10,
        textShadow: current ? "0 0 8px var(--accent2)" : "none",
        animation: current ? "pulse-glow 2s ease-in-out infinite" : "none",
      }}>
        {current ? "▶" : "○"}
      </span>
      <div style={{
        fontFamily: "'DM Mono', monospace", fontSize: 14, fontWeight: 700,
        color: hovered ? "var(--accent)" : "var(--text)",
        transition: "all 0.2s",
        textShadow: hovered ? "0 0 8px var(--accent)" : "none",
      }}>{role}</div>
      <div style={{ fontSize: 12, color: "var(--muted)", fontFamily: "'DM Mono', monospace" }}>{company}</div>
      <div style={{
        fontSize: 10,
        color: current ? "var(--accent2)" : "var(--muted)",
        fontFamily: "'DM Mono', monospace", letterSpacing: "0.08em",
        border: current ? "1px solid rgba(34,211,238,0.35)" : "none",
        padding: current ? "3px 10px" : "3px 0",
        boxShadow: current ? "0 0 8px rgba(34,211,238,0.2)" : "none",
        whiteSpace: "nowrap",
      }}>{period}</div>
    </div>
  );
}
