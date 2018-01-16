const Sequelize = require('sequelize');

const sequelize = new Sequelize('quikmath', 'root', '', {
  host: 'localhost',
  Port: 8080,
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