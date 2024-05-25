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


rutaReserva.get("/habitaciones",reservation.totalReservasHab);

rutaReserva.get("/habitaciones/vencidas",reservation.reservasVencidasHab);

rutaReserva.get("/habitaciones/:id", reservation.buscarReservarHabi);

rutaReserva.post("/habitaciones/:num", middleware.existeHabitacionPorNumero,middlewareReserva.existeHabitacionPorIdReserva,middlewareRegistro.existeHabitacionPorIdRegistro,middlewareFuncion.existeReservaRegistroHabitacionPorFecha,middlewareCliente.validarNoExiteClientePorDni,middlewareHabi.controlCapacidadHabitacion,reservation.crearReservarHabi);


rutaReserva.delete("/habitaciones/:id", reservation.borrarReservaHab);


rutaReserva.put("/habitaciones/:id",reservation.modiReservaHab);

rutaReserva.get("/productos", reservation.totalReservasProdu);

rutaReserva.get("/productos/:id", reservation.buscarReservaProdu);

rutaReserva.post("/productos/:id",middlewareReservaProdu.existeProductoPorId,middlewareCliente.validarNoExiteClientePorDni,reservation.crearReservaProdu);

rutaReserva.get("/productos/vencidas", reservation.reservasVencidasProdu) 

rutaReserva.delete("/productos/:id", reservation.borrarReservaProdu);

rutaReserva.put("/productos/:id",reservation.modiReservaProd);



module.exports = {rutaReserva}