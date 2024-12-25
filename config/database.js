const mysql = require("mysql2");

const db = mysql.createConnection({
  host: "bqj7wk0anaf5zxuig8ke-mysql.services.clever-cloud.com",
  port: 3306,
  user: "us3ngpct7bxwm7rb",
  password: "Kz1sxmSvga6XbEUFIXwk",
  database: "bqj7wk0anaf5zxuig8ke",
});
db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the database.");
});

module.exports = db;
