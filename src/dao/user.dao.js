// user.dao.js
import UserModel from '../models/user.model.js';
import { createHash } from '../utils/auth.utils.js';
import { NotFoundException, ServerException } from '../utils/utils.js';

export default class UserDAO {
  static async findByEmail(email) {
    try {
      return await UserModel.findOne({ email }).populate({
        path: 'cart',
        populate: {
          path: 'products.product',
          model: 'Products',
        },
      });
    } catch (error) {
      throw new ServerException('Error al buscar usuario por correo');
    }
  }

  static async findByCart(cart) {
    try {
      return await UserModel.findOne({ cart });
    } catch (error) {
      throw new ServerException('Error al buscar usuario por carrito');
    }
  }

  static async createUser({ first_name, last_name, age, email, password,cart }) {
    try {
      return await UserModel.create({
        first_name,
        last_name,
        age,
        email,
        password: createHash(password),
        cart: cart._id,
      });
    } catch (error) {
      throw new ServerException('Error al crear usuario');
    }
  }

  static async updateUserCart(userId, cartId) {
    try {
      const user = await UserModel.findById(userId);
      if (user) {
        user.cart = cartId;
        await user.save();
      }
      return user;
    } catch (error) {
      throw new ServerException('Error al actualizar carrito del usuario');
    }
  }

  static async findByIdWithCartPopulated(userId) {
    try {
      return await UserModel.findById(userId).populate({
        path: 'cart',
        populate: {
          path: 'products.product',
          model: 'Products',
        },
      });
    } catch (error) {
      throw new ServerException('Error al buscar usuario por ID con carrito poblado');
    }
  }
}
