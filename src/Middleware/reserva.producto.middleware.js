const {Productos} = require("../db/models")


const validarExiteClientePorDni =  async (req, res, next) => {
    const dni = req.body.dni;
    const cliente = await Clientes.findOne({where: {dni}, order: [
        ['dni', 'ASC']]})
    if(cliente){
        return res.status(400).json({error: 'El dni ' + dni + ' ya se encuentra registrado'})
    }
    next()
}


const existeProductoPorId=  async (req, res, next) => {
  
    const data = req.body
    const prodRes = req.params.id;
    const existeProd = await Productos.findOne({where: {id:prodRes}})

    if(!existeProd){
        res.status(400).json({error:"Producto N°" + prodRes +" no existe"});
        return;
    }
        req.existeProd = existeProd;
        next()
    
}

module.exports = { existeProductoPorId}