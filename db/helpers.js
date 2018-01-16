const User = require('./models/user.js')
const Record = require('./models/records.js')

const doesUserExist = function(username, cb) {
  User.findAll({
    where: {
      "username": username
    }
  })
  .then(results => {
    if (results.length === 0) {
      cb(false)
    } else {
      cb(true);
    }
  })
  .catch(err => {
    console.log('error:', err)
  })
}


const addNewUser = function(userInfo, cb) {
  doesUserExist(userInfo.username, () => {
    const newUser = User.create({
      "username": userInfo.username,
      "password": userInfo.password
    })
      .then((user) => {
        cb(null, {username: user.username, id: user.id})
      })
      .catch(err => {
        console.log(err, null);
      })
  })
}


const getUserByName = function(username, cb) {
  User.findAll({
    where: {
      "username": username
    }
  })
  .then(results => {
    if (results.length === 0) {
      cb(false)
    } else {
      cb(results);
    }
  })
}

const getAllUsers = function(cb) {
  User.findAll()
      .then(results => {
        cb(results);
      })
      .catch(err => {
        console.log('error: ', err)
      })
}
//userInfo not defined yet; might have to refactor based on what's passed in 

const updateUser = function(userInfo, cb) {
  getUserByName(userInfo.username, function(results) {
    var totalCorrect = results[0].dataValues.totalCorrect + userInfo.numberCorrect;
    var totalIncorrect = results[0].dataValues.totalIncorrect + userInfo.numberIncorrect;
    var gamesPlayed = results[0].dataValues.gamesPlayed + 1;
    var newHighScore = Math.max(userInfo.highScore, results[0].dataValues.highScore)
    var newTime = Math.min(userInfo.bestTime, results[0].dataValues.bestTime)
        User.find({
<<<<<<< HEAD
          where: {
            username: userInfo.username
          }
        }).then((user) => {
=======
      where: {
        username: userInfo.username
      }
    }).then((user) => {
>>>>>>> changes to config and debugged helper.js
      user.update({
        totalCorrect: totalCorrect,
        totalIncorrect: totalIncorrect,
        gamesPlayed: gamesPlayed,
        highScore: newHighScore,
        bestTime: newTime
      }).then(user => cb(user))
    })
  })
}

const updateProfilePicture = function (userImage, cb) {
   User.find({
    where: {
      username: userImage.username
    }
  }).then((user) => {
    user.update({
      profilePicture: userImage.uploadedFileCloudinaryUrl
    });
  });
}


const addNewRecord = function(recordInfo) {

  const newRecord = Record.build({
    "time": recordInfo.time,
    "numberCorrect": recordInfo.numberCorrect,
    "numberIncorrect": recordInfo.numberIncorrect,
    "score": recordInfo.score,
    "username": recordInfo.username,
    "operator": recordInfo.operator
  })
    .save()
    .then()
    .catch(err => {
      console.log('error: ', err);
    })
}

const getAllRecordsForUser = function(userId, cb) {
  Record.findAll({
    where: {
      "userId": userId
    }
  })
    .then(results => {
      cb(results)
    })
    .catch(err => {
      console.log('error: ', err);
    })
}

const getAllRecordsForOperator = function(operator, cb) {
  Record.findAll({
    where: {
      "operator": operator
    }
  })
    .then(results => {
      cb(results);
    })
    .catch(err => {
      console.log('error: ', err);
    })
}

const getAllRecords = function(cb) {
  Record.findAll()
    .then(results => {
      cb(results);
    })
    .catch(err => {
      console.log('error: ', err);
    })
} 


// manipulating data
const sortRecordsByScore = function(descending, cb) {

}

const sortRecordsByTime = function(descending, cb) {

}

module.exports = {
  doesUserExist : doesUserExist,
  addNewUser : addNewUser,
  getUserByName : getUserByName,
  getAllUsers : getAllUsers,
  addNewRecord : addNewRecord,
  getAllRecordsForUser : getAllRecordsForUser,
  getAllRecordsForOperator : getAllRecordsForOperator,
  sortRecordsByScore : sortRecordsByScore,
  sortRecordsByTime : sortRecordsByTime,
  getAllRecords : getAllRecords,
  updateUser : updateUser,
  updateProfilePicture: updateProfilePicture
}