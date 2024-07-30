document.addEventListener('DOMContentLoaded', function() {
    let loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        let correoInput = document.getElementById('correo').value;
        let claveInput = document.getElementById('clave').value;

        // Obtener usuarios registrados desde localStorage
        let storedData = JSON.parse(localStorage.getItem('credenciales')) || [];

        // Buscar si las credenciales coinciden
        let usuarioEncontrado = storedData.find(function(usuario) {
            return usuario.correo === correoInput && usuario.clave === claveInput;
        });

        if (usuarioEncontrado) {
            // Si las credenciales son correctas, redirigir a la siguiente página
            alert('Inicio de sesión exitoso!');
            window.location.href = 'tareas2.html'; // Cambia 'siguiente-pagina.html' por la URL de tu siguiente página
        } else {
            // Si las credenciales son incorrectas, mostrar un mensaje de error
            alert('Correo o contraseña incorrectos. Intenta nuevamente.');
        }
    });
});
s