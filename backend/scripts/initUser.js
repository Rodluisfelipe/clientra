const mongoose = require('mongoose');
const Usuario = require('../models/usuario');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/clientra';

const defaultUser = {
  nombre: 'morella',
  email: 'lamorellagourmet@gmail.com',
  password: 'morella2025.',
  rol: 'admin'
};

async function initializeDefaultUser() {
  try {
    // Conectar a MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');

    // Verificar si ya existe un usuario admin
    const existingAdmin = await Usuario.findOne({ email: defaultUser.email });
    
    if (existingAdmin) {
      console.log('El usuario administrador ya existe');
      return;
    }

    // Crear nuevo usuario admin
    const newAdmin = new Usuario(defaultUser);
    await newAdmin.save();
    
    console.log('Usuario administrador creado exitosamente');
    console.log('Email:', defaultUser.email);
    console.log('Contraseña:', defaultUser.password);

  } catch (error) {
    console.error('Error al crear usuario:', error);
  } finally {
    // Cerrar la conexión
    await mongoose.connection.close();
    console.log('Conexión cerrada');
  }
}

// Ejecutar el script
initializeDefaultUser(); 