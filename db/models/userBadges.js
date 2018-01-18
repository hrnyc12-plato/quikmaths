const Sequelize = require('../config.js').Sequelize;
const sequelize = require('../config.js').sequelize
const User = require('./user.js');
const Badges = require('./badges.js');

const UserBadges = sequelize.define('user_badges', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  }
})

User.belongsToMany(Badges, { through:  UserBadges  });

Badges.belongsToMany(User, { through:  UserBadges });

UserBadges.sync();
User.sync();
Badges.sync();

module.exports = {
  UserBadges: UserBadges,
  User: User,
  Badges: Badges
};