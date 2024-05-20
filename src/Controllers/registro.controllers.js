
//const productos = require("../Data/Productos.json")
//const habitaciones = require("../Data/Habitaciones.json")
//const reservas = require("../Data/Reservas.json")
//const reservaProdu = require("../Data/Reserva productos.json")
//const registroHab = require("../Data/Registro_habitaciones.json")
const { CHAR, STRING, DATE } = require("sequelize")
const funcion = require("../Helpers/funciones")
//const clientes = require("../Data/clientes.json")
//const registroProd = require("../Data/Registro_productos.json")


const {Reservas} = require("../db/models")
const {Habitaciones} = require("../db/models")
const {Clientes} = require("../db/models")
//const {ReservaProdus} = require("../src/db/models")
const {RegistroProdus} = require("../db/models")
const {RegistroHabi} = require("../db/models")
const {Productos} = require("../db/models")




const totalRegistroHab = async (req, res) => {


    const datosres = await RegistroHabi.findAll({include: [{model: Clientes},{model: Habitaciones}]});
    //const datosres = await RegistroHabi.findAll({include: [{model: Habitaciones},{model: Clientes}]})

     //   include: [{model: Habitaciones}],

    
        
        //include: [{model: Clientes}],
        
    // });
     
     if(datosres.length > 0){ 
        res.status(200).json(datosres);
      }else{
        
        res.status(200).json("No existen Registros");
      }









    //if(registroHab.length > 0){  
        
    //    const resultado = registroHab.filter(i => funcion.fecha2(i.FechaEgreso)==0 )
    //    if(resultado.length > 0){
    //        res.status(200).json(resultado);
    //    }else{
    //        res.status(200).json("No existen registros activos");
    //    }
        
    //}else{
    //    res.status(200).json("No existen registro de habitaciones");
    //}
}


const registrosVencidasHab = async(req, res) => {

    const datosres = await RegistroHabi.findAll({});

    if(!datosres)
    {  
        res.status(200).json("No existen registros");
    }else{    
        const resultado = datosres.filter(i => funcion.fecha2(i.FechaEgreso)==1 )
        if(resultado.length > 0){
            res.status(200).json(resultado);
        }else{
            res.status(200).json("No existen registros vencidos");
        }
        
    }
        
    

    
}





const check_inHab =  async(req, res) => {



    //const data = req.body
    const habRes = req.params.id;
    //const habRes = req.body.Habitacion
    //const habRes = req.body.Habitacion;
    const reservada = await Reservas.findOne({where: {id:habRes}})
    //setTimeout(()=>{},1000);
    //const existehabi = await RegistroHabi.findOne({where: {id:habRes}})
    //setTimeout(()=>{},1000);
    //const existecli = await Clientes.findOne({where: {dni:data.dni}})
    //setTimeout(()=>{},1000); 
    
    
    //const indice = habitaciones.findIndex(i => i.id == habRes)
    //const indni = clientes.findIndex(i => i.dni == data.dni)
    


    //if(reservada == null || existehabi ==null || existecli ==null){ 
       //if(reservada.length > 0){
       //    res.status(400).json("Habitacion N°" + habRes +" esta reservada");
       //}else{
       //   if(existehabi == null){
       //       res.status(400).json("Habitacion N°" + habRes +" no existe");
       //   }else{
       
       //     if(existecli == null){
       //        res.status(400).json("Cliente N°" + data.dni +" no existe");
            //}else{
            //    res.status(200).json("Creada reserva habitacion N°:" + habRes );
             //   const registro = await Reservas.create(data);
            //} 
       // }  










    //const data = req.body
    //const habRes = req.params.id;
    //const indice = reservas.findIndex(i => i.id == habRes)
    //const indni = clientes.findIndex(i => i.dni == data.dni)
    
    if(reservada){    
        //if(!existehabi)
        //{
       //if(habitaciones[indice].Habilitado == false){
       //   res.status(400).json("Habitacion N°:" + habRes + " ya esta reservada");     
       //}else{ 
       //  if(habitaciones[indice].CantPersonas >= data.CantPersonas){

            //const nres = reservas.map(i => i.id);
            //if(reservas.length == 0){
            //    var maxi = 1;
            //}else{
            //   maxi = Math.max(...nres) + 1;
            //}   
               const fecha = new Date();
               const dia = fecha.getDate();
               const mes = fecha.getMonth() + 1;
               const anio = fecha.getFullYear();
               
               const habiActu = await Habitaciones.findOne({where: {id:reservada.idHabitacion}})
                
               const registro = {
                 "idCliente": reservada.idCliente,
                 "idHabitacion": reservada.idHabitacion,
                 "CantPersonas": reservada.CantPersonas,
                 "FechaIngreso": `${anio}-${mes}-${dia}`,
                 "CantDias": reservada.CantDias,
                 "FechaEgreso": funcion.acumulaDia(fecha,reservada.CantDias), 
                 "Precio": reservada.CantDias * habiActu.Precio
            }
                //habitaciones[indice].Habilitado = false;
                //registroHab.push(registro);
                await RegistroHabi.create(registro);
                res.status(200).json("Check-in habitacion N°:" + habRes + " generado");
                await Reservas.destroy({where: {id:habRes}})
                //reservas.splice(indice,1);
                
             
        //}
        // else{res.status(400).json("La habitación N°" + habRes+" ya registrada");}        
            
    //}else{
    //    if(habRes > habitaciones.length ){res.status(400).json("No existe habitacion N°" + habRes);}
    //    if(indni < 0 ){res.status(400).json("No existe cliente dni n°:" + data.dni);}
    }else{res.status(400).json("No existe reserva habitacion n°:" + habRes)
    }       
}






