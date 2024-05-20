
//const productos = require("../../Data/Productos.json")
//const habitaciones = require("../../Data/Habitaciones.json")
//const reservas = require("../../Data/Reservas.json")
//const reservaProdu = require("../Data/Reserva productos.json")
const funcion = require("../Helpers/funciones")
//const clientes = require("../../Data/clientes.json")

const {Reservas} = require("../db/models")
const {Habitaciones} = require("../db/models")
const {Clientes} = require("../db/models")
const {ReservaProdus} = require("../db/models")
const {Productos} = require("../db/models")
const { DATE, Model, Association } = require("sequelize")
const { Op } = require('sequelize')













const totalReservasHab = async (req, res) => {
  const datosres = await Reservas.findAll({
    order: [
    ['idHabitacion', 'ASC']],
    
     
    include: [{
        model: Clientes,
     },{model: Habitaciones
    }],
    
    //include: [{
    //   model: Habitaciones,
    //}],  
       //model: Clientes,
       
       //model : Clientes,
     //   as: 'Habitaciones',
        //srequired: false,
       //attributes: ['Estrella','CantPersonas','Precio'],
     
     //include: [{model: Clientes}],
     
  });
  //console.log(datosres);
  if(datosres){ 
    res.status(200).json(datosres);
  }else{
    
    res.status(200).json("No existen Reservas");
  }



    //if(reservas.length > 0){  
        
    //    const resultado = reservas.filter(i => funcion.fecha2(i.FechaEgreso)==0 )
    //    if(resultado.length > 0){
    //        res.status(200).json(resultado);
    //    }else{
    //        res.status(200).json("No existen reservas activas");
    //    }
        
    //}else{
    //    res.status(200).json("No existen reservas");
    //}
}


const buscarReservarHabi =  async (req, res) => {
    const data = req.body;
    const habRes = req.params.id;
    const codHab = await Habitaciones.findOne({where: {numero:habRes}})
    
    
    if(codHab){
        
       const reservada = await Reservas.findOne({where: {idHabitacion:codHab.id},
           include: [{model: Clientes},{
               model: Habitaciones,
            }],
       })
    
    
    if(reservada){ 
         //if(reservada.length = 1){
             res.status(200).json(reservada);
             //console.log(funcion.inicioMayorFin(data.FechaIngreso,reservada.FechaIngreso),funcion.inicioMayorFin(data.FechaEgreso,reservada.FechaIngreso))
         //}else{
         //    res.status(200).json("La habitación n° "+habRes+" no está reservada");
         //}
    }
    else{
              
            res.status(200).json("La habitación n° "+codHab.numero+" no está reservada");
        
    }     

    }else{res.status(200).json("Reserva n° "+habRes+" no existe");};     


    
  
    
}    






const reservasVencidasHab = async (req, res) => {
    
    const datosres = await Reservas.findAll({  
        include: [{model: Habitaciones},{model: Clientes}],
      });
    
    
    
    if(datosres){  
        
        const resultado = datosres.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen reservas vencidas");
        }
        
    }else{
        res.status(200).json("No existen reservas");
    }
}





