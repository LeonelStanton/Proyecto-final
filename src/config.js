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
  port: process.env.PORT,
  env: process.env.ENV,
  db: {
    mongodbUri: process.env.MONGO_URL,
  },
  jwtSecret: process.env.JWT_SECRET,
  cookieSecret: process.env.COOKIE_SECRET,
}