// src/pages/company/CompanyDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search, Plus, Filter, Users, 
  Award, MapPin, Globe, Calendar,
  BriefcaseBusiness, Check, Star, X,
  ChevronDown, ArrowUpRight, Download,
  Eye, Edit, Trash2
} from 'lucide-react';

// Layout Components
import DashboardLayout from '../../components/layout/DashboardLayout';
import apiService from '../../services/api';

// Mock Data - Alunos
const mockStudents = [
  {
    id: 1,
    name: 'João Silva',
    role: 'Desenvolvedor Front-end',
    avatar: null,
    location: 'São Paulo, SP',
    skills: [
      { name: 'React', level: 4 },
      { name: 'JavaScript', level: 5 },
      { name: 'HTML', level: 5 },
      { name: 'CSS', level: 4 },
      { name: 'TypeScript', level: 3 }
    ],
    bio: 'Desenvolvedor front-end apaixonado por criar interfaces bonitas e funcionais. Experiência com React, Angular e Vue.js.',
    isFreelancer: true,
    githubUrl: 'https://github.com/joaosilva',
    linkedinUrl: 'https://linkedin.com/in/joaosilva',
    resumeUrl: '/path/to/resume.pdf',
    portfolioUrl: 'https://joaosilva.dev',
    experiences: [
      {
        company: 'TechSolutions',
        role: 'Desenvolvedor Front-end Jr',
        startDate: '2023-01',
        endDate: null,
        current: true,
        description: 'Desenvolvimento de interfaces com React e TypeScript.'
      },
      {
        company: 'WebAgency',
        role: 'Estagiário de Desenvolvimento',
        startDate: '2022-03',
        endDate: '2022-12',
        current: false,
        description: 'Criação de sites responsivos com HTML, CSS e JavaScript.'
      }
    ]
  },
  {
    id: 2,
    name: 'Maria Oliveira',
    role: 'Desenvolvedora Back-end',
    avatar: null,
    location: 'Rio de Janeiro, RJ',
    skills: [
      { name: 'Node.js', level: 5 },
      { name: 'Express', level: 4 },
      { name: 'MongoDB', level: 4 },
      { name: 'PostgreSQL', level: 3 },
      { name: 'Docker', level: 3 }
    ],
    bio: 'Desenvolvedora back-end com experiência em APIs RESTful e arquitetura de microsserviços.',
    isFreelancer: false,
    githubUrl: 'https://github.com/mariaoliveira',
    linkedinUrl: 'https://linkedin.com/in/mariaoliveira',
    resumeUrl: '/path/to/resume.pdf',
    portfolioUrl: null,
    experiences: [
      {
        company: 'DataSystems',
        role: 'Desenvolvedora Back-end',
        startDate: '2023-02',
        endDate: null,
        current: true,
        description: 'Desenvolvimento de APIs e microserviços com Node.js.'
      },
      {
        company: 'InnovateTech',
        role: 'Estagiária de Desenvolvimento',
        startDate: '2022-01',
        endDate: '2023-01',
        current: false,
        description: 'Desenvolvimento backend e bancos de dados.'
      }
    ]
  },
  {
    id: 3,
    name: 'Pedro Santos',
    role: 'Desenvolvedor Full Stack',
    avatar: null,
    location: 'Belo Horizonte, MG',
    skills: [
      { name: 'React', level: 4 },
      { name: 'Node.js', level: 4 },
      { name: 'MongoDB', level: 3 },
      { name: 'AWS', level: 3 },
      { name: 'Docker', level: 2 }
    ],
    bio: 'Desenvolvedor full stack com paixão por tecnologias JavaScript. Gosto de criar soluções completas, do banco de dados à interface.',
    isFreelancer: true,
    githubUrl: 'https://github.com/pedrosantos',
    linkedinUrl: 'https://linkedin.com/in/pedrosantos',
    resumeUrl: '/path/to/resume.pdf',
    portfolioUrl: 'https://pedrosantos.dev',
    experiences: [
      {
        company: 'StartupXYZ',
        role: 'Desenvolvedor Full Stack',
        startDate: '2023-03',
        endDate: null,
        current: true,
        description: 'Desenvolvimento completo de aplicações web com MERN stack.'
      }
    ]
  },
  {
    id: 4,
    name: 'Ana Souza',
    role: 'UI/UX Designer & Dev',
    avatar: null,
    location: 'Florianópolis, SC',
    skills: [
      { name: 'UI Design', level: 5 },
      { name: 'UX Research', level: 4 },
      { name: 'HTML', level: 4 },
      { name: 'CSS', level: 5 },
      { name: 'JavaScript', level: 3 }
    ],
    bio: 'Designer UI/UX com conhecimentos de desenvolvimento frontend. Foco em criar experiências que encantam os usuários.',
    isFreelancer: true,
    githubUrl: 'https://github.com/anasouza',
    linkedinUrl: 'https://linkedin.com/in/anasouza',
    resumeUrl: '/path/to/resume.pdf',
    portfolioUrl: 'https://anasouza.design',
    experiences: [
      {
        company: 'DesignLab',
        role: 'UI/UX Designer',
        startDate: '2022-06',
        endDate: null,
        current: true,
        description: 'Criação de interfaces e prototipagem de aplicações.'
      },
      {
        company: 'CreativeCo',
        role: 'Designer Gráfico',
        startDate: '2021-01',
        endDate: '2022-05',
        current: false,
        description: 'Design de marca e materiais de marketing.'
      }
    ]
  },
  {
    id: 5,
    name: 'Lucas Mendes',
    role: 'Engenheiro de Software',
    avatar: null,
    location: 'Brasília, DF',
    skills: [
      { name: 'Java', level: 5 },
      { name: 'Spring Boot', level: 4 },
      { name: 'Python', level: 3 },
      { name: 'SQL', level: 4 },
      { name: 'Git', level: 4 }
    ],
    bio: 'Engenheiro de software com experiência em desenvolvimento de aplicações corporativas e sistemas distribuídos.',
    isFreelancer: false,
    githubUrl: 'https://github.com/lucasmendes',
    linkedinUrl: 'https://linkedin.com/in/lucasmendes',
    resumeUrl: '/path/to/resume.pdf',
    portfolioUrl: null,
    experiences: [
      {
        company: 'BigTech',
        role: 'Engenheiro de Software',
        startDate: '2023-01',
        endDate: null,
        current: true,
        description: 'Desenvolvimento de sistemas críticos em Java e Spring.'
      },
      {
        company: 'GovTech',
        role: 'Desenvolvedor Java Jr',
        startDate: '2021-08',
        endDate: '2022-12',
        current: false,
        description: 'Desenvolvimento e manutenção de aplicações governamentais.'
      }
    ]
  },
  {
    id: 6,
    name: 'Camila Ferreira',
    role: 'Desenvolvedora Mobile',
    avatar: null,
    location: 'Porto Alegre, RS',
    skills: [
      { name: 'React Native', level: 5 },
      { name: 'JavaScript', level: 4 },
      { name: 'TypeScript', level: 4 },
      { name: 'Firebase', level: 3 },
      { name: 'Redux', level: 4 }
    ],
    bio: 'Desenvolvedora mobile especializada em React Native. Já trabalhei em aplicativos para startups e grandes empresas.',
    isFreelancer: true,
    githubUrl: 'https://github.com/camilaferreira',
    linkedinUrl: 'https://linkedin.com/in/camilaferreira',
    resumeUrl: '/path/to/resume.pdf',
    portfolioUrl: 'https://camilaferreira.dev',
    experiences: [
      {
        company: 'MobileApps',
        role: 'Desenvolvedora React Native',
        startDate: '2022-03',
        endDate: null,
        current: true,
        description: 'Desenvolvimento de aplicativos multiplataforma com React Native.'
      },
      {
        company: 'AppStudio',
        role: 'Desenvolvedora Frontend',
        startDate: '2021-01',
        endDate: '2022-02',
        current: false,
        description: 'Desenvolvimento de interfaces web e aplicativos híbridos.'
      }
    ]
  }
];

