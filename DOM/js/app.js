document.addEventListener('DOMContentLoaded', function() {
    eventListener();
});

const ADMIN_USER = "admin";
const ADMIN_PASS = "administrador";

// Funcion para no solo aplicar un descuento del 50% sino de más que se asignen aqui y sea más reutilizable la funcion
const DiscountCode = {
    DESC50: 50,
    DESC10: 10,
    DESC20: 20,
    DESC30: 30,
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

let products = JSON.parse(localStorage.getItem('products')) || [];

let isAdmin = false;

/**Elementos del DOM */
const loginSection = document.getElementById('login-section');
const adminSection = document.getElementById('admin-section');
const productsGrid = document.getElementById('products-grid');
const productForm = document.getElementById('product-form');
const btnShowLogin = document.getElementById('btn-show-login');
const btnLogout = document.getElementById('btn-logout');


// funcion de autenticacion 

btnShowLogin.addEventListener('click', () => loginSection.classList.toggle('hidden'));

// Lógica para validar el usuario y la contraseña
document.getElementById('btn-login').addEventListener('click', () => {
    const user = document.getElementById('user-input').value;
    const pass = document.getElementById('pass-input').value;

    
    if (user === ADMIN_USER && pass === ADMIN_PASS) {
        isAdmin = true; 
        loginSection.classList.add('hidden');    
        adminSection.classList.remove('hidden'); 
        btnShowLogin.classList.add('hidden');    
        btnLogout.classList.remove('hidden');   
        renderProducts(); 
    } else {
        
        document.getElementById('login-error').classList.remove('hidden');
    }
});

    btnLogout.addEventListener('click', ()=>{
        isAdmin = false;
        adminSection.classList.add('hidden');
        btnLogout.classList.add('hidden');
        btnShowLogin.classList.remove('hidden');
        renderProducts();
    });

                    // CRUD PRODUCTOS//

    // Crear

    productForm.addEventListener('submit', (e) => {
    e.preventDefault(); 
    
    // TOmando r
    const img = document.getElementById('prod-img').value;
    const name = document.getElementById('prod-name').value;
    const description = document.getElementById('prod-description').value;
    const price = document.getElementById('prod-price').value;
    const off = document.getElementById('prod-off').value;
    const editIndex = document.getElementById('edit-index').value;

    if (editIndex === "") {
        
        products.push(
            { 
                img,
                name,
                description, 
                price,
                off 
            });
    } else {
        
        products[editIndex] = { img, name, description, price, off };
        document.getElementById('edit-index').value = ""; 
    }

        saveAndRender(); 
    productForm.reset();
});


// Editar 
function editProduct(index) {
    const prod = products[index];
    
    document.getElementById('prod-img').value = prod.img;
    document.getElementById('prod-name').value = prod.name;
    document.getElementById('prod-description').value = prod.description;
    document.getElementById('prod-price').value = prod.price;
    document.getElementById('prod-off').value = prod.off;
    document.getElementById('edit-index').value = index; 
    window.scrollTo(0, 0); 
}

// Guardar
function saveAndRender() {
    localStorage.setItem('products', JSON.stringify(products));
    renderProducts();
}

// Borrar
function deleteProduct(index) {
    if(confirm("¿Estás seguro de eliminar este producto?")) {
        products.splice(index, 1); // Borra 1 elemento en la posición 'index'
        saveAndRender();
    }
}
    
// renderizado del DOM lo cual se va a mostrar

function renderProducts(){
    productsGrid.innerHTML = '';

    products.forEach((prod, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';

        const descuento = applyDiscount(prod.price, prod.off);
        // Metodo para la visualizacion que fuese más realista y atractiva
        const precioHTML = descuento
            ? `<p>
                <strong>Precio: </strong>
                <span style="text-decoration: line-through; color: gray;">$${parseFloat(prod.price).toFixed(2)}</span>
                <span style="color: green; font-weight: bold; margin-left: 6px;">
                    $${descuento.precioFinal}
                </span>
                <span style="color: green; font-size: 0.85em; margin-left: 4px;">
                    OFF${descuento.porcentaje}%
                </span>
               </p>`
            : `<p><strong>Precio: </strong>$${parseFloat(prod.price).toFixed(2)}</p>`;

            // Vista del stock, imagen, nombre, descripcion, precio y su descuento.
        card.innerHTML = `
        
            <img src="${prod.img}" alt="${prod.name}">
            <div class="card-body">
            <h3>${prod.name}</h3>
            <p>${prod.description}</p>
            ${precioHTML}

        ${isAdmin ?`
            
            <button class ="btn-edit" onclick= "editProduct(${index})">Editar producto</button>
            <button class ="btn-delete" onclick= "deleteProduct(${index})">Eliminar producto</button>`:''
            
        }`;

            productsGrid.appendChild(card);

    });
}

// carga inicial al abrir la pagina 
renderProducts();