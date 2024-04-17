'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Habitaciones extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Habitaciones.init({
    Estrellas: DataTypes.INTEGER,
    CantPersonas: DataTypes.INTEGER,
    Precio: DataTypes.INTEGER,
    Habilitado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Habitaciones',
  });
  return Habitaciones;
};