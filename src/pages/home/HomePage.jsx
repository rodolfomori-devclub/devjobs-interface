// src/pages/home/HomePage.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  const canvasRef = useRef(null);

  // Efeito Networking
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let mouse = {
      x: null,
      y: null,
      radius: 150,
    };

    // Configuração do canvas para tela cheia
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Rastreamento do mouse
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.x;
      mouse.y = e.y;
    });

    // Criação das partículas
    const initParticles = () => {
      particles = [];
      const numberOfParticles = Math.min(Math.floor(canvas.width * canvas.height / 8000), 150);
      
      for (let i = 0; i < numberOfParticles; i++) {
        const size = Math.random() * 3 + 1;
        const x = Math.random() * (canvas.width - size * 2);
        const y = Math.random() * (canvas.height - size * 2);
        const directionX = Math.random() * 0.5 - 0.25;
        const directionY = Math.random() * 0.5 - 0.25;
        const color = '#37E359';
        
        particles.push({
          x, y, directionX, directionY, size, color
        });
      }
    };

    // Desenho e animação das partículas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Atualize e desenhe cada partícula
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Movimento da partícula
        p.x += p.directionX;
        p.y += p.directionY;
        
        // Verificação de limites
        if (p.x < 0 || p.x > canvas.width) p.directionX *= -1;
        if (p.y < 0 || p.y > canvas.height) p.directionY *= -1;
        
        // Verificação de colisão com o mouse
        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < mouse.radius) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (mouse.radius - distance) / mouse.radius;
          
          p.directionX -= forceDirectionX * force * 0.6;
          p.directionY -= forceDirectionY * force * 0.6;
        }
        
        // Desenhar partícula
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
        
        // Conectar com partículas próximas
        connectParticles(p, i);
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    // Função para conectar partículas próximas
    const connectParticles = (p, index) => {
      for (let j = index + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(55, 227, 89, ${1 - distance / 120})`;
          ctx.lineWidth = 0.5;
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    };
    
    animate();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', () => {});
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      {/* Canvas para o efeito Networking */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 z-0"
      />
      
      <div className="relative z-10">
        <Navbar />
        
        <main className="container mx-auto px-4 py-10">
          {/* Hero Section */}
          <section className="flex flex-col items-center justify-center min-h-[80vh] text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-6xl font-bold mb-4">
                <span className="text-primary">Dev</span>Jobs
              </h1>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Conectando <span className="text-primary">talentos</span> e <span className="text-primary">oportunidades</span>
              </h2>
              <p className="text-xl mb-8 text-text-muted-light dark:text-text-muted-dark max-w-2xl mx-auto">
                A plataforma exclusiva que une os alunos do DevClub às melhores empresas de tecnologia do mercado.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link to="/cadastro/aluno">
                  <motion.button
                    whileHover={{ scale: 1.05, boxShadow: '0 0 10px #37E359' }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary flex items-center justify-center gap-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg transition-all"
                  >
                    Sou Aluno DevClub <ArrowRight size={20} />
                  </motion.button>
                </Link>
                
                <Link to="/cadastro/empresa">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-secondary flex items-center justify-center gap-2 bg-secondary text-white font-semibold px-6 py-3 rounded-lg transition-all border border-primary"
                  >
                    Sou Empresa <ArrowRight size={20} />
                  </motion.button>
                </Link>
              </div>
            </motion.div>
          </section>
          
          {/* Seção de benefícios */}
          <section className="py-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-secondary-light p-6 rounded-xl shadow-lg hover:shadow-neon transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Vagas Exclusivas</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Acesso a oportunidades selecionadas especificamente para alunos do DevClub.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-secondary-light p-6 rounded-xl shadow-lg hover:shadow-neon transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Destaque seu Talento</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Apresente suas habilidades e projetos em um perfil otimizado para recrutadores.
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="bg-white dark:bg-secondary-light p-6 rounded-xl shadow-lg hover:shadow-neon transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Networking</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Conecte-se diretamente com empresas e recrutadores em busca de talentos como você.
                </p>
              </motion.div>
            </div>
          </section>
          
          {/* Como funciona */}
          <section className="py-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-center mb-16"
            >
              Como <span className="text-primary">DevJobs</span> funciona
            </motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center md:items-end"
              >
                <div className="w-64 h-64 relative mb-8">
                  <div className="w-full h-full bg-primary/10 rounded-full absolute animate-pulse-slow"></div>
                  <img 
                    src="/src/assets/images/student-illustration.svg" 
                    alt="Aluno DevClub" 
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center md:text-right">Para Alunos</h3>
                <ul className="space-y-3 text-right">
                  <li className="flex items-center justify-end gap-2">
                    <span>Crie seu perfil profissional</span>
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">1</div>
                  </li>
                  <li className="flex items-center justify-end gap-2">
                    <span>Destaque suas habilidades técnicas</span>
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">2</div>
                  </li>
                  <li className="flex items-center justify-end gap-2">
                    <span>Candidate-se às vagas exclusivas</span>
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">3</div>
                  </li>
                  <li className="flex items-center justify-end gap-2">
                    <span>Conecte-se com empresas de tecnologia</span>
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white">4</div>
                  </li>
                </ul>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex flex-col items-center md:items-start"
              >
                <div className="w-64 h-64 relative mb-8">
                  <div className="w-full h-full bg-secondary/10 rounded-full absolute animate-pulse-slow"></div>
                  <img 
                    src="/src/assets/images/company-illustration.svg" 
                    alt="Empresa" 
                    className="w-full h-full object-contain relative z-10"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-center md:text-left">Para Empresas</h3>
                <ul className="space-y-3 text-left">
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white">1</div>
                    <span>Cadastre sua empresa na plataforma</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white">2</div>
                    <span>Publique suas vagas de forma detalhada</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white">3</div>
                    <span>Encontre talentos filtrados por habilidades</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center text-white">4</div>
                    <span>Contrate alunos qualificados do DevClub</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </section>
          
          {/* CTA */}
          <section className="py-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-secondary to-secondary-light p-12 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10">
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
                <div className="absolute right-0 top-0 w-64 h-64 bg-primary rounded-full blur-3xl"></div>
              </div>
              
              <div className="relative z-10 text-center">
                <h2 className="text-4xl font-bold mb-4 text-white">Pronto para iniciar sua jornada?</h2>
                <p className="text-xl mb-8 text-text-muted-dark max-w-2xl mx-auto">
                  Junte-se aos milhares de alunos e empresas que já estão conectados através da DevJobs.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                  <Link to="/cadastro/aluno">
                    <motion.button
                      whileHover={{ scale: 1.05, boxShadow: '0 0 10px #37E359' }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary flex items-center justify-center gap-2 bg-primary text-white font-semibold px-8 py-4 rounded-lg transition-all"
                    >
                      Começar agora <ArrowRight size={20} />
                    </motion.button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </section>
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;