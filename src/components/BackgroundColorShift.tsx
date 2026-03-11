"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const colorMap: { selector: string; color: string }[] = [
  { selector: "#services", color: "#F7F7F7" },
  { selector: "#team", color: "#ffffff" },
  { selector: "#testimonials", color: "#F5F5F5" },
  { selector: "#about", color: "#ffffff" },
  { selector: "#contact", color: "#F7F7F7" },
];

export default function BackgroundColorShift() {
  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    colorMap.forEach(({ selector, color }) => {
      const el = document.querySelector(selector);
      if (!el) return;

      const st = ScrollTrigger.create({
        trigger: el,
        start: "top 60%",
        end: "bottom 40%",
        onEnter: () => {
          gsap.to("body", {
            backgroundColor: color,
            duration: 0.8,
            ease: "power2.inOut",
          });
        },
        onLeaveBack: () => {
          // Find the previous section's color or default to white
          const idx = colorMap.findIndex((c) => c.selector === selector);
          const prevColor = idx > 0 ? colorMap[idx - 1].color : "#ffffff";
          // But we need the actual previous section that's visible
          gsap.to("body", {
            backgroundColor: idx === 0 ? "#ffffff" : prevColor,
            duration: 0.8,
            ease: "power2.inOut",
          });
        },
      });

      triggers.push(st);
    });

    return () => {
      triggers.forEach((st) => st.kill());
    };
  }, []);

  return null;
}
