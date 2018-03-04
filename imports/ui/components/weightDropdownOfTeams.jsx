// Package Imports
import React, { Component } from 'react';
import { MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom'


export default class WeightDropdownOfTeams extends Component {

constructor(props) {
    super(props);
}
  render() {
      return (
          <MenuItem>
              <Link to={{pathname: "/app/weightEntry/" + this.props.team._id}}>{this.props.team.name} {this.props.team.season}</Link>
          </MenuItem>
      )
  }
}
