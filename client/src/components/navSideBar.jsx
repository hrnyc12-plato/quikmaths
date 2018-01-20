import React from 'react';
import _ from 'underscore';
import RaisedButton from 'material-ui/RaisedButton';

//passing in startNewGame
class NavSideBar extends React.Component {
  constructor(props){
    super(props)
    this.label ={
      color: 'white'
    }
  }

  render() {
    if (this.props.selectedTab === 'singleplayer' && this.props.toggleTab) {
      const random = _.sample(['+','/', '*', '-']);
      if (this.props.choosePathMode) {
        if (this.props.inProgressBool) {
          return (<span></span>)
        } else {
          
          return (
              <div>
                <h1>CHOOSE YOUR PATH:</h1>
                <span>
                  <RaisedButton title="1 to 3 Digits" labelStyle={this.label} backgroundColor="rgb(0, 188, 212)" label="Level 1" onClick={() => {this.props.levelHandler('1', "Level 1" )}} style={{margin: '0px 10px'}}/>
                  <RaisedButton title="3 to 5 Digits" labelStyle={this.label} backgroundColor="rgb(0, 146, 165)" label="Level 2" onClick={() => {this.props.levelHandler('2',"Level 2" )}} style={{margin: '0px 10px'}}/>
                  <RaisedButton title="Mixed Operators" labelStyle={this.label} backgroundColor="rgb(1, 107, 121)" label="Level 3" onClick={() => {this.props.levelHandler('3', "Level 3" )}} style={{margin: '0px 10px'}}/>
                </span>
                <div className = "gameTypeOptionsList">
                  <p className = "selectedLevelField">Selected Level: <span className="level">{this.props.selectedLevel}</span></p>
                  <h2 className ="gameTypeOption" onClick={() => {this.props.startNewGame('+')}}>Addition</h2>
                  <h2 className ="gameTypeOption" onClick={() => {this.props.startNewGame('-')}}>Subtraction</h2>
                  <h2 className ="gameTypeOption" onClick={() => {this.props.startNewGame('*')}}>Multiplication</h2>
                  <h2 className ="gameTypeOption" onClick={() => {this.props.startNewGame('/')}}>Division</h2>
                  <h2 className ="gameTypeOption" onClick={() => {this.props.startNewGame(random)}}>Random</h2>
                </div>
              </div>
          )

          
      }
      } else {
        return null;
      }
    } else {
      return null;
    }
    
  }

}

export default NavSideBar;