import React from 'react';

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
        <h1>Log In!</h1>
        <p>Username: <input type="text" value={this.state.username} onChange={this.handleUsername}></input></p>
        <p>Password: <input type="password" value={this.state.password} onChange={this.handlePassword}></input></p>
        <button onClick={() => this.props.handleLogin({'username': this.state.username, 'password': this.state.password})}>Log In</button>
        <p>Don't have an account?<button onClick={this.props.goToSignUp}>Sign Up</button></p>
      </div>
    )
  }

}

export default Login;