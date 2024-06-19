const { Json } = require("sequelize/lib/utils")
const { error } = require("../Schemas/productos.schemas")
const { json } = require("sequelize")

const schemaValidatorURL = (schema) => {

    
 
    return (req, res, next) => {
        
        

           const resultado = schema.validate(req.params, {abortEarly: false})
           if(resultado.error) {
            
              return res.status(400).json({
            //errores: resultado.error.details,
               errores: resultado.error.details.map(error => ({
                   atributo: error.path[0],
                   error: error.message
               }))
           }        
               )
        
                        
           }
           next()
        
    }  


}

module.exports = schemaValidatorURL