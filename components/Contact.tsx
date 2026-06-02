"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrambleText from "./ScrambleText";
import { useMagnetic } from "./useMagnetic";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const links = [
  { cmd: "mail", label: "EMAIL", value: "pragyajha314@gmail.com", href: "mailto:pragyajha314@gmail.com", accent: "var(--accent)", glow: "rgba(192,132,252,0.18)" },
  { cmd: "open", label: "LINKEDIN", value: "pragya-jha-a6b328250", href: "https://linkedin.com/in/pragya-jha-a6b328250/", accent: "var(--accent2)", glow: "rgba(34,211,238,0.15)" },
  { cmd: "git", label: "GITHUB", value: "Pragya314", href: "https://github.com/Pragya314", accent: "var(--accent)", glow: "rgba(192,132,252,0.18)" },
  { cmd: "call", label: "PHONE", value: "+91 8700019478", href: "tel:+918700019478", accent: "var(--warm)", glow: "rgba(244,114,182,0.15)" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useMagnetic<HTMLAnchorElement>(0.3);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" },
          defaults: { ease: "power3.out" },
        });

        tl.fromTo(".contact-header",
          { y: -40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.6 }
        )
        .fromTo(".contact-heading",
          { scale: 0.82, opacity: 0, y: 50 },
          { scale: 1, opacity: 1, y: 0, duration: 1.1, ease: "expo.out" },
          "-=0.2"
        )
        .fromTo(".contact-el",
          { y: 55, opacity: 0, rotation: 1, scale: 0.97 },
          { y: 0, opacity: 1, rotation: 0, scale: 1, stagger: 0.09, duration: 0.8, ease: "back.out(1.5)" },
          "-=0.5"
        );
      }, sectionRef);
      return () => ctx.revert();
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="contact" ref={sectionRef} style={{
      padding: "100px 40px 80px",
      borderTop: "1px solid var(--border)",
    }}>
      <div className="contact-header" style={{ marginBottom: 56, display: "flex", alignItems: "center", gap: 16 }}>
        <span style={{ color: "var(--accent)", fontSize: 11, opacity: 0.6 }}>$</span>
        <span style={{ color: "var(--muted)", fontSize: 11 }}>init</span>
        <span style={{ color: "var(--accent)", fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textShadow: "0 0 8px var(--accent)" }}>
          <ScrambleText text="./contact_protocol" />
        </span>
        <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--border-bright), transparent)" }} />
        <span style={{ color: "var(--muted)", fontSize: 10 }}>03</span>
      </div>

      <div className="contact-heading" style={{
        display: "grid", gridTemplateColumns: "1fr auto",
        gap: 40, alignItems: "end",
        marginBottom: 48, borderBottom: "1px solid var(--border)", paddingBottom: 48,
      }}>
        <div>
          <div style={{ fontSize: 11, color: "var(--muted)", marginBottom: 16, letterSpacing: "0.1em" }}>
            // ready to receive transmissions
          </div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(44px,7vw,110px)",
            fontWeight: 800, lineHeight: 0.9, letterSpacing: "-0.04em",
          }}>
            <span style={{
              color: "var(--accent)",
              textShadow: "0 0 40px rgba(192,132,252,0.4), 0 0 80px rgba(192,132,252,0.15)",
              display: "block",
            }}>LET&apos;S</span>
            <span style={{
              color: "var(--accent2)",
              textShadow: "0 0 40px rgba(34,211,238,0.45), 0 0 80px rgba(34,211,238,0.15)",
              display: "block",
            }}>CONNECT</span>
          </h2>
        </div>

        {/* Status box — now with cyan border */}
        <div style={{
          fontFamily: "'DM Mono', monospace", fontSize: 11, color: "var(--muted)",
          textAlign: "right", lineHeight: 2.2,
          border: "1px solid var(--accent2)",
          padding: "20px 24px", background: "var(--surface)",
          boxShadow: "0 0 20px rgba(34,211,238,0.08)",
        }}>
          <div style={{ color: "var(--accent2)", marginBottom: 8, textShadow: "0 0 8px var(--accent2)", animation: "pulse-glow 2s ease-in-out infinite" }}>
            ● SYSTEM_STATUS: ONLINE
          </div>
          <div>OPEN_TO: INTERNSHIPS</div>
          <div>OPEN_TO: FREELANCE</div>
          <div>OPEN_TO: COLLABS</div>
          <div style={{ marginTop: 8, color: "var(--accent)", fontWeight: 700 }}>AVAIL: IMMEDIATE</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 2, marginBottom: 2 }}>
        <ContactCard link={links[0]} big />
        <ContactCard link={links[1]} />
        <ContactCard link={links[2]} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 2 }}>
        <ContactCard link={links[3]} />
        <div className="contact-el" style={{
          border: "1px solid var(--border-bright)",
          borderLeft: "3px solid var(--accent)",
          padding: "32px 36px", background: "var(--surface)",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24,
          boxShadow: "0 0 28px rgba(192,132,252,0.07)",
        }}>
          <div>
            <div style={{ fontFamily: "'DM Mono', monospace", fontSize: 18, fontWeight: 700, color: "var(--text)", marginBottom: 8 }}>
              Ready to build?
            </div>
            <div style={{ fontSize: 12, color: "var(--muted)" }}>ML systems · APIs · full products</div>
          </div>
          <a ref={ctaRef} href="mailto:pragyajha314@gmail.com" style={{
            display: "inline-block",
            padding: "12px 28px",
            border: "1px solid var(--accent)", color: "var(--accent)",
            textDecoration: "none", fontSize: 12, letterSpacing: "0.08em",
            transition: "background 0.2s, color 0.2s, box-shadow 0.2s", whiteSpace: "nowrap",
            fontFamily: "'DM Mono', monospace",
            boxShadow: "0 0 12px rgba(192,132,252,0.25)",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "var(--accent)"; e.currentTarget.style.color = "var(--bg)"; e.currentTarget.style.boxShadow = "0 0 32px rgba(192,132,252,0.55)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.boxShadow = "0 0 12px rgba(192,132,252,0.25)"; }}
          >[INITIATE_CONTACT]</a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact { padding: 80px 20px 60px !important; }
          #contact > div[style*="grid-template-columns: 2fr"] { grid-template-columns: 1fr !important; }
          #contact > div[style*="grid-template-columns: 1fr 2fr"] { grid-template-columns: 1fr !important; }
          #contact > div[style*="grid-template-columns: 1fr auto"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function ContactCard({ link: l, big }: { link: typeof links[0]; big?: boolean }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={l.href}
      target={l.href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="contact-el"
      style={{
        display: "flex", flexDirection: "column", justifyContent: "space-between",
        padding: big ? "32px" : "24px",
        border: `1px solid ${hovered ? l.accent : "var(--border)"}`,
        borderLeft: `3px solid ${l.accent}`,
        textDecoration: "none",
        background: hovered ? "var(--surface2)" : "var(--surface)",
        transition: "all 0.25s", minHeight: 120,
        boxShadow: hovered ? `0 0 24px ${l.glow}` : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={{ fontSize: 9, color: hovered ? l.accent : "var(--muted)", letterSpacing: "0.1em", marginBottom: 16, transition: "color 0.25s" }}>
        $ {l.cmd} {l.label.toLowerCase()}
      </div>
      <div>
        <div style={{ fontSize: 9, letterSpacing: "0.15em", color: "var(--muted)", marginBottom: 6 }}>// {l.label}</div>
        <div style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: big ? 16 : 13, fontWeight: 700,
          color: hovered ? l.accent : "var(--text)",
          textShadow: hovered ? `0 0 10px ${l.accent}` : "none",
          transition: "all 0.25s",
        }}>
          {l.value} <span style={{ opacity: 0.6, fontSize: 12 }}>↗</span>
        </div>
      </div>
    </a>
  );
}
