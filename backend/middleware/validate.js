const validateLogin = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      message: 'Email y contraseña son requeridos',
      errors: {
        email: !email ? 'El email es requerido' : null,
        password: !password ? 'La contraseña es requerida' : null
      }
    });
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    return res.status(400).json({
      message: 'Email inválido',
      errors: { email: 'Debe ser un email válido' }
    });
  }

  if (typeof password !== 'string' || password.length < 6) {
    return res.status(400).json({
      message: 'Contraseña inválida',
      errors: { password: 'La contraseña debe tener al menos 6 caracteres' }
    });
  }

  next();
};

const validateCliente = (req, res, next) => {
  const { nombre, telefono, direccion, municipio, valorDomicilio } = req.body;

  const errors = {};

  if (!nombre || typeof nombre !== 'string' || nombre.trim().length < 2) {
    errors.nombre = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!telefono || typeof telefono !== 'string' || telefono.trim().length < 6) {
    errors.telefono = 'El teléfono debe tener al menos 6 caracteres';
  }

  if (!direccion || typeof direccion !== 'string' || direccion.trim().length < 5) {
    errors.direccion = 'La dirección debe tener al menos 5 caracteres';
  }

  if (!municipio || typeof municipio !== 'string' || municipio.trim().length < 2) {
    errors.municipio = 'El municipio debe tener al menos 2 caracteres';
  }

  if (!valorDomicilio || isNaN(Number(valorDomicilio)) || Number(valorDomicilio) <= 0) {
    errors.valorDomicilio = 'El valor del domicilio debe ser un número positivo';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      message: 'Datos de cliente inválidos',
      errors
    });
  }

  next();
};

const validateSearch = (req, res, next) => {
  const { q } = req.query;

  if (!q || typeof q !== 'string') {
    return res.status(400).json({
      message: 'Término de búsqueda inválido',
      errors: {
        query: 'El término de búsqueda es requerido'
      }
    });
  }

  // Limpiamos el término de búsqueda
  req.query.q = q.trim();
  next();
};

module.exports = {
  validateLogin,
  validateCliente,
  validateSearch
}; 