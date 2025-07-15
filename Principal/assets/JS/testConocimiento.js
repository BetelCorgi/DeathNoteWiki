// Test de Conocimiento - Death Note

// Datos del test
const conocimientoTest = {
    titulo: "Test de Conocimiento de Death Note",
    descripcion: "Demuestra cuánto sabes sobre el mundo de Death Note con este test de conocimiento.",
    preguntas: [
        {
            pregunta: "¿Cuál es el verdadero nombre de L?",
            opciones: [
                { texto: "L Lawliet", valor: "l" },
                { texto: "Light Yagami", valor: "light" },
                { texto: "Near", valor: "near" },
                { texto: "Mihael Keehl", valor: "mello" }
            ],
            respuestaCorrecta: "l"
        },
        {
            pregunta: "¿Qué debe hacer el usuario de la Death Note para que alguien muera?",
            opciones: [
                { texto: "Escribir el nombre y apellido de la persona", valor: "nombre" },
                { texto: "Pensar en la cara de la persona", valor: "cara" },
                { texto: "Tocar a la persona", valor: "tocar" },
                { texto: "Ver a la persona en persona", valor: "ver" }
            ],
            respuestaCorrecta: "nombre"
        },
        {
            pregunta: "¿Quién es el Shinigami que deja caer la Death Note al mundo humano?",
            opciones: [
                { texto: "Ryuk", valor: "ryuk" },
                { texto: "Rem", valor: "rem" },
                { texto: "Sidoh", valor: "sidoh" },
                { texto: "Gelus", valor: "gelus" }
            ],
            respuestaCorrecta: "ryuk"
        },
        {
            pregunta: "¿Cuál es el nombre del detective que sucede a L en la investigación?",
            opciones: [
                { texto: "Near y Mello", valor: "near_mello" },
                { texto: "Light Yagami", valor: "light" },
                { texto: "Soichiro Yagami", valor: "soichiro" },
                { texto: "Touta Matsuda", valor: "matsuda" }
            ],
            respuestaCorrecta: "near_mello"
        },
        {
            pregunta: "¿Qué debe hacer el usuario de la Death Note para evitar ser atrapado por las cámaras?",
            opciones: [
                { texto: "Usar un alias", valor: "alias" },
                { texto: "Cambiar su escritura", valor: "escritura" },
                { texto: "Destruir las cámaras", valor: "destruir" },
                { texto: "Usar una máscara", valor: "mascara" }
            ],
            respuestaCorrecta: "alias"
        }
    ]
};

// Variables globales
let respuestasUsuario = [];
let preguntaActual = 0;
let puntuacion = 0;

// Función para abrir el test de conocimiento
function abrirTestConocimiento() {
    // Verificar si el usuario está autenticado
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        Swal.fire({
            title: 'Inicia sesión',
            text: 'Debes iniciar sesión para realizar el test.',
            icon: 'warning',
            confirmButtonText: 'Ir al login',
            confirmButtonColor: '#d4af37',
            background: '#1a1a1a',
            color: '#fff'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = 'Principal/login/';
            }
        });
        return;
    }

    // Inicializar variables
    respuestasUsuario = [];
    preguntaActual = 0;
    puntuacion = 0;

    // Mostrar el popup del test
    const popup = document.getElementById('testConocimientoPopup');
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        mostrarPregunta();
    }
}

