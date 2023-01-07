const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

router.get("/", messageController.message_list);

router
  .route("/create")
  .get(messageController.message_create_get)
  .post(messageController.message_create_post);

router.delete("/:id", messageController.message_delete);

module.exports = router;
