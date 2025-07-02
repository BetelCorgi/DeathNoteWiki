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

    // Función para combinar menús en móvil
    function setupMobileMenu() {
        console.log('setupMobileMenu called, window width:', window.innerWidth);
        if (window.innerWidth <= 768) {
            const navLeftList = navLeft.querySelector('.nav-list');
            const navRightList = navRight.querySelector('.nav-list');
            
            console.log('Mobile mode - navLeftList:', navLeftList, 'navRightList:', navRightList);
            
            // Limpiar elementos duplicados primero
            const existingClones = navLeftList.querySelectorAll('.mobile-clone');
            console.log('Removing existing clones:', existingClones.length);
            existingClones.forEach(clone => clone.remove());
            
            // Clonar elementos de nav-right y agregarlos a nav-left
            const rightItems = navRightList.querySelectorAll('li');
            console.log('Right items to clone:', rightItems.length);
            rightItems.forEach(item => {
                const clonedItem = item.cloneNode(true);
                clonedItem.classList.add('mobile-clone'); // Marcar como clonado
                navLeftList.appendChild(clonedItem);
                console.log('Cloned item:', item.textContent);
            });
            
            console.log('Total items in nav-left after cloning:', navLeftList.children.length);
            
            // Actualizar la lista de enlaces para incluir los nuevos
            const allNavLinks = navLeftList.querySelectorAll('a');
            allNavLinks.forEach(link => {
                link.addEventListener('click', closeMenu);
            });
        } else {
            // Limpiar elementos clonados en desktop
            const navLeftList = navLeft.querySelector('.nav-list');
            const clonedItems = navLeftList.querySelectorAll('.mobile-clone');
            clonedItems.forEach(clone => clone.remove());
        }
    }

    // Configurar menú móvil al cargar
    setupMobileMenu();

    // Agregar evento para redimensionamiento de ventana
    window.addEventListener('resize', setupMobileMenu);

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
        
        // Solo mostrar nav-left en móvil
        if (navLeft) navLeft.classList.toggle('active', isActive);
        
        console.log('Menú ' + (isActive ? 'abierto' : 'cerrado'));
    }

    // Función para cerrar el menú
    function closeMenu() {
        console.log('Cerrando menú...');
        hamburger.classList.remove('active');
        body.classList.remove('menu-open');
        if (navLeft) navLeft.classList.remove('active');
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
