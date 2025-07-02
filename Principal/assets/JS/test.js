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
