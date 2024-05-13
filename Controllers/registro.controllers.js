
//const productos = require("../Data/Productos.json")
//const habitaciones = require("../Data/Habitaciones.json")
//const reservas = require("../Data/Reservas.json")
//const reservaProdu = require("../Data/Reserva productos.json")
//const registroHab = require("../Data/Registro_habitaciones.json")
const {funcion} = require("../Helpers/funciones")
//const clientes = require("../Data/clientes.json")
//const registroProd = require("../Data/Registro_productos.json")

const {Reservas} = require("../db/models")
const {Habitaciones} = require("../db/models")
const {Clientes} = require("../db/models")
//const {ReservaProdus} = require("../src/db/models")
const {RegistroProdus} = require("../db/models")
const {RegistroHabi} = require("../db/models")
const {Productos} = require("../db/models")




const totalRegistroHab = async (req, res) => {

    const datosres = await RegistroHabi.findAll({where: {checkout:false},include: [{model: Habitaciones}]})

     //   include: [{model: Habitaciones}],

    
        
        //include: [{model: Clientes}],
        
    // });
     //console.log(datosres);
     
     if(datosres.length === 0){  
        res.status(200).json("No existen Registros");
     }else{
       res.status(200).json(datosres); 
       
     }











    //if(registroHab.length > 0){  
        
    //    const resultado = registroHab.filter(i => funcion.fecha2(i.FechaEgreso)==0 )
    //    if(resultado.length > 0){
    //        res.status(200).json(resultado);
    //    }else{
    //        res.status(200).json("No existen registros activos");
    //    }
        
    //}else{
    //    res.status(200).json("No existen registro de habitaciones");
    //}
}


const registrosVencidasHab = async(req, res) => {

    const datosres = await RegistroHabi.findAll({});

    if(datosres.length === 0)
    {  
        res.status(200).json("No existen registros");
    }else{    
        const resultado = datosres.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
        if(resultado.length = 1){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen registros vencidos");
        }
        
    }
        
    

    
}





const check_inHab =  async(req, res) => {



    //const data = req.body
    const habRes = req.params.id;
    //const habRes = req.body.Habitacion
    //const habRes = req.body.Habitacion;
    const reservada = await Reservas.findOne({where: {Habitacion:habRes}})
    setTimeout(()=>{},1000);
    const existehabi = await RegistroHabi.findOne({where: {Habitacion:habRes}})
    setTimeout(()=>{},1000);
    //const existecli = await Clientes.findOne({where: {dni:data.dni}})
    //setTimeout(()=>{},1000); 
    
    
    //const indice = habitaciones.findIndex(i => i.id == habRes)
    //const indni = clientes.findIndex(i => i.dni == data.dni)
    


    //if(reservada == null || existehabi ==null || existecli ==null){ 
       //if(reservada.length > 0){
       //    res.status(400).json("Habitacion N°" + habRes +" esta reservada");
       //}else{
       //   if(existehabi == null){
       //       res.status(400).json("Habitacion N°" + habRes +" no existe");
       //   }else{
       
       //     if(existecli == null){
       //        res.status(400).json("Cliente N°" + data.dni +" no existe");
            //}else{
            //    res.status(200).json("Creada reserva habitacion N°:" + habRes );
             //   const registro = await Reservas.create(data);
            //} 
       // }  










    //const data = req.body
    //const habRes = req.params.id;
    //const indice = reservas.findIndex(i => i.id == habRes)
    //const indni = clientes.findIndex(i => i.dni == data.dni)
    
    if(reservada !=  null){    
        if(existehabi == null)
        {
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
               const fecha = new Date();
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const ano = fecha.getFullYear();
               
               
                
               const registro = {
                "dni": reservada.dni,
                "Habitacion": reservada.Habitacion,
                "CantPersonas": reservada.CantPersonas,
                "FechaIngreso": `${ano}-${mes}-${dia}`,
                "CantDias": reservada.CantDias,
                "FechaEgreso": funcion.acumulaDia(fecha,reservada.CantDias), 
                "Precio": reservada.Precio
            }
                //habitaciones[indice].Habilitado = false;
                //registroHab.push(registro);
                await RegistroHabi.create(registro);
                res.status(200).json("Check-in habitacion N°:" + habRes + " generado");
                //reservas.splice(indice,1);
                
             
        }
         else{res.status(400).json("La habitación N°" + habRes+" ya registrada");}        
            
    //}else{
    //    if(habRes > habitaciones.length ){res.status(400).json("No existe habitacion N°" + habRes);}
    //    if(indni < 0 ){res.status(400).json("No existe cliente dni n°:" + data.dni);}
    }else{res.status(400).json("No existe reserva habitacion n°:" + habRes)
    }       
}






const borrarRegistroHab = async(req, res) => {
    
    const habRes = req.params.id;
    //const habRes = req.body.Habitacion
    //const habRes = req.body.Habitacion;
    
    const registro = await RegistroHabi.findOne({where: {Habitacion:habRes}})
    setTimeout(()=>{},1000);
    
    if(registro !=null){
        const registro = await RegistroHabi.destroy({where: {Habitacion:habRes}})
        res.status(200).json("Registro habitacion N°:" + habRes + " eliminado");
                //reservas.splice(indice,1);
                
             
    }
         else{res.status(400).json("La habitación N°" + habRes+" no está registrada");}
    
    
    
    
    
    
    //const idx = req.params.id;
    //const indice = registroHab.findIndex(i => i.id == idx)
    //   if(indice < 0){
    //      res.status(400).json("Registro N°:" + idx + " no existe")
    //   }else{
        //const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
    //    const registro = registroHab[indice];
    //    reservas.push(registro);
    //    const resultado = registroHab.splice(indice,1);
    //      res.status(200).json("Se eliminó el registro N°: " + idx);
    //   }   


}


const modiRegistroHab = async(req, res) => {

    const idx = req.params.id;
    const data = req.body;
    //const indice = reservas.findIndex(i => i.id == idx)
    const reservada = await RegistroHabi.findOne({where: {id:idx}})
    setTimeout(()=>{},1000);
       if(reservada.length > 0){
        const habi2 =  await Habitaciones.findOne({where: {id:data.Habitacion}})
        setTimeout(()=>{},1000);   
        
        if(habi2.Habilitado == false){
            
            //fecha = reservada.FechaIngreso;

               const reserby = {
                   "dni": data.dni,
                   "Habitacion": data.Habitacion,
                   //"Estrellas": reservada.Estrellas,
                   "CantPersonas": reservada.CantPersonas,
                   "FechaIngreso": reservada.FechaIngreso,
                   //"FechaIngreso": fecha,
                   "CantDias": data.CantDias,
                   "FechaEgreso": funcion.acumulaDia(data.FechaEgreso,data.CantDias), 
                   "Precio": data.CantDias * habi2.Precio
               }
               console.log(funcion.acumulaDia(data.FechaEgreso,data.CantDias))
               //const modi2 =  await Reservas.update({dni: data.dni},{where:{id:reservada.Habitacion}} )
               //setTimeout(()=>{},1000); 
               const modi3 =  RegistroHabi.update(reserby,{where:{Habitacion:reservada.Habitacion}} )
               setTimeout(()=>{},1000); 
               //, Habitacion: data.Habitacion,Estrellas: reservada.Estrellas,
               //CantPersonas: reservada.CantPersonas,
               //FechaIngreso: reservada.FechaIngreso,
               //CantDias: data.CantDias,
               //FechaEgreso: reserby.FechaEgreso, 
               //Precio: reserby.Precio},{where:{id:reservada.Habitacion}} )
                         
           //const egre = reservas[indice].FechaEgreso;
           //reservas[indice].FechaEgreso = funcion.acumulaDia(egre,data.cantDias)
           //reservas[indice].cantDias = reservas[indice].cantDias + data.cantDias;
           //reservas[indice].Precio = reservas[indice].cantDias * habitaciones[reservas[indice].Habitacion-1].Precio;
           res.status(200).json(reserby);
        }else{
          res.status(200).json("Debe primero reservar habitacion n°"+idx);  
        }

       }
       else{
          res.status(400).json("No existe registro habitación N°:" + idx);
       }
















    //const idx = req.params.id;
    //const data = req.body;
    //const indice = registroHab.findIndex(i => i.id == idx)
    //   if(indice >=0){
    //       const egre = registroHab[indice].FechaEgreso;
    //       registroHab[indice].FechaEgreso = funcion.acumulaDia(egre,data.cantDias)
    //       registroHab[indice].cantDias = registroHab[indice].cantDias + data.cantDias;
    //       registroHab[indice].Precio = registroHab[indice].cantDias * habitaciones[registroHab[indice].Habitacion-1].Precio;
    //       res.status(200).json(registroHab[indice]);
    //   }
    //   else{
    //      res.status(400).json("No existe el registro N°:" + idx);
    //   }
}


