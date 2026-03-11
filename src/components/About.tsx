"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftRef = useRef<HTMLParagraphElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const targets = [leftRef.current, rightRef.current].filter(Boolean);
    gsap.set(targets, { y: 60, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(targets, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: "power4.out",
        });
      },
      once: true,
    });

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="container py-14 md:py-24"
    >
      <div className="mb-2">
        <p className="text-body-m text-gray-400 uppercase tracking-wider">About us</p>
      </div>
      <div className="w-full h-px bg-black/10 mb-8 md:mb-12" />

      <div className="flex flex-col md:flex-row gap-8 md:gap-16">
        <div className="md:w-1/2">
          <p
            ref={leftRef}
            className="text-title font-bold leading-snug"
          >
            We started in the scene. Music venues, festivals, independent labels, community spaces. That DNA became our edge.
          </p>
        </div>
        <div ref={rightRef} className="md:w-1/2">
          <p className="text-body-l text-gray-500">
            Today, Modus is one of Israel&apos;s leading independent agencies — a team of creative directors, strategists, designers, data people, and writers who bring a cultural sensibility to everything we touch. We manage over 100 active clients across Meta Ads, Google Ads, TikTok, analytics, and creative.
          </p>
          <div className="mt-8">
            <a
              href="#contact"
              className="btn-outline border border-black rounded-full px-5 py-2.5 text-[13px] font-medium inline-flex items-center gap-2"
            >
              meet the team
              <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
