

const funcion = require("../Helpers/funciones")

const {Productos} = require("../db/models")


const totalProductos = async (req, res) => {
  const datospro = await Productos.findAll({where: {Habilitado:true}});
  console.log(datospro); 
  if(datospro.length != []){  
      res.status(200).json(datospro);
  }else{
      res.status(400).json({error:"No existen productos"});
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






module.exports = {totalProductos, crearProducto}