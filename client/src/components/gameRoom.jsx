import React from 'react';
import _ from 'underscore';

class GameRoom extends React.Component {
  constructor (props) {
    super(props)
    
    if (this.props.location.state) {
      this.state = this.props.location.state.topLevelState;
      this.state.roomId = this.props.location.state.roomId;
      this.state.problemType = this.props.location.state.roomType;
      this.state.users = [];
      this.state.db = this.props.location.state.db.database()
    } else {
      this.props.history.push('/')
    }

  }

  componentWillMount () {
    var connection = this.state.db.ref('/rooms/' + this.state.roomId)
    connection.on('value', (snapshot => {
      this.updateRoomInfo(snapshot.val())
    })) 
  }

  checkAllReady () {
    if (_.filter(_.pluck(this.state.users, 'ready'), true).length === this.state.users.length) {
      var roomWaiting = this.state.db.ref('/rooms/' + this.state.roomId + '/waiting');
      roomWaiting.set(false);
    }
  }

  updateRoomInfo(roomInfo) {
    let gameComplete = roomInfo.complete;
    let waiting = roomInfo.waiting;
    let users = [];
    for (let userKey in roomInfo.users) { 
      let user = roomInfo.users[userKey];
      user.id = userKey;
      users.push(user);
    }
    
    this.setState({gameComplete, waiting, users}, () => {
      if (!(_.pluck(this.state.users, 'name').includes(this.state.username))) {
        // add current user to game
        let userDb = this.state.db.ref('/rooms/' + this.state.roomId + '/users')
        let user = {
          name: this.state.username
        }
        userDb.push(user);
      }

      if (this.state.waiting) {
        this.checkAllReady();
      }
    })
  }

  render () {
    if (this.state.waiting) {
      return this.state.users.length ? (
        <div>
          This will be a game room!{'\n'}
          Room name is: {this.props.match.params.name}{'\n'}
          Room key is : {this.state.roomId}{'\n'}
          Number of users: {this.state.users.length}{'\n'}
          Users: {_.pluck(this.state.users, 'name').join(', ')}
        </div>
      ) : (<div>Loading</div>)
    }

  }
}

export default GameRoom;