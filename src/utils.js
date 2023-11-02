import path from 'path';
import {fileURLToPath} from 'url';
import * as fs from "fs";

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

  export class Exception extends Error {
    constructor(message, status) {
      super(message);
      this.statusCode = status;
    }
  };