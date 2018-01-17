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
    const random = _.sample(['+','/', '*', '-']);
    if (this.props.choosePathMode) {
      if (this.props.inProgressBool) {
        return (<span></span>)
      } else {
        return (
            <div style={this.style}>
              CHOOSE YOUR PATH:
              <span>
                <button value='1' title="1 to 3 digits" onClick={this.props.levelHandler}>Level 1</button>&nbsp;
                <button value='2' title="3 to 5 digits" onClick={this.props.levelHandler}>Level 2</button>&nbsp;
                <button value='3' title="mixed operators" onClick={this.props.levelHandler}>Level 3</button>
              </span>
              <h2 style={this.selectStyle} onClick={() => {this.props.startNewGame('+')}}>Addition</h2>
              <h2 style={this.selectStyle} onClick={() => {this.props.startNewGame('-')}}>Subtraction</h2>
              <h2 style={this.selectStyle} onClick={() => {this.props.startNewGame('*')}}>Multiplication</h2>
              <h2 style={this.selectStyle} onClick={() => {this.props.startNewGame('/')}}>Division</h2>
              <h2 style={this.selectStyle} onClick={() => {this.props.startNewGame(random)}}>Random</h2>
            </div>
        )
     }
    } else {
      return null;
    }
  }

}

export default NavSideBar;