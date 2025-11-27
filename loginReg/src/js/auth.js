export function initAuth() {
    const formLogin = document.getElementById('formLogin');
    const formRegistro = document.getElementById('formRegistro');

    // Login Form
    if (formLogin) {
        formLogin.addEventListener('submit', async (event) => {
            event.preventDefault();

            const email = document.getElementById('emailLogin').value;
            const password = document.getElementById('passLogin').value;

            try {
                const response = await fetch('http://localhost:3000/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ email, password })
                });

                const data = await response.json();
                console.log('Login response:', data);

                if (data.ok) {
                    alert(data.mensaje);
                } else {
                    alert(data.mensaje);
                }
            } catch (error) {
                console.error('Error en login:', error);
                alert('Error al conectar con el servidor');
            }
        });
    }

    // Register Form
    if (formRegistro) {
        formRegistro.addEventListener('submit', async (event) => {
            event.preventDefault();

            const user = document.getElementById('usuario').value;
            const email = document.getElementById('emailRegistro').value;
            const password = document.getElementById('passRegistro').value;
            const confirmPassword = document.getElementById('passConfirmar').value;

            if (password !== confirmPassword) {
                alert('Las contraseñas no coinciden');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ user, email, password })
                });

                const data = await response.json();
                console.log('Register response:', data);

                if (data.ok) {
                    alert(data.mensaje);
                } else {
                    alert(data.mensaje);
                }
            } catch (error) {
                console.error('Error en registro:', error);
                alert('Error al conectar con el servidor');
            }
        });
    }
}
