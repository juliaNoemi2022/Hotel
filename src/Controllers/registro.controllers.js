

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
           
    
       const datosres = req.datosres;
       res.status(200).json(datosres);
     
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



    
    
    
      
        
               
                
               const registro = {
                 "idCliente": req.reservada[0].idCliente,
                 "idHabitacion": req.reservada[0].idHabitacion,
                 "CantPersonas": req.reservada[0].CantPersonas,
                 "FechaIngreso": req.reservada[0].FechaIngreso,
                 "CantDias": req.reservada[0].CantDias,  
                 "FechaEgreso": req.reservada[0].FechaEgreso, 
                 "Precio": req.reservada[0].Precio
            }
            
            
                const registroFinal = await RegistroHabi.create(registro);
                res.status(200).json({mensaje:"Check-in id N°:" + registroFinal.id + " generado"});
                await Reservas.destroy({where: {id:req.reservada[0].id}})
                
           
}






const borrarRegistroHab = async(req, res) => {
    
    
    
    const habRes = req.datosres.id
    
        const registro = await RegistroHabi.destroy({where: {id:habRes}})
        res.status(200).json({mensaje:"Registro N°:" + habRes + " eliminado"});
                
                
             
    
    
    
    
  
}





const modiRegistroHab = async(req, res, next) => {

    const idx = req.params.id;
    const data = req.body;
    
    
    const reservada = req.datosres;
    
       
        const habi2 = req.habi;
        
            
            
               const reserby = {
                   "idCliente": reservada.idCliente,
                   "idHabitacion": habi2.id,
                   
                   "CantPersonas": data.CantPersonas,
                   "FechaIngreso": data.FechaIngreso,
                   
                   "CantDias": data.CantDias,
                   
                   "FechaEgreso": funcion.acumulaDia(data.FechaIngreso,data.CantDias),
                   "Precio": data.CantDias * habi2.Precio
               }
               
               
               const modi3 =  await RegistroHabi.update(reserby,{where:{id:idx}} )
               
               next()
               
}


const check_outHab = async(req, res) => {

    
    
               const fecha = new Date();
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const anio = fecha.getFullYear();
               const hoy = funcion.hoy(dia, mes,anio);
               
        const registrada = req.datosres;
        const habi = req.habi;      
        const idx = req.datosres.id;  
        const canti =  funcion.diferencia(registrada.FechaIngreso,hoy);
        const price = canti * habi.Precio;    
        
               const modi2 =  await RegistroHabi.update({"FechaEgreso": hoy, "CantDias":canti, "Precio":price} ,{where:{id:idx}} )
               
               
               
           res.status(200).json({mensaje:"Checkout realizado registro n° "+idx}); 
        

       

  
}








module.exports = {buscarRegistrohab,totalRegistroHab,check_inHab, check_outHab,registrosVencidasHab, borrarRegistroHab, modiRegistroHab}