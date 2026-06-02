"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useMagnetic } from "./useMagnetic";

const links = [
  { label: "~/about",      href: "#about"      },
  { label: "~/experience", href: "#experience" },
  { label: "~/work",       href: "#work"       },
  { label: "~/services",   href: "#services"   },
  { label: "~/contact",    href: "#contact"    },
];

const SECTION_COLORS: Record<string, string> = {
  hero:     "var(--accent)",
  about:    "var(--accent2)",
  work:     "var(--accent)",
  services: "var(--warm)",
  contact:  "var(--accent2)",
};

export default function Navbar({ onTerminalOpen }: { onTerminalOpen: () => void }) {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled]       = useState(false);
  const [menuOpen, setMenuOpen]       = useState(false);
  const [time, setTime]               = useState("");
  const [activeSection, setActiveSection] = useState("hero");
  const hireMeRef = useMagnetic<HTMLAnchorElement>(0.35);

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString("en-GB"));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      const sections = ["hero", "about", "experience", "work", "services", "contact"];
      const mid = window.scrollY + window.innerHeight * 0.45;
      let current = "hero";
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= mid) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 1, ease: "expo.out", delay: 0.3 }
    );
  }, []);

  const accentColor = SECTION_COLORS[activeSection] || "var(--accent)";

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
            color: accentColor, textDecoration: "none",
            transition: "color 0.4s",
            animation: "glow-pulse 3s ease-in-out infinite",
          }}>pragya_jha</a>
        </div>

        {/* Desktop links */}
        <ul className="nav-links" style={{ display: "flex", gap: 28, listStyle: "none", alignItems: "center" }}>
          {links.map((l, i) => {
            const sectionId = l.href.slice(1);
            const isActive  = activeSection === sectionId;
            const linkAccent = i % 2 === 0 ? "var(--accent)" : "var(--accent2)";
            return (
              <li key={l.label}>
                <a href={l.href} style={{
                  color: isActive ? linkAccent : "var(--muted)",
                  textDecoration: "none", fontSize: 11,
                  letterSpacing: "0.08em", transition: "all 0.25s",
                  textShadow: isActive ? `0 0 8px ${linkAccent}` : "none",
                }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = linkAccent;
                    e.currentTarget.style.textShadow = `0 0 8px ${linkAccent}`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = isActive ? linkAccent : "var(--muted)";
                    e.currentTarget.style.textShadow = isActive ? `0 0 8px ${linkAccent}` : "none";
                  }}
                >
                  <span style={{ color: linkAccent, opacity: isActive ? 1 : 0.5, transition: "opacity 0.25s" }}>
                    {String(i).padStart(2, "0")}.
                  </span>{" "}
                  {l.label}
                </a>
              </li>
            );
          })}

          {/* Resume download */}
          <li>
            <a href="/Pragya_Jha_Resume.pdf" download style={{
              color: "var(--muted)", fontSize: 11, textDecoration: "none",
              letterSpacing: "0.08em", transition: "all 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.color = "var(--accent2)"; e.currentTarget.style.textShadow = "0 0 8px var(--accent2)"; }}
              onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.textShadow = "none"; }}
            >[resume.pdf]</a>
          </li>

          <li>
            <a ref={hireMeRef} href="mailto:pragyajha314@gmail.com" style={{
              display: "inline-block", padding: "7px 18px",
              border: "1px solid var(--accent)", color: "var(--accent)", fontSize: 11,
              textDecoration: "none", transition: "all 0.2s", background: "transparent",
              boxShadow: "0 0 8px rgba(192,132,252,0.2), inset 0 0 8px rgba(192,132,252,0.05)",
              letterSpacing: "0.08em",
            }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.boxShadow = "0 0 24px rgba(192,132,252,0.55)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 8px rgba(192,132,252,0.2), inset 0 0 8px rgba(192,132,252,0.05)"; }}
            >[hire_me]</a>
          </li>
        </ul>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div style={{ fontSize: 10, color: "var(--muted)", letterSpacing: "0.1em", minWidth: 72, textAlign: "right" }}>
            Time: {time}
          </div>
        </div>

        <button className="nav-hamburger" onClick={() => setMenuOpen(true)} style={{
          display: "flex", background: "none", border: "none",
          color: "var(--accent)", cursor: "none", fontSize: 20, padding: 4,
        }}>☰</button>
      </nav>

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
