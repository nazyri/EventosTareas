let nombre = document.getElementById("nombre")
let correo = document.getElementById("correo")
let clave = document.getElementById("clave")
let boton = document.getElementById("login")

let informacion = JSON.parse(localStorage.getItem("nommbre")) || []

    function guardar() {
        let data = {
            nombre: nombre.value,
            correo: correo.value,
            clave: clave.value,
        }

        var nombreValue = nombre.value;
        var correoValue = correo.value;
        var claveValue = clave.value;

        if (nombreValue.trim() === '' || correoValue.trim() === '' || claveValue.trim() === '') {
            alert('Por favor complete todos los campos.');
            console.log('Intento de registro fallido: Faltan datos.');
        }
        informacion.push(data)
        localStorage.setItem("nombre", JSON.stringify(informacion))
    }

    login.addEventListener("click", guardar);
    