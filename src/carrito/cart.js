
let carrito = [];

function agregarAlCarrito(productoId) {
    carrito.push(productoId);
}

function verCarrito() {
    return carrito;
}

module.exports = { agregarAlCarrito, verCarrito };

