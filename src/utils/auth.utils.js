import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import config from "../config.js";

const JWT_SECRET = config.jwtSecret;

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) =>
  bcrypt.compareSync(password, user.password);

export const tokenGenerator = (user) => {
  const { _id, first_name, last_name, email, role } = user;

  const payload = {
    id: _id,
    first_name,
    last_name,
    email,
    role,
  };

  return jwt.sign(payload, JWT_SECRET, { expiresIn: config.jwtLifeTime });
};

export const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, JWT_SECRET, (error, payload) => {
      if (error) {
        return reject(error);
      }
      resolve(payload);
    });
  });
};

export const authMiddleware = (strategy, roles) => (req, res, next) => {
  passport.authenticate(strategy, function (error, payload, info) {
    if (error) {
      return next(error);
    }

    if (!payload) {
      return res
        .status(401)
        .json({ message: info.message ? info.message : info.toString() });
    }
    if (roles && !roles.includes(payload.role)) {
      // El usuario no tiene el rol necesario para acceder al recurso
      return res.status(403).json({ message: "Acceso no autorizado." });
    }
    req.user = payload;

    next();
  })(req, res, next);
};
