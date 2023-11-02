import CartModel from './models/cart.model.js';
import { Exception } from '../utils.js';

export default class CartManager {
  
  static async get(query = {}) {
    try {
      return await CartModel.find(query);
    } catch (error) {
      throw new Exception('Error al obtener carritos de compras', 500); 
    }
  }

  static async getById(cid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new Exception('No existe el carrito ', 404);
      }
      return cart;
    } catch (error) {
      throw new Exception('Error al obtener el carrito', 500); 
    }
  }

  static async create() {
    try {
      const cart = await CartModel.create({ products: [] });
      console.log('Carrito creado correctamente ');
      return cart;
    } catch (error) {
      throw new Exception('Error al crear un carrito', 500); 
    }
  }
  static async updateProductByCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new Exception('No existe el carrito ', 404);
      }
      
      const productIndex = cart.products.findIndex(product => product.pid == pid);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({
          pid: pid,
          quantity: 1
        });
      }
  
      await cart.save(); 
      return cart; 
    } catch (error) {
      throw new Exception('Error al actualizar el carrito', 500);
    }
  }
  
}