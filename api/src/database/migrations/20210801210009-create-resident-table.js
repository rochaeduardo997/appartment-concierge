'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tbl_residents", {
      id:                 { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
      
      appartmentFloor_id: { type: Sequelize.INTEGER, allowNull: false, references: { model: "tbl_appartments", key: "id" }, onUpdate: "CASCADE", onDelete: "CASCADE"},

      ownerFirstName:     { type: Sequelize.STRING,  allowNull: false },
      ownerLastName:      { type: Sequelize.STRING,  allowNull: false },

      username:           { type: Sequelize.STRING,  allowNull: false, unique: true },
      password:           { type: Sequelize.STRING,  allowNull: false },
      email:              { type: Sequelize.STRING,  allowNull: false },
      profile:            { type: Sequelize.ENUM,    allowNull: false, values: (["proprietario", "morador"])},

      createdAt:          { type: Sequelize.DATE,    allowNull: false, defaultValue:  new Date() },
      updatedAt:          { type: Sequelize.DATE,    allowNull: false, defaultValue:  new Date() },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tbl_residents");
  }
};
