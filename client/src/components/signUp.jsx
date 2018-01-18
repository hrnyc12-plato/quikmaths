import React from 'react';
import axios from 'axios';
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

const signUpStyle = {
  gridColumnStart: "3",
  gridColumnEnd: "4",
  gridRowStart: "2",
  gridRowEnd: "3",
  justifySelf: "center"
}

const signUpButtonStyle = {
  width: "100%",
}

const loginStyle = {
  gridColumnStart: "2",
  gridColumnEnd: "4",
  gridRowStart: "3",
  gridRowEnd: "4",
  justifySelf: "center",
  alignSelf: "top",
  marginBottom: "5px"
}

const loginButtonStyle = {
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

class SignUp extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			username: '',
			usernameErrorText:'',
			password: '',
			passwordErrorText:''

		}
		this.handleUsername = this.handleUsername.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
	}

	handleUsername(e) {
		this.setState({
			username: e.target.value
		}, () => {
			if (this.state.username.length === 0) {
        this.setState({usernameErrorText:'Please enter a username'});
			} else {
				this.setState({usernameErrorText:''});
			}
		});
	}

	handlePassword(e) {
		this.setState({
			password: e.target.value
		}, () => {
      if (this.state.password.length < 6) {
        this.setState({passwordErrorText:'Password must be at least 6 characters'});
			} else {
				this.setState({passwordErrorText:''});
			}
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
				<div style={signUpStyle}>
					<h1>Sign Up!</h1>
					<div className = "inputFields">
						<div>
							<TextField 
								type="text"
								value={this.state.username} 
								onChange={this.handleUsername}
								hintText="Enter username"
								errorText={(this.props.signupErrorText === 'Username already exists') ? this.props.signupErrorText : ''}>
							</TextField>
						</div>
						<div>
							<TextField 
								type="password"
								value={this.state.password} 
								onChange={this.handlePassword} 
								hintText="Enter password"
								errorText={this.state.passwordErrorText}>
							</TextField>
						</div>
					</div>
					<RaisedButton 
						label="Sign Up"
						style={styles.button}
						onClick={() => {
							if (this.state.usernameErrorText === '' && this.state.passwordErrorText === '' && this.state.password.length > 5) {
								this.props.handleSignUp({'username': this.state.username, 'password': this.state.password});
							}
						}
						
						}/>
				</div>
				<div style={loginStyle}>
					<p>I Already have an Account</p>
					<RaisedButton label='I have an account!' style={styles.button} onClick={this.props.goToLogin}/>
				</div>
				<p style={smallPrintStyle}>&copy; 2018 QuikMath Fine Print Goes Here</p>
			</div>
			</Paper>
		)
	}
}

export default SignUp