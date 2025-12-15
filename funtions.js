    // Array de preguntas y respuestas
    var preguntas = 
    [  

    {    
        pregunta: "1. La Constitución Española de 1978, debida a una iniciativa parlamentaria, fue elaborada y aprobada por las Cortes formadas como resultado de las Elecciones Generales del 15 de junio de 1977. De las siguientes fechas, señala la que corresponde con la publicación del citado texto en el Boletín Oficial del Estado.",
        respuestas: [    
        "6 de diciembre de 1978.",
        "31 de octubre de 1978.", 
        "27 de diciembre de 1978.", 
        "29 de diciembre de 1978."], 
        respuestaCorrecta: 3
    }
    ]


    // Función para crear el formulario de la pregunta actual
    function crearFormulario(pregunta) {
        var preguntaContainer = document.getElementById('pregunta-container');
        preguntaContainer.innerHTML = ''; // Limpiar el contenido del contenedor

        // Crear elemento de pregunta
        var preguntaElement = document.createElement('p');
        preguntaElement.textContent = pregunta.pregunta;
        preguntaContainer.appendChild(preguntaElement);

        // Crear elementos de opciones de respuesta
        const respuestasMezcladas = mezclarRespuestas(
            pregunta.respuestas,
            pregunta.respuestaCorrecta
        );

        // Actualizamos el índice de la correcta tras mezclar
        pregunta.respuestaCorrecta = respuestasMezcladas.findIndex(r => r.esCorrecta);

        // Letras A-B-C-D
        const abcd = ['A', 'B', 'C', 'D'];

        pregunta.respuestaCorrecta = respuestasMezcladas.findIndex(r => r.esCorrecta);

        respuestasMezcladas.forEach(function(respuesta, index) {

            var radioLabel = document.createElement('label');
            var radioInput = document.createElement('input');

            radioInput.setAttribute('class', 'form-check-input');
            radioInput.type = 'radio';
            radioInput.name = 'respuesta';
            radioInput.value = index;

            radioLabel.setAttribute('class', 'form-check-label m-3');
            radioLabel.id = index;

            radioLabel.appendChild(radioInput);

            // 👉 Texto con letra A-B-C-D
            radioLabel.appendChild(
                document.createTextNode(` ${abcd[index]}. ${respuesta.texto}`)
            );

            preguntaContainer.appendChild(radioLabel);
            preguntaContainer.appendChild(document.createElement('br'));
        });
    }

    // Función para manejar el envío del formulario
    function handleSubmit(event) {
        event.preventDefault(); // Prevenir el envío por defecto del formulario

        var respuestaSeleccionada = document.querySelector('input[name="respuesta"]:checked');
        
        if (respuestaSeleccionada)
        {
            var respuestaUsuario = parseInt(respuestaSeleccionada.value); // Convertir el valor de la respuesta a entero
            verificarRespuesta(respuestaUsuario);
        } 
        else 
        {
            alert('Por favor selecciona una respuesta.');
        }
    }
    
    // Función para mezclar las respuestas
    function mezclarRespuestas(respuestas, correcta) {
    // Creamos un array de objetos para no perder la correcta
        let mezcladas = respuestas.map((texto, index) => ({
            texto,
        esCorrecta: index === correcta
        }));

        // Mezcla Fisher-Yates
        for (let i = mezcladas.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [mezcladas[i], mezcladas[j]] = [mezcladas[j], mezcladas[i]];
        }
    return mezcladas;
    }


    // Función para verificar la respuesta seleccionada por el usuario
    function verificarRespuesta(respuestaUsuario)
    {
        if (respuestaUsuario === preguntaActual.respuestaCorrecta)
        {
            // Si la respuesta es correcta, la pinta de verde
            document.getElementById(preguntaActual.respuestaCorrecta).classList.add('text-success', 'fw-bold');
        } 
        else
        {
            // Si la respuesta es incorrecta, la pinta de rojo
            document.getElementById(preguntaActual.respuestaCorrecta).classList.add('fw-bold');
            document.getElementById(respuestaUsuario).classList.add('text-danger', 'fw-bold');
        }
            // Intercambia los botones de respuesta y nueva
            document.getElementById('responder').classList.add('d-none');
            document.getElementById('nueva').classList.remove('d-none');
            
            // Pinta la respuesta de negrita
            document.getElementById(preguntaActual.respuestaCorrecta).classList.add('fw-bold');
    }

    // Obtener una pregunta aleatoria
    var preguntaActual = preguntas[Math.floor(Math.random() * preguntas.length)];

    // Crear el formulario con la pregunta actual
    crearFormulario(preguntaActual);

    // Agregar un evento de escucha para el envío del formulario
    var formulario = document.getElementById('formulario');
    formulario.addEventListener('submit', handleSubmit);
    
    document.getElementById('nueva').onclick = function()
    { 
    	// Recarga la web con una nueva pregunta
        location.reload();
    };
