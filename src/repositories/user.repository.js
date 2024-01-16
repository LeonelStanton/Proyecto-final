// user.repository.js
import UserDAO from "../dao/user.dao.js";
import UserDTO from "../dto/user.dto.js";
import { NotFoundException, ServerException } from "../utils/utils.js";

export default class UserRepository {
  static async findByEmail(email) {
    const user = await UserDAO.findByEmail(email);

    /*    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    } */

    return user;
  }

  static async findById(uid) {
    const user = await UserDAO.findById(uid);

    /*    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    } */

    return user;
  }

  static async createUser(userDetails) {
    try {
      return await UserDAO.createUser(userDetails);
    } catch (error) {
      throw new ServerException("Error al crear un usuario");
    }
  }

  static async updateUserCart(userId, cartId) {
    try {
      return await UserDAO.updateUserCart(userId, cartId);
    } catch (error) {
      throw new ServerException("Error al actualizar el carrito del usuario");
    }
  }

  static mapToDTO(user) {
    return new UserDTO(user);
  }
  // Add any other user-related repository methods here
}
