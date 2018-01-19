const Sequelize = require('../config.js').Sequelize;
const sequelize = require('../config.js').sequelize;
const User = require('./user.js');

const Relationship = sequelize.define('relationships', {
    userId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    friendId: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      }
});

Relationship.sync();

module.exports = Relationship;