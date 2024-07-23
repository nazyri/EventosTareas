// Declaración de un arreglo para almacenar los eventos
let eventos = [];

// Función para agregar un nuevo evento
function agregarEvento() {
  // Obtener el valor del input y eliminar espacios en blanco al principio y al final
  const eventoInput = document.getElementById('eventInput');
  const nombreEvento = eventoInput.value.trim();

  // Validar que el campo no esté vacío
  if (nombreEvento === '') {
    alert('Por favor, ingrese el nombre del evento.');
    return;
  }

  // Crear un nuevo objeto de evento y agregarlo al arreglo de eventos
  const nuevoEvento = {
    nombre: nombreEvento,
    tareas: []
  };

  eventos.push(nuevoEvento);
  eventoInput.value = '';

  // Llamar a la función para renderizar los eventos en la página
  renderizarEventos();
}

// Función para agregar una nueva tarea a un evento específico
function agregarTarea(eventoIndex) {
  // Solicitar al usuario que ingrese el nombre de la nueva tarea
  const tareaInput = prompt('Ingrese la nueva tarea:');
  const tareaInput2 = prompt('holaa')
  if (tareaInput) {
    // Agregar la nueva tarea al evento seleccionado
    eventos[eventoIndex].tareas.push({
      nombre: tareaInput,
      completa: false,

    });
    // Actualizar la interfaz después de agregar la tarea
    renderizarEventos();
  }
}

// Función para marcar una tarea como completada
function completarTarea(eventoIndex, tareaIndex) {
  eventos[eventoIndex].tareas[tareaIndex].completa = true;
  // Actualizar la interfaz después de marcar la tarea como completada
  renderizarEventos();
}

// Función para renderizar los eventos y sus tareas en la página
function renderizarEventos() {
  const eventList = document.getElementById('eventList');
  eventList.innerHTML = ''; // Limpiar la lista antes de volver a renderizar

  // Iterar sobre todos los eventos y crear elementos HTML correspondientes
  eventos.forEach((evento, eventoIndex) => {
    const eventoElement = document.createElement('li');
    eventoElement.textContent = evento.nombre;

    // Iterar sobre las tareas del evento actual y crear elementos para cada tarea
    evento.tareas.forEach((tarea, tareaIndex) => {
      const tareaElement = document.createElement('div');
      tareaElement.textContent = tarea.nombre;

      // Agregar una clase CSS según si la tarea está completada o no
      if (tarea.completa) {
        tareaElement.classList.add('completed');
      }

      // Agregar un listener para marcar la tarea como completada al hacer clic en ella
      tareaElement.addEventListener('click', () => completarTarea(eventoIndex, tareaIndex));
      eventoElement.appendChild(tareaElement);
    });

    // Crear un botón para agregar una nueva tarea al evento actual
    const nuevaTareaButton = document.createElement('button');
    nuevaTareaButton.textContent = 'Agregar Descripciones';
    nuevaTareaButton.addEventListener('click', () => agregarTarea(eventoIndex));

    eventoElement.appendChild(nuevaTareaButton);

    // Agregar el elemento del evento a la lista principal de eventos
    eventList.appendChild(eventoElement);
  });
}

// Al cargar la página, intentar cargar eventos desde almacenamiento local si existen
document.addEventL