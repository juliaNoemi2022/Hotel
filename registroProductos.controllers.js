
const productos = require("../Data/Productos.json")
const habitaciones = require("../Data/Habitaciones.json")
const reservas = require("../Data/Reservas.json")
const reservaProdu = require("../Data/Reserva productos.json")
const registroHab = require("../Data/Registro_habitaciones.json")
const registroProd = require("../Data/Registro_productos.json")
const funcion = require("../src/funciones")
const clientes = require("../Data/clientes.json")


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





const check_in =  (req, res) => {
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


//const check_out = (req, res) => {
//    const idx = req.params.id;
//    const data = req.body;
 //   const indice = registroHab.findIndex(i => i.id == idx)
//       if(indice >=0){
           
//           const fecha = new Date;
//               const dia = fecha.getDate();
//               const mes = fecha.getMonth() + 1;
//               const ano = fecha.getFullYear();
//               const hoy = ano + "/" + mes + "/" + dia;
//           registroHab[indice].FechaEgreso = hoy;
           //registroHab[indice].cantDias = registroHab[indice].cantDias;
//           const canti = (funcion.CantidadDias(hoy) - funcion.CantidadDias(registroHab[indice].FechaIngreso))+1;
//           registroHab[indice].cantDias = canti;
//           registroHab[indice].Precio = canti * habitaciones[registroHab[indice].Habitacion-1].Precio;
           //res.status(200).json(registroHab[indice]);
//           habitaciones[registroHab[indice].Habitacion-1].Habilitado = true;
           //res.status(200).json(registroHab[indice]);
//           registroHab.splice(indice,1);
 //          res.status(200).json("Check-out reserva N°:" + idx + " generado");
//       }
//       else{
//          res.status(400).json("No existe el registro N°:" + idx);
//       }
//}





module.exports = {totalRegistroProd,check_in,registrosVencidosProd, borrarRegistroProd, modiRegistroProd}