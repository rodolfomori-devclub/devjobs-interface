// src/context/AuthContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

// Contexto de autenticação
const AuthContext = createContext();

// Provedor do contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // API URL
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  
  // Verificar token ao iniciar
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          setIsLoading(false);
          return;
        }
        
        // Configurar axios com token
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Verificar token com o servidor (opcional)
        // const response = await axios.get(`${API_URL}/auth/me`);
        // setUser(response.data.data);
        
        // Alternativa: Decodificar o token do localStorage
        const userData = JSON.parse(localStorage.getItem('user'));
        if (userData) {
          setUser(userData);
        }
        
        setIsLoading(false);
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        setIsLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Login de usuário (aluno ou empresa)
  const login = async (email, password) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      
      const { token, ...userData } = response.data.data;
      
      // Salvar token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userData));
      
      // Configurar axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser(userData);
      setIsLoading(false);
      
      return userData;
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao fazer login');
      setIsLoading(false);
      throw error;
    }
  };
  
  // Login de administrador
  const adminLogin = async (email, password) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/admin/login`, {
        email,
        password
      });
      
      const { token, ...userData } = response.data.data;
      
      // Salvar token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ ...userData, userType: 'ADMIN' }));
      
      // Configurar axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser({ ...userData, userType: 'ADMIN' });
      setIsLoading(false);
      
      return userData;
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao fazer login como administrador');
      setIsLoading(false);
      throw error;
    }
  };
  
  // Registro de aluno
  const registerStudent = async (studentData) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/register/student`, studentData);
      
      const { token, ...userData } = response.data.data;
      
      // Salvar token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ ...userData, userType: 'STUDENT' }));
      
      // Configurar axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser({ ...userData, userType: 'STUDENT' });
      setIsLoading(false);
      
      return userData;
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao registrar aluno');
      setIsLoading(false);
      throw error;
    }
  };
  
  // Registro de empresa
  const registerCompany = async (companyData) => {
    try {
      setError(null);
      setIsLoading(true);
      
      const response = await axios.post(`${API_URL}/auth/register/company`, companyData);
      
      const { token, ...userData } = response.data.data;
      
      // Salvar token
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ ...userData, userType: 'COMPANY' }));
      
      // Configurar axios
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      setUser({ ...userData, userType: 'COMPANY' });
      setIsLoading(false);
      
      return userData;
    } catch (error) {
      setError(error.response?.data?.message || 'Erro ao registrar empresa');
      setIsLoading(false);
      throw error;
    }
  };
  
  // Logout
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    delete axios.defaults.headers.common['Authorization'];
    setUser(null);
  };
  
  // Valor do contexto
  const value = {
    user,
    isLoading,
    error,
    login,
    adminLogin,
    registerStudent,
    registerCompany,
    logout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personalizado para usar o contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};

export default AuthContext;