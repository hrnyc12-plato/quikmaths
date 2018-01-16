import React from 'react'
import axios from 'axios';

class LeaderBoard extends React.Component {
  constructor(props) {
    super(props);
    this.rowStyle = {
      borderBottom: 'solid 0.5px'
    }
    this.tableStyle = {
      borderCollapse: 'collapse',
      marginTop: '-20px',
      marginBottom: '20px',
      width: '100%'
    }
  }
  render() {
    if (this.props.selectedTab === 'leaderboard' && this.props.toggleTab) {
      return (
        <div>
          <Table data={this.props.recordsList} rowStyle={this.rowStyle} tableStyle={this.tableStyle} />
        </div>
      )
    } else {
      return null;
    }
  }
}

const Table = ({data, rowStyle, tableStyle}) => (
  <table style={tableStyle}>
    <tbody>
      <tr>
        <td style={rowStyle}>User</td>
        <td style={rowStyle}>Score</td>
        <td style={rowStyle}>Time</td>
        <td style={rowStyle}>Accuracy</td>
      </tr>
      {data.map((row, key) => {
        return (<TableRow row={row} key={key} />)
      })}
    </tbody>
  </table>
)

const TableRow = ({row}) => (
  <tr>
    <td key={row.username}>{row.username}</td>
    <td key={row.score}>{row.score}</td>
    <td key={row.time}>{row.time}</td>
    <td key={row.numberCorrect}>{row.numberCorrect / (row.numberCorrect + row.numberIncorrect) * 100 + ' %'}</td>
  </tr>
)

export default LeaderBoard;