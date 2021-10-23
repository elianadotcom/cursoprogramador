var mysql = require('mysql');
var util = require('util');
<<<<<<< HEAD

var pool  = mysql.createPool({
  connectionLimit : 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB_NAME
});
=======
var pool  = mysql.createPool({
  connectionLimit : 10,
  host            : process.env.MYSQL_HOST,
  user            : process.env.MYSQL_USER,
  password        : process.env.MYSQL_PASSWORD,
  database        : process.env.MYSQL_DB_NAME
})
>>>>>>> 374aaacd5c78c0f6fb85b1630d5b8ed753633b24

pool.query = util.promisify(pool.query);

module.exports = pool;
