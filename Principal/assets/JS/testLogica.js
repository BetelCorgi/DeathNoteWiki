// Test de Lógica - Death Note

// Datos del test
const logicaTest = {
    titulo: "Test de Lógica al Estilo Death Note",
    descripcion: "Pon a prueba tu capacidad de razonamiento lógico con estos acertijos inspirados en Death Note.",
    preguntas: [
        {
            pregunta: "Si Kira mata a criminales y L está investigando a Kira, ¿qué harías si descubrieras que tu mejor amigo es Kira?",
            opciones: [
                { texto: "Lo entregaría a las autoridades", valor: "entregar" },
                { texto: "Trataría de convencerlo de que se detenga", valor: "convencer" },
                { texto: "No haría nada, es mi amigo", valor: "nada" },
                { texto: "Investigaría más antes de decidir", valor: "investigar" }
            ],
            tipo: "logica"
        },
        {
            pregunta: "Si tuvieras una Death Note y supieras que el 90% de los criminales reinciden, ¿qué harías?",
            opciones: [
                { texto: "Escribiría los nombres de los criminales más peligrosos", valor: "peligrosos" },
                { texto: "No la usaría, es inmoral", valor: "no_usar" },
                { texto: "La usaría solo en casos extremos", valor: "casos_extremos" },
                { texto: "Buscaría otra solución para la justicia", valor: "otra_solucion" }
            ],
            tipo: "logica"
        },
        {
            pregunta: "Si fueras L y tuvieras un 80% de certeza de que alguien es Kira, ¿qué harías?",
            opciones: [
                { texto: "Lo atraparía de inmediato", valor: "atrapar" },
                { texto: "Esperaría tener más pruebas", valor: "esperar" },
                { texto: "Lo vigilaría de cerca", valor: "vigilar" },
                { texto: "Lo atraparía y luego buscaría pruebas", valor: "atrapar_despues" }
            ],
            tipo: "logica"
        },
        {
            pregunta: "¿Qué harías si descubrieras que tu padre es Kira?",
            opciones: [
                { texto: "Lo entregaría a la justicia", valor: "entregar" },
                { texto: "Trataría de ayudarlo a cambiar", valor: "ayudar" },
                { texto: "No haría nada", valor: "nada" },
                { texto: "Lo confrontaría directamente", valor: "confrontar" }
            ],
            tipo: "logica"
        },
        {
            pregunta: "Si tuvieras que elegir entre salvar a una persona inocente o a 10 criminales, ¿qué harías?",
            opciones: [
                { texto: "Salvar a la persona inocente", valor: "inocente" },
                { texto: "Salvar a los 10 criminales", valor: "criminales" },
                { texto: "No salvar a nadie", valor: "nadie" },
                { texto: "Buscar una forma de salvarlos a todos", valor: "todos" }
            ],
            tipo: "logica"
        }
    ]
};

// Variables globales
let respuestasLogica = [];
let preguntaActualLogica = 0;

// Función para abrir el test de lógica
function abrirTestLogica() {
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
    respuestasLogica = [];
    preguntaActualLogica = 0;

    // Mostrar el popup del test
    const popup = document.getElementById('testLogicaPopup');
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        mostrarPreguntaLogica();
    }
}

