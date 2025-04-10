// src/pages/company/CompanyProfilePage.jsx
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Building, MapPin, Mail, Phone, Globe, 
  Edit, Save, X, Upload, Camera, User
} from 'lucide-react';

// Layout Components
import DashboardLayout from '../../components/layout/DashboardLayout';
import apiService from '../../services/api';

// Mock Data
const mockCompanyProfile = {
  id: 1,
  name: 'TechSolutions',
  responsibleName: 'Carlos Silva',
  email: 'carlos@techsolutions.com',
  phone: '(11) 3456-7890',
  cnpj: '12.345.678/0001-90',
  logo: null,
  coverImage: null,
  location: 'São Paulo, SP',
  website: 'https://techsolutions.com',
  linkedin: 'https://linkedin.com/company/techsolutions',
  description: 'A TechSolutions é uma empresa de tecnologia especializada em soluções digitais inovadoras para empresas de todos os portes. Fundada em 2018, nossa equipe é composta por profissionais apaixonados por tecnologia e comprometidos com a entrega de produtos de alta qualidade. Nosso objetivo é ajudar as empresas a transformarem seus desafios em oportunidades através de soluções tecnológicas eficientes e sob medida.',
  industry: 'Tecnologia da Informação',
  size: '50-100 funcionários',
  foundedYear: 2018
};

const CompanyProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  
  // Refs para os inputs de arquivo
  const logoInputRef = useRef(null);
  const coverInputRef = useRef(null);
  
  // Carregar dados do perfil
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Em uma aplicação real, aqui você faria a chamada à API
        // const response = await apiService.companies.getProfile();
        // setProfile(response.data);
        
        // Usando dados mock para demonstração
        setTimeout(() => {
          setProfile(mockCompanyProfile);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching company profile:', error);
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
  };
  
  // Salvar alterações
  const handleSaveProfile = async () => {
    try {
      // Em uma aplicação real, aqui você faria a chamada à API
      // await apiService.companies.updateProfile(profile);
      
      setIsEditing(false);
      alert('Perfil atualizado com sucesso!');
    } catch (error) {
      console.error('Error updating company profile:', error);
      alert('Ocorreu um erro ao atualizar o perfil. Por favor, tente novamente.');
    }
  };
  
  // Manipuladores de edição de perfil
  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  // Manipuladores de upload de arquivos
  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Em uma aplicação real, você faria o upload do arquivo para o servidor
      // e atualizaria o URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile(prev => ({
          ...prev,
          logo: reader.result
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
  
  // Formatação de CNPJ
  const formatCNPJ = (cnpj) => {
    if (!cnpj) return '';
    
    // Remover caracteres não numéricos
    const numbers = cnpj.replace(/\D/g, '');
    
    // Aplicar máscara de CNPJ
    if (numbers.length !== 14) return cnpj; // Retorna o valor original se não tiver 14 dígitos
    
    return numbers.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      '$1.$2.$3/$4-$5'
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
            <p className="text-text-muted-light dark:text-text-muted-dark">Carregando perfil da empresa...</p>
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
          <p className="text-text-muted-light dark:text-text-muted-dark mb-4">Não foi possível encontrar os dados do perfil da empresa.</p>
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
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-secondary/20 to-primary/20">
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
            <div className="relative w-32 h-32 rounded-lg border-4 border-white dark:border-secondary-dark bg-white dark:bg-secondary-dark overflow-hidden">
              {profile.logo ? (
                <img 
                  src={profile.logo} 
                  alt={profile.name} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-secondary/10">
                  <Building className="w-12 h-12 text-primary" />
                </div>
              )}
              
              {isEditing && (
                <button
                  onClick={() => logoInputRef.current.click()}
                  className="absolute bottom-0 right-0 p-1.5 bg-white dark:bg-secondary-dark rounded-full shadow-md"
                >
                  <Camera className="w-4 h-4 text-primary" />
                  <input
                    type="file"
                    ref={logoInputRef}
                    onChange={handleLogoChange}
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
                
                <div className="flex items-center">
                  <Building className="w-4 h-4 mr-1" />
                  {isEditing ? (
                    <input
                      type="text"
                      name="industry"
                      value={profile.industry}
                      onChange={handleProfileChange}
                      className="p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  ) : (
                    profile.industry
                  )}
                </div>
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
                <User className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Responsável</h3>
                  {isEditing ? (
                    <input
                      type="text"
                      name="responsibleName"
                      value={profile.responsibleName}
                      onChange={handleProfileChange}
                      className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  ) : (
                    <p>{profile.responsibleName}</p>
                  )}
                </div>
              </div>
              
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
              
              <div className="flex items-start">
                <Globe className="w-5 h-5 mr-3 text-primary flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium">Website</h3>
                  {isEditing ? (
                    <input
                      type="url"
                      name="website"
                      value={profile.website}
                      onChange={handleProfileChange}
                      className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                    />
                  ) : profile.website ? (
                    <a 
                      href={profile.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary hover:underline break-all"
                    >
                      {profile.website}
                    </a>
                  ) : (
                    <span className="text-text-muted-light dark:text-text-muted-dark">Não informado</span>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Informações da empresa */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Informações da Empresa</h2>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">CNPJ</h3>
                {isEditing ? (
                  <input
                    type="text"
                    name="cnpj"
                    value={profile.cnpj}
                    onChange={handleProfileChange}
                    className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                  />
                ) : (
                  <p>{formatCNPJ(profile.cnpj)}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Tamanho da Empresa</h3>
                {isEditing ? (
                  <select
                    name="size"
                    value={profile.size}
                    onChange={handleProfileChange}
                    className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                  >
                    <option value="1-10 funcionários">1-10 funcionários</option>
                    <option value="11-50 funcionários">11-50 funcionários</option>
                    <option value="50-100 funcionários">50-100 funcionários</option>
                    <option value="100-500 funcionários">100-500 funcionários</option>
                    <option value="500+ funcionários">500+ funcionários</option>
                  </select>
                ) : (
                  <p>{profile.size}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium">Ano de Fundação</h3>
                {isEditing ? (
                  <input
                    type="number"
                    name="foundedYear"
                    value={profile.foundedYear}
                    onChange={handleProfileChange}
                    min="1900"
                    max={new Date().getFullYear()}
                    className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                  />
                ) : (
                  <p>{profile.foundedYear}</p>
                )}
              </div>
              
              <div>
                <h3 className="text-sm font-medium">LinkedIn</h3>
                {isEditing ? (
                  <input
                    type="url"
                    name="linkedin"
                    value={profile.linkedin}
                    onChange={handleProfileChange}
                    className="w-full p-1 text-sm border rounded focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
                  />
                ) : profile.linkedin ? (
                  <a 
                    href={profile.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline break-all"
                  >
                    {profile.linkedin}
                  </a>
                ) : (
                  <span className="text-text-muted-light dark:text-text-muted-dark">Não informado</span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Coluna central e direita */}
        <div className="md:col-span-2 space-y-6">
          {/* Sobre a empresa */}
          <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
            <h2 className="text-lg font-bold mb-4">Sobre a Empresa</h2>
            
            {isEditing ? (
              <textarea
                name="description"
                value={profile.description}
                onChange={handleProfileChange}
                rows="6"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light dark:border-secondary"
              ></textarea>
            ) : (
              <p className="text-text-light dark:text-text-dark whitespace-pre-line">
                {profile.description}
              </p>
            )}
          </div>
          
          {/* Estatísticas e vagas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Estatísticas */}
            <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Estatísticas</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Vagas Publicadas</span>
                  <span className="font-semibold">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Vagas Ativas</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Candidaturas Recebidas</span>
                  <span className="font-semibold">35</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Candidatos Contratados</span>
                  <span className="font-semibold">2</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-secondary-light">
                <Link
                  to="/dashboard"
                  className="text-primary hover:underline flex items-center justify-center"
                >
                  Ver relatório completo
                </Link>
              </div>
            </div>
            
            {/* Vagas recentes */}
            <div className="bg-white dark:bg-secondary-dark rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-4">Vagas Recentes</h2>
              
              <div className="space-y-4">
                <div className="border-b border-gray-200 dark:border-secondary-light pb-3">
                  <h3 className="font-medium">Desenvolvedor Front-end React</h3>
                  <div className="flex items-center justify-between text-sm text-text-muted-light dark:text-text-muted-dark">
                    <span>12 candidaturas</span>
                    <span>Publicada há 8 dias</span>
                  </div>
                </div>
                
                <div className="border-b border-gray-200 dark:border-secondary-light pb-3">
                  <h3 className="font-medium">DevOps Engineer</h3>
                  <div className="flex items-center justify-between text-sm text-text-muted-light dark:text-text-muted-dark">
                    <span>5 candidaturas</span>
                    <span>Publicada há 15 dias</span>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium">UI/UX Designer</h3>
                  <div className="flex items-center justify-between text-sm text-text-muted-light dark:text-text-muted-dark">
                    <span>7 candidaturas</span>
                    <span>Publicada há 20 dias</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200 dark:border-secondary-light">
                <Link
                  to="/dashboard"
                  className="text-primary hover:underline flex items-center justify-center"
                >
                  Ver todas as vagas
                </Link>
              </div>
            </div>
          </div>
          
          {/* Chamada para ação */}
          <div className="bg-gradient-to-r from-secondary to-secondary-light text-white rounded-lg shadow-md p-6">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Publique uma nova vaga</h3>
                <p>Encontre os melhores talentos do DevClub para sua empresa.</p>
              </div>
              
              <Link
                to="/vagas/nova"
                className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors whitespace-nowrap"
              >
                Criar Vaga
              </Link>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CompanyProfilePage;