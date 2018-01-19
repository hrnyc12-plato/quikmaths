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

class Game extends React.Component {
  constructor(props) {
    super(props) 
    // finaltime is state in game component instead of prop
    this.state = {
      finalTime: 0
    }
    this.finalTimeUpdate = this.finalTimeUpdate.bind(this);
    this.saveNewScore = this.saveNewScore.bind(this);
  }

  finalTimeUpdate(cb) {
    this.setState({
      finalTime: (this.props.timeElapsed / 1000).toFixed(2)
    }, ()=> {
      cb();
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

  determineNewBadges(time, score, correctAnswers, incorrectAnswers, operator) {
    // adding in operator in case we want to add additional badges for those 
    let awardBadgesList = [];   
    if (time < 45 && (correctAnswers > incorrectAnswers)) {
      awardBadgesList.push('speed demon')
    } 
    if (score < 10000 && score >= 6000) {
      awardBadgesList.push('bronze')
    } else if (score < 19000 && score >= 10000) {
      awardBadgesList.push('silver')
    } else if (score >= 19000) {
      awardBadgesList.push('gold')
    } else if (correctAnswers === 10) {
      awardBadgesList.push('marksman')
    } else if (incorrectAnswers === 10) {
      awardBadgesList.push('epic fail')
    }
    return awardBadgesList;
  }
// create a function that sends new post request to server
// check all fields that are required
  saveNewScore () {
    let newScore = this.determineNewScore(
      this.state.finalTime,
      this.props.numberCorrect,
      this.props.numberIncorrect
    )

    let newBadges = this.determineNewBadges(
      this.state.finalTime,
      newScore,
      this.props.numberCorrect,
      this.props.numberIncorrect
    )

    axios.post('/newRecord', {
        'time': this.state.finalTime,
        'numberCorrect': this.props.numberCorrect,
        'numberIncorrect': this.props.numberIncorrect,
        'score': newScore,
        'username': this.props.username,
        'operator': this.props.problemType
      })
  
      // check if newBadges mot empty
      if (newBadges.length !== 0) {
        axios.post('/updateBadges', {
          userId: this.props.userId,
          badges: newBadges
        })
      }
        // this.props.getUserBadges
      
    axios.post('/updateUser', {
        'username': this.props.username,
        'highScore': newScore,
        'bestTime': this.state.finalTime,
        'numberCorrect': this.props.numberCorrect,
        'numberIncorrect': this.props.numberIncorrect,
        'gamesPlayed': this.props.gamesPlayed
      }).then((user) => {
        this.props.updateUserInfo(user);
        this.props.getUserInfo();
    })
  }

  onQuitClick() {
    this.props.quitGame();
  }

  render() {
    if (!this.props.choosePathMode) {
      if (this.props.questionsLeft === 0) {
        return (
          <Statistics 
            numberCorrect={this.props.numberCorrect}
            incorrectArray={this.props.incorrectArray}
            correctArray={this.props.correctArray}
            finalTime={this.state.finalTime}
            showChoosePathMode={this.props.showChoosePathMode}
            startNewGame={this.props.startNewGame}
            problemType={this.props.problemType}
            arrayWithResults={this.props.arrayWithResults}
          />
        )
      } else {
        return (
          <div>
            <h1>{problemType[this.props.problemType]}</h1>
            <QuestionAnswer 
              questionString={this.props.questionString}
              answers={this.props.answers}
              correctAnswer={this.props.correctAnswer}
              newQuestion={this.props.newQuestion}
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
            <RaisedButton label="Quit" style={styles.button} onClick={this.onQuitClick.bind(this)}/>
          </div>
        )
      }
    } else {
      return null; 
    }
  }
}

export default Game;
