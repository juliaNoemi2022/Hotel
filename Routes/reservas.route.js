const express = require("express");

const rutaReserva = express.Router();

const reservation = require("../src/reservas.controllers");


rutaReserva.get("/habitaciones",reservation.totalReservasHab);

rutaReserva.get("/habitaciones/vencidas",reservation.reservasVencidasHab);

rutaReserva.post("/habitaciones", reservation.crearReservarHabi);


rutaReserva.delete("/habitaciones/:id", reservation.borrarReservaHab);


rutaReserva.put("/habitaciones/:id",reservation.modiReservaHab);

rutaReserva.get("/productos", reservation.totalReservasProdu);

rutaReserva.get("/productos/vencidas", reservation.reservasVencidasProdu) 

rutaReserva.delete("/productos/:id", reservation.borrarReservaProdu);

rutaReserva.put("productos/:id",reservation.modiReservaProd);



module.exports = {rutaReserva}