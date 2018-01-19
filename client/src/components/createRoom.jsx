import React from 'react';
import axios from 'axios';
import _ from 'underscore';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';

class CreateRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      operator: '+',
      difficulty: 1
    }

    this.style = {
      textAlign: 'center',
      marginLeft: '-150px',
      marginBottom: '10px'
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOperatorChange = this.handleOperatorChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDifficultyChange = this.handleDifficultyChange.bind(this)
  }

  handleDifficultyChange (e, index, difficulty) {
    this.setState({difficulty})
  }

  handleNameChange (e, name) {
    this.setState({name})
  }

  handleOperatorChange (e, index, operator) {
    this.setState({operator})
  }

  handleSubmit () {
    if (this.state.name.includes(' ')) {
      window.alert('No spaces in room name please!');
    } else if (this.state.name.length && this.state.operator.length) {
      this.props.addRoom(this.state);
    } else {
      window.alert('All fields are required!');
    }
  }

  render() {
    return ( <div style={this.style}>
        <h4> Create a new room </h4>
        <TextField 
          type="text"
          value={this.state.name} 
          onChange={this.handleNameChange} 
          floatingLabelText={"Name"}
        /><br/>
        <SelectField
          floatingLabelText={"Operator"}
          floatingLabelFixed={true}
          value={this.state.operator}
          onChange={this.handleOperatorChange}
        >     
          <MenuItem value={'+'} primaryText="Addition" />
          <MenuItem value={'-'} primaryText="Subtraction" />
          <MenuItem value={'*'} primaryText="Multiplication" />
          <MenuItem value={'/'} primaryText="Division" />
        </SelectField><br/>
        <SelectField
          floatingLabelText={"Difficulty"}
          floatingLabelFixed={true}
          value={this.state.difficulty}
          onChange={this.handleDifficultyChange}
        >   
          <MenuItem value={1} primaryText="Level 1" />
          <MenuItem value={2} primaryText="Level 2" />
          <MenuItem value={3} primaryText="Level 3" />
        </SelectField><br/>
        <RaisedButton onClick={this.handleSubmit} label="Add"/>
      </div>
    );
  }
}

export default CreateRoom;