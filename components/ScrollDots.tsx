"use client";
import { useEffect, useState } from "react";

const SECTIONS = [
  { id: "hero",       label: "HOME"       },
  { id: "about",      label: "ABOUT"      },
  { id: "experience", label: "EXPERIENCE" },
  { id: "work",       label: "WORK"       },
  { id: "services",   label: "SERVICES"   },
  { id: "contact",    label: "CONTACT"    },
];

export default function ScrollDots() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.scrollY + window.innerHeight * 0.45;
      let current = "hero";
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= mid) current = s.id;
      }
      setActive(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="scroll-dots-nav" style={{
      position: "fixed", right: 24, top: "50%",
      transform: "translateY(-50%)",
      zIndex: 500,
      display: "flex", flexDirection: "column", gap: 16,
      alignItems: "center",
    }}>
      <style>{`
        @media (max-width: 768px) { .scroll-dots-nav { display: none !important; } }
      `}</style>
      {SECTIONS.map(s => {
        const isActive = active === s.id;
        return (
          <div key={s.id} style={{ position: "relative", display: "flex", alignItems: "center" }}>
            {/* Label tooltip */}
            {hovered === s.id && (
              <div style={{
                position: "absolute", right: 22,
                fontFamily: "'DM Mono', monospace", fontSize: 9,
                letterSpacing: "0.12em", textTransform: "uppercase",
                color: "var(--accent)", whiteSpace: "nowrap",
                background: "rgba(4,0,14,0.9)",
                border: "1px solid var(--border)",
                padding: "3px 8px",
                boxShadow: "0 0 8px rgba(192,132,252,0.2)",
                pointerEvents: "none",
              }}>{s.label}</div>
            )}

            {/* Dot */}
            <a
              href={`#${s.id}`}
              onMouseEnter={() => setHovered(s.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "block",
                width: isActive ? 10 : 7,
                height: isActive ? 10 : 7,
                background: isActive ? "var(--accent)" : "transparent",
                border: `1px solid ${isActive ? "var(--accent)" : "var(--muted)"}`,
                transform: "rotate(45deg)",
                transition: "all 0.3s",
                boxShadow: isActive ? "0 0 10px var(--accent)" : "none",
                opacity: isActive ? 1 : 0.5,
                textDecoration: "none",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
