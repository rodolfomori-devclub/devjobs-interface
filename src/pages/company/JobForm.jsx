// src/pages/company/JobForm.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, Building, MapPin, Globe, DollarSign, 
  Briefcase, Award, Plus, X, Save, Mail, Phone, 
  MessageSquare, Info
} from 'lucide-react';

// Layout Components
import DashboardLayout from '../../components/layout/DashboardLayout';

// Mock de vagas (para edição)
const mockJobs = [
  {
    id: '1',
    title: 'Desenvolvedor Front-end React',
    company: 'TechSolutions',
    companyLogo: '/src/assets/images/company-logos/techsolutions.svg',
    location: 'São Paulo, SP',
    locationType: 'HYBRID',
    level: 'JUNIOR',
    salary: 'R$ 4.000 - R$ 6.000',
    salaryNegotiable: false,
    skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Git'],
    description: 'Estamos procurando um desenvolvedor front-end para trabalhar em nossos projetos web utilizando React e tecnologias relacionadas.',
    benefits: 'Vale Refeição, Vale Transporte, Plano de Saúde, Gympass, Horário Flexível',
    contactEmail: 'jobs@techsolutions.com',
    contactPhone: '(11) 98765-4321',
    contactLinkedin: 'https://linkedin.com/company/techsolutions',
    contactWebsite: 'https://techsolutions.com/careers',
    contactInstructions: 'Envie seu currículo para o email acima com o assunto "Vaga Front-end React"'
  }
];

const JobForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Para edição de vaga existente
  const isEditMode = !!id;
  
  // Estado do formulário
  const [formData, setFormData] = useState({
    title: '',
    level: '',
    locationType: '',
    location: '',
    salary: '',
    salaryNegotiable: false,
    description: '',
    skills: [],
    benefits: '',
    contactEmail: '',
    contactPhone: '',
    contactLinkedin: '',
    contactWebsite: '',
    contactInstructions: ''
  });
  
  // Estado para nova habilidade sendo adicionada
  const [newSkill, setNewSkill] = useState('');
  
  // Sugestões de habilidades
  const skillSuggestions = [
    'React', 'Angular', 'Vue.js', 'JavaScript', 'TypeScript', 'HTML', 'CSS', 'SASS', 
    'Node.js', 'Express', 'NestJS', 'Django', 'Flask', 'Spring Boot', 
    'PHP', 'Laravel', 'Ruby on Rails', 'SQL', 'MongoDB', 'PostgreSQL', 
    'AWS', 'Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Git',
    'React Native', 'Flutter', 'Swift', 'Kotlin', 'Java', 'Python', 'C#', 'Go'
  ];
  
  // Carregar dados da vaga para edição
  useEffect(() => {
    if (isEditMode) {
      // Em uma aplicação real, aqui você faria uma chamada à API
      const jobToEdit = mockJobs.find(job => job.id === id);
      
      if (jobToEdit) {
        setFormData({
          title: jobToEdit.title,
          level: jobToEdit.level,
          locationType: jobToEdit.locationType,
          location: jobToEdit.location,
          salary: jobToEdit.salary,
          salaryNegotiable: jobToEdit.salaryNegotiable,
          description: jobToEdit.description,
          skills: [...jobToEdit.skills],
          benefits: jobToEdit.benefits,
          contactEmail: jobToEdit.contactEmail,
          contactPhone: jobToEdit.contactPhone,
          contactLinkedin: jobToEdit.contactLinkedin,
          contactWebsite: jobToEdit.contactWebsite,
          contactInstructions: jobToEdit.contactInstructions
        });
      } else {
        // Vaga não encontrada
        navigate('/dashboard');
      }
    }
  }, [id, isEditMode, navigate]);
  
  // Manipuladores de campos
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Manipuladores de habilidades
  const handleNewSkillChange = (e) => {
    setNewSkill(e.target.value);
  };
  
  const addSkill = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData({
        ...formData,
        skills: [...formData.skills, newSkill.trim()]
      });
      setNewSkill('');
    }
  };
  
  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };
  
  // Validação
  const validateForm = () => {
    // Validações básicas
    const requiredFields = [
      'title', 'level', 'locationType', 'description'
    ];
    
    // Se for presencial ou híbrido, location é obrigatório
    if (formData.locationType === 'HYBRID' || formData.locationType === 'ONSITE') {
      requiredFields.push('location');
    }
    
    // Verifica campos obrigatórios
    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Por favor, preencha o campo ${field}`);
        return false;
      }
    }
    
    // Verificar se há pelo menos uma forma de contato
    if (!formData.contactEmail && !formData.contactPhone && 
        !formData.contactLinkedin && !formData.contactWebsite &&
        !formData.contactInstructions) {
      alert('Por favor, forneça pelo menos uma forma de contato');
      return false;
    }
    
    // Verificar se há pelo menos uma habilidade
    if (formData.skills.length === 0) {
      alert('Por favor, adicione pelo menos uma habilidade');
      return false;
    }
    
    return true;
  };
  
  // Envio do formulário
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Em uma aplicação real, aqui você faria uma chamada à API
      console.log('Dados da vaga:', formData);
      
      // Simulação de sucesso
      alert(isEditMode ? 'Vaga atualizada com sucesso!' : 'Vaga publicada com sucesso!');
      navigate('/dashboard');
    }
  };
  
  return (
    <DashboardLayout>
      <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-center mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-2xl font-bold">{isEditMode ? 'Editar Vaga' : 'Publicar Nova Vaga'}</h1>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            {/* Seção de Informações Básicas */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Briefcase className="w-5 h-5 mr-2 text-primary" />
                Informações da Vaga
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Título da Vaga */}
                <div className="md:col-span-2">
                  <label htmlFor="title" className="block text-sm font-medium mb-1">
                    Título da Vaga *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    placeholder="Ex: Desenvolvedor Front-end React"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    required
                  />
                </div>
                
                {/* Nível */}
                <div>
                  <label htmlFor="level" className="block text-sm font-medium mb-1">
                    Nível Exigido *
                  </label>
                  <select
                    id="level"
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    required
                  >
                    <option value="">Selecione o nível</option>
                    <option value="JUNIOR">Júnior</option>
                    <option value="PLENO">Pleno</option>
                    <option value="SENIOR">Sênior</option>
                  </select>
                </div>
                
                {/* Tipo de Trabalho */}
                <div>
                  <label htmlFor="locationType" className="block text-sm font-medium mb-1">
                    Tipo de Trabalho *
                  </label>
                  <select
                    id="locationType"
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    required
                  >
                    <option value="">Selecione o tipo</option>
                    <option value="REMOTE">Remoto</option>
                    <option value="HYBRID">Híbrido</option>
                    <option value="ONSITE">Presencial</option>
                  </select>
                </div>
                
                {/* Local (se híbrido ou presencial) */}
                {(formData.locationType === 'HYBRID' || formData.locationType === 'ONSITE') && (
                  <div className="md:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium mb-1">
                      Local *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <MapPin className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                      </div>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        placeholder="Ex: São Paulo, SP"
                        value={formData.location}
                        onChange={handleChange}
                        className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                        required={formData.locationType === 'HYBRID' || formData.locationType === 'ONSITE'}
                      />
                    </div>
                  </div>
                )}
                
                {/* Salário */}
                <div>
                  <label htmlFor="salary" className="block text-sm font-medium mb-1">
                    Salário
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <DollarSign className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                    </div>
                    <input
                      type="text"
                      id="salary"
                      name="salary"
                      placeholder="Ex: R$ 5.000 - R$ 7.000"
                      value={formData.salary}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  </div>
                </div>
                
                {/* A Combinar */}
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="salaryNegotiable"
                    name="salaryNegotiable"
                    checked={formData.salaryNegotiable}
                    onChange={handleChange}
                    className="w-4 h-4 mr-2 text-primary focus:ring-primary"
                  />
                  <label htmlFor="salaryNegotiable" className="text-sm">
                    Salário a combinar
                  </label>
                </div>
              </div>
            </section>
            
            {/* Seção de Descrição */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <Info className="w-5 h-5 mr-2 text-primary" />
                Descrição e Detalhes
              </h2>
              
              <div className="space-y-6">
                {/* Descrição */}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-1">
                    Descrição da Vaga *
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows="6"
                    placeholder="Descreva as responsabilidades, requisitos e quaisquer outras informações importantes sobre a vaga..."
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    required
                  ></textarea>
                </div>
                
                {/* Habilidades */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Tecnologias e Habilidades Desejadas *
                  </label>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.skills.map((skill) => (
                      <div 
                        key={skill} 
                        className="flex items-center bg-gray-100 dark:bg-secondary-light px-3 py-1 rounded-full"
                      >
                        <span>{skill}</span>
                        <button 
                          type="button"
                          onClick={() => removeSkill(skill)}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex">
                    <div className="relative flex-grow">
                      <input
                        type="text"
                        placeholder="Adicionar habilidade"
                        list="skill-suggestions"
                        value={newSkill}
                        onChange={handleNewSkillChange}
                        className="w-full p-3 border rounded-l-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                      />
                      <datalist id="skill-suggestions">
                        {skillSuggestions.map((skill) => (
                          <option key={skill} value={skill} />
                        ))}
                      </datalist>
                    </div>
                    <button
                      type="button"
                      onClick={addSkill}
                      className="px-4 py-3 bg-primary text-white rounded-r-lg hover:bg-primary-dark transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>
                
                {/* Benefícios */}
                <div>
                  <label htmlFor="benefits" className="block text-sm font-medium mb-1">
                    Benefícios
                  </label>
                  <textarea
                    id="benefits"
                    name="benefits"
                    rows="3"
                    placeholder="Ex: Vale Refeição, Vale Transporte, Plano de Saúde, Horário Flexível..."
                    value={formData.benefits}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                  ></textarea>
                </div>
              </div>
            </section>
            
            {/* Seção de Contato */}
            <section>
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                Informações de Contato
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Email de Contato */}
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-medium mb-1">
                    Email para Contato
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Mail className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                    </div>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      placeholder="Ex: jobs@empresa.com"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  </div>
                </div>
                
                {/* Telefone de Contato */}
                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-medium mb-1">
                    Telefone para Contato
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Phone className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                    </div>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      placeholder="Ex: (11) 98765-4321"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  </div>
                </div>
                
                {/* LinkedIn */}
                <div>
                  <label htmlFor="contactLinkedin" className="block text-sm font-medium mb-1">
                    LinkedIn da Empresa
                  </label>
                  <input
                    type="url"
                    id="contactLinkedin"
                    name="contactLinkedin"
                    placeholder="Ex: https://linkedin.com/company/empresa"
                    value={formData.contactLinkedin}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                  />
                </div>
                
                {/* Website */}
                <div>
                  <label htmlFor="contactWebsite" className="block text-sm font-medium mb-1">
                    Website de Carreiras
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Globe className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                    </div>
                    <input
                      type="url"
                      id="contactWebsite"
                      name="contactWebsite"
                      placeholder="Ex: https://empresa.com/careers"
                      value={formData.contactWebsite}
                      onChange={handleChange}
                      className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  </div>
                </div>
                
                {/* Instruções de Contato */}
                <div className="md:col-span-2">
                  <label htmlFor="contactInstructions" className="block text-sm font-medium mb-1">
                    Instruções para Contato
                  </label>
                  <textarea
                    id="contactInstructions"
                    name="contactInstructions"
                    rows="3"
                    placeholder="Ex: Envie seu currículo para o email acima com o assunto 'Vaga Frontend'"
                    value={formData.contactInstructions}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                  ></textarea>
                </div>
              </div>
            </section>
            
            {/* Botões */}
            <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200 dark:border-secondary-light">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border border-gray-300 dark:border-secondary-light text-text-light dark:text-text-dark rounded-lg hover:bg-gray-50 dark:hover:bg-secondary transition-colors"
              >
                Cancelar
              </button>
              
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center"
              >
                <Save className="w-5 h-5 mr-2" />
                {isEditMode ? 'Salvar Alterações' : 'Publicar Vaga'}
              </motion.button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default JobForm;