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
  //get previous user stats
  getUserByName(userInfo.username, function(results){
    let totalCorrect = results[0].dataValues.totalCorrect
    let totalIncorrect = results[0].dataValues.totalIncorrect
    let gamesPlayed = results[0].dataValues.gamesPlayed
    let highScore = results[0].dataValues.highScore
    let bestTime = results[0].dataValues.bestTime

   //add new users stats to previous user stats
    let newTotalCorrect = totalCorrect + userInfo.totalCorrect 
    let newTotalIncorrect = totalIncorrect + userInfo.totalIncorrect 
    let newGamesPlayed = gamesPlayed + 1
    let newHighScore = Math.max(highScore, userInfo.highScore)
    let newBestTime = Math.min(bestTime, userInfo.bestTime)

    //update with new stats
    User.update({
      "totalCorrect": newTotalCorrect, 
      "totalIncorrect": newTotalIncorrect, 
      "gamesPlayed": newGamesPlayed, 
      "highScore": newHighScore, 
      "bestTime": newBestTime
    }, {where : {"username": userInfo.username}}).then(() => cb())
  })

}



const addNewRecord = function(recordInfo) {

  const newRecord = Record.build({
    "time": recordInfo.time,
    "numberCorrect": recordInfo.numberCorrect,
    "numberIncorrect": recordInfo.numberIncorrect,
    "score": recordInfo.score,
    "userId": recordInfo.userId,
    "operate": recordInfo.operator
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
  getAllRecords : getAllRecords
}