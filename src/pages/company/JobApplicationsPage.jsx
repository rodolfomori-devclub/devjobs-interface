// src/pages/company/JobApplicationsPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, User, Search, Filter, ChevronDown, 
  X, Star, Download, Mail, Phone, 
  ExternalLink, Clock, MessageSquare,
  CheckCircle, XCircle
} from 'lucide-react';

// Layout Components
import DashboardLayout from '../../components/layout/DashboardLayout';
import apiService from '../../services/api';

// Mock Data
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
  description: 'Estamos procurando um desenvolvedor front-end para trabalhar em nossos projetos web utilizando React e tecnologias relacionadas.',
  postedAt: new Date('2025-04-02'),
  applicationsCount: 12
};

const mockApplications = [
  {
    id: 1,
    studentId: 1,
    name: 'João Silva',
    role: 'Desenvolvedor Front-end',
    location: 'São Paulo, SP',
    avatar: null,
    email: 'joao.silva@email.com',
    phone: '(11) 98765-4321',
    skills: [
      { name: 'React', level: 4 },
      { name: 'JavaScript', level: 5 },
      { name: 'HTML', level: 5 },
      { name: 'CSS', level: 4 },
      { name: 'TypeScript', level: 3 }
    ],
    links: {
      github: 'https://github.com/joaosilva',
      linkedin: 'https://linkedin.com/in/joaosilva',
      portfolio: 'https://joaosilva.dev'
    },
    resume: {
      filename: 'joaosilva_cv.pdf',
      url: '/path/to/joaosilva_cv.pdf'
    },
    appliedAt: new Date('2025-04-03T14:32:00'),
    status: 'UNDER_REVIEW', // UNDER_REVIEW, APPROVED, REJECTED
    highlight: true
  },
  {
    id: 2,
    studentId: 2,
    name: 'Maria Oliveira',
    role: 'Desenvolvedora Full Stack',
    location: 'Remoto',
    avatar: null,
    email: 'maria.oliveira@email.com',
    phone: '(21) 98765-4321',
    skills: [
      { name: 'React', level: 3 },
      { name: 'Node.js', level: 4 },
      { name: 'JavaScript', level: 4 },
      { name: 'MongoDB', level: 3 },
      { name: 'Express', level: 3 }
    ],
    links: {
      github: 'https://github.com/mariaoliveira',
      linkedin: 'https://linkedin.com/in/mariaoliveira',
      portfolio: null
    },
    resume: {
      filename: 'maria_cv.pdf',
      url: '/path/to/maria_cv.pdf'
    },
    appliedAt: new Date('2025-04-04T09:15:00'),
    status: 'APPROVED',
    highlight: false
  },
  {
    id: 3,
    studentId: 3,
    name: 'Pedro Santos',
    role: 'Desenvolvedor Frontend Junior',
    location: 'Rio de Janeiro, RJ',
    avatar: null,
    email: 'pedro.santos@email.com',
    phone: '(21) 99876-5432',
    skills: [
      { name: 'HTML', level: 4 },
      { name: 'CSS', level: 4 },
      { name: 'JavaScript', level: 3 },
      { name: 'React', level: 2 },
      { name: 'Git', level: 3 }
    ],
    links: {
      github: 'https://github.com/pedrosantos',
      linkedin: 'https://linkedin.com/in/pedrosantos',
      portfolio: 'https://pedrosantos.dev'
    },
    resume: {
      filename: 'pedro_cv.pdf',
      url: '/path/to/pedro_cv.pdf'
    },
    appliedAt: new Date('2025-04-05T16:45:00'),
    status: 'REJECTED',
    highlight: false
  },
  {
    id: 4,
    studentId: 4,
    name: 'Ana Souza',
    role: 'Desenvolvedora Frontend',
    location: 'Belo Horizonte, MG',
    avatar: null,
    email: 'ana.souza@email.com',
    phone: '(31) 99765-4321',
    skills: [
      { name: 'React', level: 4 },
      { name: 'JavaScript', level: 4 },
      { name: 'HTML', level: 5 },
      { name: 'CSS', level: 5 },
      { name: 'Figma', level: 4 }
    ],
    links: {
      github: 'https://github.com/anasouza',
      linkedin: 'https://linkedin.com/in/anasouza',
      portfolio: 'https://anasouza.design'
    },
    resume: {
      filename: 'ana_cv.pdf',
      url: '/path/to/ana_cv.pdf'
    },
    appliedAt: new Date('2025-04-05T10:30:00'),
    status: 'UNDER_REVIEW',
    highlight: true
  }
];

const JobApplicationsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados de filtro
  const [filters, setFilters] = useState({
    status: [],
    skills: [],
    highlight: false
  });
  
  // Obter todas as habilidades únicas
  const allSkills = [...new Set(
    mockApplications.flatMap(application => 
      application.skills.map(skill => skill.name)
    )
  )].sort();
  
  // Carregar dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Em uma aplicação real, aqui você faria as chamadas à API
        // const [jobResponse, applicationsResponse] = await Promise.all([
        //   apiService.jobs.getById(id),
        //   apiService.companies.getJobApplications(id)
        // ]);
        // setJob(jobResponse.data);
        // setApplications(applicationsResponse.data);
        
        // Usando dados mock para demonstração
        setTimeout(() => {
          setJob(mockJobDetail);
          setApplications(mockApplications);
          setFilteredApplications(mockApplications);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Não foi possível carregar os dados. Por favor, tente novamente.');
        setLoading(false);
      }
    };
    
    fetchData();
  }, [id]);
  
  // Aplicar filtros e pesquisa
  useEffect(() => {
    if (!applications.length) return;
    
    let result = [...applications];
    
    // Aplicar termo de pesquisa
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(application => 
        application.name.toLowerCase().includes(searchLower) || 
        application.role.toLowerCase().includes(searchLower) ||
        application.skills.some(skill => skill.name.toLowerCase().includes(searchLower))
      );
    }
    
    // Aplicar filtro de status
    if (filters.status.length > 0) {
      result = result.filter(application => filters.status.includes(application.status));
    }
    
    // Aplicar filtro de habilidades
    if (filters.skills.length > 0) {
      result = result.filter(application => 
        filters.skills.some(skill => 
          application.skills.some(s => s.name === skill)
        )
      );
    }
    
    // Aplicar filtro de destaque
    if (filters.highlight) {
      result = result.filter(application => application.highlight);
    }
    
    setFilteredApplications(result);
  }, [searchTerm, filters, applications]);
  
  // Selecionar candidatura para visualização detalhada
  const handleSelectApplication = (application) => {
    setSelectedApplication(application);
  };
  
  // Atualizar status da candidatura
  const updateApplicationStatus = async (applicationId, newStatus) => {
    try {
      // Em uma aplicação real, aqui você faria a chamada à API
      // await apiService.companies.updateApplicationStatus(jobId, applicationId, newStatus);
      
      // Atualizar o estado local
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
      
      setSelectedApplication(prev => 
        prev?.id === applicationId ? { ...prev, status: newStatus } : prev
      );
      
      // Mostrar mensagem de sucesso
      alert(`Status da candidatura atualizado para ${
        newStatus === 'APPROVED' ? 'Aprovado' : 
        newStatus === 'REJECTED' ? 'Rejeitado' : 
        'Em Análise'
      }`);
    } catch (error) {
      console.error('Error updating application status:', error);
      alert('Ocorreu um erro ao atualizar o status da candidatura. Por favor, tente novamente.');
    }
  };
  
  // Alternar destaque da candidatura
  const toggleHighlight = async (applicationId) => {
    try {
      // Em uma aplicação real, aqui você faria a chamada à API
      // await apiService.companies.toggleApplicationHighlight(jobId, applicationId);
      
      // Atualizar o estado local
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId ? { ...app, highlight: !app.highlight } : app
        )
      );
      
      setSelectedApplication(prev => 
        prev?.id === applicationId ? { ...prev, highlight: !prev.highlight } : prev
      );
    } catch (error) {
      console.error('Error toggling application highlight:', error);
      alert('Ocorreu um erro ao destacar/remover destaque da candidatura. Por favor, tente novamente.');
    }
  };
  
  // Manipuladores de filtro
  const toggleStatusFilter = (status) => {
    setFilters(prev => {
      const statusArray = prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status];
        
      return { ...prev, status: statusArray };
    });
  };
  
  const toggleSkillFilter = (skill) => {
    setFilters(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
        
      return { ...prev, skills };
    });
  };
  
  const toggleHighlightFilter = () => {
    setFilters(prev => ({
      ...prev,
      highlight: !prev.highlight
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      status: [],
      skills: [],
      highlight: false
    });
    setSearchTerm('');
  };
  
  // Formatação da data
  const formatDate = (date) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('pt-BR', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  // Componente para exibir o status com cor
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      UNDER_REVIEW: { label: 'Em Análise', class: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
      APPROVED: { label: 'Aprovado', class: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
      REJECTED: { label: 'Rejeitado', class: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300' }
    };
    
    const config = statusConfig[status] || statusConfig.UNDER_REVIEW;
    
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.class}`}>
        {config.label}
      </span>
    );
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
            <p className="text-text-muted-light dark:text-text-muted-dark">Carregando candidaturas...</p>
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
      {/* Botão voltar e título */}
      <div className="flex items-center mb-6">
        <button 
          onClick={() => navigate(-1)} 
          className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Candidaturas</h1>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            {job.title} - {applications.length} candidatos
          </p>
        </div>
      </div>
      
      {/* Container principal */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Coluna da esquerda - Lista de candidatos */}
        <div className="lg:col-span-1 bg-white dark:bg-secondary-dark rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-secondary-light">
            {/* Barra de pesquisa */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
              </div>
              <input
                type="text"
                placeholder="Buscar candidatos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-secondary-light focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light"
              />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted-light dark:text-text-muted-dark hover:text-red-500"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            
            {/* Botão de filtro */}
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-secondary-light rounded-lg hover:bg-gray-200 dark:hover:bg-secondary transition-colors"
            >
              <div className="flex items-center">
                <Filter className="w-5 h-5 mr-2" />
                <span>Filtros</span>
              </div>
              <ChevronDown className={`w-5 h-5 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
            </button>
            
            {/* Área de filtros */}
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-secondary-light"
              >
                <div className="space-y-4">
                  {/* Filtro de Status */}
                  <div>
                    <h3 className="font-medium mb-2">Status</h3>
                    <div className="space-y-2">
                      {['UNDER_REVIEW', 'APPROVED', 'REJECTED'].map((status) => (
                        <label key={status} className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={filters.status.includes(status)}
                            onChange={() => toggleStatusFilter(status)}
                            className="w-4 h-4 mr-2 text-primary rounded focus:ring-primary"
                          />
                          <StatusBadge status={status} />
                        </label>
                      ))}
                    </div>
                  </div>
                  
                  {/* Filtro de Destaque */}
                  <div>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.highlight}
                        onChange={toggleHighlightFilter}
                        className="w-4 h-4 mr-2 text-primary rounded focus:ring-primary"
                      />
                      <span className="font-medium">Apenas Destacados</span>
                    </label>
                  </div>
                  
                  {/* Filtro de Habilidades */}
                  <div>
                    <h3 className="font-medium mb-2">Habilidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {allSkills.slice(0, 10).map((skill) => (
                        <button
                          key={skill}
                          onClick={() => toggleSkillFilter(skill)}
                          className={`px-3 py-1 rounded-full text-xs ${
                            filters.skills.includes(skill)
                              ? 'bg-primary text-white'
                              : 'bg-gray-100 dark:bg-secondary-light text-text-light dark:text-text-dark hover:bg-gray-200 dark:hover:bg-secondary'
                          } transition-colors`}
                        >
                          {skill}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* Botão de limpar filtros */}
                  <div className="pt-2 flex justify-between">
                    <button
                      onClick={clearFilters}
                      className="text-text-muted-light dark:text-text-muted-dark hover:text-primary flex items-center text-sm"
                    >
                      <X className="w-4 h-4 mr-1" /> Limpar Filtros
                    </button>
                    
                    <div className="text-text-muted-light dark:text-text-muted-dark text-sm">
                      {filteredApplications.length} {filteredApplications.length === 1 ? 'candidato' : 'candidatos'}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Lista de candidatos */}
          <div className="divide-y divide-gray-200 dark:divide-secondary-light max-h-[calc(100vh-320px)] overflow-y-auto">
            {filteredApplications.length > 0 ? (
              filteredApplications.map(application => (
                <div 
                  key={application.id} 
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-secondary cursor-pointer transition-colors ${
                    selectedApplication?.id === application.id ? 'bg-gray-50 dark:bg-secondary' : ''
                  } ${application.highlight ? 'border-l-4 border-primary' : ''}`}
                  onClick={() => handleSelectApplication(application)}
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
                      {application.avatar ? (
                        <img 
                          src={application.avatar} 
                          alt={application.name} 
                          className="w-full h-full rounded-full object-cover" 
                        />
                      ) : (
                        <User className="w-5 h-5 text-primary" />
                      )}
                    </div>
                    
                    <div className="flex-grow min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-medium truncate">{application.name}</h3>
                        <StatusBadge status={application.status} />
                      </div>
                      
                      <p className="text-sm text-text-muted-light dark:text-text-muted-dark truncate">
                        {application.role}
                      </p>
                      
                      <div className="flex flex-wrap mt-1">
                        {application.skills.slice(0, 3).map((skill, index) => (
                          <span 
                            key={index} 
                            className="mr-1 mb-1 px-2 py-0.5 bg-gray-100 dark:bg-secondary-light rounded-full text-xs truncate">
                            {skill.name}
                          </span>
                        ))}
                        
                        {application.skills.length > 3 && (
                          <span className="px-1 text-xs text-text-muted-light dark:text-text-muted-dark">
                            +{application.skills.length - 3}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">
                        <Clock className="w-3 h-3 mr-1" />
                        Candidatou-se em {formatDate(application.appliedAt)}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-8 text-center">
                <User className="w-12 h-12 mx-auto text-text-muted-light dark:text-text-muted-dark mb-2" />
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Nenhum candidato encontrado
                </p>
                {(searchTerm || filters.status.length > 0 || filters.skills.length > 0 || filters.highlight) && (
                  <button
                    onClick={clearFilters}
                    className="mt-2 text-primary hover:underline text-sm"
                  >
                    Limpar filtros
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Coluna da direita - Detalhes do candidato */}
        <div className="lg:col-span-2">
          {selectedApplication ? (
            <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md">
              {/* Cabeçalho do perfil */}
              <div className="p-6 border-b border-gray-200 dark:border-secondary-light">
                <div className="flex justify-between items-start">
                  <div className="flex items-start">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      {selectedApplication.avatar ? (
                        <img 
                          src={selectedApplication.avatar} 
                          alt={selectedApplication.name} 
                          className="w-full h-full rounded-full object-cover" 
                        />
                      ) : (
                        <User className="w-8 h-8 text-primary" />
                      )}
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-bold">{selectedApplication.name}</h2>
                      <p className="text-text-muted-light dark:text-text-muted-dark">
                        {selectedApplication.role}
                      </p>
                      <p className="text-sm flex items-center mt-1">
                        <MapPin className="w-4 h-4 mr-1" />
                        {selectedApplication.location}
                      </p>
                    </div>
                  </div>
                  
                  {/* Status e Ações */}
                  <div className="text-right">
                    <StatusBadge status={selectedApplication.status} />
                    
                    <div className="mt-3 flex space-x-2 justify-end">
                      {/* Botão de destacar */}
                      <button
                        onClick={() => toggleHighlight(selectedApplication.id)}
                        className={`px-3 py-1 rounded-lg text-xs flex items-center ${
                          selectedApplication.highlight
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}
                      >
                        {selectedApplication.highlight ? 'Remover Destaque' : 'Destacar'}
                      </button>
                      
                      {/* Botões de aprovação/rejeição */}
                      {selectedApplication.status === 'UNDER_REVIEW' && (
                        <>
                          <button
                            onClick={() => updateApplicationStatus(selectedApplication.id, 'APPROVED')}
                            className="px-3 py-1 bg-green-500 text-white rounded-lg text-xs flex items-center"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Aprovar
                          </button>
                          
                          <button
                            onClick={() => updateApplicationStatus(selectedApplication.id, 'REJECTED')}
                            className="px-3 py-1 bg-red-500 text-white rounded-lg text-xs flex items-center"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Rejeitar
                          </button>
                        </>
                      )}
                      
                      {/* Botão de redefinir status */}
                      {selectedApplication.status !== 'UNDER_REVIEW' && (
                        <button
                          onClick={() => updateApplicationStatus(selectedApplication.id, 'UNDER_REVIEW')}
                          className="px-3 py-1 bg-blue-500 text-white rounded-lg text-xs flex items-center"
                        >
                          Redefinir
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Conteúdo do perfil */}
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Coluna da esquerda */}
                  <div className="space-y-6">
                    {/* Informações de contato */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Informações de Contato</h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium">Email</h4>
                            <a 
                              href={`mailto:${selectedApplication.email}`} 
                              className="text-primary hover:underline"
                            >
                              {selectedApplication.email}
                            </a>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="text-sm font-medium">Telefone</h4>
                            <a 
                              href={`tel:${selectedApplication.phone.replace(/[^0-9]/g, '')}`} 
                              className="text-primary hover:underline"
                            >
                              {selectedApplication.phone}
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Links */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Links</h3>
                      
                      <div className="space-y-3">
                        {selectedApplication.links.github && (
                          <a 
                            href={selectedApplication.links.github} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-primary hover:underline"
                          >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                            </svg>
                            GitHub
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        )}
                        
                        {selectedApplication.links.linkedin && (
                          <a 
                            href={selectedApplication.links.linkedin} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-primary hover:underline"
                          >
                            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                            </svg>
                            LinkedIn
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        )}
                        
                        {selectedApplication.links.portfolio && (
                          <a 
                            href={selectedApplication.links.portfolio} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-primary hover:underline"
                          >
                            <Globe className="w-5 h-5 mr-2" />
                            Portfólio
                            <ExternalLink className="w-3 h-3 ml-1" />
                          </a>
                        )}
                      </div>
                    </div>
                    
                    {/* Currículo */}
                    {selectedApplication.resume && (
                      <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-secondary-light rounded-lg">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-gray-100 dark:bg-secondary-light rounded-lg flex items-center justify-center mr-3">
                            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span className="truncate">{selectedApplication.resume.filename}</span>
                        </div>
                        <a 
                          href={selectedApplication.resume.url}
                          download
                          className="px-3 py-1 bg-primary text-white rounded-lg text-sm flex items-center"
                        >
                          <Download className="w-4 h-4 mr-1" />
                          Download
                        </a>
                      </div>
                    )}
                  </div>
                  
                  {/* Coluna da direita */}
                  <div className="space-y-6">
                    {/* Habilidades */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Habilidades</h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedApplication.skills.map((skill, index) => (
                          <div 
                            key={index} 
                            className="border border-gray-200 dark:border-secondary-light rounded-lg p-3"
                          >
                            <div className="flex justify-between items-center">
                              <h4>{skill.name}</h4>
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={16} 
                                    className={i < skill.level ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Botões de ação */}
                    <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-secondary-light">
                      <a 
                        href={`mailto:${selectedApplication.email}`}
                        className="w-full px-4 py-2 bg-white dark:bg-secondary border border-gray-300 dark:border-secondary-light rounded-lg text-center flex items-center justify-center"
                      >
                        <Mail className="w-5 h-5 mr-2" />
                        Enviar Email
                      </a>
                      
                      <button 
                        className="w-full px-4 py-2 bg-primary text-white rounded-lg text-center flex items-center justify-center"
                      >
                        <MessageSquare className="w-5 h-5 mr-2" />
                        Enviar Mensagem
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-12 text-center">
              <User className="w-16 h-16 text-text-muted-light dark:text-text-muted-dark mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Selecione um candidato</h3>
              <p className="text-text-muted-light dark:text-text-muted-dark max-w-md mx-auto">
                Selecione um candidato na lista à esquerda para visualizar seus detalhes e gerenciar sua candidatura.
              </p>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default JobApplicationsPage;