const check_outHab = async(req, res) => {

    
    const idx = req.params.id;
    //const data = req.body;
    //const indice = reservas.findIndex(i => i.id == idx)
    const registrada = await RegistroHabi.findOne({where: {Habitacion:idx}})
    setTimeout(()=>{},1000);
    const habi = await Habitaciones.findOne({where: {id:idx}})
    setTimeout(()=>{},1000);
       if(registrada != null  && habi.Habilitado == false)
       {
        //const habi2 =  await Habitaciones.findOne({where: {id:data.Habitacion}})
        //setTimeout(()=>{},1000);   
        
        //if(habi2.Habilitado == true){
            
            //fecha = reservada.FechaIngreso;

               //const reserby = {
               //    "dni": data.dni,
               //    "Habitacion": data.Habitacion,
                   //"Estrellas": reservada.Estrellas,
               //    "CantPersonas": reservada.CantPersonas,
               //    "FechaIngreso": reservada.FechaIngreso,
                   //"FechaIngreso": fecha,
               //    "CantDias": data.CantDias,
               //    "FechaEgreso": funcion.acumulaDia(data.FechaEgreso,data.CantDias), 
               //    "Precio": data.CantDias * habi2.Precio
               //}
               const salida = funcion.acumulaDia(new Date(),0);
               
               //console.log(funcion.acumulaDia(data.FechaEgreso,data.CantDias))
               const modi2 =  await RegistroHabi.update({"FechaEgreso": salida, "checkout": true },{where:{Habitacion:idx}} )
               setTimeout(()=>{},1000); 
               const modi4 =  await Habitaciones.update({"Habilitado": true},{where:{id:idx}} )
               setTimeout(()=>{},1000); 
               //, Habitacion: data.Habitacion,Estrellas: reservada.Estrellas,
               //CantPersonas: reservada.CantPersonas,
               //FechaIngreso: reservada.FechaIngreso,
               //CantDias: data.CantDias,
               //FechaEgreso: reserby.FechaEgreso, 
               //Precio: reserby.Precio},{where:{id:reservada.Habitacion}} )
                         
           //const egre = reservas[indice].FechaEgreso;
           //reservas[indice].FechaEgreso = funcion.acumulaDia(egre,data.cantDias)
           //reservas[indice].cantDias = reservas[indice].cantDias + data.cantDias;
           //reservas[indice].Precio = reservas[indice].cantDias * habitaciones[reservas[indice].Habitacion-1].Precio;
           //res.status(200).json(reserby);
           res.status(200).json("Checkout realizado habitacion n°"+idx); 
        }else{
          
          if(registrada == null){  
            res.status(200).json("Habitacion n°"+idx+" no está registrada"); 
          }else{
            res.status(200).json("Debe reservar habitacion n°"+idx);
          } 
        }

       //}
       //else{
       //   res.status(400).json("No existe la reserva N°:" + idx);
       //}

















    //const idx = req.params.id;
    //const data = req.body;
    //const indice = registroHab.findIndex(i => i.id == idx)
    //   if(indice >=0){
    //       
    //       const fecha = new Date;
    //           const dia = fecha.getDate();
    //           const mes = fecha.getMonth() + 1;
    //           const ano = fecha.getFullYear();
    //           const hoy = ano + "/" + mes + "/" + dia;
    //       registroHab[indice].FechaEgreso = hoy;
           //registroHab[indice].cantDias = registroHab[indice].cantDias;
    //       const canti = (funcion.CantidadDias(hoy) - funcion.CantidadDias(registroHab[indice].FechaIngreso))+1;
    //       registroHab[indice].cantDias = canti;
    //       registroHab[indice].Precio = canti * habitaciones[registroHab[indice].Habitacion-1].Precio;
           //res.status(200).json(registroHab[indice]);
    //       habitaciones[registroHab[indice].Habitacion-1].Habilitado = true;
           //res.status(200).json(registroHab[indice]);
    //       registroHab.splice(indice,1);
    //       res.status(200).json("Check-out reserva N°:" + idx + " generado");
    //   }
    //   else{
    //      res.status(400).json("No existe el registro N°:" + idx);
    //   }
}

