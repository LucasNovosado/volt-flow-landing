
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Instagram, Twitter, Facebook, Send, ArrowUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  const footerRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate social icons
      const icons = iconsRef.current?.querySelectorAll('.social-icon');
      icons?.forEach((icon, index) => {
        gsap.from(icon, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: 0.1 * index,
          ease: "back.out"
        });
      });
      
      // Glowing pulse animation
      gsap.to('.footer-glow', {
        opacity: 0.5,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }, footerRef);
    
    return () => ctx.revert();
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer 
      ref={footerRef}
      className="bg-black py-16 relative overflow-hidden"
    >
      {/* Background elements */}
      <div className="footer-glow absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/2 h-32 bg-blue-500 opacity-20 rounded-full" style={{ filter: 'blur(80px)' }}></div>
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">BATS ENERGY</h2>
            <p className="text-blue-300 mb-6">
              O futuro da energia está aqui. Experimente e revolucione sua performance diária.
            </p>
            <div 
              ref={iconsRef}
              className="flex space-x-4"
            >
              <a href="#" className="social-icon w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center transition-colors hover:bg-blue-800">
                <Instagram className="w-5 h-5 text-blue-300" />
              </a>
              <a href="#" className="social-icon w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center transition-colors hover:bg-blue-800">
                <Twitter className="w-5 h-5 text-blue-300" />
              </a>
              <a href="#" className="social-icon w-10 h-10 rounded-full bg-blue-900/50 flex items-center justify-center transition-colors hover:bg-blue-800">
                <Facebook className="w-5 h-5 text-blue-300" />
              </a>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Links Rápidos</h3>
            <ul className="space-y-3 text-blue-300">
              <li>
                <a href="#" className="hover:text-blue-100 transition-colors">Sobre Nós</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-100 transition-colors">Nossa Fórmula</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-100 transition-colors">Onde Comprar</a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-100 transition-colors">Contato</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Fique por dentro</h3>
            <p className="text-blue-300 mb-4">
              Receba novidades, promoções e conteúdos exclusivos.
            </p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Seu e-mail" 
                className="bg-blue-900/20 border-blue-800 text-blue-100 focus:border-blue-500"
              />
              <Button type="submit" variant="default" className="ml-2 px-4 bg-blue-600 hover:bg-blue-500">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center mt-16 pt-6 border-t border-blue-900/50">
          <p className="text-blue-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} BATS Energy. Todos os direitos reservados.
          </p>
          <Button 
            onClick={scrollToTop} 
            variant="outline" 
            size="icon" 
            className="w-10 h-10 rounded-full border-blue-800 text-blue-400 hover:bg-blue-900/30"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
