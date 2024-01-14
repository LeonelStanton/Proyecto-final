// user.controller.js
import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import config from "../config.js";
import { isValidPassword, tokenGenerator } from "../utils/auth.utils.js";

export default class UserController {
  static async register(req, res) {
    const { first_name, last_name, email, age, password } = req.body;
    const existingUser = await UserRepository.findByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .json({
          message: "Correo ya registrado. Intenta recuperar tu contraseña.",
        });
    }
    const cart = await CartRepository.create();
    const user = await UserRepository.createUser({
      first_name,
      last_name,
      age,
      email,
      password,
      cart,
    });
    console.log("Usuario creado correctamente");
    res.redirect("/login");
  }

  static async login(req, res) {
    const {
      body: { email, password },
    } = req;
    if (!email || !password) {
      return res
        .status(400)
        .json({
          message:
            "La solicitud no incluye información de inicio de sesión válida.",
        });
    }
    const user = await UserRepository.findByEmail(email);

    if (!user || !isValidPassword(password, user)) {
      return res.status(401).json({ message: "Email o contraseña inválidos." });
    }

    const token = tokenGenerator(user);
    const cookieTime = eval(config.cookieLifeTime);
    res
      .cookie("access_token", token, {
        maxAge: cookieTime,
        httpOnly: true,
        signed: true,
      })
      .status(200)
      .json({ status: "success" });
  }

  static async updateUser(req, res) {
    try {
      const { uid, cid } = req.params;
      await UserRepository.updateUserCart(uid, cid);
      res.status(200).json({ status: "success", message: "Usuario actualizado" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }

  static async getCurrentUser(req, res) {
    try {
      const user = await UserRepository.findByEmail(req.user.email);

      if (!user) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const userDto = UserRepository.mapToDTO(user);
      res.status(200).json(userDto);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error interno del servidor" });
    }
  }
}