// Mock de Vagas
const mockJobs = [
  { 
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
  },
  { 
    id: 2, 
    title: 'Desenvolvedor Back-end Node.js', 
    company: 'InnovateTech', 
    companyLogo: '/src/assets/images/company-logos/innovatetech.svg',
    location: 'Remoto', 
    locationType: 'REMOTE',
    level: 'PLENO',
    salary: 'R$ 8.000 - R$ 10.000',
    skills: ['Node.js', 'Express', 'MongoDB', 'API REST', 'Docker'],
    description: 'Estamos expandindo nossa equipe de engenharia e buscamos um desenvolvedor back-end para criar APIs e serviços escaláveis.',
    postedAt: new Date('2025-04-05'),
    applicationsCount: 8
  },
  { 
    id: 3, 
    title: 'Desenvolvedor Full Stack', 
    company: 'WaveCode', 
    companyLogo: '/src/assets/images/company-logos/wavecode.svg',
    location: 'Rio de Janeiro, RJ', 
    locationType: 'ONSITE',
    level: 'SENIOR',
    salary: 'R$ 12.000 - R$ 15.000',
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS'],
    description: 'Procuramos um desenvolvedor full stack sênior para liderar o desenvolvimento de nossa plataforma e mentorar desenvolvedores júnior.',
    postedAt: new Date('2025-04-01'),
    applicationsCount: 5
  }
];

