import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import _ from 'underscore';
import CreateRoom from './createRoom.jsx';
import generator from '../../../problemGen.js';
import styles from '../../www/jStyles.js';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';


class RoomDisplay extends React.Component {
  constructor(props) {
    super(props)
    this.style = {
      marginTop: '10px',
      marginBottom: '20px',
      marginLeft: '150px'
    }

    this.state = {
      rooms: []
    }

    this.rowStyle = {
      borderBottom: 'none'
    }
    this.tableStyle = {
      borderCollapse: 'collapse',
      marginTop: '20px',
      marginBottom: '20px',
      width: '100%',
      borderBottom: 'none'
    }

    this.deleteCell = {
      textAlign: 'left',
      backgroundColor: 'white',
      float: 'left',
      border: 'none'
    }

    this.handleNewRoom = this.handleNewRoom.bind(this)
    this.deleteRoom = this.deleteRoom.bind(this)
    
    firebase.auth().signInAnonymously().catch(function(error) {
      console.error('Error signing on to firebase!', error.message);
    });
    
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log('User signed in', user);
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
      if (newRoom.difficulty === 3) newRoom.operator = 'All';
      newRoom.waiting = true;
      newRoom.gameComplete = false;
      newRoom.gameInProgress = false;
      newRoom.creator = this.props.username;
      newRoom.gameInfo = this.generateFullGame(newRoom.operator, newRoom.difficulty);

      dbConnection.push(newRoom);
    }
  }

  generateFullGame (problemType, difficulty) {
    let fullGame = [];
    
    switch(difficulty) {
      case 1:
        for (var i = 0; i < 10; i++) {
          let infoObject = generator.questionGen(problemType, 3, 1);
          fullGame.push({
            questionString: `${infoObject.question[1]} ${infoObject.question[0]} ${infoObject.question[2]}`,
            answers: _.shuffle(infoObject.choices),
            correctAnswer: infoObject.correctAnswer
          })
        }
      break;
      case 2:
      for (var i = 0; i < 10; i++) {
        let infoObject = generator.questionGen(problemType, 5, 2);
        fullGame.push({
          questionString: `${infoObject.question[1]} ${infoObject.question[0]} ${infoObject.question[2]}`,
          answers: _.shuffle(infoObject.choices),
          correctAnswer: infoObject.correctAnswer
        })
      }
      break;
      case 3:
      for (var i = 0; i < 10; i++) {
        let infoObject = generator.questionGenLevel3();
        fullGame.push({
          questionString: `${infoObject.question}`,
          answers: _.shuffle(infoObject.choices),
          correctAnswer: infoObject.correctAnswer
        })
      }
      break;
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
          {this.state.rooms.length ? 
          <Table
            fixedHeader={true}
            fixedFooter={true}
            selectable={false}
            multiSelectable={false}
            style={{width: '600px', margin: 'auto', backgroundColor: 'white', border: 'none'}}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
              style={this.rowStyle}
            >
              <TableRow style={this.rowStyle}>
                <TableHeaderColumn style={styles.tableCell}>Name</TableHeaderColumn>
                <TableHeaderColumn style={styles.tableCell}>Operator</TableHeaderColumn>
                <TableHeaderColumn style={styles.tableCell}>Difficulty</TableHeaderColumn>
                <TableHeaderColumn style={styles.tableCell}>Current Users</TableHeaderColumn>
                <TableHeaderColumn style={this.deleteCell}></TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway={true}
              showRowHover={true}
              stripedRows={true}
            >
          {this.state.rooms.map((room) => {
            return (
              <TableRow key={room.dbKey} style={this.rowStyle}>
              <TableRowColumn style={styles.tableCell}>
                  <Link 
                    to={{
                      pathname:"/rooms/" + room.name,
                    state: {
                      topLevelState: this.props.topLevelState,
                      roomId: room.dbKey,
                      roomType: room.operator,
                      db: this.props.db
                    }
                }}
                >{room.name}</Link>
              </TableRowColumn>
              <TableRowColumn style={styles.tableCell}>
                {room.operator}
              </TableRowColumn>
              <TableRowColumn style={styles.tableCell}>
                {room.difficulty}
              </TableRowColumn>
              <TableRowColumn style={styles.tableCell}>
                {room.userCount}
              </TableRowColumn>
            <TableRowColumn style={this.deleteCell}>
            {room.creator === this.props.username &&
              <IconButton onClick={() => this.deleteRoom(room.dbKey)} mini={'true'} style={{float: 'left'}}>
                <DeleteIcon />
              </IconButton>}
            </TableRowColumn>
            </TableRow>
            )
          })}
          </TableBody>
          </Table> : ''}
          <CreateRoom addRoom={this.handleNewRoom} />
        </div>
      )
    } else {
      return null
    }
  }
}

export default RoomDisplay;