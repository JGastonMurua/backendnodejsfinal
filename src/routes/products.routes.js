import express from 'express';
import productController from '../controllers/product.controller.js';
import { verifyToken } from '../middlewares/auth.middleware.js';

const router = express.Router();

// Rutas públicas (sin autenticación)
router.get('/', productController.getAllProducts.bind(productController));
router.get('/:id', productController.getProductById.bind(productController));

// Rutas protegidas (requieren autenticación)
router.post('/create', verifyToken, productController.createProduct.bind(productController));
router.put('/:id', verifyToken, productController.updateProduct.bind(productController));
router.delete('/:id', verifyToken, productController.deleteProduct.bind(productController));

export default router;