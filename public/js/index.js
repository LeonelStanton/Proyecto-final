(function () {
  const socket = io();
  const renderProducts = document.getElementById("renderProducts");
  const form = document.getElementById("form-add");
  const inputTitle = document.getElementById("title");
  const inputDescription = document.getElementById("description");
  const inputStatus = document.getElementById("status");
  const inputPrice = document.getElementById("price");
  const inputCode = document.getElementById("code");
  const inputStock = document.getElementById("stock");
  const inputCategory = document.getElementById("category");
  const formDelete = document.getElementById("form-delete");
const inputId = document.getElementById("idToDelete");
  

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = inputTitle.value;
    const description = inputDescription.value;
    const status = inputStatus.value;
    const price = inputPrice.value;
    const code = inputCode.value;
    const stock = inputStock.value;
    const category = inputCategory.value;
    socket.emit('add-product', {
      title,
      description,
      status,
      price,
      code,
      stock,
      category,
    });
    console.log("Nuevo producto enviado", {
      title,
      description,
      status,
      price,
      code,
      stock,
      category,
    });
    form.reset();
  });

  function renderProductos(products) {
    renderProducts.innerHTML = '';
    products.forEach((product) => {
      const pDiv = document.createElement("article");

      pDiv.innerHTML = `                      
                            <h3>Title: ${product.title}</h3>
                            <p>ID: ${product.id}</p>
                            <p>Description: ${product.description}</p>
                            <p>Status: ${product.status}</p>
                            <p>Price: ${product.price}</p>
                            <p>Code: ${product.code}</p>
                            <p>Stock: ${product.stock}</p>
                            <strong>Category: ${product.category}</strong>`;

      renderProducts.append(pDiv);
    });
  }

   socket.on("actual-products", ({products}) => {
    
    renderProductos(products);
  }); 

  formDelete.addEventListener("submit", (event) => {
    event.preventDefault();
    socket.emit('delete-product',inputId.value);
   
    formDelete.reset();
  });
  
})();
