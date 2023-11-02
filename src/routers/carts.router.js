import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";
import CartManager from '../dao/CartManager.js';

const router = Router();

router.get("/carts/:cid", async (req, res) => {

  try {
    const { params: { cid } } = req;

    const cart = await CartManager.getById(cid);
    res.status(200).json(cart.products);
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }

  /*
  try {
    const { cid } = req.params;
    const carts = getCarts();
    const foundCart = carts.find((cart) => cart.id === cid);

    if (foundCart) {
      res.status(200).json(foundCart.products);
    } else {
      res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });
    }
  } catch (error) {
    console.error("Error al buscar el carrito:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error interno al buscar el carrito" });
  }
  */
});

router.post("/carts",async (req, res) => {
  try {
    const cart = await CartManager.create();
    res.status(201).json({ status: "success", message: "Carrito creado" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
  /*
  try {
    const carts = getCarts();
    const newCart = {
      id: uuidv4(),
      products: [],
    };
    carts.push(newCart);
    saveCarts(carts);
    res.status(201).json({ status: "success", message: "Carrito creado" });
  } catch {
    console.error("Error en la creación del carrito:", error);
    res.status(500).json({
      status: "error",
      message: "Se produjo un error interno al crear el carrito.",
    });
  }
  */
});

router.post("/carts/:cid/product/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const response = await CartManager.updateProductByCart(cid, pid);
    res.status(200).json({ status: "success", message: "El carrito fue actualizado correctamente" });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
  /*
  try {
    const { cid, pid } = req.params;
    const carts = getCarts();
    const cartIndex = carts.findIndex((cart) => cart.id === cid);

    if (cartIndex === -1) {
      res
        .status(404)
        .json({ status: "error", message: "Carrito no encontrado" });
      return;
    }

    const productFound = carts[cartIndex].products.find((p) => p.product === pid);

    if (productFound) {
      productFound.quantity++;
    } else {
      const productNew = {
        product: pid,
        quantity: 1,
      };
      carts[cartIndex].products.push(productNew);
    }

    saveCarts(carts);
    res.status(201).json({ status: "success", message: "El carrito fue actualizado correctamente" });
  } catch (error) {
    console.error("Error en la operación:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error interno en el servidor" });
  }
  */
});

export default router;
