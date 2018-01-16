import React from 'react'

class QuestionAnswer extends React.Component {
	constructor(props){
		super(props)
		this.state = {
			questionsLeft: this.props.questionsLeft
		}
		this.findCorrect = this.findCorrect.bind(this)
	}

	findCorrect(answer, question){
		if (answer === this.props.correctAnswer){
			this.props.correctArrayUpdate(question)
			this.props.numberCorrectUpdate()
			this.props.questionsLeftUpdate()
		} else {
			this.props.incorrectArrayUpdate(question)
			this.props.numberIncorrectUpdate()
			this.props.questionsLeftUpdate()
		}
		if (this.props.questionsLeft === 1){
			this.props.finalTimeUpdate()
			this.props.saveNewScore()
			this.props.inProgressBoolUpdate()
		} else {
			this.props.newQuestion()
		}
	}

	render(){
		return(
			<div>
				<div>{this.props.questionString}</div>
				<div>{this.props.answers.map((answer, id) => 
					<Answer 
						question={this.props.questionString} 
						answer={answer} 
						key={id} 
						findCorrect={this.findCorrect}
					/>)}
				</div>
				<Timer time={this.props.timeElapsed} />
				<div>Questions Left: {this.props.questionsLeft}</div>
			</div>
		)
	}
}

const Answer = (props) => (
	<button style={{cursor:'pointer'}} onClick={() => props.findCorrect(props.answer, props.question)}>{props.answer}</button>
)

const Timer = (props) => (
	<span>Time Elapsed: {props.time}</span>
)

export default QuestionAnswer
