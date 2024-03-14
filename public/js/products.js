

document.addEventListener('DOMContentLoaded', function () {

  const addToCartButtons = document.querySelectorAll('.addToCart');

  addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function (event) {
      event.preventDefault();

   
      const productJson = button.getAttribute('data-product');
      const cartLink = document.querySelector('button a[data-cart-id]');
      const cartId = cartLink.dataset.cartId;
    
      console.log('ID del carrito:', cartId);
      const product = JSON.parse(productJson);
     

      fetch(`/api/carts/${cartId}/products/${product._id}`, {
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
