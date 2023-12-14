const express = require("express");
const multer = require("multer");
const router = express.Router();
const upload = multer({ limits: { fileSize: 5 * 1024 * 1024 } });

const fileUploadsController = require("../../controller/internal/fileUploadsController");

router.route("/uploads").post(upload.any(), fileUploadsController.uploads);

module.exports = router;
