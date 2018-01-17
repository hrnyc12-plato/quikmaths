import React from 'react';
import _ from 'underscore';
import MultiplayerGame from '../components/multiplayerGame.jsx';

class GameRoom extends React.Component {
  constructor (props) {
    super(props)
    
    if (this.props.location.state) {
      this.state = this.props.location.state.topLevelState;
      this.state.roomId = this.props.location.state.roomId;
      this.state.problemType = this.props.location.state.roomType;
      this.state.users = [];
      this.state.db = this.props.location.state.db.database()
      this.state.userReady = false;
    } else {
      this.props.history.push('/')
    }

    this.handleReadyClick = this.handleReadyClick.bind(this);
    this.beginGame = this.beginGame.bind(this);
  }

  componentWillMount () {
    var connection = this.state.db.ref('/rooms/' + this.state.roomId)
    connection.on('value', (snapshot => {
      this.updateRoomInfo(snapshot.val())
    })) 
  }

  checkAllReady () {
    if ( _.filter(this.state.users, (user) => user.ready).length === this.state.users.length) {
      var roomWaiting = this.state.db.ref('/rooms/' + this.state.roomId + '/waiting');
      roomWaiting.set(false);
    }
  }

  updateRoomInfo(roomInfo) {
    let gameComplete = roomInfo.complete;

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
    })
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
          Welcome to {this.props.match.params.name}<br/>
          Users: {_.pluck(this.state.users, 'name').join(', ')}<br/>
          Ready users: {_.filter(this.state.users, (user) => user.ready).length}<br/>
          {!this.state.userReady && this.state.users.length > 1 && 
            <div>Click the button to begin the game!<br/>
              <button onClick={this.handleReadyClick}> Ready </button>
            </div>}
          {this.state.users.length === 1 && <div> Waiting for more players </div>}
        </div>
      ) : (<div>Loading</div>)
    } else if (!this.state.waiting && !this.state.gameInProgress) {
      setTimeout(this.beginGame, 5000)
      return (<div>All users are ready! Game will begin in 5 seconds...</div>)
    } else if (this.state.gameInProgress) {
      return (<div> The game has begun! </div>);
    }

  }
}

export default GameRoom;