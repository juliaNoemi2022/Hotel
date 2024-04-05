const express = require("express");

const rutaRegistro = express.Router();


const registration = require("../src/registro.controllers")


rutaRegistro.get("/habitaciones",registration.totalRegistroHab);

rutaRegistro.get("/habitaciones/vencidas",registration.registrosVencidasHab);

rutaRegistro.post("/habitaciones/checkin/:id", registration.check_inHab);

rutaRegistro.post("/habitaciones/checkout/:id", registration.check_outHab);


rutaRegistro.delete("/habitaciones/:id", registration.borrarRegistroHab);


rutaRegistro.put("/habitaciones/:id",registration.modiRegistroHab);

rutaRegistro.get("/productos", registration.totalRegistroProd);

rutaRegistro.get("/productos/vencidos", registration.registrosVencidosProd) 

rutaRegistro.post("/productos/checkin/:id", registration.check_inProd);

rutaRegistro.delete("productos/:id", registration.borrarRegistroProd);

rutaRegistro.put("productos/:id",registration.modiRegistroProd);



module.exports = {rutaRegistro}