const Joi = require("joi")

const habitacionSchema = Joi.object().keys(
   {
      
      Precio: Joi.number().integer().min(10000).required().max(30000).messages({
         "number.max": "Precio max 30000",
         "number.min": "Precio min 10000",
         "number.empty":"No puede ser vacio",
         "any.required":"Campo es requerido",
         "number.unsafe": "Cantidad invalida"
      }),

      numero: Joi.number().integer().min(1).max(30).required().messages({
        "number.max": "Rango habitación (1-30)",
        "number.min": "Rango habitaciones (1-30)",
        "number.empty":"No puede ser vacio",
        "any.required":"Campo es requerido",
        "number.unsafe": "Cantidad invalida"
     }),

     Estrellas: Joi.number().integer().min(1).max(3).required().messages({
      "number.max": "Rango estrellas (1-3)",
      "number.min": "Rango estrellas (1-3)",
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
   })
    

   }

)

module.exports = habitacionSchema