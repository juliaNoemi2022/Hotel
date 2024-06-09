const express = require("express")

const productos = require("../src/Controllers/productos.controllers")

const middleware = require("../src/Middleware/productos.middleware")

const productoSchema = require("../src/Schemas/productos.schemas");
const schemaValidator = require("../src/Middleware/schema.validator");

const rutaProducto = express.Router()

rutaProducto.get("/",productos.totalProductos);

rutaProducto.get("/:id",middleware.existeProductoPorId,productos.buscarProductos);

rutaProducto.delete("/:id",middleware.existeProductoPorId,productos.borrarProducto);


rutaProducto.post("/",schemaValidator(productoSchema),productos.crearProducto);




module.exports = {rutaProducto}