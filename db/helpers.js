const User = require('./models/userBadges').User
const Record = require('./models/records.js')
const Badges = require('./models/userBadges').Badges;
const UserBadges = require('./models/userBadges').UserBadges;
const Relationship = require('./models/relationship');
const db = require('./config');
const config = require('../config');

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
    console.log('what is results in getUserByName', results)
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
  console.log('USERINFO', userInfo)
  getUserByName(userInfo.username, function(results) {
    var totalCorrect = results[0].dataValues.totalCorrect + userInfo.numberCorrect;
    var totalIncorrect = results[0].dataValues.totalIncorrect + userInfo.numberIncorrect;
    var gamesPlayed = results[0].dataValues.gamesPlayed + 1;
    var newHighScore = Math.max(userInfo.highScore, results[0].dataValues.highScore)
    var newTime = Math.min(userInfo.bestTime, results[0].dataValues.bestTime)
        User.find({
      where: {
        username: userInfo.username
      }
    }).then((user) => {
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

const addNewBadges = function(userId,badges) {
  // select the ids for the badges that were passed in
  var selectSubQueries = badges.map(badge => db.sequelize.query("SELECT id FROM badges WHERE name=" + db.sequelize.getQueryInterface().escape(badge) +";",  {type: db.sequelize.QueryTypes.SELECT}));
  // for each badge, stick into promise.all and parse out id from promise results  
  Promise.all(selectSubQueries).then( (results) => {
    var ids = results.map(result => result[0].id);
    // build a query to insert into the join table 
    var insertSubQuery = ids.map(id => "(" + userId + "," + db.sequelize.getQueryInterface().escape(id) + ")");
    db.sequelize.query("INSERT INTO user_badges (userId, badgeId) VALUES " + insertSubQuery , { replacements : [userId], type: db.sequelize.QueryTypes.INSERT })
  }).catch(err => {
    console.log('error', err);
  })
}

const getAllBadges = function(userId, req, res) {
    db.sequelize.query("(SELECT name FROM badges WHERE id IN (SELECT badgeId FROM user_badges WHERE userId=" + userId + "));", {type: db.sequelize.QueryTypes.SELECT})
      .then(badges => {
        console.log('badges request', badges)
        res.send(badges)})
        .catch(err => console.log('error in requesting badges', err));
};

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

const getAllFriendsRecords = function(username, cb) {
  return User.findAll({
    where: {
      "username": username
    },
    include: [ { model: Relationship, as: 'Relationships' } ]
  }).then(user => {
    //grab the user's friends ids and stringify in preparation for a sql query
     // construct a query to select all of the records from the user's friends
    let friendIds = "(" + user[0].Relationships.map(friend => {
      return friend.friendId;
    }).join() + ")"
    db.sequelize.query('SELECT * FROM records r INNER JOIN users u ON (u.username=r.username) WHERE u.id in ' + friendIds + ';', {type: db.sequelize.QueryTypes.SELECT}) 
    .then( results => {
      cb(results);
    })
  })
}

const getAllFriends = function(username, cb) {
  return User.findAll({
    where: {"username": username}
  })
  .then(results => {
    var usernameId = results[0].dataValues.id;
    db.sequelize.query(`SELECT * FROM users INNER JOIN relationships ON users.id = relationships.friendId WHERE relationships.userId = ${usernameId};`, { type: db.sequelize.QueryTypes.SELECT})
    .then(friends => {
      cb(friends);
    })
  })
}

    //WRITE A HELPER TO ADD A FRIEND
const addFriend = function(username, friendUsername, cb) {
  // User.findAll({
  //   where: {"username": username}
  // })
  // .then(results => {
  //   console.log('main username results from addFriend helper');
  //   User.findAll({
  //     where: {"username": friendUsername}
  //   })
  //   .then(res => {
  //     console.log('main username results from addFriend helper', res);
  //     const newRelationship = Relationship.create({
  //       "username": userInfo.username,
  //       "password": userInfo.password
  //     })
  //   })
  // })
  //check if the relationship already exists
    //if it does not exist
      //
      console.log('username recieved from addFriend', username);
      console.log('friend username recieved from addFriend', friendUsername);
  db.sequelize.query(`SELECT * FROM relationships WHERE relationships.userId = (SELECT id FROM users WHERE username="${username}") AND relationships.friendID = (SELECT id FROM users WHERE username="${friendUsername}");`, { type: db.sequelize.QueryTypes.SELECT})
  .then((results) => {
    console.log('Relationship1', results);
    db.sequelize.query(`SELECT * FROM relationships WHERE relationships.userId = (SELECT id FROM users WHERE username="${friendUsername}") AND relationships.friendID = (SELECT id FROM users WHERE username="${username}");`, { type: db.sequelize.QueryTypes.SELECT})
    .then((results2) => {
      console.log('Relationship2', results2);
    }).catch(err => {
      console.log('Error fetching friend relationship between User2 to User1: ', err);
    })
  }).catch(err => {
    console.log('Error fetching friend relationship between User1 to User2: ', err);
  })
}

const deleteFriend = function(username, friendUsername, cb) {
  //deleting relationship between User1 to User2
  db.sequelize.query(`DELETE FROM relationships WHERE relationships.userId = (SELECT id FROM users WHERE username="${friendUsername}") AND relationships.friendID = (SELECT id FROM users WHERE username="${username}") OR relationships.userId = (SELECT id FROM users WHERE username="${username}") AND relationships.friendID = (SELECT id FROM users WHERE username="${friendUsername}");`, { type: db.sequelize.QueryTypes.DELETE})
  .then((results) => {
    cb(results);
  }).catch(err => {
    console.log('Error friend relationship between User1 to User2: ', err);
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
  updateProfilePicture: updateProfilePicture,
  addNewBadges: addNewBadges,
  getAllFriends:getAllFriends,
  deleteFriend:deleteFriend,
  addFriend:addFriend,
  getAllBadges: getAllBadges,
  getAllFriendsRecords: getAllFriendsRecords
}