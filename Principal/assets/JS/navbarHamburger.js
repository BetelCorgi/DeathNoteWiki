

// Función para inicializar el menú hamburguesa
function initHamburgerMenu() {
    console.log('Inicializando menú hamburguesa...');
    
    const hamburger = document.querySelector('.burger');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');
    const navLinks = document.querySelectorAll('.nav-list a');
    const body = document.body;

    if (!hamburger) {
        console.error('Error: No se encontró el botón de hamburguesa');
        return;
    }

    console.log('Elementos encontrados:', {
        hamburger,
        navLeft,
        navRight,
        navLinks: navLinks.length
    });

    // Función para abrir/cerrar menú
    function toggleMenu() {
        console.log('Alternando menú...');
        
        // Alternar clase active en el botón
        const isActive = hamburger.classList.toggle('active');
        
        // Alternar clase en el body para el scroll
        body.classList.toggle('menu-open', isActive);
        
        // Mostrar/ocultar menús
        if (navLeft) navLeft.classList.toggle('active', isActive);
        if (navRight) navRight.classList.toggle('active', isActive);
        
        console.log('Menú ' + (isActive ? 'abierto' : 'cerrado'));
    }

    // Función para cerrar el menú
    function closeMenu() {
        console.log('Cerrando menú...');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open');
        if (navLeft) navLeft.classList.remove('active');
        if (navRight) navRight.classList.remove('active');
    }

    // Evento para el botón hamburguesa
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMenu();
    });

    // Cerrar menú al hacer clic en un enlace
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', function(e) {
        if (hamburger.classList.contains('active') && 
            !e.target.closest('.nav-left') && 
            !e.target.closest('.nav-right') &&
            !e.target.closest('.burger')) {
            closeMenu();
        }
    });

    // Cerrar menú con la tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && hamburger.classList.contains('active')) {
            closeMenu();
        }
    });

    console.log('Menú hamburguesa inicializado correctamente');
}

// Inicializar cuando el DOM esté completamente cargado
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
} else {
    initHamburgerMenu();
}
