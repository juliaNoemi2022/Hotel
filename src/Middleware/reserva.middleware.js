const {Reservas} = require("../db/models")

const {ReservaProdus} = require("../db/models")

const {Habitaciones} = require("../db/models")

const {Clientes} = require("../db/models")

const {Productos} = require("../db/models")

const funcion = require("../Helpers/funciones")


const existeHabitacionPorIdReserva=  async (req, res, next) => {
  
    if(req.habi){
        const idHabitacion = req.habi.id;
        const habitacion = await Reservas.findAll({where:{idHabitacion}})
        req.reservada = habitacion;
        next()
    }else{return res.status(400).json({error: 'Habitacion id ' + idHabitacion + ' no se encuentra reservada'})}
}

const existeReservaPorId=  async (req, res, next) => {
        const idx = req.params.id;
    
        const habitacion = await Reservas.findAll({where:{id:idx},
            include: [{model: Clientes},{
                        model: Habitaciones,
                     }],})
        
    if(habitacion[0]){
        req.reservada = habitacion;
        req.idHabitacion = habitacion.idHabitacion;
        next()
    }else{return res.status(400).json({error: 'Reserva id ' + idx + ' no existe'})}
}

const existeReservaPorId2=  async (req, res, next) => {
    const idx = req.params.id;
    const habitacion1 = await Reservas.findOne({where:{id:idx}}); 
    const habitacion = await Reservas.findAll({where:{numero:habitacion1.numero},
        include: [{model: Clientes},{
                    model: Habitaciones,
                 }],})
    
if(habitacion[0]){
    req.reservada = habitacion;
    req.idHabitacion = habitacion.idHabitacion;
    next()
}else{return res.status(400).json({error: 'Reserva id ' + idx + ' no existe'})}
}



const existeReservaProductoPorId=  async (req, res, next) => {
        const idx = req.params.id;
        const datosres2 = await ReservaProdus.findOne({where: {id:idx},include: [{model: Productos},{model: Clientes}]})
                   
        
        if(!datosres2){  
          return res.status(200).json({mensaje:"No existen Reservas n°"+idx});
        }   
       req.datosres2 = datosres2;
       next()
}

const existeReservaProduPorIdMostrar=  async (req, res, next) => {
    const idx = req.params.id; 
    
    const producto = await ReservaProdus.findAll({where:{id:idx},
        include: [{model: Productos},{model: Clientes}]})
    

      
   return res.status(200).json(producto);
     

}


const existeReservaHabitacionesVencida=  async (req, res, next) => {
  
    const data = req.body
    const prodRes = req.params.id;

    if(prodRes != "vencidas"){
          next()
    }else{

        const datosres = await Reservas.findAll({}); 
        if(datosres.length > 0 ){  
        
            const resultado = datosres.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
            if(resultado.length > 0){
                return res.status(200).json(resultado);
            }else{
                return res.status(200).json({mensaje:"No existen reservas vencidas"});
            }
            
        }else{
            return res.status(200).json({mensaje:"No existen reservas"});
        }

    } 
}



const existeReservaHabitacionesVencidaByID=  async (req, res, next) => {
  
    const data = req.body
    const prodRes = req.params.id;

        const datosres = await Reservas.findAll({where:{id:prodRes}}); 
         
        if(datosres.length > 0 ){  
        
            const resultado = datosres.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
            
            if(resultado.length > 0){
                return res.status(400).json({mensaje:"Reservas id N° " + prodRes+ " vencida"});
            }
          next()  
        }
        
   
}


const ReservaHabitacionesControlFechas=  async (req, res, next) => {
  
    const data = req.body
    
    
       
       if((funcion.diferencia(data.FechaIngreso,data.FechaEgreso))<0)
       {
        return res.status(400).json({error:"Fecha ingreso mayor a fecha egreso "});

       } 
          next()


        
   
}



const existeReservaProductoVencida=  async (req, res, next) => {
  
    const data = req.body
    const prodRes = req.params.id;

    if(prodRes != "vencidas"){
          next()
    }else{

        const datosres = await ReservaProdus.findAll({}); 
        if(datosres.length > 0 ){  
        
            const resultado = datosres.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
            if(resultado.length > 0){
                return res.status(200).json(resultado);
            }else{
                return res.status(200).json({mensaje:"No existen reservas vencidas"});
            }
            
        }else{
            return res.status(200).json({mensaje:"No existen reservas"});
        }

    } 
}



module.exports = { ReservaHabitacionesControlFechas,existeReservaHabitacionesVencidaByID,existeReservaProductoPorId,existeReservaPorId2,existeHabitacionPorIdReserva, existeReservaPorId,existeReservaProduPorIdMostrar, existeReservaHabitacionesVencida, existeReservaProductoVencida}