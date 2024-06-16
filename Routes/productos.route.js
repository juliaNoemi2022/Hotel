const express = require("express")

const productos = require("../src/Controllers/productos.controllers")

const middleware = require("../src/Middleware/productos.middleware")

const productoSchema = require("../src/Schemas/productos.schemas");

const schemaValidator = require("../src/Middleware/schema.validator");
const schemaValidatorURL = require("../src/Middleware/schema.validatorURL")
const SchemaURL = require("../src/Schemas/schemas.URL")



const rutaProducto = express.Router()

rutaProducto.get("/",productos.totalProductos);

rutaProducto.get("/:id",schemaValidatorURL(SchemaURL),middleware.existeProductoPorId,productos.buscarProductos);

rutaProducto.delete("/:id",schemaValidatorURL(SchemaURL),middleware.existeProductoPorId,productos.borrarProducto);


rutaProducto.post("/",schemaValidator(productoSchema),productos.crearProducto);




module.exports = {rutaProducto}