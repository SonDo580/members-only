const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/signup", userController.sign_up_get);
router.post("/signup", userController.sign_up_post);
router.get("/login", userController.log_in_get);
router.post("/login", userController.log_in_post);
router.get("/become-member", userController.become_member_get);
router.post("/become-member", userController.become_member_post);

module.exports = router;
