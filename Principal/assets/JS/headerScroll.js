// Oculta el header al bajar y lo muestra al subir en cualquier vista
let lastScrollTop = 0;
document.addEventListener('DOMContentLoaded', function() {
    // Puede haber más de un header (por includes), se aplica a todos los .navbar
    const navbars = document.querySelectorAll('.navbar');
    if (!navbars.length) return;
    window.addEventListener('scroll', function() {
        let scrollTop = window.scrollY || document.documentElement.scrollTop;
        navbars.forEach(navbar => {
            if (scrollTop > lastScrollTop) {
                // Bajando
                navbar.style.transform = 'translateY(-100%)';
                navbar.style.transition = 'transform 0.3s';
            } else {
                // Subiendo
                navbar.style.transform = 'translateY(0)';
                navbar.style.transition = 'transform 0.3s';
            }
        });
        lastScrollTop = scrollTop;
    });
});
