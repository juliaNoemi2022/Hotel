'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RegistroHabis', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idCliente: {
        type: Sequelize.INTEGER,
        references: {
          model:'Clientes'
        }
      },
      idHabitacion: {
        type: Sequelize.INTEGER,
        references: {
          model:'Habitaciones'
        }
      },
      CantPersonas: {
        type: Sequelize.INTEGER
      },
      FechaIngreso: {
        type: Sequelize.DATE
      },
      CantDias: {
        type: Sequelize.INTEGER
      },
      FechaEgreso: {
        type: Sequelize.DATE
      },
      Precio: {
        type: Sequelize.DECIMAL
      },
      checkout: {
        type: Sequelize.BOOLEAN
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
    await queryInterface.dropTable('RegistroHabis');
  }
};