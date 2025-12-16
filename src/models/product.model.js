// Modelo de datos para productos
export class Product {
  constructor(data) {
    this.nombre = data.nombre || '';
    this.descripcion = data.descripcion || '';
    this.precio = data.precio || 0;
    this.stock = data.stock || 0;
    this.categoria = data.categoria || '';
    this.imagen = data.imagen || '';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  // Validar que los datos sean correctos
  validate() {
    const errors = [];

    if (!this.nombre || this.nombre.trim() === '') {
      errors.push('El nombre es obligatorio');
    }

    if (!this.descripcion || this.descripcion.trim() === '') {
      errors.push('La descripción es obligatoria');
    }

    if (typeof this.precio !== 'number' || this.precio < 0) {
      errors.push('El precio debe ser un número positivo');
    }

    if (typeof this.stock !== 'number' || this.stock < 0) {
      errors.push('El stock debe ser un número positivo');
    }

    if (!this.categoria || this.categoria.trim() === '') {
      errors.push('La categoría es obligatoria');
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  }

  // Convertir a objeto plano para guardar en Firestore
  toJSON() {
    return {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precio: this.precio,
      stock: this.stock,
      categoria: this.categoria,
      imagen: this.imagen,
      createdAt: this.createdAt,
      updatedAt: new Date().toISOString()
    };
  }
}