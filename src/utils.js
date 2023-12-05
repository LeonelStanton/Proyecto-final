import path from 'path';
import {fileURLToPath} from 'url';
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import CartModel from './dao/models/cart.model.js';



export const JWT_SECRET = 'qBvPkU2X;J1,51Z!~2p[JW.DT|g:4l@';
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename)

export function getProducts() {
    try {
      if (fs.existsSync("./src/db/productos.json")) {
        const content = fs.readFileSync("./src/db/productos.json", "utf-8");
        return JSON.parse(content);
      } else {
        return [];
      }
    } catch (error) {
      console.error(`Error en getProducts: ${error.message}`);
      throw error;
    }
  }

  export function saveProducts(products) {
    const newArray = JSON.stringify(products, null, 2);
    try {
      fs.writeFileSync("./src/db/productos.json", newArray, "utf-8");
    } catch (writeError) {
      console.error(`Error al escribir en el archivo: ${writeError.message}`);
      throw writeError;
    }
  }

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

export class Exception extends Error {
    constructor(message, status) {
      super(message);
      this.statusCode = status;
    }
  };

  export const tokenGenerator =  (user) => {
    const { _id, first_name, last_name, email,cart } = user;
    

    const payload = {
      id: _id,
      first_name,
      last_name,
      email,
      cart,
    };
    
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '30m' });
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
  }
  
  export const authMiddleware = (strategy) =>  (req, res, next) => {
    passport.authenticate(strategy, function(error, payload, info) {
   
      if (error) {
        return next(error);
      }
      
      if (!payload) {
        return res.status(401).json({ message: info.message ? info.message : info.toString() });
      }
      req.user = payload;
     
      next();
    })(req, res, next);
  };  