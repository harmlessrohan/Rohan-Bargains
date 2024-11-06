if (!sessionStorage.getItem('loggedIn')) {
    window.location.href = 'login.html';
} else {
    sessionStorage.removeItem('loggedIn');
}

function displayGames() {
    const gameList = document.getElementById('game-list');
    gameList.innerHTML = ''; 

    let games = JSON.parse(localStorage.getItem('games')) || [];

    games.forEach((game, index) => {
        const listItem = document.createElement('li');
        
        if (game.image) {
            const img = document.createElement('img');
            img.src = game.image;
            img.alt = game.title;
            img.style.width = '100px';
            img.style.height = 'auto'; 
            listItem.appendChild(img);
        }

        listItem.appendChild(document.createTextNode(` ${game.title} - $${game.price.toFixed(2)}`));
        
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.onclick = function() {
            removeGame(index); 
        };

        listItem.appendChild(removeButton);
        gameList.appendChild(listItem);
    });
}

function removeGame(index) {
    let games = JSON.parse(localStorage.getItem('games')) || [];
    games.splice(index, 1);
    localStorage.setItem('games', JSON.stringify(games)); 
    displayGames(); 
}

document.getElementById('add-game-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    const title = document.getElementById('game-title').value;
    const price = parseFloat(document.getElementById('game-price').value);
    const imageFile = document.getElementById('game-image').files[0]; 

    const game = { title, price };

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            game.image = e.target.result;
            saveGame(game); 
        };
        reader.readAsDataURL(imageFile); 
    } else {
        saveGame(game); 
    }
});

function saveGame(game) {
    let games = JSON.parse(localStorage.getItem('games')) || [];
    
    games.push(game);
    localStorage.setItem('games', JSON.stringify(games));

    document.getElementById('game-title').value = '';
    document.getElementById('game-price').value = '';
    document.getElementById('game-image').value = '';

    displayGames(); 
}

displayGames();