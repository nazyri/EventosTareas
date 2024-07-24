let agregar = document.getElementById("agregar");
let lista = document.getElementById("lista")
let tarea = document.getElementById("tarea");

let informacion = JSON.parse(localStorage.getItem("tareas")) || [];

function subir() {
    let tarea = document.getElementById("tarea");
    console.log(tarea.value);
    let evento = {
        tarea: tarea.value
    }
    if (evento.tarea.trim() === '') {
        alert('Por favor completa todos los campos.');
        return;
    }
    informacion.push(evento);
    localStorage.setItem("tareas", JSON.stringify(informacion));

    tarea.value = '';

    // alert("Tarea agregada exitosa!");
    ingresar()
}

agregar.addEventListener("click", subir);

function ingresar() {
    informacion.forEach(element => {
        let elementoLista = document.createElement('li')
        let boton = document.createElement('button')
        
        elementoLista.innerHTML = element.tarea
        boton.textContent = 'Descripcion'
                lista.appendChild(elementoLista)
                elementoLista.appendChild(boton)
    });

}

