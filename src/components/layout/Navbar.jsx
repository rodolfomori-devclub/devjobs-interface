// src/components/layout/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Verifica o modo escuro preferido do usuário
  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove('dark');
      setIsDarkMode(false);
    }
  }, []);

  // Alterna entre modo claro e escuro
  const toggleDarkMode = () => {
    if (isDarkMode) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDarkMode(true);
    }
  };

  // Fecha o menu ao mudar de página
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="bg-white/80 dark:bg-secondary-dark/80 backdrop-blur-md py-4 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold">
              <span className="text-primary">Dev</span>
              <span className="text-secondary dark:text-white">Jobs</span>
            </span>
          </Link>

          {/* Menu para Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="font-medium hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/vagas"
              className="font-medium hover:text-primary transition-colors"
            >
              Vagas
            </Link>
            <Link
              to="/sobre"
              className="font-medium hover:text-primary transition-colors"
            >
              Sobre
            </Link>
            <Link
              to="/contato"
              className="font-medium hover:text-primary transition-colors"
            >
              Contato
            </Link>

            {/* Botão de tema */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-secondary" />
              )}
            </button>

            {/* Botões de Login/Cadastro */}
            <div className="flex space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/cadastro"
                className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors"
              >
                Cadastre-se
              </Link>
            </div>
          </div>

          {/* Botão do menu para mobile */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-secondary" />
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-secondary-light transition-colors"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 overflow-hidden"
            >
              <div className="flex flex-col space-y-4 py-4">
                <Link
                  to="/"
                  className="font-medium hover:text-primary transition-colors px-2 py-2"
                >
                  Home
                </Link>
                <Link
                  to="/vagas"
                  className="font-medium hover:text-primary transition-colors px-2 py-2"
                >
                  Vagas
                </Link>
                <Link
                  to="/sobre"
                  className="font-medium hover:text-primary transition-colors px-2 py-2"
                >
                  Sobre
                </Link>
                <Link
                  to="/contato"
                  className="font-medium hover:text-primary transition-colors px-2 py-2"
                >
                  Contato
                </Link>
                <div className="flex flex-col space-y-3 pt-4">
                  <Link
                    to="/login"
                    className="px-4 py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors text-center"
                  >
                    Login
                  </Link>
                  <Link
                    to="/cadastro"
                    className="px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary-dark transition-colors text-center"
                  >
                    Cadastre-se
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
