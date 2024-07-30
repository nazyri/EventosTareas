let guardar = document.getElementById("guardar"); // boton
let arreglo = document.getElementById("arreglo"); // div
let evento = document.getElementById("evento"); // input

// Cargar la información desde localStorage o inicializar como vacío
let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

// Función para agregar una nueva evento
function agregarEvento(eventoIndex) {
    const nuevaTarea = prompt('Ingrese la nueva evento:');
    const fechaTarea = prompt('Ingrese la fecha de la evento (YYYY-MM-DD):'); // Solicitar fecha

    if (nuevaTarea && fechaTarea) {
        eventos[eventoIndex].tareas.push({ nombre: nuevaTarea, fecha: fechaTarea }); // Almacenar fecha
        localStorage.setItem("eventos", JSON.stringify(eventos));
        mostrarEventos();
    }
}

// Función para editar una evento existente
function editarTarea(eventoIndex, tareaIndex) {
    const tareaActual = eventos[eventoIndex].tareas[tareaIndex];
    const nuevaDescripcion = prompt('Editar evento:', tareaActual.nombre);
    const nuevaFecha = prompt('Editar fecha de la evento (YYYY-MM-DD):', tareaActual.fecha); // Solicitar nueva fecha
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
function subir() {
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

let logueado = false; // Variable de estado para controlar si el usuario ha iniciado sesión

// Modificar la función para mostrar todos los eventos en la arreglo
function mostrarEventos() {
    arreglo.innerHTML = '';

    eventos.forEach((evento, index) => {
        let elementoLista = document.createElement('p');
        elementoLista.textContent = evento.nombre;
        elementoLista.classList.add('cuadro');

        let botonEditar = document.createElement('button');
        botonEditar.textContent = 'editar';

        let botonDescripcion = document.createElement('button');
        botonDescripcion.textContent = 'descripcion';
        botonDescripcion.addEventListener('click', () => agregarEvento(index));

        botonEditar.addEventListener('click', () => {
            const nuevoNombreEvento = prompt('Editar nombre del evento:', evento.nombre);
            if (nuevoNombreEvento) {
                eventos[index].nombre = nuevoNombreEvento;
                localStorage.setItem("eventos", JSON.stringify(eventos));
                mostrarEventos();
            }
        });

        // Mostrar el botón de eliminar solo si el usuario ha iniciado sesión
        let botonEliminarDescripcion;
        if (logueado) {
            botonEliminarDescripcion = document.createElement('button');
            botonEliminarDescripcion.textContent = 'eliminar22';
            botonEliminarDescripcion.addEventListener('click', () => {
                eventos.splice(index, 1);
                localStorage.setItem("eventos", JSON.stringify(eventos));
                mostrarEventos();
            });
            elementoLista.appendChild(botonEliminarDescripcion);
        }

        let tareasLista = document.createElement('ul');
        evento.tareas.forEach((evento, tareaIndex) => {
            let tareaElemento = document.createElement('li');
            tareaElemento.textContent = `${evento.nombre} - Fecha: ${evento.fecha}`; // Mostrar la fecha

            let botonEditarTarea = document.createElement('button');
            botonEditarTarea.textContent = 'editar';
            botonEditarTarea.addEventListener('click', () => editarTarea(index, tareaIndex));

            // Mostrar el botón de eliminar evento solo si el usuario ha iniciado sesión
            let botonEliminarTarea;
            
                botonEliminarTarea = document.createElement('button');
                botonEliminarTarea.textContent = 'eliminar';
                botonEliminarTarea.addEventListener('click', () => {
                    eventos[index].tareas.splice(tareaIndex, 1);
                    localStorage.setItem("eventos", JSON.stringify(eventos));
                    mostrarEventos();
                });
            

            tareaElemento.appendChild(botonEditarTarea);
            if (botonEliminarTarea) tareaElemento.appendChild(botonEliminarTarea); // Solo añadir si existe
            tareasLista.appendChild(tareaElemento);
        });

        elementoLista.appendChild(botonDescripcion);
        elementoLista.appendChild(botonEditar);
        elementoLista.appendChild(tareasLista);
        arreglo.appendChild(elementoLista);
    });
}

// Modificar la lógica de inicio de sesión
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
agregar.addEventListener("click", subir);

// Mostrar eventos al cargar la página
mostrarEventos();