const jobs = require("../model/jobs");

// Lấy tất cả các công việc
exports.getAll = (req, res) => {
  jobs.getAll((err, jobs) => {
    if (err) {
      console.error("Error fetching jobs:", err);
      return res.status(500).json({
        message: "Failed to fetch jobs",
        error: err.message || "Internal Server Error",
      });
    }
    console.log("Get All Jobs Successful");
    res.status(200).json(jobs);
  });
};

// Thêm công việc mới
exports.createJob = (req, res) => {
  const job = req.body;

  // Kiểm tra dữ liệu đầu vào
  if (!job || !job.name || !job.idCompany || typeof job.name !== "string") {
    return res.status(400).json({
      message:
        "Missing required fields: 'name' or 'idCompany' or invalid data type",
    });
  }

  console.log("Creating job with data:", job); // Log dữ liệu nhận được từ client

  jobs.createJob(job, (err, result) => {
    if (err) {
      console.error("Error adding job:", err); // Log lỗi chi tiết
      return res.status(500).json({
        message: "Failed to add job",
        error: err.message || "Internal Server Error",
      });
    }
    console.log("Add Job Successful with ID:", result.insertId); // Log thành công
    res.status(201).json({
      message: "Job added successfully",
      jobId: result.insertId,
    });
  });
};

// Lấy chi tiết công việc theo ID
// Lấy chi tiết công việc theo ID
exports.getDetailJob = (req, res) => {
  const { id } = req.params; // Lấy ID từ URL

  // Kiểm tra ID có hợp lệ không
  if (!id) {
    return res.status(400).json({
      message: "Job ID is required",
    });
  }

  // Thêm log để kiểm tra ID
  console.log("Fetching job with ID:", id);

  jobs.getDetailJob(id, (err, job) => {
    if (err) {
      console.error("Error fetching job detail:", err);
      return res.status(500).json({
        message: "Failed to fetch job detail",
        error: err.message || "Internal Server Error",
      });
    }
    if (!job) {
      return res.status(404).json({
        message: `Job with ID ${id} not found`,
      });
    }
    console.log("Get Detail Job Successful");
    res.status(200).json(job);
  });
};
// Cập nhật công việc
// Cập nhật công việc (PATCH)
exports.updateJob = (req, res) => {
  const { id } = req.params; // Lấy ID từ URL
  const updatedData = req.body; // Dữ liệu cập nhật từ client

  // Kiểm tra ID và dữ liệu đầu vào
  if (!id) {
    return res.status(400).json({
      message: "Job ID is required",
    });
  }

  if (!updatedData || Object.keys(updatedData).length === 0) {
    return res.status(400).json({
      message: "No data provided to update",
    });
  }

  console.log("Updating job with ID:", id, "Data:", updatedData); // Log để kiểm tra

  jobs.updateJob(id, updatedData, (err, result) => {
    if (err) {
      console.error("Error updating job:", err);
      return res.status(500).json({
        message: "Failed to update job",
        error: err.message || "Internal Server Error",
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `Job with ID ${id} not found`,
      });
    }
    console.log("Update Job Successful for ID:", id);
    res.status(200).json({
      message: "Job updated successfully",
    });
  });
};
// Xóa công việc
exports.deleteJob = (req, res) => {
  const { id } = req.params; // Lấy ID từ URL

  // Kiểm tra ID có hợp lệ không
  if (!id) {
    return res.status(400).json({
      message: "Job ID is required",
    });
  }

  console.log("Deleting job with ID:", id); // Log để kiểm tra ID

  jobs.deleteJob(id, (err, result) => {
    if (err) {
      console.error("Error deleting job:", err);
      return res.status(500).json({
        message: "Failed to delete job",
        error: err.message || "Internal Server Error",
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `Job with ID ${id} not found`,
      });
    }
    console.log("Delete Job Successful for ID:", id);
    res.status(200).json({
      message: "Job deleted successfully",
    });
  });
};
