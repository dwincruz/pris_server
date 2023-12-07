require("dotenv").config();
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: process.env.NODE_DB_HOST,
  user: process.env.NODE_DB_USER,
  password: process.env.NODE_DB_PASSWORD,
  database: process.env.NODE_DB_DATABASE,
});

module.exports = pool.promise();
