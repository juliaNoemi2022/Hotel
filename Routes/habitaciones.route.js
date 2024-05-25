const express = require("express")

//const productos = require("../src/productos.controllers")
const registrationHab = require("../src/Controllers/habitaciones.controllers")

const middleware = require("../src/Middleware/habitaciones.middleware")

const rutaHabitacion = express.Router()

//rutaProducto.get("/productos",productos.totalProductos);

rutaHabitacion.get("/",registrationHab.totalHabitaciones );

rutaHabitacion.get("/:num",registrationHab.buscarHabitacion );

rutaHabitacion.post("/",middleware.validarExiteHabitacionPorNumero ,registrationHab.crearHabitacion);

//rutaProducto.post("/productos", productos.crearProducto);

//rutaProducto.get("/registros",registrationProd.totalRegistroProd);

//rutaProducto.get("/vencidos",registrationProd.registrosVencidosProd);

//rutaProducto.post("/checkin/:id", registrationProd.check_in);

//rutaProducto.delete("/registros/:id", registrationProd.borrarRegistroProd);

//rutaProducto.put("/registros/:id",registrationProd.modiRegistroProd);


module.exports = {rutaHabitacion}