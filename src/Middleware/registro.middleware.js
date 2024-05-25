const {RegistroHabi} = require("../db/models")

const validarExiteClientePorDni =  async (req, res, next) => {
    const dni = req.body.dni;
    const cliente = await Clientes.findOne({where: {dni}, order: [
        ['dni', 'ASC']]})
    if(cliente){
        return res.status(400).json({error: 'El dni ' + dni + ' ya se encuentra registrado'})
    }
    next()
}


const existeHabitacionPorIdRegistro=  async (req, res, next) => {
  
    if(req.habi){
        const idHabitacion = req.habi.id;
        const habitacion = await RegistroHabi.findAll({where:{idHabitacion}})
    
        req.registrado = habitacion;
        next()
    }else{return res.status(400).json({error: 'El id ' + idHabitacion + ' no se encuentra reservado'})}
}

module.exports = { existeHabitacionPorIdRegistro}