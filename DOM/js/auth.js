

const AUTH = (() => {
    const ADMIN_USER  = "admin";
    const ADMIN_PASS  = "admin";
    const SESSION_KEY = "danmusic_admin_session";

    // ── Estado ────────────────────────────────────────────────────────────
    function isLoggedIn() {
        return sessionStorage.getItem(SESSION_KEY) === "true";
    }

    function login(user, pass) {
        if (user === ADMIN_USER && pass === ADMIN_PASS) {
            sessionStorage.setItem(SESSION_KEY, "true");
            return true;
        }
        return false;
    }

    function logout() {
        sessionStorage.removeItem(SESSION_KEY);
    }

    // ── Modal ─────────────────────────────────────────────────────────────
    function injectModal() {
        const overlay = document.createElement("div");
        overlay.id = "auth-modal-overlay";
        overlay.classList.add("hidden");
        overlay.innerHTML = `
            <div id="auth-modal">
                <button id="auth-modal-close" title= "Cerrar" > &times;</button>
                <div id="auth-modal-icon"> Dan Music </div>
                <h2> Acceso Administrador </h2>
                <div class="auth-field">
                    <label for="auth-user-input">Usuario</label>
                    <input type="text" id="auth-user-input" placeholder="admin" autocomplete="username">
                </div>
                <div class="auth-field">
                    <label for="auth-pass-input">Contraseña</label>
                    <input type="password" id="auth-pass-input" placeholder="••••••••" autocomplete="current-password">
                </div>
                <p id="auth-error" class="auth-error hidden">Usuario o contraseña incorrectos.</p>
                <button id="auth-btn-login">Ingresar</button>
            </div>
        `;
        document.body.appendChild(overlay);

        overlay.addEventListener("click", (e) => { if (e.target === overlay) closeModal(); });
        document.getElementById("auth-modal-close").addEventListener("click", closeModal);
        overlay.addEventListener("keydown", (e) => { if (e.key === "Enter") attemptLogin(); });
        document.getElementById("auth-btn-login").addEventListener("click", attemptLogin);
    }

    function attemptLogin() {
        const user    = document.getElementById("auth-user-input").value.trim();
        const pass    = document.getElementById("auth-pass-input").value;
        const errorEl = document.getElementById("auth-error");

        if (login(user, pass)) {
            closeModal();
            updateNavbar();
            onLoginSuccess();
        } else {
            errorEl.classList.remove("hidden");
            document.getElementById("auth-pass-input").value = "";
            document.getElementById("auth-pass-input").focus();
            const box = document.getElementById("auth-modal");
            box.classList.add("shake");
            setTimeout(() => box.classList.remove("shake"), 400);
        }
    }

    function openModal() {
        const overlay = document.getElementById("auth-modal-overlay");
        if (!overlay) return;
        overlay.classList.remove("hidden");
        overlay.classList.add("visible");
        document.getElementById("auth-user-input").value = "";
        document.getElementById("auth-pass-input").value = "";
        document.getElementById("auth-error")?.classList.add("hidden");
        setTimeout(() => document.getElementById("auth-user-input")?.focus(), 100);
    }

    function closeModal() {
        const overlay = document.getElementById("auth-modal-overlay");
        if (!overlay) return;
        overlay.classList.remove("visible");
        overlay.classList.add("hidden");
    }

    // ── Navbar ────────────────────────────────────────────────────────────
    function injectNavbarButtons() {
        const navbar = document.querySelector(".navbar .container-fluid");
        if (!navbar) return;
        const container = document.createElement("div");
        container.id = "nav-auth-container";
        navbar.appendChild(container);
        renderNavbarButtons(container);
    }

    function renderNavbarButtons(container) {
        if (!container) container = document.getElementById("nav-auth-container");
        if (!container) return;

        if (isLoggedIn()) {
            container.innerHTML = `
                <span class="nav-admin-badge">✓ Admin</span>
                <button id="nav-btn-logout">Cerrar sesión</button>
            `;
            document.getElementById("nav-btn-logout")?.addEventListener("click", () => {
                logout(); updateNavbar(); onLogoutSuccess();
            });
        } else {
            container.innerHTML = `<button id="nav-btn-show-login">Login Admin</button>`;
            document.getElementById("nav-btn-show-login")?.addEventListener("click", openModal);
        }
    }

    function updateNavbar() {
        renderNavbarButtons(document.getElementById("nav-auth-container"));
    }

    // ── Callbacks (app.js los sobreescribe en productos.html) ─────────────
    function onLoginSuccess()  { if (typeof window.onAdminLogin  === "function") window.onAdminLogin(); }
    function onLogoutSuccess() { if (typeof window.onAdminLogout === "function") window.onAdminLogout(); }

    // ── Init ──────────────────────────────────────────────────────────────
    function init() {
        injectModal();
        injectNavbarButtons();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }

    return { isLoggedIn, login, logout, openModal, closeModal };
})();