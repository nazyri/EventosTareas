// Función para agregar una nueva tarea a un evento específico
function agregarTarea(eventoIndex) {
    // Solicitar al usuario que ingrese el nombre de la nueva tarea y la descripción
    const tareaInput = prompt('Ingrese el nombre de la nueva tarea:');
    const descripcionInput = prompt('Ingrese la descripción de la tarea:');
  
    if (tareaInput) {
      // Agregar la nueva tarea al evento seleccionado
      eventos[eventoIndex].tareas.push({
        nombre: tareaInput,
        descripcion: descripcionInput
      });
  
      // Actualizar la interfaz después de agregar la tarea
      renderizarEventos();
    }
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
        tareaElement.classList.add('task');
  
        // Crear el contenido de la tarea (nombre y descripción si existe)
        const contenidoTarea = document.createElement('div');
        contenidoTarea.textContent = tarea.nombre;
  
        // Si hay descripción, agregarla y expandir el cuadro de la tarea
        if (tarea.descripcion) {
          const descripcionElement = document.createElement('div');
          descripcionElement.textContent = tarea.descripcion;
          descripcionElement.classList.add('task-description');
          contenidoTarea.appendChild(descripcionElement);
          tareaElement.classList.add('expand');
        }
  
        tareaElement.appendChild(contenidoTarea);
  
        // Agregar un listener para marcar la tarea como completada al hacer clic en ella
        tareaElement.addEventListener('click', () => completarTarea(eventoIndex, tareaIndex));
  
        eventoElement.appendChild(tareaElement);
      });
  
      // Crear un botón para agregar una nueva tarea al evento actual
      const nuevaTareaButton = document.createElement('button');
      nuevaTareaButton.textContent = 'Agregar Descripción';
      nuevaTareaButton.addEventListener('click', () => agregarTarea(eventoIndex));
  
      eventoElement.appendChild(nuevaTareaButton);
  
      // Agregar el elemento del evento a la lista principal de eventos
      eventList.appendChild(eventoElement);
    });
  }
  
  // Al cargar la página, intentar cargar eventos desde almacenamiento local si existen
  document.addEventListener('DOMContentLoaded', () => {
    // Lógica para cargar eventos desde almacenamiento local si es necesario
  });
  
  