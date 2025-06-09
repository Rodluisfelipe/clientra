const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Configuración de variables de entorno
dotenv.config();

// Inicialización de Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB:', err));

// Importar rutas
const clientesRoutes = require('./routes/clientes');
const authRoutes = require('./routes/auth');

// Usar rutas
app.use('/api/clientes', clientesRoutes);
app.use('/api/auth', authRoutes);

// Ruta de ping para mantener el servidor activo
app.get('/ping', (req, res) => {
  res.json({
    message: 'pong',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });

});

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Error interno del servidor',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Puerto de la aplicación
const PORT = process.env.PORT || 3001;

// Exportar la app para poder usarla en otros archivos
module.exports = app;

// Iniciar el servidor solo si este archivo es ejecutado directamente
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
    console.log(`Ambiente: ${process.env.NODE_ENV || 'development'}`);
  });
} 
