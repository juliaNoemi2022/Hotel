

const funcion = require("../Helpers/funciones")

const {Clientes} = require("../db/models")



const totalCliente = async (req, res) => {
    const datoscli = await Clientes.findAll({});
    
    if(datoscli != []){  
        res.status(200).json(datoscli);
    }else{
        res.status(200).json({mensaje:"No existen clientes"});
    }
}




const buscarCliente =  async (req, res) => {
    
    const idcli = req.params.dni;
    const datoscli = await Clientes.findOne({where: {dni:idcli}})
    
    if(datoscli != null){
        res.status(200).json(datoscli);
    }else{
        res.status(400).json({error:"Cliente dni n° "+idcli+" no existe"});
    }
    

}




    
    


const crearCliente = async (req, res) => {
    const data = req.body;
              const cliente = {
                   "dni": data.dni,
                   "nombre": data.nombre,
                   "apellido": data.apellido,
                   "fechaNacimiento": data.fechaNacimiento,
                   "email": data.email,
                   "tarjeta": data.tarjeta
              }
    
              const registro = await Clientes.create(cliente);
              res.status(200).json(registro);
              
      
}



const borrarCliente = async (req, res) => {
    const idx = req.params.dni;
    
        const datoscli = await Clientes.findOne({where: {dni:idx}})
       if(datoscli == null){
          res.status(400).json({error:"Cliente dni°:" + idx + " no existe"})
       }else{
          const registro = await Clientes.destroy({where: {dni:idx}})
        
          res.status(200).json({mensaje:"Se eliminó el cliente dni°: " + idx});
       }   


}




module.exports = {buscarCliente, crearCliente, borrarCliente, totalCliente}