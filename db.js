'use strict';

let Datastore = require('nedb');

module.exports = function () {
    return {
        users: new Datastore({filename: 'databases/users.db', autoload: true})
    };
};