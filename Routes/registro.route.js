const express = require("express");

const rutaRegistro = express.Router();


const registration = require("../src/Controllers/registro.controllers")
const registrationProd = require("../src/Controllers/registroProductos.controllers")

rutaRegistro.get("/habitaciones",registration.totalRegistroHab);

rutaRegistro.get("/habitaciones/vencidas",registration.registrosVencidasHab);

rutaRegistro.post("/habitaciones/checkin/:id", registration.check_inHab);

rutaRegistro.put("/habitaciones/checkout/:id", registration.check_outHab);


rutaRegistro.delete("/habitaciones/:id", registration.borrarRegistroHab);


rutaRegistro.put("/habitaciones/:id",registration.modiRegistroHab);

rutaRegistro.get("/productos/:id", registrationProd.buscarRegistroProd);

rutaRegistro.get("/productos", registrationProd.totalRegistroProd);

rutaRegistro.get("/productos/vencidos", registrationProd.registrosVencidosProd); 

rutaRegistro.post("/productos/checkin/:id", registrationProd.check_in);

rutaRegistro.delete("/productos/:id", registrationProd.borrarRegistroProd);

rutaRegistro.put("/productos/:id",registrationProd.modiRegistroProd);



module.exports = {rutaRegistro}