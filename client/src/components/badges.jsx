import React from 'react'
import axios from 'axios'

import request from 'superagent';
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
import BadgeData from './badgeData.jsx';


class Badges extends React.Component {
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
    this.state = {
      badges: [
        {
          name: "speed demon",
          image: "http://res.cloudinary.com/dvurqudmp/image/upload/v1516318064/speed_demon_jutzli.gif"
        },
        {
          name: "angular",
          image: "http://res.cloudinary.com/dvurqudmp/image/upload/v1516318021/angular_ddj0gm.png"
        },
        {
          name: "silver",
          image: "http://res.cloudinary.com/dvurqudmp/image/upload/v1516318064/silver_nquaec.png"
        },{
          name: "react",
          image: "http://res.cloudinary.com/dvurqudmp/image/upload/v1516318064/react_oxtr7w.png"
        }, {
          name: "marksman",
          image: "http://res.cloudinary.com/dvurqudmp/image/upload/v1516318063/marksman_yhztvt.png"
        }, {
          name: "legendary",
          image: "http://res.cloudinary.com/dvurqudmp/image/upload/v1516318063/legendary_euo6p8.png"
        }, {
          name: "epic fail",
          image: "http://res.cloudinary.com/dvurqudmp/image/upload/v1516318064/epic_fail_d3seg8.png"
        }, {
          name: "bronze",
          image: "http://res.cloudinary.com/dvurqudmp/image/upload/v1516318063/bronze_grunno.png"
        }, {
          name: "backbone",
          image: "http://res.cloudinary.com/dvurqudmp/image/upload/v1516318063/backbone_iby6cr.png"
        }, {
          name: "gold",
          image: "http://res.cloudinary.com/dvurqudmp/image/upload/v1516318063/gold_vcfclc.png"
        }
      ]
    }
    this.grabBadgeData = this.grabBadgeData.bind(this);
  }

  grabBadgeData() {
   return this.props.badges.map( (badge,i) => {
     return this.state.badges.find(badgeObj => badgeObj.name === badge);
    })
  }

  // badgesArray = grabBadgeData();

  render() {
    // console.log('Badges is rendering with props?', this.props.badges);
      return (
        <div>
          <Table
            fixedHeader={true}
            fixedFooter={true}
            selectable={false}
            multiSelectable={false}
            style={{width:'700px', margin: 'auto'}}
          >
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
              enableSelectAll={false}
            >
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              stripedRows={false}
            >
              <TableRow>
                <TableRowColumn style={styles.userInfoDataTable}><b>Badges</b></TableRowColumn>    
                <TableRowColumn style={styles.userInfoDataTable} children={<BadgeData badges={this.grabBadgeData()}/>}>    
                </TableRowColumn>  
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )
    } 
}

const Image = (props) => (
  <TableRowColumn >
    <img width="24" height="24" src={image}/>
  </TableRowColumn> 
)

export default Badges;