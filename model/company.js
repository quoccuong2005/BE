const db = require("../config/database");

const company = {
  getAll: (callback) => {
    db.query("SELECT * FROM company", callback);
  },

  getById: (id, callback) => {
    const query = "SELECT * FROM company WHERE id = ?";
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

  create: (
    companyName,
    phone,
    email,
    password,
    token,
    address,
    workingTime,
    website,
    quantityPeople,
    description,
    detail,
    callback
  ) => {
    const query =
      "INSERT INTO company ( companyName, phone, email, password, token, address, workingTime, website, quantityPeople, description, detail) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    db.query(
      query,
      [
        companyName,
        phone,
        email,
        password,
        token,
        address,
        workingTime,
        website,
        quantityPeople,
        description,
        detail,
      ],
      callback
    );
  },

  update: (
    id,
    companyName,
    phone,
    email,
    password,
    token,
    address,
    workingTime,
    website,
    quantityPeople,
    description,
    detail,
    callback
  ) => {
    const query =
      "UPDATE company SET companyName = ?, phone = ?, email = ?, password = ?, token = ?, address = ?, workingTime = ?, website = ?, quantityPeople = ?, description = ?, detail = ? WHERE id = ?";
    db.query(
      query,
      [
        companyName,
        phone,
        email,
        password,
        token,
        address,
        workingTime,
        website,
        quantityPeople,
        description,
        detail,
        id,
      ],
      callback
    );
  },

  delete: (id, callback) => {
    const query = "DELETE FROM company WHERE id = ?";
    db.query(query, [id], callback);
  },
  getByEmail: (email, callback) => {
    const query = "SELECT * FROM company WHERE email = ?";
    console.log("Executing query:", query, "with email:", email);

    db.query(query, [email], (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return callback(err, null);
      }

      if (results.length > 0) {
        console.log("Query results:", results[0]);
        return callback(null, results[0]);
      } else {
        console.log("No results found for email:", email);
        return callback(null, null);
      }
    });
  },
};

module.exports = company;
