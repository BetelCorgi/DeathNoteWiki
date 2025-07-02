    console.log('Testing hamburger menu...');

    function initHamburgerMenu() {
    const hamburger = document.querySelector('.burger');
    const navLeft = document.querySelector('.nav-left');
    const navRight = document.querySelector('.nav-right');

    console.log('Elements found:', { hamburger, navLeft, navRight });

    function setupMobileMenu() {
    if (window.innerWidth <= 768) {
    const navLeftList = navLeft.querySelector('.nav-list');
    const navRightList = navRight.querySelector('.nav-list');

    // Clear existing clones
    const existingClones = navLeftList.querySelectorAll('.mobile-clone');
    existingClones.forEach(clone => clone.remove());

    // Clone nav-right items to nav-left
    const rightItems = navRightList.querySelectorAll('li');
    rightItems.forEach(item => {
    const clonedItem = item.cloneNode(true);
    clonedItem.classList.add('mobile-clone');
    navLeftList.appendChild(clonedItem);
});

    console.log('Mobile menu setup complete. Items in nav-left:', navLeftList.children.length);
} else {
    // Clean up clones on desktop
    const navLeftList = navLeft.querySelector('.nav-list');
    const clonedItems = navLeftList.querySelectorAll('.mobile-clone');
    clonedItems.forEach(clone => clone.remove());
}
}

    setupMobileMenu();
    window.addEventListener('resize', setupMobileMenu);

    hamburger.addEventListener('click', function() {
    const isActive = hamburger.classList.toggle('active');
    navLeft.classList.toggle('active', isActive);
    console.log('Menu toggled:', isActive);
});
}

    document.addEventListener('DOMContentLoaded', initHamburgerMenu);
