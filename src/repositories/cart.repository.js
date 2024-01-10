// cart.repository.js
import CartDAO from "../dao/cart.dao.js";
import UserDAO from "../dao/user.dao.js";
import TicketDAO from "../dao/ticket.dao.js";
import { v4 as uuidv4 } from "uuid";
import { ServerException } from "../utils/utils.js";

export default class CartRepository {
  static async get(query = {}) {
    try {
      return await CartDAO.get(query);
    } catch (error) {
      throw new ServerException("Error al obtener carritos de compras");
    }
  }

  static async getCartById(cid) {
    try {
      return await CartDAO.getCartById(cid);
    } catch (error) {
      throw new ServerException("Error al obtener el carrito");
    }
  }

  static async create() {
    try {
      return await CartDAO.create();
    } catch (error) {
      throw new ServerException("Error al crear un carrito");
    }
  }

  static async updateProductByCart(cid, pid) {
    try {
      return await CartDAO.updateProductByCart(cid, pid);
    } catch (error) {
      throw new ServerException("Error al actualizar el carrito");
    }
  }

  static async updateAll(cid, data) {
    try {
      return await CartDAO.updateAll(cid, data);
    } catch (error) {
      throw new ServerException("Error al actualizar el carrito");
    }
  }

  static async updateOne(cid, pid, quant) {
    try {
      return await CartDAO.updateOne(cid, pid, quant);
    } catch (error) {
      throw new ServerException("Error al actualizar el carrito");
    }
  }

  static async deleteProductByCart(cid, pid) {
    try {
      return await CartDAO.deleteProductByCart(cid, pid);
    } catch (error) {
      throw new ServerException("Error al eliminar producto del carrito");
    }
  }

  static async deleteAll(cid) {
    try {
      return await CartDAO.deleteAll(cid);
    } catch (error) {
      throw new ServerException("Error al eliminar productos del carrito");
    }
  }

  static async purchase(cid) {
    try {
      const user = await UserDAO.findByCart(cid);
      const cart = await CartDAO.getCartById(cid);
      const products = cart.products;
      let availableProducts = [];
      let unavailableProducts = [];
      let totalAmount = 0;

      for (let item of products) {
        if (item.product.stock >= item.quantity) {
          availableProducts.push(item);
          item.product.stock -= item.quantity;
          await item.product.save();
          totalAmount += item.quantity * item.product.price;
        } else {
          unavailableProducts.push(item);
        }
      }

      let ticket = null;
      if (availableProducts.length != 0) {
        const data = {
          code: uuidv4(),
          amount: totalAmount,
          purchaser: user.email,
        };
        ticket = await TicketDAO.createTicket(data);
      }

      if (unavailableProducts.length === 0) {
        return ticket;
      } else {
        cart.products = unavailableProducts;
        await cart.save();
        return unavailableProducts;
      }
    } catch (error) {
      throw new ServerException("Error al procesar la compra");
    }
  }
}
