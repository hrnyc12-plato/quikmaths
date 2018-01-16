import React from 'react';

class NavTopBar extends React.Component {
  constructor(props){
    super(props)
    this.style = {
      'display' : 'flex',
      'flexDirection': 'column',
      'fontFamily' : 'Poppins'
    }
    this.selectStyle = {
      'cursor' : 'pointer'
    }
  }

  render(){
    return (
      <div>
        <h4>
          NavbarTop
        </h4>
        <ul>
          <li>
            <button onClick={()=> {
              this.props.getUserInfo()
            }}>User</button>
          </li>
          <li>
            <button onClick={()=> {
              this.props.getLeaderBoard()
            }}>LeaderBoard</button>
          </li>
        </ul>
      </div>
    )
  }

}

export default NavTopBar;