'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
     Productos.hasOne(models.ReservaProdus,{
      foreignKey:"id",
      //sourcekey:"idProdu"
    });

    }
  }
  Productos.init({
    Producto: DataTypes.STRING,
    Precio: DataTypes.INTEGER,
    Habilitado: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Productos',
  });
  return Productos;
};