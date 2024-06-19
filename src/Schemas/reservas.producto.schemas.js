const Joi = require("joi")
const funcion = require("../Helpers/funciones")

    const fecha = new Date();
    let dia = fecha.getDate()-1;
    let mes = fecha.getMonth()+1;
    let anio = fecha.getFullYear();

const reservaProductoSchema = Joi.object().keys(
   {
      
      Precio: Joi.number().integer().min(10000).messages({
         "number.min": "Precio min 10000",
         "number.empty":"No puede ser vacio",
         "any.required":"Campo es requerido",
         "number.unsafe": "Cantidad invalida"
      }),

          


   CantPersonas: Joi.number().integer().min(1).max(10).required().messages({
      "number.max": "Excede cantidad max personas",
      "number.min": "Cantidad min personas 1",
      "number.empty":"No puede ser vacio",
      "any.required":"Campo es requerido",
      "number.unsafe": "Cantidad invalida"
   }),

   

   FechaReserva: Joi.date().required().min(''+anio+'-'+mes+'-'+dia+'').valid().messages({
      "date.empty":"No puede ser vacio",
      "date.min": "Fecha ingreso minima hoy",
      "any.required":"Campo es requerido",
      "date.base": "Fecha invalida",
      "date.unsafe": "Fecha invalida"
   }), 
  
   dni: Joi.number().integer().required().valid().messages({
      "number.empty":"No puede ser vacio",
      "any.required":"Campo es requerido",
      "number.unsafe": "dni invalido"
   }),

}



   

)

module.exports = reservaProductoSchema