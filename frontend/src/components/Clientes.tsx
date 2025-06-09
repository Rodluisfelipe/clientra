import React, { useState, useEffect, useCallback } from 'react';
import api from '../utils/axios';
import { Cliente } from '../types/cliente';
import Buscador from './Buscador';
import Resultados from './Resultados';
import Modal from './Modal';
import Toast from './Toast';
import ClienteForm from './ClienteForm';

const Clientes: React.FC = () => {
  // Estado
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filteredClientes, setFilteredClientes] = useState<Cliente[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCliente, setSelectedCliente] = useState<Cliente | undefined>(undefined);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Funciones auxiliares
  const showToast = (message: string, type: 'success' | 'error' | 'info') => {
    setToast({ message, type });
  };

  const fetchClientes = useCallback(async (search: string = '') => {
    setIsLoading(true);
    try {
      const endpoint = search.trim() === '' ? '/api/clientes' : `/api/clientes/search?q=${search}`;
      const response = await api.get(endpoint);
      const clientesData = response.data;
      setClientes(clientesData);
      setFilteredClientes(clientesData);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Error al buscar clientes', 'error');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchClientes(searchQuery);
  }, [searchQuery, fetchClientes]);

  // Manejadores de eventos
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleEdit = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsEditModalOpen(true);
  };

  const handleDelete = (cliente: Cliente) => {
    setSelectedCliente(cliente);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!selectedCliente) return;

    setIsLoading(true);
    try {
      await api.delete(`/api/clientes/${selectedCliente._id}`);
      showToast('Cliente eliminado exitosamente', 'success');
      await fetchClientes(searchQuery);
      setIsDeleteModalOpen(false);
      setSelectedCliente(undefined);
    } catch (err: any) {
      showToast(err.response?.data?.message || 'Error al eliminar el cliente', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setSelectedCliente(undefined);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedCliente(undefined);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="text-3xl font-bold text-gray-900
            bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Clientra - Gestión de Clientes
          </h1>
          
          <button
            onClick={() => setIsEditModalOpen(true)}
            className="relative group px-6 py-2 rounded-lg overflow-hidden
              text-white font-medium shadow-lg
              transform transition-all duration-300
              hover:scale-105 hover:shadow-xl
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            {/* Gradient Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent"></div>
            
            {/* Content */}
            <div className="relative flex items-center space-x-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>Nuevo Cliente</span>
            </div>
          </button>
        </div>

        {/* Search */}
        <div className="w-full">
          <Buscador 
            onSearch={handleSearch} 
            placeholder="Buscar por nombre, teléfono o dirección..." 
          />
        </div>

        {/* Results Count */}
        <div className="text-sm text-gray-500">
          {filteredClientes.length} resultados encontrados
        </div>

        {/* Results */}
        <Resultados
          clientes={filteredClientes}
          isLoading={isLoading}
          onEdit={handleEdit}
          onDelete={id => {
            const cliente = clientes.find(c => c._id === id);
            if (cliente) handleDelete(cliente);
          }}
        />
      </div>

      {/* Modals */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={handleCloseEditModal}
        title={selectedCliente ? 'Editar Cliente' : 'Nuevo Cliente'}
      >
        <ClienteForm
          cliente={selectedCliente}
          onSubmit={async (clienteData) => {
            try {
              if (selectedCliente) {
                await api.put(`/api/clientes/${selectedCliente._id}`, clienteData);
                showToast('Cliente actualizado exitosamente', 'success');
              } else {
                await api.post('/api/clientes', clienteData);
                showToast('Cliente creado exitosamente', 'success');
              }
              await fetchClientes(searchQuery);
              handleCloseEditModal();
            } catch (err: any) {
              showToast(
                err.response?.data?.message || 'Error al guardar el cliente',
                'error'
              );
            }
          }}
          onCancel={handleCloseEditModal}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        title="Eliminar Cliente"
      >
        <div className="p-6">
          <p className="mb-4 text-gray-600">
            ¿Estás seguro que deseas eliminar al cliente {selectedCliente?.nombre}?
          </p>
          <div className="flex justify-end space-x-4">
            <button
              onClick={handleCloseDeleteModal}
              className="btn-secondary"
            >
              Cancelar
            </button>
            <button
              onClick={confirmDelete}
              className="btn-danger"
            >
              Eliminar
            </button>
          </div>
        </div>
      </Modal>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default Clientes; 