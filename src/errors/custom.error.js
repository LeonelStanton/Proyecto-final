export class CustomError {
  static createError({ name = 'Error', cause, message, code = 1 }) {
    const error = new Error(message);
    error.name = name;
    error.cause = cause;
    error.code = code;
    throw error;
  }
} 

/* export class CustomError {
  static createError(code, cause) {
    const error = new Error(cause ? cause.message : 'Unknown Error');
    error.code = code;
    error.cause = cause;
    return error;
  }
} */