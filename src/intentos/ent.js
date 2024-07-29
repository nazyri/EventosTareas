// Función para agregar un nuevo evento
function agregarEvento() {
    const eventoInput = document.getElementById('eventInput');
    const nombreEvento = eventoInput.value.trim();
  
    if (nombreEvento === '') {
      alert('Por favor, ingrese el nombre del evento.');
      return;
    }
  
    const nuevoEvento = {
      nombre: nombreEvento,
      tareas: []
    };
  
    eventos.push(nuevoEvento);
    eventoInput.value = '';
    
    // Guardar en localStorage después de agregar el evento
    guardarEventosEnLocalStorage();
  
    renderizarEventos();
  }
  
  // Función para agregar una nueva tarea a un evento específico
  function agregarTarea(eventoIndex) {
    const tareaInput = prompt('Ingrese la nueva tarea:');
    if (tareaInput) {
      eventos[eventoIndex].tareas.push({
        nombre: tareaInput
      });
  
      // Guardar en localStorage después de agregar la tarea
      guardarEventosEnLocalStorage();
  
      renderizarEventos();
    }
  }
  
  // Función para guardar eventos en localStorage
  function guardarEventosEnLocalStorage() {
    localStorage.setItem('eventos', JSON.stringify(eventos));
  }

  












//   // Al cargar la página, intentar cargar eventos desde almacenamiento local si existen
// document.addEventListener('DOMContentLoaded', () => {
//     const eventosGuardados = localStorage.getItem('eventos');
//     if (eventosGuardados) {
//       eventos = JSON.parse(eventosGuardados);
//       renderizarEventos();
//     }
//   });
  