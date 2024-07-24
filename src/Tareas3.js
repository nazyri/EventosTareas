let agregar = document.getElementById("agregar");
let lista = document.getElementById("lista")
let tarea = document.getElementById("tarea");

let informacion = JSON.parse(localStorage.getItem("tareas")) || [];

function subir() {
    let tarea = document.getElementById("tarea");
    console.log(tarea.value);
    let evento = {
        tarea: tarea.value
    }
    if (evento.tarea.trim() === '') {
        alert('Por favor completa todos los campos.');
        return;
    }
    informacion.push(evento);
    localStorage.setItem("tareas", JSON.stringify(informacion));

    tarea.value = '';

    // alert("Tarea agregada exitosa!");
    ingresar()
    
}

agregar.addEventListener("click", subir);

function ingresar() {
    informacion.forEach(element => {
        let elementoLista = document.createElement('li')
        let boton = document.createElement('button')
        
        elementoLista.innerHTML = element.tarea
        boton.textContent = 'Descripcion'
       
                lista.appendChild(elementoLista)
                elementoLista.appendChild(boton)
    });
    
}


// Función para agregar una nueva tarea a un evento específico
function agregarTarea(eventoIndex) {
    // Solicitar al usuario que ingrese el nombre de la nueva tarea
    const tareaInput = prompt('Ingrese la nueva tarea:');

    if (tareaInput) {
      // Agregar la nueva tarea al evento seleccionado
      evento[eventoIndex].tareas.push({
        nombre: tareaInput,
  
      });

    }
  }

  ////////

document.addEventListener('DOMContentLoaded', function() {
    let Gtarea = document.getElementById('G-tarea');

    Gtarea.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
        
        let nombreInput = document.getElementById('nombre').value;
        let correoInput = document.getElementById('correo').value;
        let claveInput = document.getElementById('clave').value;

        // Obtener usuarios registrados desde localStorage
        let storedData = JSON.parse(localStorage.getItem('administrador')) || [];

        // Buscar si las credenciales coinciden
        let usuarioEncontrado = storedData.find(function(usuario) {
            return usuario.nombre === nombreInput && usuario.correo === correoInput && usuario.clave === claveInput;
        });

        if (usuarioEncontrado) {
            // Si las credenciales son correctas, redirigir a la siguiente página
            alert('Inicio de sesión exitoso!');
            // window.location.href = 'siguiente-pagina.html'; // Cambia 'siguiente-pagina.html' por la URL de tu siguiente página
        } else {
            // Si las credenciales son incorrectas, mostrar un mensaje de error
            alert('Correo o contraseña incorrectos. Intenta nuevamente.');
        }
    });
});
