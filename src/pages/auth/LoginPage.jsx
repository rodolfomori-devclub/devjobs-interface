// src/pages/auth/LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from 'lucide-react';

import { useAuth } from '../../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Redirecionar se já estiver logado
  useEffect(() => {
    if (user) {
      const redirectTo = user.userType === 'STUDENT' 
        ? '/dashboard'
        : '/empresa/dashboard';
      navigate(redirectTo);
    }
  }, [user, navigate]);
  
  // Verificar se há uma mensagem na localização
  useEffect(() => {
    const message = location.state?.message;
    if (message) {
      setError(message);
    }
  }, [location]);
  
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
      
      const userData = await login(email, password);
      
      // Redirecionar com base no tipo de usuário
      if (userData.userType === 'STUDENT') {
        navigate('/dashboard');
      } else if (userData.userType === 'COMPANY') {
        navigate('/empresa/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError(error.response?.data?.message || 'Falha ao fazer login. Verifique suas credenciais.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark flex flex-col justify-center items-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-block mb-6">
            <h1 className="text-3xl font-bold">
              <span className="text-primary">Dev</span>
              <span className="text-secondary dark:text-white">Jobs</span>
            </h1>
          </Link>
          <h2 className="text-2xl font-bold mb-2">Bem-vindo de volta</h2>
          <p className="text-text-muted-light dark:text-text-muted-dark">
            Faça login para acessar sua conta
          </p>
        </div>
        
        <div className="bg-white dark:bg-secondary-dark rounded-xl shadow-lg p-8">
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
                <label htmlFor="email" className="block text-sm font-medium mb-1">
                  E-mail
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
                    placeholder="Seu e-mail"
                    className="w-full pl-10 pr-3 py-3 rounded-lg border border-gray-300 dark:border-secondary-light focus:ring-2 focus:ring-primary focus:outline-none dark:bg-secondary-light"
                    required
                  />
                </div>
              </div>
              
              {/* Senha */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-1">
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
                    placeholder="Sua senha"
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
                <div className="flex justify-end mt-1">
                  <Link to="/recuperar-senha" className="text-sm text-primary hover:underline">
                    Esqueceu a senha?
                  </Link>
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
                    Entrando...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <LogIn className="w-5 h-5 mr-2" />
                    Entrar
                  </span>
                )}
              </motion.button>
            </div>
          </form>
          
          <div className="mt-8 text-center">
            <p className="text-text-muted-light dark:text-text-muted-dark">
              Não tem uma conta?
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <Link
                to="/cadastro/aluno"
                className="flex-1 px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition-colors"
              >
                Sou Aluno
              </Link>
              <Link
                to="/cadastro/empresa"
                className="flex-1 px-4 py-2 border border-secondary dark:border-gray-400 text-secondary dark:text-gray-300 rounded-lg hover:bg-secondary hover:text-white dark:hover:bg-gray-600 transition-colors"
              >
                Sou Empresa
              </Link>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <p className="text-sm text-text-muted-light dark:text-text-muted-dark">
            Ao fazer login, você concorda com nossos{' '}
            <Link to="/termos" className="text-primary hover:underline">
              Termos de Uso
            </Link>{' '}
            e{' '}
            <Link to="/privacidade" className="text-primary hover:underline">
              Política de Privacidade
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;