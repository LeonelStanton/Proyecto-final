import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

const router = Router();
const PATH = "./src//db/carrito.json";

function getCarts() {
  try {
    if (fs.existsSync(PATH)) {
      const content = fs.readFileSync(PATH, "utf-8");
      return JSON.parse(content);
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error en getCarts: ${error.message}`);
    throw error;
  }
}
function saveCarts(carts) {
  const newArray = JSON.stringify(carts, null, 2);
  try {
    fs.writeFileSync(PATH, newArray, "utf-8");
  } catch (writeError) {
    console.error(`Error al escribir en el archivo: ${writeError.message}`);
    throw writeError;
  }
}

router.get("/carts/:cid", (req, res) => {
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
});

router.post("/carts", (req, res) => {
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
});

router.post("/carts/:cid/product/:pid", (req, res) => {
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
});

export default router;
