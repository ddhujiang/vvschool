var mysql = require('mysql');
var dbCfg = require('../website.config').websizeCfg.sql;

var pool=mysql.createPool(dbCfg);
pool.connectionLimit=20;
pool.queueLimit=30;
exports.pool=pool;