const CompanyDashboard = () => {
  const [activeTab, setActiveTab] = useState('students'); // 'students' ou 'jobs'
  const [students, setStudents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedStudentId, setExpandedStudentId] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Estados de filtro
  const [filters, setFilters] = useState({
    skills: [],
    location: '',
    isFreelancer: false
  });
  
  // Obter todas as habilidades únicas
  const allSkills = [...new Set(
    mockStudents.flatMap(student => 
      student.skills.map(skill => skill.name)
    )
  )].sort();
  
  // Obter todas as localizações únicas
  const allLocations = [...new Set(
    mockStudents.map(student => student.location)
  )].sort();
  
  // Carregar dados
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Em uma aplicação real, aqui você faria a chamada à API
        // const [studentsData, jobsData] = await Promise.all([
        //   apiService.students.getAll(),
        //   apiService.jobs.getCompanyJobs()
        // ]);
        
        // Simulando chamada API com dados mock
        setStudents(mockStudents);
        setFilteredStudents(mockStudents);
        setJobs(mockJobs);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Falha ao carregar dados. Por favor, tente novamente.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  // Aplicar filtros e pesquisa
  useEffect(() => {
    let result = [...students];
    
    // Aplicar termo de pesquisa
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(student => 
        student.name.toLowerCase().includes(searchLower) || 
        student.role.toLowerCase().includes(searchLower) ||
        student.bio.toLowerCase().includes(searchLower) ||
        student.skills.some(skill => skill.name.toLowerCase().includes(searchLower))
      );
    }
    
    // Aplicar filtro de habilidades
    if (filters.skills.length > 0) {
      result = result.filter(student => 
        filters.skills.some(skill => 
          student.skills.some(s => s.name === skill)
        )
      );
    }
    
    // Aplicar filtro de localização
    if (filters.location) {
      result = result.filter(student => 
        student.location === filters.location
      );
    }
    
    // Aplicar filtro de freelancer
    if (filters.isFreelancer) {
      result = result.filter(student => student.isFreelancer);
    }
    
    setFilteredStudents(result);
  }, [searchTerm, filters, students]);
  
  // Manipuladores de filtro
  const toggleSkillFilter = (skill) => {
    setFilters(prev => {
      const skills = prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill];
        
      return { ...prev, skills };
    });
  };
  
  const setLocationFilter = (location) => {
    setFilters(prev => ({
      ...prev,
      location: prev.location === location ? '' : location
    }));
  };
  
  const toggleFreelancerFilter = () => {
    setFilters(prev => ({
      ...prev,
      isFreelancer: !prev.isFreelancer
    }));
  };
  
  const clearFilters = () => {
    setFilters({
      skills: [],
      location: '',
      isFreelancer: false
    });
    setSearchTerm('');
  };
  
  // Expandir/colapsar cartão de estudante
  const toggleExpandStudent = (studentId) => {
    setExpandedStudentId(expandedStudentId === studentId ? null : studentId);
  };
  
  // Delete job
  const handleDeleteJob = async (jobId) => {
    try {
      if (window.confirm('Tem certeza que deseja excluir esta vaga?')) {
        setIsLoading(true);
        
        // Em uma aplicação real, aqui você faria a chamada à API
        // await apiService.jobs.delete(jobId);
        
        // Simulando exclusão
        setJobs(prev => prev.filter(job => job.id !== jobId));
        
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Error deleting job:', error);
      setError('Falha ao excluir vaga. Por favor, tente novamente.');
      setIsLoading(false);
    }
  };
  
  // Formatação da data
  const formatDate = (date) => {
    if (!date) return '';
    
    // Verificar se é uma string no formato YYYY-MM
    if (typeof date === 'string' && date.match(/^\d{4}-\d{2}$/)) {
      const [year, month] = date.split('-');
      return new Date(parseInt(year), parseInt(month) - 1).toLocaleDateString('pt-BR', {
        month: 'long',
        year: 'numeric'
      });
    }
    
    // Caso seja uma data completa (Date)
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return dateObj.toLocaleDateString('pt-BR', {
      month: 'long',
      year: 'numeric'
    });
  };
  
  return (
    <DashboardLayout>
      {/* Abas */}
      <div className="flex border-b border-gray-200 dark:border-secondary-light mb-6">
        <button
          onClick={() => setActiveTab('students')}
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === 'students'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
          }`}
        >
          <Users className="w-4 h-4 mr-2" />
          Alunos
        </button>
        <button
          onClick={() => setActiveTab('jobs')}
          className={`px-4 py-2 font-medium text-sm flex items-center ${
            activeTab === 'jobs'
              ? 'text-primary border-b-2 border-primary'
              : 'text-text-muted-light dark:text-text-muted-dark hover:text-text-light dark:hover:text-text-dark'
          }`}
        >
          <BriefcaseBusiness className="w-4 h-4 mr-2" />
          Minhas Vagas
        </button>
      </div>
      
      {/* Conteúdo da aba Alunos */}
      {activeTab === 'students' && (
        <div>
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Encontre Talentos</h1>
              
              <Link
                to="/vagas/nova"
                className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Publicar Nova Vaga
              </Link>
            </div>
            
            <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
              Explore e conecte-se com os melhores alunos do DevClub para sua empresa
            </p>
            
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Barra de pesquisa */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por nome, cargo ou habilidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-secondary-light focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light"
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
                className="flex items-center justify-center px-4 py-3 bg-gray-100 dark:bg-secondary-light rounded-lg hover:bg-gray-200 dark:hover:bg-secondary transition-colors"
              >
                <Filter className="w-5 h-5 mr-2" />
                <span>Filtros</span>
                <ChevronDown className={`w-5 h-5 ml-2 transition-transform ${isFilterOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Área de filtros */}
            {isFilterOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 pt-4 border-t border-gray-200 dark:border-secondary-light"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Filtro de Habilidades */}
                  <div>
                    <h3 className="font-medium mb-2">Habilidades</h3>
                    <div className="flex flex-wrap gap-2">
                      {allSkills.slice(0, 15).map((skill) => (
                        <button
                          key={skill}
                          onClick={() => toggleSkillFilter(skill)}
                          className={`px-3 py-1 rounded-full text-sm ${
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
                  
                  {/* Filtro de Localização */}
                  <div>
                    <h3 className="font-medium mb-2">Localização</h3>
                    <select
                      value={filters.location}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    >
                      <option value="">Todas as localizações</option>
                      {allLocations.map((location) => (
                        <option key={location} value={location}>
                          {location}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  {/* Filtro de Freelancer */}
                  <div>
                    <h3 className="font-medium mb-2">Tipo</h3>
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.isFreelancer}
                        onChange={toggleFreelancerFilter}
                        className="w-4 h-4 mr-2 text-primary rounded focus:ring-primary"
                      />
                      <span>Disponível para freelance</span>
                    </label>
                  </div>
                </div>
                
                {/* Botão de limpar filtros */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-secondary-light flex justify-between">
                  <button
                    onClick={clearFilters}
                    className="text-text-muted-light dark:text-text-muted-dark hover:text-primary flex items-center"
                  >
                    <X className="w-4 h-4 mr-1" /> Limpar Filtros
                  </button>
                  
                  <div className="text-text-muted-light dark:text-text-muted-dark">
                    {filteredStudents.length} {filteredStudents.length === 1 ? 'aluno encontrado' : 'alunos encontrados'}
                  </div>
                </div>
              </motion.div>
            )}
          </div>
          
          {/* Lista de alunos */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-12 flex justify-center">
                <div className="flex flex-col items-center">
                  <svg className="animate-spin h-12 w-12 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-text-muted-light dark:text-text-muted-dark">Carregando alunos...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-8 text-center">
                <div className="text-red-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Erro ao carregar dados</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            ) : filteredStudents.length > 0 ? (
              filteredStudents.map(student => (
                <motion.div
                  key={student.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-secondary-dark rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {/* Cabeçalho do cartão */}
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleExpandStudent(student.id)}
                  >
                    <div className="flex flex-col md:flex-row md:items-center">
                      {/* Avatar */}
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
                          {student.avatar ? (
                            <img 
                              src={student.avatar} 
                              alt={student.name} 
                              className="w-full h-full rounded-full object-cover" 
                            />
                          ) : (
                            <span className="font-bold text-2xl text-primary">
                              {student.name.charAt(0)}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Informações do aluno */}
                      <div className="flex-grow">
                        <h2 className="text-xl font-bold mb-1">{student.name}</h2>
                        
                        <div className="flex flex-wrap items-center text-text-muted-light dark:text-text-muted-dark text-sm mb-2">
                          <span className="mr-3">{student.role}</span>
                          <span className="flex items-center">
                            <MapPin className="w-4 h-4 mr-1" />
                            {student.location}
                          </span>
                          {student.isFreelancer && (
                            <span className="ml-3 px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded text-xs font-medium">
                              Freelancer
                            </span>
                          )}
                        </div>
                        
                        <p className="text-text-light dark:text-text-dark mb-3 line-clamp-2">
                          {student.bio}
                        </p>
                        
                        <div className="flex flex-wrap gap-2">
                          {student.skills.slice(0, 5).map((skill, index) => (
                            <div 
                              key={index} 
                              className="px-2 py-1 bg-gray-100 dark:bg-secondary-light rounded-full text-xs flex items-center"
                            >
                              <span>{skill.name}</span>
                              <div className="ml-1 flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={10} 
                                    className={i < skill.level ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                          {student.skills.length > 5 && (
                            <span className="text-xs text-text-muted-light dark:text-text-muted-dark px-2 py-1">
                              +{student.skills.length - 5} mais
                            </span>
                          )}
                        </div>
                      </div>
                      
                      {/* Botões de ação */}
                      <div className="mt-4 md:mt-0 md:ml-6 flex flex-col md:items-end">
                        <ChevronDown 
                          className={`w-6 h-6 text-text-muted-light dark:text-text-muted-dark mb-2 transform transition-transform ${
                            expandedStudentId === student.id ? 'rotate-180' : ''
                          }`} 
                        />
                        
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors w-full md:w-auto text-center"
                        >
                          Contactar
                        </motion.button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Conteúdo expandido */}
                  {expandedStudentId === student.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="px-6 pb-6 border-t border-gray-200 dark:border-secondary-light pt-4"
                    >
                      {/* Links */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        {student.githubUrl && (
                          <a 
                            href={student.githubUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-text-muted-light dark:text-text-muted-dark hover:text-primary"
                          >
                            <Github className="w-5 h-5 mr-1" />
                            <span>GitHub</span>
                            <ArrowUpRight className="w-3 h-3 ml-1" />
                          </a>
                        )}
                        
                        {student.linkedinUrl && (
                          <a 
                            href={student.linkedinUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-text-muted-light dark:text-text-muted-dark hover:text-primary"
                          >
                            <Linkedin className="w-5 h-5 mr-1" />
                            <span>LinkedIn</span>
                            <ArrowUpRight className="w-3 h-3 ml-1" />
                          </a>
                        )}
                        
                        {student.portfolioUrl && (
                          <a 
                            href={student.portfolioUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-text-muted-light dark:text-text-muted-dark hover:text-primary"
                          >
                            <Globe className="w-5 h-5 mr-1" />
                            <span>Portfolio</span>
                            <ArrowUpRight className="w-3 h-3 ml-1" />
                          </a>
                        )}
                        
                        {student.resumeUrl && (
                          <a 
                            href={student.resumeUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex items-center text-text-muted-light dark:text-text-muted-dark hover:text-primary"
                          >
                            <Download className="w-5 h-5 mr-1" />
                            <span>Currículo</span>
                          </a>
                        )}
                      </div>
                      
                      {/* Bio completa */}
                      <div className="mb-6">
                        <h3 className="font-semibold mb-2">Sobre</h3>
                        <p className="text-text-light dark:text-text-dark">
                          {student.bio}
                        </p>
                      </div>
                      
                      {/* Experiências */}
                      {student.experiences.length > 0 && (
                        <div className="mb-6">
                          <h3 className="font-semibold mb-2">Experiência</h3>
                          <div className="space-y-4">
                            {student.experiences.map((exp, index) => (
                              <div key={index} className="relative pl-6 border-l-2 border-gray-200 dark:border-secondary-light">
                                <div className="absolute left-[-8px] top-0 w-4 h-4 bg-primary rounded-full"></div>
                                <h4 className="font-medium">{exp.role}</h4>
                                <p className="text-text-muted-light dark:text-text-muted-dark">
                                  {exp.company}
                                </p>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark flex items-center">
                                  <Calendar className="w-3 h-3 mr-1" />
                                  {formatDate(exp.startDate)} - {exp.current ? 'Atual' : formatDate(exp.endDate)}
                                </p>
                                {exp.description && <p className="mt-1">{exp.description}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      {/* Todas as habilidades */}
                      <div>
                        <h3 className="font-semibold mb-2">Habilidades</h3>
                        <div className="flex flex-wrap gap-2">
                          {student.skills.map((skill, index) => (
                            <div 
                              key={index} 
                              className="px-3 py-2 bg-gray-100 dark:bg-secondary-light rounded-lg text-sm flex items-center"
                            >
                              <span>{skill.name}</span>
                              <div className="ml-2 flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    size={12} 
                                    className={i < skill.level ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                                  />
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))
            ) : (
              <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-4">
                  <Search className="w-16 h-16 text-text-muted-light dark:text-text-muted-dark" />
                </div>
                <h3 className="text-xl font-bold mb-2">Nenhum aluno encontrado</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
                  Tente ajustar seus filtros ou termos de pesquisa.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Limpar Filtros
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      
      {/* Conteúdo da aba Minhas Vagas */}
      {activeTab === 'jobs' && (
        <div>
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold">Minhas Vagas</h1>
              
              <Link
                to="/vagas/nova"
                className="flex items-center justify-center px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
              >
                <Plus className="w-4 h-4 mr-2" />
                Publicar Nova Vaga
              </Link>
            </div>
            
            <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
              Gerencie e acompanhe as vagas publicadas por sua empresa
            </p>
          </div>
          
          {/* Lista de vagas */}
          <div className="space-y-6">
            {isLoading ? (
              <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-12 flex justify-center">
                <div className="flex flex-col items-center">
                  <svg className="animate-spin h-12 w-12 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <p className="text-text-muted-light dark:text-text-muted-dark">Carregando vagas...</p>
                </div>
              </div>
            ) : error ? (
              <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-8 text-center">
                <div className="text-red-500 mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Erro ao carregar dados</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-4">{error}</p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Tentar novamente
                </button>
              </div>
            ) : jobs.length > 0 ? (
              jobs.map(job => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Informações da vaga */}
                    <div className="flex-grow">
                      <div className="flex items-center mb-2">
                        <h2 className="text-xl font-bold">{job.title}</h2>
                        <span className="ml-3 px-2 py-0.5 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs font-medium flex items-center">
                          <Users className="w-3 h-3 mr-1" />
                          {job.applicationsCount} candidato{job.applicationsCount !== 1 ? 's' : ''}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center text-text-muted-light dark:text-text-muted-dark text-sm mb-3">
                        <span className="flex items-center mr-3">
                          <MapPin className="w-4 h-4 mr-1" />
                          {job.location}
                        </span>
                        
                        <span className="mr-3">
                          {job.locationType === 'REMOTE' && 'Remoto'}
                          {job.locationType === 'HYBRID' && 'Híbrido'}
                          {job.locationType === 'ONSITE' && 'Presencial'}
                        </span>
                        
                        <span>Publicada em {job.postedAt.toLocaleDateString('pt-BR')}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-medium 
                          ${job.level === 'JUNIOR' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                            job.level === 'PLENO' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 
                            'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'}`}
                        >
                          {job.level === 'JUNIOR' ? 'Júnior' : 
                           job.level === 'PLENO' ? 'Pleno' : 'Sênior'}
                        </span>
                        
                        <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
                          {job.salary}
                        </span>
                      </div>
                      
                      <p className="text-text-light dark:text-text-dark mb-4 line-clamp-2">
                        {job.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-1">
                        {job.skills.map(skill => (
                          <span 
                            key={skill} 
                            className="px-2 py-1 bg-gray-100 dark:bg-secondary-light rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Botões de ação */}
                    <div className="mt-4 md:mt-0 md:ml-6 flex flex-col gap-2">
                      <Link
                        to={`/vagas/${job.id}/candidaturas`}
                        className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap flex items-center justify-center"
                      >
                        <Users className="w-4 h-4 mr-2" />
                        Ver Candidatos
                      </Link>
                      
                      <Link
                        to={`/vagas/${job.id}/editar`}
                        className="px-4 py-2 border border-gray-300 dark:border-secondary-light rounded-lg hover:bg-gray-50 dark:hover:bg-secondary transition-colors whitespace-nowrap flex items-center justify-center"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Editar Vaga
                      </Link>
                      
                      <button
                        onClick={() => handleDeleteJob(job.id)}
                        className="px-4 py-2 border border-red-300 dark:border-red-700 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors whitespace-nowrap flex items-center justify-center"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Excluir
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-8 text-center">
                <div className="flex justify-center mb-4">
                  <BriefcaseBusiness className="w-16 h-16 text-text-muted-light dark:text-text-muted-dark" />
                </div>
                <h3 className="text-xl font-bold mb-2">Nenhuma vaga publicada</h3>
                <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
                  Você ainda não publicou nenhuma vaga. Comece agora mesmo a encontrar os melhores talentos para sua empresa!
                </p>
                <Link
                  to="/vagas/nova"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors inline-flex items-center"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Publicar Nova Vaga
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default CompanyDashboard;