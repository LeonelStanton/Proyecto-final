import { Router } from "express";
import ProductManager from "../controllers/product.controller.js";
import { authMiddleware } from "../utils/auth.utils.js";

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const products = await ProductManager.get();
    res.status(200).json(products);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.get("/products/:pid", async (req, res) => {
  try {
    const {
      params: { pid },
    } = req;

    const product = await ProductManager.getById(pid);
    res.status(200).json(product);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.post("/products", authMiddleware("jwt", ["admin"]), async (req, res) => {
  try {
    const { body } = req;
    const product = await ProductManager.create(body);
    res.status(201).json({ status: "success", message: "Producto creado" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.put(
  "/products/:pid",
  authMiddleware("jwt", ["admin"]),
  async (req, res) => {
    try {
      const {
        params: { pid },
        body,
      } = req;
      await ProductManager.updateById(pid, body);
      res
        .status(204)
        .json({ status: "success", message: "Producto actualizado" });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
);

router.delete(
  "/products/:pid",
  authMiddleware("jwt", ["admin"]),
  async (req, res) => {
    try {
      const {
        params: { pid },
      } = req;
      await ProductManager.deleteById(pid);
      res
        .status(201)
        .json({ status: "success", message: "Producto Eliminado" });
    } catch (error) {
      res.status(error.statusCode || 500).json({ message: error.message });
    }
  }
);

export default router;
