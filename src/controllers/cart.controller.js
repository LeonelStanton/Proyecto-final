import CartRepository from "../repositories/cart.repository.js";
import ProductRepository from "../repositories/product.repository.js";
import { CustomError } from '../errors/custom.error.js'; 
import { generatorCartError, generatorProductError } from '../errors/cause.error.message.js';
import EnumsError from '../errors/enums.error.js';
import { ServerException } from "../utils/utils.js";

export default class CartController {
  static async get(query = {}) {
    try {
      return await CartRepository.get(query);
    } catch (error) {
      throw error;
    }
  }

  static async getCartById(cid) {
    try {
      const cart = await CartRepository.getCartById(cid)
      if (!cart){
       throw CustomError.createError({
          name: 'Error buscando al carrito',
          cause: generatorCartError(),
          message: "El carrito no existe" ,
          code: EnumsError.CART_NOT_FOUND,
        });
      }
      return cart;
    } catch (error) {
      throw error;
    }
  }

  static async create() {
    try {
      return await CartRepository.create();
    } catch (error) {
      throw error;
    }
  }

  static async updateProductByCart(cid, pid) {
    try {
      const cart = await CartRepository.getCartById(cid)
      
      if (!cart){
     throwCustomError.createError({
          name: 'Error buscando al carrito',
          cause: generatorCartError(),
          message: "El carrito no existe" ,
          code: EnumsError.CART_NOT_FOUND,
        });
      }
      const prod = await ProductRepository.getById(pid);
      if(!prod){
     throw CustomError.createError({
         name: 'Error buscando al producto',
         cause: generatorProductError(),
         message: "El producto no existe" ,
         code: EnumsError.PRODUCT_NOT_FOUND,
       });
      }
      return await CartRepository.updateProductByCart(cid, pid);
    } catch (error) {
      throw error;
    }
  }

  static async updateAll(cid, data) {
    try {
      const cart = await CartRepository.getCartById(cid)
      if (!cart){
       throw CustomError.createError({
          name: 'Error buscando al carrito',
          cause: generatorCartError(),
          message: "El carrito no existe" ,
          code: EnumsError.CART_NOT_FOUND,
        });
      }
      return await CartRepository.updateAll(cid, data);
    } catch (error) {
      throw error;
    }
  }

  static async updateOne(cid, pid, quant) {
    try {
      const cart = await CartRepository.getCartById(cid)
      if (!cart){
       throw CustomError.createError({
          name: 'Error buscando al carrito',
          cause: generatorCartError(),
          message: "El carrito no existe" ,
          code: EnumsError.CART_NOT_FOUND,
        });
      }
      if(!prod){
       throw CustomError.createError({
          name: 'Error buscando al producto',
          cause: generatorProductError(),
          message: "El producto no existe" ,
          code: EnumsError.PRODUCT_NOT_FOUND,
        });
       }
      return await CartRepository.updateOne(cid, pid, quant);
    } catch (error) {
      throw error;
    }
  }

  static async deleteProductByCart(cid, pid) {
    try {
      const cart = await CartRepository.getCartById(cid)
      if (!cart){
       throw CustomError.createError({
          name: 'Error buscando al carrito',
          cause: generatorCartError(),
          message: "El carrito no existe" ,
          code: EnumsError.CART_NOT_FOUND,
        });
      }
      const prod = await ProductRepository.getById(pid);
      if(!prod){
      throw CustomError.createError({
         name: 'Error buscando al producto',
         cause: generatorProductError(),
         message: "El producto no existe" ,
         code: EnumsError.PRODUCT_NOT_FOUND,
       });
      }
      return await CartRepository.deleteProductByCart(cid, pid);
    } catch (error) {
      throw error
    }
  }

  static async deleteAll(cid) {
    try {
      const cart = await CartRepository.getCartById(cid)
      if (!cart){
       throw CustomError.createError({
          name: 'Error buscando al carrito',
          cause: generatorCartError(),
          message: "El carrito no existe" ,
          code: EnumsError.CART_NOT_FOUND,
        });
      }
      return await CartRepository.deleteAll(cid);
    } catch (error) {
      throw error
    }
  }

  static async purchase(cid) {
    try {
      const cart = await CartRepository.getCartById(cid)
      if (!cart){
      throw  CustomError.createError({
          name: 'Error buscando al carrito',
          cause: generatorCartError(),
          message: "El carrito no existe" ,
          code: EnumsError.CART_NOT_FOUND,
        });
      }
      return await CartRepository.purchase(cid);
    } catch (error) {
      throw error
    }
  }
}
