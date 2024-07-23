document.addEventListener('DOMContentLoaded', function() {
    let storedData = JSON.parse(localStorage.getItem('credenciales')) || [];

    // Si no hay usuarios registrados, puedes mostrar un mensaje o manejarlo de otra manera
    if (storedData.length === 0) {
        console.log('No hay usuarios registrados.');
        return;
    }

    // Tomar el último usuario registrado (puedes modificar esta lógica según tus necesidades)
    let ultimoUsuario = storedData[storedData.length - 1];

    // Rellenar automáticamente los campos del formulario de inicio de sesión
    document.getElementById('correo').value = ultimoUsuario.correo;
    document.getElementById('clave').value = ultimoUsuario.clave;
});