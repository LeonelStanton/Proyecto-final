import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import EmailService from '../utils/email.utils.js';

const router = Router();


router.get('/sendEmail', async (req, res, next) => {
  try {
    const result = await EmailService.sendEmail(
      'leonel_s2011@hotmail.com',
      'Esta es un correo de prueba',
      `
      <div>
        <h1>Hola cómo estás?</h1>
        <p>Esta es una prueba de envio de correo desde Node js.</p>
      </div>
      `,
    );
    console.log('result', result);
    res.status(200).json({ message: 'Correo enviado correctamente'})
  } catch (error) {
    next(error);
  }
});

router.get("/users", authMiddleware('jwt', ['admin']), async (req, res, next) => {
    try {
      // const users = await UserController.getAllUsers(req, res);
      res.status(200).render("users");
    } catch (error) {
      req.logger.error(`Error al obtener todos los usuarios: ${error.message}`);
      next(error);
    }
  });
  
  router.get("/user", authMiddleware('jwt', ['admin']), async (req, res, next) => {
    try {
      const users = await UserController.getAllUsers(req, res);
      
      req.logger.info('Obtención exitosa de todos los usuarios');
      
      res.status(200).json(users);
    } catch (error) {
      req.logger.error(`Error al obtener todos los usuarios: ${error.message}`);
      next(error);
    }
  });
  

  router.put("/users/:userId/change-role", authMiddleware('jwt', ['admin']), async (req, res, next) => {
    try {
        const { userId } = req.params;
        await UserController.changeUserRole(userId);
        req.logger.info(`Cambio exitoso de rol para el usuario con ID ${userId}`);
        res.status(200).json({ status: "success", message: "Rol del usuario cambiado" });
    } catch (error) {
        // Manejo de errores
        res.status(500).json({ status: "error", message: "Error al cambiar el rol del usuario" });
        next(error);
    }
}); 
  // En tu archivo de rutas del servidor
router.delete("/users/:userId", authMiddleware('jwt', ['admin']), async (req, res, next) => {
  try {
    const {
      params: { userId },
    } = req;
    await UserController.deleteById(userId);
    req.logger.info(`Eliminación exitosa del usuario con ID ${userId}`);
    res
      .status(200)
      .json({ status: "success", message: "Usuario Eliminado" });
      

  } catch (error) {
      // Manejo de errores
      req.logger.error(`Error al eliminar el usuario: ${error.message}`);
      next(error);
  }
});


  router.put('/user/:uid/cart/:cid', authMiddleware('jwt', ['admin']), async (req, res, next) => {
    try {
        
        await UserController.updateUser(req, res);
        // Log de nivel info para actualización exitosa del usuario
        req.logger.info('Actualización exitosa del usuario');
    } catch (error) {
        // Log de nivel error en caso de fallo en la actualización del usuario
        req.logger.error(`Error durante la actualización del usuario: ${error.message}`);
        next(error); // Pasar el error al middleware de manejo de errores
    }
  }); 

  export default router; 