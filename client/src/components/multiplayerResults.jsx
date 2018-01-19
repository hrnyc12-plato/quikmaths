import React from 'react';
import BarGraph from './barGraph.jsx';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import styles from '../../www/jStyles'

class MultiplayerResults extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      display: 'score (pts)'
    }

    this.pluckData();
    console.log(this.props)
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }


  pluckData() {
    this.state.data = {
      'score (pts)': this.props.users.map((user) => {
        return {
          name: user.name, value: user.results.score
        }
      }),
      'accuracy (%)': this.props.users.map((user) => {
        return {
          name: user.name, value: user.results.accuracy * 100
        }
      }),
      'time (s)': this.props.users.map((user) => {
        return {
          name: user.name, value: user.results.time
        }
      })
    }
  }

  handleSelectChange (e, i, display) {
    this.setState({display})
  }

  render () {
    return (
      <div style={{marginBottom: '10px'}}>
      <h3> Results </h3>
      <div style={{overflow: 'hidden', marginLeft: '200px'}}> 

        <div style={{float: 'left', overflow: 'hidden', width: '500px'}}>
          <Table
            fixedHeader={true}
            fixedFooter={true}
            selectable={false}
            multiSelectable={false}
            style={{overflow: 'hidden', width:'490px', margin: 'auto',  backgroundColor:'white'}}>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow style={{width: '490px'}}>
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
                        <TableRow style={{backgroundColor: '#DAF7A6', width: '490px'}} key={i}>
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
        </div>
        
        <div style={{float: 'left', marginLeft: '10px'}}>
          <SelectField
            floatingLabelText={"Stat"}
            floatingLabelFixed={true}
            value={this.state.display}
            onChange={this.handleSelectChange}
          > 
            <MenuItem value={'score (pts)'} primaryText="Score" />
            <MenuItem value={'accuracy (%)'} primaryText="Accuracy" />
            <MenuItem value={'time (s)'} primaryText="Time" />
          </SelectField><br/>

          <BarGraph data={this.state.data[this.state.display]} dataType={this.state.display}/>
        </div>
      </div>
      </div>
    );
  }
}

export default MultiplayerResults;