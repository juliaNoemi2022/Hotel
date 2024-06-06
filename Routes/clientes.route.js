const express = require("express");

const rutaCliente = express.Router();

const middlewareCliente = require("../src/Middleware/cliente.middleware")

const cliente = require("../src/Controllers/clientes.controllers");
const schemaValidator = require("../src/Middleware/schema.validator");
 
const clienteSchema = require("../src/Schemas/clientes.schemas")




rutaCliente.get("/:dni",middlewareCliente.validarNoExiteClientePorDni2,cliente.buscarCliente);

rutaCliente.get("/",cliente.totalCliente);


rutaCliente.post("/",schemaValidator(clienteSchema),middlewareCliente.validarExiteClientePorDni ,cliente.crearCliente);

rutaCliente.delete("/:dni",middlewareCliente.validarNoExiteClientePorDni2, cliente.borrarCliente);


module.exports = {rutaCliente}