const {Reservas} = require("../db/models")




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
    
        const habitacion = await Reservas.findOne({where:{id:idx}})
        
    if(habitacion != null){
        req.reservada = habitacion;
        req.idHabitacion = habitacion.idHabitacion;
        next()
    }else{return res.status(400).json({error: 'Reserva id ' + idx + ' no se encuentra'})}
}

module.exports = { existeHabitacionPorIdReserva, existeReservaPorId}