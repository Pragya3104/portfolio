"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const update = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const progress = total > 0 ? window.scrollY / total : 0;
      if (barRef.current) {
        gsap.set(barRef.current, {
          scaleX: progress,
          transformOrigin: "left center",
          overwrite: "auto",
        });
      }
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed", top: 0, left: 0, zIndex: 10001,
        height: 2, width: "100%",
        background: "linear-gradient(90deg, var(--accent), var(--accent2), var(--warm))",
        transform: "scaleX(0)", transformOrigin: "left center",
        boxShadow: "0 0 10px var(--accent)",
        pointerEvents: "none",
      }}
    />
  );
}
