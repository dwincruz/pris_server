const express = require("express");
const router = express.Router();
const usersController = require("../../controller/internal/usersController");

router
  .route("/")
  .get(usersController.fetchUser)
  .post(usersController.createUser);
router.route("/current-logged").post(usersController.currentLoggedUser);

module.exports = router;
