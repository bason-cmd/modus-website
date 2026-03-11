"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { gsap } from "gsap";

const words = ["strategy", "media", "analytics", "creative", "growth", "culture"];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const line3Ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const claimRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  // GSAP entrance animation — SplitText-style word reveal
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline({ delay: 0.3 });

    // Set initial state
    gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
      y: "110%",
    });

    // Staggered line reveals
    tl.to(line1Ref.current, {
      y: 0,
      duration: 1,
      ease: "power4.out",
    })
      .to(
        line2Ref.current,
        {
          y: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.8"
      )
      .to(
        line3Ref.current,
        {
          y: 0,
          duration: 1,
          ease: "power4.out",
        },
        "-=0.8"
      );

    // Cards reveal
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.set(cards, { y: 60, opacity: 0 });
      tl.to(
        cards,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.04,
          ease: "power3.out",
        },
        "-=0.5"
      );
    }

    // Claim text reveal
    if (claimRef.current) {
      gsap.set(claimRef.current, { y: 40, opacity: 0 });
      tl.to(
        claimRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.4"
      );
    }
  }, []);

  // Word rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 400);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={heroRef}
      className="overflow-hidden min-h-screen flex flex-col justify-end pb-6 md:pb-8 pt-24"
    >
      <div className="mx-5 md:mx-10">
        {/* Hero text block — stacked like dotsandlines */}
        <div className="mb-10 md:mb-14">
          {/* Line 1: "modus" */}
          <div className="overflow-hidden">
            <p
              ref={line1Ref}
              className="text-hero font-extrabold tracking-[-0.04em] leading-[0.85]"
            >
              modus
            </p>
          </div>

          {/* Line 2: "and" */}
          <div className="overflow-hidden">
            <p
              ref={line2Ref}
              className="text-hero font-extrabold tracking-[-0.04em] leading-[0.85]"
            >
              and
            </p>
          </div>

          {/* Line 3: rotating word */}
          <div className="overflow-hidden">
            <div
              ref={line3Ref}
              className="text-hero font-extrabold tracking-[-0.04em] leading-[0.85]"
            >
              <div
                className={`transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isAnimating
                    ? "opacity-0 -translate-y-[20px]"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {words[currentWordIndex]}
              </div>
            </div>
          </div>
        </div>

        {/* Image grid — horizontal scroll strip */}
        <div
          ref={cardsRef}
          className="flex gap-2 md:gap-3 overflow-x-auto -mx-5 px-5 md:-mx-10 md:px-10 pb-2 scrollbar-hide"
        >
          {[
            { bg: "bg-[#1a1a2e]", label: "Brand Strategy" },
            { bg: "bg-[#e77d22]", label: "Social Media" },
            { bg: "bg-[#7c3aed]", label: "Performance" },
            { bg: "bg-[#059669]", label: "Analytics" },
            { bg: "bg-[#e11d48]", label: "Creative" },
            { bg: "bg-[#2563eb]", label: "Cultural Marketing" },
            { bg: "bg-[#ca8a04]", label: "Events" },
            { bg: "bg-[#dc2626]", label: "Growth" },
            { bg: "bg-[#4f46e5]", label: "Content" },
          ].map((item, i) => (
            <div
              key={i}
              className={`hero-card flex-none w-[200px] md:w-[260px] aspect-[3/4] rounded-xl ${item.bg} flex items-end p-4`}
            >
              <span className="text-white/70 text-[11px] font-medium bg-white/10 backdrop-blur-md rounded-full px-3 py-1">
                {item.label}
              </span>
            </div>
          ))}
        </div>

        {/* Claim text */}
        <div className="my-14 md:my-20">
          <p
            ref={claimRef}
            className="text-claim font-bold leading-[1.1] tracking-[-0.02em] max-w-[900px]"
          >
            Creative and digital growth agency rooted in Tel Aviv&apos;s cultural pulse{" "}
            <span className="inline-block w-[50px] md:w-[100px] h-[20px] md:h-[40px] bg-accent rounded-[6px] mx-1 align-middle relative -top-[2px]" />{" "}
            building brands at the intersection of culture, lifestyle &amp; storytelling.
          </p>
        </div>
      </div>
    </section>
  );
}
