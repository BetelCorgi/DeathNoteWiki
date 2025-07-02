<!-- Asegúrate de tener SweetAlert2 antes de tu script -->
    /* ─────────────  VARIABLES GLOBALES  ───────────── */
    let progresoTest = 0;
    const totalPreguntas = 10;

    /* ─────────────  ABRIR TEST  ───────────── */
    function abrirTestPersonalidad() {
    Swal.fire({
        title: '¿Estás listo?',
        text: 'El test tiene 10 preguntas. ¿Quieres empezar?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, comenzar',
        cancelButtonText: 'Cancelar'
    }).then(result => {
        if (!result.isConfirmed) return;      // Usuario canceló

        /* 1. Mostramos el popup del test */
        const testPopup = document.getElementById('testPopup');
        testPopup.classList.add('active');
        document.body.style.overflow = 'hidden';

        /* 2. Preguntamos el nombre (opcional) */
        Swal.fire({
            title: '¿Cuál es tu nombre?',
            input: 'text',
            inputPlaceholder: 'Nombre (opcional)',
            showCancelButton: true,
            confirmButtonText: 'Comenzar',
            cancelButtonText: 'Saltar'
        }).then(nameResult => {
            if (nameResult.isConfirmed && nameResult.value.trim() !== '') {
                document.querySelector('.popup-title').textContent =
                    `Test de Personalidad Death Note - ${nameResult.value}`;
                console.log('Test iniciado por:', nameResult.value);
            }
        });

        console.log('Popup del test abierto');
    });
}

    /* ─────────────  CERRAR TEST  ───────────── */
    function cerrarTestPersonalidad() {
    const testPopup       = document.getElementById('testPopup');
    const successMessage  = document.getElementById('successMessage');
    const personalityTest = document.getElementById('personalityTest');

    testPopup.classList.remove('active');
    document.body.style.overflow = 'auto';
    successMessage.classList.remove('active');
    personalityTest.reset();
    progresoTest = 0;

    /* Reset visual */
    document.querySelector('.popup-title').textContent =
    'Test de Personalidad Death Note';
    document.querySelectorAll('.option label').forEach(label => {
    label.style.backgroundColor = '';
    label.style.color = '';
});
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.style.backgroundColor = '#666';
    submitBtn.style.transform = 'scale(1)';

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

    /* 1. Validar que todo esté respondido */
    const faltantes = 10 - document.querySelectorAll('input:checked').length;
    if (faltantes > 0) {
    Swal.fire({
    icon: 'warning',
    title: '¡Faltan preguntas!',
    text: `Responde las ${faltantes} preguntas restantes para continuar.`,
});
    return;
}

    /* 2. Contar resultados */
    const puntaje = { light:0, l:0, near:0, mello:0, misa:0 };
    document.querySelectorAll('input:checked').forEach(r => puntaje[r.value]++);
    const personajeResultado = Object.entries(puntaje)
    .sort((a,b) => b[1]-a[1])[0][0];

    Swal.fire({
    title: 'Procesando resultado...',
    icon: 'info',
    timer: 1200,
    showConfirmButton: false,
    didOpen: () => Swal.showLoading()
}).then(() => mostrarResultado(personajeResultado));
}

    /* ─────────────  MOSTRAR RESULTADO  ───────────── */
    function mostrarResultado(key) {
    const data = {
    light:{nombre:'Light Yagami (Kira)',   imagen:'Principal/assets/images/Personajes/Light-Yagami/LightYagami.jpg',
    desc:'Eres un genio estratega...', tags:['Inteligente','Estratega','Carismático','Determinado','Visionario']},
    l:{     nombre:'L Lawliet',            imagen:'Principal/assets/images/Personajes/L-Lawliet/L-Lawliet.jpg',
    desc:'Eres un detective brillante...', tags:['Analítico','Brillante','Excéntrico','Observador','Justo']},
    near:{  nombre:'Near (Nate River)',    imagen:'Principal/assets/images/Personajes/Near/Near.jpg',
    desc:'Eres calmado y metódico...', tags:['Paciente','Metódico','Observador','Racional','Sistemático']},
    mello:{ nombre:'Mello (Mihael Keehl)', imagen:'Principal/assets/images/Personajes/Mello/Mello.jpg',
    desc:'Eres apasionado e impulsivo...', tags:['Apasionado','Impulsivo','Competitivo','Leal','Determinado']},
    misa:{  nombre:'Misa Amane',           imagen:'Principal/assets/images/Personajes/Misa-Amane/Misa-Amane.jpg',
    desc:'Eres emotiva y devota...', tags:['Emotiva','Devota','Leal','Apasionada','Intuitiva']}
}[key];

    const success = document.getElementById('successMessage');
    const cont    = document.getElementById('resultadoPersonaje');

    cont.innerHTML = `
    <div class="resultado-header">
      <img src="${data.imagen}" alt="${data.nombre}" class="resultado-imagen">
      <div class="resultado-info">
        <h3 class="resultado-titulo">¡Eres ${data.nombre}!</h3>
        <div class="resultado-caracteristicas">
          ${data.tags.map(t=>`<span class="caracteristica-tag">${t}</span>`).join('')}
        </div>
      </div>
    </div>
    <p class="resultado-descripcion">${data.desc}</p>
    <div class="resultado-acciones">
      <button onclick="reiniciarTest()"              class="btn-reiniciar">Hacer test de nuevo</button>
      <button onclick="compartirResultado('${key}')" class="btn-compartir">Compartir resultado</button>
    </div>`;

    success.classList.add('active');
    setTimeout(() => success.scrollIntoView({ behavior:'smooth', block:'center' }), 100);
    console.log('Resultado mostrado para:', data.nombre);
}

    function reiniciarTest() {
    cerrarTestPersonalidad();  // reaprovechamos la función de cierre
    console.log('Test reiniciado');
}

