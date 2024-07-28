
let agregar = document.getElementById("agregar");
let lista = document.getElementById("lista");
let tarea = document.getElementById("tarea");


// Cargar la información desde localStorage o inicializar como vacío
let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

// Función para agregar una nueva tarea
function agregarTarea(eventoIndex) {
    // Solicitar al usuario que ingrese el nombre de la nueva tarea
    const nuevaTarea = prompt('Ingrese la nueva tarea:');
    if (nuevaTarea) {
        // Agregar la nueva tarea al evento seleccionado
        eventos[eventoIndex].tareas.push({
            nombre: nuevaTarea
        });
        // Actualizar localStorage
        localStorage.setItem("eventos", JSON.stringify(eventos));
        // Actualizar la lista
        mostrarEventos();
    }
}

function editarTarea() {
    
    
}

// Función para agregar un nuevo evento
function subir() {
    let tareaInput = tarea.value.trim();
    if (tareaInput === '') {
        alert('Por favor completa todos los campos.');
        return;
    }

    // Crear un nuevo evento
    let nuevoEvento = {
        nombre: tareaInput,
        tareas: []
    };

    // Añadir el nuevo evento a la lista
    eventos.push(nuevoEvento);
    localStorage.setItem("eventos", JSON.stringify(eventos));
    tarea.value = '';
    mostrarEventos();
}

// Función para mostrar todos los eventos en la lista
function mostrarEventos() {
    // Limpiar la lista actual
    lista.innerHTML = '';

    // Iterar sobre cada evento
    eventos.forEach((evento, index) => {


        let elementoLista = document.createElement('p');
        elementoLista.textContent = evento.nombre;
        elementoLista.classList.add('cuadro');

        let botonEditar = document.createElement('button');
        botonEditar.textContent = 'editar';

        let botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'eliminar'

        let botonDescripcion = document.createElement('button');
        botonDescripcion.textContent = 'descripcion';
        botonDescripcion.addEventListener('click', () => agregarTarea(index));


        let tareasLista = document.createElement('ul');
        evento.tareas.forEach(tarea => {
            let tareaElemento = document.createElement('li');
            tareaElemento.textContent = tarea.nombre;
            tareasLista.appendChild(tareaElemento);
        });

        elementoLista.appendChild(botonDescripcion);
        elementoLista.appendChild(botonEditar);
        elementoLista.appendChild(botonEliminar);
        elementoLista.appendChild(tareasLista);
        lista.appendChild(elementoLista);
    });
}

// Asignar la función al evento de clic del botón "Agregar"
agregar.addEventListener("click", subir);

// Mostrar eventos al cargar la página
mostrarEventos();

document.addEventListener('DOMContentLoaded', function () {
    let Gtarea = document.getElementById('G-tarea');

    Gtarea.addEventListener('submit', function (event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente

        let nombreInput = document.getElementById('nombre').value;
        let correoInput = document.getElementById('correo').value;
        let claveInput = document.getElementById('clave').value;

        // Obtener usuarios registrados desde localStorage
        let storedData = JSON.parse(localStorage.getItem('administrador')) || [];

        // Buscar si las credenciales coinciden
        let usuarioEncontrado = storedData.find(function (usuario) {
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