import React, { useState, useEffect } from 'react';
import { Cliente } from '../types/cliente';

interface ClienteFormProps {
  cliente?: Cliente;
  onSubmit: (cliente: Omit<Cliente, '_id'>) => void;
  onCancel: () => void;
}

const ClienteForm: React.FC<ClienteFormProps> = ({
  cliente,
  onSubmit,
  onCancel
}) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    direccion: '',
    municipio: '',
    valorDomicilio: ''
  });

  const [touched, setTouched] = useState({
    nombre: false,
    telefono: false,
    direccion: false,
    municipio: false,
    valorDomicilio: false
  });

  useEffect(() => {
    if (cliente) {
      setFormData({
        nombre: cliente.nombre,
        telefono: cliente.telefono,
        direccion: cliente.direccion,
        municipio: cliente.municipio,
        valorDomicilio: cliente.valorDomicilio.toString()
      });
    }
  }, [cliente]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBlur = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      nombre: formData.nombre,
      telefono: formData.telefono,
      direccion: formData.direccion,
      municipio: formData.municipio,
      valorDomicilio: Number(formData.valorDomicilio)
    });
  };

  const isValid = () => {
    return formData.nombre.length >= 2 &&
      formData.telefono.length >= 6 &&
      formData.direccion.length >= 5 &&
      formData.municipio.length >= 2 &&
      Number(formData.valorDomicilio) > 0;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nombre */}
        <div className="relative group">
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            onBlur={() => handleBlur('nombre')}
            className={`peer w-full px-4 py-3 rounded-lg border-2 
              bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
              outline-none transition-all duration-300
              ${touched.nombre && formData.nombre.length < 2
                ? 'border-red-300 focus:border-red-500 dark:border-red-900 dark:focus:border-red-700'
                : 'border-gray-200 focus:border-primary dark:border-gray-700 dark:focus:border-primary-light'
              }
              placeholder-transparent
              text-gray-900 dark:text-gray-100`}
            placeholder="Nombre"
          />
          <label className={`absolute left-2 -top-2.5 px-2 text-sm transition-all duration-300
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
            peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
            peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm
            bg-white dark:bg-gray-800 rounded
            ${touched.nombre && formData.nombre.length < 2
              ? 'text-red-500 dark:text-red-400'
              : 'peer-focus:text-primary dark:peer-focus:text-primary-light text-gray-600 dark:text-gray-400'}`}>
            Nombre
          </label>
          {touched.nombre && formData.nombre.length < 2 && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400 animate-fade-in">
              El nombre debe tener al menos 2 caracteres
            </p>
          )}
        </div>

        {/* Teléfono */}
        <div className="relative group">
          <input
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleChange}
            onBlur={() => handleBlur('telefono')}
            className={`peer w-full px-4 py-3 rounded-lg border-2 
              bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
              outline-none transition-all duration-300
              ${touched.telefono && formData.telefono.length < 6
                ? 'border-red-300 focus:border-red-500 dark:border-red-900 dark:focus:border-red-700'
                : 'border-gray-200 focus:border-primary dark:border-gray-700 dark:focus:border-primary-light'
              }
              placeholder-transparent
              text-gray-900 dark:text-gray-100`}
            placeholder="Teléfono"
          />
          <label className={`absolute left-2 -top-2.5 px-2 text-sm transition-all duration-300
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
            peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
            peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm
            bg-white dark:bg-gray-800 rounded
            ${touched.telefono && formData.telefono.length < 6
              ? 'text-red-500 dark:text-red-400'
              : 'peer-focus:text-primary dark:peer-focus:text-primary-light text-gray-600 dark:text-gray-400'}`}>
            Teléfono
          </label>
          {touched.telefono && formData.telefono.length < 6 && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400 animate-fade-in">
              El teléfono debe tener al menos 6 caracteres
            </p>
          )}
        </div>

        {/* Dirección */}
        <div className="relative group">
          <input
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
            onBlur={() => handleBlur('direccion')}
            className={`peer w-full px-4 py-3 rounded-lg border-2 
              bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
              outline-none transition-all duration-300
              ${touched.direccion && formData.direccion.length < 5
                ? 'border-red-300 focus:border-red-500 dark:border-red-900 dark:focus:border-red-700'
                : 'border-gray-200 focus:border-primary dark:border-gray-700 dark:focus:border-primary-light'
              }
              placeholder-transparent
              text-gray-900 dark:text-gray-100`}
            placeholder="Dirección"
          />
          <label className={`absolute left-2 -top-2.5 px-2 text-sm transition-all duration-300
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
            peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
            peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm
            bg-white dark:bg-gray-800 rounded
            ${touched.direccion && formData.direccion.length < 5
              ? 'text-red-500 dark:text-red-400'
              : 'peer-focus:text-primary dark:peer-focus:text-primary-light text-gray-600 dark:text-gray-400'}`}>
            Dirección
          </label>
          {touched.direccion && formData.direccion.length < 5 && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400 animate-fade-in">
              La dirección debe tener al menos 5 caracteres
            </p>
          )}
        </div>

        {/* Barrio */}
        <div className="relative group">
          <input
            type="text"
            name="municipio"
            value={formData.municipio}
            onChange={handleChange}
            onBlur={() => handleBlur('municipio')}
            className={`peer w-full px-4 py-3 rounded-lg border-2 
              bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
              outline-none transition-all duration-300
              ${touched.municipio && formData.municipio.length < 2
                ? 'border-red-300 focus:border-red-500 dark:border-red-900 dark:focus:border-red-700'
                : 'border-gray-200 focus:border-primary dark:border-gray-700 dark:focus:border-primary-light'
              }
              placeholder-transparent
              text-gray-900 dark:text-gray-100`}
            placeholder="Barrio"
          />
          <label className={`absolute left-2 -top-2.5 px-2 text-sm transition-all duration-300
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
            peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
            peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm
            bg-white dark:bg-gray-800 rounded
            ${touched.municipio && formData.municipio.length < 2
              ? 'text-red-500 dark:text-red-400'
              : 'peer-focus:text-primary dark:peer-focus:text-primary-light text-gray-600 dark:text-gray-400'}`}>
            Barrio
          </label>
          {touched.municipio && formData.municipio.length < 2 && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400 animate-fade-in">
              El barrio debe tener al menos 2 caracteres
            </p>
          )}
        </div>

        {/* Valor Domicilio */}
        <div className="relative group">
          <input
            type="number"
            name="valorDomicilio"
            value={formData.valorDomicilio}
            onChange={handleChange}
            onBlur={() => handleBlur('valorDomicilio')}
            className={`peer w-full px-4 py-3 rounded-lg border-2 
              bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm
              outline-none transition-all duration-300
              ${touched.valorDomicilio && Number(formData.valorDomicilio) <= 0
                ? 'border-red-300 focus:border-red-500 dark:border-red-900 dark:focus:border-red-700'
                : 'border-gray-200 focus:border-primary dark:border-gray-700 dark:focus:border-primary-light'
              }
              placeholder-transparent
              text-gray-900 dark:text-gray-100`}
            placeholder="Valor Domicilio"
          />
          <label className={`absolute left-2 -top-2.5 px-2 text-sm transition-all duration-300
            peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 
            peer-placeholder-shown:top-3 peer-placeholder-shown:left-4
            peer-focus:-top-2.5 peer-focus:left-2 peer-focus:text-sm
            bg-white dark:bg-gray-800 rounded
            ${touched.valorDomicilio && Number(formData.valorDomicilio) <= 0
              ? 'text-red-500 dark:text-red-400'
              : 'peer-focus:text-primary dark:peer-focus:text-primary-light text-gray-600 dark:text-gray-400'}`}>
            Valor Domicilio
          </label>
          {touched.valorDomicilio && Number(formData.valorDomicilio) <= 0 && (
            <p className="mt-1 text-sm text-red-500 dark:text-red-400 animate-fade-in">
              El valor del domicilio debe ser mayor a 0
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end space-x-4 mt-8">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 rounded-lg border-2 border-gray-200 
            text-gray-600 hover:bg-gray-100
            dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-800
            transition-all duration-200"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={!isValid()}
          className={`px-4 py-2 rounded-lg text-white
            transition-all duration-200
            ${isValid()
              ? 'bg-primary hover:bg-primary/90 dark:bg-primary-light dark:hover:bg-primary'
              : 'bg-gray-400 cursor-not-allowed dark:bg-gray-600'
            }`}
        >
          {cliente ? 'Actualizar' : 'Crear'}
        </button>
      </div>
    </form>
  );
};

export default ClienteForm; 