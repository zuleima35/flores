
const flowers = [
    { id: 1, name: 'Rosa', price: 10, image: 'images/rosa.jpg' },
    { id: 2, name: 'Lirio', price: 12, image: 'images/lirio.jpg' },
    { id: 3, name: 'Tulipán', price: 15, image: 'images/tulipan.jpg' },
    { id: 4, name: 'Girasol', price: 8, image: 'images/girasol.jpg' },
    { id: 5, name: 'Margarita', price: 7, image: 'images/margarita.jpg' },
    { id: 6, name: 'Orquídea', price: 20, image: 'images/orquidea.jpg' },
    { id: 7, name: 'Clavel', price: 9, image: 'images/clavel.jpg' },
];


const slidesContainer = document.getElementById('flower-slides');


flowers.forEach(flower => {
    const slide = document.createElement('div');
    slide.classList.add('flower-slide'); // Añade una clase para el estilo
    slide.innerHTML = `
        <img src="${flower.image}" alt="${flower.name}" class="flower-image">
        <h2>${flower.name}</h2>
        <p>Precio: $${flower.price}</p>
        <button onclick="addToCart(${flower.id})">Agregar al Carrito</button>
    `;
    slidesContainer.appendChild(slide);
});


function addToCart(flowerId) {
    // Obtener el carrito del localStorage o inicializarlo vacío
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const flower = flowers.find(f => f.id === flowerId);

    if (!flower) {
        console.error(`Flor con ID ${flowerId} no encontrada.`);
        return;
    }

    const flowerInCart = cart.find(f => f.id === flowerId);
    
    if (flowerInCart) {
        flowerInCart.quantity++;
    } else {
        cart.push({ ...flower, quantity: 1 });
    }

  
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    
    alert('Flor agregada al carrito');
}

function updateCartCount() {

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    

    if (!Array.isArray(cart)) {
        console.error('El carrito no es un array.');
        return;
    }


    const totalItems = cart.reduce((acc, flower) => {
        // Verificar que flower.quantity es un número válido
        if (typeof flower.quantity !== 'number' || isNaN(flower.quantity)) {
            console.error('Cantidad de flor inválida:', flower);
            return acc;
        }
        return acc + flower.quantity;
    }, 0);


    document.getElementById('cart-count').textContent = totalItems;
}

window.onload = updateCartCount;

window.addEventListener('storage', updateCartCount);