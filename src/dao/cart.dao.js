// cart.repository.js
import CartModel from '../models/cart.model.js';
import {
  
  NotFoundException,
  ServerException,
} from '../utils/utils.js';

export default class CartDAO {
  static async get(query = {}) {
    try {
      return await CartModel.find(query);
    } catch (error) {
      throw new ServerException('Error al obtener carritos de compras');
    }
  }

  static async getCartById(cid) {
    try {
      const cart = await CartModel.findById(cid).populate('products.product');
      if (!cart) {
        throw new NotFoundException('No existe el carrito');
      }
      return cart;
    } catch (error) {
      throw new ServerException('Error al obtener el carrito');
    }
  }

  static async create() {
    try {
      const cart = await CartModel.create({ products: [] });
      console.log('Carrito creado correctamente ');
      return cart;
    } catch (error) {
      throw new ServerException('Error al crear un carrito');
    }
  }

  static async updateProductByCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new NotFoundException('No existe el carrito');
      }

      const productIndex = cart.products.findIndex((p) => p.product.equals(pid));

      if (productIndex !== -1) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({
          product: pid,
          quantity: 1,
        });
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new ServerException('Error al actualizar el carrito');
    }
  }

  static async updateAll(cid, data) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        { _id: cid },
        { $set: data },
        { new: true }
      );

      if (!updatedCart) {
        throw new NotFoundException('No existe el carrito');
      }
      return updatedCart;
    } catch (error) {
      throw new ServerException('Error al actualizar el carrito');
    }
  }

  static async updateOne(cid, pid, quant) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new NotFoundException('No existe el carrito');
      }

      const productIndex = cart.products.findIndex((p) => p.product.equals(pid));

      if (productIndex === -1) {
        throw new NotFoundException('No existe el producto');
      } else {
        cart.products[productIndex].quantity = quant.quantity;
      }

      await cart.save();
      return cart;
    } catch (error) {
      throw new ServerException('Error al actualizar el carrito');
    }
  }

  static async deleteProductByCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new NotFoundException('No existe el carrito');
      }

      cart.products.pull({ product: pid });

      await cart.save();
      return cart;
    } catch (error) {
      throw new ServerException('Error al eliminar producto del carrito');
    }
  }

  static async deleteAll(cid) {
    try {
      const updatedCart = await CartModel.findByIdAndUpdate(
        cid,
        {
          $set: { products: [] },
        },
        { new: true }
      );

      if (!updatedCart) {
        throw new NotFoundException('No existe el carrito');
      }

      return updatedCart;
    } catch (error) {
      throw new ServerException('Error al eliminar productos del carrito');
    }
  }
}
