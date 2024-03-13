import { Router } from "express";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import CartManager from "../controllers/cart.controller.js";

const router = Router();

router.get("/carts", async (req, res, next) => {
  try {
    const carts = await CartManager.get();
    req.logger.info('Obtención exitosa de todos los carritos');
    res.status(200).json(carts);
  } catch (error) {
    req.logger.error(`Error al obtener todos los carritos: ${error.message}`);
    next(error);
  }
});

router.get("/carts/:cid", async (req, res, next) => {
  try {
    const {
      params: { cid },
    } = req;

    const cart = await CartManager.getCartById(cid);
    
    const array = cart.products.map((doc) => doc.toObject());
    req.logger.info(`Obtención exitosa del carrito con ID ${cid}`);
    res.status(200).render("cart", { products: array, cid });
  } catch (error) {
    req.logger.error(`Error al obtener el carrito: ${error.message}`);
    next(error);
  }
});

router.post("/carts", async (req, res, next) => {
  try {
    const cart = await CartManager.create();
    req.logger.info('Creación exitosa de un nuevo carrito');
    res.status(201).json(cart);
  } catch (error) {
    req.logger.error(`Error al crear un nuevo carrito: ${error.message}`);
    next(error);
  }
});

router.post(
  "/carts/:cid/products/:pid",
  authMiddleware("jwt", ["user","premium"]),
  async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      await CartManager.updateProductByCart(cid, pid);
      req.logger.info(`Actualización exitosa del producto ${pid} en el carrito ${cid}`);
      res.status(200).json({
        status: "success",
        message: "El carrito fue actualizado correctamente",
      });
    } catch (error) {
      req.logger.error(`Error al actualizar el producto en el carrito: ${error.message}`);
      next(error);
    }
  }
);

router.put("/carts/:cid", async (req, res, next) => {
  try {
    const {
      params: { cid },
      body,
    } = req;

    await CartManager.updateAll(cid, body);
    req.logger.info(`Actualización exitosa de todos los productos en el carrito ${cid}`);
    res.status(200).json({ status: "success", message: "Carrito actualizado" });
  } catch (error) {
    req.logger.error(`Error al actualizar todos los productos en el carrito: ${error.message}`);
    next(error);
  }
});

router.put("/carts/:cid/products/:pid",authMiddleware("jwt", ["user","premium"]), async (req, res, next) => {
  try {
    const {
      params: { cid, pid },
      body,
    } = req;

    await CartManager.updateOne(cid, pid, body);
    req.logger.info(`Actualización exitosa del producto ${pid} en el carrito ${cid}`);
    res.status(200).json({ status: "success", message: "Carrito actualizado" });
  } catch (error) {
    req.logger.error(`Error al actualizar el producto en el carrito: ${error.message}`);
    next(error);
  }
});

router.delete("/carts/:cid/products/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    await CartManager.deleteProductByCart(cid, pid);
    req.logger.info(`Eliminación exitosa del producto ${pid} en el carrito ${cid}`);
    res.status(200).json({
      status: "success",
      message: "El producto fue eliminado correctamente",
    });
  } catch (error) {
    req.logger.error(`Error al eliminar el producto en el carrito: ${error.message}`);
    next(error);
  }
});

router.delete("/carts/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    await CartManager.deleteAll(cid);
    req.logger.info(`Eliminación exitosa de todos los productos en el carrito ${cid}`);
    res.status(200).json({
      status: "success",
      message: "Los productos fueron eliminados correctamente",
    });
  } catch (error) {
    req.logger.error(`Error al eliminar todos los productos en el carrito: ${error.message}`);
    next(error);
  }
});

router.get(
  "/carts/:cid/purchase",
  authMiddleware("jwt", ["user","premium"]),
  async (req, res, next) => {
    try {
      const {
        params: { cid },
      } = req;
      const ticket = await CartManager.purchase(cid);
      req.logger.info(`Compra exitosa del carrito ${cid}`);
     // res.status(200).json(ticket);
    // console.log(ticket)
     const formattedTicket = {
      amount: ticket.amount,
      purchaser: ticket.purchaser,
      code: ticket.code,
      createdAt: ticket.createdAt.toISOString(), // Formatear fecha
       // Convertir ObjectId a cadena
    };

    res.status(200).render("ticket", { ticket: formattedTicket});
    } catch (error) {
      req.logger.error(`Error al realizar la compra del carrito: ${error.message}`);
      next(error);
    }
  }
);


export default router;
