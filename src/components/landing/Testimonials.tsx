
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Alex Silva",
    role: "Atleta Profissional",
    content: "BATS Energy revolucionou minha rotina de treinos. A energia é constante e sem aquela queda depois de algumas horas!",
    avatar: "A"
  },
  {
    name: "Marina Costa",
    role: "Influenciadora Digital",
    content: "Além do design incrível que combina com meu estilo, o sabor é perfeito e me dá energia para maratonas de conteúdo.",
    avatar: "M"
  },
  {
    name: "Lucas Mendes",
    role: "Desenvolvedor de Games",
    content: "Nas noites de programação intensa, BATS Energy é meu companheiro essencial. Mantenho o foco por horas!",
    avatar: "L"
  },
  {
    name: "Carla Lopes",
    role: "DJ",
    content: "A única bebida energética que confio para minhas apresentações. Design futurista e energia que dura a noite toda!",
    avatar: "C"
  }
];

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const addToCardsRef = (el: HTMLDivElement) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    const ctx = gsap.context(() => {
      // Section entrance animation
      gsap.from(sectionRef.current, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        },
        opacity: 0,
        duration: 1
      });
      
      // Cards staggered animation
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: "top 90%"
          },
          y: 50,
          opacity: 0,
          delay: index * 0.1,
          duration: 0.6,
          ease: "back.out"
        });
      });
      
      // Animated background
      gsap.to('.testimonial-glow', {
        x: 'random(-50, 50)',
        y: 'random(-50, 50)',
        opacity: 'random(0.4, 0.7)',
        duration: 'random(3, 5)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      });
    }, sectionRef);
    
    // Auto rotation
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);
    
    return () => {
      ctx.revert();
      clearInterval(interval);
    };
  }, []);
  
  return (
    <section 
      ref={sectionRef}
      className="py-20 relative bg-gradient-to-b from-black to-blue-950 overflow-hidden"
    >
      {/* Background glows */}
      <div className="testimonial-glow absolute left-1/4 top-1/4 w-64 h-64 rounded-full bg-blue-500/20" style={{ filter: 'blur(80px)' }}></div>
      <div className="testimonial-glow absolute right-1/4 bottom-1/4 w-80 h-80 rounded-full bg-yellow-500/20" style={{ filter: 'blur(100px)' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">DEPOIMENTOS</h2>
          <p className="text-blue-300 text-lg max-w-3xl mx-auto">
            Veja o que nossos consumidores estão falando sobre BATS Energy
          </p>
        </div>
        
        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              ref={addToCardsRef}
              className="bg-gradient-to-br from-blue-900/20 to-black p-6 rounded-xl border border-blue-800/30 hover:border-blue-500/40 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-blue-700">{testimonial.avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-white">{testimonial.name}</p>
                  <p className="text-sm text-blue-400">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-blue-100">{testimonial.content}</p>
            </div>
          ))}
        </div>
        
        {/* Mobile Carousel */}
        <div className="md:hidden">
          <div className="relative overflow-hidden rounded-xl border border-blue-800/30 bg-gradient-to-br from-blue-900/20 to-black p-6">
            <div 
              className="transition-opacity duration-500"
            >
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarFallback className="bg-blue-700">{testimonials[activeIndex].avatar}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-bold text-white">{testimonials[activeIndex].name}</p>
                  <p className="text-sm text-blue-400">{testimonials[activeIndex].role}</p>
                </div>
              </div>
              <p className="text-blue-100">{testimonials[activeIndex].content}</p>
            </div>
          </div>
          
          {/* Pagination Dots */}
          <div className="flex justify-center mt-6 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full ${index === activeIndex ? 'bg-blue-500' : 'bg-blue-800'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
