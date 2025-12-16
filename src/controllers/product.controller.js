import productService from '../services/product.service.js';

// Controlador de productos
export class ProductController {
  
  // GET /api/products - Obtener todos los productos
  async getAllProducts(req, res, next) {
    try {
      const products = await productService.getAllProducts();
      res.status(200).json({
        success: true,
        count: products.length,
        data: products
      });
    } catch (error) {
      next(error);
    }
  }

  // GET /api/products/:id - Obtener un producto por ID
  async getProductById(req, res, next) {
    try {
      const { id } = req.params;
      const product = await productService.getProductById(id);
      
      if (!product) {
        return res.status(404).json({
          success: false,
          error: 'Producto no encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        data: product
      });
    } catch (error) {
      next(error);
    }
  }

  // POST /api/products/create - Crear un nuevo producto
  async createProduct(req, res, next) {
    try {
      const productData = req.body;
      const newProduct = await productService.createProduct(productData);
      
      res.status(201).json({
        success: true,
        message: 'Producto creado exitosamente',
        data: newProduct
      });
    } catch (error) {
      if (error.message.includes('obligatorio') || error.message.includes('positivo')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      next(error);
    }
  }

  // PUT /api/products/:id - Actualizar un producto
  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const productData = req.body;
      
      const updatedProduct = await productService.updateProduct(id, productData);
      
      if (!updatedProduct) {
        return res.status(404).json({
          success: false,
          error: 'Producto no encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Producto actualizado exitosamente',
        data: updatedProduct
      });
    } catch (error) {
      if (error.message.includes('obligatorio') || error.message.includes('positivo')) {
        return res.status(400).json({
          success: false,
          error: error.message
        });
      }
      next(error);
    }
  }

  // DELETE /api/products/:id - Eliminar un producto
  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;
      const deleted = await productService.deleteProduct(id);
      
      if (!deleted) {
        return res.status(404).json({
          success: false,
          error: 'Producto no encontrado'
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Producto eliminado exitosamente'
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductController();