const Sequelize = require('../config.js').Sequelize;
const sequelize = require('../config.js').sequelize;
const Relationship = require('../models/relationship');
const UserBadges = require('../models/userBadges');

const User = sequelize.define('user', {
  username: Sequelize.DataTypes.STRING,
  password: Sequelize.DataTypes.STRING, 
  totalCorrect: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  totalIncorrect: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  gamesPlayed: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  highScore: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  },
  bestTime: {
    type: Sequelize.INTEGER,
    defaultValue: 1000000
  },
  profilePicture: {
    type: Sequelize.STRING,
    defaultValue: null
  }
});

User.hasMany(Relationship, {as: 'Relationships'})
User.sync();

module.exports = User;
