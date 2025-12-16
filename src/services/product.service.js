import { db } from '../config/firebase.js';
import { Product } from '../models/product.model.js';

const COLLECTION_NAME = 'productos';

// Servicio para gestionar productos en Firestore con Admin SDK
export class ProductService {
  
  // Obtener todos los productos
  async getAllProducts() {
    try {
      const snapshot = await db.collection(COLLECTION_NAME).get();
      
      const products = [];
      snapshot.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data()
        });
      });
      
      return products;
    } catch (error) {
      console.error('Error al obtener productos:', error);
      throw new Error('No se pudieron obtener los productos');
    }
  }

  // Obtener un producto por ID
  async getProductById(id) {
    try {
      const doc = await db.collection(COLLECTION_NAME).doc(id).get();
      
      if (!doc.exists) {
        return null;
      }
      
      return {
        id: doc.id,
        ...doc.data()
      };
    } catch (error) {
      console.error('Error al obtener producto:', error);
      throw new Error('No se pudo obtener el producto');
    }
  }

  // Crear un nuevo producto
  async createProduct(productData) {
    try {
      const product = new Product(productData);
      
      // Validar el producto
      const validation = product.validate();
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }
      
      // Guardar en Firestore
      const docRef = await db.collection(COLLECTION_NAME).add(product.toJSON());
      
      // Retornar el producto creado con su ID
      return {
        id: docRef.id,
        ...product.toJSON()
      };
    } catch (error) {
      console.error('Error al crear producto:', error);
      throw error;
    }
  }

  // Actualizar un producto existente
  async updateProduct(id, productData) {
    try {
      const docRef = db.collection(COLLECTION_NAME).doc(id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        return null;
      }
      
      // Crear producto con los datos actualizados
      const updatedProduct = new Product({
        ...doc.data(),
        ...productData
      });
      
      // Validar
      const validation = updatedProduct.validate();
      if (!validation.isValid) {
        throw new Error(validation.errors.join(', '));
      }
      
      // Actualizar en Firestore
      await docRef.update(updatedProduct.toJSON());
      
      return {
        id,
        ...updatedProduct.toJSON()
      };
    } catch (error) {
      console.error('Error al actualizar producto:', error);
      throw error;
    }
  }

  // Eliminar un producto
  async deleteProduct(id) {
    try {
      const docRef = db.collection(COLLECTION_NAME).doc(id);
      const doc = await docRef.get();
      
      if (!doc.exists) {
        return null;
      }
      
      await docRef.delete();
      return true;
    } catch (error) {
      console.error('Error al eliminar producto:', error);
      throw new Error('No se pudo eliminar el producto');
    }
  }
}

export default new ProductService();