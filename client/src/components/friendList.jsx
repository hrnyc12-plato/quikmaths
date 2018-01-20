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
import TextField from 'material-ui/TextField';
import GroupAdd from 'material-ui/svg-icons/social/group-add';
import RemoveCircle from 'material-ui/svg-icons/content/remove-circle';
import {red500, green400} from 'material-ui/styles/colors';


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
        this.props.getUserFriends(this.props.username);
      }).catch((err) => {
        console.log('error on handle Add Click',err);
      })
  }

  handleFriendSearchChange(e) {
    this.setState({friendUsername:e.target.value});
  }

  render() {
    if (this.props.selectedTab === 'friends' && this.props.toggleTab) {
      return (<div>
        <h1>FRIENDS</h1>
        <div>
          {/* <input onChange={this.handleFriendSearchChange.bind(this)}></input> */}
          <TextField
            type="text"
            value={this.state.value}
            floatingLabelText="Search and add a Friend"
            onChange={this.handleFriendSearchChange.bind(this)}
          />
          <IconButton onClick={this.handleAddClick.bind(this)}>
            <GroupAdd />
          </IconButton>
        </div>
          <List style={{width:'400px' ,margin:'auto'}}>
            {this.props.userFriends.map((friend, i)=> (
              <ListItem
                  key={i}
                  style={{height:'70px', fontSize:'20px', weight:'900', padding:'5px'}}
                  value={friend.username}
                  primaryText={friend.username}
                  leftAvatar={<Avatar src={friend.profilePicture}/>}
                  rightIcon={
                    <IconButton value={friend.username} style={{padding:'4  px', height:'20px', width:'auto'}} onClick={this.handleDeleteClick.bind(this, friend.username)}>
                      <RemoveCircle style={{margin: '0px 20px 20px 0px'}} color={red500}/>
                    </IconButton>}
              >
              </ListItem>
            ))}
          </List>
      </div>)
      } else {
        return null;
      }
  }

}

export default FriendList;