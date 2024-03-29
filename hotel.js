const express = require('express');
const app = express();
const productos = require("../Data/Productos.json")
const habitaciones = require("../Data/Habitaciones.json")
const reservas = require("../Data/Reservas.json")
const funcion = require("../src/funciones")
const reservation = require("../src/reservas.controllers")
const port = 3001;


app.listen(port, (req, res) => {console.log("Listening on port " +port)});

app.use(express.json());

app.get("/productos",(req, res) => {
    res.status(200).json(productos)
})

app.get("/habitaciones", (req, res) => {
    const resultado = habitaciones.filter(i => i.Habilitado==true);
    res.status(200).json(resultado)
})


app.get("/reservas",reservation.totalReservas);

app.get("/vencidas",reservation.vencidas);

app.post("/crear/:id", reservation.reservarHabi);

app.post("/habitaciones", reservation.crearHabitacion);


app.delete("/borrar/:id", reservation.borrarReserva);


app.put("/modificar/:id",reservation.modiReserva);



