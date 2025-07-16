/* ─────────────  VARIABLES GLOBALES  ───────────── */
let progresoTest = 0;
const totalPreguntas = 10;

// Mapeo de personajes a sus datos completos
const personajesData = {
    'light': {
        nombre: 'Light Yagami',
        imagen: 'Principal/assets/images/Personajes/LightYagami.jpg',
        descripcion: 'Eres un estratega nato con una fuerte convicción en tu propio sentido de la justicia. No temes tomar decisiones difíciles y estás dispuesto a asumir grandes responsabilidades para lograr tus objetivos.',
        tags: ['Estratega', 'Decidido', 'Carismático', 'Manipulador']
    },
    'l': {
        nombre: 'L Lawliet',
        imagen: 'Principal/assets/images/Personajes/L-Lawliet.jpg',
        descripcion: 'Tienes una mente analítica excepcional y un enfoque único para resolver problemas. Eres observador, metódico y no te dejas influenciar fácilmente por las opiniones de los demás.',
        tags: ['Analítico', 'Observador', 'Excéntrico', 'Lógico']
    },
    'near': {
        nombre: 'Near',
        imagen: 'Principal/assets/images/Personajes/Near.jpg',
        descripcion: 'Eres extremadamente inteligente y analítico, con una gran capacidad para ver patrones donde otros no los ven. Prefieres trabajar en equipo y tomar decisiones basadas en la lógica pura.',
        tags: ['Inteligente', 'Metódico', 'Paciente', 'Estratégico']
    },
    'mello': {
        nombre: 'Mello',
        imagen: 'Principal/assets/images/Personajes/Mello.jpg',
        descripcion: 'Eres apasionado y determinado, dispuesto a tomar riesgos que otros no tomarían. Tu enfoque directo y tu voluntad de hacer lo que sea necesario te convierten en una fuerza a tener en cuenta.',
        tags: ['Apasionado', 'Audaz', 'Impulsivo', 'Determinado']
    },
    'misa': {
        nombre: 'Misa Amane',
        imagen: 'Principal/assets/images/Personajes/Misa-Amane.jpg',
        descripcion: 'Eres leal y apasionada, dispuesta a hacer cualquier cosa por aquellos que amas. Tu corazón gobierna sobre tu mente, y aunque a veces puedes ser impulsiva, tus intenciones son siempre puras.',
        tags: ['Leal', 'Apasionada', 'Emocional', 'Devota']
    },
    'ryuk': {
        nombre: 'Ryuk',
        imagen: 'Principal/assets/images/Personajes/Ryuk.jpg',
        descripcion: 'Eres un espíritu libre que busca entretenimiento y emoción en la vida. No te preocupas por las reglas convencionales y prefieres observar cómo se desarrollan los eventos que participar activamente en ellos.',
        tags: ['Curioso', 'Impredecible', 'Divertido', 'Observador']
    },
    'soichiro': {
        nombre: 'Soichiro Yagami',
        imagen: 'Principal/assets/images/Personajes/SoichiroYagami.jpg',
        descripcion: 'Eres una persona íntegra y de fuertes principios morales. Crees en la justicia y en hacer lo correcto, incluso cuando es difícil. Tu sentido del deber y tu compasión te convierten en un líder natural.',
        tags: ['Íntegro', 'Justo', 'Compasivo', 'Responsable']
    }
};

/* ─────────────  ABRIR TEST  ───────────── */
function abrirTestPersonalidad() {
    // Verificar si el usuario está autenticado
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (!currentUser) {
        // Si no está autenticado, redirigir al login con un mensaje
        Swal.fire({
            title: 'Inicia sesión',
            text: 'Debes iniciar sesión para realizar el test de personalidad.',
            icon: 'info',
            confirmButtonText: 'Ir al login',
            showCancelButton: true,
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = '/Principal/login/';
            }
        });
        return;
    }
    
    // Si está autenticado, mostrar el test
    Swal.fire({
        title: '¿Estás listo?',
        text: 'El test tiene 10 preguntas. ¿Quieres empezar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, comenzar',
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#d4af37',
        cancelButtonColor: '#666',
        background: '#1a1a1a',
        color: '#fff'
    }).then(result => {
        if (!result.isConfirmed) return; // Usuario canceló

        // Mostrar el popup del test
        const testPopup = document.getElementById('testPopup');
        testPopup.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Actualizar el título con el nombre de usuario
        document.querySelector('.popup-title').textContent =
            `Test de Personalidad Death Note - ${currentUser.username}`;
        
        console.log('Test iniciado por:', currentUser.username);
    });
}

