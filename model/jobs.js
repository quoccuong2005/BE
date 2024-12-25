const db = require("../config/database");
const { getDetailjob } = require("../controller/jobsController");

const jobs = {
  getAll: (callback) => {
    const query = "SELECT * FROM jobs";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return callback(err, null);
      }

      const formattedResults = results.map((job) => ({
        ...job,
        tags: job.tags ? JSON.parse(job.tags) : [],
        city: job.city ? JSON.parse(job.city) : [],
      }));
      return callback(null, formattedResults);
    });
  },

  createJob: (data, callback) => {
    const createAt =
      data.createAt && !isNaN(new Date(data.createAt))
        ? new Date(data.createAt)
        : new Date();
    const updateAt =
      data.updateAt && !isNaN(new Date(data.updateAt))
        ? new Date(data.updateAt)
        : new Date();

    const formattedCreateAt = createAt
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    const formattedUpdateAt = updateAt
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");

    const query =
      "INSERT INTO jobs (idCompany, name, tags, salary, description, status, city, createAt, updateAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      data.idCompany,
      data.name,
      JSON.stringify(data.tags || []),
      data.salary || 0,
      data.description || "",
      data.status || "open",
      JSON.stringify(data.city || []),
      formattedCreateAt,
      formattedUpdateAt,
    ];

    console.log("Executing query to add job:", query, values);

    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Error inserting job into database:", err);
        return callback(
          {
            message: "Failed to add job",
            error: err.message || "Database error",
          },
          null
        );
      }

      console.log("Job added successfully with ID:", results.insertId);
      callback(null, { jobId: results.insertId });
    });
  },

  getDetailJob: (idJob, callback) => {
    const query = "SELECT * FROM jobs WHERE id = ?";
    db.query(query, [idJob], (err, results) => {
      if (err) {
        console.error("Error fetching job detail:", err);
        return callback(err, null);
      }
      if (results.length === 0) {
        return callback(null, null);
      }

      const job = {
        ...results[0],
        tags: results[0].tags ? JSON.parse(results[0].tags) : [],
        city: results[0].city ? JSON.parse(results[0].city) : [],
      };

      return callback(null, job);
    });
  },
  updateJob: (id, data, callback) => {
    const updateAt = new Date().toISOString().slice(0, 19).replace("T", " ");

    const fields = [];
    const values = [];

    Object.keys(data).forEach((key) => {
      if (key !== "id" && key !== "createAt") {
        fields.push(`${key} = ?`);
        if (key === "tags" || key === "city") {
          values.push(JSON.stringify(data[key]));
        } else {
          values.push(data[key]);
        }
      }
    });

    fields.push("updateAt = ?");
    values.push(updateAt);

    values.push(id);

    const query = `UPDATE jobs SET ${fields.join(", ")} WHERE id = ?`;

    console.log("Executing query to update job:", query, values);

    db.query(query, values, (err, results) => {
      if (err) {
        console.error("Error updating job in database:", err);
        return callback(err, null);
      }

      console.log("Job updated successfully:", results);
      callback(null, results);
    });
  },
  deleteJob: (id, callback) => {
    const query = "DELETE FROM jobs WHERE id = ?";

    console.log("Executing query to delete job:", query, id);

    db.query(query, [id], (err, results) => {
      if (err) {
        console.error("Error deleting job from database:", err);
        return callback(err, null);
      }

      console.log("Job deleted successfully:", results);
      callback(null, results);
    });
  },
};

module.exports = jobs;
