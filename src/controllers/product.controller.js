import ProductDAO from '../dao/product.dao.js'; // Import your CartDAO class
import { Exception } from '../utils/utils.js'; // Import your Exception class

export default class ProductController {
  static async get(query = {}) {
    try {
      return await ProductDAO.get(query);
    } catch (error) {
      throw new Exception('Error al obtener productos', 500);
    }
  }

  static async getById(productId) {
    try {
      return await ProductDAO.getById(productId);
    } catch (error) {
      throw new Exception('Error al obtener el producto', 500);
    }
  }

  static async create(data) {
    try {
      return await ProductDAO.create(data);
    } catch (error) {
      throw new Exception('Error al crear el producto', 500);
    }
  }

  static async updateById(productId, data) {
    try {
      return await ProductDAO.updateById(productId, data);
    } catch (error) {
      throw new Exception('Error al actualizar el producto', 500);
    }
  }

  static async deleteById(productId) {
    try {
      return await ProductDAO.deleteById(productId);
    } catch (error) {
      throw new Exception('Error al eliminar el producto', 500);
    }
  }
}
