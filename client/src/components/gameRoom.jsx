import React from 'react';
import _ from 'underscore';
import NavTopBar from '../components/navTopBar.jsx';
import GameView from '../components/gameView.jsx';
import axios from 'axios';
import Paper from 'material-ui/Paper';
import styles from '../../www/jStyles.js';
import RaisedButton from 'material-ui/RaisedButton';

class GameRoom extends React.Component {
  constructor (props) {
    super(props)
    
    if (this.props.location.state) {
      this.state = this.props.location.state.topLevelState;
      this.state.roomId = this.props.location.state.roomId;
      this.state.problemType = this.props.location.state.roomType;
      this.state.users = [];
      this.state.db = this.props.location.state.db.database();
      this.state.userReady = false;
      this.state.roomName = this.props.match.params.name;
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
    } else {
      this.props.history.push('/')
      return;
    }

    this.setUserId = this.setUserId.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this)
    this.getLeaderBoard = this.getLeaderBoard.bind(this)
    this.numberCorrectUpdate = this.numberCorrectUpdate.bind(this)
    this.numberIncorrectUpdate = this.numberIncorrectUpdate.bind(this)
    this.resetCounts = this.resetCounts.bind(this)
    this.questionsLeftUpdate = this.questionsLeftUpdate.bind(this)
    this.inProgressBoolUpdate = this.inProgressBoolUpdate.bind(this)
    this.correctArrayUpdate = this.correctArrayUpdate.bind(this)
    this.incorrectArrayUpdate = this.incorrectArrayUpdate.bind(this)
    this.showChoosePathMode = this.showChoosePathMode.bind(this)
    this.logout = this.logout.bind(this)
    this.updateUserInfo = this.updateUserInfo.bind(this)
    this.quitGame = this.quitGame.bind(this);
    this.filterLeaderboard = this.filterLeaderboard.bind(this);
    this.leaveRoom = this.leaveRoom.bind(this);
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
           console.log('result from get index', result);
           if (result.data !== false){
            this.setState({
              isLoggedIn: true, 
              username: result.data.user,
              mounted: true
            }, () => {
              this.getUserInfo();
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
          timeElapsed: 0
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
      incorrectArray: []
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
      incorrectArray: []
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
  }

  incorrectArrayUpdate(question) {
    this.state.incorrectArray.push(question);
  }

  showChoosePathMode() {
    this.setState({
      choosePathMode: true
    })
  }

  startNewGame(operator) {
    this.setState({
      questionsLeft: 10, 
      problemType: operator,
      choosePathMode: false,
      startTime: Date.now()
    }, () => {
      this.newQuestion(operator);
      this.resetCounts()
      this.inProgressBoolUpdate()
    })
  }

  getUserInfo() {
    axios.post('/user', {
      username: this.state.username
    })
    .then((response)=> {
      console.log('response from post request', response);
      this.setState({
        username: response.data[0].username,
        createdAt: response.data[0].createdAt,
        gamesPlayed: response.data[0].gamesPlayed,
        totalCorrect: response.data[0].totalCorrect,
        totalIncorrect: response.data[0].totalIncorrect,
        highScore: response.data[0].highScore,
        bestTime: response.data[0].bestTime,
        profilePicture: response.data[0].profilePicture
      })
    })
    .catch((error)=> {
      console.log(error);
    });
  }

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
          alert('username already exists');
        } else {
          this.setState({"isLoggedIn" : true, 
          "username" : result.data.username}) 
        }
      })
  }

  handleLogin(obj) {
    axios.post('/login', obj)
      .then((result) => {
        if (result.data === false) {
          alert('Please try again or Create New Account');
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
      isSignedUp : false
    })
  }

  goToLogin(){
    this.setState({
      isSignedUp : true
    })
  }

  logout(){
    console.log('loggin out')
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
        // render game or chooseyourpath conditionally
        choosePathMode: true,
        isSignedUp: true,
        totalUserCorrect: null,
        totalUserIncorrect: null,
        mounted: false
      }, () => {
        this.getIndex()
      })
      })
  }

  leaveRoom () {
    firebase.database().ref('/rooms/' + this.state.roomId + '/users/' + this.state.userId).remove();
    this.props.history.push('/')
  }

  setUserId (userId) {
    this.setState({userId});
  }

  render () {
    return (
      <Paper style={styles.multiPaperStyle} zDepth={2}>
        <NavTopBar 
          topLevelState={this.state}
          db={firebase}
          getUserInfo={this.getUserInfo}
          getLeaderBoard={this.getLeaderBoard}
          username={this.state.username}
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
        />
        <div style={{marginTop: '5px', marginBottom: '5px'}}>
        <RaisedButton style={{float: 'left', marginLeft: '225px'}} label="Leave Room" onClick={this.leaveRoom}/>
        <GameView
          state={this.state}
          quitGame={this.quitGame}
          updateUserInfo = {this.updateUserInfo}
          newQuestion = {this.newQuestion}
          questionString = {this.state.questionString}
          answers = {this.state.answers}
          correctAnswer = {this.state.correctAnswer}
          getUserInfo={this.getUserInfo}
          problemType={this.state.problemType}
          setUserId={this.setUserId}
        />
        </div>
      </Paper>
    )
  }
}

export default GameRoom;