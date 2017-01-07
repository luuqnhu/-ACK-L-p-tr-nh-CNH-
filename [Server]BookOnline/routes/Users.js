var express = require('express');
var myParser = require("body-parser");
var router = express();
var jsonParser = myParser.json();
var jwt    = require('jsonwebtoken');
var pool = require('../db');
var config  = require('../config');
var _       = require('lodash');
var apiRoutes = express.Router();

//create token
function createToken(user) {
    return jwt.sign(user, config.secretKey,{ expiresIn: '1h' });
}

//create
function add_user(req,res) {
    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        if (!req.body.Username || !req.body.Password) {
            return res.json({success:false, message:'You must send the username and the password'});
        }
        getUserDB(req.body.Username, function(user){
            if(!user){
                var post  = {Username: req.body.Username, Password: req.body.Password, Fullname: req.body.Fullname,
                    Email:req.body.Email, Phone:req.body.Phone, Level: "normal"};
                connection.query("insert into users set ?",post,function(err,rows){
                    connection.release();
                    if(!err) {
                        res.json(rows);
                    }
                });
            }
            else res.json({success:false, message:'A user with that username already exists'});
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

//find user in database
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

//login & authenticate
function login_authenticate(req, res){
    // find the user
    if (!req.body.Username || !req.body.Password){
        return res.json({success: false, message: 'You must send the username and the password'});
    }

    getUserDB(req.body.Username, function(user){
        if(!user){
            return res.json({success: false, message: 'Authentication failed. User not found.'});
        }
        else if(user) {
            // check if password matches
            if (user.Password != req.body.Password) {
                res.json({success: false, message: 'Authentication failed. Wrong password.'});
            } else {
                // if user is found and password is right
                // create a token
                //var secretKey = "don't share this key";
                //var token = createToken(user);

                // return the information including token as JSON
                res.json({
                    success: true,
                    message: 'Login successfully!',
                    token: createToken(user)
                });
            }
        }

    });
}

//verify token
function verifyToken(req, res, next) {
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

//get all user
function get_all_users(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("SELECT * FROM users",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

//get detail user
function get_detail_user(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("SELECT * FROM users where Username = ?",[req.params.Username],function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

//update user
function update_user(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);
        //console.log(req.body.IdSach);

        var post = {Username: req.body.Username, Password: req.body.Password,
                    Fullname: req.body.Fullname,Email:req.body.Email, Phone:req.body.Phone};
        connection.query("update users set ? where IdUser = ?",[post, req.body.IdUser],function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

//delete user
function delete_user(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("delete from users where IdUser = ? ",req.body.IdUser,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }
        });
        //console.log(req.body.TenTheLoai);

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

router.use("/api", function(req, res, next){
    verifyToken(req, res, next);
});

router.get("/api/get/all",function(req,res){
    get_all_users(req,res);
});

router.get("/api/get/detail/:Username",function(req,res){
    get_detail_user(req,res);
});

router.put("/api/update",jsonParser, function(req,res){
    update_user(req,res);
});

router.delete("/api/delete",jsonParser, function(req,res){
    delete_user(req,res);
});

router.post("/create",jsonParser, function(req,res){
    add_user(req,res);
});

router.post("/login", jsonParser, function(req, res){
   login_authenticate(req, res);
});

module.exports = router;
