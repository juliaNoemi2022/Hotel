const {Productos} = require("../db/models")




const existeProductoPorId=  async (req, res, next) => {
    const id = req.params.id;
    const produ = await Productos.findByPk(id)
    if(!produ){
        return res.status(400).json({error: 'Producto id ' + id + ' no existe'})
    }else{req.existeprod = produ}
    
    next()
}


const existeProductoPorId2=  async (req, res, next) => {
    //const id = req.params.id;
    const id = req.datosres2.idProdu;
    const produ = await Productos.findByPk(id)
    if(!produ){
        return res.status(400).json({error: 'Producto id ' + id + ' no existe'})
    }else{req.existeprod = produ}
    
    next()
}

const existeProductoPorId3=  async (req, res, next) => {
    
    const id = req.registrada.idProdu;
    const produ = await Productos.findByPk(id)
    if(!produ){
        return res.status(400).json({error: 'Producto id ' + id + ' no existe'})
    }else{req.existeprod = produ}
    
    next()
}






module.exports = { existeProductoPorId, existeProductoPorId2, existeProductoPorId3}