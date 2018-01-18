import React from 'react';
import BarGraph from './barGraph.jsx';

class MultiplayerResults extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      display: 'score'
    }

    this.pluckData();
    console.log(this.props)
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }


  pluckData() {
    this.state.data = {
      score: this.props.users.map((user) => {
        return {
          name: user.name, value: user.results.score
        }
      }),
      accuracy: this.props.users.map((user) => {
        return {
          name: user.name, value: user.results.accuracy
        }
      }),
      time: this.props.users.map((user) => {
        return {
          name: user.name, value: user.results.time
        }
      })
    }
  }

  handleSelectChange (e) {
    this.setState({
      display: e.target.value
    })
  }

  render () {
    return (
      <div> 
        <h3> Results </h3>
        <select value={this.state.display} onChange={this.handleSelectChange}>
          <option value='score'>Score</option>
          <option value='accuracy'>Accuracy</option>
          <option value='time'>Time</option>
        </select>
        <BarGraph data={this.state.data[this.state.display]} dataType={this.state.display}/>
      </div>
    );
  }
}

export default MultiplayerResults;