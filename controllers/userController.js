const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const passport = require("passport");

exports.sign_up_get = (req, res) => {
  if (req.user) {
    return res.redirect("back");
  }

  res.render("signup_form", {
    title: "Sign Up",
    oldData: null,
    errors: null,
  });
};

exports.sign_up_post = [
  (req, res) => {
    if (req.user) {
      return res.redirect("back");
    }
  },

  // Validate user input
  body("firstName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("First name must be specified")
    .matches("^[A-Za-z]+$")
    .withMessage("First name must contain only letters (no spaces)")
    .isLength({ max: 100 })
    .withMessage("First name must contain at most 100 characters"),
  body("lastName")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Last name must be specified")
    .matches("^[A-Za-z]+$")
    .withMessage("Last name must contain only letters (no spaces)")
    .isLength({ max: 100 })
    .withMessage("Last name must contain at most 100 characters"),
  body("username")
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage("Username must be specified")
    .matches("^[A-Za-z0-9]+$")
    .withMessage("Username must contain only letters and digits (no spaces)")
    .isLength({ max: 100 })
    .withMessage("Username must contain at most 100 characters")
    .custom((value) => {
      return User.findOne({ username: value }).then((user) => {
        if (users.length !== null) {
          return Promise.reject("Username already in use");
        }
      });
    }),
  body("password")
    .isLength({ min: 1 })
    .withMessage("Password must be specified"),
  body("confirmPassword")
    .isLength({ min: 1 })
    .withMessage("Password confirmation must be specified")
    .custom((value, { req }) => value === req.body.password)
    .withMessage("Password confirmation does not match password"),

  // Process request
  (req, res, next) => {
    const errors = validationResult(req);

    // Render the form again if there are errors
    if (!errors.isEmpty()) {
      return res.render("signup_form", {
        title: "Sign Up",
        oldData: req.body,
        errors: errors.array(),
      });
    }

    // Data is valid
    const user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      username: req.body.username,
      password: req.body.password, // save as plain text for now
    });

    if (req.body.adminPass === process.env.ADMIN_PASS) {
      user.isAdmin = true;
    }

    user.save((err) => {
      if (err) {
        return next(err);
      }

      res.redirect("/user/login");
    });
  },
];

exports.check_unique = (req, res) => {
  User.findOne({ username: req.params.username }).exec((err, user) => {
    if (err) {
      return next(err);
    }

    if (user === null) {
      res.send({ userExisted: false });
    } else {
      res.send({ userExisted: true });
    }
  });
};

exports.log_in_get = (req, res) => {
  if (req.user) {
    return res.redirect("back");
  }

  res.render("login_form", {
    title: "Log In",
    message: null,
    oldUsername: null,
    oldPassword: null,
  });
};

exports.log_in_post = (req, res, next) => {
  if (req.user) {
    return res.redirect("back");
  }

  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.render("login_form", {
        title: "Log In",
        message: info.message,
        oldUsername: req.body.username,
        oldPassword: req.body.password,
      });
    }

    req.login(user, (err) => {
      if (err) {
        return next(err);
      }

      res.redirect("/");
    });
  })(req, res, next);
};

exports.log_out = (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }

    res.redirect("/user/login");
  });
};

exports.become_member_get = (req, res) => {
  if (!req.user) {
    return res.redirect("/user/login");
  }

  res.render("member_form", {
    title: "Become Member",
    message: "",
  });
};

exports.become_member_post = (req, res) => {
  if (!req.user) {
    return res.redirect("/user/login");
  }

  if (req.body.memberCode !== process.env.MEMBER_CODE) {
    return res.render("member_form", {
      title: "Become Member",
      message: "Wrong answer!",
    });
  }

  User.findByIdAndUpdate(
    req.user._id,
    { isMember: true },
    {},
    (err, updatedUser) => {
      if (err) {
        return next(err);
      }

      res.redirect("/user/become-member");
    }
  );
};
