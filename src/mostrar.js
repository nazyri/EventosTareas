        // Crear botones dinámicamente
        function crearBotones() {
            const contenedor = document.getElementById('contenedorBotones');
            for (let i = 1; i <= 5; i++) {
                const nuevoBoton = document.createElement('button');
                nuevoBoton.textContent = `Botón ${i}`;
                nuevoBoton.onclick = function() {
                    alert(`Has hecho clic en el Botón ${i}`);
                };
                contenedor.appendChild(nuevoBoton);
            }
        }

        // Agregar evento al botón "Mostrar Botones"
        document.getElementById('mostrarBotones').onclick = function() {
            crearBotones();
        };