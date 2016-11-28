'use strict';

let express = require('express');
let bodyParser = require('body-parser');
require('dotenv').config();

let app = express();

// create application/json parser
let jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));


let db = require('./db');

app.post('/hong', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    let email = req.body.email;
    let fb_link = req.body.fb_link;

    console.log(email);
    console.log(fb_link);

    let new_user = {
        email: email,
        fb_link: fb_link,
        is_send_mail: false
    };

    // insert db
    db().users.insert(new_user, function (err, newDoc) {
        // res.json({
        //     return: true,
        //     msg: 'Success',
        //     response: newDoc
        // });

        return res.send(req.body);
    });
});

let PORT = process.env.HOST_PORT;

app.listen(PORT, function () {
    console.log('listening on port: ' + PORT);

    require('./wokers/get-fb');
});