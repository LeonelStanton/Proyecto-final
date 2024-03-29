// user.controller.js
import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import { CustomError } from '../errors/custom.error.js'; 
import UserGeneralDTO from "../dto/userGeneral.dto.js";
import { generatorFormatError, generatorUsersError, generatorUserError, generatorEmailError, generatorLoginError, generatorLogin2Error, generatorCurrentError } from '../errors/cause.error.message.js';
import EnumsError from '../errors/enums.error.js';
import config from "../config.js";
import mongoose from "mongoose";
import { isValidPassword, tokenGenerator } from "../utils/auth.utils.js";

export default class UserController {
  static async register(req, res) {
    try {
      const { first_name, last_name, email, age, password } = req.body;
  
      if (!first_name || !last_name || !email || !age || !password) {
        throw CustomError.createError({
          name: 'Error creando el usuario',
          cause: generatorUserError({
            first_name,
            last_name,
            email,
            age,
            password,
          }),
          message: 'Ocurrió un error mientras intentábamos crear un usuario.',
          code: EnumsError.BAD_REQUEST_ERROR,
        });
      }
  
      const existingUser = await UserRepository.findByEmail(email);
  
      if (existingUser) {
        throw CustomError.createError({
          name: 'Error registrando el usuario',
          cause: generatorEmailError({
            email,
          }),
          message: "Correo ya registrado. Intenta recuperar tu contraseña.",
          code: EnumsError.USER_ALREADY_EXISTS,
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
  
      res.redirect("/login");
    } catch (error) {
      throw error; // Asegurarse de lanzar el error para que pueda ser manejado por el middleware de manejo de errores
    }
  }
  
  static async login(req, res) {
    try {
      const {
        body: { email, password },
      } = req;
  
      if (!email || !password) {
        throw CustomError.createError({
          name: 'Error logueando al usuario',
          cause: generatorLoginError(),
          message: "La solicitud no incluye información de inicio de sesión válida.",
          code: EnumsError.BAD_REQUEST_ERROR,
        });
      }
  
      const user = await UserRepository.findByEmail(email);
  
      if (!user || !isValidPassword(password, user)) {
        throw CustomError.createError({
          name: 'Error logueando al usuario',
          cause: generatorLogin2Error(),
          message: "Email o contraseña inválidos.",
          code: EnumsError.INVALID_CREDENTIALS,
        });
      }
  
      const token = tokenGenerator(user);
      const cookieTime = eval(config.cookieLifeTime);
  
      res.cookie("access_token", token, {
        maxAge: cookieTime,
        httpOnly: true,
        signed: true,
      });
      
      return res.redirect('/products')
     

    } catch (error) {
      // Aquí podrías agregar más lógica de manejo de errores si es necesario
      throw error;
    }
  }
  

  static async updateUser(req, res) {
    try {
      const { uid, cid } = req.params;
      const user = await UserRepository.findById(uid);

      if (!user) {
       throw CustomError.createError({
          name: 'Error de usuario',
          cause: generatorCurrentError(),
          message: "Usuario no encontrado" ,
          code: EnumsError.USER_NOT_FOUND,
        });
      }
      
      await UserRepository.updateUserCart(uid, cid);
      res.status(200).json({ status: "success", message: "Usuario actualizado" })
    } catch (error) {
      throw error;
    }
  }

  static async getAllUsers() {
    try {              
        const users = await UserRepository.findAll();
        if (!users) {            
          throw CustomError.createError({
            name: 'Error de current',
            cause: generatorUsersError(),
            message: "Usuarios no encontrados" ,
            code: EnumsError.USER_NOT_FOUND,
          });
        }
        
        const usersDTO = users.map(user => UserGeneralDTO.mapToGeneralDTO(user))  
            
        return usersDTO;

    } catch (error) {
        throw error
    }
    
};


  static async getCurrentUser(req, res) {
    try {
      const user = await UserRepository.findByEmail(req.user.email);

      if (!user) {
        throw CustomError.createError({
          name: 'Error de current',
          cause: generatorCurrentError(),
          message: "Usuario no encontrado" ,
          code: EnumsError.USER_NOT_FOUND,
        });
      }
     
      const userDto = UserRepository.mapToDTO(user);
      res.status(200).json(userDto);
    } catch (error) {
      throw error;
    }
  }
 
  static async changeUserRole(userId) {
    try {
        // Implementa la lógica para cambiar el rol del usuario aquí
        // Por ejemplo, puedes obtener el usuario y actualizar su propiedad 'role'
        if (!mongoose.Types.ObjectId.isValid(userId)) {
          throw CustomError.createError({
            name: "Error de id del usuario",
            cause: generatorFormatError(),
            message: "La id no es valida",
            code: EnumsError.INVALID_PARAMS_ERROR,
          });
        }
        const user = await UserRepository.findById(userId);
      if (!user) {
        throw CustomError.createError({
          name: 'Error de usuario',
          cause: generatorCurrentError(),
          message: "Usuario no encontrado" ,
          code: EnumsError.USER_NOT_FOUND,
        });
      }
        if (user) {
            user.role = (user.role === 'user') ? 'premium' : 'user';
            await user.save();
        } 
    } catch (error) {
        throw error;
    }
}

  static async deleteById(userId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw CustomError.createError({
          name: "Error de id del usuario",
          cause: generatorFormatError(),
          message: "La id no es valida",
          code: EnumsError.INVALID_PARAMS_ERROR,
        });
      }
      const user = await UserRepository.findById(userId);
      if (!user) {
        throw CustomError.createError({
          name: 'Error de usuario',
          cause: generatorCurrentError(),
          message: "Usuario no encontrado" ,
          code: EnumsError.USER_NOT_FOUND,
        });
      }
      return await UserRepository.deleteById(userId);
    } catch (error) {
      throw error;
    }
  }
}
