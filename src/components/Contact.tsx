"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // "and you?" heading — dramatic reveal from below
    if (headingRef.current) {
      gsap.set(headingRef.current, { y: "110%" });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 70%",
        onEnter: () => {
          gsap.to(headingRef.current, {
            y: 0,
            duration: 1.2,
            ease: "power4.out",
          });
        },
        once: true,
      });
    }

    // Contact links
    if (linksRef.current) {
      gsap.set(linksRef.current, { y: 40, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          gsap.to(linksRef.current, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            delay: 0.3,
          });
        },
        once: true,
      });
    }

    // Location
    if (locationRef.current) {
      gsap.set(locationRef.current, { y: 40, opacity: 0 });
      ScrollTrigger.create({
        trigger: locationRef.current,
        start: "top 85%",
        onEnter: () => {
          gsap.to(locationRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
          });
        },
        once: true,
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (
          st.trigger === sectionRef.current ||
          st.trigger === locationRef.current
        )
          st.kill();
      });
    };
  }, []);

  return (
    <section ref={sectionRef} id="contact" className="py-16 md:py-24">
      <div className="container">
        {/* "and you?" heading */}
        <div className="overflow-hidden mb-10 md:mb-14">
          <h2
            ref={headingRef}
            className="text-hero font-display font-extrabold leading-[0.88] tracking-[-0.04em]"
          >
            and{" "}
            <span className="italic font-bold" style={{ fontFamily: "Georgia, 'Times New Roman', serif" }}>
              you?
            </span>
          </h2>
        </div>

        {/* Contact links */}
        <div ref={linksRef}>
          <p className="text-body-l text-gray-400 mb-6">
            Let&apos;s find the better solution together:
          </p>
          <div className="flex flex-col gap-3">
            <a
              href="mailto:hello@modus.world"
              className="text-display-3 font-display font-bold hover:opacity-50 transition-opacity"
            >
              hello@modus.world
            </a>
            <a
              href="tel:+972544000000"
              className="text-display-3 font-display font-bold hover:opacity-50 transition-opacity"
            >
              +972-54-400-0000
            </a>
          </div>
        </div>

        {/* Location — Tel Aviv only */}
        <div ref={locationRef} className="mt-16 max-w-md">
          <h3 className="text-[15px] font-bold mb-1">Tel Aviv</h3>
          <p className="text-body-m text-gray-400 mb-4">
            Tushyia 2, Tel Aviv-Yafo
          </p>
          <div className="w-full aspect-[4/3] bg-neutral-100 rounded-xl" />
        </div>
      </div>
    </section>
  );
}
