const express = require("express")


const registrationHab = require("../src/Controllers/habitaciones.controllers")

const middleware = require("../src/Middleware/habitaciones.middleware")

const schemaValidator = require("../src/Middleware/schema.validator")

const habitacionSchema = require("../src/Schemas/habitaciones.schemas")
const rutaHabitacion = express.Router()



rutaHabitacion.get("/",registrationHab.totalHabitaciones );

rutaHabitacion.get("/:num",middleware.existeHabitacionPorNumero ,registrationHab.buscarHabitacion );

rutaHabitacion.post("/",schemaValidator(habitacionSchema),middleware.validarExiteHabitacionPorNumero ,registrationHab.crearHabitacion);

rutaHabitacion.delete("/:num",middleware.existeHabitacionPorNumero,registrationHab.borrarHabitacion );



module.exports = {rutaHabitacion}