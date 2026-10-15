"use client";

import { useEffect, useState, type ReactNode } from "react";

type Slide = { src: string; alt: string; width: number; height: number };

// トップの「写真＋名前」のかたまり。写真は一定間隔でふわっと切り替わる。
export function Hero({
  slides,
  intervalSeconds,
  children,
}: {
  slides: Slide[];
  intervalSeconds: number;
  children: ReactNode;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => setIndex((i) => (i + 1) % slides.length), intervalSeconds * 1000);
    return () => clearInterval(timer);
  }, [slides.length, intervalSeconds]);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <section id="top" className="hero">
      <div className="hero-stage">
        {slides.map((s, i) => (
          <img
            key={s.src}
            className="hero-slide"
            src={s.src}
            alt={i === index ? s.alt : ""}
            width={s.width}
            height={s.height}
            loading={i === 0 ? "eager" : "lazy"}
            style={{ opacity: i === index ? 1 : 0 }}
          />
        ))}
      </div>
      <div className="hero-text">
        {children}
        {slides.length > 1 && (
          <p className="hero-counter" aria-hidden="true">
            {pad(index + 1)} — {pad(slides.length)}
          </p>
        )}
      </div>
    </section>
  );
}
