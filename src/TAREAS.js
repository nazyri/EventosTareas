let agregar = document.getElementById("agregar"); //bton
let lista = document.getElementById("lista"); //lista aqui van los appenchil creados
let tarea = document.getElementById("tarea"); //input donde se agregan las tareas

// Cargar la información desde localStorage o inicializar como vacío
let guardarTareas = JSON.parse(localStorage.getItem("guardarTareas")) || [];

// Función para agregar una nueva tarea
function agregarTarea(eventoIndex) {
    const nuevaTarea = prompt('Ingrese la nueva tarea:');
    const fechaTarea = prompt('Ingrese la fecha de la tarea (YYYY-MM-DD):'); // Solicitar fecha

    if (nuevaTarea && fechaTarea) {
        guardarTareas[eventoIndex].tareas.push({ nombre: nuevaTarea, fecha: fechaTarea }); // Almacenar fecha
        localStorage.setItem("guardarTareas", JSON.stringify(guardarTareas));
        mostrarEventos();
    }
}

// Función para editar una tarea existente
function editarTarea(eventoIndex, tareaIndex) {
    const tareaActual = guardarTareas[eventoIndex].tareas[tareaIndex];
    const nuevaDescripcion = prompt('Editar tarea:', tareaActual.nombre);
    const nuevaFecha = prompt('Editar fecha de la tarea (YYYY-MM-DD):', tareaActual.fecha); // Solicitar nueva fecha
    if (nuevaDescripcion) {
        tareaActual.nombre = nuevaDescripcion;
    }
    if (nuevaFecha) {
        tareaActual.fecha = nuevaFecha; // Actualizar fecha
    }
    localStorage.setItem("guardarTareas", JSON.stringify(guardarTareas));
    mostrarEventos();
}

// Función para agregar un nuevo evento
function subir() {
    let tareaInput = tarea.value.trim();
    if (tareaInput === '') {
        alert('Por favor completa todos los campos.');
        return;
    }

    let nuevoEvento = {
        nombre: tareaInput,
        tareas: []
    };

    guardarTareas.push(nuevoEvento);
    localStorage.setItem("guardarTareas", JSON.stringify(guardarTareas));
    tarea.value = '';
    mostrarEventos();
}

 let logueado = false; // Variable de estado para controlar si el usuario ha iniciado sesión

// Modificar la función para mostrar todos los guardarTareas en la lista
function mostrarEventos() {
    lista.innerHTML = '';

    guardarTareas.forEach((evento, index) => {
        let elementoLista = document.createElement('p');
        elementoLista.textContent = evento.nombre;
        elementoLista.classList.add('cuadro');

        let botonEditar = document.createElement('button');
        botonEditar.textContent = 'editar';

        let botonEliminarTarea = document.createElement('button');
        botonEliminarTarea.textContent = 'eliminar';

        let botonDescripcion = document.createElement('button');
        botonDescripcion.textContent = 'descripcion';
        botonDescripcion.addEventListener('click', () => agregarTarea(index));

        botonEditar.addEventListener('click', () => {
            const nuevoNombreEvento = prompt('Editar nombre del evento:', guardarTareas.nombre);
            if (nuevoNombreEvento) {
                guardarTareas[index].nombre = nuevoNombreEvento;
                localStorage.setItem("guardarTareas", JSON.stringify(guardarTareas));
                mostrarEventos();
            }
        });

        // Mostrar el botón de eliminar solo si el usuario ha iniciado sesión
        // let botonEliminarDescripcion;
        // if (logueado) {
        //     botonEliminarDescripcion = document.createElement('button');
        //     botonEliminarDescripcion.textContent = 'eliminar';
        //     botonEliminarDescripcion.addEventListener('click', () => {
        //         eventos.splice(index, 1);
        //         localStorage.setItem("eventos", JSON.stringify(eventos));
        //         mostrarEventos();
        //     });
        //     elementoLista.appendChild(botonEliminarDescripcion);
        // }

        let tareasLista = document.createElement('ul');
        evento.tareas.forEach((tarea, tareaIndex) => {
            let tareaElemento = document.createElement('li');
            tareaElemento.textContent = `${tarea.nombre} - Fecha: ${tarea.fecha}`; // Mostrar la fecha

            let botonEditarTarea = document.createElement('button');
            botonEditarTarea.textContent = 'editar';
            botonEditarTarea.addEventListener('click', () => editarTarea(index, tareaIndex));

            let botonEliminarDescripcion = document.createElement('button');
            botonEliminarDescripcion.textContent = 'eliminar';
            botonEliminarDescripcion.addEventListener('click', () => {
                guardarTareas[index].tareas.splice(tareaIndex, 1);
                localStorage.setItem("guardarTareas", JSON.stringify(guardarTareas));
                mostrarEventos();
            });

            // Mostrar el botón de eliminar tarea solo si el usuario ha iniciado sesión
            let botonEliminarTarea;
            if (logueado) {
                botonEliminarTarea = document.createElement('button');
                botonEliminarTarea.textContent = 'eliminar';
                botonEliminarTarea.addEventListener('click', () => {
                    guardarTareas[index].tareas.splice(tareaIndex, 1);
                    localStorage.setItem("guardarTareas", JSON.stringify(guardarTareas));
                    mostrarEventos();
                });
            }

            tareaElemento.appendChild(botonEliminarDescripcion);
            tareaElemento.appendChild(botonEditarTarea);
            if (botonEliminarTarea) tareaElemento.appendChild(botonEliminarTarea); // Solo añadir si existe
            tareasLista.appendChild(tareaElemento);
        });

        elementoLista.appendChild(botonDescripcion);
        elementoLista.appendChild(botonEditar);
        elementoLista.appendChild(tareasLista);
        lista.appendChild(elementoLista);
    });
}

// // Modificar la lógica de inicio de sesión
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