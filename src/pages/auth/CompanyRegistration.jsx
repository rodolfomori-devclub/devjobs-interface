// src/pages/auth/CompanyRegistration.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Building, User, Mail, FileText, Lock, Eye, EyeOff, Check, AlertCircle } from 'lucide-react';

const CompanyRegistration = () => {
  const [formData, setFormData] = useState({
    responsibleName: '',
    companyName: '',
    email: '',
    cnpj: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [cnpjMask, setCnpjMask] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'cnpj') {
      // Aplicar máscara ao CNPJ (XX.XXX.XXX/XXXX-XX)
      const cleaned = value.replace(/\D/g, '');
      let masked = '';
      
      if (cleaned.length <= 2) {
        masked = cleaned;
      } else if (cleaned.length <= 5) {
        masked = `${cleaned.slice(0, 2)}.${cleaned.slice(2)}`;
      } else if (cleaned.length <= 8) {
        masked = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5)}`;
      } else if (cleaned.length <= 12) {
        masked = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8)}`;
      } else {
        masked = `${cleaned.slice(0, 2)}.${cleaned.slice(2, 5)}.${cleaned.slice(5, 8)}/${cleaned.slice(8, 12)}-${cleaned.slice(12, 14)}`;
      }
      
      setCnpjMask(masked);
      setFormData({
        ...formData,
        [name]: cleaned
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
    
    // Limpar erro ao editar o campo
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    // Validar Nome do Responsável
    if (!formData.responsibleName.trim()) {
      newErrors.responsibleName = 'Nome do responsável é obrigatório';
    }
    
    // Validar Nome da Empresa
    if (!formData.companyName.trim()) {
      newErrors.companyName = 'Nome da empresa é obrigatório';
    }
    
    // Validar Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
    }
    
    // Validar CNPJ (apenas verificar se tem 14 dígitos)
    if (!formData.cnpj) {
      newErrors.cnpj = 'CNPJ é obrigatório';
    } else if (formData.cnpj.length !== 14) {
      newErrors.cnpj = 'CNPJ inválido';
    }
    
    // Validar Senha
    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
    } else if (formData.password.length < 6) {
      newErrors.password = 'A senha deve ter pelo menos 6 caracteres';
    }
    
    // Validar Confirmação de Senha
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'As senhas não coincidem';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true se não houver erros
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Aqui você enviaria os dados para sua API
      console.log('Dados de cadastro da empresa:', formData);
      
      // Simulação de cadastro bem-sucedido
      alert('Empresa cadastrada com sucesso!');
      
      // Redirecionar para a página de login ou dashboard
      // history.push('/login');
    }
  };
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Dev</span>
              <span className="text-secondary dark:text-white">Jobs</span>
            </h1>
          </Link>
          <h2 className="text-2xl font-bold mb-2">Cadastro de Empresa</h2>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            Acesse talentos do DevClub para sua empresa
          </p>
        </div>
        
        <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            <div className="space-y-5">
              {/* Nome do Responsável */}
              <div>
                <label htmlFor="responsibleName" className="block text-sm font-medium mb-1">
                  Nome do Responsável *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <User className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                  </div>
                  <input
                    type="text"
                    id="responsibleName"
                    name="responsibleName"
                    placeholder="Seu nome completo"
                    value={formData.responsibleName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
                      errors.responsibleName 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-secondary-light focus:ring-primary'
                    } focus:outline-none focus:ring-2 dark:bg-secondary-light`}
                  />
                </div>
                {errors.responsibleName && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.responsibleName}
                  </p>
                )}
              </div>
              
              {/* Nome da Empresa */}
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-1">
                  Nome da Empresa *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Building className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                  </div>
                  <input
                    type="text"
                    id="companyName"
                    name="companyName"
                    placeholder="Nome da sua empresa"
                    value={formData.companyName}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
                      errors.companyName 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-secondary-light focus:ring-primary'
                    } focus:outline-none focus:ring-2 dark:bg-secondary-light`}
                  />
                </div>
                {errors.companyName && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.companyName}
                  </p>
                )}
              </div>
              
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-mail do Responsável *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
                      errors.email 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-secondary-light focus:ring-primary'
                    } focus:outline-none focus:ring-2 dark:bg-secondary-light`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.email}
                  </p>
                )}
              </div>
              
              {/* CNPJ */}
              <div>
                <label htmlFor="cnpj" className="block text-sm font-medium mb-1">
                  CNPJ da Empresa *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FileText className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                  </div>
                  <input
                    type="text"
                    id="cnpj"
                    name="cnpj"
                    placeholder="XX.XXX.XXX/XXXX-XX"
                    value={cnpjMask}
                    onChange={handleChange}
                    maxLength="18"
                    className={`w-full pl-10 pr-3 py-3 rounded-lg border ${
                      errors.cnpj 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-secondary-light focus:ring-primary'
                    } focus:outline-none focus:ring-2 dark:bg-secondary-light`}
                  />
                </div>
                {errors.cnpj && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.cnpj}
                  </p>
                )}
              </div>
              
              {/* Senha */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
                  Senha *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    name="password"
                    placeholder="Crie uma senha segura"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                      errors.password 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-secondary-light focus:ring-primary'
                    } focus:outline-none focus:ring-2 dark:bg-secondary-light`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                    ) : (
                      <Eye className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                    )}
                  </button>
                </div>
                {errors.password ? (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.password}
                  </p>
                ) : (
                  <p className="mt-1 text-xs text-text-muted-light dark:text-text-muted-dark">
                    Mínimo de 6 caracteres
                  </p>
                )}
              </div>
              
              {/* Confirmar Senha */}
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">
                  Confirmar Senha *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirme sua senha"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full pl-10 pr-10 py-3 rounded-lg border ${
                      errors.confirmPassword 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-secondary-light focus:ring-primary'
                    } focus:outline-none focus:ring-2 dark:bg-secondary-light`}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                    ) : (
                      <Eye className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="mt-1 text-sm text-red-500 flex items-center">
                    <AlertCircle size={14} className="mr-1" /> {errors.confirmPassword}
                  </p>
                )}
              </div>
              
              {/* Termos e Condições */}
              <div className="pt-2">
                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mb-4">
                  Ao clicar em "Criar Conta", você concorda com os <Link to="/termos" className="text-primary">Termos de Uso</Link> e <Link to="/privacidade" className="text-primary">Política de Privacidade</Link> do DevJobs.
                </p>
              </div>
              
              {/* Botão de Cadastro */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center font-semibold"
              >
                <Check className="w-5 h-5 mr-2" /> Criar Conta
              </motion.button>
            </div>
          </form>
        </div>
        
        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-text-muted-light dark:text-text-muted-dark">
            Já possui uma conta? <Link to="/login" className="text-primary font-medium">Faça login</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default CompanyRegistration;