// Función para cerrar el test de conocimiento
function cerrarTestConocimiento() {
    const popup = document.getElementById('testConocimientoPopup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Función para mostrar la pregunta actual
function mostrarPregunta() {
    const preguntaContainer = document.getElementById('preguntaConocimientoContainer');
    if (!preguntaContainer || preguntaActual >= conocimientoTest.preguntas.length) {
        // Si no hay más preguntas, mostrar resultados
        mostrarResultadoConocimiento();
        return;
    }

    const pregunta = conocimientoTest.preguntas[preguntaActual];
    let html = `
        <h3>${pregunta.pregunta}</h3>
        <div class="opciones-test">
    `;

    pregunta.opciones.forEach((opcion, index) => {
        html += `
            <div class="opcion" onclick="seleccionarOpcionConocimiento(${index}, '${opcion.valor}')">
                <input type="radio" name="opcion" id="opcion${index}" value="${opcion.valor}">
                <label for="opcion${index}">${opcion.texto}</label>
            </div>
        `;
    });

    html += `
        </div>
        <div class="controles-test">
            <button onclick="siguientePreguntaConocimiento()" class="btn-siguiente" disabled id="btnSiguienteConocimiento">
                ${preguntaActual === conocimientoTest.preguntas.length - 1 ? 'Ver resultados' : 'Siguiente'}
            </button>
        </div>
        <div class="progreso-test">
            Pregunta ${preguntaActual + 1} de ${conocimientoTest.preguntas.length}
        </div>
    `;

    preguntaContainer.innerHTML = html;
}

// Función para seleccionar una opción
function seleccionarOpcionConocimiento(index, valor) {
    // Marcar la opción seleccionada
    const opciones = document.querySelectorAll('.opcion');
    opciones.forEach((opcion, i) => {
        if (i === index) {
            opcion.classList.add('seleccionada');
            opcion.querySelector('input').checked = true;
        } else {
            opcion.classList.remove('seleccionada');
        }
    });

    // Habilitar el botón de siguiente
    document.getElementById('btnSiguienteConocimiento').disabled = false;

    // Guardar la respuesta del usuario
    respuestasUsuario[preguntaActual] = valor;
}

// Función para pasar a la siguiente pregunta
function siguientePreguntaConocimiento() {
    // Verificar si se seleccionó una opción
    if (respuestasUsuario[preguntaActual] === undefined) {
        Swal.fire({
            title: 'Selecciona una opción',
            text: 'Por favor, selecciona una respuesta para continuar.',
            icon: 'warning',
            confirmButtonColor: '#d4af37',
            background: '#1a1a1a',
            color: '#fff'
        });
        return;
    }

    // Pasar a la siguiente pregunta
    preguntaActual++;
    if (preguntaActual < conocimientoTest.preguntas.length) {
        mostrarPregunta();
    } else {
        // Calcular puntuación
        for (let i = 0; i < conocimientoTest.preguntas.length; i++) {
            if (respuestasUsuario[i] === conocimientoTest.preguntas[i].respuestaCorrecta) {
                puntuacion++;
            }
        }
        mostrarResultadoConocimiento();
    }
}

// Función para mostrar el resultado del test
function mostrarResultadoConocimiento() {
    const preguntaContainer = document.getElementById('preguntaConocimientoContainer');
    if (!preguntaContainer) return;

    const porcentaje = Math.round((puntuacion / conocimientoTest.preguntas.length) * 100);
    let nivel = '';
    let mensaje = '';

    if (porcentaje >= 90) {
        nivel = 'Experto en Death Note';
        mensaje = '¡Increíble! Eres un verdadero experto en Death Note. Conoces hasta el más mínimo detalle de la serie.';
    } else if (porcentaje >= 70) {
        nivel = 'Gran conocedor';
        mensaje = '¡Excelente! Tienes un gran conocimiento sobre Death Note, pero aún hay algunos detalles que podrías aprender.';
    } else if (porcentaje >= 50) {
        nivel = 'Conocimiento medio';
        mensaje = 'Buen trabajo. Tienes un conocimiento básico de la serie, pero hay mucho más por descubrir.';
    } else if (porcentaje >= 30) {
        nivel = 'Principiante';
        mensaje = 'Has visto la serie, pero te falta profundizar más en los detalles de la trama y los personajes.';
    } else {
        nivel = 'Nuevo en Death Note';
        mensaje = 'Parece que eres nuevo en el mundo de Death Note. ¡Es el momento perfecto para ver la serie y aprender más!';
    }

    // Guardar el resultado en el perfil del usuario
    guardarResultadoConocimiento(porcentaje, nivel);

    // Mostrar resultado
    preguntaContainer.innerHTML = `
        <div class="resultado-test">
            <h3>¡Test completado!</h3>
            <div class="puntuacion">
                <div class="puntuacion-numero">${puntuacion}/${conocimientoTest.preguntas.length}</div>
                <div class="puntuacion-porcentaje">${porcentaje}%</div>
                <div class="nivel">${nivel}</div>
            </div>
            <p class="mensaje-resultado">${mensaje}</p>
            <div class="acciones-resultado">
                <button onclick="cerrarTestConocimiento()" class="btn-volver">Volver al inicio</button>
                <button onclick="location.reload()" class="btn-repetir">Repetir test</button>
            </div>
        </div>
    `;
}

// Función para guardar el resultado del test de conocimiento
function guardarResultadoConocimiento(puntuacion, nivel) {
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) return;

    // Obtener usuarios del localStorage
    const users = JSON.parse(localStorage.getItem('deathNoteUsers')) || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    
    if (userIndex !== -1) {
        // Inicializar testResults si no existe
        if (!users[userIndex].testResults) {
            users[userIndex].testResults = [];
        }
        
        // Crear nuevo resultado de test
        const testResult = {
            testType: 'conocimiento',
            score: puntuacion,
            level: nivel,
            date: new Date().toISOString(),
            totalQuestions: conocimientoTest.preguntas.length,
            correctAnswers: puntuacion,
            timeSpent: '--' // Agregamos un valor por defecto para timeSpent
        };
        
        // Agregar al inicio del array
        users[userIndex].testResults.unshift(testResult);
        
        // Actualizar localStorage
        localStorage.setItem('deathNoteUsers', JSON.stringify(users));
        
        // Actualizar sesión
        sessionStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        
        // Disparar evento para actualizar el dashboard
        window.dispatchEvent(new Event('testCompleted'));
    }
}

// Asegurar que las funciones estén disponibles globalmente
window.abrirTestConocimiento = abrirTestConocimiento;
window.cerrarTestConocimiento = cerrarTestConocimiento;
window.seleccionarOpcionConocimiento = seleccionarOpcionConocimiento;
window.siguientePreguntaConocimiento = siguientePreguntaConocimiento;
