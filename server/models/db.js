const dbConfig = require("../config/db.config.js");

//----------SQLite------------
const sqlite3 = require('sqlite3').verbose();
let connection = new sqlite3.Database('./track.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to  database.');
});


module.exports = connection;