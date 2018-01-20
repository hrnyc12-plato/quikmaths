import React from 'react';
import axios from 'axios';
import Game from './components/game.jsx';
import NavTopBar from './components/navTopBar.jsx';
import NavSideBar from './components/navSideBar.jsx';
import InfoSideBar from './components/infoSideBar.jsx';
import LeaderBoard from './components/leaderBoard.jsx';
import UserInfo from './components/userInfo.jsx';
import Login from './components/login.jsx';
import SignUp from './components/signUp.jsx';
import questions from '../../problemGen.js';
import _ from 'underscore';

import Paper from 'material-ui/Paper';
import styles from '../www/jStyles.js';

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      problemType: '',
      timeElapsed: 0,
      startTime: 0,
      numberCorrect: 0,
      numberIncorrect: 0,
      questionsLeft: 0,
      inProgressBool: false,
      correctArray: [],
      incorrectArray: [],
      arrayWithResults: [],
      //state for newQuestion
      level: '1',
      questionString: [],
      answers: [],
      correctAnswer: undefined,
      // states for userinfo
      username: null,
      userId: null,
      createdAt: null,
      gamesPlayed: 0,
      totalCorrect: null,
      totalIncorrect: null,
      highScore: null,
      bestTime: null,
      profilePicture:null,
      userFriends: [],
      // states for user badges
      badges: [],
      // array of leaderboard records
      recordsList: [],
      // render login page conditionally
      isLoggedIn: false,
      loginErrorText: '', 
      signupErrorText:'',
      // render game or chooseyourpath conditionally
      choosePathMode: true,
      isSignedUp: true,
      totalUserCorrect: null,
      totalUserIncorrect: null,
      mounted: false,
      selectedLevel: ''
    }
 
    this.collapseStyle = {
      fontFamily: 'Poppins',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridColumnGap: '2.5%', 
      backgroundColor: 'white'
    }
    this.NavTopBarStyle = {
      backgroundColor: "white"
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.goToSignUp = this.goToSignUp.bind(this);
    this.goToLogin = this.goToLogin.bind(this)
    this.startNewGame = this.startNewGame.bind(this)
    this.inProgressBoolUpdate = this.inProgressBoolUpdate.bind(this)
    this.questionsLeftUpdate = this.questionsLeftUpdate.bind(this)
    this.getUserInfo = this.getUserInfo.bind(this)
    this.getUserBadges = this.getUserBadges.bind(this)
    this.getLeaderBoard = this.getLeaderBoard.bind(this)
    this.getUserFriends = this.getUserFriends.bind(this)
    this.numberCorrectUpdate = this.numberCorrectUpdate.bind(this)
    this.numberIncorrectUpdate = this.numberIncorrectUpdate.bind(this)
    this.resetCounts = this.resetCounts.bind(this)
    this.questionsLeftUpdate = this.questionsLeftUpdate.bind(this)
    this.updateProfilePicture = this.updateProfilePicture.bind(this)
    // this.inProgressBoolUpdate = this.inProgressBoolUpdate.bind(this)
    this.correctArrayUpdate = this.correctArrayUpdate.bind(this)
    this.incorrectArrayUpdate = this.incorrectArrayUpdate.bind(this)
    this.showChoosePathMode = this.showChoosePathMode.bind(this)
    // this.startNewGame = this.startNewGame.bind(this)
    this.logout = this.logout.bind(this)
    this.updateUserInfo = this.updateUserInfo.bind(this)

    this.newQuestion = this.newQuestion.bind(this);

    this.quitGame = this.quitGame.bind(this);
    this.filterLeaderboard = this.filterLeaderboard.bind(this);

    this.levelHandler = this.levelHandler.bind(this);

  }

  componentDidMount(){
    this.getIndex()
  }
  
  componentWillMount() {
    this.setupFirebase()
  }

  setupFirebase () {
    axios.get('/firebaseConfig').then((response) => {
      firebase.initializeApp(response.data);
    })
  }

  newQuestion() {
    const level = this.state.level;
    if(level === '1') {
      var infoObject = questions.questionGen(this.state.problemType, 3, 0);
      this.setState({
        questionString: `${infoObject.question[1]} ${infoObject.question[0]} ${infoObject.question[2]}`,
        answers: _.shuffle(infoObject.choices),
        correctAnswer: infoObject.correctAnswer
      })
    } 
    if(level === '2') {
      var infoObject = questions.questionGen(this.state.problemType, 5, 2);
      this.setState({
        questionString: `${infoObject.question[1]} ${infoObject.question[0]} ${infoObject.question[2]}`,
        answers: _.shuffle(infoObject.choices),
        correctAnswer: infoObject.correctAnswer
      })
    } 
    if(level === '3') {
      var infoObject = questions.questionGenLevel3();
      this.setState({
        questionString: `${infoObject.question}`,
        answers: _.shuffle(infoObject.choices),
        correctAnswer: infoObject.correctAnswer
      })
    }   
  }

  filterLeaderboard (operator) {
    this.setState({problemType: operator},() => {
      this.getLeaderBoard(this.state.problemType);
    });
  }

  
  getLeaderBoard(operator = '') {
    axios.post('/allRecords', {
        operator: operator,
        ascending: false
    })
    .then((response)=> {
      this.setState({
        recordsList: response.data
      })
    })
    .catch((error)=> {
      console.log(error);
    });
  }



  getIndex() {
    axios.get('/git')
         .then((result) => {
           if (result.data !== false) {
            this.setState({
              isLoggedIn: true, 
              username: result.data.user,
              mounted: true
            }, () => {
              this.getUserInfo(result.data.user);
            })
           } else {
            this.setState({
              mounted: true
            })
           }
         })
  }

  startTimer() {
    setTimeout(() => {
      if (this.state.inProgressBool) {
        this.setState({
          timeElapsed: Date.now() - this.state.startTime
        })
        this.startTimer()
      }
    }, 1)
  }

  inProgressBoolUpdate() {
    // use to start and stop games
    this.setState({
      inProgressBool: !this.state.inProgressBool,
    }, () => {
      if (this.state.inProgressBool) {
        this.startTimer()
      } else {
        this.setState({
          timeElapsed: 0,
          level: '1'
        })
      }
    })
  }

  quitGame() {
    this.setState({
      questionsLeft: 0,
      problemType: '+',
      choosePathMode: true,
      timeElapsed: 0,
      startTime: 0,
      questionString: [],
      answers: [],
      correctAnswer: undefined,
      numberCorrect: 0,
      numberIncorrect: 0,
      questionsLeft: 0,
      inProgressBool: false,
      correctArray: [],
      incorrectArray: [],
      arrayWithResults: []
    });
  }

  numberCorrectUpdate() {
    this.setState({
      numberCorrect: this.state.numberCorrect + 1
    })
  }

  numberIncorrectUpdate() {
    this.setState({
      numberIncorrect: this.state.numberIncorrect + 1
    })
  }

  resetCounts() {
    this.setState({
      numberIncorrect: 0,
      numberCorrect: 0,
      correctArray: [],
      incorrectArray: [],
      arrayWithResults: []
    })
  }

  questionsLeftUpdate(cb) {
    this.setState({
      questionsLeft: this.state.questionsLeft - 1
    }, ()=> {
      // run callback (i.e. save data) after question count updated
      cb(this.state.questionsLeft)
    })
  }

  setNumberOfQuestions(numQuestions = 10) {
    // numQuestions can be passed in from navsidebar or defaults to 10
    this.setState({
      questionLeft: numQuestions
    })
  }

  correctArrayUpdate(question) {
    this.state.correctArray.push(question);
    this.state.arrayWithResults.push({question: question, correct:true});
  }

  incorrectArrayUpdate(question) {
    this.state.incorrectArray.push(question);
    this.state.arrayWithResults.push({question: question, correct:false});
  }

  showChoosePathMode() {
    this.setState({
      choosePathMode: true
    })
  }

  levelHandler(level, levelName) {
    this.setState({level: level, selectedLevel: levelName}, () => console.log('level selected is: ', this.state.level, this.state.levelName));
  }

  startNewGame(operator) {
    this.setState({
      questionsLeft: 10, 
      problemType: operator,
      choosePathMode: false,
      arrayWithResults: [],
      startTime: Date.now()
    }, () => {
      this.newQuestion();
      this.resetCounts();
      this.inProgressBoolUpdate();
    })
  }

  getUserInfo(user = this.state.username) {
    axios.post('/user', {
      username: user
    })
    .then((response)=> {
      console.log('what is the data when calling get User info', response);
      this.setState({
        userId: response.data[0].id,
        username: response.data[0].username,
        createdAt: response.data[0].createdAt,
        gamesPlayed: response.data[0].gamesPlayed,
        totalCorrect: response.data[0].totalCorrect,
        totalIncorrect: response.data[0].totalIncorrect,
        highScore: response.data[0].highScore,
        bestTime: response.data[0].bestTime,
        profilePicture: response.data[0].profilePicture
      }, ()=> {
        this.getUserFriends(this.state.username);
        this.getUserBadges();
      })
    })
    .catch((error)=> {
      console.log(error);
    });
  }
  
  getUserFriends(username) {
    axios.get('/friends', {
      params: {
        username: username
      }
    }).then((response) => {
      console.log('response from get userFriends on client', response);
      this.setState({userFriends:response.data})
    })
  }


  updateProfilePicture(url) {
    this.setState({profilePicture: url});
  // this is going to get the badges associated with a username
    // then set the state with the array of badges that comes back for the user;
  }

  getUserBadges() {
    console.log('what is userId', this.state.userId)
    console.log('the state before getting user badges', this.state)
    axios.post('/user/badges', {
      userId: this.state.userId,
    }).then(results => {
      console.log('server resonded with', results);
      let badges = results.data.map(badge => badge.name)
      this.setState({badges}, () => {
        console.log('state after getting user badges', this.state);
      }) 
    }).catch(error => console.log('error in getting user badges', error))
  };

  updateUserInfo(object) {
    this.setState({
      highScore: object.data.highScore,
      bestTime: object.data.bestTime,
      totalUserIncorrect: object.data.totalIncorrect,
      totalUserCorrect: object.data.totalCorrect,
      gamesPlayed: object.data.gamesPlayed,
      profilePicture:  object.data.profilePicture
    });
  }

  handleSignUp(obj){
    axios.post('/signup', obj)
      .then((result) => {
        if(result.data === false) {
          this.setState({signupErrorText: 'Username already exists'})
        } else {
          this.setState({"isLoggedIn" : true, 
          "username" : result.data.username}) 
        }
      })
  } 

  handleLogin(obj) {
    axios.post('/login', obj)
      .then((result) => {
        if (result.data[0] === false) {
          this.setState({loginErrorText:result.data[1]});
        } else {
          this.setState({"isSignedUp": true, 
          "isLoggedIn": true, 
          "username": result.data.username,
          "profilePicture": result.data.profilePicture
            }, () => {
            this.getUserInfo()
          })
        }
      })
  }

  goToSignUp(){
    this.setState({
      isSignedUp : false,
      signupErrorText:'',
      loginErrorText: ''
    })
  }

  goToLogin(){
    this.setState({
      isSignedUp : true,
      signupErrorText:'',
      loginErrorText: ''
    })
  }

  logout(){
    axios.get('/logout')
      .then(() => {
      this.setState({
        problemType: '+',
        timeElapsed: 0,
        startTime: 0,
        numberCorrect: 0,
        numberIncorrect: 0,
        questionsLeft: 0,
        inProgressBool: false,
        correctArray: [],
        incorrectArray: [],
        arrayWithResults: [],
        //state for newQuestion
        questionString: [],
        answers: [],
        correctAnswer: undefined,
        // states for userinfo
        username: null,
        userId: null,
        createdAt: null,
        gamesPlayed: null,
        totalCorrect: null,
        totalIncorrect: null,
        highScore: null,
        bestTime: null,
        profilePicture:null,
        // array of leaderboard records
        recordsList: [],
        // render login page conditionally
        isLoggedIn: false,
        loginErrorText: '',
        // render game or chooseyourpath conditionally
        choosePathMode: true,
        isSignedUp: true,
        totalUserCorrect: null,
        totalUserIncorrect: null,
        mounted: false,
        levelName: ''
      }, () => {
        this.getIndex()
      })
      })
  }


  render() {
    if (this.state.mounted) {

    if (this.state.isLoggedIn === false && this.state.isSignedUp === true) {
      return (
        <Login handleLogin={this.handleLogin} goToSignUp={this.goToSignUp} loginErrorText={this.state.loginErrorText}/>
      )
    } else if (this.state.isLoggedIn === false && this.state.isSignedUp === false) {
      return (
        <SignUp handleSignUp={this.handleSignUp} goToLogin={this.goToLogin} signupErrorText={this.state.signupErrorText}/>
      )
    } else {
       return (
          <div>
            <Paper style={styles.paperStyle} zDepth={2}>
            <NavTopBar
              defaultTab={'singleplayer'}
              topLevelState={this.state}
              db={firebase}
              getUserInfo={this.getUserInfo}
              badges={this.state.badges}
              getUserBadges={this.getUserBadges}
              getLeaderBoard={this.getLeaderBoard}
              getUserFriends={this.getUserFriends}
              username={this.state.username}
              userFriends={this.state.userFriends}
              createdAt={this.state.createdAt}
              gamesPlayed={this.state.gamesPlayed}
              totalCorrect={this.state.totalCorrect}
              totalIncorrect={this.state.totalIncorrect}
              highScore={this.state.highScore}
              bestTime={this.state.bestTime}
              recordsList={this.state.recordsList}
              totalUserCorrect={this.state.totalUserCorrect}
              totalUserIncorrect={this.state.totalUserIncorrect}
              logout={this.logout}
              style={this.navTopBarStyle}
              profilePicture={this.state.profilePicture}
              filterLeaderboard={this.filterLeaderboard}
              updateProfilePicture={this.updateProfilePicture}
              inProgressBool = {this.state.inProgressBool}
              levelHandler={this.levelHandler}
              startNewGame= {this.startNewGame}
              inProgressBoolUpdate = {this.inProgressBoolUpdate}
              questionsLeftUpdate = {this.questionsLeftUpdate}
              choosePathMode = {this.state.choosePathMode}
              selectedLevel ={this.state.selectedLevel}
            />
            <Game
              style={this.GameStyle}
              quitGame={this.quitGame}
              problemType = {this.state.problemType}
              timeElapsed = {this.state.timeElapsed}
              numberCorrect = {this.state.numberCorrect}
              numberIncorrect = {this.state.numberIncorrect}
              questionsLeft = {this.state.questionsLeft}
              inProgressBool = {this.state.inProgressBool}
              correctArray = {this.state.correctArray}
              incorrectArray = {this.state.incorrectArray}
              arrayWithResults = {this.state.arrayWithResults}
              userId = {this.state.userId}
              username = {this.state.username}
              getUserInfo={this.getUserInfo}
              getUserBadges={this.getUserBadges}
              numberCorrectUpdate = {this.numberCorrectUpdate}
              numberIncorrectUpdate = {this.numberIncorrectUpdate}
              resetCounts = {this.resetCounts}
              questionsLeftUpdate = {this.questionsLeftUpdate}
              inProgressBoolUpdate = {this.inProgressBoolUpdate}
              correctArrayUpdate = {this.correctArrayUpdate}
              incorrectArrayUpdate = {this.incorrectArrayUpdate}
              choosePathMode = {this.state.choosePathMode}
              showChoosePathMode = {this.showChoosePathMode}
              startNewGame= {this.startNewGame}
              updateUserInfo = {this.updateUserInfo}
              newQuestion = {this.newQuestion}
              questionString = {this.state.questionString}
              answers = {this.state.answers}
              correctAnswer = {this.state.correctAnswer}
            />
            </Paper>
          </div>
       )
    }
  } else {
    return (<span></span>)
  }
}
}

export default Main;
