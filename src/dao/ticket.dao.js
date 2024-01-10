import TicketModel  from "../models/ticket.model.js";
import { ServerException } from '../utils/utils.js';

export default class TicketDao {
  static  async createTicket(data) {
    try {
        const ticket = await TicketModel.create(data);
        
        return ticket;
      } catch (error) {
        throw new ServerException ('Error al crear un carrito');
      }
    }
}

