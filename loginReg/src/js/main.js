const formLogin = document.getElementById('formLogin');
const formRegistro = document.getElementById('formRegistro');

//una ver seleccionado el formualario login paso por aqui
if (formLogin) {

    //Añado un event listener que escuche el submit
    formLogin.addEventListener('submit', async (event) => {
        //prevengo que se recarge al enviar el form
        event.preventDefault();

        //Saco el email y la contraseña
        const email = document.getElementById('emailLogin').value;
        const password = document.getElementById('passLogin').value;

        //Hago una peticion al backend
        try {
            //Saco la respuesta de un fetch hacia el endpoint login
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST', //le digo que el metodo es post
                headers: {
                    'Content-Type': 'application/json' //Paso el contenido en formado json
                },
                //Le envio el email y contraseña con el json stringify
                body: JSON.stringify({ email, password })
            });

            //Espero a la respuesta del backend
            const data = await response.json();
            console.log('Login response:', data);

            //Segun si la respuesta es true saco un alert (si fuera un login de una pagina real redirijeria)
            if (data.ok) {
                alert(data.mensaje);

                //en caso de que no sea true saco el mensaje de fallo
            } else {
                alert(data.mensaje);
            }

            //si va por error saco que ha habido un error
        } catch (error) {
            console.error('Error en login:', error);
            alert('Error al conectar con el servidor');
        }
    });
}

//Para el formulario de registro
if (formRegistro) {

    //cuando hace summit
    formRegistro.addEventListener('submit', async (event) => {

        //prevengo que se recargue al enviar el form
        event.preventDefault();

        //saco los datos del formulario
        const user = document.getElementById('usuario').value;
        const email = document.getElementById('emailRegistro').value;
        const password = document.getElementById('passRegistro').value;
        const confirmPassword = document.getElementById('passConfirmar').value;

        //compruebo que las contraseñas coinciden y si no muestro un alert
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }

        //Hago una peticion al backend al endpoint de registro
        try {
            const response = await fetch('http://localhost:3000/register', {
                //Lo envio igual con post y en formato json
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user, email, password })
            });

            //saco los datos 
            const data = await response.json();
            console.log('Register response:', data);

            //Segun la respuesta saco el mensaje de registrado correctamente o no
            if (data.ok) {
                alert(data.mensaje);
            } else {
                alert(data.mensaje);
            }
            //en caso que de fallo al conectarse al servidor
        } catch (error) {
            console.error('Error en registro:', error);
            alert('Error al conectar con el servidor');
        }
    });
}
