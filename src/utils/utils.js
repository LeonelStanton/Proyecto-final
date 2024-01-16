import path from 'path';
import {fileURLToPath} from 'url';
import { faker } from '@faker-js/faker';


export const getDirname = (importMetaUrl) => {
    const __filename = fileURLToPath(importMetaUrl);
    return path.dirname(__filename);
  };

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

  
export const generateProduct = () => {
  return {
    id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.lorem.paragraph(),
    code: faker.string.alphanumeric({ length: 10 }),
    price: faker.commerce.price(),
    department: faker.commerce.department(),
    stock: faker.number.int({ min: 10000, max: 99999 }),
    image: faker.image.url(),
  };
};

export class Exception extends Error {
    constructor(message, status) {
      super(message);
      this.statusCode = status;
    }
  };

 
  export class NotFoundException extends Exception {
    constructor(message) {
      super(message, 404);
    }
  }
  
  export class BadRequestException extends Exception {
    constructor(message) {
      super(message, 400);
    }
  }
  
  export class UnauthorizedException extends Exception {
    constructor(message) {
      super(message, 401);
    }
  }
  
  export class ForbiddenException extends Exception {
    constructor(message) {
      super(message, 403);
    }
    
  }

  export class ServerException extends Exception {
    constructor(message) {
      super(message, 500);
    }
  }