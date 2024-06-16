



const express = require("express");



const rutaCliente = express.Router();

const middlewareCliente = require("../src/Middleware/cliente.middleware")

const cliente = require("../src/Controllers/clientes.controllers");
const schemaValidator = require("../src/Middleware/schema.validator");
const schemaValidatorURL = require("../src/Middleware/schema.validatorURL"); 
const clienteSchema = require("../src/Schemas/clientes.schemas")
const SchemaURL = require("../src/Schemas/schemas.URL")



rutaCliente.get("/:dni",schemaValidatorURL(SchemaURL),middlewareCliente.validarNoExiteClientePorDni2,cliente.buscarCliente);

rutaCliente.get("/",cliente.totalCliente);


rutaCliente.post("/",schemaValidator(clienteSchema),middlewareCliente.validarExiteClientePorDni ,cliente.crearCliente);

rutaCliente.delete("/:dni",schemaValidatorURL(SchemaURL),middlewareCliente.validarNoExiteClientePorDni2, cliente.borrarCliente);


module.exports = {rutaCliente}