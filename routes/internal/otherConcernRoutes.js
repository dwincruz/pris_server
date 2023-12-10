const express = require("express");
const router = express.Router();
const otherConcernsController = require("../../controller/internal/otherConcernsController");

router
  .route("/")
  .get(otherConcernsController.fetchComplaint)
  .post(otherConcernsController.createComplaint);

module.exports = router;
