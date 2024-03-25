const express = require('express');
const app = express();
const productos = require("../Data/Productos.json")
const habitaciones = require("../Data/Habitaciones.json")
const reservas = require("../Data/Reservas.json")
const port = 3001;


app.listen(port, (req, res) => {console.log("Listening in port " +port)});

app.use(express.json());

app.get("/productos",(req, res) => {
    res.status(200).json(productos)
})

app.get("/habitaciones", (req, res) => {
    const resultado = habitaciones.filter(i => i.Habilitado==true);
    res.status(200).json(resultado)
})

app.get("/reservas",(req, res) => {
    if(reservas.length > 0){  
        res.status(200).json(reservas)
    }else{
        res.status(200).json("No existen reservas");
    }
})


app.get("/reservas2",(req, res) => {
    if(reservas.length > 0){  
        console.log(Date.now())
        const resultado = reservas.filter(i => fecha(i.DiaEgreso,i.MesEgreso, i.AnioEgreso)==0)
        res.status(200).json(resultado)
    }else{
        res.status(200).json("No existen reservas");
    }
})




function fecha(dia,mes,anio){
    const dato = new Date();
    const habil = true
       if(dato.getFullYear() > anio){return 1}
          if(dato.getFullYear() == anio && dato.getMonth() + 1 >= mes){
            //console.log(dato.getFullYear() + " " + (dato.getMonth() + 1))
            if(dato.getDate() >= dia ){  
                return 1
            }    
          }   
               //esta en fecha  = 0, no esta en fecha = 1
                   return 0;
               
                          
}









app.post("/resHab/:id", (req, res) => {
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
               const reserva = {
                "id": maxi,
                "Habitacion": habitaciones[indice].id,
                "Estrellas": habitaciones[indice].Estrellas,
                "CantPersonas": data.CantPersonas,
                "FechaIngreso": dia + "/" + mes + "/" + ano,
                "cantDias": data.cantDias,
                "FechaEgreso": dia + data.cantDias + "/" + mes + "/" + ano,
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
})


app.post("/habitaciones", (req, res) => {
    const data = req.body;
    const produ = productos.map(i => i.id)
      if(productos.length == 0){
        var maxi = 1;
      }else{
        maxi = Math.max(...produ) + 1;
      }  
      
        const producto = {
            "id": maxi,
            "Estrellas": data.Estrellas,
            "Precio": data.Precio,
            "Habilitado": true  
        }
        productos.push(producto); 
        res.status(200).json("Habitacion N°" + maxi + " creado");
})



app.delete("/borrar/:id", (req, res) => {
    const idx = req.params.id;
    const indice = reservas.findIndex(i => i.id == idx)
       if(indice < 0){
          res.status(400).json("Reserva N°" + idx + " no existe")
       }else{
        const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
        const resultado = reservas.splice(indice,1);
          res.status(200).json("Se eliminó la reserva N°: " + idx);
       }   


})


app.put("/Reserva/:id",(req, res) => {
    const idx = req.params.id;

    const indice = reservas.findIndex(i => i.id == idx)
       if(indice >=0){
           
       }
})