const crearReservarHabi =  async (req, res) => {
    const data = req.body
    const habRes = req.params.id;
    //const habRes = req.body.Habitacion
    //const habRes = req.body.Habitacion;
    const existehabi = await Habitaciones.findOne({where: {numero:habRes}})

    
    
    
    
    //if(reservada){
       //const resultado = reservada.filter(i => funcion.comparaRango(i.FechaIngreso,i.FechaEgreso,data.FechaEgreso)==1) 
    //}
    
    //const indice = reservada.filter(i => i.id == habRes && i.FechaIngreso < data.FechaIngreso && i.FechaEgreso > data.FechaEgreso)

    
    
    //const existecli = await Clientes.findOne({where: {dni:data.dni}})
    
    
    
    //const indice = habitaciones.findIndex(i => i.id == habRes)
    //const indni = clientes.findIndex(i => i.dni == data.dni)
    


    //if(reservada == null || existehabi ==null || existecli ==null){ 

               const fecha = new Date;
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const anio = fecha.getFullYear();
               const hoy = anio + "-" + mes + "-" + dia;
               
               

    if(existehabi){
        
        const reservada = await Reservas.findAll({where: {idHabitacion:existehabi.id}})
        
        

        //const busque = reservada.filter(i => ((funcion.inicioMayorFin(i.FechaIngreso,data.FechaIngreso)==1 && funcion.inicioMayorFin(i.FechaIngreso,data.FechaEgreso)==1)) || (funcion.inicioMayorFin(data.FechaIngreso>i.FechaEgreso)==0 && funcion.inicioMayorFin(data.FechaEgreso>i.FechaEgreso)==0))
        //const busque = reservada.filter(i => funcion.inicioMayorFin(i.FechaIngreso,data.FechaIngreso)==0 && funcion.inicioMayorFin(i.FechaIngreso,data.FechaEgreso)==0 )
        //const busque = reservada.filter(i => (funcion.inicioMayorFin(i.FechaIngreso,data.FechaIngreso)==1 && funcion.inicioMayorFin(i.FechaIngreso,data.FechaEgreso)==1))
        //const busque = reservada.filter(i => (funcion.inicioMayorFin(data.FechaIngreso>i.FechaEgreso) && funcion.inicioMayorFin(data.FechaEgreso>i.FechaEgreso)))
       //if(busque){console.log("Hola"+busque);}
        
        //console.log(funcion.inicioMayorFin(busque.FechaIngreso,data.FechaIngreso),funcion.inicioMayorFin(busque.FechaIngreso,data.FechaEgreso));
        //res.status(400).json(reservada);

            //column1: value1,
            //column2: {
            //  [Op.gt]: value2, // Mayor que
            //  [Op.lt]: value3, // Menor que
            

       if(reservada){
           //res.status(400).json("Habitacion N°" + habRes +" esta reservada");
           //const resultado = reservada.filter(i => (funcion.inicioMayorFin(i.FechaIngreso,data.FechaIngreso) && funcion.inicioMayorFin(i.FechaIngreso,data.FechaEgreso)) || (funcion.inicioMayorFin(data.FechaIngreso, i.FechaEgreso) && funcion.inicioMayorFin(data.FechaEgreso, i.FechaEgreso))) 
           let resultado = reservada.filter(i => funcion.finMayorInicio(data.FechaIngreso,data.FechaEgreso,i.FechaIngreso,i.FechaEgreso)==0)
          
           //console.log(funcion.finMayorInicio(data.FechaIngreso,data.FechaEgreso,reservada.FechaIngreso,reservada.FechaEgreso))
           
           //res.status(200).json(resultado);
           
        if(resultado.length == 0){
          //if(!existehabi){
          //    res.status(400).json("Habitacion N°" + habRes +" no existe");
          //}else{
            const existecli = await Clientes.findOne({where: {dni:data.dni}})
            if(!existecli){
               res.status(400).json("Cliente N°" + data.dni +" no existe");
            }else{
                if(data.CantPersonas <= existehabi.CantPersonas){
                    res.status(200).json("Creada reserva habitacion N°:" + habRes );
                    
                       
                   
                    const reserva = {
                        "idCliente": existecli.id,
                        "idHabitacion": existehabi.id,
                        "CantPersonas": data.CantPersonas,
                        "FechaIngreso": data.FechaIngreso,
                        "CantDias": funcion.diferencia(data.FechaIngreso,data.FechaEgreso),
                        "FechaEgreso": data.FechaEgreso, 
                        "Precio": data.CantDias * existehabi.Precio
                    }
                    const registro = await Reservas.create(reserva);
                }else{res.status(400).json("Cantidad de personas supera capacidad habitacion N°:" + habRes )};
                
                
                const modi3 =  await Habitaciones.update({"Habilitado": false},{where:{Habitacion:habRes}} )

            }
        }else{res.status(400).json("La habitacion N°" + habRes +" ya alquilada en rango de fechas");}  
       }  
    } else{res.status(400).json("Habitacion N°" + habRes +" no existe");}         
        //console.log(reservada);
        //console.log(existehabi);
        
       //if(habitaciones[indice].Habilitado == false){
       //   res.status(400).json("Habitacion N°:" + habRes + " ya esta reservada");     
       //}else{ 
         //if(habitaciones[indice].CantPersonas >= data.CantPersonas){

         //   const nres = reservas.map(i => i.id);
         //   if(reservas.length == 0){
         //       var maxi = 1;
         //   }else{
         //      maxi = Math.max(...nres) + 1;
         //   }   
         //      const fecha = new Date;
         //      const dia = fecha.getDate();
         //      const mes = fecha.getMonth() + 1;
         //      const ano = fecha.getFullYear();
         //      const hoy = ano + "/" + mes + "/" + dia;
               
                
         //      const reserva = {
         //       "id": maxi,
         //       "dni": data.dni,
         //       "Habitacion": habitaciones[indice].id,
         //       "Estrellas": habitaciones[indice].Estrellas,
         //       "CantPersonas": data.CantPersonas,
         //       "FechaIngreso": ano + "/" + mes + "/" + dia,
         //       "cantDias": data.cantDias,
         //       "FechaEgreso": funcion.acumulaDia(hoy,data.cantDias), 
         //       "Precio": data.cantDias * habitaciones[indice].Precio
         //   }
         //       habitaciones[indice].Habilitado = false;
         //       reservas.push(reserva);
         //       res.status(200).json("Creada reserva N°:" + maxi);
        // }
        // else{res.status(400).json("Cantidad de personas supera capacidad habitación N°" + habRes);}        
        //}     
    //}else{
        //res.status(200).json("Creada reserva habitacion N°:" + habRes );
        //const registro = await Reservas.create(data);
        //    if(existehabi == null ){res.status(400).json("Habitacion N°" + habRes +" no existe");}
        //if(reservada != null ){res.status(400).json("Habitacion N°" + habRes +" esta reservada");}
    //    if(existecli == null ){res.status(400).json("No existe cliente dni n°:" + data.dni);}
    //}       
}






