
const {Productos} = require("../db/models")
const {RegistroProdus} = require("../db/models")
const {ReservaProdus} = require("../db/models")
const {Clientes} = require("../db/models")

const funcion = require("../Helpers/funciones")





const existeProductoPorIdReservaProdus =  async (req, res, next) => {
  
    
   
   
   
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
    
    const ProductoPorIdRegistroProdus =  async (req, res, next) => {
  
        const data = req.body
        const prodRes = req.params.id;
        const existeProd = await RegistroProdus.findOne({where: {id:prodRes}})
    
        if(!existeProd){
            return res.status(400).json({error:"Registro id° " + prodRes +" no existe"});
        
        }
            req.registrada = existeProd;
        
            next()
        
    }

    const existeRegistroProduPorIdMostrar=  async (req, res, next) => {
        const idx = req.params.id; 
        
        const producto = await RegistroProdus.findAll({where:{id:idx},
            include: [{model: Productos},{model: Clientes}]})
        
    
          
       return res.status(200).json(producto);
         
    
    }


    


    






module.exports = { existeProductoPorIdReservaProdus,existeProductoVencido, ProductoPorIdRegistroProdus, existeRegistroProduPorIdMostrar}