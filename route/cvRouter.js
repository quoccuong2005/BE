const express = require("express");
const router = express.Router();
const CVController = require("../controller/cvController");

router.post("/", CVController.createCV);

router.get("/", CVController.getListCV);

router.get("/:id", CVController.getDetailCV);

router.patch("/:id/statusRead", CVController.changeStatusCV);

router.delete("/:id", CVController.deleteCV);

module.exports = router;
