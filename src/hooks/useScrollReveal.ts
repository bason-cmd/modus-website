"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealOptions {
  y?: number;
  duration?: number;
  stagger?: number;
  start?: string;
  ease?: string;
}

export function useScrollReveal<T extends HTMLElement>(
  options: ScrollRevealOptions = {}
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (!ref.current) return;

    const {
      y = 60,
      duration = 1,
      stagger = 0.1,
      start = "top 80%",
      ease = "power4.out",
    } = options;

    const children = ref.current.querySelectorAll("[data-reveal]");
    const targets = children.length > 0 ? children : [ref.current];

    gsap.set(targets, { y, opacity: 0 });

    ScrollTrigger.create({
      trigger: ref.current,
      start,
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration,
          stagger,
          ease,
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === ref.current) st.kill();
      });
    };
  }, []);

  return ref;
}
