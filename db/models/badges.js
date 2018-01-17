const Sequelize = require('../config.js').Sequelize;
const sequelize = require('../config.js').sequelize;

const Badges = sequelize.define('badges', {
  name: Sequelize.DataTypes.STRING
});

Badges.sync();

module.exports = Badges;