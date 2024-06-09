

const funcion = require("../Helpers/funciones")

const {Productos} = require("../db/models")




const totalProductos = async (req, res) => {
  const datospro = await Productos.findAll({where: {Habilitado:true}}); 
  if(datospro.length != []){  
      res.status(200).json(datospro);
  }else{
      res.status(400).json({error:"No existen productos"});
  }

    
}


const buscarProductos = async (req, res) => {
    const existeprod = req.existeprod
    if(existeprod){  
        res.status(200).json(existeprod);
    }
  
      
  }




const crearProducto = async (req, res) => {
    const data = req.body;
          const producto = {
              "Producto": data.Producto,
               "Precio": data.Precio,
               "Habilitado": true,
          }
    const registro = await Productos.create(producto);
    
    
    res.status(200).json({mensaje:"Producto creado"});

    
}



const borrarProducto = async (req, res) => {
    
    const existeprod = req.existeprod;
   if(existeprod){
      const registro = await Productos.destroy({where: {id:existeprod.id}})
      res.status(200).json({mensaje:"Se eliminó el Producto id°: " + existeprod.id});
      
   }
      


}




module.exports = {buscarProductos,borrarProducto,totalProductos, crearProducto}