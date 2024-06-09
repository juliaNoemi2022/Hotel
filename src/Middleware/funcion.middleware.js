const {Reservas} = require("../db/models")

const funcion = require("../Helpers/funciones")



const validarExiteClientePorDni =  async (req, res, next) => {
    const dni = req.body.dni;
    const cliente = await Clientes.findOne({where: {dni}, order: [
        ['dni', 'ASC']]})
    if(cliente){
        return res.status(400).json({error: 'El dni ' + dni + ' ya se encuentra registrado'})
    }
    next()
}


const existeReservaRegistroHabitacionPorFecha=  async (req, res, next) => {
     const data = req.body;
     
    if(req.reservada){
        
        const resultado = req.reservada.filter(i => funcion.finMayorInicio(data.FechaIngreso,funcion.acumulaDia(data.FechaIngreso,data.CantDias),i.FechaIngreso,i.FechaEgreso)==0)
        
        const resulRegis = req.registrado.filter(i => funcion.finMayorInicio(data.FechaIngreso,funcion.acumulaDia(data.FechaIngreso,data.CantDias),i.FechaIngreso,i.FechaEgreso)==0)
        
        

        if(resultado.length == 0 && resulRegis.length == 0){
        
            req.resultado = resultado;
            req.resulRegis = resulRegis;
            next()
      }else{return res.status(400).json({error: "La habitacion N°" + req.habi.numero +" ya alquilada en rango de fechas"})}
   }else{return;}
}


const existeReservaRegistroHabitacionPorFecha2=  async (req, res, next) => {
    const data = req.body;
    const idx = req.params.id;
    
   if(req.reservada){
       
       const resultado = req.reservada.filter(i => funcion.finMayorInicio(data.FechaIngreso,funcion.acumulaDia(data.FechaIngreso,data.CantDias),i.FechaIngreso,i.FechaEgreso)==0 && i.id != idx)
       
       const resulRegis = req.registrado.filter(i => funcion.finMayorInicio(data.FechaIngreso,funcion.acumulaDia(data.FechaIngreso,data.CantDias),i.FechaIngreso,i.FechaEgreso)==0)
       if(resultado.length == 0 && resulRegis.length == 0){
        
           req.resultado = resultado;
           req.resulRegis = resulRegis;
           next()
     }else{return res.status(400).json({error: "La habitacion N°" + req.habi.numero +" ya alquilada en rango de fechas"})}
  }else{return;}
}


const existeReservaRegistroHabitacionPorFecha3=  async (req, res, next) => {
    const data = req.body;
    const idx = req.params.id;
    
   if(req.reservada){
       
       const resultado = req.reservada.filter(i => funcion.finMayorInicio(data.FechaIngreso,funcion.acumulaDia(data.FechaIngreso,data.CantDias),i.FechaIngreso,i.FechaEgreso)==0 )
       
       const resulRegis = req.registrado.filter(i => funcion.finMayorInicio(data.FechaIngreso,funcion.acumulaDia(data.FechaIngreso,data.CantDias),i.FechaIngreso,i.FechaEgreso)==0 && i.id != idx)
       if(resultado.length == 0 && resulRegis.length == 0){
        
           req.resultado = resultado;
           req.resulRegis = resulRegis;
           next()
     }else{return res.status(400).json({error: "La habitacion N°" + req.habi.numero +" ya alquilada en rango de fechas"})}
  }else{return;}
}


module.exports = { existeReservaRegistroHabitacionPorFecha, existeReservaRegistroHabitacionPorFecha2, existeReservaRegistroHabitacionPorFecha3}