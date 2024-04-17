
const productos = require("../Data/Productos.json")
const habitaciones = require("../Data/Habitaciones.json")
const reservas = require("../Data/Reservas.json")
const reservaProdu = require("../Data/Reserva productos.json")
const registroHab = require("../Data/Registro_habitaciones.json")
const funcion = require("../src/funciones")
const clientes = require("../Data/clientes.json")
const registroProd = require("../Data/Registro_productos.json")

const totalRegistroHab = (req, res) => {
    if(registroHab.length > 0){  
        
        const resultado = registroHab.filter(i => funcion.fecha2(i.FechaEgreso)==0 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen registros activos");
        }
        
    }else{
        res.status(200).json("No existen registro de habitaciones");
    }
}


const registrosVencidasHab = (req, res) => {
    if(reservas.length > 0){  
        
        const resultado = registroHab.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen historial de registros de habitaciones");
        }
        
    }else{
        res.status(200).json("No existen registro");
    }
}





const check_inHab =  (req, res) => {
    const data = req.body
    const habRes = req.params.id;
    const indice = reservas.findIndex(i => i.id == habRes)
    //const indni = clientes.findIndex(i => i.dni == data.dni)
    
    if(indice >= 0){    
       //if(habitaciones[indice].Habilitado == false){
       //   res.status(400).json("Habitacion N°:" + habRes + " ya esta reservada");     
       //}else{ 
       //  if(habitaciones[indice].CantPersonas >= data.CantPersonas){

            //const nres = reservas.map(i => i.id);
            //if(reservas.length == 0){
            //    var maxi = 1;
            //}else{
            //   maxi = Math.max(...nres) + 1;
            //}   
               const fecha = new Date;
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const ano = fecha.getFullYear();
               const hoy = ano + "/" + mes + "/" + dia;
               
                
               const registro = {
                "id": habRes,
                "dni": reservas[indice].dni,
                "Habitacion": reservas[indice].Habitacion,
                "Estrellas": reservas[indice].Estrellas,
                "CantPersonas": reservas[indice].CantPersonas,
                "FechaIngreso": hoy,
                "cantDias": reservas[indice].cantDias,
                "FechaEgreso": funcion.acumulaDia(hoy,reservas[indice].cantDias), 
                "Precio": reservas[indice].Precio
            }
                //habitaciones[indice].Habilitado = false;
                registroHab.push(registro);
                res.status(200).json("Check-in reserva N°:" + habRes + " generado");
                reservas.splice(indice,1);
         //}
         //else{res.status(400).json("Cantidad de personas supera capacidad habitación N°" + habRes);}        
        //}     
    //}else{
    //    if(habRes > habitaciones.length ){res.status(400).json("No existe habitacion N°" + habRes);}
    //    if(indni < 0 ){res.status(400).json("No existe cliente dni n°:" + data.dni);}
    }else{res.status(400).json("No existe reserva n°:" + habRes)
    }       
}






const borrarRegistroHab = (req, res) => {
    const idx = req.params.id;
    const indice = registroHab.findIndex(i => i.id == idx)
       if(indice < 0){
          res.status(400).json("Registro N°:" + idx + " no existe")
       }else{
        //const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
        const registro = registroHab[indice];
        reservas.push(registro);
        const resultado = registroHab.splice(indice,1);
          res.status(200).json("Se eliminó el registro N°: " + idx);
       }   


}


const modiRegistroHab = (req, res) => {
    const idx = req.params.id;
    const data = req.body;
    const indice = registroHab.findIndex(i => i.id == idx)
       if(indice >=0){
           const egre = registroHab[indice].FechaEgreso;
           registroHab[indice].FechaEgreso = funcion.acumulaDia(egre,data.cantDias)
           registroHab[indice].cantDias = registroHab[indice].cantDias + data.cantDias;
           registroHab[indice].Precio = registroHab[indice].cantDias * habitaciones[registroHab[indice].Habitacion-1].Precio;
           res.status(200).json(registroHab[indice]);
       }
       else{
          res.status(400).json("No existe el registro N°:" + idx);
       }
}


