let nombre = document.getElementById("nombre")
let correo = document.getElementById("correo")
let clave = document.getElementById("clave")
let boton = document.getElementById("login")

let credenciales = JSON.parse(localStorage.getItem("nommbre")) || [];

    function guardar() {
        let data = {
            nombre: nombre.value,
            correo: correo.value,
            clave: clave.value,
        }
        credenciales.push(data)
        localStorage.setItem("nombre", JSON.stringify(credenciales))
    }

    login.addEventListener("click", guardar);