// src/pages/student/StudentDashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, Filter, MapPin, BriefcaseBusiness, 
  Clock, Star, Bookmark, BookmarkCheck, ChevronDown,
  X, Calendar, DollarSign
} from 'lucide-react';

// Layout Components
import DashboardLayout from '../../components/layout/DashboardLayout';

// Mock Data
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
    isBookmarked: false
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
    isBookmarked: true
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
    isBookmarked: false
  },
  {
    id: 4,
    title: 'Desenvolvedor Mobile React Native',
    company: 'AppMasters',
    companyLogo: '/src/assets/images/company-logos/appmasters.svg',
    location: 'Remoto',
    locationType: 'REMOTE',
    level: 'PLENO',
    salary: 'R$ 7.000 - R$ 9.000',
    skills: ['React Native', 'JavaScript', 'Redux', 'Firebase', 'UI/UX'],
    description: 'Venha criar aplicativos móveis incríveis para nossos clientes utilizando React Native e as melhores práticas de desenvolvimento mobile.',
    postedAt: new Date('2025-04-03'),
    isBookmarked: false
  },
  {
    id: 5,
    title: 'Engenheiro de Software Java',
    company: 'DataSystems',
    companyLogo: '/src/assets/images/company-logos/datasystems.svg',
    location: 'Belo Horizonte, MG',
    locationType: 'HYBRID',
    level: 'PLENO',
    salary: 'R$ 9.000 - R$ 11.000',
    skills: ['Java', 'Spring Boot', 'Microservices', 'SQL', 'JUnit'],
    description: 'Procuramos por um engenheiro de software Java para desenvolver soluções robustas e escaláveis para aplicações corporativas.',
    postedAt: new Date('2025-04-07'),
    isBookmarked: true
  },
  {
    id: 6,
    title: 'Desenvolvedor Frontend Vue.js',
    company: 'Viewtify',
    companyLogo: '/src/assets/images/company-logos/viewtify.svg',
    location: 'Remoto',
    locationType: 'REMOTE',
    level: 'JUNIOR',
    salary: 'R$ 5.000 - R$ 7.000',
    skills: ['Vue.js', 'JavaScript', 'Vuex', 'SCSS', 'Git'],
    description: 'Ajude-nos a criar interfaces incríveis utilizando Vue.js e outras tecnologias frontend modernas.',
    postedAt: new Date('2025-04-06'),
    isBookmarked: false
  }
];

const StudentDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // Estados de filtro
  const [filters, setFilters] = useState({
    levels: [],
    locationTypes: [],
    skills: []
  });
  
  const allSkills = [
    'React', 'JavaScript', 'HTML', 'CSS', 'TypeScript', 'Node.js', 'Vue.js', 
    'Angular', 'Java', 'Python', 'Django', 'Ruby', 'C#', '.NET', 'PHP', 
    'Laravel', 'Express', 'MongoDB', 'SQL', 'PostgreSQL', 'MySQL', 'Git', 
    'Docker', 'AWS', 'Azure', 'Firebase', 'React Native', 'Flutter', 'UI/UX'
  ];
  
  // Carregar dados
  useEffect(() => {
    // Em uma aplicação real, aqui você faria a chamada à API
    setJobs(mockJobs);
    setFilteredJobs(mockJobs);
  }, []);
  
  // Aplicar filtros e pesquisa
  useEffect(() => {
    let result = [...jobs];
    
    // Aplicar termo de pesquisa
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) || 
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.skills.some(skill => skill.toLowerCase().includes(searchLower))
      );
    }
    
    // Aplicar filtros de nível
    if (filters.levels.length > 0) {
      result = result.filter(job => filters.levels.includes(job.level));
    }
    
    // Aplicar filtros de tipo de localização
    if (filters.locationTypes.length > 0) {
      result = result.filter(job => filters.locationTypes.includes(job.locationType));
    }
    
    // Aplicar filtros de habilidades
    if (filters.skills.length > 0) {
      result = result.filter(job => 
        filters.skills.some(skill => job.skills.includes(skill))
      );
    }
    
    setFilteredJobs(result);
  }, [searchTerm, filters, jobs]);
  
  // Manipuladores de filtro
  const toggleLevelFilter = (level) => {
    setFilters(prev => {
      const levels = prev.levels.includes(level)
        ? prev.levels.filter(l => l !== level)
        : [...prev.levels, level];
        
      return { ...prev, levels };
    });
  };
  
  const toggleLocationTypeFilter = (locationType) => {
    setFilters(prev => {
      const locationTypes = prev.locationTypes.includes(locationType)
        ? prev.locationTypes.filter(lt => lt !== locationType)
        : [...prev.locationTypes, locationType];
        
      return { ...prev, locationTypes };
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
  
  const clearFilters = () => {
    setFilters({
      levels: [],
      locationTypes: [],
      skills: []
    });
    setSearchTerm('');
  };
  
  // Toggle bookmark
  const toggleBookmark = (jobId) => {
    setJobs(prev => 
      prev.map(job => 
        job.id === jobId 
          ? { ...job, isBookmarked: !job.isBookmarked } 
          : job
      )
    );
  };
  
  // Formatação da data
  const formatDate = (date) => {
    const now = new Date();
    const diffInDays = Math.floor((now - date) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return 'Hoje';
    } else if (diffInDays === 1) {
      return 'Ontem';
    } else if (diffInDays < 7) {
      return `${diffInDays} dias atrás`;
    } else {
      return date.toLocaleDateString('pt-BR', { 
        day: 'numeric', 
        month: 'short', 
        year: 'numeric' 
      });
    }
  };
  
  // Rótulos de nível
  const levelLabels = {
    JUNIOR: { label: 'Júnior', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' },
    PLENO: { label: 'Pleno', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' },
    SENIOR: { label: 'Sênior', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300' }
  };
  
  // Rótulos de tipo de localização
  const locationTypeLabels = {
    REMOTE: { label: 'Remoto', icon: <Globe className="w-4 h-4 mr-1" /> },
    HYBRID: { label: 'Híbrido', icon: <MapPin className="w-4 h-4 mr-1" /> },
    ONSITE: { label: 'Presencial', icon: <BriefcaseBusiness className="w-4 h-4 mr-1" /> }
  };
  
  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-2xl font-bold mb-2">Encontre sua vaga perfeita</h1>
        <p className="text-text-muted-light dark:text-text-muted-dark mb-6">
          Explore oportunidades exclusivas para alunos do DevClub
        </p>
        
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Barra de pesquisa */}
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
            </div>
            <input
              type="text"
              placeholder="Buscar por cargo, empresa ou tecnologia..."
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
              {/* Filtro de Nível */}
              <div>
                <h3 className="font-medium mb-2">Nível</h3>
                <div className="space-y-2">
                  {['JUNIOR', 'PLENO', 'SENIOR'].map((level) => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.levels.includes(level)}
                        onChange={() => toggleLevelFilter(level)}
                        className="w-4 h-4 mr-2 text-primary rounded focus:ring-primary"
                      />
                      <span className={`px-2 py-1 rounded text-xs font-medium ${levelLabels[level].color}`}>
                        {levelLabels[level].label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
              {/* Filtro de Tipo de Localização */}
              <div>
                <h3 className="font-medium mb-2">Tipo de Trabalho</h3>
                <div className="space-y-2">
                  {['REMOTE', 'HYBRID', 'ONSITE'].map((locationType) => (
                    <label key={locationType} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.locationTypes.includes(locationType)}
                        onChange={() => toggleLocationTypeFilter(locationType)}
                        className="w-4 h-4 mr-2 text-primary rounded focus:ring-primary"
                      />
                      <span className="flex items-center">
                        {locationTypeLabels[locationType].icon}
                        {locationTypeLabels[locationType].label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              
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
                {filteredJobs.length} {filteredJobs.length === 1 ? 'vaga encontrada' : 'vagas encontradas'}
              </div>
            </div>
          </motion.div>
        )}
      </div>
      
      {/* Lista de vagas */}
      <div className="space-y-6">
        {filteredJobs.length > 0 ? (
          filteredJobs.map(job => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow relative"
            >
              {/* Bookmark */}
              <button
                onClick={() => toggleBookmark(job.id)}
                className="absolute top-4 right-4 text-text-muted-light dark:text-text-muted-dark hover:text-primary"
              >
                {job.isBookmarked ? (
                  <BookmarkCheck className="w-6 h-6 fill-primary text-primary" />
                ) : (
                  <Bookmark className="w-6 h-6" />
                )}
              </button>
              
              <div className="flex flex-col md:flex-row md:items-center">
                {/* Logo da empresa */}
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-secondary-light rounded-lg flex items-center justify-center">
                    {/* Aqui você usaria a imagem da empresa */}
                    <span className="font-bold text-2xl text-primary">
                      {job.company.charAt(0)}
                    </span>
                  </div>
                </div>
                
                {/* Informações da vaga */}
                <div className="flex-grow">
                  <h2 className="text-xl font-bold mb-1">{job.title}</h2>
                  
                  <div className="flex flex-wrap items-center text-text-muted-light dark:text-text-muted-dark text-sm mb-2">
                    <span className="mr-3">{job.company}</span>
                    <span className="flex items-center mr-3">
                      {locationTypeLabels[job.locationType].icon}
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {formatDate(job.postedAt)}
                    </span>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${levelLabels[job.level].color}`}>
                      {levelLabels[job.level].label}
                    </span>
                    
                    <span className="px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 flex items-center">
                      <DollarSign className="w-3 h-3 mr-0.5" />
                      {job.salary}
                    </span>
                  </div>
                  
                  <p className="text-text-light dark:text-text-dark mb-3 line-clamp-2">
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
                
                {/* Botão de aplicar */}
                <div className="mt-4 md:mt-0 md:ml-6">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Ver Detalhes
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <Search className="w-16 h-16 text-text-muted-light dark:text-text-muted-dark" />
            </div>
            <h3 className="text-xl font-bold mb-2">Nenhuma vaga encontrada</h3>
            <p className="text-text-muted-light dark:text-text-muted-dark mb-4">
              Tente ajustar seus filtros ou termos de pesquisa para encontrar mais oportunidades.
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
    </DashboardLayout>
  );
};

export default StudentDashboard;