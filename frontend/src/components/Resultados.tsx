import React from 'react';
import { Cliente } from '../types/cliente';
import ClienteCard from './ClienteCard';
import { useView } from '../contexts/ViewContext';

interface ResultadosProps {
  clientes: Cliente[];
  isLoading: boolean;
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: string) => void;
}

const Resultados: React.FC<ResultadosProps> = ({
  clientes,
  isLoading,
  onEdit,
  onDelete,
}) => {
  const { viewType } = useView();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="relative w-16 h-16">
          {/* Spinner with gradient border */}
          <div className="absolute inset-0 rounded-full
            bg-gradient-to-r from-primary to-accent
            animate-spin"
          >
            <div className="absolute inset-[2px] bg-white dark:bg-gray-900 rounded-full"></div>
          </div>
          {/* Inner spinner */}
          <div className="absolute inset-[6px] rounded-full border-2 border-t-primary
            animate-spin [animation-duration:0.6s]"
          ></div>
        </div>
      </div>
    );
  }

  if (clientes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
        <svg
          className="w-16 h-16 mb-4 text-gray-400 dark:text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-lg">No se encontraron clientes</p>
        <p className="text-sm mt-2">Intenta con otros criterios de búsqueda</p>
      </div>
    );
  }

  return (
    <div className={`animate-fade-in ${
      viewType === 'grid' 
        ? 'grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
        : 'space-y-4'
    }`}>
      {clientes.map((cliente, index) => (
        <div
          key={cliente._id}
          className={`transform transition-all duration-300 ${
            viewType === 'grid' ? 'hover:scale-[1.02]' : 'hover:scale-[1.01]'
          }`}
          style={{
            animationDelay: `${index * 0.1}s`,
            opacity: 0,
            animation: 'slide-up 0.5s ease forwards',
          }}
        >
          <ClienteCard
            cliente={cliente}
            onEdit={onEdit}
            onDelete={onDelete}
            viewType={viewType}
          />
        </div>
      ))}

      <style>
        {`
          @keyframes slide-up {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Resultados; 