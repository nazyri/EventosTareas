let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let correo = document.getElementById("correo");
let clave = document.getElementById("clave");
let button = document.getElementById("registar");

let credenciales = JSON.parse(localStorage.getItem("nombre")) || [];

function guardar() {
    console.log('Esta llegando');
    
    let data = {
        nombre: nombre.value,
        apellido: apellido.value,
        correo: correo.value,
        clave: clave.value,
        };
        
        var nombreValue = nombre.value;
        var apellidoValue = apellido.value;
        var correoValue = correo.value;
        var claveValue = clave.value;
    
    if (nombreValue.trim() === '' || apellidoValue.trim() === '' || correoValue.trim() === '' || claveValue.trim() === '') {
        alert('Por favor completa todos los campos.');
        }
        credenciales.push(data);
        localStorage.setItem("nombre", JSON.stringify(credenciales));
}


registrar.addEventListener("click", guardar);

let nombreLocal = localStorage.getItem("nombre")
let apellidoLocal = localStorage.getItem ("apellido")
let correoLocal = localStorage.getItem ("correo")
let claveLocal = localStorage.getItem ("clave")

function comparar() {
    console.log(nombreLocal)
    console.log(apellidoLocal)
    console.log(correoLocal)
    console.log(claveLocal)
}