"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "Modus doesn\u2019t just run ads \u2014 they understand our brand, our audience, and always find creative angles we wouldn\u2019t think of ourselves.",
    name: "Tal Shavit",
    title: "Marketing Director, Jagermeister Israel",
  },
  {
    quote: "Working with Modus feels like having an in-house team that actually gets the culture. Results that speak for themselves.",
    name: "Noa Regev",
    title: "Head of Digital, Zer4U",
  },
  {
    quote: "They combine sharp creative thinking with performance marketing that actually moves the needle. A rare combination.",
    name: "Yarden Levi",
    title: "VP Marketing, Benedict",
  },
  {
    quote: "From strategy to execution, Modus delivers with a level of cultural awareness and professionalism that\u2019s hard to find.",
    name: "Maya Cohen",
    title: "Brand Manager, Comme Il Faut",
  },
  {
    quote: "The best agency partnership we\u2019ve had. They\u2019re obsessive about data but never lose sight of the creative story.",
    name: "Amit Dror",
    title: "CMO, Ten Bis",
  },
];

export default function Testimonials() {

  const sectionRef = useRef<HTMLElement>(null);
  const beliefRef = useRef<HTMLParagraphElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Belief statement reveal
    if (beliefRef.current) {
      gsap.set(beliefRef.current, { y: 60, opacity: 0 });
      ScrollTrigger.create({
        trigger: beliefRef.current,
        start: "top 80%",
        onEnter: () => {
          gsap.to(beliefRef.current, {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power4.out",
          });
        },
        once: true,
      });
    }

    // Testimonial cards — horizontal slide
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.set(cards, { x: 60, opacity: 0 });
      ScrollTrigger.create({
        trigger: cardsRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(cards, {
            x: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.08,
            ease: "power3.out",
          });
        },
        once: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === beliefRef.current || st.trigger === cardsRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="testimonials" className="py-14 md:py-20">
      {/* Belief statement */}
      <div className="container mb-12 md:mb-16">
        <p
          ref={beliefRef}
          className="text-claim font-display font-bold leading-[1.1] tracking-[-0.02em] max-w-[900px]"
        >
          Most agencies either do culture or do performance. We do both — and we don&apos;t see them as separate disciplines.
        </p>
      </div>

      {/* Horizontal scroll testimonials */}
      <div
        ref={cardsRef}
        className="flex overflow-x-auto gap-0 pb-4 scrollbar-hide"
      >
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="testimonial-slide flex-none w-[82vw] md:w-[42vw] lg:w-[30vw] px-5 md:px-8 py-6 flex flex-col justify-between"
          >
            <p className="text-[17px] leading-[1.5] mb-8">&ldquo;{t.quote}&rdquo;</p>
            <div>
              <p className="font-bold text-[13px]">{t.name}</p>
              <p className="text-body-m text-gray-400">{t.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Partnership CTA */}
      <div className="container mt-10">
        <div className="w-full h-px bg-black/10 mb-8" />
        <a
          href="#contact"
          className="inline-flex items-center gap-2 bg-black text-white rounded-full px-6 py-3 text-[13px] font-medium hover:bg-gray-800 transition-colors"
        >
          become a partner
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="white" strokeWidth="1.5" />
          </svg>
        </a>
      </div>
    </section>
  );
}
