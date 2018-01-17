import React from 'react';
import ReactDOM from 'react-dom';

import { Switch, Route, HashRouter } from 'react-router-dom';
import Main from './main.jsx';
import GameRoom from './components/gameRoom.jsx';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <main>
        <Switch>
          <Route exact path="/" component={Main}/>
          <Route exact path="/rooms/:name" component={GameRoom}/>
        </Switch>
      </main>
    );
  }
}


ReactDOM.render((
  <MuiThemeProvider>
    <HashRouter>
      <App />
    </HashRouter>
  </MuiThemeProvider>
), document.getElementById('mount'));