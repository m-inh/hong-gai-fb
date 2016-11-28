// var request = require('request');

'use strict';

function getFbUser(fb_link, cb) {
    request(fb_link, function (error, response, body) {
        console.log(response);
        // console.log(response.headers);
        // console.log(body);

        if (!error) {
            if (response.statusCode == 200){
                cb(false, true);
            } else {
                cb(false, false);
            }
        } else {
            cb(true);
        }
    });
}

// getFbUser('https://www.facebook.com/thuquynh.171', function (err, isActived) {
//     if (!err){
//         if (isActived){
//             console.log('Active');
//         } else {
//             console.log('Deactive');
//         }
//     }
// });

let unirest = require('unirest');
let Request = unirest.get('https://www.facebook.com/thuquynh.171')
.end(response => {
    console.log(response.status);
    });