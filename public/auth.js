// auth.js
// Handles login page logic and authentication
// Exports: initAuth

/**
 * Handles login form submission, authentication, and page visibility.
 * Hides dashboard content until login is successful.
 * Also provides logout functionality and disables login button while authenticating.
 */
export function initAuth() {
    const loginPage = document.getElementById('loginPage');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');
    const dashboardContainer = document.querySelector('.container');
    const header = document.querySelector('.header');
    const footer = document.querySelector('footer');
    let loginButton = loginForm ? loginForm.querySelector('button[type="submit"]') : null;

    // Hide dashboard content until login
    if (dashboardContainer) dashboardContainer.style.display = 'none';
    if (header) header.style.display = 'none';
    if (footer) footer.style.display = 'none';
    if (loginPage) loginPage.style.display = 'flex';

    // Listen for login form submit
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            loginError.textContent = '';
            if (loginButton) loginButton.disabled = true;
            // Firebase Auth sign in
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    // Hide login, show dashboard
                    if (loginPage) loginPage.style.display = 'none';
                    if (dashboardContainer) dashboardContainer.style.display = '';
                    if (header) header.style.display = '';
                    if (footer) footer.style.display = '';
                })
                .catch(err => {
                    loginError.textContent = err.message || 'Login failed.';
                })
                .finally(() => {
                    if (loginButton) loginButton.disabled = false;
                });
        });
    }

    // If already logged in, skip login page
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            if (loginPage) loginPage.style.display = 'none';
            if (dashboardContainer) dashboardContainer.style.display = '';
            if (header) header.style.display = '';
            if (footer) footer.style.display = '';
            // Add logout button if not present
            addLogoutButton();
        } else {
            if (dashboardContainer) dashboardContainer.style.display = 'none';
            if (header) header.style.display = 'none';
            if (footer) footer.style.display = 'none';
            if (loginPage) loginPage.style.display = 'flex';
            removeLogoutButton();
        }
    });

    // Add logout button to header if not present
    function addLogoutButton() {
        if (!header) return;
        if (header.querySelector('#logoutBtn')) return;
        const btn = document.createElement('button');
        btn.id = 'logoutBtn';
        btn.textContent = 'Logout';
        btn.className = 'logout-btn'; // Use a class for styling
        btn.onclick = function() {
            firebase.auth().signOut();
        };
        // Place logout button at the far right of the header, after nav and hamburger
        header.appendChild(btn);
    }
    // Remove logout button
    function removeLogoutButton() {
        if (!header) return;
        const btn = header.querySelector('#logoutBtn');
        if (btn) btn.remove();
    }
}
