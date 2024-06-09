const express = require("express");

const rutaReserva = express.Router();


const reservation = require("../src/Controllers/reservas.controllers");

const middleware = require("../src/Middleware/habitaciones.middleware")

const middlewareCliente = require("../src/Middleware/cliente.middleware")

const middlewareReserva = require("../src/Middleware/reserva.middleware")

const middlewareRegistro = require("../src/Middleware/registro.middleware")

const middlewareFuncion = require("../src/Middleware/funcion.middleware")

const middlewareHabi = require("../src/Middleware/habitaciones.middleware")

const middlewareReservaProdu = require("../src/Middleware/reserva.producto.middleware")

const middlewareProdu = require("../src/Middleware/productos.middleware")

const reservaSchema = require("../src/Schemas/reservas.schemas")
const reservaProductoSchema = require("../src/Schemas/reservas.producto.schemas")
const schemaValidator = require("../src/Middleware/schema.validator");



rutaReserva.get("/habitaciones",reservation.totalReservasHab);

rutaReserva.get("/habitaciones/vencidas",reservation.reservasVencidasHab);

rutaReserva.get("/habitaciones/:id",middlewareReserva.existeReservaHabitacionesVencida,middlewareReserva.existeReservaPorId ,reservation.buscarReservarHabi);

rutaReserva.post("/habitaciones/:num", schemaValidator(reservaSchema),middleware.existeHabitacionPorNumero,middlewareReserva.existeHabitacionPorIdReserva,middlewareRegistro.existeHabitacionPorIdRegistro,middlewareFuncion.existeReservaRegistroHabitacionPorFecha,middlewareCliente.validarNoExiteClientePorDni,middlewareHabi.controlCapacidadHabitacion,reservation.crearReservarHabi);



rutaReserva.delete("/habitaciones/:id",middlewareReserva.existeReservaPorId ,reservation.borrarReservaHab);



rutaReserva.put("/habitaciones/:id",schemaValidator(reservaSchema),middlewareReserva.existeReservaPorId,middlewareCliente.validarNoExiteClientePorDni,middlewareHabi.existeHabitacionPorId2,middlewareHabi.controlCapacidadHabitacion,middlewareReserva.existeHabitacionPorIdReserva,middlewareRegistro.existeHabitacionPorIdRegistro,middlewareFuncion.existeReservaRegistroHabitacionPorFecha2,reservation.modiReservaHab);


rutaReserva.get("/productos", reservation.totalReservasProdu);

rutaReserva.get("/productos/:id",middlewareReserva.existeReservaProductoVencida,middlewareReserva.existeReservaProductoPorId ,reservation.buscarReservaProdu);

rutaReserva.post("/productos/:id",schemaValidator(reservaProductoSchema),middlewareReservaProdu.existeProductoPorId,middlewareCliente.validarNoExiteClientePorDni,reservation.crearReservaProdu);

rutaReserva.get("/productos/vencidas", reservation.reservasVencidasProdu) 

rutaReserva.delete("/productos/:id", middlewareReserva.existeReservaProductoPorId, reservation.borrarReservaProdu);

rutaReserva.put("/productos/:id",schemaValidator(reservaProductoSchema),middlewareReserva.existeReservaProductoPorId,middlewareCliente.validarNoExiteClientePorDni,middlewareProdu.existeProductoPorId2,reservation.modiReservaProd,middlewareReserva.existeReservaProduPorIdMostrar);



module.exports = {rutaReserva}