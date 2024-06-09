const {RegistroHabi} = require("../db/models")

const {Clientes} = require("../db/models")

const {Habitaciones} = require("../db/models")

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


const existeHabitacionPorIdRegistro=  async (req, res, next) => {
  
    if(req.habi){
        const idHabitacion = req.habi.id;
        const habitacion = await RegistroHabi.findAll({where:{idHabitacion}})
    
        req.registrado = habitacion;
        next()
    }else{return res.status(400).json({error: 'El id ' + idHabitacion + ' no se encuentra reservado'})}
}


const existeRegistrohabByID = async(req, res, next) => {
           
    const habit = req.params.id;
    const datosres = await RegistroHabi.findOne({where: {id:habit},
        include: [{model: Clientes},{model: Habitaciones}]}
        
     );
     
     if(!datosres){  
         return res.status(400).json({error:"No existe registro id n° "+habit});
     }
     req.datosres = datosres;
     next()
}


  const existeRegistroHabiPorIdMostrar=  async (req, res, next) => {
    const idx = req.params.id; 
    
    const habitacion = await RegistroHabi.findAll({where:{id:idx},
        include: [{model: Habitaciones},{model: Clientes}]})
    

      
   return res.status(200).json(habitacion);
     

}


const existeRegistroHabiVencido=  async (req, res, next) => {
  
    const data = req.body
    const prodRes = req.params.id;

    if(prodRes != "vencidos"){
          next()
    }else{

        const datosres = await RegistroHabi.findAll({}); 
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



module.exports = { existeHabitacionPorIdRegistro, existeRegistrohabByID, existeRegistroHabiPorIdMostrar, existeRegistroHabiVencido}