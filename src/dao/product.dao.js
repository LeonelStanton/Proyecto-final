// product.repository.js
import ProductModel from '../models/product.model.js';
import { Exception, NotFoundException, ServerException } from '../utils/utils.js';
import { CustomError } from "../errors/custom.error.js";
import {
  generatorProductIdError,
  generatorProductError,
} from "../errors/cause.error.message.js";
import EnumsError from "../errors/enums.error.js";

export default class ProductDAO {
  static async get(query = {}) {
    try {
      return await ProductModel.find(query).lean();
    } catch (error) {
      throw new ServerException('Error al obtener productos');
    }
  }

  static async getById(productId) {
    try {
      const product = await ProductModel.findById(productId);
  
      

      return product;
    } catch (error) {
      throw new ServerException('Error al buscar el producto');
    }
  }


  static async create(data) {
    try {
      const product = await ProductModel.create(data);
      console.log('Producto creado correctamente ');
      return product;
    } catch (error) {
      throw new ServerException('Error al crear el producto');
    }
  }

  static async updateById(productId, data) {
    try {
      const product = await ProductModel.findById(productId);
    /*  if (!product) {
        throw new NotFoundException('No existe el producto');
      } */
      const criteria = { _id: productId };
      const operation = { $set: data };
      await ProductModel.updateOne(criteria, operation);
      console.log('Producto actualizado correctamente ');
    } catch (error) {
      throw new ServerException('Error al actualizar el producto');
    }
  }

  static async deleteById(productId) {
    try {
      const product = await ProductModel.findById(productId);
     /* if (!product) {
        throw new NotFoundException('No existe el producto');
      } */
      const criteria = { _id: productId };
      await ProductModel.deleteOne(criteria);
      console.log('Producto eliminado correctamente ');
    } catch (error) {
      throw new ServerException('Error al eliminar el producto');
    }
  }
}