const borrarReservaHab = async (req,res) => {
    const idx = req.params.id;
    
    const reservada = await Reservas.findOne({where: {id:idx}})
    //setTimeout(()=>{},1000);

    //const indice = reservas.findIndex(i => i.id == idx)
       if(!reservada){
          res.status(400).json("Reserva N°:" + idx + " no existe")
       }else{
        //const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
        //const resultado = reservas.splice(indice,1);
        //const modi = await Habitaciones.findOne({where: {id:reservada.Habitacion}})
        //const modi2 =  Habitaciones.update({Habilitado:true},{where:{id:reservada.Habitacion}} )
        //modi.update({where: {habilitado:true}});
        //setTimeout(()=>{},1000);
        const registro = await Reservas.destroy({where: {id:idx}})
        //setTimeout(()=>{},1000);
          res.status(200).json("Se eliminó la reserva N°: " + idx);
       }   
       

}


const modiReservaHab = async(req, res) => {
    const idx = req.params.id;
    const data = req.body;
    //const indice = reservas.findIndex(i => i.id == idx)
    const reservada = await Reservas.findOne({where: {id:idx}})
    
    const codCli = await Clientes.findOne({where: {dni:data.dni}})
    
    //setTimeout(()=>{},1000);
       if(reservada){
        
           if(codCli){
            const codHabi = await Habitaciones.findOne({where: {id:reservada.idHabitacion}})
               if(codHabi){
        //const habi2 =  await Habitaciones.findOne({where: {id:data.Habitacion}})
        //setTimeout(()=>{},1000);   
        
        //if(habi2.Habilitado == true){
            
            //fecha = reservada.FechaIngreso;
            const codHabi2 = await Habitaciones.findOne({where: {numero:data.Habitacion}})
             if(data.CantPersonas<=codHabi2.CantPersonas){

                
                



               const reserby = {
                   "idCliente": codCli.id,
                   "idHabitacion": data.Habitacion,
                   //"Estrellas": reservada.Estrellas,
                   "CantPersonas": reservada.CantPersonas,
                   "FechaIngreso": reservada.FechaIngreso,
                   //"FechaIngreso": fecha,
                   "CantDias": reservada.CantDias,
                   "FechaEgreso": funcion.acumulaDia(reservada.FechaIngreso,data.CantDias), 
                   "Precio": data.CantDias * codHabi.Precio
               }
               
               //const modi2 =  await Reservas.update({dni: data.dni},{where:{id:reservada.Habitacion}} )
               //setTimeout(()=>{},1000); 
               const modi3 =  Reservas.update(reserby,{where:{idHabitacion:codHabi.id}} )
               
               //setTimeout(()=>{},1000); 
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
             //res.status(200).json("Reserva N°:" + idx + " modificada")
            }else{res.status(400).json("Cantidad personas excede capacidad habitacion N°:" + codHabi2.numero);}
        //}else{
        //  res.status(200).json("Habitacion n°"+habi2.id+" reservada");  
               } else{res.status(400).json("No existe habitacion N°:" + data.Habitacion);}
           }else{res.status(400).json("No existe cliente dni N°:" + data.dni);}
       }
       else{
          res.status(400).json("No existe la reserva N°:" + idx);
       }
}






