/**
 * Created by Luu Nhu on 01/06/2017.
 */
var express = require("express");
var myParser = require("body-parser");
var router = express();
var jsonParser = myParser.json();
var pool = require('../db');

function add_order_detail(req,res) {

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

router.post("/new",jsonParser, function(req,res){
    add_order_detail(req,res);
});

module.exports = router;
