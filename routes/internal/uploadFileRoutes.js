const express = require("express");
const router = express.Router();
const fileUploadsController = require("../../controller/internal/fileUploadsController");

router.route("/auth/google").get(fileUploadsController.authCredentials);
router.route("/google/redirect").get(fileUploadsController.redirect);
module.exports = router;
