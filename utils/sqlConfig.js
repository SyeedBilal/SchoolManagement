const mysql = require('mysql2');
require('dotenv').config();

const pool = mysql.createPool(process.env.MYSQL_PUBLIC_URL);
const promisePool = pool.promise();

// Test connection
promisePool.execute('SELECT 1')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection failed:', err));

module.exports = promisePool;