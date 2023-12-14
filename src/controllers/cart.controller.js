import CartDAO from '../dao/cart.dao.js'; 
import { Exception } from '../utils/utils.js'; 

export default class CartController {
  static async get(query = {}) {
    try {
      return await CartDAO.get(query);
    } catch (error) {
      throw new Exception('Error al obtener carritos de compras', 500);
    }
  }

  static async getCartById(cid) {
    try {
      return await CartDAO.getCartById(cid);
    } catch (error) {
      throw new Exception('Error al obtener el carrito', 500);
    }
  }

  static async create() {
    try {
      return await CartDAO.create();
    } catch (error) {
      throw new Exception('Error al crear un carrito', 500);
    }
  }

  static async updateProductByCart(cid, pid) {
    try {
      return await CartDAO.updateProductByCart(cid, pid);
    } catch (error) {
      throw new Exception('Error al actualizar el carrito', 500);
    }
  }

  static async updateAll(cid, data) {
    try {
      return await CartDAO.updateAll(cid, data);
    } catch (error) {
      throw new Exception('Error al actualizar el carrito', 500);
    }
  }

  static async updateOne(cid, pid, quant) {
    try {
      return await CartDAO.updateOne(cid, pid, quant);
    } catch (error) {
      throw new Exception('Error al actualizar el carrito', 500);
    }
  }

  static async deleteProductByCart(cid, pid) {
    try {
      return await CartDAO.deleteProductByCart(cid, pid);
    } catch (error) {
      throw new Exception('Error al eliminar producto del carrito', 500);
    }
  }

  static async deleteAll(cid) {
    try {
      return await CartDAO.deleteAll(cid);
    } catch (error) {
      throw new Exception('Error al eliminar productos del carrito', 500);
    }
  }
}
