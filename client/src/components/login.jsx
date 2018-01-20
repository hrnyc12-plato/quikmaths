import React from 'react';
import Paper from 'material-ui/Paper';
import styles from '../../www/jStyles.js';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';

const introStyle = {
  gridColumnStart: "2",
  gridColumnEnd: "3",
  gridRowStart: "2",
  gridRowEnd: "3",
  justifySelf: "left",
  alignSelf: "top",
}

const loginStyle = {
  gridColumnStart: "3",
  gridColumnEnd: "4",
  gridRowStart: "2",
  gridRowEnd: "3",
  justifySelf: "center"
}

const loginButtonStyle = {
  width: "100%",
}

const signUpStyle = {
  gridColumnStart: "2",
  gridColumnEnd: "4",
  gridRowStart: "3",
  gridRowEnd: "4",
  justifySelf: "center",
  alignSelf: "top",
  marginBottom: "5px"
}

const signUpButtonStyle = {
  width: "100%",
}

const smallPrintStyle = {
  gridColumnStart: "2",
  gridColumnEnd: "4",
  gridRowStart: "4",
  gridRowEnd: "5",
  fontSize: "10px",
  justifySelf: "center",
  marginTop: "50px"
}

class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.style = {
      'display' : 'flex',
      'flexDirection': 'column',
      'fontFamily' : 'Poppins'
    }
    this.selectStyle = {
      'cursor' : 'pointer'
    }
    this.handleUsername = this.handleUsername.bind(this)
    this.handlePassword = this.handlePassword.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
  }

  handleKeyPress (e) {
    if (e.key === 'Enter') {
      this.props.handleLogin({'username': this.state.username, 'password': this.state.password})
    }
  }

  handleUsername(e){
    this.setState({
      username: e.target.value
    })
  }

  handlePassword(e){
    this.setState({
      password: e.target.value
    })
  }
  
  render(){
    return(
			<Paper style={styles.paperStyle} zDepth={2}>
      <div>
        <div style={introStyle}>
          <h1>Welcome to QuikMath</h1>
          <h4>Learn, Play, Compete</h4>
          <p>It's like HQ trivia but it's only for math, you can't win money, and we have a tenth of a percentage of their userbase</p>
        </div>
        <div style={loginStyle}>
          <h1>Log In!</h1>
          <div className = "inputFields">
            <div>
              <TextField 
                type="text"
                value={this.state.username} 
                onChange={this.handleUsername}
                hintText="Enter username"
                errorText={this.props.loginErrorText === 'We did not recognize your username' ? this.props.loginErrorText : ''}
              >
              </TextField>
            </div>
            <div>
              <TextField 
                type="password"
                value={this.state.password} 
                onChange={this.handlePassword} 
                hintText="Enter password"
                errorText={this.props.loginErrorText === 'Incorrect Password' ? this.props.loginErrorText : ''}
                onKeyPress={this.handleKeyPress}>                
              </TextField>
            </div>
          </div>
          <RaisedButton label="Login" style={styles.button} onClick={() => this.props.handleLogin({'username': this.state.username, 'password': this.state.password})}/>
        </div>
        <div style={signUpStyle}>
          <p>Don't have an account?</p>
          <RaisedButton label="Sign Up" style={styles.button} onClick={this.props.goToSignUp}/>
        </div>
        <p style={smallPrintStyle}>&copy; 2018 QuikMath Fine Print Goes Here</p>
      </div>
      </Paper>
    )
  }

}

export default Login;