function compartirResultado(personaje) {
    const personajes = {
        light: 'Light Yagami (Kira)',
        l: 'L Lawliet',
        near: 'Near',
        mello: 'Mello',
        misa: 'Misa Amane'
    };

    Swal.fire({
        title: '¿Quieres compartir tu resultado?',
        text: `Eres ${personajes[personaje]}`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Compartir',
        cancelButtonText: 'Cancelar'
    }).then(res => {
        if (!res.isConfirmed) return;

        Swal.fire({
            title: 'Mensaje personal (opcional)',
            input: 'text',
            inputPlaceholder: 'Escribe algo...',
            showCancelButton: true,
            confirmButtonText: 'Listo',
            cancelButtonText: 'Omitir'
        }).then(inputRes => {
            let mensaje = `¡Acabo de hacer el test de personalidad de Death Note y soy ${personajes[personaje]}! 🖤📓`;
            if (inputRes.isConfirmed && inputRes.value.trim() !== '') {
                mensaje += `\n\n"${inputRes.value}"`;
            }

            const textoCompleto = `${mensaje} ${location.href}`;

            const isMobile = /Mobi|Android|iPhone/i.test(navigator.userAgent);
            const isHttps = location.protocol === 'https:';
            const isLocalhost = location.hostname === 'localhost' || location.hostname === '127.0.0.1';

            // Validar uso seguro de Web Share API
            if (navigator.share && isMobile && isHttps && !isLocalhost) {
                navigator.share({
                    title: 'Test Death Note',
                    text: mensaje,
                    url: location.href
                }).then(() => {
                    Swal.fire('Compartido', '¡Resultado compartido exitosamente!', 'success');
                }).catch(() => {
                    copiarAlPortapapeles(textoCompleto);
                });
            } else {
                copiarAlPortapapeles(textoCompleto);
            }
        });
    });
}

function copiarAlPortapapeles(texto) {
    if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
        navigator.clipboard.writeText(texto)
            .then(() => Swal.fire('Copiado', 'Texto copiado al portapapeles', 'success'))
            .catch(() => fallbackManual(texto));
    } else {
        fallbackManual(texto);
    }

    function fallbackManual(texto) {
        const ta = document.createElement('textarea');
        ta.value = texto;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        Swal.fire('Copiado', 'Texto copiado (método manual)', 'success');
    }
}
