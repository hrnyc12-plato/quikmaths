const Sequelize = require('sequelize');
// const CLEARDB_DATABASE_URL = 'mysql://b03e5e18f3e601:b92c6c39@us-cdbr-iron-east-05.cleardb.net/heroku_4d344af8cb59e0f?reconnect=true'




//             match = process.env.CLEARDB_DATABASE_URL.match(/mysql:\/\/([^:]+):([^@]+)@([^:]+)\/(.+)\?/);
            
//             config = {
//                 user: match[1],
//                 pass: match[2],
//                 base: match[4],
//                 options: {
//                     dialect: 'mysql',
//                     protocol: 'mysql',
//                     host: match[3],
//                     port: 3306,
//                     logging: false,
//                     dialectOptions: {
//                         ssl: true
//                     }
//                 }
//             };
            


//         const sequelize = new Sequelize(config.base, config.user, config.pass, config.options)


<<<<<<< HEAD
const sequelize = new Sequelize('quikmath', 'plato', 'hrnyc12plato', {
 host: 'quikmaths.ccl2ixzx9sdm.us-east-2.rds.amazonaws.com',
=======
 const sequelize = new Sequelize('quikmath', 'plato', 'hrnyc12plato', {
  host: 'quikmaths.ccl2ixzx9sdm.us-east-2.rds.amazonaws.com',
>>>>>>> working on rendering correct badge images
  dialect: 'mysql',
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

sequelize.authenticate().catch(err => console.log(err))
module.exports.sequelize = sequelize;
module.exports.Sequelize = Sequelize;
