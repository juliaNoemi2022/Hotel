const express = require("express")

const productos = require("../src/Controllers/productos.controllers")

//const schemaValidator = require("../Middleware/schema.validator")

const productoSchema = require("../src/Schemas/productos.schemas");
const schemaValidator = require("../src/Middleware/schema.validator");

const rutaProducto = express.Router()

rutaProducto.get("/",productos.totalProductos);


rutaProducto.post("/",schemaValidator(productoSchema),productos.crearProducto);




module.exports = {rutaProducto}