// Package Imports
import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Roles } from 'meteor/alanning:roles';
import { Table, Glyphicon, Checkbox } from 'react-bootstrap';
import ROLES from '../../api/Users/roles';

import autoBind from 'react-autobind';

/*Administration Dashboard*/
class AdminDash extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
  }

  // componentWillMount() {
  //   Roles.userIsInRole(user, ["ADMIN"]);
  // }

  /*Subscriptions*/
  componentWillUnmount() {
    this.props.subscriptions.forEach((s) =>{
      s.stop();
    });
  }

  /*Method that checks the status of the current user for authentication*/
  checkIfCurrentUser(mappedUserId, currentUserId) {
    return mappedUserId === currentUserId;
  }
  /*Method for changing the role of a user*/
  handleRoleChange(update_obj) {
    Meteor.call('users.changeRole', update_obj, (error) => {
      if (error) {
        Bert.alert(error.reason, 'danger');
      } else {
        Bert.alert('Role updated!', 'success');
      }
    });
  }

  //<Link to={{ pathname: `/admin/users/${user._id}` }}>{user.profile.name.first}</Link>
  //{!!isCurrentUser ? <Glyphicon glyph="star" /> : ''}
  /*Gathers user data*/
  showUsersList() {
    const users = this.props.usersList;
    const selectRoles = ROLES;  //this.props.allRoles;
    console.log(selectRoles);
    return (
      <tbody>
      {
        users.map((user) => {
          const isCurrentUser = this.checkIfCurrentUser(user._id, this.props.userId );
          const userRole = Roles.getRolesForUser(user._id);
          return (
          <tr key={user._id}>
            <td width="5%">
              {!!isCurrentUser ? <Glyphicon glyph="ok" /> : ''}
            </td>
            <td>
              {user.profile.name.first} {user.profile.name.last}
            </td>
            <td>{user.emails[0].address}</td>
            <td width="5%">
              <Checkbox onChange={() => console.log("Hello")}/>
            </td>
            <td>
              <select
                  className="form-control"
                  value={userRole[0]}
                  onChange={ (event) => { this.handleRoleChange({_id:user._id, role:event.target.value}); } }
                >
                  { selectRoles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  )) }
                </select>
            </td>
          </tr>
        )})
      }
      </tbody>
    )
  }
  /*Loading Progress Panel*/
  showLoading() {
    if (!this.props.loading || 0 < _.size(this.props.usersList)) {
      return false;
    }
    return (
      <div><p>Loading</p></div>
    );
  }
  /*Displays Table of Users, including Name, Email, Verification Status, and Role Status*/
  render() {
    return (
      <div>
          <p>Admin Page</p>
        <Table className="AdminTable" striped bordered condensed hover responsive >
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Email</th>
              <th>Verified</th>
              <th>Roles</th>
            </tr>
          </thead>
          {this.showUsersList()}
        </Table>
      </div>
    )
  }
};

AdminDash.propTypes = {
  subscriptions: PropTypes.array,
  loading: PropTypes.bool,
  usersList: PropTypes.array,
  userId: PropTypes.string,
};

// Fetch User & Role data from server
export default withTracker(() =>{
  const subscription = Meteor.subscribe('users.all');
  const loading = !subscription.ready();
  const usersList = !loading ? Meteor.users.find().fetch() : [];
  // const roleSubcription = Meteor.subscribe('users.roles');
  // const allRoles = !roleSubcription.ready() ? [] : Roles.getAllRoles().fetch();
  const allRoles = Roles.getAllRoles().fetch();

  return {
    subscriptions: [subscription],
    loading,
    usersList,
    allRoles,
  };

})(AdminDash);
