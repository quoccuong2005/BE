const db = require("../config/database");
const { getAll } = require("./company");
const tags = {
  getAll: (callback) => {
    db.query("SELECT * FROM tags", callback);
  },
};
module.exports = tags;
