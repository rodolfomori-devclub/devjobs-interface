// src/routes.jsx
import React from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';

// Pages - Public
import HomePage from './pages/home/HomePage';
import LoginPage from './pages/auth/LoginPage';
import StudentRegistration from './pages/auth/StudentRegistration';
import CompanyRegistration from './pages/auth/CompanyRegistration';

// Pages - Student
import StudentDashboard from './pages/student/StudentDashboard';
import JobDetailPage from './pages/student/JobDetailPage';
import StudentProfilePage from './pages/student/StudentProfilePage';
import SavedJobsPage from './pages/student/SavedJobsPage';

// Pages - Company
import CompanyDashboard from './pages/company/CompanyDashboard';
import JobForm from './pages/company/JobForm';
import CompanyProfilePage from './pages/company/CompanyProfilePage';
import JobApplicationsPage from './pages/company/JobApplicationsPage';

// Pages - Admin
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminLoginPage from './pages/admin/AdminLoginPage';

// Contexts and Hooks
import { useAuth } from './context/AuthContext';

// Protected Routes Components
const StudentRoute = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }
  
  if (!user || user.userType !== 'STUDENT') {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

const CompanyRoute = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }
  
  if (!user || user.userType !== 'COMPANY') {
    return <Navigate to="/login" replace />;
  }
  
  return <Outlet />;
};

const AdminRoute = () => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Carregando...</div>;
  }
  
  if (!user || user.userType !== 'ADMIN') {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <Outlet />;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* Rotas públicas */}
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/cadastro/aluno" element={<StudentRegistration />} />
      <Route path="/cadastro/empresa" element={<CompanyRegistration />} />
      
      {/* Rotas de aluno */}
      <Route element={<StudentRoute />}>
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/vagas/:id" element={<JobDetailPage />} />
        <Route path="/perfil" element={<StudentProfilePage />} />
        <Route path="/salvos" element={<SavedJobsPage />} />
      </Route>
      
      {/* Rotas de empresa */}
      <Route element={<CompanyRoute />}>
        <Route path="/empresa/dashboard" element={<CompanyDashboard />} />
        <Route path="/vagas/nova" element={<JobForm />} />
        <Route path="/vagas/:id/editar" element={<JobForm />} />
        <Route path="/vagas/:id/candidaturas" element={<JobApplicationsPage />} />
        <Route path="/empresa/perfil" element={<CompanyProfilePage />} />
      </Route>
      
      {/* Rotas de administrador */}
      <Route path="/admin/login" element={<AdminLoginPage />} />
      <Route element={<AdminRoute />}>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<AdminDashboard />} />
        <Route path="/admin/companies" element={<AdminDashboard />} />
        <Route path="/admin/jobs" element={<AdminDashboard />} />
      </Route>
      
      {/* Rota de fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes;