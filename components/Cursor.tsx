"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mx = 0, my = 0, rx = 0, ry = 0;
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      gsap.set(dot, { x: mx, y: my });
      gsap.set(ring, { x: rx, y: ry });
    };
    gsap.ticker.add(tick);

    const hoverEls = document.querySelectorAll("a, button, [data-cursor]");
    hoverEls.forEach(el => {
      el.addEventListener("mouseenter", () => {
        gsap.to(ring, { width: 56, height: 56, borderColor: "rgba(191,95,255,1)", duration: 0.2 });
        gsap.to(dot, { width: 4, height: 4, duration: 0.2 });
      });
      el.addEventListener("mouseleave", () => {
        gsap.to(ring, { width: 32, height: 32, borderColor: "rgba(191,95,255,0.5)", duration: 0.2 });
        gsap.to(dot, { width: 6, height: 6, duration: 0.2 });
      });
    });

    return () => {
      window.removeEventListener("mousemove", onMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none" }}>
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
