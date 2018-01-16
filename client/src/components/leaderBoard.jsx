import React from 'react'
import axios from 'axios';

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <h4>Leaderboard</h4>
        <ul>
          <li>
            placeholder record
          </li>
          <li>
            placeholder record
          </li>
          <li>
            placeholder record
          </li>
          <li>
            placeholder record
          </li>
          {/* {this.props.LeaderBoard.map((record, i)=> {
            return (<li key={i}>{record}</li>)
          })} */}
        </ul>
      </div>
    )
  }
}

export default LeaderBoard;