import { Router } from "express";
import ProductManager from "../controllers/product.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { generateProduct } from "../utils/utils.js";


const router = Router();

router.get('/mockingproducts', (req, res, next) => {
 try{
  const products = [];
  for (let index = 0; index < 50; index++) {
    products.push(generateProduct());
  }
  res.status(200).json(products);
} catch (error) {
  next(error); 
}
});

router.get("/products", async (req, res, next) => {
  try {
    const products = await ProductManager.get();
    res.status(200).json(products);
  } catch (error) {
    next(error); // Pasa el error al siguiente middleware de manejo de errores
  }
});

router.get("/products/:pid", async (req, res, next) => {
  try {
    const {
      params: { pid },
    } = req;

    const product = await ProductManager.getById(pid);
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

router.post("/products", authMiddleware("jwt", ["admin"]), async (req, res, next) => {
  try {
    const { body } = req;
    const product = await ProductManager.create(body);
    res.status(201).json({ status: "success", message: "Producto creado" });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/products/:pid",
  authMiddleware("jwt", ["admin"]),
  async (req, res, next) => {
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
      next(error);
    }
  }
);

router.delete(
  "/products/:pid",
  authMiddleware("jwt", ["admin"]),
  async (req, res, next) => {
    try {
      const {
        params: { pid },
      } = req;
      await ProductManager.deleteById(pid);
      res
        .status(201)
        .json({ status: "success", message: "Producto Eliminado" });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
