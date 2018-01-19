import React from 'react';
import UserInfo from './userInfo.jsx';
import LeaderBoard from './leaderBoard.jsx';
import InfoSideBar from './infoSideBar.jsx';
import RoomDisplay from './roomDisplay.jsx';
import NavSideBar from './navSideBar.jsx';

class NavTopBar extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      selectedTab: this.props.defaultTab || '',
      toggleTab: 'true'
    }
    this.listStyle = {
      display: 'block',
      listStyle: 'none',
      margin: 'auto',
      width:'1050px',
      marginBottom: '20px',
      paddingBottom: '30px'
    }
    this.listItemStyle = {
      border: '1px solid black',
      paddingTop:'5px',
      textAlign: 'center',
      cursor : 'pointer',
      height: '30px',
      width: '200px',
      fontSize: '20px',
      verticalAlign: 'middle',
      display:'inline-block',
    }
  }

  toggleTab() {
    this.setState({
      toggleTab: !this.state.toggleTab
    })
  }
  
  selectedTabUpdate(selection) {
    if (selection === this.state.selectedTab) {
      this.setState({
        toggleTab: !this.state.toggleTab
      });
    } else {
      this.setState({
        selectedTab: selection
      });
    }
  }

  render(){
    return (
      <div>
        <div>
          <h1 className="title">QUIKMATH</h1>
        </div>
        <ul style={this.listStyle} className ="toolbar">
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
            this.selectedTabUpdate('singleplayer');
            if (!this.state.toggleTab) {
              this.toggleTab()
            }
          }}>
            Single Player
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
          <li 
          style={this.listItemStyle}
          onClick={() => {
            this.selectedTabUpdate('roomDisplay')
            if (!this.state.toggleTab) {
              this.toggleTab()
            }
          }}>
            Rooms
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
          profilePicture = {this.props.profilePicture}
          updateProfilePicture = {this.props.updateProfilePicture}
          userFriends={this.props.userFriends}
          getUserFriends={this.props.getUserFriends}
        />

        <NavSideBar 
          selectedTab={this.state.selectedTab}
          toggleTab={this.state.toggleTab}
          inProgressBool = {this.props.inProgressBool}
          levelHandler={this.props.levelHandler}
          startNewGame= {this.props.startNewGame}
          inProgressBoolUpdate = {this.props.inProgressBoolUpdate}
          questionsLeftUpdate = {this.props.questionsLeftUpdate}
          choosePathMode = {this.props.choosePathMode}
        />


        <LeaderBoard
          filterLeaderboard={this.props.filterLeaderboard}
          selectedTab={this.state.selectedTab}
          toggleTab={this.state.toggleTab}
          recordsList={this.props.recordsList}
        />
        <InfoSideBar
          selectedTab={this.state.selectedTab}
          toggleTab={this.state.toggleTab}
        />
        <RoomDisplay
          selectedTab={this.state.selectedTab}
          toggleTab={this.state.toggleTab}
          db={this.props.db}
          topLevelState={this.props.topLevelState}
          username={this.props.username}
        />
      </div>
    )
  }

}

export default NavTopBar;