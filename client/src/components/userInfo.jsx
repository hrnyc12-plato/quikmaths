import React from 'react'
import axios from 'axios';
import Dropzone from 'react-dropzone'
import request from 'superagent';


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
      width: '100%'
    }
    this.state = {
      uploadedFileCloudinaryUrl: ''
    }
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });
    this.handleImageUpload(files[0]);
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
        });
      }
    });
  }


  render() {
    if (this.props.selectedTab === 'user' && this.props.toggleTab) {
      return (
        <div>
          <div className = "profilePictureContainer">
            <Dropzone
              style={{width:'200px', height:'50px', border: '2px black solid'}}
              multiple={false}
              accept="image/*"
              onDrop={this.onImageDrop.bind(this)}>
              <img className = "profilePicture" src = {`${this.state.uploadedFileCloudinaryUrl}`}/>
              <div className = "middle">
                <div className = "text">Drag and Drop or Select a new photo</div>
              </div>
            </Dropzone>
          </div>
          <table style={this.tableStyle}>
            <tbody>
              <tr>
                <td>Username</td>
                <td>{this.props.username}</td>
              </tr>
              <tr>
                <td>High Score</td>
                <td style={this.columnStyle}>{this.props.highScore}</td>
              </tr>
              <tr>
                <td>Best Time</td>
                <td style={this.columnStyle}>{this.props.bestTime}</td>
              </tr>
              <tr>
                <td>Games Played</td>
                <td style={this.columnStyle}>{this.props.gamesPlayed}</td>
              </tr>
              <tr>
                <td>Total Correct</td>
                <td style={this.columnStyle}>{this.props.totalCorrect}</td>
              </tr>
              <tr>
                <td>Total Incorrect</td>
                <td style={this.columnStyle}>{this.props.totalIncorrect}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={this.props.logout}>Logout</button>
        </div>
      )
    } else {
      return null
    }
  }
  
}

export default UserInfo;