const borrarRegistroHab = async(req, res) => {
    
    const habRes = req.params.id;
    //const habRes = req.body.Habitacion
    //const habRes = req.body.Habitacion;
    
    const registro = await RegistroHabi.findOne({where: {Habitacion:habRes}})
    //setTimeout(()=>{},1000);
    
    if(registro !=null){
        const registro = await RegistroHabi.destroy({where: {Habitacion:habRes}})
        res.status(200).json("Registro habitacion N°:" + habRes + " eliminado");
                //reservas.splice(indice,1);
                
             
    }
         else{res.status(400).json("La habitación N°" + habRes+" no está registrada");}
    
    
    
    
    
    
    //const idx = req.params.id;
    //const indice = registroHab.findIndex(i => i.id == idx)
    //   if(indice < 0){
    //      res.status(400).json("Registro N°:" + idx + " no existe")
    //   }else{
        //const habi = habitaciones[reservas[indice].Habitacion - 1].Habilitado = true;  
    //    const registro = registroHab[indice];
    //    reservas.push(registro);
    //    const resultado = registroHab.splice(indice,1);
    //      res.status(200).json("Se eliminó el registro N°: " + idx);
    //   }   


}


const modiRegistroHab = async(req, res) => {

    const idx = req.params.id;
    const data = req.body;
    //const indice = reservas.findIndex(i => i.id == idx)
    const reservada = await RegistroHabi.findOne({where: {id:idx}})
    //setTimeout(()=>{},1000);
       if(reservada){
        
        const habi2 =  await Habitaciones.findOne({where: {numero:data.Habitacion}})
        //const codCli = await Clientes.findOne({where: {dni:data.dni}})
        
        //setTimeout(()=>{},1000);   
         
        if(habi2 && habi2.CantPersonas >= data.CantPersonas){
            
            //fecha = new Date(reservada.FechaIngreso + data.CantDias);
               
               const reserby = {
                   "idCliente": reservada.idCliente,
                   "idHabitacion": habi2.id,
                   //"Estrellas": reservada.Estrellas,
                   "CantPersonas": data.CantPersonas,
                   "FechaIngreso": reservada.FechaIngreso,
                   //"FechaIngreso": fecha,
                   "CantDias": data.CantDias,
                   //"FechaEgreso": reservada.FechaEgreso,
                   "FechaEgreso": funcion.acumulaDia(reservada.FechaIngreso,data.CantDias),
                   "Precio": data.CantDias * habi2.Precio
               }
               
               //const modi2 =  await Reservas.update({dni: data.dni},{where:{id:reservada.Habitacion}} )
               //setTimeout(()=>{},1000); 
               const modi3 =  await RegistroHabi.update(reserby,{where:{id:idx}} )
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
           const reservada2 = await RegistroHabi.findOne({where: {id:idx},include: [{model: Habitaciones},{model: Clientes}]})
           res.status(200).json(reservada2);
        }else{
          if(!habi2){
            res.status(200).json("No existe habitación N°:" + data.Habitacion);      
          }else{res.status(200).json("Cant. personas supera capacidad habitacion n°"+data.Habitacion);  }  
          
        }

       }
       else{
          res.status(400).json("No existe registro habitación N°:" + idx);
       }
















    //const idx = req.params.id;
    //const data = req.body;
    //const indice = registroHab.findIndex(i => i.id == idx)
    //   if(indice >=0){
    //       const egre = registroHab[indice].FechaEgreso;
    //       registroHab[indice].FechaEgreso = funcion.acumulaDia(egre,data.cantDias)
    //       registroHab[indice].cantDias = registroHab[indice].cantDias + data.cantDias;
    //       registroHab[indice].Precio = registroHab[indice].cantDias * habitaciones[registroHab[indice].Habitacion-1].Precio;
    //       res.status(200).json(registroHab[indice]);
    //   }
    //   else{
    //      res.status(400).json("No existe el registro N°:" + idx);
    //   }
}


