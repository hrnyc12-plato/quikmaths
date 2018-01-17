import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import CreateRoom from './createRoom.jsx';

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
      dbConnection.push(newRoom);
    }
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
                {room.name + ': ' + room.operator}
              </Link>
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