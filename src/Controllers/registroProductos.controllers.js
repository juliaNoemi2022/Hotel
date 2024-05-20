
//const productos = require("../../Data/Productos.json")
//const habitaciones = require("../../Data/Habitaciones.json")
//const reservas = require("../../Data/Reservas.json")
//const reservaProdu = require("../Data/Reserva productos.json")
//const registroHab = require("../../Data/Registro_habitaciones.json")
//const registroProd = require("../Data/Registro_productos.json")
const funcion = require("../Helpers/funciones")
//const clientes = require("../../Data/clientes.json")



const {Reservas} = require("../db/models")
const {Habitaciones} = require("../db/models")
const {Clientes} = require("../db/models")
const {ReservaProdus} = require("../db/models")
const {RegistroProdus} = require("../db/models")
const {RegistroHabi} = require("../db/models")
const {Productos} = require("../db/models")



const totalRegistroProd = async(req, res) => {


    const datosres = await RegistroProdus.findAll({
    
        include: [{model: Productos},{model: Clientes}],
        //include: [{model: Clientes}],
        
     });
     //console.log(datosres);
     if(datosres.length > 0){  
       res.status(200).json(datosres);
     }else{
       res.status(200).json("No existen Registros");
     }

}

     const buscarRegistroProd = async(req, res) => {
           
        const prod = req.params.id;
        const datosres = await RegistroProdus.findOne({where: {idProdu:prod},
            include: [{model: Clientes},{model: Productos}]}
            
         );
         
         if(datosres){  
           res.status(200).json(datosres);
         }else{
           res.status(200).json("No existe registro producto n° "+prod);
         }

    }






    


const registrosVencidosProd = async(req, res) => {
    
    const datosres = await RegistroProdus.findAll({});

    if(datosres.length  != null ){  
        
        const resultado = datosres.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen registros vencidos");
        }
        
    }else{
        res.status(200).json("No existen registros");
    }










    
}





const check_in =  async(req, res) => {

    const prod = req.params.id;
    data = req.body
    const registrada = await ReservaProdus.findOne({where: {id:prod}})
    //setTimeout(()=>{},1000);
    //const existe = await RegistroProdus.findOne({where: {idProdu:prod}})
    //setTimeout(()=>{},1000);
    
  
    
    if(registrada){    
        //if(existehabi == null)
        //{
       
               const fecha = new Date();
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const ano = fecha.getFullYear();
               
                      
                
               const registro = {
                "idProdu": registrada.idProdu,
                "idCliente": registrada.idCliente,
                "Precio": registrada.Precio,
                "CantPersonas": registrada.CantPersonas,
                "FechaReserva": `${ano}-${mes}-${dia}`
            }
                
                await RegistroProdus.create(registro);
                await ReservaProdus.destroy({where: {id:registrada.id}})
                res.status(200).json("Check-in producto N°:" + registrada.idProdu + " generado");
                
                
             
        //}
        // else{res.status(400).json("La habitación N°" + habRes+" ya registrada");}        
            
    
    }else{res.status(400).json("No existe reserva id n°:" + prod)
    }

    
}






const borrarRegistroProd = async(req, res) => {

    const idx = req.params.id;
    
    const registrada = await RegistroProdus.findOne({where: {idProdu:idx}})
    //setTimeout(()=>{},1000);
    
    //const indice = reservas.findIndex(i => i.id == idx)
       if(!registrada){
          res.status(400).json("Registro producto N°:" + idx + " no existe")
       }else{
        //const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
        //const resultado = reservas.splice(indice,1);
        //const modi = await Habitaciones.findOne({where: {id:reservada.Habitacion}})
        //const modi2 =  Habitaciones.update({Habilitado:true},{where:{id:reservada.Habitacion}} )
        //modi.update({where: {habilitado:true}});
        //setTimeout(()=>{},1000);
        const registro = await RegistroProdus.destroy({where: {idProdu:idx}})
        //setTimeout(()=>{},1000);
          res.status(200).json("Se eliminó registro producto N°: " + idx);
       }   
       


    

}


const modiRegistroProd = async(req, res) => {

    const idx = req.params.id;
    const data = req.body;
    //const indice = reservas.findIndex(i => i.id == idx
    const reservada = await RegistroProdus.findOne({where: {idProdu:idx}})

    //setTimeout(()=>{},1000);
       if(reservada){
        const produ2 =  await Productos.findOne({where: {id:reservada.idProdu}})
        //setTimeout(()=>{},1000);   
        
        //if(produ2.Habilitado == true && produ2.length == 1){
            
            
               const reserby = {
                   //"idProdu": produ2.idProdu,
                   //"dni": data.dni,
                   "Precio": produ2.Precio*data.CantPersonas,
                   "CantPersonas": data.CantPersonas,
                   "FechaReserva": funcion.acumulaDia(data.FechaReserva,0)
                   
               }
               //console.log(funcion.acumulaDia(data.FechaEgreso,data.CantDias))
               //const modi2 =  await Reservas.update({dni: data.dni},{where:{id:reservada.Habitacion}} )
               //setTimeout(()=>{},1000); 
               const modi3 =  await RegistroProdus.update(reserby,{where:{id:reservada.id}} )
               //setTimeout(()=>{},1000); 
               //, Habitacion: data.Habitacion,Estrellas: reservada.Estrellas,
               //CantPersonas: reservada.CantPersonas,
               //FechaIngreso: reservada.FechaIngreso,
               //CantDias: data.CantDias,
               //FechaEgreso: reserby.FechaEgreso, 
               //Precio: reserby.Precio},{where:{id:reservada.Habitacion}} )
                         
           //const egre = reservas[indice].FechaEgreso;
           //reservas[indice].FechaEgreso = funcion.acumulaDia(egre,data.cantDias)
           //reservas[indice].cantDias = reservas[indice].cantDias + data.cantDias;
           //reservas[indice].Precio = reservas[indice].cantDias * habitaciones[reservas[indice].Habitacion-1].Precio;
           
           const reservada2 = await RegistroProdus.findOne({where: {idProdu:idx}})
           res.status(200).json(reservada2);
        //}else{
        //  if(produ2.length==0){  
        //    res.status(200).json("Producto n°"+data.idProducto+" no existe");
        ///  }   
        //     if(produ2.Habilitado==false){ 
        //        res.status(200).json("Producto n°"+data.idProducto+" no habilitado");
        //     }
        //}

       }
       else{
          res.status(400).json("No existe el registro producto N°:" + idx);
       }














    
}








module.exports = {totalRegistroProd,buscarRegistroProd,check_in,registrosVencidosProd, borrarRegistroProd, modiRegistroProd}