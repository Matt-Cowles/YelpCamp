const User = require("../models/user");

module.exports.registerForm = (req, res) => {
  res.render("../views/users/register");
};

module.exports.createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to YelpCamp!");
      res.redirect("/campgrounds");
    });
  } catch (e) {
    console.log(e);
    req.flash("error", e.message);
    res.redirect("/register");
    console.log(e);
  }
};

module.exports.loginForm = (req, res) => {
  res.render("../views/users/login");
};

module.exports.loginUser = (req, res) => {
  req.flash("success", `Welcome back, ${req.body.username}!`);
  const redirectUrl = req.session.returnTo || "/campgrounds";
  delete req.session.returnTo;
  res.redirect(redirectUrl);
};

module.exports.logoutUser = async (req, res) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    req.flash("success", `Goodbye!`);
    res.redirect("/campgrounds");
  });
};
