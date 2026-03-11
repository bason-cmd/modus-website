"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function TeamSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!blockRef.current) return;

    gsap.set(blockRef.current, { scale: 0.95, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => {
        gsap.to(blockRef.current, {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
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
    <section ref={sectionRef} id="team" className="py-4 md:py-6">
      <div className="container">
        <div
          ref={blockRef}
          className="w-full aspect-[16/7] bg-[#1a1a1a] rounded-xl overflow-hidden relative"
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <p className="text-white/15 text-hero font-extrabold">modus</p>
              <p className="text-white/8 text-body-l mt-2">Tel Aviv</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
