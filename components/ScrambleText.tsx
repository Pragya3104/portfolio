"use client";
import { useState, useEffect, useRef } from "react";

const CHARS = "!@#$%^&*_+-=[]{}|<>?ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

// Characters to pass through unchanged during scramble
const SKIP = new Set([" ", ".", "/", "_", "~", ":", "$", "–", "—", "|"]);

export default function ScrambleText({
  text,
  className,
  style,
}: {
  text: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [display, setDisplay] = useState(text);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let triggered = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          triggered = true;
          observer.disconnect();

          const totalFrames = 22;
          let frame = 0;
          const interval = setInterval(() => {
            frame++;
            const resolved = Math.floor((frame / totalFrames) * text.length);
            setDisplay(
              text
                .split("")
                .map((char, i) => {
                  if (SKIP.has(char)) return char;
                  if (i < resolved) return char;
                  return CHARS[Math.floor(Math.random() * CHARS.length)];
                })
                .join("")
            );
            if (frame >= totalFrames) clearInterval(interval);
          }, 30);
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [text]);

  return (
    <span ref={ref} className={className} style={style}>
      {display}
    </span>
  );
}
