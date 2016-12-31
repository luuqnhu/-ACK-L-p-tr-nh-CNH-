/**
 * Created by Luu Nhu on 12/31/2016.
 */
var express = require("express");
var myParser = require("body-parser");
var router = express();
var mysql     =    require('mysql');
var jsonParser = myParser.json();

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'bookonline',
    debug    :  false
});

function handle_database(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);
        //console.log(req.body.IdUser);

        var post  = {IdUser: req.body.IdUser, IdBook: req.body.IdBook, SoLuong: req.body.SoLuong,
                    DiaChiNhan: req.body.DiaChiNhan, SDTNhan: req.body.SDTNhan, IdDonHang: req.body.IdDonHang};
        connection.query("insert into chitietdonhang set ?",post,function(err,rows){
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

router.post("/",jsonParser, function(req,res){
    handle_database(req,res);
});

module.exports = router;
