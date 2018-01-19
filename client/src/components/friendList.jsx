import React from 'react';
import UserInfo from './userInfo.jsx';
import LeaderBoard from './leaderBoard.jsx';
import InfoSideBar from './infoSideBar.jsx';
import RoomDisplay from './roomDisplay.jsx';
import NavSideBar from './navSideBar.jsx';
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import IconButton from 'material-ui/IconButton';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import NoteAdd from 'material-ui/svg-icons/action/note-add';
import axios from 'axios';


class FriendList extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        friendUsername : ''
    }
  }

  handleDeleteClick(event) {
    let friendUserName = event;
    this.setState({friendUsername: friendUserName}, () => {
    axios.delete('/friends', { 
        params: {
            loggedInUsername: this.props.username,
            friendUsername: this.state.friendUsername
        }
        }).then((results) => {
          console.log('results from handle delete ',results);
            this.props.getUserFriends(this.props.username);
        })
    })
  }

  handleAddClick() {
      axios.post('/friends', { 
        params: {
          loggedInUsername: this.props.username,
          friendUsername: this.state.friendUsername
        }
      }).then((results) => {
        console.log('YYYYY');
        console.log('results from handle add ', results);
        this.props.getUserFriends(this.props.username);
      }).catch((err) => {
        console.log('ERRORYYYYY',err);
      })
  }

  handleFriendSearchChange(e) {
    this.setState({friendUsername:e.target.value});
  }

  render() {
    return (<div>
      <h1>FRIENDS</h1>
      <div>
        <span>Search for a Friend: </span>
        <input onChange={this.handleFriendSearchChange.bind(this)}></input>
        <IconButton onClick={this.handleAddClick.bind(this)}>
          <NoteAdd/>
        </IconButton>
      </div>
        <List style={{width:'300px' ,margin:'auto'}}>
          {this.props.userFriends.map((friend, i)=> (
            <ListItem
                key={i}
                value={friend.username}
                primaryText={friend.username}
                leftAvatar={<Avatar src={friend.profilePicture}/>}
            >
                <div>
                  <IconButton value={friend.username} onClick={this.handleDeleteClick.bind(this, friend.username)}>
                    <ActionDeleteForever/>
                  </IconButton>
                </div>
            </ListItem>
          ))}
        </List>
    </div>)
  }

}

export default FriendList;