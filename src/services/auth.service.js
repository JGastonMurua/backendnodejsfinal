import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

// Servicio de autenticación
export class AuthService {
  
  // Generar un token JWT
  generateToken(userData) {
    const payload = {
      id: userData.id || 'admin',
      email: userData.email,
      role: userData.role || 'admin'
    };

    // Token válido por 24 horas
    return jwt.sign(payload, process.env.JWT_SECRET, { 
      expiresIn: '24h' 
    });
  }

  // Login (simulado - en producción deberías validar contra una BD)
  async login(email, password) {
    try {
      // NOTA: Esto es una simulación simple
      // En producción deberías validar contra usuarios en Firestore
      // y encriptar las contraseñas con bcrypt
      
      if (email === 'admin@techlab.com' && password === 'admin123') {
        const userData = {
          id: '1',
          email: 'admin@techlab.com',
          role: 'admin'
        };

        const token = this.generateToken(userData);

        return {
          success: true,
          token,
          user: {
            id: userData.id,
            email: userData.email,
            role: userData.role
          }
        };
      }

      return {
        success: false,
        message: 'Credenciales inválidas'
      };
    } catch (error) {
      console.error('Error en login:', error);
      throw new Error('Error al procesar el login');
    }
  }
}

export default new AuthService();