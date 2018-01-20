import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../www/jStyles'

class QuestionAnswer extends React.Component {
	constructor(props){
		super(props)
		this.findCorrect = this.findCorrect.bind(this)
	}

	findCorrect(answer, question){
		this.props.questionsLeftUpdate((questionsLeft)=> {
			if (answer === this.props.correctAnswer){
				this.props.correctArrayUpdate(question)
				this.props.numberCorrectUpdate()
			} else {
				this.props.incorrectArrayUpdate(question)
				this.props.numberIncorrectUpdate()
			}
			if (questionsLeft === 0){
				this.props.finalTimeUpdate(()=> {
					this.props.saveNewScore()
				})
				this.props.inProgressBoolUpdate()
			} else {
				this.props.newQuestion()
			}
		})
	}

	render(){
		return(
			<div>
				<div style={styles.questionString}>{this.props.questionString}</div>
				<div>{this.props.answers.map((answer, id) => 
					<Answer 
						question={this.props.questionString} 
						answer={answer} 
						key={id} 
						findCorrect={this.findCorrect}
					/>)}
				</div>
				<div className = "timeQuestionsLeft">
				<Timer timeElapsed={this.props.timeElapsed} />
				<div>Questions Left: {this.props.questionsLeft}</div>
				</div>
			</div>
		)
	}
}

const Answer = (props) => (
	<RaisedButton label={props.answer} style={{cursor:'pointer', margin: '10px'}} onClick={() => {
		props.findCorrect(props.answer, props.question)
	}}/>
)

const Timer = (props) => (
	<span>Time Elapsed: {(props.timeElapsed/1000).toFixed(2)}</span>
)

export default QuestionAnswer
