import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="w-full p-4 bg-white/90 dark:bg-[#0a0f1a]/90 backdrop-blur-sm border-t border-gray-200/20 dark:border-gray-800/30">
      <div className="container mx-auto flex items-center justify-center text-sm text-gray-600 dark:text-gray-400">
        <span>
          Hecho con <span className="text-red-500">❤</span> por{' '}
          <a
            href="https://www.instagram.com/stack_ia"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary dark:text-primary-light hover:underline"
          >
            StackIA
          </a>
        </span>
        <span className="mx-2">•</span>
        <span>© 2025 Todos los derechos reservados</span>
      </div>
    </footer>
  );
};

export default Footer; 