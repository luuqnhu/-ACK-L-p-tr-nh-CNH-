/**
 * Created by Luu Nhu on 01/06/2017.
 */
var express = require("express");
var myParser = require("body-parser");
var router = express();
var jsonParser = myParser.json();
var pool = require('../db');

function add_book(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        var post  = {TenSach: req.body.TenSach, SoLuongConLai: req.body.SoLuongConLai, TacGia: req.body.TacGia,
            Gia:req.body.Gia, NgonNgu:req.body.NgonNgu, SoTrang:req.body.SoTrang,
            AnhBia:req.body.AnhBia, NXB:req.body.NXB, IdTheLoai:req.body.IdTheLoai};
        connection.query("insert into sach set ?",post,function(err,rows){
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

function update_book(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);
        //console.log(req.body.IdSach);

        var post = {TenSach: req.body.TenSach, SoLuongConLai: req.body.SoLuongConLai, TacGia: req.body.TacGia,
            Gia:req.body.Gia, NgonNgu:req.body.NgonNgu, SoTrang:req.body.SoTrang,
            AnhBia:req.body.AnhBia, NXB:req.body.NXB, IdTheLoai:req.body.IdTheLoai};
        connection.query("update sach set ? where IdSach = ?",[post, req.body.IdSach],function(err,rows){
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

function delete_book(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("delete from sach where IdSach = ? ",req.body.IdSach,function(err,rows){
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

function get_by_author(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("Select * from sach where TacGia = ?", [req.params.TacGia],function(err,rows){
            connection.release();
            if(!err) {
                //setValue(rows);
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

function get_by_gerne(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("Select b.* from sach b join theloai g on b.IdTheLoai = g.IdTheLoai where g.IdTheLoai = ?", [req.params.idTheLoai],function(err,rows){
            connection.release();
            if(!err) {
                //setValue(rows);
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

function get_by_language(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("Select * from sach where NgonNgu = ?", [req.params.NgonNgu],function(err,rows){
            connection.release();
            if(!err) {
                //setValue(rows);
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

function get_by_name(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("Select * from sach where TenSach = ?", [req.params.TenSach],function(err,rows){
            connection.release();
            if(!err) {
                //setValue(rows);
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

function get_by_price(req,res) {

    pool.getConnection(function(err,connection){
        if (err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        }

        console.log('connected as id ' + connection.threadId);

        connection.query("Select * from sach where Gia = ?", [req.params.Gia],function(err,rows){
            connection.release();
            if(!err) {
                //setValue(rows);
                res.json(rows);
            }
        });

        connection.on('error', function(err) {
            res.json({"code" : 100, "status" : "Error in connection database"});
            return;
        });
    });
}

router.post("/new",jsonParser, function(req,res){
    add_book(req,res);
});

router.put("/update",jsonParser, function(req,res){
    update_book(req,res);
});

router.delete("/delete",jsonParser, function(req,res){
    delete_book(req,res);
});

router.get("/get/author/:TacGia",function(req,res){
    get_by_author(req,res);
});

router.get("/get/gerne/:idTheLoai",function(req,res){
    get_by_gerne(req,res);
});

router.get("/get/language/:NgonNgu",function(req,res){
    get_by_language(req,res);
});

router.get("/get/name/:TenSach",function(req,res){
    get_by_name(req,res);
});

router.get("/get/price/:Gia",function(req,res){
    get_by_price(req,res);
});

module.exports = router;
