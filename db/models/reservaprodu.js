'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ReservaProdus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ReservaProdus.belongsTo(models.Productos,{
        foreignKey:'idProdu'
      });

    }
  }
  ReservaProdus.init({
    idProdu: DataTypes.INTEGER,
    dni: DataTypes.INTEGER,
    FechaReserva: DataTypes.DATE,
    Precio: DataTypes.INTEGER,
    CantPersonas: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ReservaProdus',
  });
  return ReservaProdus;
};