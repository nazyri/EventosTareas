let agregar = document.getElementById("agregar"); //boton
let lista = document.getElementById("lista"); //div
let tarea = document.getElementById("tarea"); //input

// Cargar la información desde localStorage o inicializar como vacío
let eventos = JSON.parse(localStorage.getItem("eventos")) || [];

// Función para agregar una nueva tarea
function agregarTarea(eventoIndex) {
    const nuevaTarea = prompt('Ingrese la nueva tarea:');
    if (nuevaTarea) {
        eventos[eventoIndex].tareas.push({ nombre: nuevaTarea });
        localStorage.setItem("eventos", JSON.stringify(eventos));
        mostrarEventos();
    }
}

// Función para editar una tarea existente
function editarTarea(eventoIndex, tareaIndex) {
    const tareaActual = eventos[eventoIndex].tareas[tareaIndex].nombre;
    const nuevaDescripcion = prompt('Editar tarea:', tareaActual);
    if (nuevaDescripcion) {
        eventos[eventoIndex].tareas[tareaIndex].nombre = nuevaDescripcion;
        localStorage.setItem("eventos", JSON.stringify(eventos));
        mostrarEventos();
    }
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

    eventos.push(nuevoEvento);
    localStorage.setItem("eventos", JSON.stringify(eventos));
    tarea.value = '';
    mostrarEventos();
}

// Función para mostrar todos los eventos en la lista
function mostrarEventos() {
    lista.innerHTML = '';

    eventos.forEach((evento, index) => {
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
        // Muestra una ventana que permite ingresar un nuevo nombre para el evento. 
        // La ventana se inicializa con el nombre actual del evento como valor predeterminado.
            const nuevoNombreEvento = prompt('Editar nombre del evento:', evento.nombre);
            if (nuevoNombreEvento) {
                // Si el usuario ingresa un nuevo nombre y hace clic en "Aceptar", 
                // se actualiza el nombre del evento en el array eventos en la posición correspondiente (index).
                eventos[index].nombre = nuevoNombreEvento;
                localStorage.setItem("eventos", JSON.stringify(eventos));
                mostrarEventos();
            }
        });

        botonEliminarTarea.addEventListener('click', () => {
            eventos.splice(index, 1);
            localStorage.setItem("eventos", JSON.stringify(eventos));
            mostrarEventos();
        });

        let tareasLista = document.createElement('ul');
        evento.tareas.forEach((tarea, tareaIndex) => {
            let tareaElemento = document.createElement('li');
            tareaElemento.textContent = tarea.nombre;

            let botonEditarTarea = document.createElement('button');
            botonEditarTarea.textContent = 'editar';
            botonEditarTarea.addEventListener('click', () => editarTarea(index, tareaIndex));

            let botonEliminarDescripcion = document.createElement('button');
            botonEliminarDescripcion.textContent = 'eliminar22';
            botonEliminarDescripcion.addEventListener('click', () => {
                eventos[index].tareas.splice(tareaIndex, 1);
                localStorage.setItem("eventos", JSON.stringify(eventos));
                mostrarEventos();
            });

            tareaElemento.appendChild(botonEditarTarea);
            tareaElemento.appendChild(botonEliminarDescripcion);
            tareasLista.appendChild(tareaElemento);
        });

        elementoLista.appendChild(botonDescripcion);
        elementoLista.appendChild(botonEditar);
        elementoLista.appendChild(botonEliminarTarea);
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

