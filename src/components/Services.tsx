"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    number: "01",
    title: "strategy",
    items: [
      "Brand Strategy & Positioning",
      "Creative Platforms & Campaigns",
      "Customer Journey Mapping",
      "Competitive Analysis",
      "Growth Roadmap",
      "Channel Strategy",
    ],
  },
  {
    number: "02",
    title: "media",
    items: [
      "Meta Ads (Facebook & Instagram)",
      "Google Ads (Search & Display)",
      "TikTok Ads",
      "Programmatic & DSP",
      "YouTube & Video Ads",
      "LinkedIn Ads",
    ],
  },
  {
    number: "03",
    title: "analytics",
    items: [
      "Marketing BI & Dashboards",
      "Attribution Modeling",
      "Conversion Rate Optimization",
      "A/B Testing Frameworks",
      "Custom Reporting",
      "Data Infrastructure",
    ],
  },
  {
    number: "04",
    title: "creative",
    items: [
      "Ad Creative & Design",
      "Video Production",
      "UGC Strategy & Production",
      "Social Content & Community",
      "Brand Identity",
      "Creator Partnerships",
    ],
  },
  {
    number: "05",
    title: "culture",
    items: [
      "Cultural Marketing & Events",
      "Community Activation",
      "Experiential Moments",
      "Artist & Creator Partnerships",
      "Festival Production",
      "Brand x Culture Collabs",
    ],
  },
];

export default function Services() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Animate service titles — horizontal slide in
    gsap.set(titleRefs.current.filter(Boolean), { x: -60, opacity: 0 });

    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 70%",
      onEnter: () => {
        gsap.to(titleRefs.current.filter(Boolean), {
          x: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.08,
          ease: "power4.out",
        });
      },
      once: true,
    });

    // Animate right panel
    if (rightRef.current) {
      gsap.set(rightRef.current, { y: 40, opacity: 0 });
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top 60%",
        onEnter: () => {
          gsap.to(rightRef.current, {
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

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === sectionRef.current) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="py-14 md:py-20"
    >
      <div className="container">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-body-m text-gray-400 uppercase tracking-wider">What we do</h2>
        </div>
        <div className="w-full h-px bg-black/10 mb-8 md:mb-12" />

        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
          {/* Left: Service titles */}
          <div className="md:w-1/2">
            {services.map((service, i) => (
              <div
                key={i}
                ref={(el) => { titleRefs.current[i] = el; }}
                className="service-item cursor-pointer py-2 md:py-3"
                onMouseEnter={() => setActiveIndex(i)}
              >
                <div className="flex items-start gap-3">
                  <span className="text-body-m text-gray-300 mt-2 md:mt-4 tabular-nums">
                    {service.number}
                  </span>
                  <div className="flex items-center gap-3">
                    <h3
                      className={`text-display-3 font-display font-bold transition-opacity duration-300 ${
                        activeIndex === i ? "opacity-100" : "opacity-20"
                      }`}
                    >
                      {service.title}
                    </h3>
                    <div
                      className={`service-dot w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full bg-accent transition-all duration-300 ${
                        activeIndex === i ? "opacity-100 scale-100" : "opacity-0 scale-0"
                      }`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Service visual + details */}
          <div ref={rightRef} className="md:w-1/2 flex flex-col gap-6">
            {/* Visual block — B&W with accent */}
            <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden">
              {services.map((service, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 bg-neutral-900 transition-opacity duration-500 flex items-center justify-center ${
                    activeIndex === i ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <span className="text-accent/20 text-[120px] md:text-[180px] font-display font-extrabold leading-none">
                    {service.number}
                  </span>
                </div>
              ))}
            </div>

            {/* Service items list */}
            <div className="relative min-h-[180px]">
              {services.map((service, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 transition-all duration-400 ${
                    activeIndex === i
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                >
                  <div className="flex flex-col gap-1">
                    {service.items.map((item, j) => (
                      <p key={j} className="text-body-l text-gray-600">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
