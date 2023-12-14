
import passport from 'passport';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from '../config.js';

const JWT_SECRET = config.jwtSecret;

export const createHash = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (password, user) => bcrypt.compareSync(password, user.password);

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