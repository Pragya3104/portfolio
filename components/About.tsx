"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Python", "Flask", "FastAPI", "Next.js", "React", "SQL",
  "MySQL", "MongoDB", "Machine Learning", "Generative AI",
  "LangGraph", "Scikit-learn", "Pandas", "Git", "Docker",
  "IBM Cloud", "REST APIs", "CI/CD", "R", "NoSQL",
];

const stats = [
  { num: 2, suffix: "+", label: "Internships" },
  { num: 5, suffix: "+", label: "Projects" },
  { num: 12, suffix: "+", label: "APIs Built" },
  { num: 2, suffix: "×", label: "IBM Certs" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.fromTo(".about-block",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out",
            scrollTrigger: { trigger: "#about", start: "top 80%", onEnter: () => setCounted(true) } }
        );
      }, sectionRef);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding: "100px 40px" }}>
      <div style={{ marginBottom: 56, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color: "var(--accent)", fontSize: 11, opacity: 0.6 }}>$</span>
        <span style={{ color: "var(--muted)", fontSize: 11 }}>cat</span>
        <span style={{ color: "var(--accent)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textShadow: "0 0 8px var(--accent)" }}>./about_me.txt</span>
        <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        <span style={{ color: "var(--muted)", fontSize: 10 }}>00</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 2 }}>
        <div className="about-block" style={{
          border: "1px solid var(--border)", padding: "40px",
          position: "relative", background: "var(--surface)",
        }}>
          <div style={{ position: "absolute", top: 16, right: 20, fontSize: 9, color: "var(--muted)", letterSpacing: "0.1em" }}>
            about_me.txt • 3 lines
          </div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(15px, 1.8vw, 22px)", lineHeight: 1.7, color: "var(--text)", marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>// </span>
            Final-year CS student @ SRM University.<br />
            Specialising in <span style={{ color: "var(--accent2)", textShadow: "0 0 8px var(--accent2)" }}>Data Science & AI</span>.
          </p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "var(--muted)", lineHeight: 1.9, marginBottom: 20 }}>
            Shipped production AI systems at Infosys Springboard, Edunet Foundation, and Xyronix Labs. From multi-turn LLM agents to full-stack analytics dashboards tracking 1,000+ study sessions.
          </p>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, color: "var(--muted)", lineHeight: 1.9 }}>
            I care about systems that work at scale — clean APIs, reproducible pipelines, and code that future-you won&apos;t hate.
          </p>
          <div style={{ marginTop: 36, display: "flex", gap: 12 }}>
            <a href="mailto:pragyajha314@gmail.com" style={{
              padding: "9px 22px", border: "1px solid var(--accent)",
              color: "var(--accent)", textDecoration: "none", fontSize: 11,
              letterSpacing: "0.08em", transition: "all 0.2s",
              boxShadow: "0 0 8px rgba(191,95,255,0.2)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(191,95,255,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 8px rgba(191,95,255,0.2)"; }}
            >[send_message]</a>
            <a href="https://github.com/Pragya314" target="_blank" rel="noopener noreferrer" style={{
              padding: "9px 22px", border: "1px solid var(--border)",
              color: "var(--muted)", textDecoration: "none", fontSize: 11,
              letterSpacing: "0.08em", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent2)"; e.currentTarget.style.color = "var(--accent2)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
            >[github_↗]</a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <div className="about-block" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {stats.map((s, i) => (
              <div key={i} style={{ border: "1px solid var(--border)", padding: "24px 20px", background: "var(--surface)" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 44, fontWeight: 700, lineHeight: 1, color: "var(--accent)", textShadow: "0 0 20px rgba(191,95,255,0.5)" }}>
                  <CountUp target={s.num} suffix={s.suffix} trigger={counted} />
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginTop: 6 }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div className="about-block" style={{ border: "1px solid var(--border)", padding: "20px", background: "var(--surface)", flex: 1 }}>
            <div style={{ fontSize: 9, color: "var(--muted)", marginBottom: 14, letterSpacing: "0.1em" }}>$ ls ./skills/</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {skills.map(s => (
                <span key={s} style={{
                  fontSize: 10, color: "var(--muted)", border: "1px solid var(--border)",
                  padding: "3px 10px", fontFamily: "'DM Mono', monospace", transition: "all 0.2s", cursor: "default",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 6px rgba(191,95,255,0.35)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.boxShadow = "none"; }}
                >{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 900px) {
          #about { padding: 80px 20px !important; }
          #about > div > div[style*="3fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function CountUp({ target, suffix, trigger }: { target: number; suffix: string; trigger: boolean }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    const start = performance.now();
    const frame = (now: number) => {
      const p = Math.min((now - start) / 1000, 1);
      setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [trigger, target]);
  return <>{val}<span style={{ color: "var(--muted)", fontSize: "0.6em" }}>{suffix}</span></>;
}
