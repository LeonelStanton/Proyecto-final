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

  static async getCartById(cid) {
    try {
      const cart = await CartModel.findById(cid).populate("products.product");
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
      
      const productIndex = cart.products.findIndex(p => p.product.equals(pid));
      
      if (productIndex !== -1) {
        cart.products[productIndex].quantity++;
      } else {
        cart.products.push({
          product: pid,
          quantity: 1
        });
      }
      
      await cart.save(); 
      return cart; 
    } catch (error) {
      throw new Exception('Error al actualizar el carrito', 500);
    }
  }

  static async updateAll(cid, data) {
    try {
      
     const updatedCart = await CartModel.findByIdAndUpdate({_id: cid},  { $set: data }, { new: true });

      if (!updatedCart) {
        throw new Exception('No existe el carrito', 404);
      }
      return updatedCart;
     
    } catch (error) {
      throw new Exception('Error al actualizar el carrito', 500);
    }
  }


  static async updateOne(cid,pid, quant) {
    try {
      const cart = await CartModel.findById(cid)
      if (!cart) {
        throw new Exception("No existe el carrito ", 404);
      }
        const productIndex = cart.products.findIndex(p => p.product.equals(pid));
  console.log(productIndex);
        if (productIndex === -1) {
          throw new Exception("No existe el producto ", 404);
        }        
        else{
          console.log(quant);
          cart.products[productIndex].quantity = quant.quantity
         
        }
        await cart.save()
        return cart
     
    } catch (error) {
      throw new Exception('Error al actualizar el carrito', 500);
    }
  }


  static async deleteProductByCart(cid, pid) {
    try {
      const cart = await CartModel.findById(cid);
      if (!cart) {
        throw new Exception('No existe el carrito ', 404);
      }
      
    
      cart.products.pull({ product: pid });
  
      await cart.save(); 
      return cart; 
    } catch (error) {
      throw new Exception('Error al eliminar producto del carrito', 500);
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
        throw new Exception('No existe el carrito', 404);
      }
  
      return updatedCart;
    } catch (error) {
      throw new Exception('Error al eliminar productos del carrito', 500);
    }
  }
  
}