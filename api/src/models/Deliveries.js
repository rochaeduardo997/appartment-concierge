const { Model, DataTypes } = require("sequelize");

class Deliveries extends Model {
  static init(sequelize) {
    super.init({
      appartmentFloor_id: { type: DataTypes.INTEGER },
      resident_id:        { type: DataTypes.INTEGER },
      concierge_id:       { type: DataTypes.INTEGER },
      packageDescription: { type: DataTypes.STRING },
    },{
      sequelize,
      modelName: "tbl_deliveries"
    });
  }

  static associate(models) {
    this.belongsTo(models.tbl_appartments, { foreignKey: "appartmentFloor_id", as: "appartment" });
    this.belongsTo(models.tbl_residents,   { foreignKey: "resident_id",        as: "resident" });
    this.belongsTo(models.tbl_concierges,  { foreignKey: "concierge_id",       as: "concierge" });
  }
}

module.exports = Deliveries;