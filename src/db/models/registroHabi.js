'use strict';


const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RegistroHabi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
     RegistroHabi.belongsTo(models.Habitaciones,{
        foreignKey:'idHabitacion'
        //targetkey: 'Habitacion'
     });
    
     RegistroHabi.belongsTo(models.Clientes,{
      foreignKey:'idCliente'
      //targetkey: 'dni'
     });

    }
  }
  RegistroHabi.init({
    idCliente: DataTypes.INTEGER,
    idHabitacion: DataTypes.INTEGER,
    CantPersonas: DataTypes.INTEGER,
    FechaIngreso: DataTypes.DATE,
    CantDias: DataTypes.INTEGER,
    FechaEgreso: DataTypes.DATE,
    Precio: DataTypes.INTEGER,
    //checkout: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RegistroHabi',
    tableName: 'RegistroHabi'
  });
  return RegistroHabi;
};






