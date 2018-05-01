// Package Imports
import React, {Component} from 'react';
import {MenuItem} from 'react-bootstrap';
import {Link} from 'react-router-dom'
import {Meteor} from "meteor/meteor";
import autoBind from "react-autobind";

class AthleteReportDropdownOfTeams extends Component {
    constructor(props) {
        super(props);
        autoBind(this);
    };

    handleView() {
        let currentUser = Meteor.user();
        let currentUserRole = Meteor.user().roles[0];
        if (currentUser !== null) {
            let check = false;
            for (let i = 0; i < currentUser.profile.teamAccess.length; i++) {
                if (this.props.athletes.teamId === currentUser.profile.teamAccess[i]) {
                    check = true;
                }
            }
            if (currentUserRole === "ADMIN") {
                check = true;
            }
            return check;
        }
        else return false;
    };

    /*Renders link to masterReport for each individual team*/
    render() {
        return (
            <MenuItem>
                {this.handleView() ? this.props.team.name + this.props.team.season : ''}
            </MenuItem>
        )
    }
}

export default AthleteReportDropdownOfTeams;
