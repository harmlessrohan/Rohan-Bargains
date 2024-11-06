// Function to add a game to the cart
function addToCart(game) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(game); // Add the game to the cart
    localStorage.setItem('cart', JSON.stringify(cart)); // Update the cart in local storage
}

// Function to display the cart
function displayCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = ''; // Clear the cart before displaying

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.forEach((game, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <img src="${game.image}" alt="${game.title}" style="width: 100px;">
            <h2>${game.title}</h2>
            <p>$${game.price.toFixed(2)}</p>
            <button onclick="removeFromCart('${game.title}')">Remove</button>
        `;
        cartList.appendChild(cartItem);
    });
}

// Function to remove a game from the cart
function removeFromCart(title) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(game => game.title !== title); // Filter out the removed game
    localStorage.setItem('cart', JSON.stringify(cart)); // Update the cart in local storage
    displayCart(); // Refresh the cart display
}