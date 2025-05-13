
import { useEffect, useRef } from 'react';
import HeroSection from '@/components/landing/HeroSection';
import Features from '@/components/landing/Features';
import Distribution from '@/components/landing/Distribution';
import Partners from '@/components/landing/Partners';
import Testimonials from '@/components/landing/Testimonials';
import Footer from '@/components/landing/Footer';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const Index = () => {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Enable smooth scrolling with GSAP
    const ctx = gsap.context(() => {
      // Animation configurations will be added in each component
      
      // Page reveal animation
      gsap.from('body', {
        opacity: 0,
        duration: 1.5,
        ease: 'power2.inOut'
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef} className="overflow-hidden">
      <div className="noise-overlay"></div>
      <HeroSection />
      <Features />
      <Distribution />
      <Partners />
      <Testimonials />
      <Footer />
    </div>
  );
};

export default Index;
