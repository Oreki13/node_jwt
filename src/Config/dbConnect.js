require("dotenv/config");
const mysql = require("mysql");

const dbConfig = mysql.createConnection({
  host: process.env.DB_HOST || "remotemysql.com",
  user: process.env.DB_USER || "uCVrrTvHJf",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_DATABASE || "uCVrrTvHJf"
});

dbConfig.connect(error => {
  if (error) throw error;
});

module.exports = dbConfig;

// DB_HOST = 'localhost'
// DB_USER = 'root'
// DB_PASSWORD = ''
// DB_DATABASE = 'store_v2'
// PORT = 8080
// NODE_ENV = 'Devploment'
// SECRET_KEY = "skuy"
// REQUEST_HEADERS= 'soul'
