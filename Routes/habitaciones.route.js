const express = require("express")


const registrationHab = require("../src/Controllers/habitaciones.controllers")

const middleware = require("../src/Middleware/habitaciones.middleware")

const schemaValidator = require("../src/Middleware/schema.validator")
const schemaValidatorURL = require("../src/Middleware/schema.validatorURL")
const SchemaURL = require("../src/Schemas/schemas.URL")
const habitacionSchema = require("../src/Schemas/habitaciones.schemas")

const rutaHabitacion = express.Router()



rutaHabitacion.get("/",registrationHab.totalHabitaciones );

rutaHabitacion.get("/:num",schemaValidatorURL(SchemaURL),middleware.existeHabitacionPorNumero ,registrationHab.buscarHabitacion );

rutaHabitacion.post("/",schemaValidator(habitacionSchema),middleware.validarExiteHabitacionPorNumero ,registrationHab.crearHabitacion);

rutaHabitacion.delete("/:num",schemaValidatorURL(SchemaURL),middleware.existeHabitacionPorNumero,registrationHab.borrarHabitacion );



module.exports = {rutaHabitacion}