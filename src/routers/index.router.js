import { Router } from "express";
import ProductManager from "../controllers/product.controller.js";
import ProductModel from "../models/product.model.js";
import { authMiddleware } from '../middlewares/auth.middleware.js';

const router = Router();

router.get("/products", async (req, res) => {
  try {
    const { page = 1, limit = 10, category, stock, sort } = req.query;
    const opts = { page, limit };
    const criteria = {};
    if (sort) {
      opts.sort = { price: sort };
    }
    if (category) {
      criteria.category = category;
    } else if (stock) {
      criteria.stock = stock;
    }

    const result = await ProductModel.paginate(criteria, opts);

    res.render("products", {
      category,
      limit,
      stock,
      sort,
      ...buildResponse({ ...result, category, stock, sort }),
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

const buildResponse = (data) => {
  return {
    status: "success",
    payload: data.docs.map((student) => student.toJSON()),
    totalPages: data.totalPages,
    prevPage: data.prevPage,
    nextPage: data.nextPage,
    page: data.page,
    hasPrevPage: data.hasPrevPage,
    hasNextPage: data.hasNextPage,
    prevLink: data.hasPrevPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.prevPage
        }${data.category ? `&category=${data.category}` : ""}${
          data.stock ? `&stock=${data.stock}` : ""
        }${data.sort ? `&sort=${data.sort}` : ""}`
      : "",
    nextLink: data.hasNextPage
      ? `http://localhost:8080/products?limit=${data.limit}&page=${
          data.nextPage
        }${data.category ? `&category=${data.category}` : ""}${
          data.stock ? `&stock=${data.stock}` : ""
        }${data.sort ? `&sort=${data.sort}` : ""}`
      : "",
  };
};

router.get("/", async (req, res) => {
  try {
    const products = await ProductManager.get();
    res.status(200).render("index", { products });
  } catch (error) {
    res.status(error.statusCode || 500).json({ message: error.message });
  }
});

router.get("/realtimeproducts", (req, res) => {
  res.status(200).render("realTimeProducts");
});

router.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

router.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

router.get("/chat", authMiddleware("jwt", ["user"]), (req, res) => {
  res.render("chat");
});

export default router;
