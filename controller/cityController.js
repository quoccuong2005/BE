const city = require("../model/city");

exports.getAllCity = (req, res) => {
  city.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};

exports.getCityDetail = (req, res) => {
  const { id } = req.params;
  city.getById(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (!result) return res.status(404).json({ message: "City not found" });
    res.status(200).json({ message: "Success", city: result });
  });
};
exports.createCity = (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  city.create(name, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ message: "City created successfully" });
  });
};
exports.updateCity = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  city.update(id, name, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "City updated successfully" });
  });
};
exports.deleteCity = (req, res) => {
  const { id } = req.params;
  city.delete(id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json({ message: "City deleted successfully" });
  });
};
