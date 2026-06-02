"use client";
import { useEffect, useState } from "react";

const bootLines = [
  "BIOS v2.4.1 ... OK",
  "Loading kernel modules ...",
  "Initializing neural interface ...",
  "Mounting /dev/pragya_jha ...",
  "Loading portfolio.exe ...",
  "✓ All systems operational",
];

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [fading, setFading] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setVisibleLines(i);
      if (i >= bootLines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setFading(true);
          setTimeout(() => {
            setDone(true);
            onComplete();
          }, 900);
        }, 700);
      }
    }, 210);
    return () => clearInterval(interval);
  }, [onComplete]);

  if (done) return null;

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 10000,
      background: "var(--bg)",
      display: "flex", alignItems: "center", justifyContent: "center",
      opacity: fading ? 0 : 1,
      transition: "opacity 0.9s cubic-bezier(0.4, 0, 0.2, 1)",
      pointerEvents: fading ? "none" : "all",
    }}>
      {/* Grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: "60px 60px", opacity: 0.45,
      }} />

      {/* Glow orbs */}
      <div style={{
        position: "absolute", top: "15%", right: "15%",
        width: 600, height: 600,
        background: "radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 65%)",
        borderRadius: "50%",
      }} />
      <div style={{
        position: "absolute", bottom: "10%", left: "10%",
        width: 500, height: 500,
        background: "radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 65%)",
        borderRadius: "50%",
      }} />

      <div style={{
        fontFamily: "'DM Mono', monospace",
        fontSize: 13, lineHeight: 2.4,
        maxWidth: 560, width: "100%",
        padding: "0 40px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ color: "var(--accent)", marginBottom: 36, fontSize: 11, opacity: 0.75, lineHeight: 1.6 }}>
          ┌─────────────────────────────────────────┐<br />
          │   PORTFOLIO OS v1.0 — BOOT SEQUENCE     │<br />
          └─────────────────────────────────────────┘
        </div>

        {bootLines.slice(0, visibleLines).map((line, i) => (
          <div key={i} style={{
            color: i === bootLines.length - 1 ? "var(--accent2)"
              : i === visibleLines - 1 ? "var(--accent)"
              : "var(--muted)",
            display: "flex", alignItems: "center", gap: 12,
          }}>
            <span style={{
              color: i === bootLines.length - 1 ? "var(--accent2)" : "var(--accent)",
              opacity: 0.6,
            }}>&gt;</span>
            {line}
          </div>
        ))}

        {visibleLines < bootLines.length && (
          <span style={{
            display: "inline-block", width: 10, height: 16,
            background: "var(--accent)", marginLeft: 24,
            animation: "blink 0.8s step-end infinite",
            boxShadow: "0 0 8px var(--accent)",
          }} />
        )}
      </div>
    </div>
  );
}
