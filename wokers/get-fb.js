var async = require('async');
var db = require('../db');
var mailService = require('../core/email-service');
var detecter = require('../detecter');

setInterval(function () {
    console.log('----------------START----------------');
    db().users.find({is_send_mail: false}, function (err, users) {
        if (!err) {
            // console.log(users);

            async.each(users,
                function (user, cb) {
                    console.log(user);
                    detecter(user.fb_link)
                        .then(function (isActived) {
                            console.log('is actived: ' + isActived);
                            if (isActived) {

                                mailService.sendHongFb(user, function (err) {
                                    if (!err) {
                                        db().users.remove(
                                            {_id: user._id},
                                            {},
                                            function (err, numbReplace) {
                                                cb();
                                            });
                                    } else {
                                        cb();
                                    }
                                });
                            } else {
                                cb();
                            }
                        }).catch(function (err) {
                        console.log(err);

                        cb();
                    });
                },
                function (err) {
                    if (!err) {
                        console.log('----------------END-------------------');
                    }
                })
        }
    })
}, 10000);