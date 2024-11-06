let cart = JSON.parse(localStorage.getItem('cart')) || [];
let total = cart.reduce((sum, item) => sum + item.price, 0);
let games = JSON.parse(localStorage.getItem('games')) || [];

function addGameToList(title, price, image) {
    games.push({ title, price, image });
    localStorage.setItem('games', JSON.stringify(games));
    displayGames();
}


function displayGames() {
    const gameList = document.getElementById('game-list');
    gameList.innerHTML = ''; 
    games.forEach((game) => {
        const gameDiv = document.createElement('div');
        gameDiv.className = 'game';

        
        if (game.image) {
            gameDiv.style.backgroundImage = `url(${game.image})`;
            gameDiv.style.backgroundSize = 'cover'; 
            gameDiv.style.backgroundPosition = 'center'; 
        }

        gameDiv.innerHTML = `
            <h3>${game.title}</h3>
            <p>Price: $${game.price.toFixed(2)}</p>
            <button onclick="addToCart('${game.title}', ${game.price})">Add to Cart</button>
        `;
        gameList.appendChild(gameDiv);
    });
}

function addToCart(title, price) {
    cart.push({ title, price });
    total += price;
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function removeFromCart(index) {
    total -= cart[index].price; 
    cart.splice(index, 1);
    updateCart();
    localStorage.setItem('cart', JSON.stringify(cart)); 
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = `${item.title} - $${item.price.toFixed(2)}`;
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = () => removeFromCart(index);
        li.appendChild(removeButton);
        cartItems.appendChild(li);
    });
    document.getElementById('total-price').textContent = `Total: $${total.toFixed(2)}`;
}



displayGames();
updateCart();

// document.getElementById('game-form').addEventListener('submit', function(event) {
//     event.preventDefault();
//     const title = document.getElementById('game-title').value;
//     const price = parseFloat(document.getElementById('game-price').value);
    
//     addGameToList(title, price);
//     document.getElementById('game-title').value = '';
//     document.getElementById('game-price').value = '';
// });