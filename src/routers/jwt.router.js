import { Router } from 'express';
import passport from 'passport';
import {
  isValidPassword,
  tokenGenerator,
  verifyToken,
  createHash,
  authMiddleware,
} from '../utils.js';
import CartModel from '../dao/models/cart.model.js';
import UserModel from "../dao/models/user.model.js";

const router = Router();

/* router.get('/', (req, res) => {
  res.send('<h1>Hello People 😎!</h1>');
}); */

router.post('/auth/register', async (req, res) => {
    const { first_name,
        last_name,
        email,
        age,
        password } = req.body;
    let user = await UserModel.findOne({ email });
   
   
    if (user) {
      return res.status(400).json({ message: 'Correo ya registrado 😨. Intenta recuperar tu contraseña 😁.' });
    }
    user = await UserModel.create({
      first_name,
      last_name,
      age,
      email,
      password: createHash(password),
      
    });
  
   // res.status(201).json({ message: 'Usuario creado correctamente 👽' });
    res.redirect('/login');
  });
  

router.post('/auth/login', async (req, res) => {
  const { body: { email, password } } = req;
  const user = await UserModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: 'Email o pass invalidos.' });
  }
  const isValidPass = isValidPassword(password, user);
  if (!isValidPass) {
    return res.status(401).json({ message: 'Email o pass invalidos.' });
  }
  const token = tokenGenerator(user);
  const cartId = '654d720d466524cd408c94ac'; // Cambiar esto con el ID del carrito deseado
  user.cart = cartId;
  await user.save();
  //res.status(200).json({ access_token: token });
  res
    .cookie('access_token', token, {
      maxAge: 1000*60*30,
      httpOnly: true,
      signed: true,
    })
    .status(200)
    .json({ status: 'success' });
  
});

router.get('/current', authMiddleware('jwt'), async (req, res) => {
  try {
    
    const user = await UserModel.findById(req.user.id).populate({
      path: 'cart',
      populate: {
        path: 'products.product',
        model: 'Products',
      },
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});



export default router;