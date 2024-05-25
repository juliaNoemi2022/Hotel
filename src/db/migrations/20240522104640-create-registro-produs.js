'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RegistroProdus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idProdu: {
        type: Sequelize.INTEGER,
        references: {
          model:'Productos'
        }
      },
      idCliente: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Clientes'
        }
      },
      FechaReserva: {
        type: Sequelize.DATE
      },
      Precio: {
        type: Sequelize.DECIMAL
      },
      CantPersonas: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RegistroProdus');
  }
};