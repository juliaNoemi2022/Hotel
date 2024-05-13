
//const productos = require("../Data/Productos.json")
const {funcion} = require("../Helpers/funciones")
//const habitaciones = require("../../Data/Habitaciones.json")

const {Habitaciones} = require("../db/models")


//const totalProductos = (req, res) => {
//    const resultado = productos.filter(i => i.Habilitado==true);
//    res.status(200).json(resultado)
//}



const totalHabitaciones = async (req, res) => {
  const datoshab = await Habitaciones.findAll({where: {Habilitado:true}});
  
  if(datoshab != []){  
    res.status(200).json(datoshab);
  }else{
    res.status(200).json("No existen habitaciones");
}
    //const resultado = habitaciones.filter(i => i.Habilitado==true);
    //res.status(200).json(resultado)
}






const crearHabitacion =  async(req, res) => {
    const data = req.body;
    
    const registro = await Habitaciones.create(data);
    
    
    res.status(200).json("Habitación creada");
    
    //const habit = habitaciones.map(i => i.id)
    //  if(habitaciones.length == 0){
    //    var maxi = 1;
    //  }else{
    //    maxi = Math.max(...habit) + 1;
    //  }  
      
    //    const habitacion = {
    //        "id": maxi,
    //        "Estrellas": data.Estrellas,
    //        "Precio": data.Precio,
    //        "Habilitado": true  
    //    }
    //    habitaciones.push(habitacion); 
    //    res.status(200).json("Habitacion N°:" + maxi + " creada");
//}


//const crearProducto =  (req, res) => {
//    const data = req.body;
//    const produ = productos.map(i => i.id)
//      if(productos.length == 0){
//        var maxi = 1;
//      }else{
//       maxi = Math.max(...produ) + 1;
//      }  
      
//        const producto = {
//            "id": maxi,
//            "Producto": data.Producto,
//            "Precio": data.Precio,
//            "Habilitado": true  
//        }
//        productos.push(producto); 
//        res.status(200).json("Producto N°:" + maxi + " creado");
}






module.exports = {totalHabitaciones, crearHabitacion}