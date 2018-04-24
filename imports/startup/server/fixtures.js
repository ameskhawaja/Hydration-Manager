// Populate User collection (in accounts-base)
//   - For 'development' & 'staging' environments
// Package Imports
import {Meteor} from 'meteor/meteor';
import {Accounts} from 'meteor/accounts-base';
import {Roles} from 'meteor/alanning:roles';
import {_} from 'meteor/underscore';

// Custom File & Collection Imports

const users = [
    {   // Head Admin Account.
        email: 'hydration@usc.com',
        password: 'password',
        profile: {
            phone: '18031234567',
            head: true,
        },
        roles: ['ADMIN'],
    },
    {   // Head Dev Account.
        email: 'dev_hydration@usc.com',
        password: 'capstone',
        profile: {
            phone: '18039606328',
            head: false,
        },
        roles: ['ADMIN'],
    },
];
users.forEach(({email, password, profile, roles}) => {
    const userExists = Meteor.users.findOne({'emails.address': email});
    if (!userExists) {
        const userId = Accounts.createUser({email, password, profile});
        //Roles.addUsersToRoles(userId, roles);
        console.log(roles);
        Roles.setUserRoles(userId, roles);
    }
});
//}