const mongoose = require("mongoose");

const carritoSchema = new mongoose.Schema({
    producto: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Producto'
    }
});

module.exports = mongoose.model("Carrito", carritoSchema);
