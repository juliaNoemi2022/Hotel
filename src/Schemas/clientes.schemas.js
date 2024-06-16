const Joi = require("joi")




const clienteSchema = Joi.object().keys(
   {
      
      nombre: Joi.string().min(5).max(50).required().messages({
         "string.max": "Maximo 50 caracteres",
         "string.min": "Minimo 5 caracteres",
         "string.empty":"No puede ser vacio",
         "any.required":"Campo es requerido"
      }),

      dni: Joi.number().integer().required().messages({
        "number.empty":"No puede ser vacio",
        "any.required":"Campo es requerido"
     }),
     apellido: Joi.string().max(5).max(50).required().messages({
      "string.max": "Maximo 50 caracteres",
      "string.min": "Minimo 5 caracteres",
      "string.empty":"No puede ser vacio",
      "any.required":"Campo es requerido"
     }),

   fechaNacimiento: Joi.date().max('now').required().valid().messages({
      "date.max": "Fecha erronea",
      "date.empty":"No puede ser vacio",
      "any.required":"Campo es requerido",
      "date.base": "Fecha invalida"
   }),
   
   tarjeta: Joi.number().integer().required().messages({
      "number.empty":"No puede ser vacio",
      "any.required":"Campo es requerido"
   }),

   email: Joi.string().email().required().messages({
      "string.empty":"No puede ser vacio",
      "any.required":"Campo es requerido"
     })

   }

)

module.exports = clienteSchema