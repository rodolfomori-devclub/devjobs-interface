// src/components/layout/DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Menu, X, User, Home, Briefcase, BookMarked, 
  Settings, Bell, LogOut, ChevronDown, Sun, Moon,
  MessageSquare, Search
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  
  const location = useLocation();
  
  // Detectar preferência de modo escuro e atualizar ao alterar
  useEffect(() => {
    const darkModePreference = localStorage.theme === 'dark' || 
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    
    setIsDarkMode(darkModePreference);
    
    if (darkModePreference) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);
  
  // Alternar entre modo claro e escuro
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    }
  };
  
  // Fechar menu ao navegar
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);
  
  // Mock de notificações
  useEffect(() => {
    // Em uma aplicação real, isso viria de uma API
    setNotifications([
      {
        id: 1,
        title: 'Nova vaga disponível',
        message: 'Uma nova vaga de React Developer foi publicada.',
        time: '10 minutos atrás',
        read: false
      },
      {
        id: 2,
        title: 'Candidatura visualizada',
        message: 'TechSolutions visualizou sua candidatura para Desenvolvedor Front-end.',
        time: '2 horas atrás',
        read: false
      },
      {
        id: 3,
        title: 'Feedback recebido',
        message: 'Você recebeu um feedback para sua candidatura.',
        time: '1 dia atrás',
        read: true
      }
    ]);
  }, []);
  
  const unreadNotificationsCount = notifications.filter(n => !n.read).length;
  
  // Links do menu
  const menuLinks = [
    { to: '/dashboard', label: 'Início', icon: <Home className="w-5 h-5" /> },
    { to: '/vagas', label: 'Vagas', icon: <Briefcase className="w-5 h-5" /> },
    { to: '/salvos', label: 'Salvos', icon: <BookMarked className="w-5 h-5" /> },
    { to: '/mensagens', label: 'Mensagens', icon: <MessageSquare className="w-5 h-5" /> },
    { to: '/configuracoes', label: 'Configurações', icon: <Settings className="w-5 h-5" /> },
  ];
  
  // Nome e cargo do usuário (mockados)
  const user = {
    name: 'Ana Silva',
    role: 'Desenvolvedora Front-end',
    avatar: null // Pode ser substituído por uma imagem real
  };
  
  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Header */}
      <header className="bg-white dark:bg-secondary shadow-sm sticky top-0 z-30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center">
                <span className="text-2xl font-bold">
                  <span className="text-primary">Dev</span>
                  <span className="text-secondary dark:text-white">Jobs</span>
                </span>
              </Link>
            </div>
            
            {/* Menu para Desktop */}
            <div className="hidden md:flex items-center space-x-6">
              {menuLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`flex items-center transition-colors ${
                    location.pathname === link.to 
                      ? 'text-primary'
                      : 'text-text-light dark:text-text-dark hover:text-primary'
                  }`}
                >
                  {link.icon}
                  <span className="ml-2">{link.label}</span>
                </Link>
              ))}
            </div>
            
            {/* Notificações, tema e perfil */}
            <div className="flex items-center space-x-4">
              {/* Notificações */}
              <div className="relative">
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors relative"
                >
                  <Bell className="w-5 h-5" />
                  {unreadNotificationsCount > 0 && (
                    <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {unreadNotificationsCount}
                    </span>
                  )}
                </button>
                
                {/* Dropdown de notificações */}
                <AnimatePresence>
                  {isNotificationsOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-80 bg-white dark:bg-secondary-dark rounded-lg shadow-lg z-30 overflow-hidden"
                    >
                      <div className="p-3 border-b border-gray-200 dark:border-secondary-light flex justify-between items-center">
                        <h3 className="font-medium">Notificações</h3>
                        <button className="text-xs text-primary hover:underline">
                          Marcar todas como lidas
                        </button>
                      </div>
                      
                      <div className="max-h-80 overflow-y-auto">
                        {notifications.length > 0 ? (
                          <div>
                            {notifications.map((notification) => (
                              <div 
                                key={notification.id} 
                                className={`p-3 border-b border-gray-100 dark:border-secondary-light hover:bg-gray-50 dark:hover:bg-secondary transition-colors ${
                                  !notification.read ? 'bg-blue-50 dark:bg-blue-900/20' : ''
                                }`}
                              >
                                <div className="flex justify-between">
                                  <h4 className="font-medium text-sm">{notification.title}</h4>
                                  {!notification.read && (
                                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                                  )}
                                </div>
                                <p className="text-sm text-text-muted-light dark:text-text-muted-dark mt-1">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-text-muted-light dark:text-text-muted-dark mt-1">
                                  {notification.time}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="p-4 text-center text-text-muted-light dark:text-text-muted-dark">
                            Nenhuma notificação.
                          </div>
                        )}
                      </div>
                      
                      <div className="p-2 border-t border-gray-200 dark:border-secondary-light">
                        <Link 
                          to="/notificacoes" 
                          className="block w-full text-center py-2 text-primary text-sm hover:underline"
                        >
                          Ver todas as notificações
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Botão de tema */}
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
              
              {/* Perfil */}
              <div className="relative">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
                >
                  <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                    {user.avatar ? (
                      <img 
                        src={user.avatar} 
                        alt={user.name} 
                        className="w-full h-full rounded-full object-cover" 
                      />
                    ) : (
                      <span className="text-primary font-medium">
                        {user.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <span className="hidden md:inline-block text-sm font-medium truncate max-w-[100px]">
                    {user.name}
                  </span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                
                {/* Dropdown de perfil */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white dark:bg-secondary-dark rounded-lg shadow-lg z-30 py-1"
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <div className="px-4 py-3 border-b border-gray-200 dark:border-secondary-light">
                        <p className="text-sm font-medium">{user.name}</p>
                        <p className="text-xs text-text-muted-light dark:text-text-muted-dark truncate">
                          {user.role}
                        </p>
                      </div>
                      
                      <ul>
                        <li>
                          <Link
                            to="/perfil"
                            className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
                          >
                            <User className="w-4 h-4 mr-2" />
                            <span>Meu Perfil</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/configuracoes"
                            className="flex items-center px-4 py-2 hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
                          >
                            <Settings className="w-4 h-4 mr-2" />
                            <span>Configurações</span>
                          </Link>
                        </li>
                        <li className="border-t border-gray-200 dark:border-secondary-light">
                          <Link
                            to="/logout"
                            className="flex items-center px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                          >
                            <LogOut className="w-4 h-4 mr-2" />
                            <span>Sair</span>
                          </Link>
                        </li>
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              {/* Botão de menu mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Menu Mobile */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white dark:bg-secondary shadow-md overflow-hidden"
          >
            <div className="px-4 py-2 border-b border-gray-200 dark:border-secondary-light">
              <div className="flex items-center p-2">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center mr-3">
                  {user.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-full h-full rounded-full object-cover" 
                    />
                  ) : (
                    <span className="text-primary font-medium">
                      {user.name.charAt(0)}
                    </span>
                  )}
                </div>
                <div>
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-text-muted-light dark:text-text-muted-dark">{user.role}</p>
                </div>
              </div>
            </div>
            
            <nav className="p-2">
              <ul className="space-y-1">
                {menuLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                        location.pathname === link.to
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-gray-100 dark:hover:bg-secondary-light'
                      }`}
                    >
                      {link.icon}
                      <span className="ml-3">{link.label}</span>
                    </Link>
                  </li>
                ))}
                <li className="border-t border-gray-200 dark:border-secondary-light mt-2 pt-2">
                  <Link
                    to="/logout"
                    className="flex items-center px-4 py-3 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    <LogOut className="w-5 h-5" />
                    <span className="ml-3">Sair</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Conteúdo principal */}
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;