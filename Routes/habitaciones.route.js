const express = require("express")


const registrationHab = require("../src/Controllers/habitaciones.controllers")

const middleware = require("../src/Middleware/habitaciones.middleware")

const rutaHabitacion = express.Router()



rutaHabitacion.get("/",registrationHab.totalHabitaciones );

rutaHabitacion.get("/:num",registrationHab.buscarHabitacion );

rutaHabitacion.post("/",middleware.validarExiteHabitacionPorNumero ,registrationHab.crearHabitacion);



module.exports = {rutaHabitacion}