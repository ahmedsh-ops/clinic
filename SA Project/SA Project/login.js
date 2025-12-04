document.addEventListener('DOMContentLoaded', () => {
    if (!localStorage.getItem('users')) {
        localStorage.setItem('users', JSON.stringify([]));
    }

    const signupForm = document.querySelector('.signup form');
    const loginForm = document.querySelector('.login form');
    const chk = document.getElementById('chk');

    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users'));
        const email = signupForm.querySelector('input[type="email"]').value;
        const password = signupForm.querySelector('input[type="password"]').value;
        const username = signupForm.querySelector('input[type="text"]').value;
        const phone = signupForm.querySelector('input[type="number"]').value;

        if (users.some(user => user.email === email)) {
            alert('User already exists!');
            return;
        }

        const newUser = {
            username,
            email,
            phone,
            password,
            subscribed: false
        };

        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        alert('Signup successful! Please login.');
        chk.checked = true;
        signupForm.reset();
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users'));
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'Home.html';
        } else {
            alert('not found');
        }
    });
});

function checkSubscriptionStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user && user.subscribed) {
        localStorage.setItem('subscribed', 'true');
    }
}