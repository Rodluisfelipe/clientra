import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar: React.FC<{
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  viewType: 'grid' | 'list';
  toggleView: () => void;
  onLogout: () => void;
}> = ({ isDarkMode, toggleDarkMode, viewType, toggleView, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
      dark:bg-[#0a0f1a]/90
      ${isScrolled 
        ? 'bg-white/90 backdrop-blur-lg shadow-lg dark:border-b dark:border-gray-800/50'
        : 'bg-white/70 backdrop-blur-sm'}`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="relative w-10 h-10 rounded-full overflow-hidden
              ring-2 ring-primary/20 dark:ring-primary/40 bg-white dark:bg-[#0a0f1a]">
              <img 
                src={logo} 
                alt="Clientra Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent
              bg-clip-text text-transparent dark:from-primary-light dark:to-accent-light
              filter dark:brightness-125">
              Clientra
            </span>
          </Link>

          {/* Navigation */}
          <div className="flex items-center space-x-3">
            {/* View Toggle */}
            <button
              onClick={toggleView}
              className="p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5
                transition-all duration-200 dark:text-gray-200 dark:hover:text-primary-light
                dark:hover:bg-primary/20"
              aria-label={viewType === 'grid' ? 'Cambiar a vista de lista' : 'Cambiar a vista de cuadrícula'}
            >
              {viewType === 'grid' ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M4 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1H5a1 1 0 01-1-1v-4zM14 5a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1V5zM14 13a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z"/>
                </svg>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-700 hover:text-primary hover:bg-primary/5
                transition-all duration-200 dark:text-gray-200 dark:hover:text-primary-light
                dark:hover:bg-primary/20"
              aria-label={isDarkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            >
              {isDarkMode ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              )}
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-700/50"></div>

            {/* Logout Button */}
            <button
              onClick={onLogout}
              className="px-4 py-2 rounded-lg flex items-center space-x-2
                text-gray-700 hover:text-gray-900 hover:bg-gray-100/80
                dark:text-gray-200 dark:hover:text-white dark:hover:bg-[#0a0f1a]/80
                transition-all duration-200 group"
            >
              <span>Cerrar Sesión</span>
              <svg
                className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar; 