import UserModel from '../models/user.model.js';
import { createHash } from '../utils/auth.utils.js';

export default class UserDAO {
  static async findByEmail(email) {
    return await UserModel.findOne({ email });
  }

  static async createUser({ first_name, last_name, age, email, password }) {
    return await UserModel.create({
      first_name,
      last_name,
      age,
      email,
      password: createHash(password),
    });
  }

  static async updateUserCart(userId, cartId) {
    const user = await UserModel.findById(userId);
    if (user) {
      user.cart = cartId;
      await user.save();
    }
    return user;
  }

  static async findByIdWithCartPopulated(userId) {
    return await UserModel.findById(userId).populate({
      path: 'cart',
      populate: {
        path: 'products.product',
        model: 'Products',
      },
    });
  }
}
