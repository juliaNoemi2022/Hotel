
const productos = require("../Data/Productos.json")
const funcion = require("../src/Helpers/funciones")
//const habitaciones = require("../Data/Habitaciones.json")
const {Productos} = require("../src/db/models")


const totalProductos = async (req, res) => {
  const datospro = await Productos.findAll({where: {Habilitado:true}});
  console.log(datospro); 
  if(datospro.length != []){  
      res.status(200).json(datospro);
  }else{
      res.status(200).json("No existen productos");
  }

    //const resultado = productos.filter(i => i.Habilitado==true);
    //res.status(200).json(resultado)
}



//const totalHabitaciones = (req, res) => {
//    const resultado = habitaciones.filter(i => i.Habilitado==true);
//    res.status(200).json(resultado)
//}






//const crearHabitacion =  (req, res) => {
//    const data = req.body;
//    const habit = habitaciones.map(i => i.id)
//      if(habitaciones.length == 0){
//        var maxi = 1;
//      }else{
//        maxi = Math.max(...habit) + 1;
//      }  
      
//        const habitacion = {
//            "id": maxi,
//            "Estrellas": data.Estrellas,
//            "Precio": data.Precio,
//            "Habilitado": true  
//        }
//        habitaciones.push(habitacion); 
//        res.status(200).json("Habitacion N°:" + maxi + " creada");
//}


const crearProducto = async (req, res) => {
    const data = req.body;

    const registro = await Productos.create(data);
    
    
    res.status(200).json("Producto creado");

    //const produ = productos.map(i => i.id)
    //  if(productos.length == 0){
    //    var maxi = 1;
    //  }else{
    //    maxi = Math.max(...produ) + 1;
    //  }  
      
    //    const producto = {
    //        "id": maxi,
    //        "Producto": data.Producto,
    //        "Precio": data.Precio,
    //        "Habilitado": true  
    //    }
    //    productos.push(producto); 
    //    res.status(200).json("Producto N°:" + maxi + " creado");
}






module.exports = {totalProductos, crearProducto}