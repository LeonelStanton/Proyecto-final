import dotenv from 'dotenv';
import {Command} from 'commander';
import path from 'path';
import { getDirname } from './utils/utils.js';

const __dirname = getDirname(import.meta.url);

const program = new Command();

program.parse();


let pathEnvFile = null;
if (process.env.NODE_ENV !== 'production') {
  pathEnvFile = path.join(__dirname, '.env.dev');
} else {
  pathEnvFile = path.join(__dirname, '.env.prod');
}
dotenv.config({ path: pathEnvFile });

export default {
  port: process.env.PORT || 8080,
  env: process.env.ENV,
  db: {
    mongodbUri: process.env.MONGO_URL,
  },
  jwtLifeTime: process.env.JWT_LIFETIME,
  jwtSecret: process.env.JWT_SECRET,
  cookieLifeTime: process.env.COOKIE_LIFETIME,
  cookieSecret: process.env.COOKIE_SECRET,
  userEmail: process.env.GMAIL_USER,
  userPass: process.env.GMAIL_PASS,
}