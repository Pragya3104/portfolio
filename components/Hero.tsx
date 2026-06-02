"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const statusItems = [
  { label: "SYS_OK", color: "var(--accent)" },
  { label: "NET_OK", color: "var(--accent2)" },
  { label: "MEM_OK", color: "var(--warm)" },
  { label: "GPU_OK", color: "var(--accent)" },
];

export default function Hero({ ready }: { ready: boolean }) {
  const [typedName, setTypedName] = useState("");
  const [nameComplete, setNameComplete] = useState(false);
  const [nameGlitching, setNameGlitching] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const name = "PRAGYA JHA";

  // Typewriter — starts when preloader signals ready
  useEffect(() => {
    if (!ready) return;
    let i = 0;
    const t = setInterval(() => {
      setTypedName(name.slice(0, i + 1));
      i++;
      if (i >= name.length) {
        clearInterval(t);
        setNameComplete(true);
      }
    }, 80);
    return () => clearInterval(t);
  }, [ready]);

  // Meta-line GSAP fade-in
  useEffect(() => {
    if (!ready) return;
    const timer = setTimeout(() => {
      gsap.fromTo(".hero-meta-line",
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.12, duration: 0.6, ease: "power2.out" }
      );
    }, 1200);
    return () => clearTimeout(timer);
  }, [ready]);

  // Parallax on hero orbs
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      if (orb1Ref.current) gsap.set(orb1Ref.current, { y: y * 0.28 });
      if (orb2Ref.current) gsap.set(orb2Ref.current, { y: -y * 0.18 });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Periodic glitch — fires after name is complete
  useEffect(() => {
    if (!nameComplete) return;
    let alive = true;

    const loop = () => {
      if (!alive) return;
      setTimeout(() => {
        if (!alive) return;
        setNameGlitching(true);
        setTimeout(() => {
          if (!alive) return;
          setNameGlitching(false);
          loop();
        }, 560);
      }, 5000 + Math.random() * 6000);
    };

    // First glitch after 2–4s
    const init = setTimeout(loop, 2000 + Math.random() * 2000);
    return () => {
      alive = false;
      clearTimeout(init);
    };
  }, [nameComplete]);

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
        backgroundSize: "60px 60px", opacity: 0.55,
      }} />

      {/* Purple glow orb — parallax */}
      <div ref={orb1Ref} style={{
        position: "absolute", top: "8%", right: "-8%",
        width: 720, height: 720,
        background: "radial-gradient(circle, rgba(192,132,252,0.15) 0%, transparent 65%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      {/* Cyan glow orb — parallax */}
      <div ref={orb2Ref} style={{
        position: "absolute", bottom: "3%", left: "-8%",
        width: 640, height: 640,
        background: "radial-gradient(circle, rgba(34,211,238,0.11) 0%, transparent 62%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      {/* Warm orb */}
      <div style={{
        position: "absolute", top: "55%", right: "28%",
        width: 320, height: 320,
        background: "radial-gradient(circle, rgba(244,114,182,0.07) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100 }}>
        <div style={{
          fontSize: 12, color: "var(--muted)", marginBottom: 32,
          display: "flex", alignItems: "center", gap: 8,
          opacity: ready ? 1 : 0, transition: "opacity 0.4s",
        }}>
          <span style={{ color: "var(--accent)" }}>pragya@portfolio</span>
          <span style={{ opacity: 0.4 }}>:</span>
          <span style={{ color: "var(--accent2)" }}>~</span>
          <span style={{ opacity: 0.4 }}>$</span>
          <span style={{ marginLeft: 8 }}>cat about_me.txt</span>
        </div>

        {/* Gradient name with glitch class */}
        <h1
          className={`hero-name${nameGlitching ? " hero-name-glitch" : ""}`}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(52px, 10vw, 160px)",
            fontWeight: 800, lineHeight: 0.88, letterSpacing: "-0.04em",
            background: "linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            minHeight: "1.1em",
          }}
        >
          {typedName}
          {ready && (
            <span style={{
              display: "inline-block", width: "0.08em", height: "0.85em",
              background: "var(--accent)", marginLeft: 4, verticalAlign: "middle",
              animation: nameComplete ? "none" : "blink 1s step-end infinite",
              opacity: nameComplete ? 0 : 1,
              boxShadow: "0 0 8px var(--accent)",
            }} />
          )}
        </h1>

        {/* Split subtitle */}
        <div style={{
          marginLeft: "clamp(20px, 8vw, 140px)", marginTop: 14,
          fontFamily: "'DM Mono', monospace",
          fontSize: "clamp(13px, 1.8vw, 22px)",
          letterSpacing: "0.15em", textTransform: "uppercase",
          opacity: ready ? 1 : 0, transition: "opacity 0.6s 0.3s",
        }}>
          <span style={{ color: "var(--accent)", textShadow: "0 0 14px rgba(192,132,252,0.55)" }}>
            AI_ENGINEER
          </span>
          <span style={{ color: "var(--muted)", margin: "0 16px" }}>//</span>
          <span style={{ color: "var(--accent2)", textShadow: "0 0 14px rgba(34,211,238,0.55)" }}>
            FULL_STACK_DEV
          </span>
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
                {item.highlight && (
                  <span style={{ marginRight: 8, animation: "pulse-glow 2s ease-in-out infinite" }}>●</span>
                )}
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Status items */}
      <div style={{ position: "absolute", top: 100, right: 40, fontSize: 10, fontFamily: "monospace", textAlign: "right", lineHeight: 2 }}>
        {statusItems.map(s => (
          <div key={s.label} style={{ color: s.color }}>
            <span style={{ opacity: 0.5 }}>▶</span> {s.label}
          </div>
        ))}
      </div>

      <style>{`@media (max-width: 768px) { #hero { padding: 100px 20px 60px !important; } }`}</style>
    </section>
  );
}
