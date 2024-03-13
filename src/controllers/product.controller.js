import ProductRepository from "../repositories/product.repository.js";
import UserRepository from "../repositories/user.repository.js";
import CartRepository from "../repositories/cart.repository.js";
import { ServerException } from "../utils/utils.js";
import { CustomError } from "../errors/custom.error.js";
import mongoose from "mongoose";
import {
  generatorProductIdError,
  generatorProductError,
  generatorFormatError,
} from "../errors/cause.error.message.js";
import EmailService from '../utils/email.utils.js';
import EnumsError from "../errors/enums.error.js"; // Import your Exception class

export default class ProductController {
  static async get(query = {}) {
    try {
      return await ProductRepository.get(query);
    } catch (error) {
      throw error;
    }
  }

  static async getById(productId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw CustomError.createError({
          name: "Error de id del producto",
          cause: generatorFormatError(),
          message: "La id no es valida",
          code: EnumsError.INVALID_PARAMS_ERROR,
        });
      }
      const prod = await ProductRepository.getById(productId);
      if (!prod) {
        throw CustomError.createError({
          name: "Error buscando al producto",
          cause: generatorProductIdError(),
          message: "El producto no existeeee",
          code: EnumsError.PRODUCT_NOT_FOUND,
        });
      }
      return prod;
    } catch (error) {
      throw error;
    }
  }

  static async create(data) {
    try {
      const { title, description, price, code, stock, category } = data;

      if (!title || !description || !price || !code || !stock || !category) {
        throw CustomError.createError({
          name: "Error creando al producto",
          cause: generatorProductError({
            title,
            description,
            price,
            code,
            stock,
            category,
          }),
          message: "Ocurrió un error mientras intentábamos crear el producto.",
          code: EnumsError.BAD_REQUEST_ERROR,
        });
      }

      return await ProductRepository.create(data);
    } catch (error) {
      throw error;
    }
  }

  static async updateById(productId, data) {
    try {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw CustomError.createError({
          name: "Error de id del producto",
          cause: generatorFormatError(),
          message: "La id no es valida",
          code: EnumsError.INVALID_PARAMS_ERROR,
        });
      }
      const prod = await ProductRepository.getById(productId);
      if (!prod) {
        throw CustomError.createError({
          name: "Error buscando al producto",
          cause: generatorProductIdError(),
          message: "El producto no existe",
          code: EnumsError.PRODUCT_NOT_FOUND,
        });
      }
      return await ProductRepository.updateById(productId, data);
    } catch (error) {
      throw error;
    }
  }

  static async deleteById(productId) {
    try {
      if (!mongoose.Types.ObjectId.isValid(productId)) {
        throw CustomError.createError({
          name: "Error de id del producto",
          cause: generatorFormatError(),
          message: "La id no es valida",
          code: EnumsError.INVALID_PARAMS_ERROR,
        });
      }
      const prod = await ProductRepository.getById(productId);
      if (!prod) {
        throw CustomError.createError({
          name: "Error buscando al producto",
          cause: generatorProductIdError(),
          message: "El producto no existe",
          code: EnumsError.PRODUCT_NOT_FOUND,
        });
      }
      const users = await UserRepository.findAll();
        
      for (let user of users) {
          // Verifica si el usuario tiene un carrito
          if (user.cart) {
              let cart = await CartRepository.getCartById(user.cart._id);
             
              if (cart && cart.products) {
                  const productIndex = cart.products.findIndex((p) => p.product._id.equals(productId));
                  
                  if (productIndex !== -1) {
                      // Eliminar el producto del carrito
                      
                      
                      // Envía el correo electrónico al usuario
                      await EmailService.sendEmail(
                          `${user.email}`,
                          'Product deleted from ecommerce',
                          `
                          <div>
                              <h1>Hi how are you?</h1>
                              <b>Your product ${prod.title} has been deleted</b>
                          </div>
                          `,
                      );
                      console.log(cart._id.toString())
                      console.log(productId)
                      await CartRepository.deleteProductByCart(cart._id, productId)
                  }
              }
          }
       // return await ProductRepository.deleteById(productId);
        }
    } catch (error) {
      throw error;
    }
  }
}
