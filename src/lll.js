let guardarEvento = document.getElementById("guardarEvento");
let guardarTarea = document.getElementById("guardarTarea");
let arregloEventos = document.getElementById("arregloEventos");
let arregloTareas = document.getElementById("arregloTareas");

let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Función para agregar un nuevo evento
function agregarEvento() {
    let nombreEvento = document.getElementById("evento").value.trim();
    if (nombreEvento === '') {
        alert('Por favor ingrese un nombre de evento.');
        return;
    }

    let nuevoEvento = { nombre: nombreEvento, tareas: [] };
    eventos.push(nuevoEvento);
    localStorage.setItem("eventos", JSON.stringify(eventos));
    document.getElementById("evento").value = ''; // Limpiar input
    mostrarEventos();
}

// Función para agregar una nueva tarea
function agregarTarea() {
    let nombreTarea = document.getElementById("tarea").value.trim();
    let fechaTarea = document.getElementById("fechaTarea").value.trim();
    
    if (nombreTarea === '' || fechaTarea === '') {
        alert('Por favor complete todos los campos de la tarea.');
        return;
    }

    let nuevaTarea = { nombre: nombreTarea, fecha: fechaTarea };
    tareas.push(nuevaTarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    document.getElementById("tarea").value = ''; // Limpiar input
    document.getElementById("fechaTarea").value = ''; // Limpiar input
    mostrarTareas();
}

// Función para mostrar eventos
function mostrarEventos() {
    arregloEventos.innerHTML = '';
    eventos.forEach((evento, index) => {
        let elementoLista = document.createElement('div');
        elementoLista.classList.add('cuadro');
        elementoLista.textContent = evento.nombre;

        // Botón para editar evento
        let botonEditarEvento = document.createElement('button');
        botonEditarEvento.textContent = 'Editar Evento';
        botonEditarEvento.addEventListener('click', () => editarEvento(index));

        // Botón para eliminar evento
        let botonEliminarEvento = document.createElement('button');
        botonEliminarEvento.textContent = 'Eliminar Evento';
        botonEliminarEvento.addEventListener('click', () => {
            eventos.splice(index, 1);
            localStorage.setItem("eventos", JSON.stringify(eventos));
            mostrarEventos();
        });

        elementoLista.appendChild(botonEditarEvento);
        elementoLista.appendChild(botonEliminarEvento);
        arregloEventos.appendChild(elementoLista);
    });
}

// Función para mostrar tareas
function mostrarTareas() {
    arregloTareas.innerHTML = '';
    tareas.forEach((tarea, index) => {
        let elementoTarea = document.createElement('div');
        elementoTarea.classList.add('cuadro');
        elementoTarea.textContent = `${tarea.nombre} - Fecha: ${tarea.fecha}`;

        // Botón para editar tarea
        let botonEditarTarea = document.createElement('button');
        botonEditarTarea.textContent = 'Editar Tarea';
        botonEditarTarea.addEventListener('click', () => editarTarea(index));

        // Botón para eliminar tarea
        let botonEliminarTarea = document.createElement('button');
        botonEliminarTarea.textContent = 'Eliminar Tarea';
        botonEliminarTarea.addEventListener('click', () => {
            tareas.splice(index, 1);
            localStorage.setItem("tareas", JSON.stringify(tareas));
            mostrarTareas();
        });

        elementoTarea.appendChild(botonEditarTarea);
        elementoTarea.appendChild(botonEliminarTarea);
        arregloTareas.appendChild(elementoTarea);
    });
}

// Función para editar un evento
function editarEvento(index) {
    let nuevoNombreEvento = prompt('Editar nombre del evento:', eventos[index].nombre);
    if (nuevoNombreEvento) {
        eventos[index].nombre = nuevoNombreEvento;
        localStorage.setItem("eventos", JSON.stringify(eventos));
        mostrarEventos();
    }
}

// Función para editar una tarea
function editarTarea(index) {
    let tareaActual = tareas[index];
    let nuevaDescripcion = prompt('Editar tarea:', tareaActual.nombre);
    let nuevaFecha = prompt('Editar fecha de la tarea:', tareaActual.fecha);

    if (nuevaDescripcion) {
        tareaActual.nombre = nuevaDescripcion;
    }
    if (nuevaFecha) {
        tareaActual.fecha = nuevaFecha;
    }
    
    localStorage.setItem("tareas", JSON.stringify(tareas));
    mostrarTareas();
}

// Asignar funciones a los botones
guardarEvento.addEventListener("click", agregarEvento);
guardarTarea.addEventListener("click", agregarTarea);

// Mostrar eventos y tareas al cargar la página
mostrarEventos();
mostrarTareas();
