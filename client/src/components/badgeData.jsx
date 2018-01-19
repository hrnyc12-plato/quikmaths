import React from 'react'
import Avatar from 'material-ui/Avatar';
import Chip from 'material-ui/Chip';
import IconButton from 'material-ui/IconButton'
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';
import RaisedButton from 'material-ui/RaisedButton';
import styles from '../../www/jStyles.js';

const chipStyles = {
  chip: {
    margin: 5,
    padding: 3
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
    align: 'center'
  },
};

class BadgeData extends React.Component {
  constructor(props) {
    super(props);
    this.columnStyle = {
      paddingLeft: '20px'
    },
    this.tableStyle = {
      borderCollapse: 'collapse',
      marginTop: '-20px',
      marginBottom: '20px',
      width: '100%',
      padding: '20px'
    },
    this.badgeStyle ={
      padding: '0'
    }
  }

  render() {
    // console.log('props passed to BadgeData', this.props)
        return(
          <div>
          {this.props.badges.map(badge => {
            console.log('WHAT IS BADGE', badge)
            return (


            <TableRowColumn >
              <Chip style={styles.chip} >
              {/* <IconButton tooltip="SVG Icon"> */}
                <img width="30" styles={styles.wrapper} height="30" key={badge.name} className={badge.name} src={badge.image}/>
                  {badge.name}
              {/* </IconButton> */}
        </Chip>        
            </TableRowColumn> )}
          )
        }</div>)   
    }
  }


export default BadgeData;