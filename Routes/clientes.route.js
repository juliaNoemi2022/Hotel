const express = require("express");

const rutaCliente = express.Router();

const middlewareCliente = require("../src/Middleware/cliente.middleware")

const cliente = require("../src/Controllers/clientes.controllers");


rutaCliente.get("/:dni",cliente.buscarCliente);

rutaCliente.get("/",cliente.totalCliente);


rutaCliente.post("/",middlewareCliente.validarExiteClientePorDni ,cliente.crearCliente);

rutaCliente.delete("/:dni", cliente.borrarCliente);


module.exports = {rutaCliente}