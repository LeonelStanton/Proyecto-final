import EnumsError from "../errors/enums.error.js";
import { CustomError } from "../errors/custom.error.js";

 export default (error, req, res, next) => {
 
  console.error(error.cause);
  
  switch (error.code) {
    case EnumsError.BAD_REQUEST_ERROR:
    case EnumsError.INVALID_PARAMS_ERROR:
    case EnumsError.USER_ALREADY_EXISTS:
    case EnumsError.INVALID_CREDENTIALS:   
    case EnumsError.PRODUCT_NOT_FOUND:   
    case EnumsError.CART_NOT_FOUND:   
    case EnumsError.USER_NOT_FOUND:    
    case EnumsError.PRODUCT_INCART_NF:
      res.status(400).json({ status: 'error', message: error.message });
      break;
    case 'CastError':
        res.status(400).json({ status: 'error', message: 'Formato de ID incorrecto' });
        break;
    case EnumsError.DATA_BASE_ERROR:
    case EnumsError.ROUTING_ERROR:
      res.status(500).json({ status: 'error', message: error.message });
      break;
    default:
      res.status(500).json({ status: 'error', message: 'Error desconocido' });
      break;
  }
  
}


/* export default (err, req, res, next) => {
  if (err instanceof CustomError) {
    res.status(400).json({ error: err.message, code: err.code });
  } else {
    res.status(500).json({ error: 'Internal Server Error', code: 500 });
  }
}; */
