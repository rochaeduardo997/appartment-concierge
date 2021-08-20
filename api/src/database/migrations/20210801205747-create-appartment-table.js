'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tbl_appartments", {
      id:              { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },

      appartmentFloor: { type: Sequelize.STRING,  allowNull: false, unique: true },
      
      createdAt:       { type: Sequelize.DATE,    defaultValue: new Date() },
      updatedAt:       { type: Sequelize.DATE,    defaultValue: new Date() },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tbl_appartments");
  }
};
