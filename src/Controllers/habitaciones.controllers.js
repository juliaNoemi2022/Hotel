

const funcion = require("../Helpers/funciones")


const {Habitaciones} = require("../db/models")





const totalHabitaciones = async (req, res) => {
  const datoshab = await Habitaciones.findAll({order: [
    ['numero', 'ASC']]});
  
  if(datoshab){  
    res.status(200).json(datoshab);
  }else{
    res.status(200).json({mensaje:"No existen habitaciones"});
}
    
}


const buscarHabitacion = async (req, res) => {
  const numero = req.params.num;
  console.log(numero);
  const datoshab = await Habitaciones.findOne({where:{numero}});
  
  if(datoshab){  
    res.status(200).json(datoshab);
  }else{
    res.status(200).json({error:"No existe habitacion n° "+numero});
}
    
}



const crearHabitacion =  async(req, res) => {
    const data = req.body;
        const pieza = {
            "numero": data.numero,
            "Estrellas": data.Estrellas,
            "CantPersonas": data.CantPersonas,
            "Precio": data.Precio,
        }
    const registro = await Habitaciones.create(pieza);
    
    res.status(200).json(registro);
    
    
}






module.exports = {totalHabitaciones, crearHabitacion, buscarHabitacion}