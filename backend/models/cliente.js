const mongoose = require('mongoose');

const clienteSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true,
    lowercase: true
  },
  telefono: {
    type: String,
    required: true,
    trim: true
  },
  direccion: {
    type: String,
    required: true,
    trim: true
  },
  municipio: {
    type: String,
    required: true,
    trim: true
  },
  valorDomicilio: {
    type: Number,
    required: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para actualizar updatedAt antes de cada actualización
clienteSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Cliente', clienteSchema); 