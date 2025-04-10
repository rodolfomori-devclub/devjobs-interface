// src/pages/admin/AdminLoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle, ShieldAlert } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

const AdminLoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { adminLogin, user } = useAuth();
  const navigate = useNavigate();
  
  // Redirecionar se já estiver logado como admin
  useEffect(() => {
    if (user && user.userType === 'ADMIN') {
      navigate('/admin');
    }
  }, [user, navigate]);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError('');
      
      if (!email.trim() || !password.trim()) {
        setError('Por favor, preencha todos os campos.');
        setIsLoading(false);
        return;
      }
      
      await adminLogin(email, password);
      navigate('/admin');
    } catch (error) {
      console.error('Admin login error:', error);
      setError(error.response?.data?.message || 'Credenciais de administrador inválidas.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-secondary-dark flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8 text-white">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Dev</span>
              <span className="text-white">Jobs</span>
            </h1>
          </Link>
          <div className="flex items-center justify-center space-x-2 mb-2">
            <ShieldAlert className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Área Administrativa</h2>
          </div>
          <p className="text-text-muted-dark">
            Acesso restrito a administradores
          </p>
        </div>
        
        <div className="bg-white dark:bg-secondary rounded-xl shadow-lg p-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg flex items-start">
              <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          
          <form onSubmit={handleLogin}>
            <div className="space-y-6">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1 text-text-light dark:text-text-dark">
                  E-mail de Administrador
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Mail className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                  </div>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@admin.com"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-secondary-light focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light"
                    required
                  />
                </div>
              </div>
              
              {/* Senha */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1 text-text-light dark:text-text-dark">
                  Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <Lock className="w-5 h-5 text-text-muted-light dark:text-text-muted-dark" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border border-gray-300 dark:border-secondary-light focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light"
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-text-muted-light dark:text-text-muted-dark hover:text-primary"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
              
              {/* Botão de Login */}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center font-semibold"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Acessando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Entrar como Admin
                  </span>
                )}
              </motion.button>
            </div>
          </form>
        </div>
        
        <div className="mt-6 text-center">
          <Link to="/" className="text-primary hover:underline text-sm">
            Voltar para o site principal
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;