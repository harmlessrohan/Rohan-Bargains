document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const userId = document.getElementById('user-id').value;
    const password = document.getElementById('password').value;

    if (userId === 'rohan' && password === '123') {
        sessionStorage.setItem('loggedIn', 'true');
        window.location.href = 'add-game.html';
    } else {
        alert('ID or Password is Wrong'); 
    }
});