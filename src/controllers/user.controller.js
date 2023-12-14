import UserDAO from '../dao/user.dao.js';
import { isValidPassword, tokenGenerator } from '../utils/auth.utils.js';

export default class UserController {
  static async register(req, res) {
    const { first_name, last_name, email, age, password } = req.body;
    const existingUser = await UserDAO.findByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .json({ message: 'Correo ya registrado. Intenta recuperar tu contraseña.' });
    }

    const user = await UserDAO.createUser({
      first_name,
      last_name,
      age,
      email,
      password,
    });

    res.redirect('/login');
  }

  static async login(req, res) {
    const { body: { email, password } } = req;
    if (!email || !password) {
      return res.status(400).json({ message: 'La solicitud no incluye información de inicio de sesión válida.' });
    }
    const user = await UserDAO.findByEmail(email);

    if (!user || !isValidPassword(password, user)) {
      return res.status(401).json({ message: 'Email o contraseña inválidos.' });
    }

   const token = tokenGenerator(user);
   // const cartId = '654d720d466524cd408c94ac'; 
  //   await UserDAO.updateUserCart(user._id, cartId);

    res
      .cookie('access_token', token, {
        maxAge: 1000 * 60 * 30,
        httpOnly: true,
        signed: true,
      })
      .status(200)
    .json({ status: 'success' });
  }

  static async getCurrentUser(req, res) {
    try {
     // const user = await UserDAO.findByIdWithCartPopulated(req.user.id);
     const user = await UserDAO.findByEmail(req.user.email);
      if (!user) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }

      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
}
