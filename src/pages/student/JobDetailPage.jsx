// src/pages/student/JobDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Building, Calendar, 
  DollarSign, Globe, BriefcaseBusiness, 
  Mail, Phone, Linkedin, ExternalLink,
  Bookmark, BookmarkCheck, Share2, User
} from 'lucide-react';

// Layout Components
import DashboardLayout from '../../components/layout/DashboardLayout';
import apiService from '../../services/api';

// Mock Data para uma vaga específica
const mockJobDetail = {
  id: 1,
  title: 'Desenvolvedor Front-end React',
  company: 'TechSolutions',
  companyLogo: '/src/assets/images/company-logos/techsolutions.svg',
  location: 'São Paulo, SP',
  locationType: 'HYBRID',
  level: 'JUNIOR',
  salary: 'R$ 4.000 - R$ 6.000',
  skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
  description: `Estamos procurando um desenvolvedor front-end talentoso para se juntar à nossa equipe de tecnologia em rápido crescimento na TechSolutions.

Como Desenvolvedor Front-end, você será responsável por implementar interfaces de usuário responsivas e interativas para nossos produtos digitais, trabalhando em estreita colaboração com designers, desenvolvedores back-end e gerentes de produto.

**Responsabilidades:**
- Desenvolver interfaces de usuário responsivas e modernas utilizando React e tecnologias relacionadas
- Colaborar com designers para implementar UI/UX de alta qualidade
- Otimizar aplicações para máxima velocidade e escalabilidade
- Manter e melhorar código existente
- Participar de revisões de código e compartilhar conhecimento com a equipe

**Requisitos:**
- Experiência com desenvolvimento em React.js
- Conhecimento sólido de JavaScript moderno (ES6+)
- Familiaridade com HTML5, CSS3 e pré-processadores CSS (SASS/LESS)
- Experiência com controle de versão Git
- Boa comunicação e trabalho em equipe

**Diferenciais:**
- Conhecimento de TypeScript
- Experiência com Redux ou Context API
- Compreensão de princípios de design responsivo
- Experiência com testes automatizados (Jest, React Testing Library)`,
  benefits: 'Vale Refeição, Vale Transporte, Plano de Saúde, Gympass, Horário Flexível, Ambiente de trabalho descontraído, Plano de carreira',
  contactEmail: 'jobs@techsolutions.com',
  contactPhone: '(11) 98765-4321',
  contactLinkedin: 'https://linkedin.com/company/techsolutions',
  contactWebsite: 'https://techsolutions.com/careers',
  contactInstructions: 'Envie seu currículo para o email acima com o assunto "Vaga Front-end React" ou candidate-se diretamente pelo nosso site.',
  postedAt: new Date('2025-04-02'),
  isBookmarked: false,
  hasApplied: false
};

const JobDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Em uma aplicação real, aqui você faria a chamada à API
        // const response = await apiService.jobs.getById(id);
        // setJob(response.data);
        
        // Usando dados mock para demonstração
        setTimeout(() => {
          setJob(mockJobDetail);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Não foi possível carregar os detalhes da vaga. Por favor, tente novamente.');
        setLoading(false);
      }
    };
    
    fetchJobDetail();
  }, [id]);
  
  const toggleBookmark = () => {
    setJob(prev => ({ ...prev, isBookmarked: !prev.isBookmarked }));
    
    // Em uma aplicação real, aqui você faria a chamada à API
    // if (job.isBookmarked) {
    //   apiService.students.removeFromSaved(id);
    // } else {
    //   apiService.students.addToSaved(id);
    // }
  };
  
  const handleApply = async () => {
    try {
      // Em uma aplicação real, aqui você faria a chamada à API
      // await apiService.jobs.apply(id);
      
      setJob(prev => ({ ...prev, hasApplied: true }));
      alert('Sua candidatura foi enviada com sucesso!');
    } catch (error) {
      console.error('Error applying to job:', error);
      alert('Ocorreu um erro ao enviar sua candidatura. Por favor, tente novamente.');
    }
  };
  
  // Formatação da data
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };
  
  // Rótulos de nível
  const levelLabels = {
    JUNIOR: { label: 'Júnior', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    PLENO: { label: 'Pleno', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    SENIOR: { label: 'Sênior', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' }
  };
  
  // Rótulos de tipo de localização
  const locationTypeLabels = {
    REMOTE: { label: 'Remoto', icon: <Globe className="w-5 h-5 mr-2" /> },
    HYBRID: { label: 'Híbrido', icon: <MapPin className="w-5 h-5 mr-2" /> },
    ONSITE: { label: 'Presencial', icon: <BriefcaseBusiness className="w-5 h-5 mr-2" /> }
  };
  
  // Formatar a descrição para renderizar markdown simples
  const formatDescription = (text) => {
    if (!text) return '';
    
    // Converter quebras de linha em parágrafos
    const paragraphs = text.split('\n\n');
    
    return paragraphs.map((paragraph, index) => {
      // Detectar cabeçalhos com **
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <h3 key={index} className="font-bold text-lg mt-4 mb-2">
            {paragraph.replace(/\*\*/g, '')}
          </h3>
        );
      }
      
      // Processar negrito dentro de parágrafos
      const processedText = paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      
      // Detectar listas com -
      if (paragraph.includes('\n- ')) {
        const [listTitle, ...items] = paragraph.split('\n- ');
        return (
          <div key={index} className="mb-4">
            {listTitle && <p dangerouslySetInnerHTML={{ __html: listTitle }} className="mb-2" />}
            <ul className="list-disc pl-5 space-y-1">
              {items.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>
        );
      }
      
      return (
        <p key={index} dangerouslySetInnerHTML={{ __html: processedText }} className="mb-4" />
      );
    });
  };
  
  // Compartilhar vaga
  const shareJob = () => {
    if (navigator.share) {
      navigator.share({
        title: job.title,
        text: `Vaga de ${job.title} na ${job.company}`,
        url: window.location.href,
      })
      .catch((error) => console.log('Error sharing', error));
    } else {
      // Fallback para navegadores que não suportam a Web Share API
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Link copiado para a área de transferência!'))
        .catch(err => console.error('Erro ao copiar link:', err));
    }
  };
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-12 w-12 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-text-muted-light dark:text-text-muted-dark">Carregando detalhes da vaga...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  if (error) {
    return (
      <DashboardLayout>
        <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-8 text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-2">Erro</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark mb-4">{error}</p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Voltar
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!job) {
    return (
      <DashboardLayout>
        <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Vaga não encontrada</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark mb-4">A vaga que você está procurando não existe ou foi removida.</p>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Voltar para o Dashboard
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      {/* Botão voltar e ações */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center text-text-light dark:text-text-dark hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span>Voltar</span>
        </button>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={toggleBookmark}
            className="flex items-center text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
          >
            {job.isBookmarked ? (
              <>
                <BookmarkCheck className="w-5 h-5 mr-1 fill-primary text-primary" />
                <span className="text-primary">Salvo</span>
              </>
            ) : (
              <>
                <Bookmark className="w-5 h-5 mr-1" />
                <span>Salvar</span>
              </>
            )}
          </button>
          
          <button
            onClick={shareJob}
            className="flex items-center text-text-muted-light dark:text-text-muted-dark hover:text-primary transition-colors"
          >
            <Share2 className="w-5 h-5 mr-1" />
            <span>Compartilhar</span>
          </button>
        </div>
      </div>
      
      {/* Cabeçalho da vaga */}
      <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col md:flex-row">
          {/* Logo da empresa */}
          <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
            <div className="w-20 h-20 bg-gray-100 dark:bg-secondary-light rounded-lg flex items-center justify-center">
              {/* Aqui você usaria a imagem da empresa */}
              <span className="font-bold text-2xl text-primary">
                {job.company.charAt(0)}
              </span>
            </div>
          </div>
          
          {/* Informações da vaga */}
          <div className="flex-grow">
            <h1 className="text-2xl font-bold mb-2">{job.title}</h1>
            
            <div className="flex flex-wrap items-center text-text-muted-light dark:text-text-muted-dark text-sm mb-4">
              <span className="flex items-center mr-4 mb-2">
                <Building className="w-5 h-5 mr-1" />
                {job.company}
              </span>
              
              <span className="flex items-center mr-4 mb-2">
                {locationTypeLabels[job.locationType].icon}
                {job.location}
              </span>
              
              <span className="flex items-center mr-4 mb-2">
                <Calendar className="w-5 h-5 mr-1" />
                Publicada em {formatDate(job.postedAt)}
              </span>
              
              <span className="flex items-center mb-2">
                <DollarSign className="w-5 h-5 mr-1" />
                {job.salary}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-5">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${levelLabels[job.level].color}`}>
                {levelLabels[job.level].label}
              </span>
              
              <span className="px-3 py-1 bg-gray-100 dark:bg-secondary-light rounded-full text-sm flex items-center">
                {locationTypeLabels[job.locationType].label}
              </span>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {job.skills.map(skill => (
                <span 
                  key={skill} 
                  className="px-3 py-1 bg-gray-100 dark:bg-secondary-light rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          
          {/* Botão de candidatura */}
          <div className="mt-6 md:mt-0 md:ml-6 md:self-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleApply}
              disabled={job.hasApplied}
              className={`px-6 py-3 rounded-lg transition-colors flex items-center ${
                job.hasApplied 
                  ? 'bg-green-600 cursor-not-allowed' 
                  : 'bg-primary hover:bg-primary-dark'
              } text-white`}
            >
              <User className="w-5 h-5 mr-2" />
              {job.hasApplied ? 'Candidatura Enviada' : 'Candidatar-se'}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Conteúdo da vaga */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Descrição e detalhes */}
        <div className="md:col-span-2 space-y-6">
          {/* Descrição */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Descrição da Vaga</h2>
            <div className="prose prose-sm max-w-none dark:prose-invert">
              {formatDescription(job.description)}
            </div>
          </div>
          
          {/* Benefícios */}
          {job.benefits && (
            <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-4">Benefícios</h2>
              <div className="flex flex-wrap gap-2">
                {job.benefits.split(',').map((benefit, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 rounded-full text-sm"
                  >
                    {benefit.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Barra lateral */}
        <div className="space-y-6">
          {/* Informações de contato */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Informações de Contato</h2>
            
            <div className="space-y-4">
              {job.contactEmail && (
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Email</h3>
                    <a 
                      href={`mailto:${job.contactEmail}`} 
                      className="text-primary hover:underline"
                    >
                      {job.contactEmail}
                    </a>
                  </div>
                </div>
              )}
              
              {job.contactPhone && (
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Telefone</h3>
                    <a 
                      href={`tel:${job.contactPhone.replace(/[^0-9]/g, '')}`} 
                      className="text-primary hover:underline"
                    >
                      {job.contactPhone}
                    </a>
                  </div>
                </div>
              )}
              
              {job.contactLinkedin && (
                <div className="flex items-start">
                  <Linkedin className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">LinkedIn</h3>
                    <a 
                      href={job.contactLinkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center"
                    >
                      Perfil da Empresa
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              )}
              
              {job.contactWebsite && (
                <div className="flex items-start">
                  <Globe className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-medium">Website</h3>
                    <a 
                      href={job.contactWebsite} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline flex items-center"
                    >
                      Carreiras
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  </div>
                </div>
              )}
              
              {job.contactInstructions && (
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-secondary-light">
                  <h3 className="text-sm font-medium mb-2">Instruções para Contato</h3>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                    {job.contactInstructions}
                  </p>
                </div>
              )}
            </div>
          </div>
          
          {/* Sobre a empresa */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Sobre a Empresa</h2>
            
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-100 dark:bg-secondary-light rounded-lg flex items-center justify-center mr-3">
                <span className="font-bold text-xl text-primary">
                  {job.company.charAt(0)}
                </span>
              </div>
              <div>
                <h3 className="font-medium">{job.company}</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Tecnologia
                </p>
              </div>
            </div>
            
            <p className="text-sm text-text-light dark:text-text-dark mb-4">
              A TechSolutions é uma empresa de tecnologia focada em criar soluções inovadoras para os desafios do mundo digital.
            </p>
            
            <a 
              href="#" 
              className="text-primary hover:underline flex items-center text-sm"
            >
              Ver perfil da empresa
              <ArrowRight className="w-4 h-4 ml-1" />
            </a>
          </div>
          
          {/* Vagas similares */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Vagas Similares</h2>
            
            <div className="space-y-4">
              <div className="border-b border-gray-200 dark:border-secondary-light pb-3 mb-3">
                <h3 className="font-medium">Desenvolvedor Frontend Vue.js</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  Viewtify · Remoto
                </p>
              </div>
              
              <div className="border-b border-gray-200 dark:border-secondary-light pb-3 mb-3">
                <h3 className="font-medium">Desenvolvedor React Junior</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  AppMasters · São Paulo, SP
                </p>
              </div>
              
              <div>
                <h3 className="font-medium">Desenvolvedor Frontend Angular</h3>
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
                  InnovateTech · Remoto
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobDetailPage;