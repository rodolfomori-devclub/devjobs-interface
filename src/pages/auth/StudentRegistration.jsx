// src/pages/auth/StudentRegistration.jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CheckCircle, 
  Upload, 
  ArrowLeft, 
  ArrowRight, 
  Star, 
  StarHalf, 
  Plus, 
  Trash2, 
  Camera,
  Github,
  Linkedin,
  Globe,
  File,
  AlertCircle
} from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

// Componente multiestágio de cadastro de aluno
const StudentRegistration = () => {
  const navigate = useNavigate();
  const { registerStudent, isLoading, error } = useAuth();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      city: '',
      state: '',
      country: 'Brasil',
      notInBrazil: false,
      phone: '',
      gender: '',
      specialNeeds: '',
      profilePicture: null,
      coverPicture: null,
      password: '',
      confirmPassword: ''
    },
    professionalInfo: {
      portfolio: '',
      github: '',
      linkedin: '',
      resume: null,
      isFreelancer: false
    },
    skills: [],
    bio: '',
    experiences: []
  });
  
  const [formError, setFormError] = useState('');

  const totalSteps = 4;
  
  // Refs para os inputs de arquivo
  const profilePictureRef = useRef(null);
  const coverPictureRef = useRef(null);
  const resumeRef = useRef(null);
  
  // Estado para as visualizações de imagem
  const [profilePreview, setProfilePreview] = useState(null);
  const [coverPreview, setCoverPreview] = useState(null);
  const [resumeFileName, setResumeFileName] = useState(null);
  
  // Estado para a nova habilidade
  const [newSkill, setNewSkill] = useState({ name: '', level: 3 });
  
  // Estado para sugestões de habilidades
  const [skillSuggestions] = useState([
    'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Angular', 'Vue.js',
    'Node.js', 'Express', 'NestJS', 'Python', 'Django', 'Flask', 'Java',
    'Spring Boot', 'PHP', 'Laravel', 'Ruby', 'Ruby on Rails', 'C#', '.NET Core',
    'Go', 'Rust', 'Swift', 'Kotlin', 'Flutter', 'React Native', 'SQL', 'MongoDB',
    'Firebase', 'AWS', 'Azure', 'Docker', 'Kubernetes', 'GraphQL', 'REST API'
  ]);
  
  // Estado para nova experiência
  const [newExperience, setNewExperience] = useState({
    company: '',
    role: '',
    startDate: '',
    endDate: '',
    description: '',
    current: false
  });
  
  // Manipuladores de mudança de formulário
  const handlePersonalInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'notInBrazil') {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          notInBrazil: checked,
          state: checked ? '' : formData.personalInfo.state,
          city: checked ? '' : formData.personalInfo.city,
          country: checked ? '' : 'Brasil',
        }
      });
    } else {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          [name]: type === 'checkbox' ? checked : value
        }
      });
    }
  };
  
  const handleProfessionalInfoChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      professionalInfo: {
        ...formData.professionalInfo,
        [name]: type === 'checkbox' ? checked : value
      }
    });
  };
  
  // Manipuladores de envio de arquivo
  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          profilePicture: file
        }
      });
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleCoverPictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        personalInfo: {
          ...formData.personalInfo,
          coverPicture: file
        }
      });
      
      // Criar preview da imagem
      const reader = new FileReader();
      reader.onloadend = () => {
        setCoverPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleResumeChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        professionalInfo: {
          ...formData.professionalInfo,
          resume: file
        }
      });
      setResumeFileName(file.name);
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
      const skillExists = formData.skills.some(
        skill => skill.name.toLowerCase() === newSkill.name.toLowerCase()
      );
      
      if (!skillExists) {
        setFormData({
          ...formData,
          skills: [...formData.skills, { ...newSkill }]
        });
        setNewSkill({ name: '', level: 3 });
      }
    }
  };
  
  const removeSkill = (index) => {
    const updatedSkills = [...formData.skills];
    updatedSkills.splice(index, 1);
    setFormData({
      ...formData,
      skills: updatedSkills
    });
  };
  
  // Manipuladores de experiências
  const handleNewExperienceChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name === 'current') {
      setNewExperience({
        ...newExperience,
        current: checked,
        endDate: checked ? '' : newExperience.endDate
      });
    } else {
      setNewExperience({
        ...newExperience,
        [name]: type === 'checkbox' ? checked : value
      });
    }
  };
  
  const addExperience = () => {
    if (newExperience.company && newExperience.role && newExperience.startDate) {
      setFormData({
        ...formData,
        experiences: [...formData.experiences, { ...newExperience }]
      });
      setNewExperience({
        company: '',
        role: '',
        startDate: '',
        endDate: '',
        description: '',
        current: false
      });
    }
  };
  
  const removeExperience = (index) => {
    const updatedExperiences = [...formData.experiences];
    updatedExperiences.splice(index, 1);
    setFormData({
      ...formData,
      experiences: updatedExperiences
    });
  };
  
  // Manipulador de bio
  const handleBioChange = (e) => {
    setFormData({
      ...formData,
      bio: e.target.value
    });
  };
  
  // Validação por etapa
  const validateStep = (step) => {
    setFormError('');
    
    switch (step) {
      case 1: {
        const { name, email, phone, password, confirmPassword } = formData.personalInfo;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!name || !email || !phone || !password || !confirmPassword) {
          setFormError('Por favor, preencha todos os campos obrigatórios.');
          return false;
        }
        
        if (!emailRegex.test(email)) {
          setFormError('Por favor, informe um e-mail válido.');
          return false;
        }
        
        if (password !== confirmPassword) {
          setFormError('As senhas não coincidem.');
          return false;
        }
        
        if (password.length < 6) {
          setFormError('A senha deve ter pelo menos 6 caracteres.');
          return false;
        }
        
        return true;
      }
      case 2: {
        // Validação dos links (opcional)
        const { linkedin } = formData.professionalInfo;
        
        if (!linkedin) {
          setFormError('O link do LinkedIn é obrigatório.');
          return false;
        }
        
        return true;
      }
      case 3: {
        // Passo 3 (Skills e Bio) - validamos que tenha pelo menos uma habilidade
        if (formData.skills.length === 0) {
          setFormError('Adicione pelo menos uma habilidade.');
          return false;
        }
        
        if (!formData.bio || formData.bio.trim().length < 10) {
          setFormError('Por favor, escreva uma descrição com pelo menos 10 caracteres.');
          return false;
        }
        
        return true;
      }
      default:
        return true;
    }
  };
  
  // Navegação entre etapas
  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
    window.scrollTo(0, 0);
  };
  
  // Envio do formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      setFormError('');
      
      // Preparar dados para envio
      const studentData = {
        name: formData.personalInfo.name,
        email: formData.personalInfo.email,
        phone: formData.personalInfo.phone,
        gender: formData.personalInfo.gender,
        city: formData.personalInfo.city,
        state: formData.personalInfo.state,
        country: formData.personalInfo.country,
        notInBrazil: formData.personalInfo.notInBrazil,
        specialNeeds: formData.personalInfo.specialNeeds,
        password: formData.personalInfo.password,
        github: formData.professionalInfo.github,
        linkedin: formData.professionalInfo.linkedin,
        portfolio: formData.professionalInfo.portfolio,
        isFreelancer: formData.professionalInfo.isFreelancer,
        bio: formData.bio,
        skills: formData.skills,
        experiences: formData.experiences
      };
      
      // Upload de arquivos a ser implementado separadamente (usando FormData)
      // Em uma implementação real, você pode precisar fazer upload dos arquivos primeiro
      // e então salvar as URLs no perfil do aluno
      
      // Registrar aluno
      await registerStudent(studentData);
      
      // Redirecionar para o dashboard após sucesso
      navigate('/dashboard');
    } catch (error) {
      console.error('Registration error:', error);
      setFormError(error.response?.data?.message || 'Ocorreu um erro ao cadastrar. Por favor, tente novamente.');
    }
  };
  
  // Variantes para animação
  const pageVariants = {
    initial: {
      opacity: 0,
      x: 100
    },
    in: {
      opacity: 1,
      x: 0
    },
    out: {
      opacity: 0,
      x: -100
    }
  };
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 text-center">
            <Link to="/" className="inline-block mb-6">
              <h1 className="text-3xl font-bold">
                <span className="text-primary">Dev</span>
                <span className="text-secondary dark:text-white">Jobs</span>
              </h1>
            </Link>
            <h2 className="text-2xl font-bold mb-2">Cadastro de Aluno</h2>
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Crie seu perfil para encontrar as melhores oportunidades
            </p>
          </div>
          
          {/* Indicador de progresso */}
          <div className="mb-10">
            <div className="flex justify-between items-center">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step} 
                  className="flex flex-col items-center"
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      currentStep === step 
                        ? 'bg-primary text-white' 
                        : currentStep > step 
                          ? 'bg-primary-dark text-white' 
                          : 'bg-gray-200 dark:bg-secondary-light text-text-muted-light dark:text-text-muted-dark'
                    }`}
                  >
                    {currentStep > step ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      step
                    )}
                  </div>
                  <div className="text-sm mt-2 text-center">
                    {step === 1 && 'Dados Pessoais'}
                    {step === 2 && 'Perfil Profissional'}
                    {step === 3 && 'Habilidades'}
                    {step === 4 && 'Finalizar'}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative mt-4">
              <div className="absolute h-1 bg-gray-200 dark:bg-secondary-light w-full rounded"></div>
              <div 
                className="absolute h-1 bg-primary rounded transition-all" 
                style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Formulário */}
          <div className="bg-white dark:bg-secondary p-8 rounded-xl shadow-lg">
            {formError && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-start">
                <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <AnimatePresence mode="wait">
                {/* Passo 1: Dados Pessoais */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">Dados Pessoais</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">
                          Nome completo *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Seu nome completo"
                          value={formData.personalInfo.name}
                          onChange={handlePersonalInfoChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">
                          E-mail do DevClub *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="Seu e-mail cadastrado no DevClub"
                          value={formData.personalInfo.email}
                          onChange={handlePersonalInfoChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="phone">
                          Telefone *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="(00) 00000-0000"
                          value={formData.personalInfo.phone}
                          onChange={handlePersonalInfoChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="gender">
                          Gênero
                        </label>
                        <select
                          id="gender"
                          name="gender"
                          value={formData.personalInfo.gender}
                          onChange={handlePersonalInfoChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                        >
                          <option value="">Selecione...</option>
                          <option value="male">Masculino</option>
                          <option value="female">Feminino</option>
                          <option value="other">Outro</option>
                          <option value="prefer_not_to_say">Prefiro não informar</option>
                        </select>
                      </div>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id="notInBrazil"
                          name="notInBrazil"
                          checked={formData.personalInfo.notInBrazil}
                          onChange={handlePersonalInfoChange}
                          className="mr-2 w-4 h-4 text-primary focus:ring-primary"
                        />
                        <label htmlFor="notInBrazil">Não moro no Brasil</label>
                      </div>
                      
                      {!formData.personalInfo.notInBrazil ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="state">
                              Estado
                            </label>
                            <select
                              id="state"
                              name="state"
                              value={formData.personalInfo.state}
                              onChange={handlePersonalInfoChange}
                              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                            >
                              <option value="">Selecione o estado...</option>
                              <option value="AC">Acre</option>
                              <option value="AL">Alagoas</option>
                              <option value="AP">Amapá</option>
                              <option value="AM">Amazonas</option>
                              <option value="BA">Bahia</option>
                              <option value="CE">Ceará</option>
                              <option value="DF">Distrito Federal</option>
                              <option value="ES">Espírito Santo</option>
                              <option value="GO">Goiás</option>
                              <option value="MA">Maranhão</option>
                              <option value="MT">Mato Grosso</option>
                              <option value="MS">Mato Grosso do Sul</option>
                              <option value="MG">Minas Gerais</option>
                              <option value="PA">Pará</option>
                              <option value="PB">Paraíba</option>
                              <option value="PR">Paraná</option>
                              <option value="PE">Pernambuco</option>
                              <option value="PI">Piauí</option>
                              <option value="RJ">Rio de Janeiro</option>
                              <option value="RN">Rio Grande do Norte</option>
                              <option value="RS">Rio Grande do Sul</option>
                              <option value="RO">Rondônia</option>
                              <option value="RR">Roraima</option>
                              <option value="SC">Santa Catarina</option>
                              <option value="SP">São Paulo</option>
                              <option value="SE">Sergipe</option>
                              <option value="TO">Tocantins</option>
                            </select>
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium mb-1" htmlFor="city">
                              Cidade
                            </label>
                            <input
                              type="text"
                              id="city"
                              name="city"
                              placeholder="Sua cidade"
                              value={formData.personalInfo.city}
                              onChange={handlePersonalInfoChange}
                              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                            />
                          </div>
                        </div>
                      ) : (
                        <div>
                          <label className="block text-sm font-medium mb-1" htmlFor="country">
                            País
                          </label>
                          <input
                            type="text"
                            id="country"
                            name="country"
                            placeholder="Seu país"
                            value={formData.personalInfo.country}
                            onChange={handlePersonalInfoChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                          />
                        </div>
                      )}
                    </div>
                    
                    <div className="mb-6">
                      <label className="block text-sm font-medium mb-1" htmlFor="specialNeeds">
                        Possui alguma necessidade especial?
                      </label>
                      <input
                        type="text"
                        id="specialNeeds"
                        name="specialNeeds"
                        placeholder="Descreva, caso possua"
                        value={formData.personalInfo.specialNeeds}
                        onChange={handlePersonalInfoChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">
                          Senha *
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="Sua senha"
                          value={formData.personalInfo.password}
                          onChange={handlePersonalInfoChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                          required
                        />
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                          Mínimo de 6 caracteres
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="confirmPassword">
                          Confirmar Senha *
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          placeholder="Confirme sua senha"
                          value={formData.personalInfo.confirmPassword}
                          onChange={handlePersonalInfoChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Foto de Perfil
                        </label>
                        <div className="flex items-center space-x-4">
                          <div 
                            className="w-20 h-20 bg-gray-200 dark:bg-secondary-light rounded-full flex items-center justify-center overflow-hidden"
                          >
                            {profilePreview ? (
                              <img 
                                src={profilePreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Camera className="text-gray-400 w-8 h-8" />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => profilePictureRef.current.click()}
                            className="px-4 py-2 bg-gray-100 dark:bg-secondary-light rounded-lg flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-secondary-dark transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Upload</span>
                          </button>
                          <input
                            type="file"
                            ref={profilePictureRef}
                            onChange={handleProfilePictureChange}
                            className="hidden"
                            accept="image/*"
                          />
                        </div>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                          Recomendado: JPG, PNG. Máx 5MB
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Foto de Capa (estilo LinkedIn)
                        </label>
                        <div className="flex items-center space-x-4">
                          <div 
                            className="w-32 h-16 bg-gray-200 dark:bg-secondary-light rounded flex items-center justify-center overflow-hidden"
                          >
                            {coverPreview ? (
                              <img 
                                src={coverPreview} 
                                alt="Preview" 
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Camera className="text-gray-400 w-8 h-8" />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => coverPictureRef.current.click()}
                            className="px-4 py-2 bg-gray-100 dark:bg-secondary-light rounded-lg flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-secondary-dark transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Upload</span>
                          </button>
                          <input
                            type="file"
                            ref={coverPictureRef}
                            onChange={handleCoverPictureChange}
                            className="hidden"
                            accept="image/*"
                          />
                        </div>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                          Recomendado: 1584 x 396px. Máx 5MB
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Passo 2: Dados Profissionais */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">Dados Profissionais</h3>
                    
                    <div className="space-y-6">
                      <div>
                        <label className="flex items-center text-sm font-medium mb-1" htmlFor="portfolio">
                          <Globe className="w-4 h-4 mr-2" />
                          Link do Portfolio (opcional)
                        </label>
                        <input
                          type="url"
                          id="portfolio"
                          name="portfolio"
                          placeholder="https://seuportfolio.com"
                          value={formData.professionalInfo.portfolio}
                          onChange={handleProfessionalInfoChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                        />
                      </div>
                      
                      <div>
                        <label className="flex items-center text-sm font-medium mb-1" htmlFor="github">
                          <Github className="w-4 h-4 mr-2" />
                          Link do GitHub (opcional)
                        </label>
                        <input
                          type="url"
                          id="github"
                          name="github"
                          placeholder="https://github.com/seu-usuario"
                          value={formData.professionalInfo.github}
                          onChange={handleProfessionalInfoChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                        />
                      </div>
                      
                      <div>
                        <label className="flex items-center text-sm font-medium mb-1" htmlFor="linkedin">
                          <Linkedin className="w-4 h-4 mr-2" />
                          Link do LinkedIn *
                        </label>
                        <input
                          type="url"
                          id="linkedin"
                          name="linkedin"
                          placeholder="https://linkedin.com/in/seu-perfil"
                          value={formData.professionalInfo.linkedin}
                          onChange={handleProfessionalInfoChange}
                          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="flex items-center text-sm font-medium mb-1">
                          <File className="w-4 h-4 mr-2" />
                          Currículo (opcional)
                        </label>
                        <div className="flex items-center space-x-4">
                          <button
                            type="button"
                            onClick={() => resumeRef.current.click()}
                            className="px-4 py-2 bg-gray-100 dark:bg-secondary-light rounded-lg flex items-center space-x-2 hover:bg-gray-200 dark:hover:bg-secondary-dark transition-colors"
                          >
                            <Upload className="w-4 h-4" />
                            <span>Upload CV</span>
                          </button>
                          <input
                            type="file"
                            ref={resumeRef}
                            onChange={handleResumeChange}
                            className="hidden"
                            accept=".pdf,.doc,.docx"
                          />
                          {resumeFileName && (
                            <span className="text-sm text-text-muted-light dark:text-text-muted-dark">
                              {resumeFileName}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                          Formatos aceitos: PDF, DOC, DOCX. Máx 2MB
                        </p>
                      </div>
                      
                      <div className="flex items-center py-2">
                        <input
                          type="checkbox"
                          id="isFreelancer"
                          name="isFreelancer"
                          checked={formData.professionalInfo.isFreelancer}
                          onChange={handleProfessionalInfoChange}
                          className="w-4 h-4 mr-2 text-primary focus:ring-primary"
                        />
                        <label htmlFor="isFreelancer" className="text-sm font-medium">
                          Estou disponível para trabalhos freelancer
                        </label>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Passo 3: Habilidades e Bio */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">Habilidades e Experiência</h3>
                    
                    <div className="mb-8">
                      <label className="block text-sm font-medium mb-2">
                        Adicione suas habilidades técnicas
                      </label>
                      
                      <div className="flex flex-wrap gap-2 mb-4">
                        {formData.skills.map((skill, index) => (
                          <div 
                            key={index} 
                            className="bg-gray-100 dark:bg-secondary-light px-3 py-2 rounded-full flex items-center gap-2"
                          >
                            <span>{skill.name}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={i < skill.level ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                                />
                              ))}
                            </div>
                            <button 
                              type="button" 
                              onClick={() => removeSkill(index)}
                              className="ml-1 text-red-500 hover:text-red-700"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                        <div className="md:col-span-2">
                          <input
                            type="text"
                            name="name"
                            placeholder="Adicionar habilidade"
                            value={newSkill.name}
                            onChange={handleNewSkillChange}
                            list="skill-suggestions"
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                          />
                          <datalist id="skill-suggestions">
                            {skillSuggestions.map((skill, index) => (
                              <option key={index} value={skill} />
                            ))}
                          </datalist>
                        </div>
                        
                        <div>
                          <select
                            name="level"
                            value={newSkill.level}
                            onChange={handleNewSkillChange}
                            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                          >
                            <option value="1">Iniciante</option>
                            <option value="2">Básico</option>
                            <option value="3">Intermediário</option>
                            <option value="4">Avançado</option>
                            <option value="5">Especialista</option>
                          </select>
                        </div>
                        
                        <div>
                          <button
                            type="button"
                            onClick={addSkill}
                            className="w-full p-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
                          >
                            <Plus size={20} className="mr-1" /> Adicionar
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mb-8">
                      <label className="block text-sm font-medium mb-2" htmlFor="bio">
                        Fale sobre você para os recrutadores
                      </label>
                      <textarea
                        id="bio"
                        rows="4"
                        placeholder="Descreva sua experiência, objetivos e o que você busca profissionalmente..."
                        value={formData.bio}
                        onChange={handleBioChange}
                        className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                      ></textarea>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-4">
                        Experiências Profissionais
                      </label>
                      
                      {formData.experiences.length > 0 && (
                        <div className="space-y-4 mb-6">
                          {formData.experiences.map((exp, index) => (
                            <div 
                              key={index} 
                              className="bg-gray-50 dark:bg-secondary-light p-4 rounded-lg relative"
                            >
                              <button 
                                type="button" 
                                onClick={() => removeExperience(index)}
                                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                              >
                                <Trash2 size={16} />
                              </button>
                              
                              <h4 className="font-semibold">{exp.role}</h4>
                              <p className="text-text-muted-light dark:text-text-muted-dark">
                                {exp.company}
                              </p>
                              <p className="text-sm">
                                {new Date(exp.startDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })} - 
                                {exp.current 
                                  ? ' Atual'
                                  : ` ${new Date(exp.endDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}`
                                }
                              </p>
                              {exp.description && <p className="mt-2">{exp.description}</p>}
                            </div>
                          ))}
                        </div>
                      )}
                      
                      <div className="bg-gray-50 dark:bg-secondary-light p-4 rounded-lg">
                        <h4 className="font-medium mb-3">Adicionar nova experiência</h4>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <label className="block text-sm mb-1" htmlFor="company">
                              Empresa
                            </label>
                            <input
                              type="text"
                              id="company"
                              name="company"
                              placeholder="Nome da empresa"
                              value={newExperience.company}
                              onChange={handleNewExperienceChange}
                              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary dark:border-secondary-light"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm mb-1" htmlFor="role">
                              Cargo
                            </label>
                            <input
                              type="text"
                              id="role"
                              name="role"
                              placeholder="Seu cargo"
                              value={newExperience.role}
                              onChange={handleNewExperienceChange}
                              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary dark:border-secondary-light"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm mb-1" htmlFor="startDate">
                              Data de início
                            </label>
                            <input
                              type="date"
                              id="startDate"
                              name="startDate"
                              value={newExperience.startDate}
                              onChange={handleNewExperienceChange}
                              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary dark:border-secondary-light"
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm mb-1" htmlFor="endDate">
                              Data de término
                            </label>
                            <input
                              type="date"
                              id="endDate"
                              name="endDate"
                              value={newExperience.endDate}
                              onChange={handleNewExperienceChange}
                              disabled={newExperience.current}
                              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary dark:border-secondary-light disabled:bg-gray-100 disabled:text-gray-400"
                            />
                            <div className="flex items-center mt-1">
                              <input
                                type="checkbox"
                                id="current"
                                name="current"
                                checked={newExperience.current}
                                onChange={handleNewExperienceChange}
                                className="mr-2"
                              />
                              <label htmlFor="current" className="text-xs">
                                Trabalho atual
                              </label>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <label className="block text-sm mb-1" htmlFor="description">
                            Descrição
                          </label>
                          <textarea
                            id="description"
                            name="description"
                            rows="2"
                            placeholder="Descreva suas responsabilidades e conquistas..."
                            value={newExperience.description}
                            onChange={handleNewExperienceChange}
                            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary dark:border-secondary-light"
                          ></textarea>
                        </div>
                        
                        <button
                          type="button"
                          onClick={addExperience}
                          className="w-full p-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
                        >
                          <Plus size={20} className="mr-1" /> Adicionar experiência
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
                
                {/* Passo 4: Resumo */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="text-xl font-semibold mb-6">Resumo do Cadastro</h3>
                    
                    <div className="space-y-8">
                      <div>
                        <h4 className="text-lg font-medium mb-3 flex items-center">
                          <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-2">1</span>
                          Dados Pessoais
                        </h4>
                        <div className="bg-gray-50 dark:bg-secondary-light p-4 rounded-lg">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-3">
                            <div>
                              <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Nome:</span>
                              <p>{formData.personalInfo.name}</p>
                            </div>
                            <div>
                              <span className="text-sm text-text-muted-light dark:text-text-muted-dark">E-mail:</span>
                              <p>{formData.personalInfo.email}</p>
                            </div>
                            <div>
                              <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Telefone:</span>
                              <p>{formData.personalInfo.phone}</p>
                            </div>
                            <div>
                              <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Gênero:</span>
                              <p>{formData.personalInfo.gender || 'Não informado'}</p>
                            </div>
                            <div>
                              <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Localização:</span>
                              <p>
                                {formData.personalInfo.notInBrazil
                                  ? formData.personalInfo.country
                                  : `${formData.personalInfo.city || ''} ${formData.personalInfo.state ? `- ${formData.personalInfo.state}` : ''}, Brasil`
                                }
                              </p>
                            </div>
                            {formData.personalInfo.specialNeeds && (
                              <div>
                                <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Necessidades Especiais:</span>
                                <p>{formData.personalInfo.specialNeeds}</p>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex flex-wrap gap-4 mt-4">
                            {profilePreview && (
                              <div>
                                <span className="text-sm text-text-muted-light dark:text-text-muted-dark block mb-1">Foto de Perfil:</span>
                                <img src={profilePreview} alt="Perfil" className="w-16 h-16 object-cover rounded-full" />
                              </div>
                            )}
                            
                            {coverPreview && (
                              <div>
                                <span className="text-sm text-text-muted-light dark:text-text-muted-dark block mb-1">Foto de Capa:</span>
                                <img src={coverPreview} alt="Capa" className="w-32 h-16 object-cover rounded" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium mb-3 flex items-center">
                          <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-2">2</span>
                          Dados Profissionais
                        </h4>
                        <div className="bg-gray-50 dark:bg-secondary-light p-4 rounded-lg">
                          <div className="space-y-3">
                            {formData.professionalInfo.portfolio && (
                              <div>
                                <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Portfolio:</span>
                                <p className="text-primary">{formData.professionalInfo.portfolio}</p>
                              </div>
                            )}
                            
                            {formData.professionalInfo.github && (
                              <div>
                                <span className="text-sm text-text-muted-light dark:text-text-muted-dark">GitHub:</span>
                                <p className="text-primary">{formData.professionalInfo.github}</p>
                              </div>
                            )}
                            
                            <div>
                              <span className="text-sm text-text-muted-light dark:text-text-muted-dark">LinkedIn:</span>
                              <p className="text-primary">{formData.professionalInfo.linkedin}</p>
                            </div>
                            
                            {resumeFileName && (
                              <div>
                                <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Currículo:</span>
                                <p>{resumeFileName}</p>
                              </div>
                            )}
                            
                            <div>
                              <span className="text-sm text-text-muted-light dark:text-text-muted-dark">Disponível para freelancer:</span>
                              <p>{formData.professionalInfo.isFreelancer ? 'Sim' : 'Não'}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium mb-3 flex items-center">
                          <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-2">3</span>
                          Habilidades
                        </h4>
                        <div className="bg-gray-50 dark:bg-secondary-light p-4 rounded-lg">
                          <div className="flex flex-wrap gap-2">
                            {formData.skills.map((skill, index) => (
                              <div 
                                key={index} 
                                className="bg-gray-100 dark:bg-secondary px-3 py-2 rounded-full flex items-center gap-2"
                              >
                                <span>{skill.name}</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star 
                                      key={i} 
                                      size={14} 
                                      className={i < skill.level ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'}
                                    />
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="text-lg font-medium mb-3 flex items-center">
                          <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-2">4</span>
                          Sobre Você
                        </h4>
                        <div className="bg-gray-50 dark:bg-secondary-light p-4 rounded-lg">
                          <p>{formData.bio}</p>
                        </div>
                      </div>
                      
                      {formData.experiences.length > 0 && (
                        <div>
                          <h4 className="text-lg font-medium mb-3 flex items-center">
                            <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center mr-2">5</span>
                            Experiências
                          </h4>
                          <div className="space-y-4">
                            {formData.experiences.map((exp, index) => (
                              <div 
                                key={index} 
                                className="bg-gray-50 dark:bg-secondary-light p-4 rounded-lg"
                              >
                                <h5 className="font-semibold">{exp.role}</h5>
                                <p className="text-text-muted-light dark:text-text-muted-dark">
                                  {exp.company}
                                </p>
                                <p className="text-sm">
                                  {new Date(exp.startDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })} - 
                                  {exp.current 
                                    ? ' Atual'
                                    : ` ${new Date(exp.endDate).toLocaleDateString('pt-BR', { year: 'numeric', month: 'long' })}`
                                  }
                                </p>
                                {exp.description && <p className="mt-2">{exp.description}</p>}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="pt-4">
                        <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">
                          Ao clicar em "Finalizar Cadastro", você concorda com os <Link to="/termos" className="text-primary">Termos de Uso</Link> e <Link to="/privacidade" className="text-primary">Política de Privacidade</Link> do DevJobs.
                        </p>
                        
                        <button
                          type="submit"
                          className="w-full p-4 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center font-semibold"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Processando...
                            </>
                          ) : (
                            "Finalizar Cadastro"
                          )}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Botões de navegação */}
              {currentStep < totalSteps && (
                <div className="mt-8 flex justify-between">
                  {currentStep > 1 ? (
                    <button
                      type="button"
                      onClick={prevStep}
                      className="px-6 py-3 flex items-center justify-center gap-2 text-text-light dark:text-text-dark hover:text-primary transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Voltar
                    </button>
                  ) : (
                    <div></div>
                  )}
                  
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
                  >
                    Avançar
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </form>
          </div>
          
          {/* Footer do cadastro */}
          <div className="mt-8 text-center">
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Já possui uma conta? <Link to="/login" className="text-primary font-medium">Faça login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentRegistration;