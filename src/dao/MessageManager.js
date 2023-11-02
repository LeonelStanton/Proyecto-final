import MessageModel from './models/message.model.js';
import { Exception } from '../utils.js';

export default class MessageManager {
  
  static async get(query = {}) {
    try {
      return await MessageModel.find(query);
    } catch (error) {
      throw new Exception('Error al obtener mensajes', 500);
    }
  }

  static async create(data) {
    try {
      const message = await MessageModel.create(data);
      return message;
    } catch (error) {
      throw new Exception('Error al crear el mensaje', 500);
    }
  }

  static async deleteById(messageId) {
    try {
      const message = await MessageModel.findById(messageId);
      if (!message) {
        throw new Exception('No existe el mensaje ', 404);
      }
      const criteria = { _id: messageId };
      await MessageModel.deleteOne(criteria);
      return { message: 'Mensaje eliminado correctamente ' };
    } catch (error) {
      throw new Exception('Error al eliminar el mensaje', 500);
    }
  }
}






