import React from 'react';
import _ from 'underscore';

class BarGraph extends React.Component {
  constructor (props) {
    super(props);
  }

  componentDidUpdate () {
    this.createGraph();
  }

  createGraph () {
    let valuesColumn = [this.props.dataType];
    let xLabels = ['x'];
    this.props.data.forEach((user, i) => {
      valuesColumn.push(user.value);
      xLabels.push(user.name);
    });
    
    let chart = c3.generate({
      data: {
        x: 'x',
        columns: [xLabels, valuesColumn],
        type: 'bar'
      },
      bar: {
        width: {
          ratio: 0.5
        }
      },
      axis: {
        x: {
          type: 'category'
        },
        y: {
          label: {
            text: this.props.dataType
          },
          // tick: {
          //   format: d3.format('$')
          // }
        }
      }
    });
  }

  render () {
    return (
      <div>
        <div id="chart"></div>
      </div>
    );
  }
}

export default BarGraph;