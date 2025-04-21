const slider = document.querySelector('.slider');

function activate(e) {
    const items = document.querySelectorAll('.item');
    e.target.matches('.next') && slider.append(items[0])
    e.target.matches('.prev') && slider.prepend(items[items.length-1]);
}

document.addEventListener('click',activate,false);

// Función para detectar si el servicio está en el viewport (pantalla)
// Función para detectar si el elemento está en el viewport (pantalla)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target); // Deja de observar cuando ya se mostró
        }
    });
}, {
    threshold: 0.2 // Solo cuando el 20% del elemento ya entró en la pantalla
});

document.querySelectorAll('.col-md-4').forEach(item => {
    observer.observe(item);
});
