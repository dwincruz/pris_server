const express = require("express");
const router = express.Router();
const otherConcernsController = require("../../controller/internal/concernsController");

router.route("/").get(otherConcernsController.fetchComplaint);
// .post(otherConcernsController.createComplaint);

module.exports = router;
