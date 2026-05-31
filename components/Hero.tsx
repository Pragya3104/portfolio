"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const bootLines = [
  "BIOS v2.4.1 ... OK",
  "Loading kernel modules ...",
  "Initializing neural interface ...",
  "Mounting /dev/pragya_jha ...",
  "Loading portfolio.exe ...",
  "✓ All systems operational",
];

export default function Hero() {
  const [booted, setBooted] = useState(false);
  const [visibleLines, setVisibleLines] = useState(0);
  const [showMain, setShowMain] = useState(false);
  const [typedName, setTypedName] = useState("");
  const heroRef = useRef<HTMLElement>(null);
  const name = "PRAGYA JHA";

  useEffect(() => {
    let i = 0;
    const bootInterval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= bootLines.length) {
        clearInterval(bootInterval);
        setTimeout(() => { setBooted(true); setTimeout(() => setShowMain(true), 300); }, 400);
      }
    }, 220);
    return () => clearInterval(bootInterval);
  }, []);

  useEffect(() => {
    if (!showMain) return;
    let i = 0;
    const t = setInterval(() => {
      setTypedName(name.slice(0, i + 1));
      i++;
      if (i >= name.length) clearInterval(t);
    }, 80);
    return () => clearInterval(t);
  }, [showMain]);

  useEffect(() => {
    if (!showMain) return;
    const timer = setTimeout(() => {
      gsap.fromTo(".hero-meta-line",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" }
      );
    }, 1200);
    return () => clearTimeout(timer);
  }, [showMain]);

  return (
    <section ref={heroRef} id="hero" style={{
      minHeight: "100vh", padding: "120px 40px 80px",
      display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden",
    }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: "60px 60px", opacity: 0.4,
      }} />
      {/* Glow orbs */}
      <div style={{
        position: "absolute", top: "25%", right: "8%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(192,132,252,0.08) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "15%", left: "3%",
        width: 350, height: 350,
        background: "radial-gradient(circle, rgba(232,121,249,0.06) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      {!booted ? (
        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 13, lineHeight: 2, maxWidth: 600 }}>
          <div style={{ color: "var(--accent)", marginBottom: 24, fontSize: 11, opacity: 0.7 }}>
            ┌─────────────────────────────────────┐<br/>
            │  PORTFOLIO OS v1.0 — BOOT SEQUENCE  │<br/>
            └─────────────────────────────────────┘
          </div>
          {bootLines.slice(0, visibleLines).map((line, i) => (
            <div key={i} style={{ color: i === visibleLines - 1 ? "var(--accent)" : "var(--muted)", display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{ color: "var(--accent)", opacity: 0.5 }}>&gt;</span> {line}
            </div>
          ))}
          {visibleLines < bootLines.length && (
            <span style={{ display: "inline-block", width: 10, height: 16, background: "var(--accent)", marginLeft: 24, animation: "blink 0.8s step-end infinite", boxShadow: "0 0 8px var(--accent)" }} />
          )}
        </div>
      ) : (
        <div style={{ maxWidth: 1100 }}>
          <div style={{ fontSize: 12, color: "var(--muted)", marginBottom: 32, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "var(--accent)" }}>pragya@portfolio</span>
            <span style={{ opacity: 0.4 }}>:</span>
            <span style={{ color: "var(--accent2)" }}>~</span>
            <span style={{ opacity: 0.4 }}>$</span>
            <span style={{ marginLeft: 8 }}>cat about_me.txt</span>
          </div>

          <h1 style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "clamp(52px, 10vw, 160px)",
            fontWeight: 700, lineHeight: 0.88, letterSpacing: "-0.04em",
            color: "var(--accent)",
            textShadow: "0 0 40px rgba(192,132,252,0.5), 0 0 80px rgba(192,132,252,0.2)",
          }}>
            {typedName}
            <span style={{
              display: "inline-block", width: "0.08em", height: "0.85em",
              background: "var(--accent)", marginLeft: 4, verticalAlign: "middle",
              animation: "blink 1s step-end infinite",
              boxShadow: "0 0 8px var(--accent)",
            }} />
          </h1>

          <div style={{
            marginLeft: "clamp(20px, 8vw, 140px)", marginTop: 10,
            fontFamily: "'DM Mono', monospace",
            fontSize: "clamp(13px, 2vw, 26px)",
            color: "var(--accent2)",
            letterSpacing: "0.15em",
            textShadow: "0 0 12px var(--accent2)",
            textTransform: "uppercase",
          }}>
            AI_ENGINEER // FULL_STACK_DEV
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0, marginTop: 72, borderTop: "1px solid var(--border)",
          }}>
            {[
              { label: "STATUS", value: "AVAILABLE", highlight: true },
              { label: "LOCATION", value: "HARYANA, IN", highlight: false },
              { label: "SPECIALIZATION", value: "AI / ML / APIs", highlight: false },
            ].map((item, i) => (
              <div key={i} className="hero-meta-line" style={{
                padding: "24px 0",
                borderRight: i < 2 ? "1px solid var(--border)" : "none",
                paddingRight: i < 2 ? 32 : 0,
                paddingLeft: i > 0 ? 32 : 0,
                opacity: 0,
              }}>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--muted)", marginBottom: 8, textTransform: "uppercase" }}>
                  // {item.label}
                </div>
                <div style={{
                  fontSize: "clamp(12px, 1.4vw, 18px)", fontWeight: 700,
                  color: item.highlight ? "var(--accent)" : "var(--text)",
                  textShadow: item.highlight ? "0 0 10px var(--accent)" : "none",
                  letterSpacing: "0.05em",
                }}>
                  {item.highlight && <span style={{ marginRight: 8 }}>●</span>}
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div style={{ position: "absolute", top: 100, right: 40, color: "var(--border-bright)", fontSize: 10, fontFamily: "monospace", textAlign: "right", lineHeight: 1.8 }}>
        {["SYS_OK", "NET_OK", "MEM_OK", "GPU_OK"].map(s => (
          <div key={s}><span style={{ color: "var(--accent)" }}>▶</span> {s}</div>
        ))}
      </div>

      <style>{`@media (max-width: 768px) { #hero { padding: 100px 20px 60px !important; } }`}</style>
    </section>
  );
}
