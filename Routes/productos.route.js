const express = require("express")

const productos = require("../src/productos.controllers")
//const registrationProd = require("../src/registroProductos.controllers")

const rutaProducto = express.Router()

rutaProducto.get("/",productos.totalProductos);

//rutaProducto.get("/habitaciones",productos.totalHabitaciones );

//rutaProducto.post("/habitaciones", productos.crearHabitacion);

rutaProducto.post("/", productos.crearProducto);

//rutaProducto.get("/registros",registrationProd.totalRegistroProd);

//rutaProducto.get("/vencidos",registrationProd.registrosVencidosProd);

//rutaProducto.post("/checkin/:id", registrationProd.check_in);

//rutaProducto.delete("/registros/:id", registrationProd.borrarRegistroProd);

//rutaProducto.put("/registros/:id",registrationProd.modiRegistroProd);


module.exports = {rutaProducto}