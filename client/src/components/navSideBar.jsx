import React from 'react';
import _ from 'underscore';

//passing in startNewGame
class NavSideBar extends React.Component {
  constructor(props){
    super(props)
    this.style = {
      'display' : 'flex',
      'flexDirection': 'column',
      'fontFamily' : 'Poppins'
    }
    this.selectStyle = {
      'cursor' : 'pointer'
    }
  }

  render(){
    if (this.props.choosePathMode) {
      if (this.props.inProgressBool){
        return (<span></span>)
      } else {
        return (
            <div style={this.style}>
              CHOOSE YOUR PATH:
              <h2 style={this.selectStyle} onClick={() => {this.props.startNewGame('+')}}>Addition</h2>
              <h2 style={this.selectStyle} onClick={() => {this.props.startNewGame('-')}}>Subtraction</h2>
              <h2 style={this.selectStyle} onClick={() => {this.props.startNewGame('*')}}>Multiplication</h2>
              <h2 style={this.selectStyle} onClick={() => {this.props.startNewGame('/')}}>Division</h2>
              <h2 style={this.selectStyle} onClick={() => {this.props.startNewGame(_.sample(['+','/', '*', '-']))}}>Random</h2>
            </div>
        )
     }
    } else {
      return null;
    }
  }

}

export default NavSideBar;