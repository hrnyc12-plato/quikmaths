import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import CreateRoom from './createRoom.jsx';
import questionGen from '../../../problemGen.js';

class RoomDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.style = {
      marginTop: '-20px',
      marginBottom: '20px'
    }

    this.state = {
      rooms: []
    }

    this.handleNewRoom = this.handleNewRoom.bind(this)
    this.deleteRoom = this.deleteRoom.bind(this)
    
    firebase.auth().signInAnonymously().catch(function(error) {
      console.error('Error signing on to firebase!', error.message);
    });
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log('User signed in', user);
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
      }
    });
  }
  
  componentDidMount () {
    let fbData = this.props.db.database().ref('/rooms')
    fbData.on('value', snapshot => {
      this.getRoomData(snapshot.val())
    })
  }
  
  getRoomData (roomData) {
    let newRooms = [];
    for (let key in roomData) {
      let room = roomData[key];
      room.dbKey = key;
      room.userCount = room.users ? Object.keys(room.users).length : 0;
      newRooms.push(room);
    }
    this.setState({
      rooms: newRooms
    })
  }

  handleNewRoom (newRoom) {
    if (_.some(this.state.rooms, ((room) => room.name === newRoom.name))) {
      window.alert('Room with that name already exists! Try again');
    } else {
      let dbConnection = this.props.db.database().ref('/rooms');
      newRoom.waiting = true;
      newRoom.gameComplete = false;
      newRoom.gameInProgress = false;
      newRoom.creator = this.props.username;
      newRoom.gameInfo = this.generateFullGame(newRoom.operator);

      dbConnection.push(newRoom);
    }
  }

  generateFullGame (problemType) {
    let fullGame = [];
    for (var i = 0; i < 10; i++) {
      let infoObject = questionGen(problemType, 3, 1);
      fullGame.push({
        questionString: `${infoObject.question[1]} ${infoObject.question[0]} ${infoObject.question[2]}`,
        answers: _.shuffle(infoObject.choices),
        correctAnswer: infoObject.correctAnswer
      })
    }
    return fullGame;
  }

  deleteRoom (roomId) {
    this.props.db.database().ref('/rooms/' + roomId).remove();
  }

  render() {
    if (this.props.selectedTab === 'roomDisplay' && this.props.toggleTab) {
      return (
        <div style={this.style}>
          <h3> Room Select </h3>
          {this.state.rooms.map((room) => {
            return (
            <div>
              <Link 
                key={room.dbKey} 
                to={{
                  pathname:"/rooms/" + room.name,
                  state: {
                    topLevelState: this.props.topLevelState,
                    roomId: room.dbKey,
                    roomType: room.operator,
                    db: this.props.db
                  }
                }}
              >
                {room.name + ': ' + room.operator + ', ' + room.userCount + ' user(s)'}
              </Link>
              {room.creator === this.props.username && <button onClick={() => this.deleteRoom(room.dbKey)}>x</button>}
            </div>
            )
          })}

          <CreateRoom addRoom={this.handleNewRoom} />
        </div>
      )
    } else {
      return null
    }
  }
}

export default RoomDisplay;