const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const companyRoutes = require("./route/companyRouter");
const cityRoutes = require("./route/cityRouter");
const tagsRoutes = require("./route/tagsRouter");
const jobRoutes = require("./route/jobsRouter");
const cvRoutes = require("./route/cvRouter");

const app = express();
const port = 3010;

// Middleware
app.use(cors({ origin: "*" })); // Cho phép CORS
app.use(express.urlencoded({ extended: true })); // Xử lý URL-encoded payloads
app.use(bodyParser.json()); // Xử lý JSON payloads
// app.use(companyRoutes);
// Routes
app.use("/company", companyRoutes);
app.use("/city", cityRoutes);
app.use("/tags", tagsRoutes);
app.use("/jobs", jobRoutes);
app.use("/cv", cvRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
