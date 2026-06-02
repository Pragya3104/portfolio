"use client";
import { useState } from "react";
import {
  SiPython, SiFastapi, SiFlask, SiNextdotjs, SiReact,
  SiMongodb, SiDocker, SiScikitlearn,
  SiPostgresql, SiJupyter, SiPytorch,
} from "react-icons/si";
import { HiCpuChip, HiCodeBracket, HiArrowPath, HiSparkles, HiCloud } from "react-icons/hi2";
import type { IconType } from "react-icons";

const items: { name: string; Icon: IconType; accent: string }[] = [
  { name: "Python",          Icon: SiPython,       accent: "var(--accent)"  },
  { name: "FastAPI",         Icon: SiFastapi,      accent: "var(--accent2)" },
  { name: "Flask",           Icon: SiFlask,        accent: "var(--text)"    },
  { name: "Next.js",         Icon: SiNextdotjs,    accent: "var(--text)"    },
  { name: "React",           Icon: SiReact,        accent: "var(--accent2)" },
  { name: "Machine Learning",Icon: HiCpuChip,      accent: "var(--accent)"  },
  { name: "LLM / GenAI",    Icon: HiSparkles,     accent: "var(--warm)"    },
  { name: "PostgreSQL",      Icon: SiPostgresql,   accent: "var(--accent2)" },
  { name: "MongoDB",         Icon: SiMongodb,      accent: "var(--accent)"  },
  { name: "Docker",          Icon: SiDocker,       accent: "var(--accent2)" },
  { name: "IBM Cloud",       Icon: HiCloud,        accent: "var(--warm)"    },
  { name: "LangGraph",       Icon: HiArrowPath,    accent: "var(--accent2)" },
  { name: "PyTorch",         Icon: SiPytorch,      accent: "var(--warm)"    },
  { name: "REST APIs",       Icon: HiCodeBracket,  accent: "var(--accent)"  },
  { name: "Jupyter",         Icon: SiJupyter,      accent: "var(--warm)"    },
  { name: "Scikit-learn",    Icon: SiScikitlearn,  accent: "var(--accent)"  },
];

export default function Marquee() {
  const [paused, setPaused] = useState(false);
  const all = [...items, ...items];

  return (
    <div
      style={{
        borderTop: "1px solid var(--border-bright)",
        borderBottom: "1px solid var(--border-bright)",
        padding: "20px 0",
        overflow: "hidden",
        background: "linear-gradient(90deg, var(--bg), var(--surface) 20%, var(--surface) 80%, var(--bg))",
        position: "relative",
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Edge gradient masks */}
      <div style={{
        position: "absolute", left: 0, top: 0, bottom: 0, width: 120,
        background: "linear-gradient(90deg, var(--bg), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", right: 0, top: 0, bottom: 0, width: 120,
        background: "linear-gradient(270deg, var(--bg), transparent)",
        zIndex: 2, pointerEvents: "none",
      }} />

      {/* Scrolling track */}
      <div style={{
        display: "flex",
        flexWrap: "nowrap",
        gap: 8,
        animation: "marquee 44s linear infinite",
        animationPlayState: paused ? "paused" : "running",
      }}>
        {all.map((item, i) => (
          <div
            key={i}
            className="marquee-card"
            style={{ "--card-accent": item.accent } as React.CSSProperties}
          >
            <item.Icon className="marquee-icon" size={26} />
            <span className="marquee-name">{item.name}</span>
          </div>
        ))}
      </div>

      <style>{`
        .marquee-card {
          display: inline-flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 14px 22px;
          border: 1px solid var(--border);
          background: var(--surface);
          flex-shrink: 0;
          min-width: 96px;
          cursor: default;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          vertical-align: top;
        }
        .marquee-icon {
          color: var(--muted);
          display: block;
          transition: color 0.2s, filter 0.2s;
        }
        .marquee-name {
          font-size: 9px;
          color: var(--muted);
          letter-spacing: 0.12em;
          text-transform: uppercase;
          font-family: 'DM Mono', monospace;
          transition: color 0.2s;
          white-space: nowrap;
        }
        .marquee-card:hover {
          border-color: var(--card-accent);
          background: var(--surface2);
          box-shadow: 0 0 18px var(--card-accent);
        }
        .marquee-card:hover .marquee-icon {
          color: var(--card-accent);
          filter: drop-shadow(0 0 6px var(--card-accent));
        }
        .marquee-card:hover .marquee-name {
          color: var(--card-accent);
        }
      `}</style>
    </div>
  );
}
