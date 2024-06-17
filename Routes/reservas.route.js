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
const schemaValidatorURL = require("../src/Middleware/schema.validatorURL")
const SchemaURL = require("../src/Schemas/schemas.URL")



rutaReserva.get("/habitaciones",reservation.totalReservasHab);

rutaReserva.get("/habitaciones/vencidas",reservation.reservasVencidasHab);

rutaReserva.get("/habitaciones/:id",schemaValidatorURL(SchemaURL),middlewareReserva.existeReservaHabitacionesVencida,middlewareReserva.existeReservaPorId ,reservation.buscarReservarHabi);

rutaReserva.post("/habitaciones/:num", schemaValidatorURL(SchemaURL),schemaValidator(reservaSchema),middleware.existeHabitacionPorNumero,middlewareReserva.existeHabitacionPorIdReserva,middlewareRegistro.existeHabitacionPorIdRegistro,middlewareReserva.ReservaHabitacionesControlFechas,middlewareFuncion.existeReservaRegistroHabitacionPorFecha,middlewareCliente.validarNoExiteClientePorDni,middlewareHabi.controlCapacidadHabitacion,reservation.crearReservarHabi);



rutaReserva.delete("/habitaciones/:id",schemaValidatorURL(SchemaURL),middlewareReserva.existeReservaPorId ,reservation.borrarReservaHab);



rutaReserva.put("/habitaciones/:id",schemaValidatorURL(SchemaURL),schemaValidator(reservaSchema),middlewareReserva.existeReservaPorId,middlewareCliente.validarNoExiteClientePorDni,middlewareHabi.existeHabitacionPorId2,middlewareHabi.controlCapacidadHabitacion,middlewareReserva.existeHabitacionPorIdReserva,middlewareRegistro.existeHabitacionPorIdRegistro,middlewareReserva.ReservaHabitacionesControlFechas,middlewareFuncion.existeReservaRegistroHabitacionPorFecha2,reservation.modiReservaHab);


rutaReserva.get("/productos", reservation.totalReservasProdu);

rutaReserva.get("/productos/:id",schemaValidatorURL(SchemaURL),middlewareReserva.existeReservaProductoVencida,middlewareReserva.existeReservaProductoPorId ,reservation.buscarReservaProdu);

rutaReserva.post("/productos/:id",schemaValidatorURL(SchemaURL),schemaValidator(reservaProductoSchema),middlewareReservaProdu.existeProductoPorId,middlewareCliente.validarNoExiteClientePorDni,reservation.crearReservaProdu);

rutaReserva.get("/productos/vencidas", reservation.reservasVencidasProdu) 

rutaReserva.delete("/productos/:id", schemaValidatorURL(SchemaURL),middlewareReserva.existeReservaProductoPorId, reservation.borrarReservaProdu);

rutaReserva.put("/productos/:id",schemaValidatorURL(SchemaURL),schemaValidator(reservaProductoSchema),middlewareReserva.existeReservaProductoPorId,middlewareCliente.validarNoExiteClientePorDni,middlewareProdu.existeProductoPorId2,reservation.modiReservaProd,middlewareReserva.existeReservaProduPorIdMostrar);



module.exports = {rutaReserva}