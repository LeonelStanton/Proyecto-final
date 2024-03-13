import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/auth/register', async (req, res, next) => {
  try {
      
      await UserController.register(req, res);
      // Log de nivel info para registro de usuario exitoso
      req.logger.info('Registro de usuario exitoso');
  } catch (error) {
      // Log de nivel error en caso de fallo en el registro
      req.logger.error(`Error durante el registro: ${error.message}`);
      next(error); // Pasar el error al middleware de manejo de errores
  }
});

router.post('/auth/login', async (req, res, next) => {
  try {
      
      await UserController.login(req, res);
      // Log de nivel info para inicio de sesión exitoso
      req.logger.info('Inicio de sesión exitoso');
  } catch (error) {
      // Log de nivel error en caso de fallo en el inicio de sesión
      req.logger.error(`Error durante el inicio de sesión: ${error.message}`);
      next(error); // Pasar el error al middleware de manejo de errores
  }
});


router.get('/current', authMiddleware('jwt', ['user']), async (req, res, next) => {
  try {
      
      await UserController.getCurrentUser(req, res);
      // Log de nivel info para obtener el usuario actual
      req.logger.info('Obtención exitosa del usuario actual');
  } catch (error) {
      // Log de nivel error en caso de fallo al obtener el usuario actual
      req.logger.error(`Error al obtener el usuario actual: ${error.message}`);
      next(error); // Pasar el error al middleware de manejo de errores
  }
});

export default router;
