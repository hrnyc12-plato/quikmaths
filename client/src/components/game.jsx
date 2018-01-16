import React from 'react'
import QuestionAnswer from './questionAnswer.jsx'
import Statistics from './statistics.jsx'
import questionGen from '../../../problemGen.js'
import axios from 'axios'

const problemType = {
  '+': 'Addition',
  '-': 'Subtraction',
  '*': 'Multiplication',
  '/': 'Division'
}

class Game extends React.Component {
  constructor(props) {
    super(props) 
    // finaltime is state in game component instead of prop
      this.state = {
        finalTime: 0,
        questionString: [],
        answers: [],
        correctAnswer: undefined,
      }
    this.newQuestion = this.newQuestion.bind(this);
    this.finalTimeUpdate = this.finalTimeUpdate.bind(this);
  }

  componentWillMount(){
    this.newQuestion()
  }

  newQuestion() {
    let infoObject = questionGen(this.props.problemType, 3, 1);
    this.setState({
      questionString: `${infoObject.question[1]} ${infoObject.question[0]} ${infoObject.question[2]}`,
      answers: infoObject.choices,
      correctAnswer: infoObject.correctAnswer
    })
  }

  finalTimeUpdate() {
    this.setState({
      finalTime: this.props.timeElapsed
    })
  }


  determineNewScore (time, correctAnswers, incorrectAnswers) {
    let answerRatio = correctAnswers / incorrectAnswers
    let preTotal = answerRatio -= time
    let timePenalty = 3 * incorrectAnswers
    var totalScore

      if (time <= 200 && time > 150) {
        correctAnswers = correctAnswers - timePenalty
      } else if (time <= 150 && time > 100) {
        correctAnswers = correctAnswers * 3 - timePenalty
      } else if (time <= 100 && time > 60) {
        correctAnswers = correctAnswers * 8 - timePenalty
      } else if (time <= 60 && time > 30) {
        correctAnswers = correctAnswers * 10 
      } else if (time <= 30 && correctAnswers !== 20) {
        correctAnswers = correctAnswers * 12
      } else if (correctAnswers === 20) {
        let totalScore = 300000
        if (time > 30) {
          totalScore = totalScore - time
        }
      }
    var totalScore = Math.floor((preTotal + correctAnswers + 30) * 100)
    if (totalScore >= 300000) {
      totalScore = 300000
    }
    return totalScore < 0 ? 0 : totalScore;
  }
//create a function that sends new post request to server
//check all fields that are required
  saveNewScore () {
    let newScore = this.determineNewScore(
      this.state.finalTime,
      this.props.numberCorrect,
      this.props.numberIncorrect
    )
    axios.post('/newRecord', (req, res) => {
      res.send({
        'time': this.state.finalTime,
        'numberCorrect': this.props.numberCorrect,
        'numberIncorrect': this.props.numberIncorrect,
        'score': newScore,
        'userId': userId,
        'operator': this.state.problemType
      })
    })
  }





  render() {




    if (this.props.questionsLeft === 0) {
      return (
        <Statistics 
          numberCorrect={this.props.numberCorrect}
          incorrectArray={this.props.incorrectArray}
          correctArray={this.props.correctArray}
          finalTime={this.state.finalTime}
        />
      )
    } else {
      return (
        <div>
          <h1>{problemType[this.props.problemType]}</h1>
          <QuestionAnswer 
            questionString={this.state.questionString}
            answers={this.state.answers}
            correctAnswer={this.state.correctAnswer}
            newQuestion={this.newQuestion}
            numberCorrectUpdate={this.props.numberCorrectUpdate}
            questionsLeftUpdate={this.props.questionsLeftUpdate}
            incorrectArrayUpdate={this.props.incorrectArrayUpdate}
            correctArrayUpdate={this.props.correctArrayUpdate}
            inProgressBoolUpdate={this.props.inProgressBoolUpdate}
            timeElapsed={this.props.timeElapsed}
            questionsLeft={this.props.questionsLeft}
            numberIncorrectUpdate={this.props.numberIncorrectUpdate}
            finalTimeUpdate={this.finalTimeUpdate}
            saveNewScore={this.saveNewScore}
          />
        </div>
      )
    }
  }
}

export default Game;