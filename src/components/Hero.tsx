"use client";

import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import Image from "next/image";

const words = ["strategy", "media", "analytics", "creative", "growth", "culture"];

const heroImages = [
  { src: "/images/hero-1-kohi.jpg", alt: "KOHI — colorful iced drinks in golden sunlight", client: "KOHI" },
  { src: "/images/hero-2-karela.jpg", alt: "KARELA — overhead avocado toast editorial", client: "KARELA" },
  { src: "/images/hero-3-malka.jpg", alt: "Malka — baroque dinner table scene", client: "Malka" },
  { src: "/images/hero-4-zer4u.jpg", alt: "ZER4U — editorial fashion with roses", client: "ZER4U" },
];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const claimRef = useRef<HTMLParagraphElement>(null);
  const hasAnimated = useRef(false);

  // GSAP entrance animation
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;

    const tl = gsap.timeline({ delay: 0.3 });

    // Set initial state
    gsap.set([line1Ref.current, line2Ref.current], {
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
        "-=0.7"
      );

    // Cards reveal — scale up from slightly smaller
    if (cardsRef.current) {
      const cards = cardsRef.current.children;
      gsap.set(cards, { scale: 0.85, opacity: 0 });
      tl.to(
        cards,
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
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
        {/* Hero text block */}
        <div className="mb-10 md:mb-14">
          {/* Line 1: "modus" */}
          <div className="overflow-hidden">
            <p
              ref={line1Ref}
              className="text-hero font-display font-extrabold tracking-[-0.04em] leading-[0.85]"
            >
              modus
            </p>
          </div>

          {/* Line 2: rotating word with accent dot */}
          <div className="overflow-hidden">
            <div
              ref={line2Ref}
              className="text-hero font-display font-extrabold tracking-[-0.04em] leading-[0.85]"
            >
              <div
                className={`transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
                  isAnimating
                    ? "opacity-0 -translate-y-[20px]"
                    : "opacity-100 translate-y-0"
                }`}
              >
                {words[currentWordIndex]}
                <span className="text-accent">.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Image showreel — 4 project cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3"
        >
          {heroImages.map((img, i) => (
            <div
              key={i}
              className="hero-card relative aspect-[3/4] rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, 25vw"
                priority={i < 2}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent z-10" />
              <span className="absolute bottom-4 left-4 z-20 text-white/70 text-[11px] font-medium bg-white/10 backdrop-blur-md rounded-full px-3 py-1">
                {img.client}
              </span>
            </div>
          ))}
        </div>

        {/* Claim text */}
        <div className="my-14 md:my-20">
          <p
            ref={claimRef}
            className="text-claim font-display font-bold leading-[1.1] tracking-[-0.02em] max-w-[900px]"
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
