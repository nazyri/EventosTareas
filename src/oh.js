let guardarEvento = document.getElementById("guardarEvento");
let guardarTarea = document.getElementById("guardarTarea");
let arregloEventos = document.getElementById("arregloEventos");
let arregloTareas = document.getElementById("arregloTareas");

let eventos = JSON.parse(localStorage.getItem("eventos")) || [];
let tareas = JSON.parse(localStorage.getItem("tareas")) || [];

// Función para agregar un nuevo evento
function agregarEvento() {
    let nombreEvento = document.getElementById("evento").value.trim();
    let descripcionEvento = document.getElementById("descripcionEvento").value.trim();
    let fechaEvento = document.getElementById("fechaEvento").value.trim();
    
    if (nombreEvento === '' || descripcionEvento === '' || fechaEvento === '') {
        alert('Por favor ingrese un nombre, descripción y fecha del evento.');
        return;
    }

    let nuevoEvento = { nombre: nombreEvento, descripcion: descripcionEvento, fecha: fechaEvento, tareas: [] };
    eventos.push(nuevoEvento);
    localStorage.setItem("eventos", JSON.stringify(eventos));
    document.getElementById("evento").value = ''; // Limpiar input
    document.getElementById("descripcionEvento").value = ''; // Limpiar input
    document.getElementById("fechaEvento").value = ''; // Limpiar input
    mostrarEventos();
}

// Función para agregar una nueva tarea
function agregarTarea() {
    let nombreTarea = document.getElementById("tarea").value.trim();
    let descripcionTarea = document.getElementById("descripcionTarea").value.trim();
    let fechaTarea = document.getElementById("fechaTarea").value.trim();
    
    if (nombreTarea === '' || descripcionTarea === '' || fechaTarea === '') {
        alert('Por favor complete todos los campos de la tarea.');
        return;
    }

    let nuevaTarea = { nombre: nombreTarea, descripcion: descripcionTarea, fecha: fechaTarea };
    tareas.push(nuevaTarea);
    localStorage.setItem("tareas", JSON.stringify(tareas));
    document.getElementById("tarea").value = ''; // Limpiar input
    document.getElementById("descripcionTarea").value = ''; // Limpiar input
    document.getElementById("fechaTarea").value = ''; // Limpiar input
    mostrarTareas();
}

// Función para mostrar eventos
function mostrarEventos() {
    arregloEventos.innerHTML = '';
    eventos.forEach((evento, index) => {
        let elementoLista = document.createElement('div');
        elementoLista.classList.add('cuadro');
        elementoLista.innerHTML = `
            <strong>${evento.nombre}</strong><br>
            <span id="descripcionEvento${index}">${evento.descripcion}</span>
            <input type="text" id="inputDescripcionEvento${index}" placeholder="Nueva Descripción">
            <button onclick="actualizarDescripcionEvento(${index})">Actualizar Descripción</button><br>
            Fecha de entrega: ${evento.fecha}
        `;

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
        elementoTarea.innerHTML = `
            <strong>${tarea.nombre}</strong><br>
            <span id="descripcionTarea${index}">${tarea.descripcion}</span>
            <input type="text" id="inputDescripcionTarea${index}" placeholder="Nueva Descripción">
            <button onclick="actualizarDescripcionTarea(${index})">Actualizar Descripción</button><br>
            Fecha de entrega: ${tarea.fecha}
        `;

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

// Funciones para actualizar descripciones
function actualizarDescripcionEvento(index) {
    let nuevaDescripcion = document.getElementById(`inputDescripcionEvento${index}`).value.trim();
    if (nuevaDescripcion) {
        eventos[index].descripcion = nuevaDescripcion; // Actualizar solo la descripción
        localStorage.setItem("eventos", JSON.stringify(eventos));
        mostrarEventos(); // Actualizar la vista
    }
}

function actualizarDescripcionTarea(index) {
    let nuevaDescripcion = document.getElementById(`inputDescripcionTarea${index}`).value.trim();
    if (nuevaDescripcion) {
        tareas[index].descripcion = nuevaDescripcion; // Actualizar solo la descripción
        localStorage.setItem("tareas", JSON.stringify(tareas));
        mostrarTareas(); // Actualizar la vista
    }
}

// Función para editar un evento
function editarEvento(index) {
    let nombreEvento = document.getElementById(`evento`).value.trim();
    let fechaEvento = document.getElementById(`fechaEvento`).value.trim();
    
    if (nombreEvento) {
        eventos[index].nombre = nombreEvento;
    }
    if (fechaEvento) {
        eventos[index].fecha = fechaEvento;
    }
    
    localStorage.setItem("eventos", JSON.stringify(eventos));
    mostrarEventos();
}

// Función para editar una tarea
function editarTarea(index) {
    let nombreTarea = document.getElementById(`tarea`).value.trim();
    let fechaTarea = document.getElementById(`fechaTarea`).value.trim();

    if (nombreTarea) {
        tareas[index].nombre = nombreTarea;
    }
    if (fechaTarea) {
        tareas[index].fecha = nuevaFecha;
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
