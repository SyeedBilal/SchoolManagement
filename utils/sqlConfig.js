// db.js
const mysql = require('mysql2');
require('dotenv').config();

// Create a connection pool
const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,                 
  waitForConnections: true,
  connectionLimit: 10,     
  queueLimit: 0
});

// Export the pool as a promise-enabled version
const promisePool = pool.promise();
module.exports = promisePool;
