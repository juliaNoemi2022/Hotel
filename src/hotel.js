const express = require('express');
const bodyParser = require('body-parser');
const app = express();





const RouteProdu = require("../Routes/productos.route");
const RouteCliente = require("../Routes/clientes.route");
const RouteReservas = require("../Routes/reservas.route"); 
const RouteHabitacion = require("../Routes/habitaciones.route")
const RouteRegistro = require("../Routes/registro.route")
const port = 3001;


//const bodyParser = require('body-parser');









app.listen(port, (req, res) => {console.log("Listening on port " +port)});

//app.use(express.json());
app.use(bodyParser.json());





app.use("/productos", RouteProdu.rutaProducto)
app.use("/habitaciones",RouteHabitacion.rutaHabitacion)
app.use("/clientes", RouteCliente.rutaCliente)
app.use("/reservas", RouteReservas.rutaReserva)
app.use("/registros", RouteRegistro.rutaRegistro)





