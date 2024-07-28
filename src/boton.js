let botonesCreados = false;

function crearBotones() {
    const contenedor = document.getElementById('contenedorBotones');
    contenedor.innerHTML = ''; // Limpiar el contenedor antes de agregar botones

    for (let i = 1; i <= 5; i++) {
        const nuevoBoton = document.createElement('button');
        nuevoBoton.textContent = `Botón ${i}`;
        nuevoBoton.className = 'boton-dinamico'; // Agregar clase para el estilo
        nuevoBoton.onclick = function() {
            alert(`Has hecho clic en el Botón ${i}`);
        };
        contenedor.appendChild(nuevoBoton);
    }
    botonesCreados = true;
}

document.getElementById('toggleBotones').onclick = function() {
    const contenedor = document.getElementById('contenedorBotones');
    if (!botonesCreados) {
        crearBotones(); // Crear botones solo la primera vez
    }
    // Alternar la visibilidad del contenedor
    if (contenedor.style.display === 'none' || contenedor.style.display === '') {
        contenedor.style.display = 'block'; // Mostrar botones
        this.textContent = 'Ocultar Botones'; // Cambiar texto del botón
    } else {
        contenedor.style.display = 'none'; // Ocultar botones
        this.textContent = 'Mostrar Botones'; // Cambiar texto del botón
    }
};