import { Router } from 'express';
import passport from 'passport';
import UserController from '../controllers/user.controller.js';
import { authMiddleware } from '../utils/auth.utils.js';

const router = Router();

router.post('/auth/register', UserController.register);

router.post('/auth/login', UserController.login);

router.get('/current', authMiddleware('jwt'), UserController.getCurrentUser);

export default router;
