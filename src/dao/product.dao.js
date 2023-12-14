import ProductModel from '../models/product.model.js'; // Import your CartModel
import { Exception } from '../utils/utils.js';// Importa tu clase Exception

export default class ProductDAO {
  static async get(query = {}) {
    try {
      return await ProductModel.find(query).lean();
    } catch (error) {
      throw new Exception('Error al obtener productos', 500);
    }
  }

  static async getById(productId) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Exception('No existe el producto ', 404);
      }
      return product;
    } catch (error) {
      throw new Exception('Error al obtener el producto', 500);
    }
  }

  static async create(data) {
    try {
      const product = await ProductModel.create(data);
      console.log('Producto creado correctamente ');
      return product;
    } catch (error) {
      throw new Exception('Error al crear el producto', 500);
    }
  }

  static async updateById(productId, data) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Exception('No existe el producto ', 404);
      }
      const criteria = { _id: productId };
      const operation = { $set: data };
      await ProductModel.updateOne(criteria, operation);
      console.log('Producto actualizado correctamente ');
    } catch (error) {
      throw new Exception('Error al actualizar el producto', 500);
    }
  }

  static async deleteById(productId) {
    try {
      const product = await ProductModel.findById(productId);
      if (!product) {
        throw new Exception('No existe el producto ', 404);
      }
      const criteria = { _id: productId };
      await ProductModel.deleteOne(criteria);
      console.log('Producto eliminado correctamente ');
    } catch (error) {
      throw new Exception('Error al eliminar el producto', 500);
    }
  }
}
