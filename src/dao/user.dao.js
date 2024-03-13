// user.dao.js
import userModel from '../models/user.model.js';
import UserModel from '../models/user.model.js';
import { createHash } from '../utils/auth.utils.js';
import { NotFoundException, ServerException } from '../utils/utils.js';

export default class UserDAO {

 static async findAll() {
  try{
    const allUsers = UserModel.find();
    return allUsers
  } catch (error) {
    throw new ServerException('Error al buscar usuario por correo');
  }
}


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
  static async findById(id) {
    try {
      return await UserModel.findById(id).populate({
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

  static async deleteById(userId) {
    try {
      const user= await UserModel.findById(userId);
     /* if (!product) {
        throw new NotFoundException('No existe el producto');
      } */
      const criteria = { _id: userId };
      await UserModel.deleteOne(criteria);
      console.log('Usuario eliminado correctamente ');
    } catch (error) {
      throw new ServerException('Error al eliminar el usuario');
    }
  }
}
