'use strict';


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reservas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     Reservas.belongsTo(models.Habitaciones,{
        foreignKey:'idHabitacion' 
        
     });
    
     Reservas.belongsTo(models.Clientes,{
      foreignKey:'idCliente'
      
     });

    }
  }
  Reservas.init({
    idCliente: DataTypes.INTEGER,
    idHabitacion: DataTypes.INTEGER,
    CantPersonas: DataTypes.INTEGER,
    FechaIngreso: DataTypes.DATE,
    CantDias: DataTypes.INTEGER,
    FechaEgreso: DataTypes.DATE,
    Precio: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Reservas',
    tableName: 'Reservas'
  });
  return Reservas;
};






