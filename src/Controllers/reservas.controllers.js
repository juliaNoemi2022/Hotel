

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
    
    
    const reservada = req.reservada;
    const habRes = req.idHabitacion;

        
             res.status(200).json(reservada);
             
         
  
    
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
    const data = req.body;
    const habRes = req.params.num;
    
    
                    
                    
       const canty =   funcion.diferencia(data.FechaIngreso,data.FechaEgreso)+1;              
                   
                    const reserva = {
                        "idCliente": req.existecli.id,
                        "idHabitacion": req.habi.id,
                        "CantPersonas": data.CantPersonas,
                        "FechaIngreso": data.FechaIngreso,
                        "CantDias": canty,
                        "FechaEgreso": data.FechaEgreso, 
                        "Precio": canty * req.habi.Precio
                    }
                    const registro = await Reservas.create(reserva);
                    
                    res.status(200).json({mensaje:"Creada reserva id N°:" + registro.id });    
        
}






const borrarReservaHab = async (req, res) => {
    
      
        const reservada = req.reservada[0];
        


        
        const registro = await Reservas.destroy({where: {id:reservada.id}})
        
          res.status(200).json({mensaje:"Se eliminó la reserva N°: " + reservada.id});
         
       

}


const modiReservaHab = async(req, res) => {
    
    const data = req.body;
    const codigo = req.params.id
    

                
                
               const codCli = req.existecli;
               const reservada3 = req.reservada.filter(i=>i.id==codigo);
               const codHabi = req.habi;
               
               

               const canty =   funcion.diferencia(data.FechaIngreso,data.FechaEgreso)+1;
               
               const reserby = {
                   "idCliente": codCli.id,
                                      
                   "CantPersonas": data.CantPersonas,
                   "FechaIngreso": data.FechaIngreso,
                   "CantDias": canty,
                   "FechaEgreso": funcion.acumulaDia(data.FechaIngreso,canty), 
                   "Precio": canty * codHabi.Precio
               }
               
               
               const modi3 =  Reservas.update(reserby,{where:{id:reservada3[0].id}} )
               
               
               res.status(200).json(reserby);
             
            
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
          const datosres2 = req.datosres2;
          res.status(200).json(datosres2);
          
          
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
    
            
                
                    
                    const reserva = {
                        "idProdu": req.existeProd.id,
                        "idCliente": req.existecli.id,
                        "CantPersonas": data.CantPersonas,
                        "FechaReserva": data.FechaReserva, 
                        "Precio": data.CantPersonas * req.existeProd.Precio
                    }
                    
                    const registro = await ReservaProdus.create(reserva);
                    res.status(200).json({mensaje:"Creada reserva id N°:" + registro.id});
        
}











const borrarReservaProdu = async(req, res) => {
    
    
       
        const datosres2 = req.datosres2; 
        const registro = await ReservaProdus.destroy({where: {id:datosres2.id}})
        
          res.status(200).json({mensaje:"Se eliminó la reserva N°: " + datosres2.id});
    
       
    
    }




const modiReservaProd = async(req, res, next) => {
    
    const data = req.body;
    
    
            const produ2 = req.existeprod;
            const idx = req.datosres2.id
            const codCli = req.existecli;
               const reserby = {
                   "idProdu": produ2.id,
                   "idCliente": codCli.idCliente,
                   "Precio": produ2.Precio*data.CantPersonas,
                   "CantPersonas": data.CantPersonas,
                   "FechaReserva": funcion.acumulaDia(data.FechaReserva,1)
                   
               }
               
               const modi3 =  await ReservaProdus.update(reserby,{where:{id:idx}} )
               
               next()  
           

    
}




module.exports = {modiReservaHab, borrarReservaHab, crearReservarHabi, reservasVencidasHab, totalReservasHab, totalReservasProdu, buscarReservaProdu,reservasVencidasProdu, crearReservaProdu,borrarReservaProdu, modiReservaProd, buscarReservarHabi}