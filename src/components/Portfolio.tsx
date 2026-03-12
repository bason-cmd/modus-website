"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  { title: "Jagermeister", category: "Cultural Marketing & Events", image: null },
  { title: "Zer4U", category: "E-Commerce & Performance", image: "/images/hero-4-zer4u.jpg" },
  { title: "Ten Bis", category: "Growth & Digital", image: "/images/portfolio-tenbis.jpg" },
  { title: "Vans", category: "Brand Strategy & Social", image: null },
  { title: "Comme Il Faut", category: "Creative & Lifestyle", image: "/images/portfolio-cif.jpg" },
  { title: "Benedict", category: "Performance & Analytics", image: "/images/portfolio-benedict.jpg" },
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
              <div className="overflow-hidden rounded-lg aspect-[4/3] relative">
                {project.image ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="portfolio-image object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="portfolio-image w-full h-full bg-neutral-100 flex items-center justify-center">
                    <span className="text-neutral-300 text-[80px] font-display font-extrabold">
                      {project.title.charAt(0)}
                    </span>
                  </div>
                )}
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
