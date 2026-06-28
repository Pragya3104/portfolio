"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const TRAIL = 8;

const SECTION_COLORS: Record<string, string> = {
  hero:     "#c084fc",
  about:    "#22d3ee",
  work:     "#c084fc",
  services: "#f472b6",
  contact:  "#22d3ee",
};

function getActiveSection(): string {
  const sections = ["hero", "about", "work", "services", "contact"];
  const mid = window.scrollY + window.innerHeight * 0.45;
  let current = "hero";
  for (const id of sections) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= mid) current = id;
  }
  return current;
}

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const trailRefs = useRef<(HTMLDivElement | null)[]>([]);
  const colorRef = useRef("#c084fc");
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      colorRef.current = SECTION_COLORS[getActiveSection()] || "#c084fc";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    const positions = Array.from({ length: TRAIL }, () => ({ x: 0, y: 0 }));

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      const col = colorRef.current;
      const colFaint = col + "80";

      gsap.set(dotRef.current, { x: mx, y: my, background: col, boxShadow: `0 0 8px ${col}, 0 0 20px ${col}` });

      rx += (mx - rx) * 0.45;
      ry += (my - ry) * 0.45;
      gsap.set(ringRef.current, { x: rx, y: ry, borderColor: colFaint, boxShadow: `0 0 8px ${colFaint}` });

      positions[0].x += (mx - positions[0].x) * 0.45;
      positions[0].y += (my - positions[0].y) * 0.45;
      for (let i = 1; i < TRAIL; i++) {
        const ease = Math.max(0.45 - i * 0.042, 0.12);
        positions[i].x += (positions[i - 1].x - positions[i].x) * ease;
        positions[i].y += (positions[i - 1].y - positions[i].y) * ease;
      }

      trailRefs.current.forEach((dot, i) => {
        if (!dot) return;
        const progress = i / TRAIL;
        gsap.set(dot, {
          x: positions[i].x, y: positions[i].y,
          background: col,
          width: Math.max(5 - progress * 3.2, 1.2),
          height: Math.max(5 - progress * 3.2, 1.2),
          opacity: (1 - progress) * 0.55,
        });
      });
    };
    gsap.ticker.add(tick);

    const hoverEls = document.querySelectorAll("a, button, [data-cursor]");
    hoverEls.forEach(el => {
      el.addEventListener("mouseenter", () => {
        gsap.to(ringRef.current, { width: 56, height: 56, duration: 0.2 });
        gsap.to(dotRef.current, { width: 4, height: 4, duration: 0.2 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(ringRef.current, { width: 32, height: 32, duration: 0.2 });
        gsap.to(dotRef.current, { width: 6, height: 6, duration: 0.2 });
      });
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none" }}>
      {Array.from({ length: TRAIL }).map((_, i) => (
        <div
          key={i}
          ref={el => { trailRefs.current[i] = el; }}
          style={{
            position: "absolute", width: 5, height: 5,
            background: "#c084fc",
            borderRadius: 0,
            transform: "translate(-50%,-50%)",
            opacity: 0,
          }}
        />
      ))}
      <div ref={dotRef} style={{
        width: 6, height: 6, background: "#bf5fff",
        boxShadow: "0 0 8px #bf5fff, 0 0 20px #bf5fff",
        borderRadius: 0,
        transform: "translate(-50%,-50%)", position: "absolute",
      }} />
      <div ref={ringRef} style={{
        width: 32, height: 32,
        border: "1px solid rgba(191,95,255,0.5)",
        borderRadius: 0,
        transform: "translate(-50%,-50%) rotate(45deg)",
        position: "absolute",
        boxShadow: "0 0 8px rgba(191,95,255,0.25)",
      }} />
    </div>
  );
}
