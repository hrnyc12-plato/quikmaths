import React from 'react';

const containerStyle = {
  display: "grid",
  height: "100vh",
  gridTemplateColumns: "15% 40% 30% 15%",
  gridTemplateRows: "20% 40% 10% 10% 20%",
  backgroundColor: "#96bbbb",
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
          <h1>Welcome to QuikMaths</h1>
          <h4>Learn, Play, Compete</h4>
          <p>It's like HQ trivia but it's only for math, you can't win money, and we have a tenth of a percentage of their userbase</p>
        </div>
        <div style={loginStyle}>
          <h1>Log In!</h1>
          <p>Username: <input type="text" value={this.state.username} onChange={this.handleUsername}></input></p>
          <p>Password: <input type="password" value={this.state.password} onChange={this.handlePassword}></input></p>
          <button onClick={() => this.props.handleLogin({'username': this.state.username, 'password': this.state.password})} style={loginButtonStyle}>Log In</button>
        </div>
        <div style={signUpStyle}>
          <p>Don't have an account?</p>
          <button onClick={this.props.goToSignUp} style={signUpButtonStyle}>Sign Up</button>
        </div>
        <p style={smallPrintStyle}>&copy; 2018 QuikMath Fine Print Goes Here</p>
      </div>
    )
  }

}

export default Login;