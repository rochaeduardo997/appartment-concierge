const { Model, DataTypes } = require("sequelize");

class Appartments extends Model {
  static init(sequelize) {
    super.init({
      appartmentFloor: { type: DataTypes.STRING },
    }, {
      sequelize,
      modelName: "tbl_appartments"
    })
  }

  static associate(models) {
    this.hasMany(models.tbl_residents,  { foreignKey: "appartmentFloor_id", as: "appartments" });
    this.hasMany(models.tbl_deliveries, { foreignKey: "appartmentFloor_id", as: "delivery" });
  }
}

module.exports = Appartments;
