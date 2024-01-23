import mongoose from 'mongoose';
import config from '../config.js';
import { loggerDev, loggerProd } from '../config/logger.config.js';

export const initDB = async () => {
  try {
    const URI = config.db.mongodbUri;
    await mongoose.connect(URI);
    const logger = getLogger();
  logger.info('Database conected 🚀');
  } catch (error) {
    logger.error('Ah ocurrido un error al intentar conectarnos a la DB', error.message);
  }
}

function getLogger() {
  return config.env === 'dev' ? loggerDev : loggerProd;
}