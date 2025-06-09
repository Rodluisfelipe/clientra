const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');
const auth = require('../middleware/auth');
const { validateCliente, validateSearch } = require('../middleware/validate');

// Middleware de autenticación para todas las rutas
router.use(auth);

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find().sort({ createdAt: -1 });
    res.json(clientes);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener clientes',
      errors: { server: error.message }
    });
  }
});

// Buscar clientes
router.get('/search', validateSearch, async (req, res) => {
  try {
    const query = req.query.q;
    
    // Si el query está vacío después del trim, devolver todos los clientes
    if (!query.trim()) {
      const clientes = await Cliente.find().sort({ createdAt: -1 });
      return res.json(clientes);
    }

    // Construir la consulta de búsqueda
    const searchQuery = {
      $or: [
        { nombre: { $regex: query, $options: 'i' } },
        { telefono: { $regex: query, $options: 'i' } },
        { direccion: { $regex: query, $options: 'i' } },
        { municipio: { $regex: query, $options: 'i' } }
      ]
    };

    const clientes = await Cliente.find(searchQuery).sort({ createdAt: -1 });

    // Si no hay resultados, devolver un array vacío en lugar de error
    res.json(clientes);
  } catch (error) {
    console.error('Error en la búsqueda:', error);
    res.status(500).json({
      message: 'Error al buscar clientes',
      error: error.message
    });
  }
});

// Crear un nuevo cliente
router.post('/', validateCliente, async (req, res) => {
  try {
    const cliente = new Cliente({
      ...req.body,
      createdBy: req.userId
    });

    const nuevoCliente = await cliente.save();
    res.status(201).json({
      message: 'Cliente creado exitosamente',
      cliente: nuevoCliente
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Cliente duplicado',
        errors: { duplicate: 'Ya existe un cliente con ese teléfono' }
      });
    }
    res.status(500).json({
      message: 'Error al crear el cliente',
      errors: { server: error.message }
    });
  }
});

// Obtener un cliente específico
router.get('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findById(req.params.id);
    if (!cliente) {
      return res.status(404).json({
        message: 'Cliente no encontrado',
        errors: { id: 'No existe un cliente con ese ID' }
      });
    }
    res.json(cliente);
  } catch (error) {
    res.status(500).json({
      message: 'Error al obtener el cliente',
      errors: { server: error.message }
    });
  }
});

// Actualizar un cliente
router.put('/:id', validateCliente, async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );

    if (!cliente) {
      return res.status(404).json({
        message: 'Cliente no encontrado',
        errors: { id: 'No existe un cliente con ese ID' }
      });
    }

    res.json({
      message: 'Cliente actualizado exitosamente',
      cliente
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: 'Cliente duplicado',
        errors: { duplicate: 'Ya existe un cliente con ese teléfono' }
      });
    }
    res.status(500).json({
      message: 'Error al actualizar el cliente',
      errors: { server: error.message }
    });
  }
});

// Eliminar un cliente
router.delete('/:id', async (req, res) => {
  try {
    const cliente = await Cliente.findByIdAndDelete(req.params.id);
    if (!cliente) {
      return res.status(404).json({
        message: 'Cliente no encontrado',
        errors: { id: 'No existe un cliente con ese ID' }
      });
    }
    res.json({
      message: 'Cliente eliminado exitosamente',
      cliente
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error al eliminar el cliente',
      errors: { server: error.message }
    });
  }
});

module.exports = router; 