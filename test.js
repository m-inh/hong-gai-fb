var async = require('async');
var db = require('./db');

setInterval(function () {
    console.log('ok men');
    db().users.find({}, function (err, users) {
        if (!err) {
            // console.log(users);

            async.each(users,
                function (user, cb) {
                    console.log(user);

                    cb();
                },
                function (err) {
                    if (!err){
                        console.log('ok men 2');
                    }
                })
        }
    })
}, 2000);