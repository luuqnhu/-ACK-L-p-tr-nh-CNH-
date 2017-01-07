/**
 * Created by Luu Nhu on 01/07/2017.
 */
var express = require('express');
var myParser = require("body-parser");
var router = express();
var jsonParser = myParser.json();
var jwt    = require('jsonwebtoken');
var pool = require('../db');
var config  = require('../config');
var _       = require('lodash');

function getUserDB(Username, done) {
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query('SELECT * FROM users WHERE Username = ? LIMIT 1', [Username], function(err, rows, fields) {
            if (err) throw err;
            done(rows[0]);
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

module.exports = {
    verifyToken: function verifyToken(req, res, next) {
        // check header or url parameters or post parameters for token
        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        // decode token
        if (token) {
            // verifies secret and checks exp
            jwt.verify(token, config.secretKey, function (err, decoded) {
                if (err) {
                    return res.json({success: false, message: 'Failed to authenticate token.'});
                } else {
                    // if everything is good, save to request for use in other routes
                    req.decoded = decoded;
                    next();
                }
            });

        } else {

            // if there is no token
            // return an error
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    }
};

