const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user.js");
const { savedredirecturl } = require("../middleware.js");

// GET: Signup form
router.get("/signup", (req, res) => {
  res.render("user/signup.ejs");
});

// POST: Register new user
router.post("/signup", async (req, res, next) => {
  try {
    const { username,email,  password } = req.body;
 if (!username || !email || !password) {
      req.flash("error", "All fields are required.");
      return res.redirect("/signup");
    }
    
    const newuser = new User({ username, email });

    const registeredUser = await User.register(newuser, password);
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash("success", "Welcome to Adams University!");
      res.redirect("/idx");
    });
  } catch (e) {
    req.flash("error", e.message || "User already exists.");
    res.redirect("/signup");
  }
});




// GET: Login form
router.get("/login", (req, res) => {
  res.render("user/login.ejs");
});

// // POST: Login logic
router.post(
  "/login",
  savedredirecturl,
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureFlash: true
  }),
  (req, res) => {
     console.log("Logged in user:", req.user); 
    req.flash("success", `Welcome back, ${req.user.username}!`);
    const redirectUrl = res.locals.redirecturl || "/idx";
    res.redirect(redirectUrl);
  }
);


router.get("/admin/allusers", async (req, res) => {
  const users = await User.find({});
  res.send(users.map(u => ({ username: u.username, email: u.email, role: u.role })));
});



// GET: Logout
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.flash("success", "You have been logged out.");
    res.redirect("/idx");
  });
});

module.exports = router;
