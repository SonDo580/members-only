const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router
  .route("/signup")
  .get(userController.sign_up_get)
  .post(userController.sign_up_post);

router
  .route("/login")
  .get(userController.log_in_get)
  .post(userController.log_in_post);

router.get("/logout", userController.log_out);

router
  .route("/become-member")
  .get(userController.become_member_get)
  .post(userController.become_member_post);

router.get("/check-unique/:username", userController.check_unique);

module.exports = router;
