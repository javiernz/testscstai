let preguntas = [];
let preguntaActual = null;

// Cargar JSON
fetch('preguntas.json')
    .then(res => res.json())
    .then(data => {
        preguntas = mezclarArray(data.preguntas);
        mostrarPregunta();
    });

// Barajar array (Fisher-Yates)
function mezclarArray(array) {
    return array.sort(() => Math.random() - 0.5);
}

function mostrarPregunta() {
    document.getElementById("siguiente").disabled = true;

    // Volver a mezclar preguntas en cada carga
    preguntas = mezclarArray(preguntas);
    preguntaActual = preguntas[0];

    document.getElementById("pregunta").textContent = preguntaActual.pregunta;

    const formulario = document.getElementById("formulario");
    formulario.innerHTML = "";

    let opciones = preguntaActual.respuestas.map((texto, index) => ({
        texto,
        numero: index + 1
    }));

    opciones = mezclarArray(opciones);

    opciones.forEach(opcion => {
        const label = document.createElement("label");
        label.classList.add("opcion");

        label.innerHTML = `
            <input type="radio" name="respuesta" value="${opcion.numero}">
            ${opcion.texto}
        `;

        formulario.appendChild(label);
    });

    formulario.addEventListener("change", comprobarRespuesta, { once: true });
}

function comprobarRespuesta() {
    const seleccionada = document.querySelector('input[name="respuesta"]:checked');
    const opciones = document.querySelectorAll(".opcion");

    opciones.forEach(opcion => {
        const input = opcion.querySelector("input");
        input.disabled = true;

        if (parseInt(input.value) === preguntaActual.correcta) {
            opcion.classList.add("correcta");
        }
        if (input.checked && parseInt(input.value) !== preguntaActual.correcta) {
            opcion.classList.add("incorrecta");
        }
    });

    document.getElementById("siguiente").disabled = false;
}

document.getElementById("siguiente").addEventListener("click", mostrarPregunta);
