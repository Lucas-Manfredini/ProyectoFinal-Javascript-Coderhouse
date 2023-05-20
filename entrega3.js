const personasAutorizadas = ["Rodrigo", "Melina", "Lucas"]; // Nombres de las personas autorizadas puestas en un array

function verificarIngreso() {
const nombre = prompt("Por favor, ingrese su nombre:");

if (personasAutorizadas.includes(nombre)) {
    console.log("¡Bienvenido, " + nombre + "! Puedes acceder al Carro de compras.");
    // Aquí puedes agregar el resto del código que deseas ejecutar
} else {
    console.log("Lo siento, no tienes acceso al Carro de compras.");
}
}

verificarIngreso();



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