// navigation.js
// Handles hamburger menu and navigation drawer logic
// Exports: initNavigation

/**
 * Initializes the hamburger menu and navigation drawer logic.
 * Handles opening/closing the drawer and page section switching.
 */
export function initNavigation() {
    const hamburger = document.getElementById('hamburgerMenu');
    const navDrawer = document.getElementById('navDrawer');
    const navLinks = navDrawer ? navDrawer.querySelectorAll('a[data-page]') : [];
    const pageSections = document.querySelectorAll('.page-section');

    // Hamburger click toggles drawer
    if (hamburger && navDrawer) {
        hamburger.addEventListener('click', () => {
            navDrawer.classList.toggle('open');
        });
    }

    // Clicking outside nav drawer closes it
    document.addEventListener('click', (e) => {
        if (navDrawer && navDrawer.classList.contains('open')) {
            if (!navDrawer.contains(e.target) && !hamburger.contains(e.target)) {
                navDrawer.classList.remove('open');
            }
        }
    });

    // Navigation link click: show correct page section
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageId = link.getAttribute('data-page');
            pageSections.forEach(section => {
                section.style.display = (section.id === pageId) ? '' : 'none';
            });
            navDrawer.classList.remove('open');
        });
    });

    // Show first page by default if none visible
    let anyVisible = false;
    pageSections.forEach(section => {
        if (section.style.display !== 'none') anyVisible = true;
    });
    if (!anyVisible && pageSections.length > 0) {
        pageSections[0].style.display = '';
    }
}
