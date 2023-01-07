const Message = require("../models/message");

const { body, validationResult } = require("express-validator");

exports.message_list = (req, res, next) => {
  res.send("NOT IMPLEMENTED: Home Page");
};

exports.message_create_get = (req, res) => {
  res.render("message_form", {
    title: "Create Message",
    oldData: null,
    errors: null,
  });
};

exports.message_create_post = [
  // Validate and sanitize input
  body("title")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Title must be specified")
    .isLength({ max: 300 })
    .withMessage("Title must contain at most 300 characters"),
  body("content")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Content must be specified"),

  // Process request
  (req, res, next) => {
    const errors = validationResult(req);

    // Render the form again if there are errors
    if (!errors.isEmpty()) {
      return res.render("message_form", {
        title: "Create Message",
        oldData: req.body,
        errors: errors.array(),
      });
    }

    const message = new Message({
      title: req.body.title,
      content: req.body.content,
      author: req.user,
    });

    message.save((err) => {
      if (err) {
        return next(err);
      }

      res.redirect("/message");
    });
  },
];

exports.message_delete = (req, res) => {
  res.send("NOT IMPLEMENTED: Delete Message");
};
