//const express = require('express');
//const app = express();
const productos = require("../Data/Productos.json")
const habitaciones = require("../Data/Habitaciones.json")
const reservas = require("../Data/Reservas.json")
const funcion = require("../src/funciones")
//const port = 3001;


//app.listen(port, (req, res) => {console.log("Listening on port " +port)});

//app.use(express.json());

//app.get("/productos",(req, res) => {
//    res.status(200).json(productos)
//})

//app.get("/habitaciones", (req, res) => {
//    const resultado = habitaciones.filter(i => i.Habilitado==true);
//    res.status(200).json(resultado)
//})

const totalReservas = (req, res) => {
    if(reservas.length > 0){  
        
        const resultado = reservas.filter(i => funcion.fecha2(i.FechaEgreso)==0 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen reservas activas");
        }
        
    }else{
        res.status(200).json("No existen reservas");
    }
}


const vencidas = (req, res) => {
    if(reservas.length > 0){  
        //console.log(reservas.FechaEgreso)
        const resultado = reservas.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen reservas vencidas");
        }
        
    }else{
        res.status(200).json("No existen reservas");
    }
}
















const reservarHabi =  (req, res) => {
    const data = req.body
    const habRes = req.params.id;
    const indice = habitaciones.findIndex(i => i.id == habRes)
    
    
    if(indice >= 0){    
       if(habitaciones[indice].Habilitado == false){
          res.status(400).json("Habitacion N°" + habRes + " ya esta reservada");     
       }else{ 
         if(habitaciones[indice].CantPersonas >= data.CantPersonas){

            const nres = reservas.map(i => i.id);
            if(reservas.length == 0){
                var maxi = 1;
            }else{
               maxi = Math.max(...nres) + 1;
            }   
               const fecha = new Date;
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const ano = fecha.getFullYear();
               const hoy = ano + "/" + mes + "/" + dia;
               //const ingreso = [dia,mes,ano];
                 //if(maxi%2==0){
                   //var egreso = [dia + data.cantDias,mes,ano];
                 //}else{
                   //var egreso = [1 + data.cantDias,mes,ano];
                 //}  
                
               const reserva = {
                "id": maxi,
                "Habitacion": habitaciones[indice].id,
                "Estrellas": habitaciones[indice].Estrellas,
                "CantPersonas": data.CantPersonas,
                "FechaIngreso": ano + "/" + mes + "/" + dia,
                "cantDias": data.cantDias,
                //"FechaEgreso": dia + data.cantDias + "/" + mes + "/" + ano,
                "FechaEgreso": funcion.acumulaDia(hoy,data.cantDias), 
                //"DiaEgreso":dia + data.cantDias,
                //"MesEgreso:": mes,
                //"AnioEgreso": ano,
                //"FechaEgreso": fecha + data.cantDias,
                "Precio": data.cantDias * habitaciones[indice].Precio
            }
                habitaciones[indice].Habilitado = false;
                reservas.push(reserva);
                res.status(200).json("Creada reserva N°" + maxi);
         }
         else{res.status(400).json("Cantidad de personas supera capacidad habitación N°" + habRes);}        
        }     
    }else{
        if(habRes > habitaciones.length ){res.status(400).json("No existe habitacion N°" + habRes);}
        
    }       
}


const crearHabitacion =  (req, res) => {
    const data = req.body;
    const habit = habitaciones.map(i => i.id)
      if(habitaciones.length == 0){
        var maxi = 1;
      }else{
        maxi = Math.max(...habit) + 1;
      }  
      
        const habitacion = {
            "id": maxi,
            "Estrellas": data.Estrellas,
            "Precio": data.Precio,
            "Habilitado": true  
        }
        habitaciones.push(habitacion); 
        res.status(200).json("Habitacion N°" + maxi + " creada");
}



const borrarReserva = (req, res) => {
    const idx = req.params.id;
    const indice = reservas.findIndex(i => i.id == idx)
       if(indice < 0){
          res.status(400).json("Reserva N°" + idx + " no existe")
       }else{
        const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
        const resultado = reservas.splice(indice,1);
          res.status(200).json("Se eliminó la reserva N°: " + idx);
       }   


}


const modiReserva = (req, res) => {
    const idx = req.params.id;
    const data = req.body;
    const indice = reservas.findIndex(i => i.id == idx)
       if(indice >=0){
           //reservas[indice].cantDias = data.cantDias;
           const egre = reservas[indice].FechaEgreso;
           reservas[indice].FechaEgreso = funcion.acumulaDia(egre,data.cantDias)
           reservas[indice].cantDias = reservas[indice].cantDias + data.cantDias;
           reservas[indice].Precio = reservas[indice].cantDias * habitaciones[reservas[indice].Habitacion-1].Precio;
           res.status(200).json(reservas[indice]);
       }
       else{
          res.status(400).json("No existe la reserva N°" + idx);
       }
}



module.exports = {modiReserva, borrarReserva, crearHabitacion, reservarHabi, vencidas, totalReservas}