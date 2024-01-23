import config from '../config.js';
import { loggerDev, loggerProd } from '../config/logger.config.js';


export const addLogger = (req, res, next) => {
    req.logger = config.env === 'dev' ? loggerDev : loggerProd;
    next();
  }