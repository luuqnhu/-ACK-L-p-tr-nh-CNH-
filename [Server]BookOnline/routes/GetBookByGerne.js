/**
 * Created by 19872406 on 30/11/2016.
 */
var express   =    require("express");
var router = express.Router();
var mysql     =    require('mysql');

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

        connection.query("SELECT Name FROM book join bookdetail on book.ID = bookdetail.BookID WHERE Gerne = ?",[req.params.Gerne],function(err,rows){
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

router.get("/:Gerne",function(req,res){
    handle_database(req,res);
});

module.exports = router;