const tags = require("../model/tags");

exports.getAllTags = (req, res) => {
  tags.getAll((err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.status(200).json(results);
  });
};
