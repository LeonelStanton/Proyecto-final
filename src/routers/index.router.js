import { Router } from "express";
import ProductManager from "../dao/ProductManager.js";

const router = Router();

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






router.get('/login', (req, res) => {
  res.render('login', { title: 'Login' });
});

router.get('/register', (req, res) => {
  res.render('register', { title: 'Register' });
});


export default router;
