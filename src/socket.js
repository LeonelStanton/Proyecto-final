import { Server } from "socket.io";
import { getProducts, saveProducts } from "./utils.js";
import { v4 as uuidv4 } from "uuid";
let io;

export const init = (httpServer) => {
  io = new Server(httpServer);

  io.on("connection", (socketClient) => {
    console.log(`Se ha conectado un nuevo cliente (${socketClient.id})`);

    const products = getProducts();
    socketClient.emit("actual-products", { products });
    socketClient.on("add-product", (product) => {
      const {
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails,
        status,
      } = product;
      const newProduct = {
        id: uuidv4(),
        title,
        description,
        code,
        price: parseFloat(price),
        stock: parseInt(stock),
        category,
        status,
      };

      if (thumbnails) {
        newProduct.thumbnails = thumbnails;
      }
      products.push(newProduct);
      saveProducts(products);
      res.status(201).json({ status: "success", message: "Producto creado" });
      io.emit("actual-products", { products });
    });
    socketClient.on("delete-product",(id)=>{
    const productIndex = products.findIndex((product) => product.id === id);

    if (productIndex === -1) {
      return res.status(404).json({ status: "error", message: "Producto no encontrado" });
    }
    products.splice(productIndex, 1);
    saveProducts(products);
    res.status(200).json({ status: "success", message: "Producto Eliminado" });
    io.emit("actual-products", { products });
    })
  });
  console.log("Server socket running 🚀");
};

export const emitFromApi = (event, data) => io.emit(event, data);
export const onFromApi = (event, data) => io.on(event, data);
