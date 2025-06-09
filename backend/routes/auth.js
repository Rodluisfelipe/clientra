const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');
const { validateLogin } = require('../middleware/validate');

// Registro de usuario
router.post('/registro', async (req, res) => {
  try {
    const usuario = new Usuario(req.body);
    await usuario.save();
    
    const token = jwt.sign(
      { userId: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.status(201).json({ token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login de usuario
router.post('/login', validateLogin, async (req, res) => {
  try {
    const { email, password } = req.body;
    const usuario = await Usuario.findOne({ email });
    
    if (!usuario) {
      return res.status(401).json({
        message: 'Credenciales inválidas',
        errors: { auth: 'Email o contraseña incorrectos' }
      });
    }
    
    const isMatch = await usuario.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        message: 'Credenciales inválidas',
        errors: { auth: 'Email o contraseña incorrectos' }
      });
    }
    
    const token = jwt.sign(
      { userId: usuario._id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      token,
      user: {
        id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error en el servidor',
      errors: { server: error.message }
    });
  }
});

module.exports = router; 