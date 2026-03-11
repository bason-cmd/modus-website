"use client";

import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LogoSlider from "@/components/LogoSlider";
import Portfolio from "@/components/Portfolio";
import Services from "@/components/Services";
import TeamSection from "@/components/TeamSection";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import CTABanner from "@/components/CTABanner";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import BackgroundColorShift from "@/components/BackgroundColorShift";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <CustomCursor />
      <BackgroundColorShift />
      <Header />
      <main>
        <Hero />
        <LogoSlider />
        <Portfolio />
        <Services />
        <TeamSection />
        <Testimonials />
        <About />
        <Contact />
        <Footer />
      </main>
      <CTABanner />
    </>
  );
}
