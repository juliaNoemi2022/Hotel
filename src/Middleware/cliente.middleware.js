const {Clientes} = require("../db/models")

const validarExiteClientePorDni =  async (req, res, next) => {
    const dni = req.body.dni;
    const cliente = await Clientes.findOne({where: {dni}, order: [
        ['dni', 'ASC']]})
    if(cliente){
        return res.status(400).json({error: 'El dni ' + dni + ' ya se encuentra registrado'})
    }
    next()
}


const existeClientePorId=  async (req, res, next) => {
    const id = req.params.id;
    const cliente = await Clientes.findByPk(id)
    if(!cliente){
        return res.status(400).json({error: 'El id ' + id + ' no se encuentra registrado'})
    }
    next()
}

const validarNoExiteClientePorDni =  async (req, res, next) => {
    const dni = req.body.dni;
    const existecli = await Clientes.findOne({where: {dni}, order: [
        ['dni', 'ASC']]})
    if(!existecli){
        return res.status(400).json({error: 'El cliente dni ' + dni + ' no existe'})
    }
    req.existecli = existecli;
    next()
}




module.exports = { validarExiteClientePorDni, existeClientePorId,validarNoExiteClientePorDni}