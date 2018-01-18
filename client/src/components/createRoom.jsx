import React from 'react';
import axios from 'axios';
import _ from 'underscore';

class CreateRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      operator: ''
    }

    this.style = {
      marginTop: '-20px',
      marginBottom: '20px'
    }

    this.handleNameChange = this.handleNameChange.bind(this)
    this.handleOperatorChange = this.handleOperatorChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleNameChange (e) {
    this.setState({
      name: e.target.value
    })
  }

  handleOperatorChange (e) {
    this.setState({
      operator: e.target.value
    })
  }

  handleSubmit () {
    if (this.state.name.includes(' ')) {
      window.alert('No spaces please');
    } else if (this.state.name.length && this.state.operator.length) {
      this.props.addRoom(this.state);
    } else {
      window.alert('Both fields are required!');
    }
  }

  render() {
    return (
      <div>
        <h4> Create a new room </h4>
        Name <input type="text" value={this.state.name} onChange={this.handleNameChange}/>
        Operator 
        <select value={this.state.operator} onChange={this.handleOperatorChange}>
          <option value=""> --Select one--</option>
          <option value="+">Addition</option>
          <option value="-">Subtraction</option>
          <option value="*">Multiplication</option>
          <option value="/">Division</option>
        </select>
        <button onClick={this.handleSubmit}>Add</button>
      </div>
    );
  }
}

export default CreateRoom;