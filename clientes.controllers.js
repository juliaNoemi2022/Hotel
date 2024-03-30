
const productos = require("../Data/Productos.json")
const habitaciones = require("../Data/Habitaciones.json")
const reservas = require("../Data/Reservas.json")
const funcion = require("../src/funciones")
const clientes = require("../Data/clientes.json")


const totalCliente = (req, res) => {
    if(clientes.length > 0){  
        res.status(200).json(clientes);
    }else{
        res.status(200).json("No existen clientes");
    }
}




const buscarCliente =  (req, res) => {
    const data = req.body
    const idcli = req.params.dni;
    
    const indice = funcion.buscaInd(clientes,idcli);

    if(indice >= 0){
        res.status(200).json(clientes[indice]);
    }else{
        res.status(200).json("Cliente no existe");
    }
    

}




    
    


const crearCliente =  (req, res) => {
    const data = req.body;
    const dnix = req.body.dni;
    const clienteid = clientes.map(i => i.id);
    const indice = funcion.buscaInd(clientes,dnix);
    if(indice < 0){
        if(clientes.length == 0){
            var maxi = 1;
          }else{
            maxi = Math.max(...clienteid) + 1;
          }  
          
            const cliente = {
                "id": maxi,
                "dni": data.dni,
                "nombre": data.nombre,
                "apellido": data.apellido,
                "numero tarjeta": data.numero_tarjeta,
                "email": data.email  
            }
            clientes.push(cliente); 
            res.status(200).json("Cliente N:°" + maxi + " creado");
    }else{
       res.status(200).json("Cliente con dni n°:" +dnix+ " ya existe "); 
    }  
      
}



const borrarCliente = (req, res) => {
    const idx = req.params.dni;
    const indice = funcion.buscaInd(clientes,idx);
       if(indice < 0){
          res.status(400).json("Cliente dni°:" + idx + " no existe")
       }else{
          
        const resultado = clientes.splice(indice,1);
          res.status(200).json("Se eliminó el cliente dni°: " + idx);
       }   


}




module.exports = {buscarCliente, crearCliente, borrarCliente, totalCliente}