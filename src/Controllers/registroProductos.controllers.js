

const funcion = require("../Helpers/funciones")




const {Reservas} = require("../db/models")
const {Habitaciones} = require("../db/models")
const {Clientes} = require("../db/models")
const {ReservaProdus} = require("../db/models")
const {RegistroProdus} = require("../db/models")
const {RegistroHabi} = require("../db/models")
const {Productos} = require("../db/models")



const totalRegistroProd = async(req, res) => {


    const datosres = await RegistroProdus.findAll({
    
        include: [{model: Productos},{model: Clientes}],
        
        
     });
     
     if(datosres.length > 0){  
       res.status(200).json(datosres);
     }else{
       res.status(200).json({mensaje:"No existen Registros"});
     }

}

    

    const buscarRegistroProd = async(req, res) => {
           
        const prod = req.params.id;
        const datosres = await RegistroProdus.findOne({where: {id:prod},
            include: [{model: Clientes},{model: Productos}]}
            
         );
         
         if(datosres){  
           res.status(200).json(datosres);
         }else{
           res.status(400).json({error:"No existe registro id n° "+prod});
         }

    }






    


const registrosVencidosProd = async(req, res) => {
    
    const datosres = await RegistroProdus.findAll({});

    if(datosres.length > 0 ){  
        
        const resultado = datosres.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json({mensaje:"No existen registros vencidos"});
        }
        
    }else{
        res.status(200).json({mensaje:"No existen registros"});
    }










    
}





const check_in =  async(req, res) => {

    const prod = req.params.id;
    data = req.body
       
        
       
               const fecha = new Date();
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const ano = fecha.getFullYear();
               
                      
                
               const registro = {
                "idProdu": req.registrada.idProdu,
                "idCliente": req.registrada.idCliente,
                "Precio": req.registrada.Precio,
                "CantPersonas": req.registrada.CantPersonas,
                "FechaReserva": `${ano}-${mes}-${dia}`
            }
                
                await RegistroProdus.create(registro);
                await ReservaProdus.destroy({where: {id:req.registrada.id}})
                res.status(200).json({mensaje:"Check-in producto N°:" + req.registrada.idProdu + " generado"});
                
                
             
               
            
    
    

    
}






const borrarRegistroProd = async(req, res) => {

    const idx = req.params.id;
    
    const registrada = await RegistroProdus.findOne({where: {idProdu:idx}})
    
       if(!registrada){
          res.status(400).json({error:"Registro producto N°:" + idx + " no existe"})
       }else{
        
        const registro = await RegistroProdus.destroy({where: {idProdu:idx}})
        
          res.status(200).json({mensaje:"Se eliminó registro producto N°: " + idx});
       }   
       


    

}


const modiRegistroProd = async(req, res) => {

    const idx = req.params.id;
    const data = req.body;
    
    const reservada = await RegistroProdus.findOne({where: {idProdu:idx}})

    
       if(reservada){
        const produ2 =  await Productos.findOne({where: {id:reservada.idProdu}})
        
            
               const reserby = {
                   
                   "Precio": produ2.Precio*data.CantPersonas,
                   "CantPersonas": data.CantPersonas,
                   "FechaReserva": funcion.acumulaDia(data.FechaReserva,0)
                   
               }
               
               const modi3 =  await RegistroProdus.update(reserby,{where:{id:reservada.id}} )
               
           
           const reservada2 = await RegistroProdus.findOne({where: {idProdu:idx}})
           res.status(200).json(reservada2);
        

       }
       else{
          res.status(400).json({error:"No existe el registro producto N°:" + idx});
       }














    
}








module.exports = {totalRegistroProd,buscarRegistroProd,check_in,registrosVencidosProd, borrarRegistroProd, modiRegistroProd}