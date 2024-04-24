'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ReservaProdus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idProdu: {
        type: Sequelize.INTEGER
      },
      dni: {
        type: Sequelize.INTEGER
      },
      FechaReserva: {
        type: Sequelize.DATE
      },
      Precio: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('ReservaProdus');
  }
};