/* ─────────────  CERRAR TEST  ───────────── */
function cerrarTestPersonalidad() {
    const testPopup = document.getElementById('testPopup');
    const successMessage = document.getElementById('successMessage');
    const personalityTest = document.getElementById('personalityTest');

    // Cerrar el popup
    testPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Ocultar mensaje de éxito si está visible
    if (successMessage) {
        successMessage.style.display = 'none';
    }
    
    // Resetear el formulario
    if (personalityTest) {
        personalityTest.reset();
    }
    
    // Resetear progreso
    progresoTest = 0;

    // Resetear estilos visuales
    document.querySelectorAll('.option label').forEach(label => {
        label.style.backgroundColor = '';
        label.style.color = '';
    });
    
    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.style.background = 'linear-gradient(90deg, #d4af37 0%, #333 0%)';
        submitBtn.style.transform = 'scale(1)';
        submitBtn.textContent = 'Continuar (0/10)';
    }

    console.log('Test de personalidad cerrado');
}

    /* ─────────────  PROGRESO  ───────────── */
    function actualizarProgreso() {
    const preguntas = Array.from({ length: 10 }, (_, i) => `q${i + 1}`);
    const respondidas = preguntas.filter(q =>
    document.querySelector(`input[name="${q}"]:checked`));
    progresoTest = respondidas.length / totalPreguntas * 100;

    const submitBtn = document.querySelector('.submit-btn');
    if (progresoTest === 100) {
    submitBtn.style.backgroundColor = '#8B0000';
    submitBtn.style.transform = 'scale(1.05)';
} else {
    submitBtn.style.backgroundColor = '#666';
    submitBtn.style.transform = 'scale(1)';
}
    console.log(`Progreso del test: ${progresoTest.toFixed(0)}%`);
}

    /* ─────────────  SELECCIONAR OPCIÓN  ───────────── */
    function seleccionarOpcion(id) {
    const input  = document.getElementById(id);
    const label  = document.querySelector(`label[for="${id}"]`);
    input.checked = true;

    /* Estilo seleccionado */
    label.style.backgroundColor = '#8B0000';
    label.style.color = '#e0c48b';

    /* Reset otros labels del grupo */
    const grupo = id.slice(0, 2); // "q1", "q2"...
    document.querySelectorAll(`input[name="${grupo}"]`).forEach(op => {
    if (op.id !== id) {
    const l = document.querySelector(`label[for="${op.id}"]`);
    l.style.backgroundColor = '';
    l.style.color = '';
}
});

    actualizarProgreso();
    console.log('Opción seleccionada:', id);
}

    /* ─────────────  PROCESAR RESULTADO  ───────────── */
    function procesarResultadoTest(e) {
    e.preventDefault();
    
    // Verificar si el usuario está autenticado
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    if (!currentUser) {
        cerrarTestPersonalidad();
        abrirTestPersonalidad(); // Esto mostrará el mensaje de inicio de sesión
        return;
    }
    
    // Obtener respuestas
    const respuestas = {};
    for (let i = 1; i <= 10; i++) {
        const seleccionada = document.querySelector(`input[name="q${i}"]:checked`);
        if (seleccionada) {
            respuestas[`p${i}`] = seleccionada.value;
        } else {
            // Si falta alguna respuesta, mostrar error
            Swal.fire({
                title: '¡Faltan respuestas!',
                text: 'Por favor, responde todas las preguntas para ver tu resultado.',
                icon: 'warning',
                confirmButtonText: 'Entendido',
                confirmButtonColor: '#d4af37',
                background: '#1a1a1a',
                color: '#fff'
            });
            return;
        }
    }
    
    // Contar respuestas
    const conteo = {};
    Object.values(respuestas).forEach(respuesta => {
        conteo[respuesta] = (conteo[respuesta] || 0) + 1;
    });
    
    // Encontrar el personaje con más coincidencias
    let personajeKey = Object.keys(conteo).reduce((a, b) => 
        conteo[a] > conteo[b] ? a : b
    );
    
    // Obtener datos del personaje
    const personaje = personajesData[personajeKey] || personajesData['light'];
    
    // Guardar resultado en el perfil del usuario
    guardarResultadoTest(personajeKey, personaje.nombre, Object.keys(respuestas).length);
    
    // Mostrar resultado
    mostrarResultado(personajeKey);
}

