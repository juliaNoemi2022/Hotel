const express = require("express")

const productos = require("../src/Controllers/productos.controllers")

const rutaProducto = express.Router()

rutaProducto.get("/",productos.totalProductos);


rutaProducto.post("/", productos.crearProducto);




module.exports = {rutaProducto}