const check_outHab = async(req, res) => {

    
    const idx = req.params.id;
    //const data = req.body;
    //const indice = reservas.findIndex(i => i.id == idx)
    const registrada = await RegistroHabi.findOne({where: {id:idx}})
    //setTimeout(()=>{},1000);
    
    //setTimeout(()=>{},1000);

    
    
       if(registrada)
       {
        const habi = await Habitaciones.findOne({where: {id:registrada.idHabitacion}})
        //const habi2 =  await Habitaciones.findOne({where: {id:data.Habitacion}})
        //setTimeout(()=>{},1000);   
        
        //if(habi2.Habilitado == true){
            
            //fecha = reservada.FechaIngreso;
            
            
            //const fecha1 = moment(registrada.FechaIngreso);
            //const fecha2 = moment(registrada.FechaEgreso);
            //const diferencia = fecha2.diff(fecha1, 'days');
            //console.log(diferencia)


               //const reserby = {
               //    "dni": data.dni,
               //    "Habitacion": data.Habitacion,
                   //"Estrellas": reservada.Estrellas,
               //    "CantPersonas": reservada.CantPersonas,
               //    "FechaIngreso": reservada.FechaIngreso,
                   //"FechaIngreso": fecha,
               //    "CantDias": data.CantDias,
               //    "FechaEgreso": funcion.acumulaDia(data.FechaEgreso,data.CantDias), 
               //    "Precio": data.CantDias * habi2.Precio
               //}
               //const hoy = funcion.acumulaDia(new Date(),0);
               //     let contador = 0;
                    //let fechy = funcion.acumulaDia(registrada.FechaIngreso,1)
               //     while (hoy != funcion.acumulaDia(registrada.FechaIngreso,contador) ) {
               //        contador++;
               //     }
               //console.log(funcion.acumulaDia(data.FechaEgreso,data.CantDias))
               
               
               const modi2 =  await RegistroHabi.update({"FechaEgreso": hoy, "CantDias":funcion.diferencia(registrada.FechaIngreso,hoy)} ,{where:{id:idx}} )
               
               
               
           res.status(200).json("Checkout realizado habitacion n°"+habi.numero); 
        }else{
          
           
            res.status(200).json("No existe registro n°"+idx); 
              //else{res.status(200).json("Debe reservar habitacion n°"+idx);} 
        }

       

  
}








module.exports = {totalRegistroHab,check_inHab, check_outHab,registrosVencidasHab, borrarRegistroHab, modiRegistroHab}