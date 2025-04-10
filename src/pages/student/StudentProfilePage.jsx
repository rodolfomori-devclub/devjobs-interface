// src/pages/student/StudentProfilePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  User, MapPin, Mail, Phone, Github, Linkedin, 
  Globe, Star, Calendar, Briefcase, Edit, 
  Save, X, Upload, Camera, FileText, Plus
} from 'lucide-react';

// Layout Components
import DashboardLayout from '../../components/layout/DashboardLayout';
import apiService from '../../services/api';

// Mock Data
const mockProfile = {
  id: 1,
  name: 'João Silva',
  email: 'joao.silva@email.com',
  phone: '(11) 98765-4321',
  location: 'São Paulo, SP',
  country: 'Brasil',
  avatar: null,
  coverImage: null,
  bio: 'Desenvolvedor front-end apaixonado por criar interfaces bonitas e funcionais. Experiência com React, Angular e Vue.js. Aluno dedicado do DevClub, busco constantemente aprender novas tecnologias e me desenvolver profissionalmente.',
  skills: [
    { name: 'React', level: 4 },
    { name: 'JavaScript', level: 5 },
    { name: 'HTML', level: 5 },
    { name: 'CSS', level: 4 },
    { name: 'TypeScript', level: 3 },
    { name: 'Node.js', level: 2 },
    { name: 'Git', level: 4 },
    { name: 'Figma', level: 3 }
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
  isFreelancer: true,
  experiences: [
    {
      id: 1,
      company: 'TechSolutions',
      role: 'Desenvolvedor Front-end Jr',
      startDate: '2023-01',
      endDate: null,
      current: true,
      description: 'Desenvolvimento de interfaces com React e TypeScript. Trabalho em equipe utilizando metodologias ágeis.'
    },
    {
      id: 2,
      company: 'WebAgency',
      role: 'Estagiário de Desenvolvimento',
      startDate: '2022-03',
      endDate: '2022-12',
      current: false,
      description: 'Criação de sites responsivos com HTML, CSS e JavaScript. Participação em projetos para diversos clientes.'
    }
  ]
};

const StudentProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Estados para edição de experiência
  const [editingExperience, setEditingExperience] = useState(null);
  const [isAddingExperience, setIsAddingExperience] = useState(false);
  
  // Estado para nova habilidade
  const [newSkill, setNewSkill] = useState({ name: '', level: 3 });
  
  // Refs para inputs de arquivo
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const resumeInputRef = useRef(null);
  
  // Sugestões de habilidades
  const skillSuggestions = [
    'React', 'Angular', 'Vue.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SASS', 
    'Node.js', 'Express', 'NestJS', 'Django', 'Flask', 'Spring Boot', 
    'PHP', 'Laravel', 'Ruby on Rails', 'SQL', 'MongoDB', 'PostgreSQL', 
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Git',
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Java', 'Python', 'C#', 'Go'
  ];
  
  // Carregar dados do perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Em uma aplicação real, aqui você faria a chamada à API
        // const response = await apiService.students.getProfile();
        // setProfile(response.data);
        
        // Usando dados mock para demonstração
        setTimeout(() => {
          setProfile(mockProfile);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching profile:', error);
        setError('Não foi possível carregar os dados do perfil. Por favor, tente novamente.');
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);
  
  // Iniciar edição com os dados atuais
  const handleStartEditing = () => {
    setIsEditing(true);
  };
  
  // Cancelar edição
  const handleCancelEditing = () => {
    setIsEditing(false);
    // Reset de qualquer dado temporário
    setEditingExperience(null);
    setIsAddingExperience(false);
  };
  
  // Salvar alterações
  const handleSaveProfile = async () => {
    try {
      // Em uma aplicação real, aqui você faria a chamada à API
      // await apiService.students.updateProfile(profile);
      
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Ocorreu um erro ao atualizar o perfil. Por favor, tente novamente.');
    }
  };
  
  // Manipuladores de edição de perfil
  const handleProfileChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setProfile(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };
  
  // Manipulador de links
  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    
    setProfile(prev => ({
      ...prev,
      links: {
        ...prev.links,
        [name]: value
      }
    }));
  };
  
  // Manipuladores de upload de arquivos
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Em uma aplicação real, você faria o upload do arquivo para o servidor
      // e atualizaria o URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          avatar: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCoverChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          coverImage: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile(prev => ({
        ...prev,
        resume: {
          ...prev.resume,
          filename: file.name
          // Em uma aplicação real, você faria o upload do arquivo
          // e atualizaria o URL
        }
      }));
    }
  };
  
  // Manipuladores de habilidades
  const handleNewSkillChange = (e) => {
    const { name, value } = e.target;
    setNewSkill({
      ...newSkill,
      [name]: name === 'level' ? parseInt(value) : value
    });
  };
  
  const addSkill = () => {
    if (newSkill.name.trim()) {
      // Verificar se a habilidade já existe
      const skillExists = profile.skills.some(
        skill => skill.name.toLowerCase() === newSkill.name.toLowerCase()
      );
      
      if (!skillExists) {
        setProfile(prev => ({
          ...prev,
          skills: [...prev.skills, { ...newSkill }]
        }));
        setNewSkill({ name: '', level: 3 });
      }
    }
  };
  
  const removeSkill = (skillName) => {
    setProfile(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.name !== skillName)
    }));
  };
  
  // Manipuladores de experiência
  const handleExperienceChange = (e, index) => {
    const { name, value, type, checked } = e.target;
    
    if (isAddingExperience) {
      setEditingExperience(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
        endDate: name === 'current' && checked ? null : prev.endDate
      }));
    } else {
      const updatedExperiences = [...profile.experiences];
      updatedExperiences[index] = {
        ...updatedExperiences[index],
        [name]: type === 'checkbox' ? checked : value,
        endDate: name === 'current' && checked ? null : updatedExperiences[index].endDate
      };
      
      setProfile(prev => ({
        ...prev,
        experiences: updatedExperiences
      }));
    }
  };
  
  const startAddExperience = () => {
    setIsAddingExperience(true);
    setEditingExperience({
      company: '',
      role: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    });
  };
  
  const saveNewExperience = () => {
    if (editingExperience.company && editingExperience.role && editingExperience.startDate) {
      setProfile(prev => ({
        ...prev,
        experiences: [
          ...prev.experiences,
          {
            id: Date.now(), // Temporário para UI
            ...editingExperience
          }
        ]
      }));
      
      setIsAddingExperience(false);
      setEditingExperience(null);
    } else {
      alert('Por favor, preencha os campos obrigatórios: Empresa, Cargo e Data de Início');
    }
  };
  
  const cancelAddExperience = () => {
    setIsAddingExperience(false);
    setEditingExperience(null);
  };
  
  const removeExperience = (experienceId) => {
    setProfile(prev => ({
      ...prev,
      experiences: prev.experiences.filter(exp => exp.id !== experienceId)
    }));
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
  
  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="flex flex-col items-center">
            <svg className="animate-spin h-12 w-12 text-primary mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-text-muted-light dark:text-text-muted-dark">Carregando seu perfil...</p>
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
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </DashboardLayout>
    );
  }
  
  if (!profile) {
    return (
      <DashboardLayout>
        <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-8 text-center">
          <h3 className="text-xl font-bold mb-2">Perfil não encontrado</h3>
          <p className="text-text-muted-light dark:text-text-muted-dark mb-4">Não foi possível encontrar seus dados de perfil.</p>
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
          >
            Voltar para o Dashboard
          </Link>
        </div>
      </DashboardLayout>
    );
  }
  
  return (
    <DashboardLayout>
      {/* Cabeçalho de perfil com imagem de capa */}
      <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md overflow-hidden mb-6">
        <div className="relative h-48 bg-gray-200 dark:bg-secondary">
          {profile.coverImage ? (
            <img 
              src={profile.coverImage} 
              alt="Capa" 
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-primary/20 to-secondary/20">
              <span className="text-text-muted-light dark:text-text-muted-dark">
                {isEditing ? 'Clique para adicionar uma imagem de capa' : 'Sem imagem de capa'}
              </span>
            </div>
          )}
          
          {isEditing && (
            <button
              onClick={() => coverInputRef.current.click()}
              className="absolute bottom-4 right-4 p-2 bg-white dark:bg-secondary-dark rounded-full shadow-md"
            >
              <Camera className="w-5 h-5 text-primary" />
              <input
                type="file"
                ref={coverInputRef}
                onChange={handleCoverChange}
                className="hidden"
                accept="image/*"
              />
            </button>
          )}
          
          <div className="absolute -bottom-16 left-6">
            <div className="relative w-32 h-32 rounded-full border-4 border-white dark:border-secondary-dark bg-white dark:bg-secondary-dark overflow-hidden">
              {profile.avatar ? (
                <img 
                  src={profile.avatar} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10">
                  <User className="w-12 h-12 text-primary" />
                </div>
              )}
              
              {isEditing && (
                <button
                  onClick={() => avatarInputRef.current.click()}
                  className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-secondary-dark rounded-full shadow-md"
                >
                  <Camera className="w-4 h-4 text-primary" />
                  <input
                    type="file"
                    ref={avatarInputRef}
                    onChange={handleAvatarChange}
                    className="hidden"
                    accept="image/*"
                  />
                </button>
              )}
            </div>
          </div>
        </div>
        
        <div className="mt-20 p-6">
          <div className="flex justify-between items-start">
            <div>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  className="text-2xl font-bold mb-1 p-1 border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                />
              ) : (
                <h1 className="text-2xl font-bold mb-1">{profile.name}</h1>
              )}
              
              <div className="flex flex-wrap items-center text-text-muted-light dark:text-text-muted-dark text-sm">
                <div className="flex items-center mr-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleProfileChange}
                      className="p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  ) : (
                    profile.location
                  )}
                </div>
                
                {profile.isFreelancer && (
                  <span className="px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded-full text-xs font-medium">
                    Disponível para freelance
                  </span>
                )}
                
                {isEditing && (
                  <label className="flex items-center ml-4">
                    <input
                      type="checkbox"
                      name="isFreelancer"
                      checked={profile.isFreelancer}
                      onChange={handleProfileChange}
                      className="mr-2 w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                    <span className="text-sm">Disponível para freelance</span>
                  </label>
                )}
              </div>
            </div>
            
            <div>
              {isEditing ? (
                <div className="flex space-x-3">
                  <button
                    onClick={handleCancelEditing}
                    className="px-4 py-2 border border-gray-300 dark:border-secondary-light rounded-lg hover:bg-gray-50 dark:hover:bg-secondary transition-colors flex items-center"
                  >
                    <X className="w-5 h-5 mr-1" />
                    Cancelar
                  </button>
                  
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                  >
                    <Save className="w-5 h-5 mr-1" />
                    Salvar
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleStartEditing}
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center"
                >
                  <Edit className="w-5 h-5 mr-1" />
                  Editar Perfil
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Conteúdo do perfil */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna da esquerda */}
        <div className="md:col-span-1 space-y-6">
          {/* Informações de contato */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Informações de Contato</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Mail className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Email</h3>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  ) : (
                    <p>{profile.email}</p>
                  )}
                </div>
              </div>
              
              <div className="flex items-start">
                <Phone className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Telefone</h3>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  ) : (
                    <p>{profile.phone}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Links */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Links</h2>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <Github className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-grow">
                  <h3 className="text-sm font-medium">GitHub</h3>
                  {isEditing ? (
                    <input
                      type="url"
                      name="github"
                      value={profile.links.github || ''}
                      onChange={handleLinkChange}
                      placeholder="https://github.com/username"
                      className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  ) : profile.links.github ? (
                    <a 
                      href={profile.links.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {profile.links.github}
                    </a>
                  ) : (
                    <span className="text-text-muted-light dark:text-text-muted-dark">Não informado</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-start">
                <Linkedin className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-grow">
                  <h3 className="text-sm font-medium">LinkedIn</h3>
                  {isEditing ? (
                    <input
                      type="url"
                      name="linkedin"
                      value={profile.links.linkedin || ''}
                      onChange={handleLinkChange}
                      placeholder="https://linkedin.com/in/username"
                      className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  ) : profile.links.linkedin ? (
                    <a 
                      href={profile.links.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {profile.links.linkedin}
                    </a>
                  ) : (
                    <span className="text-text-muted-light dark:text-text-muted-dark">Não informado</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-start">
                <Globe className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-grow">
                  <h3 className="text-sm font-medium">Portfolio</h3>
                  {isEditing ? (
                    <input
                      type="url"
                      name="portfolio"
                      value={profile.links.portfolio || ''}
                      onChange={handleLinkChange}
                      placeholder="https://seuportfolio.com"
                      className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  ) : profile.links.portfolio ? (
                    <a 
                      href={profile.links.portfolio} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {profile.links.portfolio}
                    </a>
                  ) : (
                    <span className="text-text-muted-light dark:text-text-muted-dark">Não informado</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Currículo */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Currículo</h2>
            
            {profile.resume ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FileText className="w-6 h-6 text-primary mr-3" />
                  <span>{profile.resume.filename}</span>
                </div>
                
                {isEditing ? (
                  <button
                    onClick={() => resumeInputRef.current.click()}
                    className="px-3 py-1 border border-gray-300 dark:border-secondary-light rounded-lg hover:bg-gray-50 dark:hover:bg-secondary transition-colors text-sm flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Atualizar
                    <input
                      type="file"
                      ref={resumeInputRef}
                      onChange={handleResumeChange}
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                    />
                  </button>
                ) : (
                  <a 
                    href={profile.resume.url}
                    download
                    className="px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm flex items-center"
                  >
                    Download
                  </a>
                )}
              </div>
            ) : (
              <div className="text-center py-4">
                {isEditing ? (
                  <div>
                    <button
                      onClick={() => resumeInputRef.current.click()}
                      className="px-4 py-2 border border-dashed border-gray-300 dark:border-secondary-light rounded-lg hover:bg-gray-50 dark:hover:bg-secondary transition-colors flex items-center mx-auto"
                    >
                      <Upload className="w-5 h-5 mr-2" />
                      Upload CV
                      <input
                        type="file"
                        ref={resumeInputRef}
                        onChange={handleResumeChange}
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                      />
                    </button>
                    <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-2">
                      Formatos aceitos: PDF, DOC, DOCX
                    </p>
                  </div>
                ) : (
                  <p className="text-text-muted-light dark:text-text-muted-dark">
                    Nenhum currículo anexado
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
        
        {/* Coluna central e direita */}
        <div className="md:col-span-2 space-y-6">
          {/* Sobre mim */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Sobre Mim</h2>
            
            {isEditing ? (
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                rows="5"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
              ></textarea>
            ) : (
              <p className="text-text-light dark:text-text-dark whitespace-pre-line">
                {profile.bio}
              </p>
            )}
          </div>
          
          {/* Habilidades */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Habilidades</h2>
              
              {isEditing && (
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nova habilidade"
                    value={newSkill.name}
                    onChange={handleNewSkillChange}
                    list="skill-suggestions"
                    className="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                  />
                  <datalist id="skill-suggestions">
                    {skillSuggestions.map((skill) => (
                      <option key={skill} value={skill} />
                    ))}
                  </datalist>
                  
                  <select
                    name="level"
                    value={newSkill.level}
                    onChange={handleNewSkillChange}
                    className="p-2 text-sm border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                  >
                    <option value="1">Iniciante</option>
                    <option value="2">Básico</option>
                    <option value="3">Intermediário</option>
                    <option value="4">Avançado</option>
                    <option value="5">Especialista</option>
                  </select>
                  
                  <button
                    onClick={addSkill}
                    className="p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {profile.skills.map((skill, index) => (
                <div 
                  key={index} 
                  className="border border-gray-200 dark:border-secondary-light rounded-lg p-3 flex justify-between items-center"
                >
                  <div>
                    <h3 className="font-medium">{skill.name}</h3>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={16} 
                          className={i < skill.level ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill.name)}
                      className="p-1 text-red-500 hover:text-red-700 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            
            {profile.skills.length === 0 && (
              <div className="text-center py-4 text-text-muted-light dark:text-text-muted-dark">
                Nenhuma habilidade cadastrada
              </div>
            )}
          </div>
          
          {/* Experiências */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">Experiência Profissional</h2>
              
              {isEditing && !isAddingExperience && (
                <button
                  onClick={startAddExperience}
                  className="px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm flex items-center"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </button>
              )}
            </div>
            
            {isAddingExperience ? (
              <div className="border border-gray-200 dark:border-secondary-light rounded-lg p-4 mb-4 bg-gray-50 dark:bg-secondary-light">
                <h3 className="font-medium mb-3">Nova Experiência</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Empresa *</label>
                    <input
                      type="text"
                      name="company"
                      value={editingExperience.company}
                      onChange={(e) => handleExperienceChange(e)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary dark:border-secondary-light text-sm"
                      placeholder="Nome da empresa"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Cargo *</label>
                    <input
                      type="text"
                      name="role"
                      value={editingExperience.role}
                      onChange={(e) => handleExperienceChange(e)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary dark:border-secondary-light text-sm"
                      placeholder="Seu cargo"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Data de Início *</label>
                    <input
                      type="month"
                      name="startDate"
                      value={editingExperience.startDate}
                      onChange={(e) => handleExperienceChange(e)}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary dark:border-secondary-light text-sm"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Data de Término</label>
                    <input
                      type="month"
                      name="endDate"
                      value={editingExperience.endDate || ''}
                      onChange={(e) => handleExperienceChange(e)}
                      disabled={editingExperience.current}
                      className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary dark:border-secondary-light text-sm disabled:bg-gray-100 disabled:text-gray-400"
                    />
                    <div className="flex items-center mt-1">
                      <input
                        type="checkbox"
                        name="current"
                        id="current"
                        checked={editingExperience.current}
                        onChange={(e) => handleExperienceChange(e)}
                        className="mr-2 text-primary rounded focus:ring-primary"
                      />
                      <label htmlFor="current" className="text-sm">Trabalho atual</label>
                    </div>
                  </div>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <textarea
                    name="description"
                    value={editingExperience.description}
                    onChange={(e) => handleExperienceChange(e)}
                    rows="3"
                    placeholder="Descreva suas responsabilidades e realizações neste cargo"
                    className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary dark:border-secondary-light text-sm"
                  ></textarea>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <button
                    onClick={cancelAddExperience}
                    className="px-3 py-1 border border-gray-300 dark:border-secondary rounded-lg hover:bg-gray-50 dark:hover:bg-secondary-dark transition-colors text-sm"
                  >
                    Cancelar
                  </button>
                  
                  <button
                    onClick={saveNewExperience}
                    className="px-3 py-1 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
                  >
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {profile.experiences.length > 0 ? (
                  profile.experiences.map((experience, index) => (
                    <div 
                      key={experience.id} 
                      className="border border-gray-200 dark:border-secondary-light rounded-lg p-4 relative"
                    >
                      {isEditing && (
                        <button
                          onClick={() => removeExperience(experience.id)}
                          className="absolute top-2 right-2 p-1 text-red-500 hover:text-red-700 transition-colors"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      )}
                      
                      <div className="flex items-start">
                        <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary mr-3 flex-shrink-0">
                          <Briefcase className="w-5 h-5" />
                        </div>
                        
                        <div>
                          {isEditing ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
                              <input
                                type="text"
                                name="role"
                                value={experience.role}
                                onChange={(e) => handleExperienceChange(e, index)}
                                className="font-medium p-1 border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                              />
                              
                              <input
                                type="text"
                                name="company"
                                value={experience.company}
                                onChange={(e) => handleExperienceChange(e, index)}
                                className="text-text-muted-light dark:text-text-muted-dark p-1 border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                              />
                            </div>
                          ) : (
                            <>
                              <h3 className="font-medium">{experience.role}</h3>
                              <p className="text-text-muted-light dark:text-text-muted-dark">
                                {experience.company}
                              </p>
                            </>
                          )}
                          
                          <div className="flex items-center text-sm text-text-muted-light dark:text-text-muted-dark mb-2">
                            <Calendar className="w-4 h-4 mr-1" />
                            {isEditing ? (
                              <div className="flex items-center space-x-2">
                                <input
                                  type="month"
                                  name="startDate"
                                  value={experience.startDate}
                                  onChange={(e) => handleExperienceChange(e, index)}
                                  className="p-1 text-xs border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary w-32"
                                />
                                <span>até</span>
                                <div className="flex flex-col">
                                  <input
                                    type="month"
                                    name="endDate"
                                    value={experience.endDate || ''}
                                    onChange={(e) => handleExperienceChange(e, index)}
                                    disabled={experience.current}
                                    className="p-1 text-xs border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary w-32 disabled:bg-gray-100 disabled:text-gray-400"
                                  />
                                  <label className="flex items-center mt-1 text-xs">
                                    <input
                                      type="checkbox"
                                      name="current"
                                      checked={experience.current}
                                      onChange={(e) => handleExperienceChange(e, index)}
                                      className="mr-1 text-primary rounded focus:ring-primary"
                                    />
                                    Emprego atual
                                  </label>
                                </div>
                              </div>
                            ) : (
                              <span>
                                {formatDate(experience.startDate)} - {experience.current ? 'Atual' : formatDate(experience.endDate)}
                              </span>
                            )}
                          </div>
                          
                          {isEditing ? (
                            <textarea
                              name="description"
                              value={experience.description}
                              onChange={(e) => handleExperienceChange(e, index)}
                              rows="3"
                              className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                            ></textarea>
                          ) : experience.description ? (
                            <p className="text-sm">{experience.description}</p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-text-muted-light dark:text-text-muted-dark">
                    Nenhuma experiência cadastrada
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentProfilePage;