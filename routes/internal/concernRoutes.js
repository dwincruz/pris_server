const express = require("express");
const router = express.Router();
const concernsController = require("../../controller/internal/concernsController");

router.route("/").get(concernsController.fetchData);

module.exports = router;
