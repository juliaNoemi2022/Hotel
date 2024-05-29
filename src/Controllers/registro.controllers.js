

const { CHAR, STRING, DATE } = require("sequelize")
const funcion = require("../Helpers/funciones")



const {Reservas} = require("../db/models")
const {Habitaciones} = require("../db/models")
const {Clientes} = require("../db/models")

const {RegistroProdus} = require("../db/models")
const {RegistroHabi} = require("../db/models")
const {Productos} = require("../db/models")




const totalRegistroHab = async (req, res) => {


    const datosres = await RegistroHabi.findAll({include: [{model: Clientes},{model: Habitaciones}]});
    
     
     if(datosres.length > 0){ 
        res.status(200).json(datosres);
      }else{
        
        res.status(200).json({mensaje:"No existen Registros"});
      }


    
}



const buscarRegistrohab = async(req, res) => {
           
    const habit = req.params.id;
    const datosres = await RegistroHabi.findOne({where: {id:habit},
        include: [{model: Clientes},{model: Habitaciones}]}
        
     );
     
     if(datosres){  
       res.status(200).json(datosres);
     }else{
       res.status(400).json({error:"No existe registro id n° "+habit});
     }

}





const registrosVencidasHab = async(req, res) => {

    const datosres = await RegistroHabi.findAll({});

    if(!datosres)
    {  
        res.status(200).json({mensaje:"No existen registros"});
    }else{    
        const resultado = datosres.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json({mensaje:"No existen registros vencidos"});
        }
        
    }
        
    

    
}





const check_inHab =  async(req, res) => {



    
    const habRes = req.params.id;
    
      
        
               const fecha = new Date();
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const anio = fecha.getFullYear();
               
               
                
               const registro = {
                 "idCliente": req.reservada.idCliente,
                 "idHabitacion": req.reservada.idHabitacion,
                 "CantPersonas": req.reservada.CantPersonas,
                 "FechaIngreso": `${anio}-${mes}-${dia}`,
                 "CantDias": req.reservada.CantDias,
                 "FechaEgreso": funcion.acumulaDia(fecha,req.reservada.CantDias), 
                 "Precio": req.reservada.CantDias * req.habi.Precio
            }
                
                await RegistroHabi.create(registro);
                res.status(200).json({mensaje:"Check-in habitacion N°:" + req.reservada.idHabitacion + " generado"});
                await Reservas.destroy({where: {id:habRes}})
                
           
}






const borrarRegistroHab = async(req, res) => {
    
    const habRes = req.params.id;
    
    
    const registro = await RegistroHabi.findOne({where: {Habitacion:habRes}})
    
    
    if(registro !=null){
        const registro = await RegistroHabi.destroy({where: {Habitacion:habRes}})
        res.status(200).json({mensaje:"Registro habitacion N°:" + habRes + " eliminado"});
                
                
             
    }
         else{res.status(400).json({error:"La habitación N°" + habRes+" no está registrada"});}
    
    
    
  
}





const modiRegistroHab = async(req, res) => {

    const idx = req.params.id;
    const data = req.body;
    
    const reservada = await RegistroHabi.findOne({where: {id:idx}})
    
       if(reservada){
        
        const habi2 =  await Habitaciones.findOne({where: {numero:data.Habitacion}})
        
        if(habi2 && habi2.CantPersonas >= data.CantPersonas){
            
            
               const reserby = {
                   "idCliente": reservada.idCliente,
                   "idHabitacion": habi2.id,
                   
                   "CantPersonas": data.CantPersonas,
                   "FechaIngreso": reservada.FechaIngreso,
                   
                   "CantDias": data.CantDias,
                   
                   "FechaEgreso": funcion.acumulaDia(reservada.FechaIngreso,data.CantDias),
                   "Precio": data.CantDias * habi2.Precio
               }
               
               
               const modi3 =  await RegistroHabi.update(reserby,{where:{id:idx}} )
               
           const reservada2 = await RegistroHabi.findOne({where: {id:idx},include: [{model: Habitaciones},{model: Clientes}]})
           res.status(200).json(reservada2);
        }else{
          if(!habi2){
            res.status(400).json({error:"No existe habitación N°:" + data.Habitacion});      
          }else{res.status(400).json({error:"Cant. personas supera capacidad habitacion n°"+data.Habitacion});  }  
          
        }

       }
       else{
          res.status(400).json({error:"No existe registro habitación N°:" + idx});
       }



    
}


const check_outHab = async(req, res) => {

    
    const idx = req.params.id;
    
    const registrada = await RegistroHabi.findOne({where: {id:idx}})
    

    
    
       if(registrada)
       {
        const habi = await Habitaciones.findOne({where: {id:registrada.idHabitacion}})
        
               
               
               const modi2 =  await RegistroHabi.update({"FechaEgreso": hoy, "CantDias":funcion.diferencia(registrada.FechaIngreso,hoy)} ,{where:{id:idx}} )
               
               
               
           res.status(200).json({mensaje:"Checkout realizado habitacion n°"+habi.numero}); 
        }else{
          
           
            res.status(400).json({error:"No existe registro n°"+idx}); 
               
        }

       

  
}








module.exports = {buscarRegistrohab,totalRegistroHab,check_inHab, check_outHab,registrosVencidasHab, borrarRegistroHab, modiRegistroHab}