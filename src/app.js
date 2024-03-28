const PUERTO = 8080;
const express = require("express");
const fs = require("fs");
const app = express();

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

let misProductos = [];

// Cargar los productos desde el archivo JSON
fs.readFile("productos.json", "utf8", (err, data) => {
    if (err) {
        console.error("Error al cargar los productos:", err);
        return;
    }
    misProductos = JSON.parse(data);
    console.log("Productos cargados correctamente.");
});

// Rutas
app.get("/", (req, res) => {
    res.send("¡Mi primera chamba!");
});

app.get("/tienda", (req, res) => {
    res.send('¡Bienvenidos a la tienda!');
});

app.get("/contacto", (req, res) => {
    res.send('¡Bienvenidos al contacto!');
});

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

app.post("/productos", (req, res) => {
    const nuevoProducto = req.body;
    if (!nuevoProducto || !nuevoProducto.nombre || !nuevoProducto.precio) {
        return res.status(400).send("Se requiere un objeto de producto con nombre y precio.");
    }

    // Obtener el último ID de la lista de productos
    const ultimoID = misProductos.length > 0 ? misProductos[misProductos.length - 1].id : 0;
    // Generar un nuevo ID sumando 1 al último ID
    const nuevoID = ultimoID + 1;
    // Asignar el nuevo ID al producto
    nuevoProducto.id = nuevoID;

    misProductos.push(nuevoProducto);
    // Guardar los productos actualizados en el archivo JSON
    fs.writeFile("productos.json", JSON.stringify(misProductos), (err) => {
        if (err) {
            console.error("Error al guardar el producto:", err);
            return res.status(500).send("Error interno del servidor.");
        }
        res.status(201).send("Producto agregado correctamente.");
    });
});

app.put("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, precio, status, descripcion, codigo_barras } = req.body;

    // Buscar el producto por su ID
    const productoIndex = misProductos.findIndex(producto => producto.id === id);
    if (productoIndex === -1) {
        return res.status(404).send("Producto no encontrado.");
    }

    // Actualizar los campos del producto si se proporcionan en la solicitud
    if (nombre !== undefined) {
        misProductos[productoIndex].nombre = nombre;
    }
    if (precio !== undefined) {
        misProductos[productoIndex].precio = precio;
    }
    if (status !== undefined) {
        misProductos[productoIndex].status = status;
    }
    if (descripcion !== undefined) {
        misProductos[productoIndex].descripcion = descripcion;
    }
    if (codigo_barras !== undefined) {
        misProductos[productoIndex].codigo_barras = codigo_barras;
    }

    // Guardar los productos actualizados en el archivo JSON
    fs.writeFile("productos.json", JSON.stringify(misProductos), (err) => {
        if (err) {
            console.error("Error al guardar el producto:", err);
            return res.status(500).send("Error interno del servidor.");
        }
        res.status(200).send("Producto actualizado correctamente.");
    });
});

app.delete("/productos/:id", (req, res) => {
    const id = parseInt(req.params.id);

    // Buscar el índice del producto en el array
    const productoIndex = misProductos.findIndex(producto => producto.id === id);
    if (productoIndex === -1) {
        return res.status(404).send("Producto no encontrado.");
    }

    // Eliminar el producto del array
    misProductos.splice(productoIndex, 1);

    // Guardar los productos actualizados en el archivo JSON
    fs.writeFile("productos.json", JSON.stringify(misProductos), (err) => {
        if (err) {
            console.error("Error al guardar los productos:", err);
            return res.status(500).send("Error interno del servidor.");
        }
        res.status(200).send("Producto eliminado correctamente.");
    });
});

app.get('/clientes', (req, res) => {
    let nombre = req.query.nombre;
    let apellido = req.query.apellido;
});

app.get("/product", (req, res) => {
    let limit = parseInt(req.query.limit);
    let productos = misProductos.slice(0, limit);
    res.send(productos);
});

// Inicio del servidor
app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});

