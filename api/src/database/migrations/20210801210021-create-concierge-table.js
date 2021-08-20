'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("tbl_concierges", {
      id:           { type: Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },

      firstName:    { type: Sequelize.STRING,  allowNull: false },
      lastName:     { type: Sequelize.STRING,  allowNull: false },
      
      username:     { type: Sequelize.STRING,  allowNull: false, unique: true },
      password:     { type: Sequelize.STRING,  allowNull: false },
      email:        { type: Sequelize.STRING,  allowNull: false, unique: true },
      profile:      { type: Sequelize.ENUM,    allowNull: false, values: (["administrador", "porteiro"])},

      workShift:    { type: Sequelize.ENUM,    allowNull: false, values: (["diurno", "noturno"])},
      
      createdAt:    { type: Sequelize.DATE,    allowNull: false, defaultValue: new Date() },
      updatedAt:    { type: Sequelize.DATE,    allowNull: false, defaultValue: new Date() }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("tbl_concierges");
  }
};
