import { Router } from "express";
import ProductManager from "../controllers/product.controller.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { generateProduct } from "../utils/utils.js";


const router = Router();

router.get('/mockingproducts', (req, res, next) => {
  try {
    const products = [];
    for (let index = 0; index < 50; index++) {
      products.push(generateProduct());
    }
    req.logger.info('Generación exitosa de productos ficticios');
    res.status(200).json(products);
  } catch (error) {
    req.logger.error(`Error al generar productos ficticios: ${error.message}`);
    next(error);
  }
});

router.get("/products", async (req, res, next) => {
  try {
    const products = await ProductManager.get();
    req.logger.info('Obtención exitosa de todos los productos');
    res.status(200).json(products);
  } catch (error) {
    req.logger.error(`Error al obtener todos los productos: ${error.message}`);
    next(error);
  }
});

router.get("/products/:pid", async (req, res, next) => {
  try {
    const {
      params: { pid },
    } = req;

    const product = await ProductManager.getById(pid);
    req.logger.info(`Obtención exitosa del producto con ID ${pid}`);
    res.status(200).json(product);
  } catch (error) {
    req.logger.error(`Error al obtener el producto: ${error.message}`);
    next(error);
  }
});

router.post("/products", authMiddleware("jwt", ["admin"]), async (req, res, next) => {
  try {
    const { body } = req;
    const product = await ProductManager.create(body);
    req.logger.info('Creación exitosa de un nuevo producto');
    res.status(201).json({ status: "success", message: "Producto creado" });
  } catch (error) {
    req.logger.error(`Error al crear un nuevo producto: ${error.message}`);
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
      req.logger.info(`Actualización exitosa del producto con ID ${pid}`);
      res
        .status(204)
        .json({ status: "success", message: "Producto actualizado" });
    } catch (error) {
      req.logger.error(`Error al actualizar el producto: ${error.message}`);
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
      req.logger.info(`Eliminación exitosa del producto con ID ${pid}`);
      res
        .status(201)
        .json({ status: "success", message: "Producto Eliminado" });
    } catch (error) {
      req.logger.error(`Error al eliminar el producto: ${error.message}`);
      next(error);
    }
  }
);

export default router;
