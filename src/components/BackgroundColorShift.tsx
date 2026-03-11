"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Transitions the page background color as user scrolls through sections.
 * Inspired by dotsandlines.io color array: ["#ffffff", "#E3FF00", "#FF9500", "#F351FF"]
 */

const colorMap: { selector: string; color: string }[] = [
  { selector: "#services", color: "#E3FF00" },
  { selector: "#team", color: "#FF9500" },
  { selector: "#testimonials", color: "#F351FF" },
  { selector: "#about", color: "#ffffff" },
  { selector: "#contact", color: "#E3FF00" },
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
