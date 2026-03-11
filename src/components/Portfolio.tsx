"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "TechFlow", category: "SaaS & Technology", color: "bg-[#1a1a2e]" },
  { title: "GreenLeaf", category: "E-Commerce & DTC", color: "bg-[#059669]" },
  { title: "Pulse Finance", category: "Fintech & Finance", color: "bg-[#2563eb]" },
  { title: "Vivid Studio", category: "Creative & Lifestyle", color: "bg-[#7c3aed]" },
  { title: "Atlas Mobility", category: "Mobility & Transport", color: "bg-[#e77d22]" },
  { title: "NovaCare", category: "Health & Wellness", color: "bg-[#0891b2]" },
];

export default function Portfolio() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!gridRef.current) return;

    const cards = gridRef.current.children;
    gsap.set(cards, { y: 60, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 75%",
      onEnter: () => {
        gsap.to(cards, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
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
    <section ref={sectionRef} className="py-14 md:py-20">
      <div className="container">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-body-m text-gray-400 uppercase tracking-wider">Selected work</h2>
          <a
            href="#"
            className="btn-outline border border-black rounded-full px-5 py-2 text-[13px] font-medium flex items-center gap-2"
          >
            all work
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
        <div className="w-full h-px bg-black/10 mb-8 md:mb-12" />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-10"
        >
          {projects.map((project, i) => (
            <a
              key={i}
              href="#"
              className="portfolio-card flex flex-col gap-3 group"
            >
              <div className="overflow-hidden rounded-lg aspect-[4/3]">
                <div
                  className={`portfolio-image w-full h-full ${project.color} flex items-center justify-center`}
                >
                  <span className="text-white/8 text-[80px] font-extrabold">
                    {project.title.charAt(0)}
                  </span>
                </div>
              </div>
              <div>
                <h3 className="text-[15px] font-bold group-hover:opacity-60 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-body-m text-gray-400">{project.category}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
