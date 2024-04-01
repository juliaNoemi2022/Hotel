
const productos = require("../Data/Productos.json")
const habitaciones = require("../Data/Habitaciones.json")
const reservas = require("../Data/Reservas.json")
const reservaProdu = require("../Data/Reserva productos.json")
const funcion = require("../src/funciones")
const clientes = require("../Data/clientes.json")


const totalReservasHab = (req, res) => {
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


const reservasVencidasHab = (req, res) => {
    if(reservas.length > 0){  
        
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





const crearReservarHabi =  (req, res) => {
    const data = req.body
    //const habRes = req.params.id;
    const habRes = req.body.Habitacion;
    const indice = habitaciones.findIndex(i => i.id == habRes)
    const indni = clientes.findIndex(i => i.dni == data.dni)
    
    if(indice >= 0 && indni >=0){    
       if(habitaciones[indice].Habilitado == false){
          res.status(400).json("Habitacion N°:" + habRes + " ya esta reservada");     
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
               
                
               const reserva = {
                "id": maxi,
                "dni": data.dni,
                "Habitacion": habitaciones[indice].id,
                "Estrellas": habitaciones[indice].Estrellas,
                "CantPersonas": data.CantPersonas,
                "FechaIngreso": ano + "/" + mes + "/" + dia,
                "cantDias": data.cantDias,
                "FechaEgreso": funcion.acumulaDia(hoy,data.cantDias), 
                "Precio": data.cantDias * habitaciones[indice].Precio
            }
                habitaciones[indice].Habilitado = false;
                reservas.push(reserva);
                res.status(200).json("Creada reserva N°:" + maxi);
         }
         else{res.status(400).json("Cantidad de personas supera capacidad habitación N°" + habRes);}        
        }     
    }else{
        if(habRes > habitaciones.length ){res.status(400).json("No existe habitacion N°" + habRes);}
        if(indni < 0 ){res.status(400).json("No existe cliente dni n°:" + data.dni);}
    }       
}






const borrarReservaHab = (req,res) => {
    const idx = req.params.id;
    
    const indice = reservas.findIndex(i => i.id == idx)
       if(indice < 0){
          res.status(400).json("Reserva N°:" + idx + " no existe")
       }else{
        const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
        const resultado = reservas.splice(indice,1);
          res.status(200).json("Se eliminó la reserva N°: " + idx);
       }   
       

}


const modiReservaHab = (req, res) => {
    const idx = req.params.id;
    const data = req.body;
    const indice = reservas.findIndex(i => i.id == idx)
       if(indice >=0){
           const egre = reservas[indice].FechaEgreso;
           reservas[indice].FechaEgreso = funcion.acumulaDia(egre,data.cantDias)
           reservas[indice].cantDias = reservas[indice].cantDias + data.cantDias;
           reservas[indice].Precio = reservas[indice].cantDias * habitaciones[reservas[indice].Habitacion-1].Precio;
           res.status(200).json(reservas[indice]);
       }
       else{
          res.status(400).json("No existe la reserva N°:" + idx);
       }
}


const totalReservasProdu = (req, res) => {
    if(reservaProdu.length > 0){  
        
        const resultado = reservaProdu.filter(i => funcion.fecha2(i.FechaReserva)==0 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen reservas activas");
        }
        
    }else{
        res.status(200).json("No existen reservas");
    }
}

const reservasVencidasProdu = (req, res) => {
    if(reservaProdu.length > 0){  
        const resultado = reservaProdu.filter(i => funcion.fecha2(i.FechaReserva)==1 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen reservas vencidas");
        }
        
    }else{
        res.status(200).json("No existen reservas");
    }
}


const borrarReservaProdu = (req, res) => {
    const idx = req.params.id;
    const indice = reservaProdu.findIndex(i => i.id == idx)
       if(indice < 0){
          res.status(400).json("Reserva N°:" + idx + " no existe")
       }else{  
        const resultado = reservaProdu.splice(indice,1);
          res.status(200).json("Se eliminó la reserva N°: " + idx);
       }   


}


const modiReservaProd = (req, res) => {
    const idx = req.params.id;
    const data = req.body;
    const indice = reservaProdu.findIndex(i => i.id == idx)
       if(indice >=0){
           const egre = reservaProdu[indice].FechaReserva;
           reservaProdu[indice].FechaReserva = data.FechaReserva;
           reservaProdu[indice].CantPersonas = data.CantPersonas;
           reservaProdu[indice].Precio = reservaProdu[indice].CantPersonas * productos[reservaProdu[indice].idProdu-1].Precio;
           res.status(200).json(reservaProdu[indice]);
       }
       else{
          res.status(400).json("No existe la reserva N°:" + idx);
       }
}




module.exports = {modiReservaHab, borrarReservaHab, crearReservarHabi, reservasVencidasHab, totalReservasHab, totalReservasProdu, reservasVencidasProdu, borrarReservaProdu, modiReservaProd}