

document.addEventListener('DOMContentLoaded', function () {
  let cartId;

  const cartIcon = document.getElementById('cartIcon');

  cartIcon.addEventListener('click', function () {
    if (!cartId) {
      return alert("Primero debes crear el carrito");
    } else {
      window.location.href = `http://localhost:8080/api/carts/${cartId}`;
    }
  });

  const createCartBtn = document.getElementById('createCartBtn');

  createCartBtn.addEventListener('click', function () {
    fetch('http://localhost:8080/api/carts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(data => {
        cartId = data._id;
        createCartBtn.setAttribute('data-cart-id', cartId);
        localStorage.setItem('cartId', cartId);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  });

  let storedCartId = localStorage.getItem('cartId');
  if (storedCartId) {
    cartId = storedCartId;
    createCartBtn.setAttribute('data-cart-id', cartId);
  }

  const addToCartButtons = document.querySelectorAll('.addToCart');

  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();

      if (!cartId) {
        alert('Primero debes crear un carrito.');
        return;
      }

      const productJson = button.getAttribute('data-product');
      const product = JSON.parse(productJson);

      fetch(`http://localhost:8080/api/carts/${cartId}/products/${product._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  });
});
