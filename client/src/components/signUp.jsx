import React from 'react'
import axios from 'axios'

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
			<div>
				<h1>Sign Up!</h1>
				<p>Username: <input type="text" value={this.state.username} onChange={this.handleUsername}></input></p>
				<p>Password: <input type="password" value={this.state.password} onChange={this.handlePassword}></input></p>
				<button onClick={() => this.props.handleSignUp({'username': this.state.username, 'password': this.state.password})}>Sign Up</button>
				<button onClick={this.props.goToLogin}>I have an account!</button>
			</div>
		)
	}
}

export default SignUp