import React from 'react'
import QuestionAnswer from './questionAnswer.jsx'
import Statistics from './statistics.jsx'
import questionGen from '../../../problemGen.js'
import axios from 'axios'
import _ from 'underscore'
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../www/jStyles.js';

const problemType = {
  '+': 'Addition',
  '-': 'Subtraction',
  '*': 'Multiplication',
  '/': 'Division'
}

class MultiplayerGame extends React.Component {
  constructor(props) {
    super(props) 
    // finaltime is state in game component instead of prop
    this.state = {
      initialTime: new Date(),
      finalTime: 0,
      currentQuestion: this.props.gameInfo[0],
      currentIndex: 0,
      numberCorrect: 0,
      numberIncorrect: 0,
      arrayWithResults: []
    }
    this.computeFinalTime = this.computeFinalTime.bind(this);
    this.saveNewScore = this.saveNewScore.bind(this);
    this.handleAnswerClick = this.handleAnswerClick.bind(this);
  }

  componentDidMount () {
    var intervalId = setInterval(() => this.setState({
      timeElapsed: new Date() - this.state.initialTime
    }), 1);
    this.setState({intervalId})
  }

  computeFinalTime () {
    return (this.state.timeElapsed / 1000).toFixed(2);
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
      this.state.numberCorrect,
      this.state.numberIncorrect
    )
    axios.post('/newRecord', {
        'time': this.state.finalTime,
        'numberCorrect': this.state.numberCorrect,
        'numberIncorrect': this.state.numberIncorrect,
        'score': newScore,
        'username': this.props.username,
        'operator': this.props.problemType
      })

      
    axios.post('/updateUser', {
      'username': this.props.username,
      'highScore': newScore,
      'bestTime': this.state.finalTime,
      'numberCorrect': this.state.numberCorrect,
      'numberIncorrect': this.state.numberIncorrect,
      'gamesPlayed': this.props.gamesPlayed
    }).then((user) => {
      this.props.updateUserInfo(user);
      this.props.getUserInfo();
    })

    this.props.sendResults(newScore, this.state.numberCorrect / 10, this.state.finalTime, this.state.arrayWithResults);
  }

  onQuitClick() {
    this.props.quitGame();
  }

  handleAnswerClick (answerChoice) {
    var correct = answerChoice === this.state.currentQuestion.correctAnswer;
    
    if (this.state.currentIndex + 1 === this.props.gameInfo.length) {
      clearInterval(this.state.intervalId);
      correct ? this.setState({
        numberCorrect: this.state.numberCorrect + 1,
        finalTime: this.computeFinalTime(),
        arrayWithResults: [...this.state.arrayWithResults, {
          question: this.state.currentQuestion.questionString,
          correct:true
        }]
      }, () => this.saveNewScore()) : this.setState({
        arrayWithResults: [...this.state.arrayWithResults, {
          question: this.state.currentQuestion.questionString,
          correct:false
        }],
        numberIncorrect: this.state.numberIncorrect + 1,
        finalTime: this.computeFinalTime()
      }, () => this.saveNewScore())
    } else {
      correct ? this.setState({
        arrayWithResults: [...this.state.arrayWithResults, {
          question: this.state.currentQuestion.questionString,
          correct:true
        }],
        numberCorrect: this.state.numberCorrect + 1,
        currentIndex: this.state.currentIndex + 1,
        currentQuestion: this.props.gameInfo[this.state.currentIndex + 1]
      }) : this.setState({
        arrayWithResults: [...this.state.arrayWithResults, {
          question: this.state.currentQuestion.questionString,
          correct:false
        }],
        numberIncorrect: this.state.numberIncorrect + 1,
        currentIndex: this.state.currentIndex + 1,
        currentQuestion: this.props.gameInfo[this.state.currentIndex + 1]
      })
    }
  }

  render() {
    return (
      <div style={{fontFamily: 'Poppins', marginTop: '5px'}}>
        <div>{this.state.currentQuestion.questionString}</div>
				<div>{this.state.currentQuestion.answers.map((answer, id) => 
          <Answer 
            key={id}
            value={answer}
            handleClick={this.handleAnswerClick}
					/>)}
				</div>
				<Timer timeElapsed={this.state.timeElapsed} />
				<div>Questions Left: {this.props.gameInfo.length - this.state.currentIndex}</div>
        {/* <button onClick={this.onQuitClick}>Quit</button> */}
      </div>
    )
  }
}

const Answer = (props) => (
	<RaisedButton label={props.value} style={{cursor:'pointer', margin: '10px'}} onClick={() => {
		props.handleClick(props.value)}}/>
)

const Timer = (props) => (
	<span>Time Elapsed: {(props.timeElapsed/1000).toFixed(2)}</span>
)

export default MultiplayerGame;
