const express = require("express");

const rutaCliente = express.Router();

const cliente = require("../src/Controllers/clientes.controllers");


rutaCliente.get("/:dni",cliente.buscarCliente);

rutaCliente.get("/",cliente.totalCliente);


rutaCliente.post("/",cliente.crearCliente);

rutaCliente.delete("/:dni", cliente.borrarCliente);


module.exports = {rutaCliente}