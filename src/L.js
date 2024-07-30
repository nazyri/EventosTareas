let nombre = document.getElementById("nombre");
let correo = document.getElementById("correo");
let clave = document.getElementById("clave");
let login = document.getElementById("login");

let informacion = JSON.parse(localStorage.getItem("datos")) || [];

function guardar() {
    // Verificar si algún campo está vacío
    if (correo.value === '' || clave.value === '') {
        alert('Por favor completa todos los campos.');
        return; // Detener la función si hay campos vacíos
    }

    let data = {
        nombre: nombre.value,
        correo: correo.value,
        clave: clave.value,
    };

    informacion.push(data);
    localStorage.setItem("datos", JSON.stringify(informacion));

    // Limpiar los campos después de guardar si es necesario
    nombre.value = '';
    correo.value = '';
    clave.value = '';
}

login.addEventListener("click", guardar);
