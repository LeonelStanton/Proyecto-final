export const generatorUserError = (user) => {
    return `Todos lo campos son requerios y deben ser validos 😱.
    Lista de campos recibidos en la solicitud:
      - first_name  : ${user.first_name}
      - last_name   : ${user.last_name}
      - email       : ${user.email}
      - age         : ${user.age}
      - password    : ${user.password}
      `;
  };

  export const generatorEmailError = (user) => {
    return `El usuario ya esta registrado 😱.
    Email recibido:
      - email       : ${user.email}
      
      `;
  };
  
  export const generatorLoginError = () => {
    return `Faltan datos 😱.
      `;
  };
  export const generatorLogin2Error = () => {
    return `Datos invalidos 😱.
      `;
  };
  export const generatorCurrentError = () => {
    return `Se debe enviar un usuario valido 😱.
     `;
   } 

   export const generatorUsersError = () => {
    return `Se deben enviar usuarios validos 😱.
     `;
   } 
   
  export const generatorUserIdError = (id) => {
   return `Se debe enviar un identificador valido 😱.
    Valor recibido: ${id}`;
  } 

  export const generatorProductError = (product) =>{
    return `Todos lo campos son requerios y deben ser validos 😱.
    Lista de campos recibidos en la solicitud:
      - title : ${product.title}
      - description   : ${product.description}
      - price      : ${product.price}
      - code        : ${product.code}
      - stock   : ${product.stock}
      - category: ${product.category}
      
      `;
  }
  export const generatorProductIdError = () => {
    return `Se debe enviar un producto valido 😱.
     `;
   } 

   export const generatorCartError = () => {
    return `Se debe enviar un carrito valido 😱.
     `;
   } 

   export const generatorProductinCartError = () => {
    return `Se debe enviar un producto valido 😱.
     `;
   } 
   export const generatorFormatError = () => {
    return `Se debe enviar una id en un formato válido de Mongoose  😱.
     `;
   } 