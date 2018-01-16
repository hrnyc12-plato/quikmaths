import React from 'react'
import axios from 'axios'

const containerStyle = {
  display: "grid",
  height: "100vh",
  gridTemplateColumns: "15% 40% 30% 15%",
  gridTemplateRows: "20% 40% 10% 10% 20%",
  backgroundColor: "#618985",
  fontFamily: "poppins"
}

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
			password: ''
		}
		this.handleUsername = this.handleUsername.bind(this)
		this.handlePassword = this.handlePassword.bind(this)
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
			<div style={containerStyle}>
				<div style={introStyle}>
					<h1>Welcome to QuikMath</h1>
          <h4>Learn, Play, Compete</h4>
          <p>It's like HQ trivia but it's only for math, you can't win money, and we have a tenth of a percentage of their userbase</p>
				</div>
				<div style={signUpStyle}>
					<h1>Sign Up!</h1>
					<p>Username: <input type="text" value={this.state.username} onChange={this.handleUsername}></input></p>
					<p>Password: <input type="password" value={this.state.password} onChange={this.handlePassword}></input></p>
					<button style={signUpButtonStyle} onClick={() => this.props.handleSignUp({'username': this.state.username, 'password': this.state.password})}>Sign Up</button>
				</div>
				<div style={loginStyle}>
					<p>I Alredy Have An Account</p>
					<button style={loginButtonStyle} onClick={this.props.goToLogin}>I have an account!</button>
				</div>
				<p style={smallPrintStyle}>&copy; 2018 QuikMath Fine Print Goes Here</p>
			</div>
		)
	}
}

export default SignUp