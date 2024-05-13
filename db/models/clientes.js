'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Clientes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Clientes.hasMany(models.Reservas,{
        foreignKey:'dni',
        targetkey:'dni'  
        });

        Clientes.hasMany(models.RegistroHabi,{
          foreignKey:'dni',
          targetkey:'dni'  
        });
    }
  }
  Clientes.init({
    dni: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    //fechaNacimiento: DataTypes.DATE, 
    email: DataTypes.STRING,
    //direccion: DataTypes.STRING,
    //telefono: DataTypes.STRING,
    tarjeta: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Clientes',
  });
  return Clientes;
};