const totalReservasProdu = async (req, res) => {
    const datosres2 = await ReservaProdus.findAll({
        order: [
            ['idProdu', 'ASC']],
        include: [{model: Productos},{model: Clientes}],    
    });
    
    if(datosres2.length > 0){  
      res.status(200).json(datosres2);
    }else{
      res.status(200).json("No existen Reservas de Productos");
    }


}

    


const buscarReservaProdu = async (req, res) => {
        const idx = req.params.id;
        const datosres2 = await ReservaProdus.findOne({where: {idProdu:idx},include: [{model: Productos},{model: Clientes}]})
        
            
        
        if(datosres2){  
          res.status(200).json(datosres2);
        }else{
          res.status(200).json("No existen Reservas de Producto n°"+idx);
        }   



    //if(reservaProdu.length > 0){  
        
    //    const resultado = reservaProdu.filter(i => funcion.fecha2(i.FechaReserva)==0 )
    //    if(resultado.length > 0){
    //        res.status(200).json(resultado);
    //    }else{
    //        res.status(200).json("No existen reservas activas");
    //    }
        
    //}else{
    //    res.status(200).json("No existen reservas");
    //}
}

const reservasVencidasProdu = async(req, res) => {

       const datosres = await ReservaProdus.findAll({});
        
        
        
        if(datosres != null){  
            
            const resultado = datosres.filter(i => funcion.fecha2(i.FechaReserva)==1 )
        
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }else{
                res.status(200).json("No existen reservas vencidas");
            }
            
        }else{
            res.status(200).json("No existen reservas vencidas");
        }
    


    //if(reservaProdu.length > 0){  
    //    const resultado = reservaProdu.filter(i => funcion.fecha2(i.FechaReserva)==1 )
    //    if(resultado.length > 0){
    //        res.status(200).json(resultado);
    //    }else{
    //        res.status(200).json("No existen reservas vencidas");
    //    }
        
    //}else{
    //    res.status(200).json("No existen reservas");
    //}
}



const crearReservaProdu =  async (req, res) => {
    const data = req.body
    const prodRes = req.params.id;
    //const habRes = req.body.Habitacion
    //const habRes = req.body.Habitacion;
    const existeProd = await Productos.findOne({where: {id:prodRes}})
    
    
    
    const existecli = await Clientes.findOne({where: {dni:data.dni}})
    
    
    
    //const indice = habitaciones.findIndex(i => i.id == habRes)
    //const indni = clientes.findIndex(i => i.dni == data.dni)
    


    //if(reservada == null || existehabi ==null || existecli ==null){ 

               const fecha = new Date;
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const anio = fecha.getFullYear();
               const hoy = anio + "-" + mes + "-" + dia;
               
    



       //if(reservada){
       //    res.status(400).json("Habitacion N°" + habRes +" esta reservada");
       //}else{
          if(!existeProd){
            //const reservada = await ReservaProdus.findOne({where: {idProdu:existeProd.id}})
              res.status(400).json("Producto N°" + prodRes +" no existe");
          }else{
       
            if(!existecli){
               res.status(400).json("Cliente N°" + data.dni +" no existe");
            }else{
                //if(data.CantPersonas <= existehabi.CantPersonas){
                    res.status(200).json("Creada reserva producto N°:" + existeProd.id );
                    const reserva = {
                        "idProdu": existeProd.id,
                        "idCliente": existecli.id,
                        "CantPersonas": data.CantPersonas,
                        "FechaReserva": data.FechaReserva, 
                        "Precio": data.CantPersonas * existeProd.Precio
                    }
                    
                    const registro = await ReservaProdus.create(reserva);
                //}else{res.status(400).json("Cantidad de personas supera capacidad habitacion N°:" + habRes );}
                
                
                //const modi3 =  await Habitaciones.update({"Habilitado": false},{where:{Habitacion:habRes}} )

            }
          }     
        
}











