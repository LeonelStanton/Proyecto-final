import { Router } from "express";

import UserModel from "../dao/models/user.model.js";

const router = Router();

router.post("/sessions/register", async (req, res) => {
  try {
    const { body } = req;
    const newUser = await UserModel.create(body);
    res.redirect("/login");
  } catch (error) {
    console.error("Error al crear nuevo usuario:", error);
    res
      .status(500)
      .send("Error interno del servidor al registrar un nuevo usuario");
  }
});

router.post("/sessions/login", async (req, res) => {
  try {
    const {
      body: { email, password },
    } = req;
    let sessionInfo;
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      sessionInfo = { email, first_name: "Coderhouse", last_name: "BackEnd", isAdmin: true };
    } else {
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(401).send("Correo o contraseña invalidos 😨.");
      }

      const isPassValid = user.password === password;
      if (!isPassValid) {
        return res.status(401).send("Correo o contraseña invalidos 😨.");
      }
      sessionInfo = {
        email,
        first_name: user.first_name,
        last_name: user.last_name,
        isAdmin: false,
      };
    }
    req.session.user = sessionInfo;
    res.redirect("/api/products");
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).send("Error interno del servidor al iniciar sesión");
  }
});

router.get("/sessions/logout", (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error("Error al cerrar sesión:", error);
      res.status(500).send("Error interno del servidor al cerrar sesión");
    } else {
      res.redirect("/login");
    }
  });
});

export default router;
