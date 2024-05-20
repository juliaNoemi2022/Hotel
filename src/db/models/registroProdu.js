'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class RegistroProdus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      RegistroProdus.belongsTo(models.Productos,{
        foreignKey:'idProdu'
        //targetkey: 'idProdu'
      });

      RegistroProdus.belongsTo(models.Clientes,{
        foreignKey:'idCliente'
        //targetkey: 'idProdu'
      });
    }
  }
  RegistroProdus.init({
    idProdu: DataTypes.INTEGER,
    idCliente: DataTypes.INTEGER,
    FechaReserva: DataTypes.DATE,
    Precio: DataTypes.INTEGER,
    CantPersonas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'RegistroProdus',
  });
  return RegistroProdus;
};