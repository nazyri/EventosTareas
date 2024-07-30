let nombre = document.getElementById("nombre");
let correo = document.getElementById("correo");
let clave = document.getElementById("clave");
let administrador = document.getElementById("administrador");

let admin = JSON.parse(localStorage.getItem("administrador")) || [];

function guardar() {
    
    let datos = {
        nombre: nombre.value,
        correo: correo.value,
        clave: clave.value,
        };
        
        var nombreValue = nombre.value;
        var correoValue = correo.value;
        var claveValue = clave.value;
    
    if (nombreValue.trim() === '' || correoValue.trim() === '' || claveValue.trim() === '') {
        alert('Por favor completa todos los campos.');
        }
        admin.push(datos);
        localStorage.setItem("administrador", JSON.stringify(admin));
}


administrador.addEventListener("click", guardar);
