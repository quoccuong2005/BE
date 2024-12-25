const db = require("../config/database");
const cv = {
  createCV: (data, callback) => {
    const query = `INSERT INTO cv ( idCompany, idJob, name, phone, email, description, linkProject, city, statusRead, createAt)
                   VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
      data.idCompany,
      data.idJob,
      data.name,
      data.phone,
      data.email,
      data.description,
      data.linkProject,
      data.city,
      data.statusRead,
      data.createAt,
    ];

    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Error creating CV in database:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
  getListCV: (callback) => {
    const query = "SELECT * FROM cv";

    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching CV list from database:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },

  getDetailCV: (id, callback) => {
    const query = "SELECT * FROM cv WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error fetching CV detail from database:", err);
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }
      callback(null, results[0]);
    });
  },
  changeStatusCV: (id, statu, callback) => {
    const query = "UPDATE cv SET statusRead = ? WHERE id = ?";
    db.query(query, [statu, id], (err, results) => {
      if (err) {
        console.error("Error updating CV statusRead in database:", err);
        return callback(err, null);
      }

      if (results.affectedRows === 0) {
        return callback(null, { affectedRows: 0 });
      }
      callback(null, results);
    });
  },

  deleteCV: (id, callback) => {
    const query = "DELETE FROM cv WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error deleting CV from database:", err);
        return callback(err, null);
      }
      callback(null, results);
    });
  },
};
module.exports = cv;
