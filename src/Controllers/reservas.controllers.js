

const funcion = require("../Helpers/funciones")


const {Reservas} = require("../db/models")
const {Habitaciones} = require("../db/models")
const {Clientes} = require("../db/models")
const {ReservaProdus} = require("../db/models")
const {Productos} = require("../db/models")
const { DATE, Model, Association } = require("sequelize")
const { Op } = require('sequelize')

const {RegistroHabi} = require("../db/models")












const totalReservasHab = async (req, res) => {
  const datosres = await Reservas.findAll({
    order: [
    ['idHabitacion', 'ASC']],
    
     
    include: [{
        model: Clientes,
     },{model: Habitaciones
    }],
    
    
     
  });
  
  if(datosres){ 
    res.status(200).json(datosres);
  }else{
    
    res.status(200).json({mensaje:"No existen Reservas"});
  }


    
}


const buscarReservarHabi =  async (req, res) => {
    const data = req.body;
    const habRes = req.params.id;
    
        
       const reservada = await Reservas.findOne({where: {id:habRes},
           include: [{model: Clientes},{
               model: Habitaciones,
            }],
       })
    
    
    if(reservada){ 
         
             res.status(200).json(reservada);
             
    }
    else{
              
            res.status(400).json({error:"La reserva n° "+habRes+" no existe"});
        
    }     

        
  
    
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
            res.status(200).json({mensaje:"No existen reservas vencidas"});
        }
        
    }else{
        res.status(200).json({mensaje:"No existen reservas"});
    }
}





const crearReservarHabi =  async (req, res) => {
    const data = req.body
    const habRes = req.params.num;
    
    //const existehabi = await Habitaciones.findOne({where: {numero:habRes}})

    
    
    
   
    
     

               //const fecha = new Date;
               //const dia = fecha.getDate();
               //const mes = fecha.getMonth() + 1;
               //const anio = fecha.getFullYear();
               //const hoy = anio + "-" + mes + "-" + dia;
               
               

    //if(existehabi){
        
        
        //const reservada = await Reservas.findAll({where: {idHabitacion:existehabi.id}})
        
        

        //const registrado = await RegistroHabi.findAll({where: {idHabitacion:existehabi.id}})

        
            

       //if(reservada){
            
       //    let resultado = reservada.filter(i => funcion.finMayorInicio(data.FechaIngreso,data.FechaEgreso,i.FechaIngreso,i.FechaEgreso)==0)
          
       //    let resulRegis = registrado.filter(i => funcion.finMayorInicio(data.FechaIngreso,data.FechaEgreso,i.FechaIngreso,i.FechaEgreso)==0)

       
           
        //if(req.resultado.length == 0 && req.resulRegis.length == 0){
          
            //const existecli = await Clientes.findOne({where: {dni:data.dni}})
            //if(!existecli){
            //   res.status(400).json("Cliente N°" + data.dni +" no existe");
            //}else{
                //if(data.CantPersonas <= req.habi.CantPersonas){
                    res.status(200).json({mensaje:"Creada reserva habitacion N°:" + habRes });
                    
                       
                   
                    const reserva = {
                        "idCliente": req.existecli.id,
                        "idHabitacion": req.habi.id,
                        "CantPersonas": data.CantPersonas,
                        "FechaIngreso": data.FechaIngreso,
                        "CantDias": funcion.diferencia(data.FechaIngreso,data.FechaEgreso),
                        "FechaEgreso": data.FechaEgreso, 
                        "Precio": data.CantDias * req.habi.Precio
                    }
                    const registro = await Reservas.create(reserva);
                //}else{res.status(400).json("Cantidad de personas supera capacidad habitacion N°:" + habRes )};
                
                
                //const modi3 =  await Habitaciones.update({"Habilitado": false},{where:{Habitacion:habRes}} )

            //}
        //}else{res.status(400).json("La habitacion N°" + habRes +" ya alquilada en rango de fechas");}  
      // }  
    //} else{res.status(400).json("Habitacion N°" + habRes +" no existe");}         
        
}






const borrarReservaHab = async (req,res) => {
    const idx = req.params.id;
    
    const reservada = await Reservas.findOne({where: {id:idx}})
    
       if(!reservada){
          res.status(400).json({error:"Reserva N°:" + idx + " no existe"})
       }else{
        
        const registro = await Reservas.destroy({where: {id:idx}})
        
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
                   
                   "CantPersonas": reservada.CantPersonas,
                   "FechaIngreso": reservada.FechaIngreso,
                   
                   "CantDias": reservada.CantDias,
                   "FechaEgreso": funcion.acumulaDia(reservada.FechaIngreso,data.CantDias), 
                   "Precio": data.CantDias * codHabi.Precio
               }
               
               
               const modi3 =  Reservas.update(reserby,{where:{idHabitacion:codHabi.id}} )
               
               
             res.status(200).json(reserby);
             
            }else{res.status(400).json({error:"Cantidad personas excede capacidad habitacion N°:" + codHabi2.numero});}
          
               } else{res.status(400).json({error:"No existe habitacion N°:" + data.Habitacion});}
           }else{res.status(400).json({error:"No existe cliente dni N°:" + data.dni});}
       }
       else{
          res.status(400).json({error:"No existe la reserva N°:" + idx});
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
      res.status(200).json({mensaje:"No existen Reservas de Productos"});
    }


}

    


