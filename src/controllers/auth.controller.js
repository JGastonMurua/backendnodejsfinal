import authService from '../services/auth.service.js';

// Controlador de autenticación
export class AuthController {
  
  // POST /auth/login - Iniciar sesión
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      
      // Validar que se envíen los datos
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email y contraseña son requeridos'
        });
      }
      
      const result = await authService.login(email, password);
      
      if (!result.success) {
        return res.status(401).json({
          success: false,
          error: result.message
        });
      }
      
      res.status(200).json({
        success: true,
        message: 'Login exitoso',
        token: result.token,
        user: result.user
      });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();