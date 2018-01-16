const Sequelize = require('../config.js').Sequelize;
const sequelize = require('../config.js').sequelize;

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
    defaultValue: 0
  }
});

User.sync();

module.exports = User;