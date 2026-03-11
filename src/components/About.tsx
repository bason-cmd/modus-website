"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLParagraphElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Headline — dramatic reveal
    if (headlineRef.current) {
      gsap.set(headlineRef.current, { y: 80, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 65%",
        onEnter: () => {
          gsap.to(headlineRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
          });
        },
        once: true,
      });
    }

    // Body text — staggered
    if (bodyRef.current) {
      gsap.set(bodyRef.current, { y: 50, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 55%",
        onEnter: () => {
          gsap.to(bodyRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.2,
          });
        },
        once: true,
      });
    }

    // Full-width image — parallax
    if (imageRef.current) {
      gsap.set(imageRef.current, { scale: 1.1 });
      ScrollTrigger.create({
        trigger: imageRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.to(imageRef.current, {
              scale: 1 + (0.1 * (1 - self.progress)),
              duration: 0.3,
              ease: "none",
            });
          }
        },
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current || st.trigger === imageRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="py-14 md:py-24"
    >
      {/* Full-width cinematic image */}
      <div className="overflow-hidden rounded-xl mx-5 md:mx-10 mb-14 md:mb-20">
        <div
          ref={imageRef}
          className="w-full aspect-[21/9] bg-neutral-900 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>
      </div>

      <div className="container">
        <div className="mb-2">
          <p className="text-body-m text-gray-400 uppercase tracking-wider">About us</p>
        </div>
        <div className="w-full h-px bg-black/10 mb-8 md:mb-12" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-16">
          <div className="md:w-1/2">
            <p
              ref={headlineRef}
              className="text-title font-display font-bold leading-snug"
            >
              We started in the scene. Music venues, festivals, independent labels, community spaces. That DNA became our edge.
            </p>
          </div>
          <div ref={bodyRef} className="md:w-1/2">
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
      </div>
    </section>
  );
}
