const express = require("express");
const cityController = require("../controller/cityController");
const router = express.Router();
router.get("/", cityController.getAllCity);
router.get("/:id", cityController.getCityDetail);
router.post("/", cityController.createCity);
router.patch("/:id", cityController.updateCity);
router.delete("/:id", cityController.deleteCity);
module.exports = router;
