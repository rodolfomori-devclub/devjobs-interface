// src/services/api.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Criar instância do axios
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Interceptor para adicionar token a todas as requisições
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar erros de resposta
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Tratamento de erros de autenticação (401)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      
      // Redirecionar para login se não estiver na página de login
      const currentPath = window.location.pathname;
      if (!currentPath.includes('/login') && !currentPath.includes('/cadastro')) {
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// Serviços de API
const apiService = {
  // Jobs (Vagas)
  jobs: {
    getAll: (params) => api.get('/jobs', { params }),
    getById: (id) => api.get(`/jobs/${id}`),
    create: (data) => api.post('/jobs', data),
    update: (id, data) => api.put(`/jobs/${id}`, data),
    delete: (id) => api.delete(`/jobs/${id}`),
    apply: (id) => api.post(`/jobs/${id}/apply`),
    getCompanyJobs: () => api.get('/jobs/company/me')
  },
  
  // Students (Alunos)
  students: {
    getAll: (params) => api.get('/students', { params }),
    getById: (id) => api.get(`/students/${id}`),
    getProfile: () => api.get('/students/me'),
    updateProfile: (data) => api.put('/students/me', data),
    getApplications: () => api.get('/students/me/applications'),
    getSavedJobs: () => api.get('/students/me/saved')
  },
  
  // Companies (Empresas)
  companies: {
    getAll: (params) => api.get('/companies', { params }),
    getById: (id) => api.get(`/companies/${id}`),
    getProfile: () => api.get('/companies/me'),
    updateProfile: (data) => api.put('/companies/me', data),
    getJobApplications: (jobId) => api.get(`/companies/me/jobs/${jobId}/applications`)
  },
  
  // Admin
  admin: {
    getDashboardStats: () => api.get('/admin/stats'),
    getStudents: (params) => api.get('/admin/students', { params }),
    getCompanies: (params) => api.get('/admin/companies', { params }),
    getJobs: (params) => api.get('/admin/jobs', { params }),
    deleteStudent: (id) => api.delete(`/admin/students/${id}`),
    deleteCompany: (id) => api.delete(`/admin/companies/${id}`),
    deleteJob: (id) => api.delete(`/admin/jobs/${id}`)
  }
};

export default apiService;