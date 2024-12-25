const CV = require("../model/cv");
exports.createCV = (req, res) => {
  const data = req.body;

  // Kiểm tra xem dữ liệu đầu vào có đủ thông tin cần thiết không
  if (
    !data.idCompany ||
    !data.idJob ||
    !data.name ||
    !data.phone ||
    !data.email ||
    !data.description ||
    !data.linkProject ||
    !data.city ||
    data.statusRead === undefined ||
    !data.createAt
  ) {
    return res.status(400).json({
      message: "All CV fields are required",
    });
  }

  // Gọi hàm createCV từ model
  CV.createCV(data, (err, result) => {
    if (err) {
      console.error("Error creating CV:", err);
      return res.status(500).json({
        message: "Failed to create CV",
        error: err.message || "Internal Server Error",
      });
    }

    res.status(201).json({
      message: "CV created successfully",
      cvId: result.insertId,
    });
  });
};
exports.getListCV = (req, res) => {
  CV.getListCV((err, cv) => {
    if (err) {
      console.error("Error fetching CV list:", err);
      return res.status(500).json({
        message: "Failed to fetch CV list",
        error: err.message || "Internal Server Error",
      });
    }
    console.log("CV list:", cv);
    res.status(200).json(cv);
  });
};
exports.getDetailCV = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "CV ID is required",
    });
  }

  CV.getDetailCV(id, (err, cv) => {
    if (err) {
      console.error("Error fetching CV detail:", err);
      return res.status(500).json({
        message: "Failed to fetch CV detail",
        error: err.message || "Internal Server Error",
      });
    }
    if (!cv) {
      return res.status(404).json({
        message: `CV with ID ${id} not found`,
      });
    }
    res.status(200).json(cv);
  });
};

exports.changeStatusCV = (req, res) => {
  const { id } = req.params;
  const { statusRead } = req.body;
  const { statusRead: statu } = statusRead;
  console.log(statu);

  if (!id || statu === undefined) {
    return res.status(400).json({
      message: "CV ID and statusRead are required",
    });
  }

  // Gọi hàm thay đổi trạng thái CV
  CV.changeStatusCV(id, statu, (err, result) => {
    if (err) {
      console.error("Error changing CV status:", err);
      return res.status(500).json({
        message: "Failed to change CV status",
        error: err.message || "Internal Server Error",
      });
    }

    // Kiểm tra xem có bản ghi nào bị ảnh hưởng không
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `CV with ID ${id} not found`,
      });
    }

    res.status(200).json({
      message: "CV status updated successfully",
    });
  });
};

exports.deleteCV = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "CV ID is required",
    });
  }

  CV.deleteCV(id, (err, result) => {
    if (err) {
      console.error("Error deleting CV:", err);
      return res.status(500).json({
        message: "Failed to delete CV",
        error: err.message || "Internal Server Error",
      });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({
        message: `CV with ID ${id} not found`,
      });
    }
    res.status(200).json({
      message: "CV deleted successfully",
    });
  });
};
