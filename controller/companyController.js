const company = require("../model/company");

exports.getAllCompany = (req, res) => {
  company.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    console.log("hihihihi");
    res.status(200).json(results);
  });
};

exports.getCompanyDetail = (req, res) => {
  const { id } = req.params;
  company.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "company not found" });
    res.status(200).json({ message: "Success", company: result });
  });
};

exports.createCompany = (req, res) => {
  const {
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
  } = req.body;

  if (!companyName || !email || !phone) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  company.create(
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
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(201)
        .json({ message: "Company created successfully", company: result });
    }
  );
};

exports.editCompany = (req, res) => {
  const { id } = req.params;
  console.log("Received PATCH request for company ID:", id);
  console.log("Request Body:", req.body);

  company.getById(id, (err, existingCompany) => {
    if (err) return res.status(500).json({ error: err });
    if (!existingCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    const updatedData = {
      companyName: req.body.companyName || existingCompany.companyName,
      phone: req.body.phone || existingCompany.phone,
      email: req.body.email || existingCompany.email,
      password: req.body.password || existingCompany.password,
      token: req.body.token || existingCompany.token,
      address: req.body.address || existingCompany.address,
      workingTime: req.body.workingTime || existingCompany.workingTime,
      website: req.body.website || existingCompany.website,
      quantityPeople: req.body.quantityPeople || existingCompany.quantityPeople,
      description: req.body.description || existingCompany.description,
      detail: req.body.detail || existingCompany.detail,
    };

    company.update(id, ...Object.values(updatedData), (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res
        .status(200)
        .json({ message: "Company updated successfully", company: result });
    });
  });
};
exports.loginCompany = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email và mật khẩu là bắt buộc" });
  }

  company.getByEmail(email, (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (!result) {
      return res.status(404).json({ message: "Email không tồn tại" });
    }

    if (result.password !== password) {
      return res
        .status(401)
        .json({ message: "Email hoặc mật khẩu không đúng" });
    }

    res.status(200).json({
      message: "Đăng nhập thành công",
      company: {
        id: result.id,
        email: result.email,
        companyName: result.companyName,
        token: result.token,
      },
    });
  });
};
