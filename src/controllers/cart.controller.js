import CartRepository from "../repositories/cart.repository.js";

import { ServerException } from "../utils/utils.js";

export default class CartController {
  static async get(query = {}) {
    try {
      return await CartRepository.get(query);
    } catch (error) {
      throw new ServerException("Error al obtener carritos de compras");
    }
  }

  static async getCartById(cid) {
    try {
      return await CartRepository.getCartById(cid);
    } catch (error) {
      throw new ServerException("Error al obtener el carrito");
    }
  }

  static async create() {
    try {
      return await CartRepository.create();
    } catch (error) {
      throw new ServerException("Error al crear un carrito");
    }
  }

  static async updateProductByCart(cid, pid) {
    try {
      return await CartRepository.updateProductByCart(cid, pid);
    } catch (error) {
      throw new ServerException("Error al actualizar el carrito");
    }
  }

  static async updateAll(cid, data) {
    try {
      return await CartRepository.updateAll(cid, data);
    } catch (error) {
      throw new ServerException("Error al actualizar el carrito");
    }
  }

  static async updateOne(cid, pid, quant) {
    try {
      return await CartRepository.updateOne(cid, pid, quant);
    } catch (error) {
      throw new ServerException("Error al actualizar el carrito");
    }
  }

  static async deleteProductByCart(cid, pid) {
    try {
      return await CartRepository.deleteProductByCart(cid, pid);
    } catch (error) {
      throw new ServerException("Error al eliminar producto del carrito");
    }
  }

  static async deleteAll(cid) {
    try {
      return await CartRepository.deleteAll(cid);
    } catch (error) {
      throw new ServerException("Error al eliminar productos del carrito");
    }
  }

  static async purchase(cid) {
    try {
      return await CartRepository.purchase(cid);
    } catch (error) {
      throw new ServerException("Error al procesar la compra");
    }
  }
}
