import { Router } from "express";
import { v4 as uuidv4 } from "uuid";
import * as fs from "fs";

const router = Router();
const PATH = "./src//db/productos.json";

function getProducts() {
  try {
    if (fs.existsSync(PATH)) {
      const content = fs.readFileSync(PATH, "utf-8");
      return JSON.parse(content);
    } else {
      return [];
    }
  } catch (error) {
    console.error(`Error en getProducts: ${error.message}`);
    throw error;
  }
}
function saveProducts(products) {
  const newArray = JSON.stringify(products, null, 2);
  try {
    fs.writeFileSync(PATH, newArray, "utf-8");
  } catch (writeError) {
    console.error(`Error al escribir en el archivo: ${writeError.message}`);
    throw writeError;
  }
}

router.get("/products", (req, res) => {
  try {
    const { limit } = req.query;
    const products = getProducts();
    if (!limit) {
      res.status(200).json(products);
    } else {
      const limitValue = parseInt(limit);
      if (!isNaN(limitValue)) {
        const productsLimit = products.slice(0, limitValue);
        res.status(200).json(productsLimit);
      } else {
        res
          .status(400)
          .json({
            status: "error",
            message: "'limit' debe ser un número válido",
          });
      }
    }
  } catch (error) {
    console.error("Error al obtener productos:", error);
    res
      .status(500)
      .json({ status: "error", message: "Error interno al obtener productos" });
  }
});

router.get("/products/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const products = getProducts();
    const foundProduct = products.find((product) => product.id === pid);

    if (foundProduct) {
      res.status(200).json(foundProduct);
    } else {
      res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    }
  } catch (error) {
    console.error("Error al buscar el producto:", error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Error interno al buscar el producto",
      });
  }
});

router.post("/products", (req, res) => {
  try {
    const { title, description, code, price, stock, category, thumbnails } =
      req.body;

    if (!title || !description || !code || !price || !stock || !category) {
      return res
        .status(400)
        .json({
          status: "error",
          message:
            "Datos no válidos: asegúrese de proporcionar title, description, code, price, stock y category.",
        });
    }

    const status = req.body.status !== undefined ? req.body.status : true;

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
    const products = getProducts();
    products.push(newProduct);
    saveProducts(products);
    res.status(201).json({ status: "success", message: "Producto creado" });
  } catch (error) {
    console.error("Error en la creación del producto:", error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Se produjo un error interno al crear el producto.",
      });
  }
});

router.put("/products/:pid", (req, res) => {
  const { pid } = req.params;
  const products = getProducts();
  const { title, description, code, price, stock, category, thumbnails } =
    req.body;
  const productIndex = products.findIndex((product) => product.id === pid);
  try {
    if (productIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    }

    const updatedProduct = { ...products[productIndex] };

    if (title !== undefined) {
      updatedProduct.title = title;
    }
    if (description !== undefined) {
      updatedProduct.description = description;
    }
    if (code !== undefined) {
      updatedProduct.code = code;
    }
    if (price !== undefined) {
      updatedProduct.price = price;
    }
    if (stock !== undefined) {
      updatedProduct.stock = stock;
    }
    if (category !== undefined) {
      updatedProduct.category = category;
    }
    if (thumbnails !== undefined) {
      updatedProduct.thumbnails = thumbnails;
    }

    products[productIndex] = updatedProduct;
    saveProducts(products);
    res
      .status(200)
      .json({ status: "success", message: "Producto actualizado" });
  } catch (error) {
    console.error("Error en la actualización del producto:", error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Se produjo un error al actualizar el producto",
      });
  }
});

router.delete("/products/:pid", (req, res) => {
  try {
    const { pid } = req.params;
    const products = getProducts();
    const productIndex = products.findIndex((product) => product.id === pid);

    if (productIndex === -1) {
      return res
        .status(404)
        .json({ status: "error", message: "Producto no encontrado" });
    }
    products.splice(productIndex, 1);
    saveProducts(products);
    res.status(200).json({ status: "success", message: "Producto Eliminado" });
  } catch (error) {
    console.error("Error en la eliminación del producto:", error);
    res
      .status(500)
      .json({
        status: "error",
        message: "Se produjo un error interno al eliminar el producto",
      });
  }
});

export default router;
