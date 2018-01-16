import React from 'react'

class Statistics extends React.Component {
  constructor(props) {
    super(props)
    this.buttonStyle = {
      cursor: 'pointer'
    }
  }
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
        <h2 
          style={this.buttonStyle}
          onClick={()=> {
            this.props.startNewGame(this.props.problemType)
          }}
        >
          Play Again
        </h2>
        <h2 
          style={this.buttonStyle}
          onClick={()=> {
            this.props.showChoosePathMode()
          }}
        >
          Choose Another Path
        </h2>
      </div>
    )
  }
}

export default Statistics