/* ─────────────  GUARDAR RESULTADO  ───────────── */
function guardarResultadoTest(personajeKey, personajeNombre, puntuacion) {
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
            testType: 'personality',
            character: personajeNombre,
            characterKey: personajeKey,
            date: new Date().toISOString(),
            score: puntuacion
        };
        
        // Agregar al inicio del array
        users[userIndex].testResults.unshift(testResult);
        
        // Actualizar localStorage
        localStorage.setItem('deathNoteUsers', JSON.stringify(users));
        
        // Actualizar sesión
        sessionStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
        
        console.log('Resultado del test guardado:', testResult);
    }
}

    /* ─────────────  MOSTRAR RESULTADO  ───────────── */
    function mostrarResultado(personajeKey) {
    // Obtener datos del personaje
    const personaje = personajesData[personajeKey] || personajesData['light'];
    
    // Crear HTML del resultado
    const resultadoHTML = `
        <div class="resultado-personaje">
            <div class="resultado-header">
                <img src="${personaje.imagen}" alt="${personaje.nombre}" class="resultado-imagen">
                <h3 class="resultado-titulo">¡Eres ${personaje.nombre}!</h3>
            </div>
            <div class="resultado-caracteristicas">
                ${personaje.tags.map(tag => `<span class="caracteristica-tag">${tag}</span>`).join('')}
            </div>
            <p class="resultado-descripcion">${personaje.descripcion}</p>
            <div class="resultado-acciones">
                <button class="btn-compartir" onclick="compartirResultado('${personajeKey}')">
                    <i class="fas fa-share-alt"></i> Compartir
                </button>
                <button class="btn-reiniciar" onclick="reiniciarTest()">
                    <i class="fas fa-redo"></i> Hacer otro test
                </button>
                <a href="Principal/dashboard/index.html" class="btn-dashboard">
                    <i class="fas fa-tachometer-alt"></i> Ver en Dashboard
                </a>
            </div>
        </div>
    `;

    // Mostrar el resultado
    const resultadoContainer = document.getElementById('resultadoPersonaje');
    if (resultadoContainer) {
        resultadoContainer.innerHTML = resultadoHTML;
        resultadoContainer.style.display = 'block';
        
        // Desplazarse al resultado
        resultadoContainer.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Mostrar mensaje de éxito
    const successMessage = document.getElementById('successMessage');
    if (successMessage) {
        successMessage.style.display = 'block';
    }
    
    // Cerrar automáticamente después de 5 segundos y redirigir al dashboard
    setTimeout(() => {
        cerrarTestPersonalidad();
        window.location.href = '/Principal/dashboard/';
    }, 5000);
}

    function reiniciarTest() {
    const form = document.getElementById('personalityTest');
    const successMessage = document.getElementById('successMessage');
    
    if (form) form.reset();
    if (successMessage) successMessage.style.display = 'none';
    
    progresoTest = 0;
    actualizarProgreso();
    
    // Desplazarse al inicio del formulario
    const testPopup = document.getElementById('testPopup');
    if (testPopup) {
        testPopup.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

    /* ─────────────  COMPARTIR RESULTADO  ───────────── */
    function compartirResultado(personajeKey) {
    const personaje = personajesData[personajeKey] || personajesData['light'];
    const url = window.location.href.split('?')[0];
    const titulo = `¡Soy ${personaje.nombre} en el test de Death Note!`;
    const texto = `Acabo de descubrir que mi personalidad se parece a la de ${personaje.nombre} en Death Note. ${personaje.descripcion.split('. ')[0]}.`;
    const hashtags = 'DeathNote,TestDePersonalidad' + (personaje.nombre ? ',' + personaje.nombre.replace(/\s+/g, '') : '');
    
    const textoCompartir = `${titulo}\n\n${texto}\n\n${url} #${hashtags.replace(/,/g, ' #')}`;

    // Verificar si el navegador soporta la API de Web Share
    if (navigator.share) {
        navigator.share({
            title: titulo,
            text: texto,
            url: url
        }).catch(err => {
            console.error('Error al compartir:', err);
            copiarAlPortapapeles(textoCompartir);
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        copiarAlPortapapeles(textoCompartir);
    }
}

    /* ─────────────  COPIAR AL PORTAPAPELES  ───────────── */
    function copiarAlPortapapeles(texto) {
    // Crear un elemento de texto temporal
    const elementoTemp = document.createElement('textarea');
    elementoTemp.value = texto;
    document.body.appendChild(elementoTemp);
    
    // Seleccionar y copiar el texto
    elementoTemp.select();
    document.execCommand('copy');
    
    // Eliminar el elemento temporal
    document.body.removeChild(elementoTemp);
    
    // Mostrar notificación
    const notificacion = document.createElement('div');
    notificacion.textContent = '¡Resultado copiado al portapapeles!';
    notificacion.style.position = 'fixed';
    notificacion.style.bottom = '20px';
    notificacion.style.left = '50%';
    notificacion.style.transform = 'translateX(-50%)';
    notificacion.style.backgroundColor = '#d4af37';
    notificacion.style.color = '#000';
    notificacion.style.padding = '10px 20px';
    notificacion.style.borderRadius = '5px';
    notificacion.style.zIndex = '1000';
    notificacion.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
    document.body.appendChild(notificacion);
    
    // Eliminar la notificación después de 3 segundos
    setTimeout(() => {
        if (document.body.contains(notificacion)) {
            document.body.removeChild(notificacion);
        }
    }, 3000);
}
