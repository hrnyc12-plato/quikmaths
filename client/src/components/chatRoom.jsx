import React from 'react';
import Paper from 'material-ui/Paper';
import TextField from 'material-ui/TextField';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import Avatar from 'material-ui/Avatar';

class ChatRoom extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      message: '',
      messages: []
    }

    this.handleMessageChange = this.handleMessageChange.bind(this);
    this.handleNewMessage = this.handleNewMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount () {
    this.props.db.ref('/rooms/' + this.props.roomId + '/messages')
      .on('child_added', snapshot => this.handleNewMessage(snapshot.val()));
  }

  componentDidUpdate () {
    this.el.scrollIntoView({ behaviour: 'smooth'})
  }

  handleNewMessage (message) {
    this.setState({messages: [...this.state.messages, message]})
  }

  sendMessage () {
    this.props.db.ref('/rooms/' + this.props.roomId + '/messages')
    .push({
      username: this.props.username,
      profilePictureUrl: this.props.profilePicture,
      message: this.state.message
    });
  }

  handleMessageChange (e, message) {
    this.setState({message})
  }

  handleKeyPress(e) {
    if (e.key === 'Enter' && this.state.message.length) {
      this.sendMessage();
      this.setState({
        message: ''
      })
    }
  }

  render () {
    return (
      <div style={{height: '500px'}}>
      <Paper style={{height: '450px', overflowY: 'scroll'}} zDepth={1}>
        <List style={{textAlign: 'left'}}>
          {this.state.messages.map((message) => {
            return (
              <ListItem style={{textAlign: 'left'}}
                primaryText={message.username + ': ' + message.message}
                leftAvatar={<Avatar src={message.profilePictureUrl}/>}
              />
            );
          })}
        </List>
        <div ref={el => { this.el = el; }} />
      </Paper>
        <TextField 
          style={{width: '500px'}}
          type="text"
          value={this.state.message} 
          onChange={this.handleMessageChange}
          onKeyPress={this.handleKeyPress}
          hintText="Say something"
        />
      </div>
    );
  }
}

export default ChatRoom