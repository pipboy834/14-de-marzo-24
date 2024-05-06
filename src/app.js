const PUERTO = 6065;
const express = require("express");
const mongoose = require("mongoose");
const productosRouter = require("./routes/productos");
const carritoRouter = require("./routes/carrito");
const Producto = require ("./models/producto")

const app = express();

// Middleware para analizar el cuerpo de las solicitudes JSON
app.use(express.json());

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal!');
});

// Conexión a la base de datos de MongoDB
mongoose.connect("mongodb://localhost:27017/tienda", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conexión a MongoDB establecida"))
    .catch(err => console.error("Error al conectar a MongoDB:", err));

// Rutas
app.use("/productos", productosRouter);
app.use("/carrito", carritoRouter);

// Inicio del servidor
const server = app.listen(PUERTO, () => {
    console.log(`Escuchando en el puerto ${PUERTO}`);
});



// Manejo de la señal SIGINT para cerrar el servidor adecuadamente
process.on('SIGINT', () => {
    console.log('Cerrando el servidor...');
    server.close(() => {
        console.log('Servidor cerrado.');
        process.exit(0);
    });
});
