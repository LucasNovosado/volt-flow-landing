
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Zap, Rocket, TrendingUp } from 'lucide-react';

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const featureCardsRef = useRef<HTMLDivElement[]>([]);
  
  const addToFeatureRefs = (el: HTMLDivElement) => {
    if (el && !featureCardsRef.current.includes(el)) {
      featureCardsRef.current.push(el);
    }
  };
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate feature cards
      featureCardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
          },
          y: 100,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.2,
          ease: "power3.out"
        });
      });
      
      // Animated background pulse
      gsap.to('.features-bg-pulse', {
        scale: 1.2,
        opacity: 0.5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
      
      // Icon animations on hover
      featureCardsRef.current.forEach(card => {
        const icon = card.querySelector('.feature-icon');
        card.addEventListener('mouseenter', () => {
          gsap.to(icon, { 
            rotate: 10, 
            scale: 1.2,
            duration: 0.3,
            ease: "back.out" 
          });
        });
        card.addEventListener('mouseleave', () => {
          gsap.to(icon, { 
            rotate: 0, 
            scale: 1,
            duration: 0.3,
            ease: "back.out" 
          });
        });
      });
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section
      ref={sectionRef}
      className="py-20 relative bg-gradient-to-b from-black to-blue-950 overflow-hidden"
    >
      {/* Background animated elements */}
      <div className="features-bg-pulse absolute left-1/4 top-1/2 w-96 h-96 rounded-full bg-yellow-500 opacity-10" style={{ filter: 'blur(100px)' }}></div>
      <div className="features-bg-pulse absolute right-1/4 top-1/3 w-80 h-80 rounded-full bg-blue-500 opacity-10" style={{ filter: 'blur(80px)' }}></div>
      
      {/* Circuit lines */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute h-0.5 bg-blue-400 top-1/4 left-0 right-0" style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}></div>
        <div className="absolute h-0.5 bg-yellow-400 top-2/3 left-0 right-0" style={{ boxShadow: '0 0 10px rgba(250, 204, 21, 0.8)' }}></div>
        <div className="absolute w-0.5 bg-blue-400 left-1/4 top-0 bottom-0" style={{ boxShadow: '0 0 10px rgba(59, 130, 246, 0.8)' }}></div>
        <div className="absolute w-0.5 bg-yellow-400 left-3/4 top-0 bottom-0" style={{ boxShadow: '0 0 10px rgba(250, 204, 21, 0.8)' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">DIFERENCIAIS</h2>
          <p className="text-blue-300 text-lg max-w-3xl mx-auto">
            Nossa fórmula integra ciência de ponta e ingredientes premium para maximizar seu potencial
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* High Performance Feature */}
          <div 
            ref={addToFeatureRefs}
            className="bg-gradient-to-br from-blue-900/50 to-blue-950/90 p-8 rounded-2xl border border-blue-800/30 shadow-lg hover:shadow-blue-900/20 hover:border-blue-700/50 transition-all duration-300 group"
          >
            <div className="feature-icon w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-500/40 transition-colors duration-300">
              <Zap className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-4">Alta Performance</h3>
            <p className="text-blue-200 text-center">
              Formulado com vitaminas B, taurina e compostos energéticos que aumentam seu desempenho físico e mental instantaneamente.
            </p>
          </div>
          
          {/* Active Lifestyle Feature */}
          <div 
            ref={addToFeatureRefs}
            className="bg-gradient-to-br from-yellow-900/40 to-blue-950/90 p-8 rounded-2xl border border-yellow-800/30 shadow-lg hover:shadow-yellow-900/20 hover:border-yellow-700/50 transition-all duration-300 group"
          >
            <div className="feature-icon w-16 h-16 rounded-full bg-yellow-500/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-yellow-500/40 transition-colors duration-300">
              <Rocket className="w-8 h-8 text-yellow-400 group-hover:text-yellow-300" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-4">Estilo de Vida Ativo</h3>
            <p className="text-yellow-100 text-center">
              Perfeito para quem busca energia para treinos, trabalho intenso, estudos ou noites longas. A energia que acompanha seu ritmo.
            </p>
          </div>
          
          {/* Innovative Design Feature */}
          <div 
            ref={addToFeatureRefs}
            className="bg-gradient-to-br from-blue-900/50 to-blue-950/90 p-8 rounded-2xl border border-blue-800/30 shadow-lg hover:shadow-blue-900/20 hover:border-blue-700/50 transition-all duration-300 group"
          >
            <div className="feature-icon w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-500/40 transition-colors duration-300">
              <TrendingUp className="w-8 h-8 text-blue-400 group-hover:text-blue-300" />
            </div>
            <h3 className="text-2xl font-bold text-white text-center mb-4">Design Inovador</h3>
            <p className="text-blue-200 text-center">
              Embalagem futurista que reflete nossa identidade tecnológica e a potência do produto. Destaque-se com BATS Energy.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
