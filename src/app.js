

const PUERTO = 8080;

const express = require("express");
const app = express();

// Rutas

app.get("/", (req, res) => {
    // Ruta raíz de la aplicación
    res.send("¡Mi primera chamba!");
});

app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

app.get("/tienda", (req, res) => {
    res.send('¡Bienvenidos a la tienda!');
});

app.get("/contacto", (req, res) => {
    res.send('¡Bienvenidos al contacto!');
});

const misProductos = [
    { id: 1, nombre: "Fideos", precio: 150 },
    { id: 2, nombre: "Arroz", precio: 120 },
    { id: 3, nombre: "Pan", precio: 50 },
    { id: 4, nombre: "Leche", precio: 300 },
    { id: 5, nombre: "Queso", precio: 220 },
    { id: 6, nombre: "Manteca", precio: 120 },
    { id: 7, nombre: "Galletas", precio: 50 },
];

app.get("/productos", (req, res) => {
    res.send(misProductos);
});

app.get("/productos/:id", (req, res) => {
    let id = parseInt(req.params.id);
    const producto = misProductos.find(producto => producto.id === id);
    if (producto) {
        res.send(producto);
    } else {
        res.status(404).send('¡Producto no encontrado!');
    }
});

app.get('/clientes', (req, res) => {
    let nombre = req.query.nombre;
    let apellido = req.query.apellido;
});

app.get("/product", (req, res) => {
    let limit = parseInt(req.query.limit);
    console.log(typeof limit); // Corrección de error tipográfico
    let productos = misProductos.slice(0, limit);
    res.send(productos);
});
