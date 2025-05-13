
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const canRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate the can with energy pulses
      gsap.to(canRef.current, {
        scale: 1.05,
        filter: 'brightness(1.1)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
      
      // Animate the headline
      const headlineText = headlineRef.current?.textContent || '';
      if (headlineRef.current) {
        headlineRef.current.innerHTML = '';
        
        // Wrap each letter in a span for animation
        [...headlineText].forEach((letter, i) => {
          const span = document.createElement('span');
          span.textContent = letter === ' ' ? '\u00A0' : letter;
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          headlineRef.current?.appendChild(span);
          
          gsap.to(span, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1 * i,
            ease: 'back.out'
          });
        });
      }
      
      // Animated particles in the background
      gsap.to('.energy-particle', {
        y: 'random(-100, 100)',
        x: 'random(-100, 100)',
        opacity: 'random(0.3, 1)',
        scale: 'random(0.8, 1.2)',
        duration: 'random(2, 4)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.1
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef} 
      className="min-h-screen relative flex items-center justify-center overflow-hidden py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-black"
    >
      {/* Animated Particles */}
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="energy-particle absolute w-2 h-2 rounded-full bg-yellow-400 opacity-70"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            filter: 'blur(2px)',
            boxShadow: '0 0 10px 2px rgba(255, 230, 0, 0.8)'
          }}
        />
      ))}
      
      {/* Main Content */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between relative z-10">
        <div className="md:w-1/2 text-center md:text-left mb-10 md:mb-0">
          <h2 className="text-blue-400 text-xl md:text-2xl font-bold mb-4 tracking-wider">ENERGIA INOVADORA</h2>
          <h1 
            ref={headlineRef} 
            className="text-4xl md:text-6xl font-extrabold mb-6 text-white"
          >
            ⚡ Beba a Energia que Move o Futuro
          </h1>
          <p className="text-blue-200 text-lg md:text-xl mb-8">
            Desperte seu potencial máximo com o energético que revoluciona seu desempenho e estilo.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-8 py-6 rounded-full text-lg transition-all duration-300 transform hover:scale-105">
              COMPRE AGORA
            </Button>
            <Button variant="outline" className="border-blue-500 text-blue-400 hover:bg-blue-900/30 font-bold px-8 py-6 rounded-full text-lg">
              SAIBA MAIS
            </Button>
          </div>
        </div>
        
        <div 
          ref={canRef}
          className="md:w-1/2 flex justify-center items-center relative"
        >
          {/* Energy Can */}
          <div className="relative w-64 h-80 md:w-80 md:h-96">
            <div className="absolute inset-0 bg-blue-500 rounded-full opacity-20 animate-pulse" style={{ filter: 'blur(40px)' }}></div>
            <div className="h-full w-full flex items-center justify-center">
              <div className="bg-gray-800 w-40 h-72 md:w-48 md:h-80 rounded-3xl relative overflow-hidden shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-600 via-blue-700 to-blue-900"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-yellow-500 font-bold text-5xl">BATS</div>
                    <div className="text-white text-lg">ENERGY</div>
                    <div className="mt-4 text-xs text-blue-200">ULTRA POTÊNCIA</div>
                  </div>
                </div>
                <div className="absolute bottom-0 w-full h-1/4 bg-gradient-to-t from-black/40 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Diagonal divider */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-br from-blue-900 to-black transform -skew-y-3 translate-y-10"></div>
    </section>
  );
};

export default HeroSection;
