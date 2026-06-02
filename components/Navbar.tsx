"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMagnetic } from "./useMagnetic";

const links = [
  { label: "~/about", href: "#about" },
  { label: "~/work", href: "#work" },
  { label: "~/services", href: "#services" },
  { label: "~/contact", href: "#contact" },
];

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [time, setTime] = useState("");
  const hireMeRef = useMagnetic<HTMLAnchorElement>(0.35);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.3 }
    );
  }, []);

  return (
    <>
      <nav ref={navRef} style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: "16px 40px",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        borderBottom: `1px solid ${scrolled ? "var(--border-bright)" : "var(--border)"}`,
        background: scrolled ? "rgba(4,0,14,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        transition: "all 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ color: "var(--muted)", fontSize: 11, letterSpacing: "0.08em" }}>root@portfolio:~$</span>
          <a href="#" style={{
            fontFamily: "'DM Mono', monospace", fontSize: 16, fontWeight: 700,
            color: "var(--accent)", textDecoration: "none",
            animation: "glow-pulse 3s ease-in-out infinite",
          }}>pragya_jha</a>
          <span style={{
            display: "inline-block", width: 10, height: 16,
            background: "var(--accent)", animation: "blink 1s step-end infinite",
            boxShadow: "0 0 8px var(--accent)",
          }} />
        </div>

        {/* Desktop links */}
        <ul className="nav-links" style={{ display: "flex", gap: 32, listStyle: "none", alignItems: "center" }}>
          {links.map((l, i) => (
            <li key={l.label}>
              <a href={l.href} style={{
                color: "var(--muted)", textDecoration: "none",
                fontSize: 11, letterSpacing: "0.08em", transition: "all 0.2s",
              }}
                onMouseEnter={e => {
                  const accent = i % 2 === 0 ? "var(--accent)" : "var(--accent2)";
                  e.currentTarget.style.color = accent;
                  e.currentTarget.style.textShadow = `0 0 8px ${accent}`;
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.color = "var(--muted)";
                  e.currentTarget.style.textShadow = "none";
                }}
              >
                <span style={{ color: i % 2 === 0 ? "var(--accent)" : "var(--accent2)", opacity: 0.5 }}>
                  {String(i).padStart(2, "0")}.
                </span>{" "}
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a ref={hireMeRef} href="mailto:pragyajha314@gmail.com" style={{
              display: "inline-block",
              padding: "7px 18px",
              border: "1px solid var(--accent)",
              color: "var(--accent)", fontSize: 11,
              textDecoration: "none", transition: "all 0.2s",
              background: "transparent",
              boxShadow: "0 0 8px rgba(192,132,252,0.2), inset 0 0 8px rgba(192,132,252,0.05)",
              letterSpacing: "0.08em",
            }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "var(--accent)";
                e.currentTarget.style.color = "var(--bg)";
                e.currentTarget.style.boxShadow = "0 0 24px rgba(192,132,252,0.55)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--accent)";
                e.currentTarget.style.boxShadow = "0 0 8px rgba(192,132,252,0.2), inset 0 0 8px rgba(192,132,252,0.05)";
              }}
            >[hire_me]</a>
          </li>
        </ul>

        <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", minWidth: 80, textAlign: "right" }}>
          {time}
        </div>

        {/* Hamburger — mobile only */}
        <button
          className="nav-hamburger"
          onClick={() => setMenuOpen(true)}
          style={{
            display: "none", background: "none", border: "none",
            color: "var(--accent)", cursor: "none", fontSize: 20, padding: 4,
          }}
        >☰</button>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(4,0,14,0.97)", zIndex: 200,
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 36,
        }}>
          <button onClick={() => setMenuOpen(false)} style={{
            position: "absolute", top: 20, right: 24,
            background: "none", border: "none", color: "var(--accent)", fontSize: 20, cursor: "none",
          }}>✕</button>
          {links.map((l, i) => (
            <a key={l.label} href={l.href} onClick={() => setMenuOpen(false)} style={{
              fontFamily: "'DM Mono', monospace", fontSize: 28, fontWeight: 700,
              color: i % 2 === 0 ? "var(--accent)" : "var(--accent2)",
              textDecoration: "none",
              textShadow: `0 0 16px ${i % 2 === 0 ? "var(--accent)" : "var(--accent2)"}`,
            }}>{l.label}</a>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
