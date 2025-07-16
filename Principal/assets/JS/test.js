document.addEventListener('DOMContentLoaded', function() {
    // Solo mantenemos los eventos que NO tienen onclick inline
    const testPopup = document.getElementById('testPopup');

    // Cerrar popup haciendo clic fuera del contenido
    testPopup.addEventListener('click', function(e) {
        if (e.target === testPopup) {
            cerrarTestPersonalidad();
        }
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && testPopup.classList.contains('active')) {
            cerrarTestPersonalidad();
        }
    });

    console.log('Event listeners inicializados correctamente');
});

// Función para procesar los resultados del test
function procesarResultadoTest(event) {
    event.preventDefault();
    
    // Obtener todas las respuestas
    const form = event.target;
    const formData = new FormData(form);
    let results = {
        light: 0,
        l: 0,
        near: 0,
        mello: 0,
        misa: 0,
        ryuk: 0,
        soichiro: 0
    };
    
    // Contar las respuestas
    for (let [name, value] of formData.entries()) {
        if (results.hasOwnProperty(value)) {
            results[value]++;
        }
    }
    
    // Determinar el personaje con más puntos
    let maxScore = 0;
    let character = 'light'; // Por defecto
    
    for (let [key, value] of Object.entries(results)) {
        if (value > maxScore) {
            maxScore = value;
            character = key;
        }
    }
    
    // Mapear el código del personaje a su nombre completo
    const characterMap = {
        'light': 'Light Yagami',
        'l': 'L Lawliet',
        'near': 'Near',
        'mello': 'Mello',
        'misa': 'Misa Amane',
        'ryuk': 'Ryuk',
        'soichiro': 'Soichiro Yagami'
    };
    
    const characterName = characterMap[character] || 'Light Yagami';
    
    // Guardar el resultado en el dashboard del usuario
    const currentUser = JSON.parse(sessionStorage.getItem('currentUser'));
    
    if (currentUser) {
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
                character: characterName,
                date: new Date().toISOString(),
                score: maxScore
            };
            
            // Agregar al inicio del array
            users[userIndex].testResults.unshift(testResult);
            
            // Actualizar localStorage
            localStorage.setItem('deathNoteUsers', JSON.stringify(users));
            
            // Actualizar sesión
            sessionStorage.setItem('currentUser', JSON.stringify(users[userIndex]));
            
            // Mostrar el resultado
            mostrarResultado(characterName);
            
            // Redirigir al dashboard después de 5 segundos
            setTimeout(() => {
                window.location.href = 'Principal/dashboard/index.html';
            }, 5000);
        } else {
            // Usuario no encontrado, solo mostrar resultado
            mostrarResultado(characterName);
        }
    } else {
        // Usuario no ha iniciado sesión, solo mostrar resultado
        mostrarResultado(characterName);
    }
    
    return false;
}

// Función para mostrar el resultado del test
function mostrarResultado(characterName) {
    const characterData = {
        'Light Yagami': {
            image: 'Principal/assets/images/Personajes/LightYagami.jpg',
            description: 'Eres un estratega nato con una fuerte convicción en tu propio sentido de la justicia. No temes tomar decisiones difíciles y estás dispuesto a asumir grandes responsabilidades para lograr tus objetivos.',
            tags: ['Estratega', 'Decidido', 'Carismático', 'Manipulador']
        },
        'L Lawliet': {
            image: 'Principal/assets/images/Personajes/L-Lawliet.jpg',
            description: 'Tienes una mente analítica excepcional y un enfoque único para resolver problemas. Eres observador, metódico y no te dejas influenciar fácilmente por las opiniones de los demás.',
            tags: ['Analítico', 'Observador', 'Excéntrico', 'Lógico']
        },
        'Near': {
            image: 'Principal/assets/images/Personajes/Near.jpg',
            description: 'Eres extremadamente inteligente y analítico, con una gran capacidad para ver patrones donde otros no los ven. Prefieres trabajar en equipo y tomar decisiones basadas en la lógica pura.',
            tags: ['Inteligente', 'Metódico', 'Paciente', 'Estratégico']
        },
        'Mello': {
            image: 'Principal/assets/images/Personajes/Mello.jpg',
            description: 'Eres apasionado y determinado, dispuesto a tomar riesgos que otros no tomarían. Tu enfoque directo y tu voluntad de hacer lo que sea necesario te convierten en una fuerza a tener en cuenta.',
            tags: ['Apasionado', 'Audaz', 'Impulsivo', 'Determinado']
        },
        'Misa Amane': {
            image: 'Principal/assets/images/Personajes/Misa-Amane.jpg',
            description: 'Eres leal y apasionada, dispuesta a hacer cualquier cosa por aquellos que amas. Tu corazón gobierna sobre tu mente, y aunque a veces puedes ser impulsiva, tus intenciones son siempre puras.',
            tags: ['Leal', 'Apasionada', 'Emocional', 'Devota']
        },
        'Ryuk': {
            image: 'Principal/assets/images/Personajes/Ryuk.jpg',
            description: 'Eres un espíritu libre que busca entretenimiento y emoción en la vida. No te preocupas por las reglas convencionales y prefieres observar cómo se desarrollan los eventos que participar activamente en ellos.',
            tags: ['Curioso', 'Impredecible', 'Divertido', 'Observador']
        },
        'Soichiro Yagami': {
            image: 'Principal/assets/images/Personajes/SoichiroYagami.jpg',
            description: 'Eres una persona íntegra y de fuertes principios morales. Crees en la justicia y en hacer lo correcto, incluso cuando es difícil. Tu sentido del deber y tu compasión te convierten en un líder natural.',
            tags: ['Íntegro', 'Justo', 'Compasivo', 'Responsable']
        }
    };
    
    const data = characterData[characterName] || characterData['Light Yagami'];
    const resultadoDiv = document.getElementById('resultadoPersonaje');
    
    resultadoDiv.innerHTML = `
        <div class="resultado-header">
            <img src="${data.image}" alt="${characterName}" class="resultado-imagen">
            <h3 class="resultado-titulo">${characterName}</h3>
        </div>
        <div class="resultado-caracteristicas">
            ${data.tags.map(tag => `<span class="caracteristica-tag">${tag}</span>`).join('')}
        </div>
        <p class="resultado-descripcion">${data.description}</p>
        <div class="resultado-acciones">
            <button class="btn-reiniciar" onclick="cerrarTestPersonalidad(); setTimeout(() => abrirTestPersonalidad(), 500);">
                <i class="fas fa-redo"></i> Hacer otro test
            </button>
            <button class="btn-compartir" onclick="compartirResultado('${characterName}', '${data.description}')">
                <i class="fas fa-share-alt"></i> Compartir
            </button>
        </div>
    `;
    
    // Mostrar el mensaje de éxito
    document.getElementById('successMessage').style.display = 'block';
    
    // Desplazarse al resultado
    resultadoDiv.scrollIntoView({ behavior: 'smooth' });
}

