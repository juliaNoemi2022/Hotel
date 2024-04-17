
const productos = require("../Data/Productos.json")
const habitaciones = require("../Data/Habitaciones.json")
const reservas = require("../Data/Reservas.json")
const funcion = require("../src/funciones")
//const clientes = require("../Data/clientes.json")
const {Clientes} = require("../src/db/models")



const totalCliente = async (req, res) => {
    const datoscli = await Clientes.findAll({});
    
    if(datoscli != []){  
        res.status(200).json(datoscli);
    }else{
        res.status(200).json("No existen clientes");
    }
}




const buscarCliente =  async (req, res) => {
    //const data = req.body
    const idcli = req.params.dni;
    const datoscli = await Clientes.findOne({where: {dni:idcli}})
    //const indice = funcion.buscaInd(clientes,idcli);
    //res.status(200).json(datoscli);
    if(datoscli != null){
        res.status(200).json(datoscli);
    }else{
        res.status(200).json("Cliente no existe");
    }
    

}




    
    


const crearCliente = async (req, res) => {
    const data = req.body;
    const dnix = req.body.dni;
    const datoscli = await Clientes.findOne({where: {dni:dnix}})
    
    
    


    //const clienteid = clientes.map(i => i.id);
    //const indice = funcion.buscaInd(clientes,dnix);
    //if(indice < 0){
        if(datoscli == null){
    //        var maxi = 1;
    //      }else{
    //        maxi = Math.max(...clienteid) + 1;
    //      }  
          
    //        const cliente = {
    //            "id": maxi,
    //            "dni": data.dni,
    //            "nombre": data.nombre,
    //            "apellido": data.apellido,
    //            "numero tarjeta": data.numero_tarjeta,
    //            "email": data.email  
    //        }
              const registro = await Clientes.create(data);
              res.status(200).json("Cliente dni:°" + dnix + " creado");
    //        clientes.push(cliente); 
     //       res.status(200).json("Cliente N:°" + maxi + " creado");
    }else{
       res.status(200).json("Cliente con dni n°:" +dnix+ " ya existe "); 
    }  
      
}



const borrarCliente = async (req, res) => {
    const idx = req.params.dni;
    //const indice = funcion.buscaInd(clientes,idx);
        const datoscli = await Clientes.findOne({where: {dni:idx}})
       if(datoscli == null){
          res.status(400).json("Cliente dni°:" + idx + " no existe")
       }else{
          const registro = await Clientes.destroy({where: {dni:idx}})
        //const resultado = clientes.splice(indice,1);
          res.status(200).json("Se eliminó el cliente dni°: " + idx);
       }   


}




module.exports = {buscarCliente, crearCliente, borrarCliente, totalCliente}