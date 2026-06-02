"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const skills = [
  "Python", "Flask", "FastAPI", "Next.js", "React", "SQL",
  "MySQL", "MongoDB", "Machine Learning", "Generative AI",
  "LangGraph", "Scikit-learn", "Pandas", "Git", "Docker",
  "IBM Cloud", "REST APIs", "CI/CD", "R", "NoSQL",
];

const tagAccents = ["var(--accent)", "var(--accent2)", "var(--warm)"];

const stats = [
  { num: 2, suffix: "+", label: "Internships", color: "var(--accent)", glow: "rgba(192,132,252,0.45)" },
  { num: 5, suffix: "+", label: "Projects", color: "var(--accent2)", glow: "rgba(34,211,238,0.45)" },
  { num: 12, suffix: "+", label: "APIs Built", color: "var(--warm)", glow: "rgba(244,114,182,0.45)" },
  { num: 2, suffix: "×", label: "IBM Certs", color: "var(--accent)", glow: "rgba(192,132,252,0.45)" },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [counted, setCounted] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", onEnter: () => setCounted(true) },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(".about-header",
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(".about-bio",
          { x: -90, opacity: 0, rotation: -2, scale: 0.97 },
          { x: 0, opacity: 1, rotation: 0, scale: 1, duration: 1.1 },
          "-=0.25"
        )
        .fromTo(".about-stat",
          { y: 60, opacity: 0, scale: 0.88 },
          { y: 0, opacity: 1, scale: 1, stagger: 0.09, duration: 0.75, ease: "back.out(1.7)" },
          "-=0.65"
        )
        .fromTo(".about-skills",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.7 },
          "-=0.4"
        );
      }, sectionRef);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="about" ref={sectionRef} style={{ padding: "100px 40px", position: "relative", overflow: "hidden" }}>
      {/* Section watermark */}
      <div aria-hidden="true" style={{
        position: "absolute", top: -10, right: -15,
        fontSize: "clamp(130px, 21vw, 260px)",
        fontFamily: "'Syne', sans-serif", fontWeight: 800,
        color: "rgba(255,255,255,0.018)", letterSpacing: "-0.04em",
        userSelect: "none", pointerEvents: "none", lineHeight: 1, whiteSpace: "nowrap",
      }}>ABOUT</div>
      <div className="about-header" style={{ marginBottom: 56, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color: "var(--accent)", fontSize: 11, opacity: 0.6 }}>$</span>
        <span style={{ color: "var(--muted)", fontSize: 11 }}>cat</span>
        <span style={{ color: "var(--accent)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textShadow: "0 0 8px var(--accent)" }}>
          <ScrambleText text="./about_me.txt" />
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--border-bright), transparent)" }} />
        <span style={{ color: "var(--muted)", fontSize: 10 }}>00</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "3fr 2fr", gap: 2 }}>
        {/* Bio card */}
        <div className="about-bio" style={{
          borderTop: "2px solid var(--accent)",
          borderRight: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          borderLeft: "1px solid var(--border)",
          padding: "40px",
          position: "relative",
          background: "rgba(11, 4, 33, 0.6)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}>
          <div style={{ position: "absolute", top: 16, right: 20, fontSize: 9, color: "var(--muted)", letterSpacing: "0.1em" }}>
            about_me.txt • 3 lines
          </div>
          <p style={{ fontFamily: "'DM Mono', monospace", fontSize: "clamp(15px, 1.8vw, 22px)", lineHeight: 1.7, color: "var(--text)", marginBottom: 28 }}>
            <span style={{ color: "var(--accent)" }}>// </span>
            Final-year CS student @ SRM University.<br />
            Specialising in <span style={{ color: "var(--accent2)", textShadow: "0 0 8px rgba(34,211,238,0.5)" }}>Data Science & AI</span>.
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
              boxShadow: "0 0 8px rgba(192,132,252,0.2)",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(192,132,252,0.5)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 8px rgba(192,132,252,0.2)"; }}
            >[send_message]</a>
            <a href="https://github.com/Pragya314" target="_blank" rel="noopener noreferrer" style={{
              padding: "9px 22px", border: "1px solid var(--border)",
              color: "var(--muted)", textDecoration: "none", fontSize: 11,
              letterSpacing: "0.08em", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent2)"; e.currentTarget.style.color = "var(--accent2)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(34,211,238,0.2)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.boxShadow = "none"; }}
            >[github_↗]</a>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {/* Stats — each with unique accent color */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {stats.map((s, i) => (
              <div key={i} className="about-stat" style={{
                borderTop: `2px solid ${s.color}`,
                borderRight: "1px solid var(--border)",
                borderBottom: "1px solid var(--border)",
                borderLeft: "1px solid var(--border)",
                padding: "24px 20px",
                background: "rgba(11, 4, 33, 0.6)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}>
                <div style={{
                  fontFamily: "'DM Mono', monospace", fontSize: 44, fontWeight: 700,
                  lineHeight: 1, color: s.color, textShadow: `0 0 20px ${s.glow}`,
                }}>
                  <CountUp target={s.num} suffix={s.suffix} trigger={counted} />
                </div>
                <div style={{ fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted)", marginTop: 6 }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          {/* Skills — cycling hover colors via CSS custom props */}
          <div className="about-skills" style={{
            border: "1px solid var(--border)", padding: "20px", flex: 1,
            background: "rgba(11, 4, 33, 0.6)",
            backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
          }}>
            <div style={{ fontSize: 9, color: "var(--muted)", marginBottom: 14, letterSpacing: "0.1em" }}>$ ls ./skills/</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {skills.map((s, i) => (
                <span
                  key={s}
                  className="skill-tag"
                  style={{
                    "--tag-color": tagAccents[i % 3],
                    fontSize: 10, color: "var(--muted)",
                    border: "1px solid var(--border)",
                    padding: "3px 10px",
                    fontFamily: "'DM Mono', monospace",
                    transition: "all 0.2s", cursor: "default",
                  } as React.CSSProperties}
                >{s}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .skill-tag:hover {
          border-color: var(--tag-color) !important;
          color: var(--tag-color) !important;
          box-shadow: 0 0 8px var(--tag-color);
        }
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
