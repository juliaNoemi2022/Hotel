const Joi = require("joi")

    const fecha = new Date();
    let dia = fecha.getDate();
    let mes = fecha.getMonth()+1;
    let anio = fecha.getFullYear();

 
const reservaSchema = Joi.object().keys(
   {
      
      Precio: Joi.number().integer().min(10000).messages({
         "number.min": "Precio min 10000",
         "number.empty":"No puede ser vacio",
         "any.required":"Campo es requerido",
         "number.unsafe": "Cantidad invalida",
         "number.base": "Debe ser numero"
      }),
          


   CantPersonas: Joi.number().integer().min(1).max(10).required().messages({
      "number.max": "Excede cantidad max personas",
      "number.min": "Cantidad min personas 1",
      "number.empty":"No puede ser vacio",
      "any.required":"Campo es requerido",
      "number.unsafe": "Cantidad invalida",
      "number.base": "Debe ser numero"
   }),

   CantDias: Joi.number().integer().min(1).messages({
      "number.min": "Cantidad min dias 1",
      "number.empty":"No puede ser vacio",
      "number.unsafe": "Cantidad invalida",
      "number.base": "Debe ser numero"
   }),

   FechaIngreso: Joi.date().required().min(''+anio+'-'+mes+'-'+dia+'').valid().messages({
      "date.empty":"No puede ser vacio",
      "any.required":"Campo es requerido",
      "date.min": "Fecha ingreso minima hoy",
      "date.base": "Fecha invalida",
      "date.unsafe": "Fecha invalida"
   }), 
  
   FechaEgreso: Joi.date().required().min(''+anio+'-'+mes+'-'+dia+'').valid().messages({
      "date.empty":"No puede ser vacio",
      "any.required":"Campo es requerido",
      "date.min": "Fecha egreso minima hoy",
      "date.base": "Fecha invalida",
      "date.unsafe": "Fecha invalida"
   }),
   
   dni: Joi.number().integer().required().messages({
      "number.empty":"No puede ser vacio",
      "any.required":"Campo es requerido",
      "number.unsafe": "dni invalido",
      "number.base": "Debe ser numero",
   }),

}

   

)

module.exports = reservaSchema