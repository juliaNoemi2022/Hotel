const { error } = require("../Schemas/productos.schemas")

const schemaValidator = (schema) => {
    return (req, res, next) => {
        const resultado = schema.validate(req.body, {abortEarly: false})
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

module.exports = schemaValidator