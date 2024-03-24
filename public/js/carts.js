document.addEventListener('DOMContentLoaded', function () {
    
    const titleElement = document.querySelector('.title');
    const cartId = titleElement.dataset.cartId;
    //console.log('Cart ID:', cartId);
    const purchaseButton = document.getElementById('purchaseButton');

    purchaseButton.addEventListener('click', function () {
        // Obtener el cartId del atributo data del título
        const titleElement = document.querySelector('.title');
        const cartId = titleElement.dataset.cartId;

        // Redireccionar a la ruta de compra del carrito
        window.location.href = `/api/carts/${cartId}/purchase`;
    });
    
        const deleteButtons = document.querySelectorAll('.deleteButton');
        
        deleteButtons.forEach(button => {
            button.addEventListener('click', async function (event) {
                
                const productId = button.getAttribute('data-product-id');
                
                try {
                    
                    const response = await fetch(`/api/carts/${cartId}/products/${productId}`, {
                        method: 'DELETE',
                    });
    
                    if (response.ok) {
                        // Eliminación exitosa
                        //console.log('Producto eliminado correctamente');
                        window.location.reload();
                        // Puedes agregar aquí alguna lógica adicional, como eliminar el producto de la interfaz de usuario
                    } else {
                        console.error('Error al eliminar el producto');
                    }
                } catch (error) {
                    console.error('Error al eliminar el producto:', error);
                }
            });
        });
    
});
