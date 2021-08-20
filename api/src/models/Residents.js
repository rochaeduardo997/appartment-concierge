const { Model, DataTypes } = require("sequelize");

class Residents extends Model {
  static init(sequelize) {
    super.init({
      ownerFirstName: { type: DataTypes.STRING },
      ownerLastName:  { type: DataTypes.STRING },

      username:  { type: DataTypes.STRING,  allowNull: false, unique: true },
      password:  { type: DataTypes.STRING,  allowNull: false },
      email:     { type: DataTypes.STRING,  allowNull: false, unique: true },
      profile:   { type: DataTypes.ENUM,    allowNull: false, values: ["proprietario", "morador"]}
    }, {
      sequelize,
      modelName: "tbl_residents"
    });
  }

  static associate(models) {
    this.belongsTo(models.tbl_appartments, { foreignKey: "appartmentFloor_id", as: "appartments" });
  }
}

module.exports = Residents;
