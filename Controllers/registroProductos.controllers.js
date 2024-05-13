
//const productos = require("../../Data/Productos.json")
//const habitaciones = require("../../Data/Habitaciones.json")
//const reservas = require("../../Data/Reservas.json")
//const reservaProdu = require("../Data/Reserva productos.json")
//const registroHab = require("../../Data/Registro_habitaciones.json")
//const registroProd = require("../Data/Registro_productos.json")
const {funcion} = require("../Helpers/funciones")
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
    
        include: [{
          model: Productos,
          
         
        }],
        //include: [{model: Clientes}],
        
     });
     //console.log(datosres);
     if(datosres.length > 0){  
       res.status(200).json(datosres);
     }else{
       res.status(200).json("No existen Registros");
     }










    //if(registroProd.length > 0){  
        
    //    const resultado = registroProd.filter(i => funcion.fecha2(i.FechaReserva)==0 )
    //    if(resultado.length > 0){
    //        res.status(200).json(resultado);
    //    }else{
    //        res.status(200).json("No existen registros activos");
    //    }
        
    //}else{
    //    res.status(200).json("No existen registro de Productos");
    //}
}


const registrosVencidosProd = async(req, res) => {

    const datosres = await RegistroProdus.findAll({});

    if(datosres.length  > 0 ){  
        
        const resultado = datosres.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
        if(resultado.length = 1){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen registros vencidos");
        }
        
    }else{
        res.status(200).json("No existen registros");
    }










    //if(reservaProdu.length > 0){  
        
    //    const resultado = registroProd.filter(i => funcion.fecha2(i.FechaReserva)==1 )
    //    if(resultado.length > 0){
    //        res.status(200).json(resultado);
    //    }else{
    //        res.status(200).json("No existen historial de registros de Productos");
    //    }
        
    //}else{
    //    res.status(200).json("No existen registro");
    //}
}





const check_in =  async(req, res) => {

    const prod = req.params.id;
    
    const registrada = await ReservaProdus.findOne({where: {id:prod}})
    setTimeout(()=>{},1000);
    //const existe = await RegistroProdus.findOne({where: {idProdu:prod}})
    //setTimeout(()=>{},1000);
    
  
    
    if(registrada !=  null){    
        //if(existehabi == null)
        //{
       
               const fecha = new Date();
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const ano = fecha.getFullYear();
               
               
                
               const registro = {
                "idProdu": registrada.idProdu,
                "dni": registrada.dni,
                "Precio": registrada.Precio,
                "CantPersonas": registrada.CantPersonas,
                "FechaReserva": `${ano}-${mes}-${dia}`
            }
                
                await RegistroProdus.create(registro);
                await ReservaProdus.destroy({where: {idProdu:registrada.idProdu}})
                res.status(200).json("Check-in producto N°:" + registrada.idProdu + " generado");
                
                
             
        //}
        // else{res.status(400).json("La habitación N°" + habRes+" ya registrada");}        
            
    
    }else{res.status(400).json("No existe reserva id n°:" + prod)
    }

    
}






const borrarRegistroProd = (req, res) => {
    const idx = req.params.id;
    const indice = registroProd.findIndex(i => i.id == idx)
       if(indice < 0){
          res.status(400).json("Registro N°:" + idx + " no existe")
       }else{
        //const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
        const registro = registroProd[indice];
        reservaProdu.push(registro);
        const resultado = registroProd.splice(indice,1);
          res.status(200).json("Se eliminó el registro N°: " + idx);
       }   


}


const modiRegistroProd = (req, res) => {
    const idx = req.params.id;
    const data = req.body;
    const indice = registroProd.findIndex(i => i.id == idx)
       if(indice >=0){
           //const egre = registroProd[indice].FechaEgreso;
           registroProd[indice].FechaReserva = data.FechaReserva
           registroProd[indice].cantDias = registroProd[indice].cantDias + data.cantDias;
           registroProd[indice].Precio = registroProd[indice].cantDias * Productos[registroProd[indice].idProdu-1].Precio;
           res.status(200).json(registroProd[indice]);
       }
       else{
          res.status(400).json("No existe el registro N°:" + idx);
       }
}








module.exports = {totalRegistroProd,check_in,registrosVencidosProd, borrarRegistroProd, modiRegistroProd}