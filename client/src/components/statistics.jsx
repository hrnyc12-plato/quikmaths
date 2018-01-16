import React from 'react'

class Statistics extends React.Component {
  render() {
    return (
      <div>
        <h1>Previous Games Statistics</h1>
          <p>Total Time: {this.props.finalTime}</p>
          <p>Number Correct: {this.props.numberCorrect}</p>
        <h2>Incorrect Questions</h2>
          <ul>
            {this.props.incorrectArray.map((incorrectQuestion, index) => {
              return <li key={index}>{incorrectQuestion}</li>
            })}
          </ul>
        <h2>Correct Questions</h2>
          <ul>
            {this.props.correctArray.map((correctQuestion, index) => {
              return <li key={index}>{correctQuestion}</li>
            })}
          </ul>
      </div>
    )
  }
}

export default Statistics