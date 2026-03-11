"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const menuItems = [
  { label: "services", href: "#services" },
  { label: "clients", href: "#clients" },
  { label: "about", href: "#about" },
  { label: "contact", href: "#contact" },
];

export default function Menu({ isOpen, onClose }: MenuProps) {
  const overlayRef = useRef<HTMLElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!overlayRef.current) return;

    if (isOpen) {
      // Open: animate clipPath from bottom to full
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 1.2,
        ease: "power4.inOut",
      });

      // Stagger menu items reveal
      gsap.fromTo(
        itemsRef.current.filter(Boolean),
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.4,
        }
      );

      // Bottom info reveal
      if (bottomRef.current) {
        gsap.fromTo(
          bottomRef.current,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            ease: "power3.out",
            delay: 0.8,
          }
        );
      }
    } else {
      // Close: animate clipPath to hide
      gsap.to(overlayRef.current, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
        duration: 0.8,
        ease: "power4.inOut",
      });
    }
  }, [isOpen]);

  return (
    <nav
      ref={overlayRef}
      className="fixed inset-0 z-40 bg-accent flex flex-col justify-between px-5 md:px-10 pt-24 pb-8"
      style={{ clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)" }}
    >
      {/* Menu items — right-aligned on desktop like dotsandlines */}
      <div className="flex flex-col md:items-end mt-auto mb-auto">
        {menuItems.map((item, i) => (
          <div
            key={item.label}
            ref={(el) => { itemsRef.current[i] = el; }}
            className="overflow-hidden"
          >
            <a
              href={item.href}
              onClick={onClose}
              className="block text-display-2 font-extrabold text-black hover:opacity-50 transition-opacity duration-300 leading-[1.1]"
            >
              {item.label}
            </a>
          </div>
        ))}
      </div>

      {/* Bottom info */}
      <div
        ref={bottomRef}
        className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6"
      >
        <div className="flex gap-6">
          <a href="https://linkedin.com" className="text-[13px] text-black underline underline-offset-2">linkedin</a>
          <a href="https://instagram.com" className="text-[13px] text-black underline underline-offset-2">instagram</a>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex flex-col items-end gap-1">
            <a href="mailto:hello@modus.co.il" className="text-[13px] text-black underline underline-offset-2">hello@modus.co.il</a>
            <a href="tel:+972544000000" className="text-[13px] text-black underline underline-offset-2">+972-54-400-0000</a>
          </div>
          <a
            href="#contact"
            onClick={onClose}
            className="btn-outline border border-black rounded-full px-5 py-2.5 text-[13px] font-medium text-black flex items-center gap-2"
          >
            let&apos;s talk
            <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1.5" />
            </svg>
          </a>
        </div>
      </div>
    </nav>
  );
}
