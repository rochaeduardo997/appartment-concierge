const Sequelize = require("sequelize");

/* import models */
const Appartments = require("../models/Appartments");
const Residents = require("../models/Residents");
const Concierges = require("../models/Concierges");
const Deliveries = require("../models/Deliveries");

/* starting database with configs setup on ~/config/database */
const databaseConfig = require("../../config/database");
const sequelize      = new Sequelize(databaseConfig);

/* initializing models */
Appartments.init(sequelize);
Residents.init(sequelize);
Concierges.init(sequelize);
Deliveries.init(sequelize);

/* associations */
Residents.associate(sequelize.models);
Appartments.associate(sequelize.models);
Deliveries.associate(sequelize.models);

module.exports = sequelize;
