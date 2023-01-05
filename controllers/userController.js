const User = require("../models/user");
const { body, validationResult } = require("express-validator");

exports.sign_up_get = (req, res) => {
  res.render("signup_form", {
    title: "Sign Up",
    user: null,
    errors: null,
  });
};

exports.sign_up_post = [
  // Validate user input
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified")
    .matches("^[A-Za-z]+$")
    .withMessage("First name must contain only letters (no spaces)"),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified")
    .matches("^[A-Za-z]+$")
    .withMessage("Last name must contain only letters (no spaces)"),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must be specified")
    .matches("^[A-Za-z0-9]+$")
    .withMessage("Username must contain only letters and digits (no spaces)"),
  body("password")
    .isLength({ min: 1 })
    .withMessage("Password must be specified"),
  body("confirmPassword")
    .isLength({ min: 1 })
    .withMessage("Password confirm must be specified"),

  // Process request
  (req, res, next) => {
    const errors = validationResult(req);

    // Render the form again if there are errors
    if (!errors.isEmpty()) {
      res.render("signup_form", {
        title: "Sign Up",
        user: req.body,
        errors: errors.array(),
      });
      return;
    }
  },
];

exports.log_in_get = (req, res) => {
  res.render("login_form", { title: "Log In" });
};

exports.log_in_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Log In POST");
};

exports.become_member_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Become Member GET");
};

exports.become_member_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Become Member POST");
};
