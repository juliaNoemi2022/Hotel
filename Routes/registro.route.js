const express = require("express");

const rutaRegistro = express.Router();


const registration = require("../src/Controllers/registro.controllers")
const registrationProd = require("../src/Controllers/registroProductos.controllers")

const middlewareReservaHabi = require("../src/Middleware/reserva.middleware")

const middlewareHabi = require("../src/Middleware/habitaciones.middleware")

const middlewareProdu = require("../src/Middleware/registro.producto.middleware")



rutaRegistro.get("/habitaciones",registration.totalRegistroHab);

rutaRegistro.get("/habitaciones/vencidas",registration.registrosVencidasHab);

rutaRegistro.post("/habitaciones/checkin/:id",middlewareReservaHabi.existeReservaPorId,middlewareHabi.existeHabitacionPorId,registration.check_inHab);

rutaRegistro.put("/habitaciones/checkout/:id", registration.check_outHab);


rutaRegistro.delete("/habitaciones/:id", registration.borrarRegistroHab);


rutaRegistro.put("/habitaciones/:id",registration.modiRegistroHab);

rutaRegistro.get("/productos/:id", middlewareProdu.existeProductoVencido,registrationProd.buscarRegistroProd);


rutaRegistro.get("/productos", registrationProd.totalRegistroProd);

rutaRegistro.get("/productos/vencidos", middlewareProdu.existeProductoVencido); 

rutaRegistro.post("/productos/checkin/:id",middlewareProdu.existeProductoPorIdReservaProdus ,registrationProd.check_in);

rutaRegistro.delete("/productos/:id", registrationProd.borrarRegistroProd);

rutaRegistro.put("/productos/:id",registrationProd.modiRegistroProd);



module.exports = {rutaRegistro}