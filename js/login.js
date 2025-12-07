const API_BASE = 'http://localhost:3000';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const emailError = document.getElementById('email-error');
    const togglePassword = document.getElementById('togglePassword');

    // إظهار/إخفاء الباسورد
    if (togglePassword) {
        togglePassword.addEventListener('click', () => {
            const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordInput.setAttribute('type', type);
        });
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        emailError.classList.remove('show');

        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (!email || !email.includes('@')) {
            emailError.textContent = 'Please enter a valid email';
            emailError.classList.add('show');
            return;
        }

        if (!password) {
            alert('Please enter your password');
            return;
        }

        try {
            const res = await fetch(`${API_BASE}/api/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await res.json();

            if (!res.ok || !data.success) {
                if (res.status === 401) {
                    alert(data.message || 'Invalid email or password');
                } else {
                    alert('Login failed');
                }
                return;
            }

            alert(`Welcome, ${data.user.fullname}!`);
            // هنا تقدر تحوله للهوم مثلاً:
            window.location.href = 'index.html';
        } catch (err) {
            console.error(err);
            alert('Error connecting to server');
        }
    });
});