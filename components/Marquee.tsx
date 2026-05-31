"use client";

const items = [
  "Python", "FastAPI", "Flask", "Next.js", "Machine Learning",
  "LLM / GenAI", "SQL", "MongoDB", "Docker", "IBM Cloud",
  "React", "REST APIs", "Scikit-learn", "LangGraph", "Data Science",
];

export default function Marquee() {
  const all = [...items, ...items];
  return (
    <div style={{
      borderTop: "1px solid var(--border-bright)",
      borderBottom: "1px solid var(--border-bright)",
      padding: "12px 0", overflow: "hidden",
      background: "var(--surface)",
      position: "relative",
    }}>
      {/* Moving highlight line */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 1,
        background: "linear-gradient(90deg, transparent, var(--accent), transparent)",
        animation: "marquee 4s linear infinite",
        opacity: 0.5,
      }} />
      <div style={{ display: "flex", whiteSpace: "nowrap", animation: "marquee 30s linear infinite" }}>
        {all.map((item, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: 20,
            padding: "0 20px", fontFamily: "'DM Mono', monospace",
            fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "var(--muted)", flexShrink: 0,
          }}>
            <span style={{ color: "var(--accent)", fontSize: 8 }}>◆</span>
            {item}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