// Función para compartir el resultado
function compartirResultado(character, description) {
    if (navigator.share) {
        navigator.share({
            title: `¡Soy ${character} en el test de Death Note!`,
            text: `Acabo de descubrir que mi personalidad se parece a ${character} en Death Note. ${description}`,
            url: window.location.href
        }).catch(err => {
            console.error('Error al compartir:', err);
            copiarAlPortapapeles(`¡Soy ${character} en el test de Death Note!\n\n${description}\n\nHaz el test aquí: ${window.location.href}`);
        });
    } else {
        // Fallback para navegadores que no soportan Web Share API
        copiarAlPortapapeles(`¡Soy ${character} en el test de Death Note!\n\n${description}\n\nHaz el test aquí: ${window.location.href}`);
    }
}

// Función auxiliar para copiar al portapapeles
function copiarAlPortapapeles(texto) {
    const textarea = document.createElement('textarea');
    textarea.value = texto;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    
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
    
    setTimeout(() => {
        document.body.removeChild(notificacion);
    }, 3000);
}

// Función para actualizar la barra de progreso
document.addEventListener('DOMContentLoaded', function() {
    actualizarProgreso();
});

function actualizarProgreso() {
    const form = document.getElementById('personalityTest');
    if (!form) return;
    
    const totalQuestions = 10; // Número total de preguntas
    const answeredQuestions = new FormData(form).getAll('q1').length; // Solo cuenta las respuestas de la primera pregunta para evitar duplicados
    
    const progress = (answeredQuestions / totalQuestions) * 100;
    const submitBtn = form.querySelector('.submit-btn');
    
    if (submitBtn) {
        submitBtn.style.background = `linear-gradient(90deg, #d4af37 ${progress}%, #333 ${progress}%)`;
        submitBtn.textContent = answeredQuestions === totalQuestions ? 
            '¡Ver resultado!' : 
            `Continuar (${answeredQuestions}/${totalQuestions})`;
        
        // Cambiar el color del texto cuando esté completo para mejor contraste
        if (answeredQuestions === totalQuestions) {
            submitBtn.style.color = '#000';
            submitBtn.style.fontWeight = 'bold';
        } else {
            submitBtn.style.color = '#fff';
            submitBtn.style.fontWeight = 'normal';
        }
    }
}

// Función para seleccionar una opción (maneja el estilo visual)
function seleccionarOpcion(id) {
    // Remover la clase 'selected' de todas las opciones de la misma pregunta
    const input = document.getElementById(id);
    if (!input) return;
    
    const questionName = input.name;
    const allOptions = document.querySelectorAll(`input[name="${questionName}"]`);
    
    allOptions.forEach(option => {
        const label = document.querySelector(`label[for="${option.id}"]`);
        if (label) {
            label.parentElement.classList.remove('selected');
        }
    });
    
    // Agregar la clase 'selected' a la opción seleccionada
    const selectedLabel = document.querySelector(`label[for="${id}"]`);
    if (selectedLabel) {
        selectedLabel.parentElement.classList.add('selected');
    }
    
    // Actualizar la barra de progreso
    actualizarProgreso();
}

// Asegurarse de que las opciones seleccionadas mantengan el estilo al recargar
window.addEventListener('load', function() {
    const selectedOptions = document.querySelectorAll('input[type="radio"]:checked');
    selectedOptions.forEach(option => {
        const label = document.querySelector(`label[for="${option.id}"]`);
        if (label) {
            label.parentElement.classList.add('selected');
        }
    });
    
    // Actualizar la barra de progreso al cargar la página
    actualizarProgreso();
});
