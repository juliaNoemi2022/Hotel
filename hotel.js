const express = require('express');
const app = express();
const productos = require("../src/productos.controllers")
const funcion = require("../src/funciones")
const reservation = require("../src/reservas.controllers")
const cliente = require("../src/clientes.controllers")
const registration = require("../src/registroHabitaciones.controllers")
const port = 3001;


app.listen(port, (req, res) => {console.log("Listening on port " +port)});

app.use(express.json());

//PRODUCTOS

app.get("/productos",productos.totalProductos);

app.get("/habitaciones",productos.totalHabitaciones );

app.post("/habitaciones", productos.crearHabitacion);

app.post("/productos", productos.crearProducto);




//RESERVAS

//Reserva habitaciones:
app.get("/reservas",reservation.totalReservasHab);

app.get("/vencidas",reservation.reservasVencidasHab);

app.post("/crear", reservation.crearReservarHabi);


app.delete("/borrar/:id", reservation.borrarReservaHab);


app.put("/modificar/:id",reservation.modiReservaHab);

//Reserva productos:
app.get("/preservas", reservation.totalReservasProdu);

app.get("/pvencidas", reservation.reservasVencidasProdu) 

app.delete("/pborrar/:id", reservation.borrarReservaProdu);

app.put("/pmodificar/:id",reservation.modiReservaProd);

//CLIENTES

app.get("/clientes/:dni",cliente.buscarCliente);

app.get("/clientes",cliente.totalCliente);


app.post("/clientes",cliente.crearCliente);

app.delete("/clientes/:dni", cliente.borrarCliente);


//CHECK-IN, CHECK-OUT Y REGISTRO HABITACIONES

app.get("/registros",registration.totalRegistroHab);

app.get("/regvencidos",registration.registrosVencidasHab);

app.post("/checkin/:id", registration.check_in);

app.delete("/registros/:id", registration.borrarRegistroHab);

app.put("/registros/:id",registration.modiRegistroHab);

app.post("/checkout/:id", registration.check_out);