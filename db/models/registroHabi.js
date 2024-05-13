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
        foreignKey:'Habitacion',
        targetkey: 'Habitacion'
     });
    
     RegistroHabi.belongsTo(models.Clientes,{
      foreignKey:'dni',
      targetkey: 'dni'
     });

    }
  }
  RegistroHabi.init({
    dni: DataTypes.INTEGER,
    Habitacion: DataTypes.INTEGER,
    CantPersonas: DataTypes.INTEGER,
    FechaIngreso: DataTypes.STRING,
    CantDias: DataTypes.INTEGER,
    FechaEgreso: DataTypes.STRING,
    Precio: DataTypes.INTEGER,
    checkout: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'RegistroHabi',
    tableName: 'RegistroHabi'
  });
  return RegistroHabi;
};






