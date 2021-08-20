const { Model, DataTypes } = require("sequelize");

class Concierges extends Model {
  static init(sequelize) {
    super.init({
      firstName: { type: DataTypes.STRING },
      lastName:  { type: DataTypes.STRING },
      workShift: { type: DataTypes.ENUM, values: ["diurno", "noturno"]},

      username:  { type: DataTypes.STRING,  allowNull: false, unique: true },
      password:  { type: DataTypes.STRING,  allowNull: false },
      email:     { type: DataTypes.STRING,  allowNull: false, unique: true },
      profile:   { type: DataTypes.ENUM,    allowNull: false, values: ["administrador", "porteiro"]}
    },{
      sequelize,
      modelName: "tbl_concierges"
    });
  }
}

module.exports = Concierges;