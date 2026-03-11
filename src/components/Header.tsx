"use client";

import { useState, useEffect } from "react";
import Menu from "./Menu";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-5 md:px-10 py-5 transition-all duration-300 ${
          scrolled && !menuOpen ? "bg-white/90 backdrop-blur-sm" : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <a href="#" className="relative z-50">
          <span className="font-extrabold text-[15px] tracking-[-0.02em] text-black">
            modus
          </span>
        </a>

        {/* Right side */}
        <div className="flex items-center gap-6 relative z-50">
          <a
            href="#contact"
            className="hidden md:block text-[13px] font-medium text-black link-hover"
          >
            contact
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-[13px] font-medium flex items-center gap-2 text-black"
          >
            {menuOpen ? (
              <span className="w-7 h-7 rounded-full bg-black flex items-center justify-center">
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path d="M1 1L9 9M9 1L1 9" stroke="white" strokeWidth="1.5" />
                </svg>
              </span>
            ) : (
              "menu"
            )}
          </button>
        </div>
      </header>

      <Menu isOpen={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
