const express = require("express");

const rutaReserva = express.Router();

const reservation = require("../src/Controllers/reservas.controllers");


rutaReserva.get("/habitaciones",reservation.totalReservasHab);

rutaReserva.get("/habitaciones/vencidas",reservation.reservasVencidasHab);

rutaReserva.get("/habitaciones/:id", reservation.buscarReservarHabi);

rutaReserva.post("/habitaciones/:id", reservation.crearReservarHabi);


rutaReserva.delete("/habitaciones/:id", reservation.borrarReservaHab);


rutaReserva.put("/habitaciones/:id",reservation.modiReservaHab);

rutaReserva.get("/productos", reservation.totalReservasProdu);

rutaReserva.get("/productos/:id", reservation.buscarReservaProdu);

rutaReserva.post("/productos/:id", reservation.crearReservaProdu);

rutaReserva.get("/productos/vencidas", reservation.reservasVencidasProdu) 

rutaReserva.delete("/productos/:id", reservation.borrarReservaProdu);

rutaReserva.put("/productos/:id",reservation.modiReservaProd);



module.exports = {rutaReserva}