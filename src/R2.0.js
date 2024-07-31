let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let correo = document.getElementById("correo");
let clave = document.getElementById("clave");
let button = document.getElementById("registrar");

// Obtener datos existentes de localStorage o inicializar como un arreglo vacío
let credenciales = JSON.parse(localStorage.getItem("credenciales")) || [];

button.addEventListener("click", guardar);

function guardar(event) {
    event.preventDefault(); // Evita que el formulario se envíe

    let data = {
        nombre: nombre.value,
        apellido: apellido.value,
        correo: correo.value,
        clave: clave.value
    };

    // Validación de campos vacíos
    if (data.nombre.trim() === '' || data.apellido.trim() === '' || data.correo.trim() === '' || data.clave.trim() === '') {
        alert('Por favor completa todos los campos.');
        return; // Detiene la ejecución si hay campos vacíos
    }

    // Agregar nuevos datos al arreglo
    credenciales.push(data);

    // Guardar en localStorage
    localStorage.setItem("credenciales", JSON.stringify(credenciales));

    // Limpiar los campos después de guardar
    nombre.value = '';
    apellido.value = '';
    correo.value = '';
    clave.value = '';

    alert('Registro exitoso!');
    window.location.href = 'L2.0.html';
}
