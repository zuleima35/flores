document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');

    // Verifica que el contenedor de los artículos existe
    if (!cartItemsContainer) {
        console.error('No se encontró el contenedor de los artículos del carrito');
        return;
    }

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Verifica si el carrito está vacío
    if (cart.length === 0) {
        console.log('El carrito está vacío o no se encontró en localStorage');
        return;
    }

    cartItemsContainer.innerHTML = ''; // Limpia el contenedor antes de agregar artículos

    cart.forEach(item => {
        // Verifica que el objeto `item` tenga las propiedades necesarias
        if (!item.id || !item.name || !item.price || !item.quantity) {
            console.error('El objeto del carrito está incompleto:', item);
            return;
        }

        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h2>${item.name}</h2>
            <p>Precio: $${item.price}</p>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            <p>Total: $${item.price * item.quantity}</p>
            <button onclick="removeItem(${item.id})" class="remove-btn">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
});

function updateQuantity(itemId, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemInCart = cart.find(f => f.id === itemId);

    if (itemInCart) {
        itemInCart.quantity = parseInt(quantity, 10); // Asegúrate de que el valor sea un número entero
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Cantidad actualizada para el ID:', itemId);
        // Actualiza la vista sin recargar la página
        updateCartView();
    } else {
        console.error('No se encontró el producto con ID:', itemId);
    }
}

function removeItem(itemId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(f => f.id !== itemId);
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('Artículo eliminado con ID:', itemId);
    // Actualiza la vista sin recargar la página
    updateCartView();
}

function updateCartView() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Limpia el contenedor antes de agregar los artículos actualizados
    cartItemsContainer.innerHTML = '';

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <h2>${item.name}</h2>
            <p>Precio: $${item.price}</p>
            <input type="number" value="${item.quantity}" min="1" onchange="updateQuantity(${item.id}, this.value)">
            <p>Total: $${item.price * item.quantity}</p>
            <button onclick="removeItem(${item.id})" class="remove-btn">Eliminar</button>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
}
