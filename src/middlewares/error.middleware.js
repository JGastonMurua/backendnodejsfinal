// Middleware para manejar rutas no encontradas (404)
export const notFound = (req, res, next) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    path: req.originalUrl
  });
};

// Middleware para manejar errores globales
export const errorHandler = (err, req, res, next) => {
  console.error('Error:', err);

  // Error de Firebase
  if (err.code && err.code.startsWith('firestore/')) {
    return res.status(500).json({
      error: 'Error en el servicio de base de datos',
      details: err.message
    });
  }

  // Error de validación
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      error: 'Error de validación',
      details: err.message
    });
  }

  // Error genérico del servidor
  res.status(err.status || 500).json({
    error: err.message || 'Error interno del servidor'
  });
};