"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only show custom cursor on desktop
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    const handleMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleEnter = () => setIsHovering(true);
    const handleLeave = () => setIsHovering(false);

    // Smooth follow with GSAP ticker
    const lerp = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.15;
      pos.current.y += (target.current.y - pos.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 20}px, ${pos.current.y - 20}px)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`;
      }
    };

    gsap.ticker.add(lerp);
    window.addEventListener("mousemove", handleMove);

    // Track hover on interactive elements
    const interactives = document.querySelectorAll("a, button, .portfolio-card, .hero-card, .service-item");
    interactives.forEach((el) => {
      el.addEventListener("mouseenter", handleEnter);
      el.addEventListener("mouseleave", handleLeave);
    });

    return () => {
      gsap.ticker.remove(lerp);
      window.removeEventListener("mousemove", handleMove);
      interactives.forEach((el) => {
        el.removeEventListener("mouseenter", handleEnter);
        el.removeEventListener("mouseleave", handleLeave);
      });
    };
  }, []);

  return (
    <>
      {/* Outer ring — follows with lag */}
      <div
        ref={cursorRef}
        className={`custom-cursor fixed top-0 left-0 w-10 h-10 rounded-full border border-black/30 pointer-events-none z-[9999] mix-blend-difference transition-[width,height] duration-300 hidden md:block ${
          isHovering ? "!w-16 !h-16 !border-white/50 !-ml-3 !-mt-3" : ""
        }`}
        style={{ willChange: "transform" }}
      />
      {/* Inner dot — instant follow */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 w-2 h-2 rounded-full bg-black pointer-events-none z-[9999] mix-blend-difference hidden md:block transition-transform duration-200 ${
          isHovering ? "scale-0" : "scale-100"
        }`}
        style={{ willChange: "transform" }}
      />
    </>
  );
}
