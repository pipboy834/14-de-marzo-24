const mongoose = require("mongoose");

const productoSchema = new mongoose.Schema({
    nombre: String,
    precio: Number,
    descripcion: String,
    codigo_barras: String,
    status: { type: String, default: "disponible" }
});

module.exports = mongoose.model("Producto", productoSchema);