const check_outHab = (req, res) => {
    const idx = req.params.id;
    const data = req.body;
    const indice = registroHab.findIndex(i => i.id == idx)
       if(indice >=0){
           
           const fecha = new Date;
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const ano = fecha.getFullYear();
               const hoy = ano + "/" + mes + "/" + dia;
           registroHab[indice].FechaEgreso = hoy;
           //registroHab[indice].cantDias = registroHab[indice].cantDias;
           const canti = (funcion.CantidadDias(hoy) - funcion.CantidadDias(registroHab[indice].FechaIngreso))+1;
           registroHab[indice].cantDias = canti;
           registroHab[indice].Precio = canti * habitaciones[registroHab[indice].Habitacion-1].Precio;
           //res.status(200).json(registroHab[indice]);
           habitaciones[registroHab[indice].Habitacion-1].Habilitado = true;
           //res.status(200).json(registroHab[indice]);
           registroHab.splice(indice,1);
           res.status(200).json("Check-out reserva N°:" + idx + " generado");
       }
       else{
          res.status(400).json("No existe el registro N°:" + idx);
       }
}

const totalRegistroProd = (req, res) => {
    if(registroProd.length > 0){  
        
        const resultado = registroProd.filter(i => funcion.fecha2(i.FechaReserva)==0 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen registros activos");
        }
        
    }else{
        res.status(200).json("No existen registro de Productos");
    }
}


const registrosVencidosProd = (req, res) => {
    if(reservaProdu.length > 0){  
        
        const resultado = registroProd.filter(i => funcion.fecha2(i.FechaReserva)==1 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen historial de registros de Productos");
        }
        
    }else{
        res.status(200).json("No existen registro");
    }
}





const check_inProd =  (req, res) => {
    const data = req.body
    const prodRes = req.params.id;
    const indice = reservaProdu.findIndex(i => i.id == prodRes)
    
    
    if(indice >= 0){    
       
               const fecha = new Date;
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const ano = fecha.getFullYear();
               const hoy = ano + "/" + mes + "/" + dia;
               
                
               const registro = {
                "id": prodRes,
                "dni": reservaProdu[indice].dni,
                "idProdu": reservaProdu[indice].idProdu,
                "Producto": Productos[indice-1].Producto,
                "CantPersonas": reservaProdu[indice].CantPersonas,
                "FechaReserva": hoy,
                "Precio": Productos[indice-1].Precio
            }
                registroProd.push(registro);
                res.status(200).json("Check-in reserva producto N°:" + prodRes + " generado");
                reservaProdu.splice(indice,1);
         
    }else{res.status(400).json("No existe reserva n°:" + prodRes)
    }       
}






const borrarRegistroProd = (req, res) => {
    const idx = req.params.id;
    const indice = registroProd.findIndex(i => i.id == idx)
       if(indice < 0){
          res.status(400).json("Registro N°:" + idx + " no existe")
       }else{
        //const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
        const registro = registroProd[indice];
        reservaProdu.push(registro);
        const resultado = registroProd.splice(indice,1);
          res.status(200).json("Se eliminó el registro N°: " + idx);
       }   


}


const modiRegistroProd = (req, res) => {
    const idx = req.params.id;
    const data = req.body;
    const indice = registroProd.findIndex(i => i.id == idx)
       if(indice >=0){
           //const egre = registroProd[indice].FechaEgreso;
           registroProd[indice].FechaReserva = data.FechaReserva
           registroProd[indice].cantDias = registroProd[indice].cantDias + data.cantDias;
           registroProd[indice].Precio = registroProd[indice].cantDias * Productos[registroProd[indice].idProdu-1].Precio;
           res.status(200).json(registroProd[indice]);
       }
       else{
          res.status(400).json("No existe el registro N°:" + idx);
       }
}






module.exports = {totalRegistroHab,check_inHab, check_outHab,registrosVencidasHab, borrarRegistroHab, modiRegistroHab,totalRegistroProd,check_inProd,registrosVencidosProd, borrarRegistroProd, modiRegistroProd}