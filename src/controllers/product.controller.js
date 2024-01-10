import ProductRepository from "../repositories/product.repository.js";
import { ServerException } from "../utils/utils.js"; // Import your Exception class

export default class ProductController {
  static async get(query = {}) {
    try {
      return await ProductRepository.get(query);
    } catch (error) {
      throw new ServerException("Error al obtener productos");
    }
  }

  static async getById(productId) {
    try {
      return await ProductRepository.getById(productId);
    } catch (error) {
      throw new ServerException("Error al obtener el producto");
    }
  }

  static async create(data) {
    try {
      return await ProductRepository.create(data);
    } catch (error) {
      throw new ServerException("Error al crear el producto");
    }
  }

  static async updateById(productId, data) {
    try {
      return await ProductRepository.updateById(productId, data);
    } catch (error) {
      throw new ServerException("Error al actualizar el producto");
    }
  }

  static async deleteById(productId) {
    try {
      return await ProductRepository.deleteById(productId);
    } catch (error) {
      throw new ServerException("Error al eliminar el producto");
    }
  }
}
