"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import ParticleField from "./ParticleField";

const statusItems = [
  { label: "SYS_OK", color: "var(--accent)" },
  { label: "NET_OK", color: "var(--accent2)" },
  { label: "MEM_OK", color: "var(--warm)" },
  { label: "GPU_OK", color: "var(--accent)" },
];

export default function Hero({ ready, onTerminalOpen }: { ready: boolean; onTerminalOpen: () => void }) {
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

  // Combined mouse + scroll parallax
  useEffect(() => {
    const mouse = { x: 0, y: 0 };

    const apply = () => {
      const { x: mx, y: my } = mouse;
      const sy = window.scrollY;
      // Orbs: scroll Y + mouse XY
      if (orb1Ref.current) gsap.to(orb1Ref.current, { x: mx * 35, y: sy * 0.28 + my * 25, duration: 1.5, ease: "power2.out", overwrite: "auto" });
      if (orb2Ref.current) gsap.to(orb2Ref.current, { x: mx * -28, y: -sy * 0.18 + my * -18, duration: 1.5, ease: "power2.out", overwrite: "auto" });
      // Grid drifts opposite to mouse
      gsap.to(".hero-grid", { x: mx * -10, y: my * -8, duration: 2, ease: "power2.out", overwrite: "auto" });
      // Text content drifts slightly with mouse
      gsap.to(".hero-text-content", { x: mx * 8, y: my * 6, duration: 1.2, ease: "power2.out", overwrite: "auto" });
      // Photo moves more, keeps 100px right offset
      gsap.to(".hero-photo-frame", { x: mx * 18 , y: my * 12, duration: 1, ease: "power2.out", overwrite: "auto" });
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
      apply();
    };
    const onScroll = () => apply();

    window.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
    };
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
      {/* Particle network */}
      <ParticleField />

      {/* Grid — parallax layer */}
      <div className="hero-grid" style={{
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

      <div style={{
        maxWidth: 1200, width: "100%",
        display: "flex", alignItems: "center",
        justifyContent: "space-between", gap: 60,
      }}>
        {/* Left — text content, parallax layer */}
        <div className="hero-text-content" style={{ flex: 1, minWidth: 0 }}>
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

          <h1
            className={`hero-name${nameGlitching ? " hero-name-glitch" : ""}`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px, 9vw, 140px)",
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

          <div style={{
            marginLeft: "clamp(20px, 8vw, 140px)", marginTop: 14,
            fontFamily: "'DM Mono', monospace",
            fontSize: "clamp(12px, 1.6vw, 20px)",
            letterSpacing: "0.15em", textTransform: "uppercase",
            opacity: ready ? 1 : 0, transition: "opacity 0.6s 0.3s",
          }}>
            <span style={{ color: "var(--accent)", textShadow: "0 0 14px rgba(192,132,252,0.55)" }}>
              AI_ENGINEER
            </span>
            <span style={{ color: "var(--muted)", margin: "0 16px" }}>{"//"}</span>
            <span style={{ color: "var(--accent2)", textShadow: "0 0 14px rgba(34,211,238,0.55)" }}>
              FULL_STACK_DEV
            </span>
          </div>

          <div style={{
            display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
            gap: 0, marginTop: 60, borderTop: "1px solid var(--border)",
          }}>
            {[
              { label: "STATUS", value: "OPEN TO WORK", highlight: true },
              { label: "LOCATION", value: "DELHI, IN", highlight: false },
              { label: "SPECIALIZATION", value: "GEN_AI / FULL_STACK / NLP", highlight: false },
            ].map((item, i) => (
              <div key={i} className="hero-meta-line" style={{
                padding: "20px 0",
                borderRight: i < 2 ? "1px solid var(--border)" : "none",
                paddingRight: i < 2 ? 24 : 0,
                paddingLeft: i > 0 ? 24 : 0,
                opacity: 0,
              }}>
                <div style={{ fontSize: 9, letterSpacing: "0.2em", color: "var(--muted)", marginBottom: 8, textTransform: "uppercase" }}>
                  {"//"} {item.label}
                </div>
                <div style={{
                  fontSize: "clamp(11px, 1.2vw, 16px)", fontWeight: 700,
                  color: item.highlight ? "var(--accent)" : "var(--text)",
                  textShadow: item.highlight ? "0 0 10px var(--accent)" : "none",
                  letterSpacing: "0.05em",
                  whiteSpace: "nowrap",
                }}>
                  {item.highlight && (
                    <span style={{ marginRight: 8, animation: "pulse-glow 2s ease-in-out infinite" }}>●</span>
                  )}
                  {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Terminal CTA */}
          <button
            onClick={onTerminalOpen}
            style={{
              marginTop: 32, display: "flex", alignItems: "center", gap: 12,
              background: "rgba(11,4,33,0.65)",
              backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
              border: "1px solid var(--border)",
              borderLeft: "3px solid var(--accent2)",
              padding: "13px 22px",
              cursor: "none", width: "fit-content",
              transition: "all 0.25s",
              boxShadow: "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)",
              opacity: ready ? 1 : 0,
              transform: ready ? "none" : "translateY(10px)",
            }}
            onMouseEnter={e => {
              e.currentTarget.style.borderLeftColor = "var(--accent2)";
              e.currentTarget.style.boxShadow = "0 4px 28px rgba(0,0,0,0.4), 0 0 16px rgba(34,211,238,0.15), inset 0 1px 0 rgba(255,255,255,0.06)";
              e.currentTarget.style.background = "rgba(22,10,56,0.75)";
            }}
            onMouseLeave={e => {
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.04)";
              e.currentTarget.style.background = "rgba(11,4,33,0.65)";
            }}
          >
            <span style={{ color: "var(--accent2)", fontSize: 11, opacity: 0.7 }}>$</span>
            <span style={{ fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)", letterSpacing: "0.06em" }}>
              ./interactive_terminal.sh
            </span>
            <span style={{
              display: "inline-block", width: 7, height: 14,
              background: "var(--accent2)", marginLeft: 2,
              animation: "blink 1s step-end infinite",
              boxShadow: "0 0 6px var(--accent2)",
            }} />
            <span style={{
              marginLeft: 12, fontSize: 9, color: "var(--muted)",
              letterSpacing: "0.1em", opacity: 0.6,
              fontFamily: "'DM Mono', monospace",
              borderLeft: "1px solid var(--border)", paddingLeft: 12,
            }}>
              click or press `
            </span>
          </button>
        </div>

        {/* Right — 3D orbital photo frame, parallax layer */}
        <div className="hero-photo-frame" style={{ flexShrink: 0, position: "relative", width: 300, height: 300 }}>
          {/* Orbital ring 1 — wide, nearly horizontal, purple */}
          <div style={{
            position: "absolute", inset: -28,
            borderRadius: "50%",
            border: "1px solid rgba(192,132,252,0.55)",
            boxShadow: "0 0 14px rgba(192,132,252,0.22)",
            animation: "orbit-1 10s linear infinite",
          }} />
          {/* Orbital ring 2 — diagonal, cyan, counter-rotates */}
          <div style={{
            position: "absolute", inset: -16,
            borderRadius: "50%",
            border: "1px solid rgba(34,211,238,0.45)",
            boxShadow: "0 0 10px rgba(34,211,238,0.18)",
            animation: "orbit-2 16s linear infinite",
          }} />
          {/* Orbital ring 3 — tight, warm pink */}
          <div style={{
            position: "absolute", inset: -7,
            borderRadius: "50%",
            border: "1px solid rgba(244,114,182,0.38)",
            animation: "orbit-3 7s linear infinite",
          }} />

          {/* Ambient glow behind photo */}
          <div style={{
            position: "absolute", inset: -60,
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(192,132,252,0.14) 0%, rgba(34,211,238,0.06) 50%, transparent 70%)",
            pointerEvents: "none",
          }} />

          {/* Clean circular photo — no effects */}
          <div style={{
            width: "100%", height: "100%",
            borderRadius: "50%", overflow: "hidden",
            border: "2px solid rgba(192,132,252,0.45)",
            boxShadow: "0 0 32px rgba(192,132,252,0.2), 0 0 64px rgba(34,211,238,0.08)",
            position: "relative", zIndex: 2,
            background: "var(--surface2)",
          }}>
            {/* Replace /profile.jpg with your photo */}
            <img
              src="/profile.jpg"
              alt="Pragya Jha"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                display: "block",
              }}
              onError={e => { (e.target as HTMLImageElement).style.opacity = "0"; }}
            />
          </div>
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

      <style>{`
        @media (max-width: 900px) {
          #hero { padding: 100px 20px 60px !important; }
          #hero > div[style*="space-between"] { flex-direction: column-reverse !important; gap: 40px !important; }
          #hero > div[style*="space-between"] > div:last-child { width: 220px !important; height: 220px !important; }
        }
      `}</style>
    </section>
  );
}
