import { Router } from "express";
import passport from "passport";
import { authMiddleware } from "../utils/auth.utils.js";
import CartManager from "../controllers/cart.controller.js";

const router = Router();

router.get(
  "/carts",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    res.status(200).json(req.user);
  }
);

router.get("/carts/:cid", async (req, res) => {
  try {
    const {
      params: { cid },
    } = req;

    const cart = await CartManager.getCartById(cid);
    const array = cart.products.map((doc) => doc.toObject());
    res.status(200).render("cart", { products: array });
    //res.status(200).json(cart);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.post("/carts", async (req, res) => {
  try {
    const cart = await CartManager.create();
    res.status(201).json(cart);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.post(
  "/carts/:cid/products/:pid",
  authMiddleware("jwt", ["user"]),
  async (req, res) => {
    try {
      const { cid, pid } = req.params;
      await CartManager.updateProductByCart(cid, pid);
      res.status(200).json({
        status: "success",
        message: "El carrito fue actualizado correctamente",
      });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
);

router.put("/carts/:cid", async (req, res) => {
  try {
    const {
      params: { cid },
      body,
    } = req;

    await CartManager.updateAll(cid, body);
    res.status(200).json({ status: "success", message: "Carrito actualizado" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.put("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const {
      params: { cid, pid },
      body,
    } = req;

    await CartManager.updateOne(cid, pid, body);
    res.status(200).json({ status: "success", message: "Carrito actualizado" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.delete("/carts/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    await CartManager.deleteProductByCart(cid, pid);
    res.status(200).json({
      status: "success",
      message: "El producto fue eliminado correctamente",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.delete("/carts/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    await CartManager.deleteAll(cid);
    res.status(200).json({
      status: "success",
      message: "Los productos fueron eliminados correctamente",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.get(
  "/carts/:cid/purchase",
  authMiddleware("jwt", ["user"]),
  async (req, res) => {
    try {
      const {
        params: { cid },
      } = req;
      const ticket = await CartManager.purchase(cid);

      res.status(200).json(ticket);
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
);

export default router;
