
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/button';
import { Store, Truck, Phone } from 'lucide-react';

const Distribution = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Animate the section content
      gsap.from(contentRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          toggleActions: "play none none reverse"
        },
        opacity: 0,
        y: 100,
        duration: 1,
        ease: "power3.out"
      });
      
      // Animate circuit background
      gsap.to('.circuit-line', {
        strokeDashoffset: 0,
        duration: 2,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        }
      });
      
      // Animate the buttons
      gsap.from('.dist-button', {
        scrollTrigger: {
          trigger: '.dist-button',
          start: "top 90%",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.5,
        stagger: 0.2,
        ease: "back.out(1.7)"
      });
      
    }, sectionRef);
    
    return () => ctx.revert();
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 relative bg-gradient-to-b from-blue-950 to-black overflow-hidden"
    >
      {/* SVG Circuit Background */}
      <svg className="absolute inset-0 w-full h-full z-0 opacity-20" viewBox="0 0 1440 800" preserveAspectRatio="none">
        <path 
          className="circuit-line"
          d="M0,100 Q720,200 1440,100 L1440,700 Q720,600 0,700 Z" 
          stroke="url(#circuitGradient)" 
          strokeWidth="2" 
          fill="none"
          strokeDasharray="5000"
          strokeDashoffset="5000"
        />
        <defs>
          <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="50%" stopColor="#facc15" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      
      {/* Main Content */}
      <div 
        ref={contentRef}
        className="container mx-auto px-4 relative z-10"
      >
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">DISTRIBUIÇÃO</h2>
          <p className="text-blue-300 text-lg max-w-3xl mx-auto">
            Entre para o time BATS e faça parte da revolução energética
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Sell Option */}
          <div className="bg-gradient-to-br from-blue-900/30 to-black p-8 rounded-2xl border border-blue-800/30 flex flex-col items-center text-center hover:border-blue-500/50 transition-all duration-300">
            <Store className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Quero Vender</h3>
            <p className="text-blue-200 mb-6">Torne-se um revendedor e ofereça BATS Energy aos seus clientes.</p>
            <Button className="dist-button bg-blue-600 hover:bg-blue-500 text-white w-full">
              REVENDER
            </Button>
          </div>
          
          {/* Distribute Option */}
          <div className="bg-gradient-to-br from-yellow-900/30 to-black p-8 rounded-2xl border border-yellow-800/30 flex flex-col items-center text-center hover:border-yellow-500/50 transition-all duration-300">
            <Truck className="w-12 h-12 text-yellow-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Quero Distribuir</h3>
            <p className="text-yellow-100 mb-6">Seja um distribuidor regional e amplie sua rede de negócios.</p>
            <Button className="dist-button bg-yellow-600 hover:bg-yellow-500 text-black w-full font-bold">
              DISTRIBUIR
            </Button>
          </div>
          
          {/* Contact Option */}
          <div className="bg-gradient-to-br from-blue-900/30 to-black p-8 rounded-2xl border border-blue-800/30 flex flex-col items-center text-center hover:border-blue-500/50 transition-all duration-300">
            <Phone className="w-12 h-12 text-blue-400 mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Fale Conosco</h3>
            <p className="text-blue-200 mb-6">Tire dúvidas ou faça pedidos especiais para sua empresa.</p>
            <Button variant="outline" className="dist-button border-blue-600 text-blue-400 hover:bg-blue-900/30 w-full">
              CONTATO
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Distribution;
