import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import productRoutes from './src/routes/products.routes.js';
import authRoutes from './src/routes/auth.routes.js';
import { notFound, errorHandler } from './src/middlewares/error.middleware.js';

// Configurar variables de entorno
dotenv.config();

// Crear aplicación Express
const app = express();
const PORT = process.env.PORT || 3000;

// ========== MIDDLEWARES ==========

// CORS - Permitir peticiones desde el frontend
app.use(cors({
  origin: '*', // En producción, especifica el dominio de tu frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parser - Parsear JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Logging simple de peticiones
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ========== RUTAS ==========

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.json({
    message: '¡Bienvenido a la API de TechLab!',
    version: '1.0.0',
    endpoints: {
      products: '/api/products',
      auth: '/auth/login'
    }
  });
});

// Rutas de productos
app.use('/api/products', productRoutes);

// Rutas de autenticación
app.use('/auth', authRoutes);

// ========== MANEJO DE ERRORES ==========

// Middleware para rutas no encontradas (404)
app.use(notFound);

// Middleware para manejo global de errores
app.use(errorHandler);

// ========== INICIAR SERVIDOR ==========

app.listen(PORT, () => {
  console.log('=================================');
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log('=================================');
  console.log('📋 Endpoints disponibles:');
  console.log(`   GET    http://localhost:${PORT}/api/products`);
  console.log(`   GET    http://localhost:${PORT}/api/products/:id`);
  console.log(`   POST   http://localhost:${PORT}/api/products/create`);
  console.log(`   PUT    http://localhost:${PORT}/api/products/:id`);
  console.log(`   DELETE http://localhost:${PORT}/api/products/:id`);
  console.log(`   POST   http://localhost:${PORT}/auth/login`);
  console.log('=================================');
});