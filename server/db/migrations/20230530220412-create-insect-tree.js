'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('InsectTrees', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      insectId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Insects',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      treeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Trees',
          key: 'id'
        },
        onDelete: 'cascade'
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.literal("CURRENT_TIMESTAMP")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.literal("CURRENT_TIMESTAMP")
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('InsectTrees');
  }
};
