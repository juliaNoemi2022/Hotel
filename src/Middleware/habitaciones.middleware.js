const {Habitaciones} = require("../db/models")

const validarExiteHabitacionPorNumero =  async (req, res, next) => {
    const numero = req.body.numero;
    const habi = await Habitaciones.findOne({where: {numero}, order: [
        ['numero', 'ASC']]})
    if(habi){
        return res.status(400).json({error: 'La habitación ' + numero + ' ya existe'})
    }
    next()
}


const validarNoExiteHabitacionPorNumero =  async (req, res, next) => {
    const numero = req.body.numero;
    const habi = await Habitaciones.findOne({where: {numero}, order: [
        ['numero', 'ASC']]})
    if(!habi){
        return res.status(400).json({error: 'La habitación ' + numero + ' no existe'})
    }
    req.habi = habi;
    next()
}

const existeHabitacionPorId=  async (req, res, next) => {
    const id = req.params.id;
    const habi = await Habitaciones.findByPk(id)
    if(!habi){
        return res.status(400).json({error: 'Habitacion id ' + id + ' no existe'})
    }else{req.habi = habi}
    req.habi = habi;
    next()
}


const existeHabitacionPorId2=  async (req, res, next) => {
    
    const idx = req.reservada[0].idHabitacion;
    const habi = await Habitaciones.findOne({where: {id:idx}})
    if(!habi){
        return res.status(400).json({error: 'Habitacion id ' + idx + ' no existe'})
    }else{req.habi = habi}
    req.habi = habi;
    next()
}


const existeHabitacionPorId3=  async (req, res, next) => {
    
    const idx = req.datosres.idHabitacion;
    const habi = await Habitaciones.findOne({where: {id:idx}})
    if(!habi){
        return res.status(400).json({error: 'Habitacion id ' + idx + ' no existe'})
    }else{req.habi = habi}
    req.habi = habi;
    next()
}

const existeHabitacionPorNumero=  async (req, res, next) => {
    const numero = req.params.num;
    const habi = await Habitaciones.findOne({where:{numero}})
    if(!habi){
        return res.status(400).json({error: 'Habitación n° ' + numero + ' no existe'})
    }
    req.habi = habi;
    next()
}


const controlCapacidadHabitacion=  async (req, res, next) => {
    const data = req.body;
    if(data.CantPersonas <= req.habi.CantPersonas){
        next()
    }else{return res.status(400).json("Cantidad de personas supera capacidad habitacion N°:" + req.habi.numero )};   
}



module.exports = { existeHabitacionPorId3,existeHabitacionPorId2,validarNoExiteHabitacionPorNumero,validarExiteHabitacionPorNumero, existeHabitacionPorId, existeHabitacionPorNumero, controlCapacidadHabitacion}