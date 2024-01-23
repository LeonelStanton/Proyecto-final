import { Server } from "socket.io";
import MessageManager from "./dao/message.dao.js";
import ProductManager from "./controllers/product.controller.js";
import { loggerDev, loggerProd } from './config/logger.config.js';
import config from './config.js';
let io;
const logger = getLogger();
export const init = (httpServer) => {
  io = new Server(httpServer);
 
 
  io.on("connection", async (socketClient) => {
    logger.info(`Se ha conectado un nuevo cliente (${socketClient.id})`);

    try {
      const messages = await MessageManager.get();

      socketClient.emit("notification", { messages });
    } catch (error) {
      console.error("Error al obtener mensajes:", error);
    }

    socketClient.broadcast.emit("new-client");

    socketClient.on("new-message", async (data) => {
      await MessageManager.create(data);
      const messages = await MessageManager.get();
      io.emit("notification", { messages });
    });

    const products = await ProductManager.get();
    socketClient.emit("actual-products", { products });
    socketClient.on("add-product", async (data) => {
      await ProductManager.create(data);
      const products = await ProductManager.get();
      io.emit("actual-products", { products });
    });
    socketClient.on("delete-product", async (id) => {
      await ProductManager.deleteById(id);
      const products = await ProductManager.get();

      io.emit("actual-products", { products });
    });
  });
  logger.info("Server socket running 🚀");
};


function getLogger() {
  return config.env === 'dev' ? loggerDev : loggerProd;
}