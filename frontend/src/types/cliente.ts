export interface Cliente {
  _id: string;
  nombre: string;
  telefono: string;
  direccion: string;
  municipio: string;
  valorDomicilio: number;
  createdAt?: string;
  updatedAt?: string;
} 