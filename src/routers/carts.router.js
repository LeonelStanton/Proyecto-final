import { Router } from "express";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import CartManager from "../controllers/cart.controller.js";

const router = Router();

router.get("/carts", async (req, res, next) => {
  try {
    const carts = await CartManager.get();
    res.status(200).json(carts);
  } catch (error) {
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
    res.status(200).render("cart", { products: array });
    //res.status(200).json(cart);
  } catch (error) {
    next(error);
  }
});

router.post("/carts", async (req, res, next) => {
  try {
    const cart = await CartManager.create();
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
});

router.post(
  "/carts/:cid/products/:pid",
  authMiddleware("jwt", ["user"]),
  async (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      await CartManager.updateProductByCart(cid, pid);
      res.status(200).json({
        status: "success",
        message: "El carrito fue actualizado correctamente",
      });
    } catch (error) {
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
    res.status(200).json({ status: "success", message: "Carrito actualizado" });
  } catch (error) {
    next(error);
  }
});

router.put("/carts/:cid/products/:pid", async (req, res, next) => {
  try {
    const {
      params: { cid, pid },
      body,
    } = req;

    await CartManager.updateOne(cid, pid, body);
    res.status(200).json({ status: "success", message: "Carrito actualizado" });
  } catch (error) {
    next(error);
  }
});

router.delete("/carts/:cid/products/:pid", async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    await CartManager.deleteProductByCart(cid, pid);
    res.status(200).json({
      status: "success",
      message: "El producto fue eliminado correctamente",
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/carts/:cid", async (req, res, next) => {
  try {
    const { cid } = req.params;
    await CartManager.deleteAll(cid);
    res.status(200).json({
      status: "success",
      message: "Los productos fueron eliminados correctamente",
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/carts/:cid/purchase",
  authMiddleware("jwt", ["user"]),
  async (req, res, next) => {
    try {
      const {
        params: { cid },
      } = req;
      const ticket = await CartManager.purchase(cid);

      res.status(200).json(ticket);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
