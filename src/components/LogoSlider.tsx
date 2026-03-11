"use client";

// Selected prominent clients from Modus portfolio
const clients = [
  "Jagermeister", "Zer4U", "Ten Bis", "Vans", "North Face",
  "Dickies", "Benedict", "Shufersal", "Israeli Opera", "Comme Il Faut",
  "Iriyat Tel Aviv", "Milk & Honey", "HILI", "Altra", "Asufa",
  "Jagermeister", "Zer4U", "Ten Bis", "Vans", "North Face",
  "Dickies", "Benedict", "Shufersal", "Israeli Opera", "Comme Il Faut",
  "Iriyat Tel Aviv", "Milk & Honey", "HILI", "Altra", "Asufa",
];

export default function LogoSlider() {
  return (
    <section className="py-8 md:py-12 overflow-hidden" id="clients">
      <div className="container mb-4">
        <p className="text-body-m text-gray-400 uppercase tracking-wider">Selected Clients</p>
      </div>
      <div className="w-full h-px bg-black/10 mb-6" />
      <div className="relative overflow-hidden">
        <div className="animate-marquee flex items-center gap-12 md:gap-20 whitespace-nowrap">
          {clients.map((client, i) => (
            <span
              key={i}
              className="text-lg md:text-2xl font-bold text-black/70 flex-shrink-0"
            >
              {client}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
