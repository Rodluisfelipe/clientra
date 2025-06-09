import React from 'react';
import { Cliente } from '../types/cliente';

interface ClienteCardProps {
  cliente: Cliente;
  onEdit: (cliente: Cliente) => void;
  onDelete: (id: string) => void;
  viewType: 'grid' | 'list';
}

const ClienteCard: React.FC<ClienteCardProps> = ({ cliente, onEdit, onDelete, viewType }) => {
  const handleCopyInfo = () => {
    const formattedText = `🏠 *DATOS DEL CLIENTE*\n\n` +
      `👤 *Nombre:* ${cliente.nombre}\n` +
      `📞 *Teléfono:* ${cliente.telefono}\n` +
      `📍 *Dirección:* ${cliente.direccion}\n` +
      `🏘️ *Barrio:* ${cliente.municipio}\n` +
      `💰 *Valor Domicilio:* $${cliente.valorDomicilio}`;

    navigator.clipboard.writeText(formattedText).then(() => {
      const button = document.getElementById(`copy-button-${cliente._id}`);
      if (button) {
        button.innerHTML = `
          <svg class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
          </svg>
        `;
        setTimeout(() => {
          button.innerHTML = `
            <svg class="w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          `;
        }, 2000);
      }
    });
  };

  const renderContent = () => {
    if (viewType === 'list') {
      return (
        <div className="flex items-center justify-between p-4 bg-white rounded-xl shadow-card 
          hover:shadow-card-hover transform transition-all duration-300
          dark:bg-gray-800 dark:border dark:border-gray-700">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-bold text-gray-900 truncate dark:text-white">
              {cliente.nombre}
            </h3>
            <div className="mt-1 flex flex-col sm:flex-row sm:flex-wrap gap-y-1 gap-x-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center">
                  <span className="mr-1">📞</span>
                  <span className="font-medium mr-1">Teléfono:</span>
                  {cliente.telefono}
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center">
                  <span className="mr-1">📍</span>
                  <span className="font-medium mr-1">Dirección:</span>
                  {cliente.direccion}
                </span>
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <span className="inline-flex items-center">
                  <span className="mr-1">🏘️</span>
                  <span className="font-medium mr-1">Barrio:</span>
                  {cliente.municipio}
                </span>
              </p>
              <p className="text-sm font-medium text-primary dark:text-primary-light">
                <span className="inline-flex items-center">
                  <span className="mr-1">💰</span>
                  <span className="font-medium mr-1">Domicilio:</span>
                  ${cliente.valorDomicilio}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2 ml-4">
            <button
              id={`copy-button-${cliente._id}`}
              onClick={handleCopyInfo}
              className="p-2.5 rounded-lg text-primary bg-primary/5 hover:bg-primary/10
                transition-all duration-200 border-2 border-primary/10 hover:border-primary/20
                group dark:bg-primary/10 dark:border-primary/20 dark:hover:border-primary/30"
              aria-label="Copiar información"
            >
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
            <button
              onClick={() => onEdit(cliente)}
              className="p-2.5 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100
                transition-all duration-200 border-2 border-blue-100 hover:border-blue-200
                group dark:bg-blue-500/10 dark:border-blue-500/20 dark:hover:border-blue-500/30
                dark:text-blue-400"
              aria-label="Editar cliente"
            >
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(cliente._id)}
              className="p-2.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-100
                transition-all duration-200 border-2 border-red-100 hover:border-red-200
                group dark:bg-red-500/10 dark:border-red-500/20 dark:hover:border-red-500/30
                dark:text-red-400"
              aria-label="Eliminar cliente"
            >
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="relative group bg-white rounded-xl shadow-card hover:shadow-card-hover 
        transform transition-all duration-300 dark:bg-gray-800 dark:border dark:border-gray-700">
        {/* Gradient Border Effect */}
        <div className="absolute -inset-[0.5px] bg-gradient-to-r from-primary to-accent 
          rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="relative p-6 rounded-xl bg-white dark:bg-gray-800">
          {/* Header */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary 
                transition-colors duration-300 dark:text-white">
                {cliente.nombre}
              </h3>
              <p className="text-sm text-gray-500 mt-1 dark:text-gray-400">
                ID: {cliente._id}
              </p>
            </div>
          </div>

          {/* Content */}
          <div className="space-y-3 mb-4">
            <p className="text-gray-600 dark:text-gray-300">
              <span className="inline-flex items-center">
                <span className="mr-2">📞</span>
                <span className="font-medium mr-2">Teléfono:</span>
                {cliente.telefono}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="inline-flex items-center">
                <span className="mr-2">📍</span>
                <span className="font-medium mr-2">Dirección:</span>
                {cliente.direccion}
              </span>
            </p>
            <p className="text-gray-600 dark:text-gray-300">
              <span className="inline-flex items-center">
                <span className="mr-2">🏘️</span>
                <span className="font-medium mr-2">Barrio:</span>
                {cliente.municipio}
              </span>
            </p>
            <p className="text-primary font-medium dark:text-primary-light">
              <span className="inline-flex items-center">
                <span className="mr-2">💰</span>
                <span className="font-medium mr-2">Domicilio:</span>
                ${cliente.valorDomicilio}
              </span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button
              id={`copy-button-${cliente._id}`}
              onClick={handleCopyInfo}
              className="p-2.5 rounded-lg text-primary bg-primary/5 hover:bg-primary/10
                transition-all duration-200 border-2 border-primary/10 hover:border-primary/20
                group dark:bg-primary/10 dark:border-primary/20 dark:hover:border-primary/30"
              aria-label="Copiar información"
            >
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
            <button
              onClick={() => onEdit(cliente)}
              className="p-2.5 rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100
                transition-all duration-200 border-2 border-blue-100 hover:border-blue-200
                group dark:bg-blue-500/10 dark:border-blue-500/20 dark:hover:border-blue-500/30
                dark:text-blue-400"
              aria-label="Editar cliente"
            >
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                />
              </svg>
            </button>
            <button
              onClick={() => onDelete(cliente._id)}
              className="p-2.5 rounded-lg text-red-600 bg-red-50 hover:bg-red-100
                transition-all duration-200 border-2 border-red-100 hover:border-red-200
                group dark:bg-red-500/10 dark:border-red-500/20 dark:hover:border-red-500/30
                dark:text-red-400"
              aria-label="Eliminar cliente"
            >
              <svg className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return renderContent();
};

export default ClienteCard; 