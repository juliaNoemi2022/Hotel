const express = require("express");

const rutaRegistro = express.Router();


const registration = require("../src/Controllers/registro.controllers")
const registrationProd = require("../src/Controllers/registroProductos.controllers")

const middlewareReservaHabi = require("../src/Middleware/reserva.middleware")

const middlewareHabi = require("../src/Middleware/habitaciones.middleware")

const middlewareProdu = require("../src/Middleware/registro.producto.middleware")

const middlewareRegistroHabi = require("../src/Middleware/registro.middleware")

const middlewareRegistroProdu = require("../src/Middleware/registro.producto.middleware")

const middlewareProductos = require("../src/Middleware/productos.middleware")


const middlewareFuncion = require("../src/Middleware/funcion.middleware")

const registroHabitacionesSchema = require("../src/Schemas/registro.schemas")
const registroProductosSchema = require("../src/Schemas/registro.producto.schemas")
const schemaValidator = require("../src/Middleware/schema.validator");



rutaRegistro.get("/habitaciones",registration.totalRegistroHab);

rutaRegistro.get("/habitaciones/:id",middlewareRegistroHabi.existeRegistroHabiVencido,middlewareRegistroHabi.existeRegistrohabByID,registration.buscarRegistrohab);

rutaRegistro.get("/habitaciones/vencidos",registration.registrosVencidasHab);

rutaRegistro.post("/habitaciones/checkin/:id",middlewareReservaHabi.existeReservaPorId,middlewareHabi.existeHabitacionPorId2,registration.check_inHab);

rutaRegistro.put("/habitaciones/checkout/:id", schemaValidator(registroHabitacionesSchema),middlewareRegistroHabi.existeRegistrohabByID,middlewareHabi.existeHabitacionPorId3,registration.check_outHab);


rutaRegistro.delete("/habitaciones/:id", middlewareRegistroHabi.existeRegistrohabByID,registration.borrarRegistroHab);


rutaRegistro.put("/habitaciones/:id",schemaValidator(registroHabitacionesSchema),middlewareRegistroHabi.existeRegistrohabByID,middlewareHabi.existeHabitacionPorId3,middlewareHabi.controlCapacidadHabitacion,middlewareReservaHabi.existeHabitacionPorIdReserva,middlewareRegistroHabi.existeHabitacionPorIdRegistro,middlewareFuncion.existeReservaRegistroHabitacionPorFecha3,registration.modiRegistroHab,middlewareRegistroHabi.existeRegistroHabiPorIdMostrar);





rutaRegistro.get("/productos/:id", middlewareProdu.existeProductoVencido,registrationProd.buscarRegistroProd);


rutaRegistro.get("/productos", registrationProd.totalRegistroProd);

rutaRegistro.get("/productos/vencidos", middlewareProdu.existeProductoVencido); 

rutaRegistro.post("/productos/checkin/:id",schemaValidator(registroProductosSchema),middlewareProdu.existeProductoPorIdReservaProdus ,registrationProd.check_in);

rutaRegistro.delete("/productos/:id", middlewareRegistroProdu.ProductoPorIdRegistroProdus,registrationProd.borrarRegistroProd);

rutaRegistro.put("/productos/:id",schemaValidator(registroProductosSchema),middlewareRegistroProdu.ProductoPorIdRegistroProdus,middlewareProductos.existeProductoPorId3,registrationProd.modiRegistroProd, middlewareRegistroProdu.existeRegistroProduPorIdMostrar);



module.exports = {rutaRegistro}