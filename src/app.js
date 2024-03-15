

const PUERTO = 8080


const express = require("express")
const app = express()

//rutas

app.get ("/", (req, res)=> {
    //cuando utilizo "/" estoy haciendo referencia a la ruta raiz de mi app
    res.send("mi primera chamba")
})

app.listen(PUERTO, ()=> {
    console.log(`escuchando en ${PUERTO}`)
}) 

app.get("/tienda", (req, res)=>{
    res.send('bienvenidos a la tienda')
})

app.get("/contacto", (req, res)=>{
    res.send('bienvenidos al contacto')
})


const misProductos = [
    { id:1, nombre:"Fideos", precio:150 },
    { id:2, nombre:"Arroz", precio:120 },
    { id:3, nombre:"Pan", precio:50 },
    { id:4, nombre:"Leche", precio:300 },
    { id:5, nombre:"Queso", precio:220 },
    { id:6, nombre:"Manteca", precio:120 },
    { id:7, nombre:"Galletas", precio:50 },
];


app.get("/productos", (req, res)=>{
    res.send(misProductos)

})



app.get("/productos/:id", (req, res)=>{
    let id = parseInt(req.params.id)
    //siempre que reccuperan un dato es un STRING
    // PARA SOLUCIONAR parseInt
    const producto = misProductos.find ( producto => producto.id == id)
    if (producto){
        res.send(producto)
    } else {
        res.send('producto no encontrado vsmos a morir')
    }
})


app.get('/clientes', (req, res)=>{
    let nombre = req.query.nombre
    let apellido= req.query.apellido
})


app.get("/product", (req, res)=>{
    let limit = parseInt(req.query.limit)
    console.lug(typeof limit)
    let productos = misProductos.slice (0, limit)
    res.send(productos)

})