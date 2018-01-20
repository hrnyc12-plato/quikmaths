// Dependencies
const express = require('express');
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const db = require('./db/helpers.js');
const bcrypt = require('bcrypt');
const session = require('express-session');
const config = require('./config');

app.use(bodyparser.json());

// Serve up static files
app.use(express.static(path.join(__dirname, '/client/www')));
app.use(express.static(path.join(__dirname, '/node_modules/')));

app.use(session({
  secret: 'milksteak',
  resave: false,
  saveUninitialized: true
}));


const isLoggedIn = function(req) {
  return req.session ? !!req.session.user : false;
};

const checkUser = function(req, res, next){
  if (!isLoggedIn(req)) {
    res.json(false)
  } else {
    next();
  }
};

const createSession = function(req, res, userObj) {
  return req.session.regenerate(function() {
      req.session.user = userObj.username;
      res.json(userObj)
    });
};


app.get('/git', checkUser, (req, res) => {
    res.json(req.session)
  }
);


app.get('/logout', function(req, res) {
  req.session.destroy(function(err) {
    res.end();
  });
});

// checks if username exists. if it doesn't it create the user in db
app.post('/signup', (req, res) => {
  db.doesUserExist(req.body.username, (exists) => {
    if (exists) {
      res.json(false);
    } else {
      bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {
          req.body.password = hash;
          db.addNewUser(req.body, (err, userObj) => {
            if (err){
              res.json(false)
            } else {
              createSession(req, res, userObj)
            }
          });
        });
      });
    }
  })
});


app.post('/login', (req, res) => {
  db.getUserByName(req.body.username, (exists) => {
    if (!exists) {
      res.json([false, 'We did not recognize your username']);
    } else {
      bcrypt.compare(req.body.password, exists[0].dataValues.password, (err, result) => {
        if (result) {
          createSession(req, res, exists[0].dataValues)
        } else {
          res.json([false, 'Incorrect Password']);
        }
      })
    }
  })
})

// returns all information about user that exists in database
/*
{
  "username": username,
}
*/
app.post('/user', (req, res) => {
  const username = req.body.username;
  db.getUserByName(username, (results) => {
    res.json(results);
  });
})

app.post('/updateBadges', (req, res) => {
  const badges = req.body.badges;
  console.log('the client sent to updateBadges', req.body);
  db.addNewBadges(req.body.userId, req.body.badges);
  res.send();
})

app.post('/user/badges', (req, res) => {
  let id = req.body.userId;
  db.getAllBadges(id, req, res);
})

// save new record to database
/*
{
  "time": time,
  "numberCorrect": numberCorrect,
  "numberIncorrect": numberIncorrect,
  "score": score,
  "userId": userId,
  "operator": operator
}
*/
app.post('/newRecord', (req, res) => {
  db.addNewRecord(req.body);
  // db.updateUser(req.body);
  res.send('Record Added to Database');
})

// update user info in database
/*
{
  "id": id,
  "username": username,
  "password": password,
  "totalCorrect": totalCorrect,
  "totalIncorrect", totalIncorrect,
  "gamesPlayed": gamesPlayed,
  "highScore": highScore,
  "bestTime": bestTime,
  "createdAt": createdAt,
  "updatedAt": updatedAt
}
*/

app.post('/updateUser', (req, res) => {
  db.updateUser(req.body, (user) => {
    res.json(user)
  });
})


app.put('/profilePicture', (req, res) => {
  db.updateProfilePicture(req.body);
})
// return all records for a user
/*
{
  "username": username,
  "operator": optional,
  "ascending": boolean
}
*/
app.post('/userRecords', (req, res) => {
  const username = req.body.username;
  const ascending = req.body.ascending;
  const operator = req.body.operator
  
  db.getAllRecordsForUser( (records) => {
    if (operator) {
      records = records.filter(record => record.operator === operator);
    }

    if (ascending) {
      records = records.sort((a, b) => {return a.score - b.score});
      res.json(records.slice(0, 100));
    } else {
      let records = records.sort((a, b) => {return b.score - a.score});
      res.json(records.slice(0, 100));
    }
  })

})

// return all records
/*
{
  "operator": optional,
  "ascending": boolean
}
*/
app.post('/allRecords', (req, res) => {
  const ascending = req.body.ascending;
  const operator = req.body.operator;

  db.getAllRecords(records => {
    if (operator !== '') {
      records = records.filter(record => record.operator === operator);
    }
    if (ascending) {
      records = records.sort((a, b) => {return a.score - b.score});
      res.json(records.slice(0, 10));
    } else {
      records = records.sort((a, b) => {return b.score - a.score});
      res.json(records.slice(0, 10));
    }
  });
})

// return all of a user's friends records
/* 
{
  //userId
}
*/
app.post('/friendsRecords', (req,res) => {
  const ascending = req.body.ascending;
  const username = req.body.username;
  console.log('what is reqbody', req.body)
  db.getAllFriendsRecords(username, (records) => {
    if (ascending) {
      records = records.sort((a, b) => {return a.score - b.score});
      res.json(records.slice(0, 10));
    } else {
      records = records.sort((a, b) => {return b.score - a.score});
      res.json(records.slice(0, 10));
    }
  })
});

app.get('/friends', (req, res)=> {
  db.getAllFriends(req.query.username, (friends) => {
    res.send(friends);
  })
});

app.delete('/friends', (req,res) => {
  var username = req.query.loggedInUsername;
  var friendUsername = req.query.friendUsername
  db.deleteFriend(username, friendUsername, (results) => {
    res.send(results);
  });
})

app.post('/friends', (req,res) => {
  let username = req.body.params.loggedInUsername;
  var friendUsername = req.body.params.friendUsername;
  db.addFriend(username, friendUsername, (results) => {
    res.sendStatus(200);
  });
});





app.get('/firebaseConfig', (req, res) => {
  res.json(config.FIREBASE_CONFIG);
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Server listening on Port ${PORT}`));



