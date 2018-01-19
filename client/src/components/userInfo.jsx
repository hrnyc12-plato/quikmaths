import React from 'react'
import axios from 'axios';
import Dropzone from 'react-dropzone'
import request from 'superagent';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../www/jStyles.js';
import FriendList from './friendList.jsx';

const CLOUDINARY_UPLOAD_PRESET = 'dwpjl6zz';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dvurqudmp/upload';


class UserInfo extends React.Component {
  constructor(props) {
    super(props);
    this.columnStyle = {
      paddingLeft: '20px'
    }
    this.tableStyle = {
      borderCollapse: 'collapse',
      marginTop: '-20px',
      marginBottom: '20px',
      width: '100%',
      padding: '20px'
    }
  }
  
  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
  }

  handleProfilePictureUpdate(url) {
    this.props.updateProfilePicture(url);
  }

  handleImageUpload(file) {
    let upload = request.post(CLOUDINARY_UPLOAD_URL)
                        .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
                        .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        }, ()=> {
          axios.put('/profilePicture', {
            username: this.props.username, 
            uploadedFileCloudinaryUrl: response.body.secure_url
          }).then((response)=> {
            console.log(response);
          }).catch((error) => {
            console.log('error updating profile picture', error);
          });
          this.handleProfilePictureUpdate(response.body.secure_url);
          this.render();
        });
      }
    });
  }


  render() {
    if (this.props.selectedTab === 'user' && this.props.toggleTab) {
      return (
        <div>
          <div className="profilePictureContainer">
            <Dropzone
              style={{border:0}}
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
             <img className ="image" src = {(this.props.profilePicture) ? `${this.props.profilePicture}` : 'http://www.tourniagara.com/wp-content/uploads/2014/10/default-img.gif'}/>
              <div className = "middle">
                <div className = "text">Drag and Drop or Select a new photo</div>
              </div>
            </Dropzone>
          </div>
        <div>
          <Table
            fixedHeader={true}
            fixedFooter={true}
            selectable={false}
            multiSelectable={false}
            style={{width:'500px', margin: 'auto'}}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              stripedRows={false}
            >
              <TableRow>
                <TableRowColumn style={styles.userInfoDataTable}><b>Username</b></TableRowColumn>
                <TableRowColumn style={styles.userInfoDataTable}>{this.props.username}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={styles.userInfoDataTable}><b>High Score</b></TableRowColumn>
                <TableRowColumn style={styles.userInfoDataTable}>{this.props.highScore}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={styles.userInfoDataTable}><b>Best Time</b></TableRowColumn>
                <TableRowColumn style={styles.userInfoDataTable}>{this.props.bestTime === 1000000 ? '-' : this.props.bestTime}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={styles.userInfoDataTable}><b>Games Played</b></TableRowColumn>
                <TableRowColumn style={styles.userInfoDataTable}>{this.props.gamesPlayed}</TableRowColumn>
              </TableRow>
              <TableRow>
                <TableRowColumn style={styles.userInfoDataTable}><b>Total Correct</b></TableRowColumn>
                <TableRowColumn style={styles.userInfoDataTable}>{this.props.totalCorrect}</TableRowColumn>
              </TableRow>
              <TableRow style={styles.userInfoDataTable}>
                <TableRowColumn style={styles.userInfoDataTable}><b>Total Incorrect</b></TableRowColumn>
                <TableRowColumn style={styles.userInfoDataTable}>{this.props.totalIncorrect}</TableRowColumn>
              </TableRow>
            </TableBody>
          </Table>
        <div>
          <FriendList getUserFriends={this.props.getUserFriends} username={this.props.username} userFriends={this.props.userFriends}/>
        </div>
        </div>
          <RaisedButton label="Logout" style={styles.button} onClick={this.props.logout}/>
        </div>
      )
    } else {
      return null
    }
  }
  
}

export default UserInfo;