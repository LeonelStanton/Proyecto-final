import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/auth/register', async (req, res, next) => {
    try {
      await UserController.register(req, res);
    } catch (error) {
      next(error); // Pasar el error al middleware de manejo de errores
    }
  });

router.post('/auth/login', async (req, res, next) => {
    try {
      await UserController.login(req, res);
    } catch (error) {
      next(error); // Pasar el error al middleware de manejo de errores
    }
  });

  router.put('/user/:uid/cart/:cid', authMiddleware('jwt', ['admin']), async (req, res, next) => {
    try {
      await UserController.updateUser(req, res);
    } catch (error) {
      next(error); // Pasar el error al middleware de manejo de errores
    }
  });

  router.get('/current', authMiddleware('jwt', ['user']), async (req, res, next) => {
    try {
      await UserController.getCurrentUser(req, res);
    } catch (error) {
      next(error); // Pasar el error al middleware de manejo de errores
    }
  });

export default router;
