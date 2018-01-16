import React from 'react'
import axios from 'axios';

class UserInfo extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    // correctPercentage: this.state.totalCorrect / (this.state.totalCorrect + this.state.totalIncorrect) * 100
    return (
      <div>
        <h4>UserInfo</h4>
        <ul>
          <li>
            username: {this.props.username || 'brad'}
          </li>
          <li>
            createdAt: {this.props.createdAt || 'yesterday'}
          </li>
          <li>
            gamesPlayed: {this.props.gamesPlayed || 'like a bunch'}
          </li>
          <li>
            totalCorrect: {this.props.totalCorrect || '1500'}
          </li>
          <li>
            totalIncorrect: {this.props.totalIncorrect || '500'}
          </li>
          <li>
            percentage: 75%
          </li>
          <li>
            highScore: {this.props.highScore || '88848'}
          </li>
          <li>
            bestTime: {this.props.bestTime || '24'}
          </li>
        </ul>
      </div>
    )
  }
  
}

export default UserInfo;