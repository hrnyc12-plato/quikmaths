import React from 'react';
import UserInfo from './userInfo.jsx';
import LeaderBoard from './leaderBoard.jsx';
import InfoSideBar from './infoSideBar.jsx';

class NavTopBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: 'user',
      toggleTab: 'true'
    }
    this.listStyle = {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      listStyleType: 'none',
      marginLeft: '-40px',
      marginTop: '-20px',
      marginBottom: '40px'
    }
    this.listItemStyle = {
      border: '1px solid black',
      textAlign: 'center',
      cursor : 'pointer'
    }
    this.titleStyle = {
      display: 'grid',
      gridTemplateColumns: '4fr 1fr',
      marginTop: '-30px'
    }
  }

  toggleTab() {
    this.setState({
      toggleTab: !this.state.toggleTab
    })
  }

  selectedTabUpdate(selection) {
    this.setState({
      selectedTab: selection
    })
  }

  render(){
    return (
      <div>
        <div style={this.titleStyle}>
          <h1>QUIKMATHS</h1>
          <h1
          style={{textAlign: 'right', cursor: 'pointer'}}
          onClick={()=> {this.toggleTab()}}
          >&#9776;</h1>
        </div>
        <ul style={this.listStyle}>
          <li 
          style={this.listItemStyle}
          onClick={() => {
            this.props.getUserInfo()
            this.selectedTabUpdate('user')
            if (!this.state.toggleTab) {
              this.toggleTab()
            }
          }}>
            User
          </li>
          <li 
          style={this.listItemStyle}
          onClick={() => {
            this.props.getLeaderBoard()
            this.selectedTabUpdate('leaderboard')
            if (!this.state.toggleTab) {
              this.toggleTab()
            }
          }}>
            LeaderBoard
          </li>
          <li 
          style={this.listItemStyle}
          onClick={() => {
            this.selectedTabUpdate('tutorial')
            if (!this.state.toggleTab) {
              this.toggleTab()
            }
          }}>
            Tutorial
          </li>
        </ul>
        <UserInfo
          selectedTab={this.state.selectedTab}
          toggleTab={this.state.toggleTab}
          username={this.props.username}
          createdAt={this.props.createdAt}
          gamesPlayed={this.props.gamesPlayed}
          totalCorrect={this.props.totalCorrect}
          totalIncorrect={this.props.totalIncorrect}
          highScore={this.props.highScore}
          bestTime={this.props.bestTime}
          totalUserCorrect={this.props.totalUserCorrect}
          totalUserIncorrect={this.props.totalUserIncorrect}
          logout = {this.props.logout}
        />
        <LeaderBoard
          selectedTab={this.state.selectedTab}
          toggleTab={this.state.toggleTab}
          recordsList={this.props.recordsList}
        />
        <InfoSideBar
          selectedTab={this.state.selectedTab}
          toggleTab={this.state.toggleTab}
        />
      </div>
    )
  }

}

export default NavTopBar;