const Sequelize = require('sequelize');

const sequelize = new Sequelize('heroku_4d344af8cb59e0f', 'b03e5e18f3e601', 'b92c6c39', {
  host: 'us-cdbr-iron-east-05.cleardb.net',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate().then(() => console.log('cool')).catch(err => console.log(err))
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;