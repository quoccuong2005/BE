const db = require("../config/database");
const city = {
  getAll: (callback) => {
    db.query("SELECT * FROM city", callback);
  },
  getById: (id, callback) => {
    const query = "SELECT * FROM city WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        return callback(err, null);
      }
      if (results.length > 0) {
        return callback(null, results[0]);
      } else {
        return callback(null, null);
      }
    });
  },
  create: (name, callback) => {
    const query = "INSERT INTO city (name) VALUES (?)";
    db.query(query, [name], callback);
  },
  update: (id, name, callback) => {
    const query = "UPDATE city SET name = ? WHERE id = ?";
    db.query(query, [name, id], callback);
  },
  delete: (id, callback) => {
    const query = "DELETE FROM city WHERE id = ?";
    db.query(query, [id], callback);
  },
};
module.exports = city;
