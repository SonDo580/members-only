exports.sign_up_get = (req, res) => {
  res.render("signup_form", { title: "Sign Up" });
};

exports.sign_up_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Sign Up POST");
};

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
