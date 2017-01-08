/**
 * Created by Luu Nhu on 01/06/2017.
 */
var mysql     =    require('mysql');
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'sql9.freemysqlhosting.net',
    user     : 'sql9152864',
    password : 'E7IvykLLsK',
    database : 'sql9152864',
    debug    :  false
});

module.exports = pool;
