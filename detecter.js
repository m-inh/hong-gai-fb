'use strict';

const request = require('request');
const cheerio = require('cheerio');

module.exports = function (url) {
    return new Promise((resolve, reject) => {
        let options = {
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.98 Safari/537.36'
            }
        };

        request(options, (error, response, body) => {
            if (!error) {
                let detect = detectActivePage(body);
                resolve(detect);
            } else {
                reject(error);
            }
        });
    });
};

function detectActivePage(content) {
    let $ = cheerio.load(content);
    let $class = $('._4-do');

    return !($class.length);
}