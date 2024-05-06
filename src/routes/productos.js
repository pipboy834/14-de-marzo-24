const express = require("express");
const router = express.Router();
const Producto = require("../models/producto");
const Carrito = require("../models/carrito"); // Importamos el modelo del carrito

// Obtener todos los productos con imagen y botón de agregar al carrito
router.get("/", async (req, res) => {
    try {
        const productos = await Producto.find(); // Obtener todos los productos
        let productosVisual = productos.map(producto => `
            <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                <h3>${producto.nombre}</h3>
                <img src="${producto.imagen}" alt="${producto.nombre}" style="max-width: 200px;">
                <p>Precio: ${producto.precio}</p>
                <form action="/productos/agregarAlCarrito/${producto._id}" method="POST">
                    <button type="submit">Agregar al carrito</button>
                </form>
            </div>
        `);
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Tienda</title>
                <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script> <!-- Asegúrate de tener la ruta correcta para SweetAlert -->
                <script>
                    function agregarAlCarrito(id, nombre) {
                        // Aquí puedes hacer una petición al servidor para agregar el producto al carrito
                        // Simulamos una petición con SweetAlert
                        Swal.fire({
                            icon: 'success',
                            title: 'Producto agregado al carrito',
                            text: 'Se agregó ' + nombre + ' al carrito con éxito.',
                            timer: 2000, // Muestra el mensaje durante 2 segundos
                            showConfirmButton: false // No muestra el botón de confirmación
                        });
                    }
                </script>
            </head>
            <body>
                <h1>Productos disponibles</h1>
                ${productosVisual.join('')}
            </body>
            </html>
        `);
    } catch (error) {
        console.error("Error al obtener los productos:", error);
        res.status(500).send("Error interno del servidor.");
    }
});

// Agregar un producto al carrito
router.post("/agregarAlCarrito/:id", async (req, res) => {
    try {
        const producto = await Producto.findById(req.params.id);
        if (!producto) {
            return res.status(404).send("Producto no encontrado");
        }

        // Agregamos el producto al carrito en la base de datos
        await Carrito.create({ producto: producto._id });

        // Redireccionamos a la página de productos con un mensaje de éxito
        res.redirect("/productos?agregado=true");
    } catch (error) {
        console.error("Error al agregar el producto al carrito:", error);
        res.status(500).send("Error interno del servidor.");
    }
});

module.exports = router;
