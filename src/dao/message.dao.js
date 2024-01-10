import MessageModel from '../models/message.model.js';
import { ServerException,NotFoundException } from '../utils/utils.js';

export default class MessageManager {
  
  static async get(query = {}) {
    try {
      return await MessageModel.find(query);
    } catch (error) {
      throw new ServerException('Error al obtener mensajes');
    }
  }

  static async create(data) {
    try {
      const message = await MessageModel.create(data);
      return message;
    } catch (error) {
      throw new ServerException('Error al crear el mensaje');
    }
  }

  static async deleteById(messageId) {
    try {
      const message = await MessageModel.findById(messageId);
      if (!message) {
        throw new NotFoundException('No existe el mensaje ');
      }
      const criteria = { _id: messageId };
      await MessageModel.deleteOne(criteria);
      return { message: 'Mensaje eliminado correctamente ' };
    } catch (error) {
      throw new ServerException('Error al eliminar el mensaje');
    }
  }
}






