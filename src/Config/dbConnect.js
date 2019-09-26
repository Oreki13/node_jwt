require("dotenv/config");
const mysql = require("mysql");

const dbConfig = mysql.createConnection({
  host: process.env.DB_HOST || "remotemysql.com",
  user: process.env.DB_USER || "uCVrrTvHJf",
  password: process.env.DB_PASSWORD || "OS6klfusg4",
  database: process.env.DB_DATABASE || "uCVrrTvHJf"
});

dbConfig.connect(error => {
  if (error) throw error;
});

module.exports = dbConfig;
