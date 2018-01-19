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
        }).then((results)=>{
            console.log('results from handle delete ', results);
            console.log('this.props.username', this.props.username);
            this.props.getUserFriends(this.props.username);
        })
    })
  }

  render() {
    return (<div>
      <h1>FRIENDS</h1>
        <List style={{width:'300px' ,margin:'auto'}}>
          {this.props.userFriends.map((friend, i)=> (
            <ListItem
                key={i}
                value={friend.username}
                primaryText={friend.username}
                leftAvatar={<Avatar src={friend.profilePicture}/>}
                rightIcon={
                    <div>
                      <IconButton style={{margin: '1px 20px 0px 0px'}} value={friend.username} onClick={this.handleDeleteClick.bind(this, friend.username)}>
                      <ActionDeleteForever/>
                    </IconButton>
                    </div>}
            />
          ))}
        </List>
    </div>)
  }

}

export default FriendList;