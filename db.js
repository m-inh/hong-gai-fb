var Datastore = require('nedb');

// var db = {};
// db.users = ;

module.exports = function () {
    return {
        users: new Datastore({filename: 'databases/users.db', autoload: true})
    };
};