const buscarReservaProdu = async (req, res) => {
        const idx = req.params.id;
        const datosres2 = await ReservaProdus.findOne({where: {idProdu:idx},include: [{model: Productos},{model: Clientes}]})
        
            
        
        if(datosres2){  
          res.status(200).json(datosres2);
        }else{
          res.status(200).json({mensaje:"No existen Reservas de Producto n°"+idx});
        }   



    
}

const reservasVencidasProdu = async(req, res) => {

       const datosres = await ReservaProdus.findAll({});
        
        
        
        if(datosres != null){  
            
            const resultado = datosres.filter(i => funcion.fecha2(i.FechaReserva)==1 )
        
            if(resultado.length > 0){
                res.status(200).json(resultado);
            }else{
                res.status(200).json({mensaje:"No existen reservas vencidas"});
            }
            
        }else{
            res.status(200).json({mensaje:"No existen reservas vencidas"});
        }
    


    
}



const crearReservaProdu =  async (req, res) => {
    const data = req.body
    //const prodRes = req.params.id;
    
    //const existeProd = await Productos.findOne({where: {id:prodRes}})
    
    
    
    //const existecli = await Clientes.findOne({where: {dni:data.dni}})
    
    
    
    

               
               
    



       
          //if(!existeProd){
            
          //    res.status(400).json("Producto N°" + prodRes +" no existe");
          //}else{
       
            //if(!existecli){
            //   res.status(400).json("Cliente N°" + data.dni +" no existe");
            //}else{
                
                    res.status(200).json({mensaje:"Creada reserva producto N°:" + req.existeProd.id});
                    const reserva = {
                        "idProdu": req.existeProd.id,
                        "idCliente": req.existecli.id,
                        "CantPersonas": data.CantPersonas,
                        "FechaReserva": data.FechaReserva, 
                        "Precio": data.CantPersonas * req.existeProd.Precio
                    }
                    
                    const registro = await ReservaProdus.create(reserva);
                

            //}
          //}     
        
}











const borrarReservaProdu = async(req, res) => {
    
    
    const idx = req.params.id;
    
    const reservada = await ReservaProdus.findOne({where: {id:idx}})
    
       if(reservada == null){
          res.status(400).json({error:"Reserva N°:" + idx + " no existe"})
       }else{
        
        const registro = await ReservaProdus.destroy({where: {id:idx}})
        
          res.status(200).json({mensaje:"Se eliminó la reserva N°: " + idx});
       }   
       
    
    }




const modiReservaProd = async(req, res) => {
    const idx = req.params.id;
    const data = req.body;
    
    const reservada = await ReservaProdus.findOne({where: {id:idx}})

    
    
       if(reservada){
        const codCli = await Clientes.findOne({where: {dni:data.dni}})
        const produ2 =  await Productos.findOne({where: {id:data.idProdu}})
        
        
        if(produ2.Habilitado && produ2 && codCli){
            
            
               const reserby = {
                   "idProdu": produ2.id,
                   "idCliente": codCli.idCliente,
                   "Precio": produ2.Precio*data.CantPersonas,
                   "CantPersonas": data.CantPersonas,
                   "FechaReserva": funcion.acumulaDia(data.FechaReserva,0)
                   
               }
               
               const modi3 =  await ReservaProdus.update(reserby,{where:{id:idx}} )
               
           const reservada = await ReservaProdus.findOne({where: {id:idx},include: [{model: Productos},{model: Clientes}]})
           res.status(200).json(reservada);
        }else{
          if(!produ2){  
            res.status(400).json({error:"Producto n°"+data.idProdu+" no existe"});
          }   
             if(produ2.Habilitado==false){ 
                res.status(400).json({error:"Producto n°"+produ2.idProdu+" no habilitado"});
             }
                if(!codCli){ 
                   res.status(400).json({error:"Cliente dni n°"+data.dni+" no existe"});
                }
        }

       }
       else{
          res.status(400).json({error:"No existe la reserva N°:" + idx});
       }


    
}




module.exports = {modiReservaHab, borrarReservaHab, crearReservarHabi, reservasVencidasHab, totalReservasHab, totalReservasProdu, buscarReservaProdu,reservasVencidasProdu, crearReservaProdu,borrarReservaProdu, modiReservaProd, buscarReservarHabi}