"use client";

import { useEffect, useState } from "react";

export default function CTABanner() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600 && !dismissed) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div
      className={`cta-banner fixed bottom-0 left-0 right-0 z-40 bg-accent flex items-center justify-between gap-4 px-5 md:px-10 py-3.5 ${
        visible ? "visible" : ""
      }`}
    >
      <p className="text-[13px] md:text-[14px] font-bold text-black">
        Looking for a creative partner wired into the city?
      </p>
      <p className="hidden md:block text-[13px] text-black/60">
        Let&apos;s talk. Book a free consultation now.
      </p>
      <div className="flex items-center gap-3">
        <a
          href="#contact"
          className="btn-outline border border-black rounded-full px-5 py-2 text-[13px] font-medium text-black flex items-center gap-2 whitespace-nowrap bg-white"
        >
          Book a call
          <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </a>
        <button
          onClick={() => {
            setDismissed(true);
            setVisible(false);
          }}
          className="text-black hover:opacity-50 transition-opacity"
        >
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
            <path d="M2 2L14 14M14 2L2 14" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </button>
      </div>
    </div>
  );
}
