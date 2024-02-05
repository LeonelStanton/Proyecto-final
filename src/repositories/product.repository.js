// product.repository.js
import ProductDAO from "../dao/product.dao.js";
import { NotFoundException, ServerException } from "../utils/utils.js";
import { CustomError } from "../errors/custom.error.js";
import {
  generatorProductIdError,
  generatorProductError,
} from "../errors/cause.error.message.js";
import EnumsError from "../errors/enums.error.js";

export default class ProductRepository {
  static async get(query = {}) {
    try {
      return await ProductDAO.get(query);
    } catch (error) {
      throw new ServerException("Error al obtener productos");
    }
  }

  static async getById(productId) {
    try {
      const product = await ProductDAO.getById(productId);
      
      return product;
    } catch (error) {
      throw new ServerException("Error al obtener el producto");
    }
  }

  static async create(data) {
    try {
      return await ProductDAO.create(data);
    } catch (error) {
      throw new ServerException("Error al crear el producto");
    }
  }

  static async updateById(productId, data) {
    try {
      await ProductDAO.updateById(productId, data);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException("No existe el producto");
      } else {
        throw new ServerException("Error al actualizar el producto");
      }
    }
  }

  static async deleteById(productId) {
    try {
      await ProductDAO.deleteById(productId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException("No existe el producto");
      } else {
        throw new ServerException("Error al eliminar el producto");
      }
    }
  }
}
