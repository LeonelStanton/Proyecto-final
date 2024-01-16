import ProductRepository from "../repositories/product.repository.js";
import { ServerException } from "../utils/utils.js"; 
import { CustomError } from '../errors/custom.error.js'; 
import { generatorProductIdError,generatorProductError } from '../errors/cause.error.message.js';
import EnumsError from '../errors/enums.error.js';// Import your Exception class

export default class ProductController {
  static async get(query = {}) {
    try {
      return await ProductRepository.get(query);
    } catch (error) {
      throw error
    }
  }

  static async getById(productId) {
    try {
     const prod = await ProductRepository.getById(productId);
   if(!prod){
   throw CustomError.createError({
      name: 'Error buscando al producto',
      cause: generatorProductIdError(),
      message: "El producto no existe" ,
      code: EnumsError.PRODUCT_NOT_FOUND,
    });
   }
     return prod
    } catch (error) {
      throw error
    }
  }

  static async create(data) {
    try {
      const { title, description, price, code, stock, category } = data;

      if (!title || !description || !price || !code || !stock || ! category) {
        throw CustomError.createError({
          name: 'Error creando al producto',
          cause: generatorProductError({
            title, description, price, code, stock, category,
          }),
          message: "Ocurrió un error mientras intentábamos crear el producto." ,
          code: EnumsError.BAD_REQUEST_ERROR,
        });
      }
      console.log(data)
      return await ProductRepository.create(data);
    } catch (error) {
      throw error
    }
  }

  static async updateById(productId, data) {
    try {
      const prod = await ProductRepository.getById(productId);
   if(!prod){
    throw CustomError.createError({
      name: 'Error buscando al producto',
      cause: generatorProductIdError(),
      message: "El producto no existe" ,
      code: EnumsError.PRODUCT_NOT_FOUND,
    });
   }
      return await ProductRepository.updateById(productId, data);
    } catch (error) {
      throw error
    }
  }

  static async deleteById(productId) {
    try {
      const prod = await ProductRepository.getById(productId);
   if(!prod){
   throw  CustomError.createError({
      name: 'Error buscando al producto',
      cause: generatorProductIdError(),
      message: "El producto no existe" ,
      code: EnumsError.PRODUCT_NOT_FOUND,
    });
   }
      return await ProductRepository.deleteById(productId);
    } catch (error) {
      throw error
    }
  }
}
