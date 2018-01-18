import React from 'react'
import axios from 'axios';
import DropDownMenu from 'material-ui/DropDownMenu';
import styles from '../../www/jStyles.js';
import MenuItem from 'material-ui/MenuItem';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.rowStyle = {
      borderBottom: 'solid 0.5px'
    }
    this.tableStyle = {
      borderCollapse: 'collapse',
      marginTop: '20px',
      marginBottom: '20px',
      width: '100%'
    }
    this.state = {
      filterOperator: ""
    }
  }

  handleFilterSelect(event, key, value, ) {
    this.setState({filterOperator: value})
    this.props.filterLeaderboard(value);
  }

  render() {
    if (this.props.selectedTab === 'leaderboard' && this.props.toggleTab) {
      return (
      <div>
        <div>
          <DropDownMenu
            value={this.state.filterOperator}
            onChange = {this.handleFilterSelect.bind(this)}
            autoWidth={false}
          >
            <MenuItem value={""} primaryText="Top 10 All-time Scores" />
            <MenuItem value={"+"} primaryText="Top 10 Addition Scores" />
            <MenuItem value={"-"} primaryText="Top 10 Subtraction Scores" />
            <MenuItem value={"*"} primaryText="Top 10 Multiplication Scores" />
            <MenuItem value={"/"} primaryText="Top 10 Division Scores" />
          </DropDownMenu>
        </div>
        <div className ='leaderBoardTable'>
          <Table
            fixedHeader={true}
            fixedFooter={true}
            selectable={false}
            multiSelectable={false}
            style={{width:'1000px', margin: 'auto',  backgroundColor:'white'}}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
              <TableRow>
                <TableHeaderColumn style={styles.tableCell}>Rank</TableHeaderColumn>
                <TableHeaderColumn style={styles.tableCell}>User</TableHeaderColumn>
                <TableHeaderColumn style={styles.tableCell}>Score</TableHeaderColumn>
                <TableHeaderColumn style={styles.tableCell}>Time</TableHeaderColumn>
                <TableHeaderColumn style={styles.tableCell}>Operator</TableHeaderColumn>
                <TableHeaderColumn style={styles.tableCell}>Accuracy</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              deselectOnClickaway={true}
              showRowHover={true}
              stripedRows={true}
            >
              {this.props.recordsList.length > 0 ? this.props.recordsList.map((row, i) => {
                return (<TableRow key={i}>
                  <TableRowColumn style={styles.tableCell}>{i+1}</TableRowColumn>
                  <TableRowColumn style={styles.tableCell}>{row.username}</TableRowColumn>
                  <TableRowColumn style={styles.tableCell}>{row.score}</TableRowColumn>
                  <TableRowColumn style={styles.tableCell}>{row.time} seconds</TableRowColumn>
                  <TableRowColumn style={styles.tableCell}><b>{row.operator}</b></TableRowColumn>
                  <TableRowColumn style={styles.tableCell}>{row.numberCorrect / (row.numberCorrect + row.numberIncorrect) * 100 + ' %'}</TableRowColumn>
                </TableRow>)
              }) : ''}
            </TableBody>
          </Table>
        </div>
      </div>
      )
    } else {
      return null;
    }
  }
}

export default LeaderBoard;