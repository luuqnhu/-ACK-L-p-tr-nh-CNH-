/**
 * Created by Luu Nhu on 12/20/2016.
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
        //console.log(req.body.TenSach);

        var post  = {TenSach: req.body.TenSach, SoLuongConLai: req.body.SoLuongConLai, TacGia: req.body.TacGia,
                    Gia:req.body.Gia, NgonNgu:req.body.NgonNgu, SoTrang:req.body.SoTrang,
                    AnhBia:req.body.AnhBia, NXB:req.body.NXB, IdTheLoai:req.body.IdTheLoai};
        connection.query("insert into sach set ?",post,function(err,rows){
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
