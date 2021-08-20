'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tbl_deliveries", {
      id:                 { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },

      appartmentFloor_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "tbl_appartments", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE" },
      resident_id:        { type: Sequelize.INTEGER, allowNull: false, references: { model: "tbl_residents",   key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE" },
      concierge_id:       { type: Sequelize.INTEGER, allowNull: false, references: { model: "tbl_concierges",  key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE" },

      packageDescription: { type: Sequelize.STRING,  allowNull: true },

      createdAt:          { type: Sequelize.DATE,    allowNull: false, defaultValue: new Date() },
      updatedAt:          { type: Sequelize.DATE,    allowNull: false, defaultValue: new Date() }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tbl_deliveries");
  }
};
