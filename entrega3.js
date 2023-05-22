//Simple verificacion de "Persona" (WIP)

const nombreUsuario = prompt("¿Eres personal de Coderhouse? Si/No");

if (nombreUsuario === "Si") {
    // Código a ejecutar si el usuario ingresa "Si"
    alert("Bienvenido, Profe y tutor!");
    
} else {
    // Código a ejecutar si el usuario no es "No" persona
    alert("Acceso denegado. El usuario debe ser personal de Coder.");
    window.location.href = "https://img.freepik.com/vector-gratis/fondo-pagina-error-404-distorsion_23-2148090410.jpg?w=826&t=st=1684793465~exp=1684794065~hmac=f0b2a37d932c56d808c81837231cb6357aac7efbc46096df521914b58f04caac";
}



let Carro = []; // Items del carro en Array
let Almacen = []; // Stock de productos en Array

// Triggers del DOM
const tabla = document.getElementById('items');
const selectProductos = document.getElementById('productos');
const btnAgregar = document.getElementById('agregar');
const btnOrdenar = document.getElementById('ordenar');
const btnVaciar = document.getElementById('vaciar');
const total = document.getElementById('total');

// Push para almacen, Agregar items al carro
Almacen.push(new Productos('Cafe', 1250, 'Santo domingo'));
Almacen.push(new Productos('Cerveza', 250, 'Patagonia Bohemian'));
Almacen.push(new Productos('Panificaciones', 35, 'Medialunas La lunita'));
Almacen.push(new Productos('Costilla', 3240, 'Carnes Argentinas'));
Almacen.push(new Productos('Salsa Ali Oli', 340, 'Dos Anclas'));
Almacen.push(new Productos('Jugo Multifruta', 800, 'Baggio'));
Almacen.push(new Productos('Mayonesa', 250, 'Hellmanns'));
Almacen.push(new Productos('Galletitas', 100, 'Sonrisas'));
Almacen.push(new Productos('Aceitunas', 80, 'Olivares'));
Almacen.push(new Productos('Jamon', 150, 'Serrano Paladini'));

localStorage.setItem('Almacen', JSON.stringify(Almacen));

allEventListeners();

function allEventListeners() {
window.addEventListener('DOMContentLoaded', traerItems);
btnVaciar.addEventListener('click', vaciarCarrito);

btnAgregar.addEventListener('submit', (e) => {
    e.preventDefault(); // No refrescar la página
    const productoSeleccionado = Almacen[+selectProductos.value]; // Obtención de producto
    console.log(productoSeleccionado);
    const indiceCarrito = Carro.findIndex(
    (item) => item.producto.nombre === productoSeleccionado.nombre
    );
    console.log(indiceCarrito);
    if (indiceCarrito !== -1) {
    Carro[indiceCarrito].cantidad++;
    } else {
    const item = new Item(productoSeleccionado, 1);
    Carro.push(item);
    }
    // Actualización de carrito
    actualizarTablaCarrito();
    localStorage.setItem('Carro', JSON.stringify(Carro));
});
}

// Función para traer items del local al carro
function traerItems() {
Almacen = JSON.parse(localStorage.getItem('Almacen')) || [];
Carro = JSON.parse(localStorage.getItem('Carro')) || [];
popularDropDown();
actualizarTablaCarrito();
}

function popularDropDown() {
Almacen.forEach((producto, index) => {
    const option = document.createElement('option');
    option.textContent = `${producto.nombre}: ${producto.precio}`;
    option.value = index;
    selectProductos.appendChild(option);
});
}

function actualizarTablaCarrito() {
tabla.innerHTML = '';
total.innerText = 0;
Carro.length ? btnVaciar.removeAttribute('disabled') : btnVaciar.setAttribute('disabled', true);
Carro.forEach((item) => {
    newRow(item);
});
}

// Creación de líneas para la tabla
function newRow(item) {
const row = document.createElement('tr');
let td = document.createElement('td');
const posCarrito = Carro.indexOf(item);

td.classList.add('font-white');
td.textContent = item.producto.nombre;
row.appendChild(td);

td.classList.add('font-white');
td = document.createElement('td');
td.textContent = item.cantidad;
row.appendChild(td);

td.classList.add('font-white');
td = document.createElement('td');
td.textContent = item.producto.precio;

row.appendChild(td);

const btnEliminar = document.createElement('button');
btnEliminar.className = 'btn btn-danger';
btnEliminar.textContent = 'Eliminar';

btnEliminar.onclick = () => {
    Carro.splice(posCarrito, 1);
    actualizarTablaCarrito();
    localStorage.setItem('Carro', JSON.stringify(Carro));
};

td = document.createElement('td');
td.appendChild(btnEliminar);
row.appendChild(td);
  tabla.appendChild(row); // Agrego la nueva fila al tbody
btnVaciar.removeAttribute('disabled');

  // Cálculo del total
  total.innerText = Carro.reduce((acumulador, item) => acumulador + item.producto.precio * item.cantidad, 0);
}

function vaciarCarrito() {
Swal.fire({
    title: '¿Desea eliminar los items del carrito?',
    confirmButtonText: 'Sí',
    showCancelButton: true,
    cancelButtonText: 'No',
}).then((resultado) => {
    if (resultado.isConfirmed) {
    Carro = [];
    localStorage.setItem('Carro', JSON.stringify(Carro));
    actualizarTablaCarrito();
    Swal.fire({
        title: 'Su carro ha sido vaciado!',
        showClass: {
        popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
        }
    });
    }
});
}
