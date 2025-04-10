// src/pages/admin/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Users, 
  Building, 
  Briefcase, 
  BarChart2, 
  Settings, 
  LogOut, 
  Search, 
  Plus, 
  Trash2, 
  Edit, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight,
  Eye
} from 'lucide-react';

// Componentes de gráficos
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

// Mock Data - Empresas
const mockCompanies = [
  { id: 1, name: 'TechSolutions', responsibleName: 'Carlos Silva', email: 'carlos@techsolutions.com', jobsCount: 3, createdAt: '2023-05-12' },
  { id: 2, name: 'InnovateTech', responsibleName: 'Mariana Santos', email: 'mariana@innovatetech.com', jobsCount: 2, createdAt: '2023-06-25' },
  { id: 3, name: 'WaveCode', responsibleName: 'Roberto Oliveira', email: 'roberto@wavecode.com', jobsCount: 1, createdAt: '2023-08-10' },
  { id: 4, name: 'DataSystems', responsibleName: 'Ana Carolina Lima', email: 'ana@datasystems.com', jobsCount: 0, createdAt: '2023-09-15' },
  { id: 5, name: 'AppMasters', responsibleName: 'Fernando Costa', email: 'fernando@appmasters.com', jobsCount: 2, createdAt: '2023-04-20' },
  { id: 6, name: 'Viewtify', responsibleName: 'Juliana Martins', email: 'juliana@viewtify.com', jobsCount: 1, createdAt: '2023-07-05' },
  { id: 7, name: 'CoreTech', responsibleName: 'Daniel Almeida', email: 'daniel@coretech.com', jobsCount: 0, createdAt: '2023-10-01' },
  { id: 8, name: 'NexusApps', responsibleName: 'Patricia Gomes', email: 'patricia@nexusapps.com', jobsCount: 1, createdAt: '2023-06-12' },
  { id: 9, name: 'ByteBridge', responsibleName: 'Lucas Ferreira', email: 'lucas@bytebridge.com', jobsCount: 2, createdAt: '2023-05-30' },
  { id: 10, name: 'QuantumCode', responsibleName: 'Camila Rodrigues', email: 'camila@quantumcode.com', jobsCount: 3, createdAt: '2023-03-15' }
];

// Mock Data - Alunos
const mockStudents = [
  { id: 1, name: 'João Silva', email: 'joao@email.com', skills: ['React', 'JavaScript', 'HTML', 'CSS'], createdAt: '2023-04-10' },
  { id: 2, name: 'Maria Oliveira', email: 'maria@email.com', skills: ['Node.js', 'Express', 'MongoDB'], createdAt: '2023-05-15' },
  { id: 3, name: 'Pedro Santos', email: 'pedro@email.com', skills: ['React', 'Node.js', 'MongoDB'], createdAt: '2023-06-20' },
  { id: 4, name: 'Ana Souza', email: 'ana@email.com', skills: ['UI Design', 'HTML', 'CSS'], createdAt: '2023-07-05' },
  { id: 5, name: 'Lucas Mendes', email: 'lucas@email.com', skills: ['Java', 'Spring Boot', 'SQL'], createdAt: '2023-08-12' },
  { id: 6, name: 'Camila Ferreira', email: 'camila@email.com', skills: ['React Native', 'JavaScript', 'Firebase'], createdAt: '2023-09-01' },
  { id: 7, name: 'Bruno Costa', email: 'bruno@email.com', skills: ['Python', 'Django', 'PostgreSQL'], createdAt: '2023-09-25' },
  { id: 8, name: 'Juliana Lima', email: 'juliana@email.com', skills: ['Angular', 'TypeScript', 'Firebase'], createdAt: '2023-10-10' },
  { id: 9, name: 'Rafael Almeida', email: 'rafael@email.com', skills: ['PHP', 'Laravel', 'MySQL'], createdAt: '2023-10-20' },
  { id: 10, name: 'Fernanda Torres', email: 'fernanda@email.com', skills: ['.NET Core', 'C#', 'SQL Server'], createdAt: '2023-11-05' }
];

