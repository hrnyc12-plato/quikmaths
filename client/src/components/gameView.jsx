import React from 'react';
import _ from 'underscore';
import MultiplayerGame from '../components/multiplayerGame.jsx';
import MultiplayerResults from '../components/multiplayerResults.jsx';

class GameView extends React.Component {
  constructor (props) {
    super(props)    
    this.state = this.props.state; 

    this.handleReadyClick = this.handleReadyClick.bind(this);
    this.beginGame = this.beginGame.bind(this);
    this.handleFinishedUser = this.handleFinishedUser.bind(this);
  }

  componentWillMount () {
    var connection = this.state.db.ref('/rooms/' + this.state.roomId)
    connection.on('value', (snapshot => {
      this.updateRoomInfo(snapshot.val())
    })) 
  }

  handleFinishedUser (score, accuracy, time) {
    console.log('FINISHED RESULTS', score, accuracy, time);
    let userResultsDb = this.state.db.ref('/rooms/' + this.state.roomId + '/users/' + this.state.userId + '/results');
    userResultsDb.set({score, accuracy, time});
    let userDb = this.state.db.ref('/rooms/' + this.state.roomId + '/users/' + this.state.userId + '/finished');
    userDb.set(true);
    this.setState({userDone: true});
  }

  checkAllReady () {
    if ( _.filter(this.state.users, (user) => user.ready).length === this.state.users.length) {
      var roomWaiting = this.state.db.ref('/rooms/' + this.state.roomId + '/waiting');
      roomWaiting.set(false);
    }
  }

  updateRoomInfo(roomInfo) {
    let gameComplete = roomInfo.gameComplete;

    if (this.state.gameInProgress !== roomInfo.gameInProgress) {
      this.setState({gameInProgress: roomInfo.gameInProgress});
    }

    let waiting = roomInfo.waiting;

    if (!this.state.gameInfo) {
      console.log('RAW GAME INFO', roomInfo.gameInfo)
      let rawGameInfo = roomInfo.gameInfo;
      let parsedGameInfo = [];

      for (let rawQuestionKey in rawGameInfo) {
        let rawQuestion = rawGameInfo[rawQuestionKey];
        let parsedQuestion = {};
        parsedQuestion.correctAnswer = rawQuestion.correctAnswer;
        parsedQuestion.questionString = rawQuestion.questionString;
        parsedQuestion.answers = [];
        for (let answerKey in rawQuestion.answers) {
          parsedQuestion.answers.push(rawQuestion.answers[answerKey]);
        }
        parsedGameInfo.push(parsedQuestion);
      }

      this.setState({
        gameInfo: parsedGameInfo
      }, () => console.log("PARSED GAME INFO", this.state.gameInfo))
    }

    let users = [];
    var userId = null;
    for (let userKey in roomInfo.users) { 
      let user = roomInfo.users[userKey];
      if (user.name === this.state.username) {
        userId = userKey;
        this.props.setUserId(userKey)
      }
      user.id = userKey;
      users.push(user);
    }
    
    this.setState({gameComplete, waiting, users, userId}, () => {
      if (!(_.pluck(this.state.users, 'name').includes(this.state.username))) {
        // add current user to game
        let userDb = this.state.db.ref('/rooms/' + this.state.roomId + '/users');
        let user = {
          name: this.state.username,
          ready: false,
          finished: false
        }
        userDb.push(user);
      }

      if (this.state.waiting && this.state.users.length > 1) {
        this.checkAllReady();
      }

      if (this.state.gameInProgress) {
        this.checkAllCompleted();
      }
    })
  }

  checkAllCompleted () {
    if ( _.filter(this.state.users, (user) => user.finished).length === this.state.users.length) {
      var roomCompleted = this.state.db.ref('/rooms/' + this.state.roomId + '/gameComplete');
      roomCompleted.set(true);
    }
  }

  handleReadyClick () {
    let userDb = this.state.db.ref('/rooms/' + this.state.roomId + '/users/' + this.state.userId + '/ready');
    userDb.set(true);
    this.setState({userReady: true});
  }

  beginGame () {
    let roomDb = this.state.db.ref('/rooms/' + this.state.roomId + '/gameInProgress');
    roomDb.set(true);
  }

  render () {
    if (this.state.waiting) {
      return this.state.users.length ? (
        <div>
          <h3>Welcome to {this.state.roomName}</h3>
          Users: {_.pluck(this.state.users, 'name').join(', ')}<br/>
          Ready users: {_.filter(this.state.users, (user) => user.ready).length}<br/>
          {!this.state.userReady && this.state.users.length > 1 && 
            <div>Click the button to begin the game!<br/>
              <button onClick={this.handleReadyClick}> Ready </button>
            </div>}
          {this.state.users.length === 1 && <div> Waiting for more players to join! </div>}
        </div>
      ) : (<div>Loading</div>)
    } else if (!this.state.waiting && !this.state.gameInProgress) {
      setTimeout(this.beginGame, 5000)
      return (<div>
        <h3>All users are ready! Game will begin in 5 seconds...</h3>
        </div>)
    } else if (!this.state.userDone && this.state.gameInProgress) {
      return (
        <div>
          <MultiplayerGame
            username={this.state.username}
            gamesPlayed={this.state.gamesPlayed}
            gameInfo={this.state.gameInfo}
            sendResults={this.handleFinishedUser}
            quitGame={this.props.quitGame}
            updateUserInfo = {this.props.updateUserInfo}
            getUserInfo={this.props.getUserInfo}
            problemType={this.props.problemType}
          />
        </div>
      );
    } else if (this.state.userDone && !this.state.gameComplete) {
      return (<div> 
        <h3>Great job! Results will be displayed when all players have finished.</h3>
        </div>)
    } else if (this.state.gameComplete) {
      return (
        <div>
          <MultiplayerResults
            users={this.state.users}
          />
        </div>
      )
    }

  }
}

export default GameView;