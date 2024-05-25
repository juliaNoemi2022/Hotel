
const {Productos} = require("../db/models")
const {RegistroProdus} = require("../db/models")
const {ReservaProdus} = require("../db/models")

const funcion = require("../Helpers/funciones")

const validarExiteClientePorDni =  async (req, res, next) => {
    const dni = req.body.dni;
    const cliente = await Clientes.findOne({where: {dni}, order: [
        ['dni', 'ASC']]})
    if(cliente){
        return res.status(400).json({error: 'El dni ' + dni + ' ya se encuentra registrado'})
    }
    next()
}


const existeProductoPorIdReservaProdus=  async (req, res, next) => {
  
    const data = req.body
    const prodRes = req.params.id;
    const existeProd = await ReservaProdus.findOne({where: {id:prodRes}})

    if(!existeProd){
        res.status(400).json({error:"Reserva id° " + prodRes +" no existe"});
        return;
    }
        req.registrada = existeProd;
        next()
    
}

const existeProductoVencido=  async (req, res, next) => {
  
    const data = req.body
    const prodRes = req.params.id;

    if(prodRes != "vencidos"){
          next()
    }else{

        const datosres = await RegistroProdus.findAll({}); 
        if(datosres.length > 0 ){  
        
            const resultado = datosres.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
            if(resultado.length > 0){
                return res.status(200).json(resultado);
            }else{
                return res.status(200).json({mensaje:"No existen registros vencidos"});
            }
            
        }else{
            return res.status(200).json({mensaje:"No existen registros"});
        }

    } 

    
    
}





module.exports = { existeProductoPorIdReservaProdus,existeProductoVencido}