// Función para cerrar el test de lógica
function cerrarTestLogica() {
    const popup = document.getElementById('testLogicaPopup');
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Función para mostrar la pregunta actual de lógica
function mostrarPreguntaLogica() {
    const preguntaContainer = document.getElementById('preguntaLogicaContainer');
    if (!preguntaContainer || preguntaActualLogica >= logicaTest.preguntas.length) {
        // Si no hay más preguntas, mostrar resultados
        mostrarResultadoLogica();
        return;
    }

    const pregunta = logicaTest.preguntas[preguntaActualLogica];
    let html = `
        <h3>${pregunta.pregunta}</h3>
        <div class="opciones-test">
    `;

    pregunta.opciones.forEach((opcion, index) => {
        html += `
            <div class="opcion" onclick="seleccionarOpcionLogica(${index}, '${opcion.valor}')">
                <input type="radio" name="opcion-logica" id="opcion-logica-${index}" value="${opcion.valor}">
                <label for="opcion-logica-${index}">${opcion.texto}</label>
            </div>
        `;
    });

    html += `
        </div>
        <div class="controles-test">
            <button onclick="siguientePreguntaLogica()" class="btn-siguiente" disabled id="btnSiguienteLogica">
                ${preguntaActualLogica === logicaTest.preguntas.length - 1 ? 'Ver resultados' : 'Siguiente'}
            </button>
        </div>
        <div class="progreso-test">
            Pregunta ${preguntaActualLogica + 1} de ${logicaTest.preguntas.length}
        </div>
    `;

    preguntaContainer.innerHTML = html;
}

// Función para seleccionar una opción en el test de lógica
function seleccionarOpcionLogica(index, valor) {
    // Marcar la opción seleccionada
    const opciones = document.querySelectorAll('#preguntaLogicaContainer .opcion');
    opciones.forEach((opcion, i) => {
        if (i === index) {
            opcion.classList.add('seleccionada');
            opcion.querySelector('input').checked = true;
        } else {
            opcion.classList.remove('seleccionada');
        }
    });

    // Habilitar el botón de siguiente
    document.getElementById('btnSiguienteLogica').disabled = false;

    // Guardar la respuesta del usuario
    respuestasLogica[preguntaActualLogica] = valor;
}

// Función para pasar a la siguiente pregunta de lógica
function siguientePreguntaLogica() {
    // Verificar si se seleccionó una opción
    if (respuestasLogica[preguntaActualLogica] === undefined) {
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
    preguntaActualLogica++;
    if (preguntaActualLogica < logicaTest.preguntas.length) {
        mostrarPreguntaLogica();
    } else {
        mostrarResultadoLogica();
    }
}

// Función para mostrar el resultado del test de lógica
function mostrarResultadoLogica() {
    const preguntaContainer = document.getElementById('preguntaLogicaContainer');
    if (!preguntaContainer) return;

    // Analizar respuestas
    let perfil = analizarPerfilLogico(respuestasLogica);

    // Guardar el resultado
    guardarResultadoLogica(perfil);

    // Mostrar resultado
    preguntaContainer.innerHTML = `
        <div class="resultado-test">
            <h3>¡Test de Lógica completado!</h3>
            <div class="perfil-logico">
                <h4>Tu perfil lógico es:</h4>
                <div class="perfil-titulo">${perfil.titulo}</div>
                <p class="perfil-descripcion">${perfil.descripcion}</p>
                <div class="caracteristicas">
                    <h5>Características principales:</h5>
                    <ul>
                        ${perfil.caracteristicas.map(c => `<li>${c}</li>`).join('')}
                    </ul>
                </div>
            </div>
            <div class="acciones-resultado">
                <button onclick="cerrarTestLogica()" class="btn-volver">Volver al inicio</button>
                <button onclick="location.reload()" class="btn-repetir">Repetir test</button>
            </div>
        </div>
    `;
}

// Función para analizar las respuestas y determinar el perfil lógico
function analizarPerfilLogico(respuestas) {
    // Contar la frecuencia de cada tipo de respuesta
    const frecuencias = {
        justiciero: 0,
        estratega: 0,
        moralista: 0,
        racional: 0
    };

    // Mapear respuestas a perfiles
    respuestas.forEach(respuesta => {
        switch(respuesta) {
            case 'entregar':
            case 'peligrosos':
            case 'atrapar':
                frecuencias.justiciero++;
                break;
            case 'investigar':
            case 'vigilar':
            case 'todos':
                frecuencias.estratega++;
                break;
            case 'convencer':
            case 'ayudar':
            case 'inocente':
                frecuencias.moralista++;
                break;
            case 'esperar':
            case 'casos_extremos':
            case 'otra_solucion':
                frecuencias.racional++;
                break;
        }
    });

    // Determinar el perfil con mayor frecuencia
    let perfil = 'estratega';
    let maxFrecuencia = frecuencias.estratega;

    if (frecuencias.justiciero > maxFrecuencia) {
        perfil = 'justiciero';
        maxFrecuencia = frecuencias.justiciero;
    }
    if (frecuencias.moralista > maxFrecuencia) {
        perfil = 'moralista';
        maxFrecuencia = frecuencias.moralista;
    }
    if (frecuencias.racional > maxFrecuencia) {
        perfil = 'racional';
    }

    // Devolver el perfil correspondiente
    const perfiles = {
        justiciero: {
            titulo: 'El Justiciero',
            descripcion: 'Crees firmemente en la justicia y estás dispuesto a tomar medidas drásticas para lograrla. No temes tomar decisiones difíciles si crees que es lo correcto.',
            caracteristicas: [
                'Tomas acción directa',
                'Crees en la justicia por encima de todo',
                'Eres decidido y valiente',
                'No temes asumir responsabilidades'
            ]
        },
        estratega: {
            titulo: 'El Estratega',
            descripcion: 'Eres metódico y analítico. Prefieres planear cuidadosamente tus movimientos y considerar todas las posibilidades antes de actuar.',
            caracteristicas: [
                'Analizas cuidadosamente cada situación',
                'Eres paciente y metódico',
                'Consideras múltiples perspectivas',
                'Planificas con anticipación'
            ]
        },
        moralista: {
            titulo: 'El Moralista',
            descripcion: 'Tus decisiones están guiadas por fuertes principios morales. Crees en la redención y en hacer lo correcto, incluso cuando es difícil.',
            caracteristicas: [
                'Sigues tus principios morales',
                'Crees en la redención',
                'Eres compasivo',
                'Valoras la vida humana por encima de todo'
            ]
        },
        racional: {
            titulo: 'El Racional',
            descripcion: 'Tomas decisiones basadas en la lógica y la razón. Evalúas fríamente cada situación y tomas la decisión más sensata posible.',
            caracteristicas: [
                'Tomas decisiones basadas en la lógica',
                'Eres objetivo y analítico',
                'Evitas dejarte llevar por las emociones',
                'Buscas soluciones prácticas'
            ]
        }
    };

    return perfiles[perfil] || perfiles.estratega;
}

// Función para guardar el resultado del test de lógica
function guardarResultadoLogica(perfil) {
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
            testType: 'logica',
            profile: perfil.titulo,
            profileType: perfil.tipo || 'estratega',
            date: new Date().toISOString(),
            description: perfil.descripcion,
            characteristics: perfil.caracteristicas
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
window.abrirTestLogica = abrirTestLogica;
window.cerrarTestLogica = cerrarTestLogica;
window.seleccionarOpcionLogica = seleccionarOpcionLogica;
window.siguientePreguntaLogica = siguientePreguntaLogica;
