// let nombre = document.getElementById("nombre");
// let correo = document.getElementById("correo");
// let clave = document.getElementById("clave");
// let administrador = document.getElementById("administrador");

// let admin = JSON.parse(localStorage.getItem("administrador")) || [];



document.addEventListener('DOMContentLoaded', function() {
    let historial = JSON.parse(localStorage.getItem('administrador')) || [];

    // Si no hay usuarios registrados, puedes mostrar un mensaje o manejarlo de otra manera
    if (historial.length === 0) {
        console.log('No hay usuarios registrados.');
        return;
    }

    // Tomar el último usuario registrado (puedes modificar esta lógica según tus necesidades)
    let ultimoUsuario = historial[historial.length - 1];

    // Rellenar automáticamente los campos del formulario de inicio de sesión
    document.getElementById('nombre').value = ultimoUsuario.nombre;
    document.getElementById('correo').value = ultimoUsuario.correo;
    document.getElementById('clave').value = ultimoUsuario.clave;
});




// function guardar() {
    
//     let datos = {
//         nombre: nombre.value,
//         correo: correo.value,
//         clave: clave.value,
//         };
        
//         var nombreValue = nombre.value;
//         var correoValue = correo.value;
//         var claveValue = clave.value;
    
//     if (nombreValue.trim() === '' || correoValue.trim() === '' || claveValue.trim() === '') {
//         alert('Por favor completa todos los campos.');
//         }
//         admin.push(datos);
//         localStorage.setItem("administrador", JSON.stringify(admin));
// }


// administrador.addEventListener("click", guardar);