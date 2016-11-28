var express = require('express');
var bodyParser = require('body-parser');

var app = express();

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));


var db = require('./db');

app.post('/hong', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    var email = req.body.email;
    var fb_link = req.body.fb_link;

    console.log(email);
    console.log(fb_link);

    var new_user = {
        email: email,
        fb_link: fb_link
    };

    // insert db
    db.users.insert(new_user, function (err, newDoc) {
        // res.json({
        //     return: true,
        //     msg: 'Success',
        //     response: newDoc
        // });

        return res.send(req.body);
    });
});

app.listen(3001, function () {
    console.log('listening on port 3000!');
});