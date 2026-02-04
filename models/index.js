const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Talent = require('./talent.model')(sequelize, Sequelize);
// const Customer = require('./customer.model')(sequelize, Sequelize);
// const Car = require('./car.model')(sequelize, Sequelize);

// User.associate(sequelize.models);
// Customer.associate(sequelize.models);
// Car.associate(sequelize.models)

module.exports = { Talent, sequelize };
