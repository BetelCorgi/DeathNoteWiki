    // Variables globales para el progreso del test
    let progresoTest = 0;
    const totalPreguntas = 10;

    // Función para abrir test de personalidad (onclick)
    function abrirTestPersonalidad() {
    // Confirm antes de abrir el test
    const confirmar = confirm('¿Estás listo para descubrir qué personaje de Death Note eres? El test tiene 10 preguntas.');

    if (confirmar) {
    const testPopup = document.getElementById('testPopup');
    testPopup.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Prompt opcional para personalizar la experiencia
    const nombre = prompt('¿Cuál es tu nombre? (opcional)');
    if (nombre && nombre.trim() !== '') {
    const tituloTest = document.querySelector('.popup-title');
    tituloTest.textContent = `Test de Personalidad Death Note - ${nombre}`;
    console.log('Test iniciado por:', nombre);
}
}

    console.log('Popup del test abierto');
}

    // Función para cerrar el test de personalidad (onclick)
    function cerrarTestPersonalidad() {
    const testPopup = document.getElementById('testPopup');
    const successMessage = document.getElementById('successMessage');
    const personalityTest = document.getElementById('personalityTest');

    testPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
    successMessage.classList.remove('active');
    personalityTest.reset();
    progresoTest = 0;

    // Resetear título del test
    const tituloTest = document.querySelector('.popup-title');
    tituloTest.textContent = 'Test de Personalidad Death Note';

    // Resetear estilos de todas las opciones
    const labels = document.querySelectorAll('.option label');
    labels.forEach(label => {
    label.style.backgroundColor = '';
    label.style.color = '';
});

    // Resetear botón submit
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.style.backgroundColor = '#666';
    submitBtn.style.transform = 'scale(1)';

    console.log('Test de personalidad cerrado');
}

    // Función para actualizar progreso (onchange)
    function actualizarProgreso() {
    const preguntas = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];
    let preguntasRespondidas = 0;

    preguntas.forEach(pregunta => {
    const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
    if (respuesta) {
    preguntasRespondidas++;
}
});

    progresoTest = (preguntasRespondidas / totalPreguntas) * 100;
    console.log(`Progreso del test: ${progresoTest.toFixed(0)}%`);

    // Cambiar color del botón según el progreso
    const submitBtn = document.querySelector('.submit-btn');
    if (progresoTest === 100) {
    submitBtn.style.backgroundColor = '#8B0000';
    submitBtn.style.transform = 'scale(1.05)';
} else {
    submitBtn.style.backgroundColor = '#666';
    submitBtn.style.transform = 'scale(1)';
}
}

    // Función para seleccionar opción (onclick en labels)
    function seleccionarOpcion(opcionId) {
    const input = document.getElementById(opcionId);
    input.checked = true;

    // Efecto visual al seleccionar
    const label = document.querySelector(`label[for="${opcionId}"]`);
    label.style.backgroundColor = '#8B0000';
    label.style.color = '#e0c48b';

    // Remover estilo de otras opciones del mismo grupo
    const pregunta = opcionId.substring(0, 2); // q1, q2, etc.
    const otrasOpciones = document.querySelectorAll(`input[name="${pregunta}"]`);
    otrasOpciones.forEach(opcion => {
    if (opcion.id !== opcionId) {
    const otraLabel = document.querySelector(`label[for="${opcion.id}"]`);
    otraLabel.style.backgroundColor = '';
    otraLabel.style.color = '';
}
});

    actualizarProgreso();
    console.log(`Opción seleccionada: ${opcionId}`);
}

    // Función para procesar resultado del test (onsubmit)
    function procesarResultadoTest(event) {
    event.preventDefault();

    // Verificar que todas las preguntas estén respondidas
    const preguntas = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];
    let preguntasRespondidas = 0;

    preguntas.forEach(pregunta => {
    const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
    if (respuesta) {
    preguntasRespondidas++;
}
});

    // Alert si no están todas las preguntas respondidas
    if (preguntasRespondidas < 10) {
    alert(`Por favor responde todas las preguntas. Te faltan ${10 - preguntasRespondidas} preguntas por responder.`);
    return;
}

    // Calcular resultado basado en respuestas
    const respuestas = {
    light: 0, l: 0, near: 0, mello: 0,
    misa: 0
};

    preguntas.forEach(pregunta => {
    const respuesta = document.querySelector(`input[name="${pregunta}"]:checked`);
    if (respuesta) {
    respuestas[respuesta.value]++;
}
});

    // Encontrar el personaje con más puntos
    let personajeResultado = 'light';
    let maxPuntos = 0;
    for (const [personaje, puntos] of Object.entries(respuestas)) {
    if (puntos > maxPuntos) {
    maxPuntos = puntos;
    personajeResultado = personaje;
}
}

    // Alert de confirmación de resultados enviados
    alert('¡Resultados del test procesados correctamente! Preparando tu resultado personalizado...');

    console.log('Resultado del test:', personajeResultado, 'con', maxPuntos, 'puntos');
    mostrarResultado(personajeResultado);
}

    // Función para mostrar resultado (onclick en botón submit)
    function mostrarResultado(personaje) {
    const successMessage = document.getElementById('successMessage');
    const resultadoPersonaje = document.getElementById('resultadoPersonaje');

    // Datos de cada personaje
    const personajes = {
    light: {
    nombre: 'Light Yagami (Kira)',
    imagen: 'Principal/assets/images/Personajes/Light-Yagami/LightYagami.jpg',
    descripcion: 'Eres un genio estratega con una visión clara de cómo debería ser el mundo. Tu inteligencia superior y tu determinación te llevan a tomar decisiones difíciles para crear lo que consideras un mundo perfecto. Tienes una personalidad carismática pero también un lado oscuro impulsado por tu sentido de justicia.',
    caracteristicas: ['Inteligente', 'Estratega', 'Carismático', 'Determinado', 'Visionario']
},
    l: {
    nombre: 'L Lawliet',
    imagen: 'Principal/assets/images/Personajes/L-Lawliet/L-Lawliet.jpg',
    descripcion: 'Eres un detective brillante con una mente analítica excepcional. Tu capacidad para resolver los casos más complejos es legendaria. Aunque puedes parecer excéntrico, tu dedicación a la verdad y la justicia es inquebrantable. Prefieres trabajar en las sombras y confías en tu lógica por encima de todo.',
    caracteristicas: ['Analítico', 'Brillante', 'Excéntrico', 'Observador', 'Justo']
},
    near: {
    nombre: 'Near (Nate River)',
    imagen: 'Principal/assets/images/Personajes/Near/Near.jpg',
    descripcion: 'Eres una persona calmada y metódica que prefiere observar antes de actuar. Tu paciencia y atención al detalle te permiten resolver problemas complejos de manera sistemática. Aunque puedes parecer frío, tu enfoque racional te ayuda a tomar las mejores decisiones.',
    caracteristicas: ['Paciente', 'Metódico', 'Observador', 'Racional', 'Sistemático']
},
    mello: {
    nombre: 'Mello (Mihael Keehl)',
    imagen: 'Principal/assets/images/Personajes/Mello/Mello.jpg',
    descripcion: 'Eres una persona apasionada e impulsiva que no teme tomar riesgos para alcanzar tus objetivos. Tu determinación y tu naturaleza competitiva te impulsan a actuar rápidamente. Aunque puedes ser temperamental, tu lealtad hacia quienes te importan es inquebrantable.',
    caracteristicas: ['Apasionado', 'Impulsivo', 'Competitivo', 'Leal', 'Determinado']
},
    misa: {
    nombre: 'Misa Amane',
    imagen: 'Principal/assets/images/Personajes/Misa-Amane/Misa-Amane.jpg',
    descripcion: 'Eres una persona emotiva y devota que valora profundamente las relaciones personales. Tu capacidad para amar incondicionalmente y tu lealtad son tus mayores fortalezas. Aunque puedes ser impulsiva en tus decisiones, siempre actúas desde el corazón.',
    caracteristicas: ['Emotiva', 'Devota', 'Leal', 'Apasionada', 'Intuitiva']
}
};

    const datosPersonaje = personajes[personaje];

    successMessage.classList.add('active');
    resultadoPersonaje.innerHTML = `
            <div class="resultado-header">
                <img src="${datosPersonaje.imagen}" alt="${datosPersonaje.nombre}" class="resultado-imagen">
                <div class="resultado-info">
                    <h3 class="resultado-titulo">¡Eres ${datosPersonaje.nombre}!</h3>
                    <div class="resultado-caracteristicas">
                        ${datosPersonaje.caracteristicas.map(car => `<span class="caracteristica-tag">${car}</span>`).join('')}
                    </div>
                </div>
            </div>
            <p class="resultado-descripcion">${datosPersonaje.descripcion}</p>
            <div class="resultado-acciones">
                <button onclick="reiniciarTest()" class="btn-reiniciar">Hacer test de nuevo</button>
                <button onclick="compartirResultado('${personaje}')" class="btn-compartir">Compartir resultado</button>
            </div>
        `;

    // Desplazarse al mensaje de éxito
    setTimeout(() => {
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
}, 100);

    console.log('Resultado mostrado para:', datosPersonaje.nombre);
}

    // Función para reiniciar el test
    function reiniciarTest() {
    const testPopup = document.getElementById('testPopup');
    const successMessage = document.getElementById('successMessage');
    const personalityTest = document.getElementById('personalityTest');

    successMessage.classList.remove('active');
    personalityTest.reset();
    progresoTest = 0;

    // Resetear título del test
    const tituloTest = document.querySelector('.popup-title');
    tituloTest.textContent = 'Test de Personalidad Death Note';

    // Resetear estilos de todas las opciones
    const labels = document.querySelectorAll('.option label');
    labels.forEach(label => {
    label.style.backgroundColor = '';
    label.style.color = '';
});

    // Resetear botón submit
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.style.backgroundColor = '#666';
    submitBtn.style.transform = 'scale(1)';

    console.log('Test reiniciado');
}

    // Función para compartir resultado
    function compartirResultado(personaje) {
    const personajes = {
    light: 'Light Yagami (Kira)',
    l: 'L Lawliet',
    near: 'Near',
    mello: 'Mello',
    misa: 'Misa Amane'
};

    // Confirm antes de compartir
    const confirmarCompartir = confirm(`¿Quieres compartir que eres ${personajes[personaje]} en el test de Death Note?`);

    if (confirmarCompartir) {
    // Prompt para personalizar el mensaje
    const mensajePersonal = prompt('¿Quieres agregar un mensaje personal? (opcional)', '');

    let texto = `¡Acabo de hacer el test de personalidad de Death Note y soy ${personajes[personaje]}! 🖤📓`;
    if (mensajePersonal && mensajePersonal.trim() !== '') {
    texto += `\n\n"${mensajePersonal}"`;
}

    if (navigator.share) {
    navigator.share({
    title: 'Test de Personalidad Death Note',
    text: texto,
    url: window.location.href
}).then(() => {
    alert('¡Resultado compartido exitosamente!');
}).catch(() => {
    // Fallback si falla el share nativo
    copiarAlPortapapeles(texto);
});
} else {
    // Fallback para navegadores que no soportan Web Share API
    copiarAlPortapapeles(texto);
}
}

    console.log('Compartiendo resultado:', personajes[personaje]);
}

    // Función auxiliar para copiar al portapapeles
    function copiarAlPortapapeles(texto) {
    if (navigator.clipboard) {
    navigator.clipboard.writeText(texto + ' ' + window.location.href).then(() => {
    alert('¡Resultado copiado al portapapeles! Puedes pegarlo en tus redes sociales.');
}).catch(() => {
    // Fallback manual
    const textArea = document.createElement('textarea');
    textArea.value = texto + ' ' + window.location.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    alert('¡Resultado copiado al portapapeles!');
});
} else {
    alert('Tu navegador no soporta copiar automáticamente. Copia manualmente este texto:\n\n' + texto + '\n\n' + window.location.href);
}
}
