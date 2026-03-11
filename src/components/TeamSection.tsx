"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "100+", label: "Active Clients" },
  { number: "8", label: "Years Running" },
  { number: "30+", label: "Team Members" },
  { number: "\u20AA2B+", label: "Media Managed" },
];

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Parallax image
    if (imageRef.current) {
      gsap.set(imageRef.current, { scale: 1.15 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          if (imageRef.current) {
            gsap.to(imageRef.current, {
              scale: 1 + (0.15 * (1 - self.progress)),
              duration: 0.3,
              ease: "none",
            });
          }
        },
      });
    }

    // Stats reveal
    if (statsRef.current) {
      const items = statsRef.current.children;
      gsap.set(items, { y: 40, opacity: 0 });
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(items, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
          });
        },
        once: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current || st.trigger === statsRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="team" className="py-4 md:py-6">
      <div className="container">
        {/* Full-width image block with overlay */}
        <div className="w-full aspect-[16/7] rounded-xl overflow-hidden relative">
          <div ref={imageRef} className="absolute inset-0 bg-neutral-900" />
          <div className="absolute inset-0 bg-black/40 z-10" />
          <div className="absolute inset-0 z-20 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white text-hero font-display font-extrabold leading-none">modus</p>
              <p className="text-white/50 text-body-l mt-2">Tel Aviv &mdash; since 2018</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8 md:mt-12"
        >
          {stats.map((stat, i) => (
            <div key={i} className="text-center md:text-left">
              <p className="text-display-3 font-display font-extrabold tracking-[-0.02em]">
                {stat.number}
              </p>
              <p className="text-body-m text-gray-400 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
