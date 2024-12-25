const express = require("express");
const router = express.Router();
const JobController = require("../controller/jobsController");

router.get("/", JobController.getAll);
router.get("/:id", JobController.getDetailJob);

router.post("/", JobController.createJob);

router.patch("/:id", JobController.updateJob);

router.delete("/:id", JobController.deleteJob);

module.exports = router;
