const Joi = require("joi")

const SchemaURL = Joi.object(
   {
      
      dni: Joi.number().min(0).unsafe().messages({
         "number.min": "N° dni erroneo ",
         "any.required":"Campo es requerido",
         "any.unsafe": "N° dni erroneo",
         "number.base": "Debe ser numero"
      }),

      id: Joi.number().min(0).max(100000).unsafe().messages({
         "number.max": "N° id erroneo",
         "number.min": "N° id erroneo ",
         "number.empty":"No puede ser vacio",
         "any.unsafe": "N° id erroneo",
         "number.base": "Debe ser numero"
      }),

      num: Joi.number().min(0).max(100).unsafe().messages({
         "number.max": "N° erroneo",
         "number.min": "N° erroneo ",
         "any.required":"Campo es requerido",
         "any.unsafe": "N° erroneo",
         "number.base": "Debe ser numero"
      }),

      
      
   }

)

module.exports = SchemaURL