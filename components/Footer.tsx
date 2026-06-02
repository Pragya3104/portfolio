"use client";
import { useState, useEffect } from "react";

export default function Footer() {
  const [uptime, setUptime] = useState(0);
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => setUptime(Math.floor((Date.now() - start) / 1000)), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer style={{
      padding: "20px 40px",
      borderTop: "1px solid var(--border-bright)",
      display: "flex", justifyContent: "space-between", alignItems: "center",
      flexWrap: "wrap", gap: 12,
      background: "var(--surface)",
      fontFamily: "'DM Mono', monospace",
    }}>
      <div style={{ fontSize: 10, color: "var(--muted)" }}>
        © 2026 <span style={{ color: "var(--accent)" }}>pragya_jha</span> · built with next.js + gsap
      </div>
      <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", gap: 24 }}>
        <span style={{ color: "var(--accent)", fontSize: 12, letterSpacing: "0.1em", textShadow: "0 0 8px var(--accent)" }}>YOU MADE IT THIS FAR!</span>
        <span style={{
              color: "var(--accent2)",
              textShadow: "0 0 40px rgba(34,211,238,0.45), 0 0 80px rgba(34,211,238,0.15)",
              display: "block",
            }}>AMAZE! AMAZE! AMAZE!</span>
      </div>
      <a href="#hero" style={{
        fontSize: 10, letterSpacing: "0.1em",
        color: "var(--muted)", textDecoration: "none", transition: "all 0.2s",
      }}
        onMouseEnter={e => { e.currentTarget.style.color = "var(--accent2)"; e.currentTarget.style.textShadow = "0 0 6px var(--accent2)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.textShadow = "none"; }}
      >[scroll_to_top ↑]</a>
    </footer>
  );
}
