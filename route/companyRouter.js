const express = require("express");
const companyController = require("../controller/companyController");
const router = express.Router();
router.get("/", companyController.getAllCompany);
router.get("/:id", companyController.getCompanyDetail);
router.post("/", companyController.createCompany);
router.patch("/:id", companyController.editCompany);
router.post("/login", companyController.loginCompany);

module.exports = router;
