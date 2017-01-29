'use strict';

const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

let app = express();

// create application/json parser
let jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
let urlencodedParser = bodyParser.urlencoded({ extended: false });

app.use(express.static('public'));

// import neDB
let db = require('./db');

app.post('/hong', urlencodedParser, function (req, res) {
    if (!req.body) return res.sendStatus(400);

    let email = req.body.email;
    let fb_link = req.body.fb_link;

    let new_user = {
        email: email,
        fb_link: fb_link,
        is_send_mail: false
    };

    // insert db
    db().users.insert(new_user, function (err, newDoc) {
        return res.send(req.body);
    });
});


// Start server
let PORT = process.env.HOST_PORT || 6969;

app.listen(PORT, function () {
    console.log('listening on port: ' + PORT);

    // start scheduler
    require('./schedule/get-fb-info');
});