// Mock Data - Vagas
const mockJobs = [
  { 
    id: 1, 
    title: 'Desenvolvedor Front-end React', 
    company: 'TechSolutions', 
    location: 'São Paulo, SP', 
    level: 'JUNIOR',
    applicationsCount: 12, 
    status: 'active', 
    createdAt: '2025-04-02'
  },
  { 
    id: 2, 
    title: 'Desenvolvedor Back-end Node.js', 
    company: 'InnovateTech', 
    location: 'Remoto', 
    level: 'PLENO',
    applicationsCount: 8, 
    status: 'active', 
    createdAt: '2025-04-05'
  },
  { 
    id: 3, 
    title: 'Desenvolvedor Full Stack', 
    company: 'WaveCode', 
    location: 'Rio de Janeiro, RJ', 
    level: 'SENIOR',
    applicationsCount: 5, 
    status: 'active', 
    createdAt: '2025-04-01'
  },
  { 
    id: 4, 
    title: 'UI/UX Designer', 
    company: 'AppMasters', 
    location: 'Belo Horizonte, MG', 
    level: 'PLENO',
    applicationsCount: 7, 
    status: 'active', 
    createdAt: '2025-04-03'
  },
  { 
    id: 5, 
    title: 'Engenheiro DevOps', 
    company: 'ByteBridge', 
    location: 'Remoto', 
    level: 'SENIOR',
    applicationsCount: 4, 
    status: 'inactive', 
    createdAt: '2025-03-15'
  },
  { 
    id: 6, 
    title: 'Desenvolvedor Mobile Flutter', 
    company: 'NexusApps', 
    location: 'Campinas, SP', 
    level: 'JUNIOR',
    applicationsCount: 9, 
    status: 'active', 
    createdAt: '2025-04-08'
  },
  { 
    id: 7, 
    title: 'Analista de Dados', 
    company: 'QuantumCode', 
    location: 'Remoto', 
    level: 'PLENO',
    applicationsCount: 6, 
    status: 'active', 
    createdAt: '2025-04-10'
  },
  { 
    id: 8, 
    title: 'Engenheiro de Software Java', 
    company: 'TechSolutions', 
    location: 'São Paulo, SP', 
    level: 'PLENO',
    applicationsCount: 10, 
    status: 'inactive', 
    createdAt: '2025-03-25'
  },
  { 
    id: 9, 
    title: 'Arquiteto de Software', 
    company: 'QuantumCode', 
    location: 'Florianópolis, SC', 
    level: 'SENIOR',
    applicationsCount: 3, 
    status: 'active', 
    createdAt: '2025-04-07'
  },
  { 
    id: 10, 
    title: 'Desenvolvedor Frontend Vue', 
    company: 'Viewtify', 
    location: 'Recife, PE', 
    level: 'JUNIOR',
    applicationsCount: 11, 
    status: 'active', 
    createdAt: '2025-04-04'
  }
];

// Dados para gráficos
const userRegistrationsData = [
  { name: 'Jan', students: 12, companies: 5 },
  { name: 'Fev', students: 15, companies: 7 },
  { name: 'Mar', students: 20, companies: 9 },
  { name: 'Abr', students: 25, companies: 12 },
  { name: 'Mai', students: 22, companies: 10 },
  { name: 'Jun', students: 30, companies: 15 },
];

const jobsByLevelData = [
  { name: 'Júnior', value: 35 },
  { name: 'Pleno', value: 45 },
  { name: 'Sênior', value: 20 },
];

const COLORS = ['#37E359', '#0A2E4D', '#52FF74'];

const jobApplicationsData = [
  { name: 'Semana 1', applications: 45 },
  { name: 'Semana 2', applications: 63 },
  { name: 'Semana 3', applications: 58 },
  { name: 'Semana 4', applications: 75 },
];

const AdminDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [companies, setCompanies] = useState([]);
  const [students, setStudents] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Paginação
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // Carregar dados
  useEffect(() => {
    // Em uma aplicação real, aqui você faria chamadas à API
    setCompanies(mockCompanies);
    setStudents(mockStudents);
    setJobs(mockJobs);
    
    // Definir a aba ativa com base na URL
    const path = location.pathname.split('/').pop();
    if (path === 'students') {
      setActiveTab('students');
    } else if (path === 'companies') {
      setActiveTab('companies');
    } else if (path === 'jobs') {
      setActiveTab('jobs');
    } else {
      setActiveTab('dashboard');
    }
  }, [location]);
  
  // Dados filtrados com base na busca
  const filteredData = () => {
    const searchTermLower = searchTerm.toLowerCase();
    
    switch (activeTab) {
      case 'companies':
        return companies.filter(company => 
          company.name.toLowerCase().includes(searchTermLower) ||
          company.responsibleName.toLowerCase().includes(searchTermLower) ||
          company.email.toLowerCase().includes(searchTermLower)
        );
      case 'students':
        return students.filter(student => 
          student.name.toLowerCase().includes(searchTermLower) ||
          student.email.toLowerCase().includes(searchTermLower) ||
          student.skills.some(skill => skill.toLowerCase().includes(searchTermLower))
        );
      case 'jobs':
        return jobs.filter(job => 
          job.title.toLowerCase().includes(searchTermLower) ||
          job.company.toLowerCase().includes(searchTermLower) ||
          job.location.toLowerCase().includes(searchTermLower)
        );
      default:
        return [];
    }
  };
  
  // Paginação
  const totalPages = Math.ceil(filteredData().length / itemsPerPage);
  const currentItems = filteredData().slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Manipulador de exclusão
  const handleDelete = (id) => {
    // Em uma aplicação real, aqui você faria uma chamada à API
    if (window.confirm('Tem certeza que deseja excluir este item?')) {
      if (activeTab === 'companies') {
        setCompanies(companies.filter(company => company.id !== id));
      } else if (activeTab === 'students') {
        setStudents(students.filter(student => student.id !== id));
      } else if (activeTab === 'jobs') {
        setJobs(jobs.filter(job => job.id !== id));
      }
      
      // Ajustar página atual se necessário
      if (currentItems.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    }
  };
  
  // Componente de paginação
  const Pagination = () => {
    return (
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-text-muted-light dark:text-text-muted-dark">
          Mostrando {currentItems.length} de {filteredData().length} registros
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`p-2 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-secondary-light'
            }`}
          >
            <ChevronLeft size={20} />
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded-md ${
                currentPage === page
                  ? 'bg-primary text-white'
                  : 'text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-secondary-light'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`p-2 rounded-md ${
              currentPage === totalPages || totalPages === 0
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-secondary-light'
            }`}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    );
  };
  
  // Formatar data
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white dark:bg-secondary shadow-md fixed h-screen z-10">
          <div className="p-4 border-b border-gray-200 dark:border-secondary-light">
            <Link to="/admin" className="flex items-center">
              <span className="text-2xl font-bold">
                <span className="text-primary">Dev</span>
                <span className="text-secondary dark:text-white">Jobs</span>
              </span>
            </Link>
            <div className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
              Painel Administrativo
            </div>
          </div>
          
          <nav className="py-4">
            <ul className="space-y-1">
              <li>
                <Link
                  to="/admin"
                  className={`flex items-center px-4 py-3 ${
                    activeTab === 'dashboard'
                      ? 'bg-primary/10 text-primary border-r-4 border-primary'
                      : 'text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-secondary-light'
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <BarChart2 className="w-5 h-5 mr-3" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/students"
                  className={`flex items-center px-4 py-3 ${
                    activeTab === 'students'
                      ? 'bg-primary/10 text-primary border-r-4 border-primary'
                      : 'text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-secondary-light'
                  }`}
                  onClick={() => setActiveTab('students')}
                >
                  <Users className="w-5 h-5 mr-3" />
                  <span>Alunos</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/companies"
                  className={`flex items-center px-4 py-3 ${
                    activeTab === 'companies'
                      ? 'bg-primary/10 text-primary border-r-4 border-primary'
                      : 'text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-secondary-light'
                  }`}
                  onClick={() => setActiveTab('companies')}
                >
                  <Building className="w-5 h-5 mr-3" />
                  <span>Empresas</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/admin/jobs"
                  className={`flex items-center px-4 py-3 ${
                    activeTab === 'jobs'
                      ? 'bg-primary/10 text-primary border-r-4 border-primary'
                      : 'text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-secondary-light'
                  }`}
                  onClick={() => setActiveTab('jobs')}
                >
                  <Briefcase className="w-5 h-5 mr-3" />
                  <span>Vagas</span>
                </Link>
              </li>
            </ul>
            
            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-secondary-light">
              <ul className="space-y-1">
                <li>
                  <Link
                    to="/admin/settings"
                    className="flex items-center px-4 py-3 text-text-light dark:text-text-dark hover:bg-gray-100 dark:hover:bg-secondary-light"
                  >
                    <Settings className="w-5 h-5 mr-3" />
                    <span>Configurações</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/logout"
                    className="flex items-center px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="w-5 h-5 mr-3" />
                    <span>Sair</span>
                  </Link>
                </li>
              </ul>
            </div>
          </nav>
        </aside>
        
        {/* Conteúdo principal */}
        <main className="ml-64 flex-grow p-6">
          {/* Dashboard */}
          {activeTab === 'dashboard' && (
            <div>
              <div className="mb-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-text-muted-light dark:text-text-muted-dark">
                  Visão geral da plataforma DevJobs
                </p>
              </div>
              
              {/* Cards de estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Alunos</p>
                      <h2 className="text-3xl font-bold">{students.length}</h2>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center text-blue-500">
                      <Users className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-green-500 flex items-center">
                    <span>+12% no último mês</span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Empresas</p>
                      <h2 className="text-3xl font-bold">{companies.length}</h2>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-500">
                      <Building className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-green-500 flex items-center">
                    <span>+8% no último mês</span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Vagas Ativas</p>
                      <h2 className="text-3xl font-bold">{jobs.filter(job => job.status === 'active').length}</h2>
                    </div>
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center text-green-500">
                      <Briefcase className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-green-500 flex items-center">
                    <span>+15% no último mês</span>
                  </div>
                </div>
                
                <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-sm">Candidaturas</p>
                      <h2 className="text-3xl font-bold">{jobs.reduce((sum, job) => sum + job.applicationsCount, 0)}</h2>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center text-orange-500">
                      <BarChart2 className="w-6 h-6" />
                    </div>
                  </div>
                  <div className="mt-4 text-xs text-green-500 flex items-center">
                    <span>+23% no último mês</span>
                  </div>
                </div>
              </div>
              
              {/* Gráficos */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-4">Cadastros por Mês</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={userRegistrationsData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="students" 
                          stroke="#37E359" 
                          activeDot={{ r: 8 }} 
                          name="Alunos"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="companies" 
                          stroke="#051626" 
                          name="Empresas" 
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                <div className="grid grid-rows-2 gap-6">
                  <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Vagas por Nível</h3>
                    <div className="h-36">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={jobsByLevelData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={60}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {jobsByLevelData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold mb-4">Candidaturas Recentes</h3>
                    <div className="h-36">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={jobApplicationsData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="applications" fill="#37E359" name="Candidaturas" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Atividades recentes */}
              <div className="bg-white dark:bg-secondary-dark p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-4">Atividades Recentes</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-500 flex-shrink-0 mr-4">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Novo aluno cadastrado</p>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                        Fernanda Torres se cadastrou na plataforma.
                      </p>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-xs mt-1">
                        Hoje, 10:45
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-500 flex-shrink-0 mr-4">
                      <Briefcase className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Nova vaga publicada</p>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                        QuantumCode publicou a vaga "Analista de Dados".
                      </p>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-xs mt-1">
                        Hoje, 09:30
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-500 flex-shrink-0 mr-4">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Nova empresa cadastrada</p>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                        CoreTech se cadastrou na plataforma.
                      </p>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-xs mt-1">
                        Ontem, 15:20
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-500 flex-shrink-0 mr-4">
                      <AlertCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Alerta de sistema</p>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-sm">
                        O backup diário foi concluído com sucesso.
                      </p>
                      <p className="text-text-muted-light dark:text-text-muted-dark text-xs mt-1">
                        Ontem, 23:00
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Alunos */}
          {activeTab === 'students' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Alunos</h1>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    Gerenciar alunos cadastrados na plataforma
                  </p>
                </div>
                
                <Link
                  to="/admin/students/new"
                  className="px-4 py-2 bg-primary text-white rounded-lg flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Aluno
                </Link>
              </div>
              
              {/* Barra de pesquisa */}
              <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por nome, email ou habilidade..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-secondary-light focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light"
                />
              </div>
              
              {/* Tabela de alunos */}
              <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-secondary text-text-light dark:text-text-dark">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nome</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Habilidades</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data de Cadastro</th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-secondary-light">
                      {currentItems.length > 0 ? (
                        currentItems.map((student) => (
                          <tr key={student.id} className="hover:bg-gray-50 dark:hover:bg-secondary">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                  <span className="font-medium text-primary">
                                    {student.name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium">{student.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{student.email}</td>
                            <td className="px-6 py-4">
                              <div className="flex flex-wrap gap-1">
                                {student.skills.map((skill, index) => (
                                  <span 
                                    key={index} 
                                    className="px-2 py-0.5 bg-gray-100 dark:bg-secondary-light rounded-full text-xs"
                                  >
                                    {skill}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(student.createdAt)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Link
                                  to={`/admin/students/${student.id}`}
                                  className="p-1 text-blue-600 hover:text-blue-900"
                                >
                                  <Eye size={18} />
                                </Link>
                                <Link
                                  to={`/admin/students/${student.id}/edit`}
                                  className="p-1 text-yellow-600 hover:text-yellow-900"
                                >
                                  <Edit size={18} />
                                </Link>
                                <button
                                  onClick={() => handleDelete(student.id)}
                                  className="p-1 text-red-600 hover:text-red-900"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="px-6 py-4 text-center text-text-muted-light dark:text-text-muted-dark">
                            Nenhum registro encontrado
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Paginação */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-secondary-light">
                  <Pagination />
                </div>
              </div>
            </div>
          )}
          
          {/* Empresas */}
          {activeTab === 'companies' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Empresas</h1>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    Gerenciar empresas cadastradas na plataforma
                  </p>
                </div>
                
                <Link
                  to="/admin/companies/new"
                  className="px-4 py-2 bg-primary text-white rounded-lg flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Empresa
                </Link>
              </div>
              
              {/* Barra de pesquisa */}
              <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por nome, responsável ou email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-secondary-light focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light"
                />
              </div>
              
              {/* Tabela de empresas */}
              <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-secondary text-text-light dark:text-text-dark">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Empresa</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Responsável</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Email</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Vagas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Data de Cadastro</th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-secondary-light">
                      {currentItems.length > 0 ? (
                        currentItems.map((company) => (
                          <tr key={company.id} className="hover:bg-gray-50 dark:hover:bg-secondary">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-3">
                                  <span className="font-medium text-primary">
                                    {company.name.charAt(0)}
                                  </span>
                                </div>
                                <div>
                                  <div className="font-medium">{company.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{company.responsibleName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{company.email}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs">
                                {company.jobsCount} vagas
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{formatDate(company.createdAt)}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Link
                                  to={`/admin/companies/${company.id}`}
                                  className="p-1 text-blue-600 hover:text-blue-900"
                                >
                                  <Eye size={18} />
                                </Link>
                                <Link
                                  to={`/admin/companies/${company.id}/edit`}
                                  className="p-1 text-yellow-600 hover:text-yellow-900"
                                >
                                  <Edit size={18} />
                                </Link>
                                <button
                                  onClick={() => handleDelete(company.id)}
                                  className="p-1 text-red-600 hover:text-red-900"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="px-6 py-4 text-center text-text-muted-light dark:text-text-muted-dark">
                            Nenhum registro encontrado
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Paginação */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-secondary-light">
                  <Pagination />
                </div>
              </div>
            </div>
          )}
          
          {/* Vagas */}
          {activeTab === 'jobs' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Vagas</h1>
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    Gerenciar vagas publicadas na plataforma
                  </p>
                </div>
                
                <Link
                  to="/admin/jobs/new"
                  className="px-4 py-2 bg-primary text-white rounded-lg flex items-center"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Adicionar Vaga
                </Link>
              </div>
              
              {/* Barra de pesquisa */}
              <div className="mb-6 relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar por título, empresa ou localização..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 dark:border-secondary-light focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light"
                />
              </div>
              
              {/* Tabela de vagas */}
              <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-secondary text-text-light dark:text-text-dark">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Vaga</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Empresa</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Localização</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Nível</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Candidaturas</th>
                        <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-secondary-light">
                      {currentItems.length > 0 ? (
                        currentItems.map((job) => (
                          <tr key={job.id} className="hover:bg-gray-50 dark:hover:bg-secondary">
                            <td className="px-6 py-4">
                              <div className="font-medium">{job.title}</div>
                              <div className="text-xs text-text-muted-light dark:text-text-muted-dark">
                                Publicada em {formatDate(job.createdAt)}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">{job.company}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{job.location}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                ${job.level === 'JUNIOR' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                                  job.level === 'PLENO' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300' : 
                                  'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300'}`}
                              >
                                {job.level === 'JUNIOR' ? 'Júnior' : 
                                 job.level === 'PLENO' ? 'Pleno' : 'Sênior'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full text-xs">
                                {job.applicationsCount} candidato{job.applicationsCount !== 1 ? 's' : ''}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium 
                                ${job.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                                  'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'}`}
                              >
                                {job.status === 'active' ? 'Ativa' : 'Inativa'}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <div className="flex justify-end space-x-2">
                                <Link
                                  to={`/admin/jobs/${job.id}`}
                                  className="p-1 text-blue-600 hover:text-blue-900"
                                >
                                  <Eye size={18} />
                                </Link>
                                <Link
                                  to={`/admin/jobs/${job.id}/edit`}
                                  className="p-1 text-yellow-600 hover:text-yellow-900"
                                >
                                  <Edit size={18} />
                                </Link>
                                <button
                                  onClick={() => handleDelete(job.id)}
                                  className="p-1 text-red-600 hover:text-red-900"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="px-6 py-4 text-center text-text-muted-light dark:text-text-muted-dark">
                            Nenhum registro encontrado
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Paginação */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-secondary-light">
                  <Pagination />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;