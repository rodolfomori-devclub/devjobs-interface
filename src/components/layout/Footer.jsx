
// src/components/layout/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, GitHub } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-secondary text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Logo e descrição */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center mb-4">
              <span className="text-2xl font-bold">
                <span className="text-primary">Dev</span>
                <span className="text-white">Jobs</span>
              </span>
            </Link>
            <p className="text-text-muted-dark mb-6">
              Conectando os alunos do DevClub às melhores oportunidades do mercado de tecnologia.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-text-muted-dark hover:text-primary transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-text-muted-dark hover:text-primary transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-text-muted-dark hover:text-primary transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-text-muted-dark hover:text-primary transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-text-muted-dark hover:text-primary transition-colors">
                <GitHub size={20} />
              </a>
            </div>
          </div>

          {/* Links rápidos */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Links Rápidos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-text-muted-dark hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/vagas" className="text-text-muted-dark hover:text-primary transition-colors">
                  Vagas
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-text-muted-dark hover:text-primary transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-text-muted-dark hover:text-primary transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Para Alunos */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Para Alunos</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cadastro/aluno" className="text-text-muted-dark hover:text-primary transition-colors">
                  Criar Conta
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-text-muted-dark hover:text-primary transition-colors">
                  Fazer Login
                </Link>
              </li>
              <li>
                <Link to="/vagas" className="text-text-muted-dark hover:text-primary transition-colors">
                  Buscar Vagas
                </Link>
              </li>
              <li>
                <Link to="/faq/alunos" className="text-text-muted-dark hover:text-primary transition-colors">
                  FAQ Alunos
                </Link>
              </li>
            </ul>
          </div>

          {/* Para Empresas */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Para Empresas</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/cadastro/empresa" className="text-text-muted-dark hover:text-primary transition-colors">
                  Cadastrar Empresa
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-text-muted-dark hover:text-primary transition-colors">
                  Área da Empresa
                </Link>
              </li>
              <li>
                <Link to="/alunos" className="text-text-muted-dark hover:text-primary transition-colors">
                  Buscar Talentos
                </Link>
              </li>
              <li>
                <Link to="/faq/empresas" className="text-text-muted-dark hover:text-primary transition-colors">
                  FAQ Empresas
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-secondary-light pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-text-muted-dark text-sm mb-4 md:mb-0">
              &copy; {currentYear} DevJobs. Todos os direitos reservados.
            </p>
            <div className="flex space-x-6">
              <Link to="/termos" className="text-text-muted-dark hover:text-primary transition-colors text-sm">
                Termos de Uso
              </Link>
              <Link to="/privacidade" className="text-text-muted-dark hover:text-primary transition-colors text-sm">
                Política de Privacidade
              </Link>
              <Link to="/cookies" className="text-text-muted-dark hover:text-primary transition-colors text-sm">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;