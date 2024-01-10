import { Router } from 'express';
import UserController from '../controllers/user.controller.js';
import { authMiddleware } from '../utils/auth.utils.js';

const router = Router();

router.post('/auth/register', UserController.register);

router.post('/auth/login', UserController.login);

router.put("/user/:uid/cart/:cid",authMiddleware('jwt',["admin"]), UserController.updateUser);

router.get('/current', authMiddleware('jwt',["user"]), UserController.getCurrentUser);

export default router;
