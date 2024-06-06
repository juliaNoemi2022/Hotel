const Joi = require("joi")

const productoSchema = Joi.object().keys(
   {
      
      Producto: Joi.string().min(5).max(50).required().messages({
         "string.max": "Maximo 50 caracteres",
         "string.min": "Minimo 5 caracteres",
         "string.empty":"No puede ser vacio",
         "any.required":"Campo es requerido"
      }),

      Precio: Joi.number().integer().min(0).max(100000).required().messages({
        "number.max": "Max $100000",
        "number.min": "Min $0",
        "number.empty":"No puede ser vacio",
        "any.required":"Campo es requerido"
     })

   }

)

module.exports = productoSchema