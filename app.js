
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const User = require("./models/user.js");
const session = require("express-session");
const path = require("path");
const methodOverride = require('method-override');
const ejsMate = require("ejs-mate");
const passport = require('passport');
const LocalStrategy = require('passport-local');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');
const dotenv = require("dotenv");

// Correct MongoDB URI from .env
const dburl = process.env.ATLASDB_URL;
dotenv.config();


mongoose.connect(dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
})
  .then(() => {
    console.log(" MongoDB Connected");

    // Start server only after DB is connected
    app.listen(2000, () => {
      console.log(" Server running on port 2000");
    });
  })
  .catch(err => {
    console.error(" DB Connection failed:", err);
  });

// View engine & middleware
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine('ejs', ejsMate);
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.json());


const store=MongoStore.create({
  mongoUrl:dburl,
  crypto:{
    secret:process.env.SECRET,
  },
  touchAfter:24*3600,
});

store.on("error",()=>{
  console.log("ERROR IN MONGO SESSIONSTORE",err);
})
// Session config
const sessionoptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
};

app.use(session(sessionoptions));
app.use(flash());

// Passport config
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Flash & user middleware
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.curruser = req.user;
  next();
});

// Routes
const rec = require("./routes/reco.js");
const marks = require("./routes/marks.js");
const noti = require("./routes/noti.js");
const user = require("./routes/user.js");
const all = require("./routes/all.js");


app.get("/", (req, res) => {
  res.send("Welcome to the Registration App!");
});

app.use("/idx", all);
app.use("/recommendations", rec);
app.use("/idx", marks);
app.use("/notifications", noti);
app.use("/", user);