//const totalRegistroProd = (req, res) => {
//    if(registroProd.length > 0){  
        
//        const resultado = registroProd.filter(i => funcion.fecha2(i.FechaReserva)==0 )
//        if(resultado.length > 0){
//            res.status(200).json(resultado);
//        }else{
//            res.status(200).json("No existen registros activos");
//        }
        
//    }else{
//        res.status(200).json("No existen registro de Productos");
//    }
//}


//const registrosVencidosProd = (req, res) => {
//    if(reservaProdu.length > 0){  
        
//        const resultado = registroProd.filter(i => funcion.fecha2(i.FechaReserva)==1 )
//        if(resultado.length > 0){
//            res.status(200).json(resultado);
//        }else{
//            res.status(200).json("No existen historial de registros de Productos");
//        }
        
//    }else{
//        res.status(200).json("No existen registro");
//    }
//}





//const check_inProd =  (req, res) => {
//    const data = req.body
//    const prodRes = req.params.id;
//    const indice = reservaProdu.findIndex(i => i.id == prodRes)
    
    
//    if(indice >= 0){    
       
//               const fecha = new Date;
//               const dia = fecha.getDate();
//               const mes = fecha.getMonth() + 1;
//               const ano = fecha.getFullYear();
//               const hoy = ano + "/" + mes + "/" + dia;
               
                
 //              const registro = {
 //               "id": prodRes,
 //               "dni": reservaProdu[indice].dni,
 //               "idProdu": reservaProdu[indice].idProdu,
 //               "Producto": Productos[indice-1].Producto,
 //               "CantPersonas": reservaProdu[indice].CantPersonas,
 //               "FechaReserva": hoy,
 //               "Precio": Productos[indice-1].Precio
 //           }
 //               registroProd.push(registro);
 //               res.status(200).json("Check-in reserva producto N°:" + prodRes + " generado");
 //               reservaProdu.splice(indice,1);
         
 //   }else{res.status(400).json("No existe reserva n°:" + prodRes)
 //   }       
//}






//const borrarRegistroProd = (req, res) => {
//    const idx = req.params.id;
//    const indice = registroProd.findIndex(i => i.id == idx)
//       if(indice < 0){
//          res.status(400).json("Registro N°:" + idx + " no existe")
//       }else{
        //const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
//        const registro = registroProd[indice];
//        reservaProdu.push(registro);
//        const resultado = registroProd.splice(indice,1);
//          res.status(200).json("Se eliminó el registro N°: " + idx);
//       }   


//}


//const modiRegistroProd = (req, res) => {
//    const idx = req.params.id;
//    const data = req.body;
//    const indice = registroProd.findIndex(i => i.id == idx)
//       if(indice >=0){
           //const egre = registroProd[indice].FechaEgreso;
//           registroProd[indice].FechaReserva = data.FechaReserva
//           registroProd[indice].cantDias = registroProd[indice].cantDias + data.cantDias;
//           registroProd[indice].Precio = registroProd[indice].cantDias * Productos[registroProd[indice].idProdu-1].Precio;
//           res.status(200).json(registroProd[indice]);
//       }
//       else{
//          res.status(400).json("No existe el registro N°:" + idx);
//       }
//}






module.exports = {totalRegistroHab,check_inHab, check_outHab,registrosVencidasHab, borrarRegistroHab, modiRegistroHab}