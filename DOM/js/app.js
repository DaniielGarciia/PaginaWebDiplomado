/**
 * app.js — Lógica de productos para DanMusic
 * Depende de auth.js para la gestión de sesión.
 */

document.addEventListener('DOMContentLoaded', function () {
    // Callbacks que auth.js llamará cuando cambie la sesión
    window.onAdminLogin  = () => {
        showAdminSection();
        renderProducts();
    };
    window.onAdminLogout = () => {
        hideAdminSection();
        renderProducts();
    };

    // Estado inicial según sesión activa
    if (AUTH.isLoggedIn()) {
        showAdminSection();
    }

    renderProducts();
    attachProductFormListener();
});

// ── Descuentos ────────────────────────────────────────────────────────────────
const DiscountCode = {
    DESC50:  50,
    DESC10:  10,
    DESC20:  20,
    DESC30:  30,
    DESC100: 100
};

function applyDiscount(price, offCode) {
    const porcentaje = DiscountCode[offCode?.toUpperCase()?.trim()];
    if (!porcentaje) return null;
    const precioOriginal = parseFloat(price);
    const descuento = precioOriginal * (porcentaje / 100);
    return {
        precioFinal: (precioOriginal - descuento).toFixed(2),
        porcentaje
    };
}

// ── Datos ─────────────────────────────────────────────────────────────────────
let products = JSON.parse(localStorage.getItem('products')) || [];

// ── Secciones admin ───────────────────────────────────────────────────────────
function showAdminSection() {
    const adminSection = document.getElementById('admin-section');
    const loginSection = document.getElementById('login-section');
    if (adminSection) adminSection.classList.remove('hidden');
    if (loginSection) loginSection.classList.add('hidden');
}

function hideAdminSection() {
    const adminSection = document.getElementById('admin-section');
    if (adminSection) adminSection.classList.add('hidden');
}

// ── Formulario de productos ───────────────────────────────────────────────────
function attachProductFormListener() {
    const productForm = document.getElementById('product-form');
    if (!productForm) return;

    productForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const img         = document.getElementById('prod-img').value;
        const name        = document.getElementById('prod-name').value;
        const description = document.getElementById('prod-description').value;
        const price       = document.getElementById('prod-price').value;
        const off         = document.getElementById('prod-off').value;
        const editIndex   = document.getElementById('edit-index').value;

        if (editIndex === "") {
            products.push({ img, name, description, price, off });
        } else {
            products[editIndex] = { img, name, description, price, off };
            document.getElementById('edit-index').value = "";
        }

        saveAndRender();
        productForm.reset();
    });
}

// ── CRUD ──────────────────────────────────────────────────────────────────────
function editProduct(index) {
    const prod = products[index];
    document.getElementById('prod-img').value         = prod.img;
    document.getElementById('prod-name').value        = prod.name;
    document.getElementById('prod-description').value = prod.description;
    document.getElementById('prod-price').value       = prod.price;
    document.getElementById('prod-off').value         = prod.off;
    document.getElementById('edit-index').value       = index;
    window.scrollTo(0, 0);
}

function deleteProduct(index) {
    if (confirm("¿Estás seguro de eliminar este producto?")) {
        products.splice(index, 1);
        saveAndRender();
    }
}

function saveAndRender() {
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
}

// ── Render ────────────────────────────────────────────────────────────────────
function renderProducts() {
    const productsGrid = document.getElementById('products-grid');
    if (!productsGrid) return;

    const isAdmin = AUTH.isLoggedIn();
    productsGrid.innerHTML = '';

    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column:1/-1; text-align:center; padding:40px; color:#888;">
                <p style="font-size:2rem;">🎸</p>
                <p>No hay productos aún.${isAdmin ? ' ¡Agrega el primero!' : ''}</p>
            </div>`;
        return;
    }

    products.forEach((prod, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const descuento = applyDiscount(prod.price, prod.off);

        const precioHTML = descuento
            ? `<p>
                <strong>Precio: </strong>
                <span style="text-decoration:line-through; color:gray;">$${parseFloat(prod.price).toFixed(2)}</span>
                <span style="color:green; font-weight:bold; margin-left:6px;">$${descuento.precioFinal}</span>
                <span style="color:green; font-size:0.85em; margin-left:4px;">OFF${descuento.porcentaje}%</span>
               </p>`
            : `<p><strong>Precio: </strong>$${parseFloat(prod.price).toFixed(2)}</p>`;

        card.innerHTML = `
            <img src="${prod.img}" alt="${prod.name}" onerror="this.src='https://placehold.co/400x150?text=Sin+imagen'">
            <div class="card-body">
                <h3>${prod.name}</h3>
                <p>${prod.description}</p>
                ${precioHTML}
                ${isAdmin ? `
                <div class="card-actions">
                    <button class="btn-edit"   onclick="editProduct(${index})">Editar</button>
                    <button class="btn-delete" onclick="deleteProduct(${index})">Eliminar</button>
                </div>` : ''}
            </div>`;

        productsGrid.appendChild(card);
    });
}