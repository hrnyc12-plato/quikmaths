import React from 'react'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import styles from '../../www/jStyles'

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
        <Table
          fixedHeader={true}
          fixedFooter={true}
          selectable={false}
          multiSelectable={false}
          style={{width:'400px', margin: 'auto',  backgroundColor:'white'}}>
          <TableHeader
            displaySelectAll={false}
            adjustForCheckbox={false}
            enableSelectAll={false}
          >
            <TableRow>
              <TableHeaderColumn style={styles.tableCell}>Equation</TableHeaderColumn>
              <TableHeaderColumn style={styles.tableCell}>Result</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={false}
            deselectOnClickaway={true}
            showRowHover={false}
            stripedRows={false}>
              {this.props.arrayWithResults.map((question, i) => {
                  if (question.correct === true) {
                    return (
                      <TableRow style={{backgroundColor: '#DAF7A6'}} key={i}>
                        <TableRowColumn style={styles.tableCell}>{question.question}</TableRowColumn>
                        <TableRowColumn style={styles.tableCell}>Correct</TableRowColumn>
                      </TableRow>)
                  } else {
                    return (
                      <TableRow style={{backgroundColor: 'FF8989'}} key={i}>
                        <TableRowColumn style={styles.tableCell}>{question.question}</TableRowColumn>
                        <TableRowColumn style={styles.tableCell}>Incorrect</TableRowColumn>
                        </TableRow>)
                  }
                })
              }
          </TableBody>
        </Table>




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