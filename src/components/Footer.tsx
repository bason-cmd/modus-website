"use client";

export default function Footer() {
  return (
    <footer className="border-t border-black/10">
      <div className="container py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {/* Logo */}
          <div>
            <p className="text-[48px] md:text-[64px] font-display font-extrabold leading-none tracking-[-0.03em]">
              modus
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-2">
            <a href="#services" className="text-[13px] hover:opacity-50 transition-opacity link-hover inline-block w-fit">
              services
            </a>
            <a href="#about" className="text-[13px] hover:opacity-50 transition-opacity link-hover inline-block w-fit">
              about
            </a>
            <a href="#clients" className="text-[13px] hover:opacity-50 transition-opacity link-hover inline-block w-fit">
              clients
            </a>
            <a href="#contact" className="text-[13px] hover:opacity-50 transition-opacity link-hover inline-block w-fit">
              contact
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-2">
            <a href="#" className="text-[13px] hover:opacity-50 transition-opacity link-hover inline-block w-fit">
              linkedin
            </a>
            <a href="#" className="text-[13px] hover:opacity-50 transition-opacity link-hover inline-block w-fit">
              instagram
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2">
            <a href="mailto:hello@modus.co.il" className="text-[13px] hover:opacity-50 transition-opacity link-hover inline-block w-fit">
              hello@modus.co.il
            </a>
            <a href="tel:+972544000000" className="text-[13px] hover:opacity-50 transition-opacity link-hover inline-block w-fit">
              +972-54-400-0000
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-10 pt-6 border-t border-black/10 gap-4">
          <div className="flex gap-4 text-[11px] text-gray-400">
            <a href="#" className="hover:text-black transition-colors">privacy policy</a>
            <a href="#" className="hover:text-black transition-colors">terms of service</a>
          </div>
          <p className="text-[11px] text-gray-400">
            &copy; modus {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </footer>
  );
}
