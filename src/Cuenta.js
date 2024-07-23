let correo = document.getElementById("correo");
let clave = document.getElementById("clave");
let boton = document.getElementById("boton");

let informacion = JSON.parse(localStorage.getItem("cuenta")) || [];

function guardar() {
    // Verificar si algún campo está vacío
    if (correo.value === '' || clave.value === '') {
        alert('Por favor completa todos los campos.');
        return; // Detener la función si hay campos vacíos
    }

    let data = {
        correo: correo.value,
        clave: clave.value,
    };

    informacion.push(data);
    localStorage.setItem("cuenta", JSON.stringify(informacion));

    // Limpiar los campos después de guardar si es necesario
    correo.value = '';
    clave.value = '';
}

boton.addEventListener("click", guardar);

