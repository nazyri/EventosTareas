let guardar = document.getElementById("guardar"); // Botón para agregar eventos
let arreglo = document.getElementById("arreglo"); // Área donde se mostrarán los eventos
let evento = document.getElementById("evento"); // Input para agregar eventos

// Cargar la información desde localStorage o inicializar como vacío
let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
let logueado = false; // Variable de estado para controlar si el usuario ha iniciado sesión

// Función para agregar una nueva tarea a un evento
function agregarTarea(eventoIndex) {
    const nuevaTarea = prompt('Ingrese la nueva tarea:');
    const fechaTarea = prompt('Ingrese la fecha de la tarea (YYYY-MM-DD):'); // Solicitar fecha

    if (nuevaTarea && fechaTarea) {
        eventos[eventoIndex].tareas.push({ nombre: nuevaTarea, fecha: fechaTarea }); // Almacenar tarea y fecha
        localStorage.setItem("eventos", JSON.stringify(eventos));
        mostrarEventos();
    }
}

// Función para editar una tarea existente
function editarTarea(eventoIndex, tareaIndex) {
    const tareaActual = eventos[eventoIndex].tareas[tareaIndex];
    const nuevaDescripcion = prompt('Editar tarea:', tareaActual.nombre);
    const nuevaFecha = prompt('Editar fecha de la tarea (YYYY-MM-DD):', tareaActual.fecha); // Solicitar nueva fecha
    if (nuevaDescripcion) {
        tareaActual.nombre = nuevaDescripcion;
    }
    if (nuevaFecha) {
        tareaActual.fecha = nuevaFecha; // Actualizar fecha
    }
    localStorage.setItem("eventos", JSON.stringify(eventos));
    mostrarEventos();
}

// Función para agregar un nuevo evento
function publicar() {
    let tareaInput = evento.value.trim();
    if (tareaInput === '') {
        alert('Por favor completa todos los campos.');
        return;
    }

    let nuevoEvento = {
        nombre: tareaInput,
        tareas: []
    };

    eventos.push(nuevoEvento);
    localStorage.setItem("eventos", JSON.stringify(eventos));
    evento.value = '';
    mostrarEventos();
}

// Función para mostrar todos los eventos y sus tareas
function mostrarEventos() {
    arreglo.innerHTML = '';

    eventos.forEach((evento, index) => {
        let elementoLista = document.createElement('p');
        elementoLista.textContent = evento.nombre;
        elementoLista.classList.add('cuadro');

        let botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar Evento';
        botonEditar.addEventListener('click', () => {
            const nuevoNombreEvento = prompt('Editar nombre del evento:', evento.nombre);
            if (nuevoNombreEvento) {
                eventos[index].nombre = nuevoNombreEvento;
                localStorage.setItem("eventos", JSON.stringify(eventos));
                mostrarEventos();
            }
        });

        let botonDescripcion = document.createElement('button');
        botonDescripcion.textContent = 'Agregar Tarea';
        botonDescripcion.addEventListener('click', () => agregarTarea(index));

        let tareasLista = document.createElement('ul');
        evento.tareas.forEach((tarea, tareaIndex) => {
            let tareaElemento = document.createElement('li');
            tareaElemento.textContent = `${tarea.nombre} - Fecha: ${tarea.fecha}`; // Mostrar la fecha

            let botonEditarTarea = document.createElement('button');
            botonEditarTarea.textContent = 'Editar Tarea';
            botonEditarTarea.addEventListener('click', () => editarTarea(index, tareaIndex));

            let botonEliminarTarea = document.createElement('button');
            botonEliminarTarea.textContent = 'Eliminar Tarea';
            botonEliminarTarea.addEventListener('click', () => {
                eventos[index].tareas.splice(tareaIndex, 1);
                localStorage.setItem("eventos", JSON.stringify(eventos));
                mostrarEventos();
            });

            tareaElemento.appendChild(botonEditarTarea);
            tareaElemento.appendChild(botonEliminarTarea);
            tareasLista.appendChild(tareaElemento);
        });

        elementoLista.appendChild(botonDescripcion);
        elementoLista.appendChild(botonEditar);
        elementoLista.appendChild(tareasLista);
        arreglo.appendChild(elementoLista);
    });
}

// Lógica de inicio de sesión
document.addEventListener('DOMContentLoaded', function () {
    let Gtarea = document.getElementById('G-tarea');

    Gtarea.addEventListener('submit', function (event) {
        event.preventDefault();

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
            alert('Inicio de sesión exitoso!');
            logueado = true; // Establecer el estado a iniciado sesión
            mostrarEventos(); // Mostrar eventos para actualizar la vista
        } else {
            alert('Correo o contraseña incorrectos. Intenta nuevamente.');
            logueado = false; // Asegurarse de que el estado esté en false si las credenciales son incorrectas
        }
    });
});

// Asignar la función al evento de clic del botón "Agregar"
guardar.addEventListener("click", publicar);

// Mostrar eventos al cargar la página
mostrarEventos();
