

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
  const datoshab = req.habi;
  if(datoshab){  
    res.status(200).json(datoshab);
  }else{
    res.status(200).json({error:"No existe habitacion n° "+datoshab.numero});
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


const borrarHabitacion = async (req, res) => {
  
  const existeHab = req.habi;
 if(!existeHab){
    res.status(400).json({error:"Habitacion n°:" + idx + " no existe"})
 }else{
    const registro = await Habitaciones.destroy({where: {numero:existeHab.numero}})
  
    res.status(200).json({mensaje:"Se eliminó la Habitacion n°: " + existeHab.numero});
 }   

}

module.exports = {totalHabitaciones, crearHabitacion, buscarHabitacion,borrarHabitacion}