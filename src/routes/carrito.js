const express = require("express");
const router = express.Router();
const Carrito = require("../models/carrito");
const Producto = require("../models/producto");

// Ver el carrito
router.get("/", async (req, res) => {
    try {
        // Buscamos todos los productos en el carrito
        const carrito = await Carrito.find().populate("producto");

        //html para mostrar productos
        let carritoHTML = carrito.map(item => `
            <div style="border: 1px solid #ccc; padding: 10px; margin-bottom: 10px;">
                <h3>${item.producto.nombre}</h3>
                <img src="${item.producto.imagen}" alt="${item.producto.nombre}" style="max-width: 200px;">
                <p>Precio: ${item.producto.precio}</p>
            </div>
        `).join('');

        // Enviamos la página HTML con los productos del carrito
        res.send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Carrito</title>
            </head>
            <body>
                <h1>Carrito de compras</h1>
                ${carritoHTML}
            </body>
            </html>
        `);
    } catch (error) {
        console.error("Error al obtener el carrito:", error);
        res.status(500).send("Error interno del servidor.");
    }
});

module.exports = router;
