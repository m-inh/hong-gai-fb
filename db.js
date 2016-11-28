var Datastore = require('nedb');

var db = {};
db.users = new Datastore({filename: 'databases/users.db', autoload: true});

module.exports = db;