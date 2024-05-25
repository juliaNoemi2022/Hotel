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
        foreignKey:'idCliente'
          
        });

        Clientes.hasMany(models.RegistroHabi,{
          foreignKey:'idCliente'
            
        });

        Clientes.hasMany(models.ReservaProdus,{
          foreignKey:'idCliente'
           
        });

        Clientes.hasMany(models.RegistroProdus,{
          foreignKey:'idCliente'
          
        });
    }
  }
  Clientes.init({
    dni: DataTypes.INTEGER,
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    fechaNacimiento: DataTypes.DATE, 
    email: DataTypes.STRING,
    tarjeta: DataTypes.STRING,
    
  }, {
    sequelize,
    modelName: 'Clientes',
  });
  return Clientes;
};