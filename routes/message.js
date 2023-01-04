const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController");

router.get("/", messageController.message_list);
router.get("/create", messageController.message_create_get);
router.post("/create", messageController.message_create_post);
router.delete("/:id", messageController.message_delete);

module.exports = router;
