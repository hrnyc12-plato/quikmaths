import React, {Component} from 'react';
// import HomeTutorial from './HomeTutorial';
// import LeaderBoard from './LeaderBoard';
// import MultiplicationTutorial from './MultiplicationTutorial';
// import DivisionTutorial from './DivisionTutorial';
// import AdditionTutorial from './AdditionTutorial';
// import SubtractionTutorial from './SubtractionTutorial';

class InfoSideBar extends Component {
  constructor(props) {
    super(props)
    this.style = {
      marginTop: '-20px',
      marginBottom: '20px'
    }
  }
render() {
  if (this.props.selectedTab === 'tutorial' && this.props.toggleTab) {
    return(
        <div style={this.style}>
        <span>
          HERE ARE SOME TIPS FOR HANDLING MORE COMPLEX PROBLEMS IN YOU HEAD<br/>

ADDITION AND SUBTRACTION<br/>

To solve addition and subtraction problems approach them by moving from left to write as if you were reading in English. This allow you to break it into smaller problems<br/>

<h2>When approaching:</h2><br/>
67 + 28<br/>
<br/>
Start by adding 67 + 20 = 87<br/>
Then add 87 + 8 <br/>
To arrive at 95<br/>


<h2>SUBTRACTION</h2><br/>

This functions similarly for subtraction:<br/>

86 - 25<br/>

Start with:<br/>

86 - 20 = 66<br/>

Then move on to <br/>

66 - 5 = 61<br/>
<br/>
<br/>
<h2>MULTIPLICATION</h2><br/>
<br/>
To solve complex multiplication problems several digits or more, consider this:<br/>
<br/>
974 x 4<br/>

Deconstruct this into a two different <br/>

900 x 4 = 3600<br/>

Round 74 up to a more multipliable number:<br/>

75 x 4 = 300<br/>

3600 + 300 = 3900<br/>

3900 - 4 = 3896<br/>

Remember to reduce the complexity of your problems<br/>
</span>
</div>
      )
  } else {
    return null
  }
  }
}

export default InfoSideBar;