const borrarReservaProdu = async(req, res) => {
    
    
    const idx = req.params.id;
    
    const reservada = await ReservaProdus.findOne({where: {id:idx}})
    //setTimeout(()=>{},1000);
    
    //const indice = reservas.findIndex(i => i.id == idx)
       if(reservada == null){
          res.status(400).json("Reserva N°:" + idx + " no existe")
       }else{
        //const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
        //const resultado = reservas.splice(indice,1);
        //const modi = await Habitaciones.findOne({where: {id:reservada.Habitacion}})
        //const modi2 =  Habitaciones.update({Habilitado:true},{where:{id:reservada.Habitacion}} )
        //modi.update({where: {habilitado:true}});
        //setTimeout(()=>{},1000);
        const registro = await ReservaProdus.destroy({where: {id:idx}})
        //setTimeout(()=>{},1000);
          res.status(200).json("Se eliminó la reserva N°: " + idx);
       }   
       
    
    
    
    
    
    
    
    
    //const idx = req.params.id;

    //const indice = reservaProdu.findIndex(i => i.id == idx)
      // if(indice < 0){
      //    res.status(400).json("Reserva N°:" + idx + " no existe")
      // }else{  
       // const resultado = reservaProdu.splice(indice,1);
       //   res.status(200).json("Se eliminó la reserva N°: " + idx);
       //}   


}


const modiReservaProd = async(req, res) => {
    const idx = req.params.id;
    const data = req.body;
    //const indice = reservas.findIndex(i => i.id == idx)
    const reservada = await ReservaProdus.findOne({where: {id:idx}})

    
    //setTimeout(()=>{},1000);
       if(reservada){
        const codCli = await Clientes.findOne({where: {dni:data.dni}})
        const produ2 =  await Productos.findOne({where: {id:data.idProdu}})
        //setTimeout(()=>{},1000);   
        
        if(produ2.Habilitado && produ2 && codCli){
            
            
               const reserby = {
                   "idProdu": produ2.id,
                   "idCliente": codCli.idCliente,
                   "Precio": produ2.Precio*data.CantPersonas,
                   "CantPersonas": data.CantPersonas,
                   "FechaReserva": funcion.acumulaDia(data.FechaReserva,0)
                   
               }
               //console.log(funcion.acumulaDia(data.FechaEgreso,data.CantDias))
               //const modi2 =  await Reservas.update({dni: data.dni},{where:{id:reservada.Habitacion}} )
               //setTimeout(()=>{},1000); 
               const modi3 =  await ReservaProdus.update(reserby,{where:{id:idx}} )
               //setTimeout(()=>{},1000); 
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
           const reservada = await ReservaProdus.findOne({where: {id:idx},include: [{model: Productos},{model: Clientes}]})
           res.status(200).json(reservada);
        }else{
          if(!produ2){  
            res.status(200).json("Producto n°"+data.idProdu+" no existe");
          }   
             if(produ2.Habilitado==false){ 
                res.status(200).json("Producto n°"+produ2.idProdu+" no habilitado");
             }
                if(!codCli){ 
                   res.status(200).json("Cliente dni n°"+data.dni+" no existe");
                }
        }

       }
       else{
          res.status(400).json("No existe la reserva N°:" + idx);
       }









    //const idx = req.params.id;
    //const data = req.body;
    //const indice = reservaProduseservaProdu.findIndex(i => i.id == idx)
    //   if(indice >=0){
    //       const egre = reservaProdu[indice].FechaReserva;
    //       reservaProdu[indice].FechaReserva = data.FechaReserva;
    //       reservaProdu[indice].CantPersonas = data.CantPersonas;
    //       reservaProdu[indice].Precio = reservaProdu[indice].CantPersonas * productos[reservaProdu[indice].idProdu-1].Precio;
    //       res.status(200).json(reservaProdu[indice]);
    //   }
    //   else{
    //      res.status(400).json("No existe la reserva N°:" + idx);
    //   }
}




module.exports = {modiReservaHab, borrarReservaHab, crearReservarHabi, reservasVencidasHab, totalReservasHab, totalReservasProdu, buscarReservaProdu,reservasVencidasProdu, crearReservaProdu,borrarReservaProdu, modiReservaProd, buscarReservarHabi}