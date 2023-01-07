const Message = require("../models/message");

exports.message_list = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Home Page");
};

exports.message_create_get = (req, res) => {
  res.render("message_form", {
    title: "Create Message",
  });
};

exports.message_create_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Create Message POST");
};

exports.message_delete = (req, res) => {
  res.send("NOT IMPLEMENTED: Delete Message");
};
