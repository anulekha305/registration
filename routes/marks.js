const express = require("express");
const router = express.Router();
const Marks = require("../models/marks.js");
const { isTeacher, isloggedin } = require("../middleware.js");
const Wrapasync = require("../utils/wrapasync.js");

// View marks
router.get("/mark", async (req, res) => {
  const allmarks = await Marks.find({}).populate("createdBy");
  res.render("pages/mark.ejs", { allmarks, curruser: req.user });
});

// Upload form
router.get("/marks", isloggedin, isTeacher, (req, res) => {
  res.render("pages/marks.ejs");
});

// Upload marks
router.post("/marks", isloggedin, isTeacher, Wrapasync(async (req, res) => {
  const submarks = new Marks(req.body.marks);
  submarks.createdBy = req.user._id;
  await submarks.save();
  res.redirect("/idx/mark");
}));

// Edit form
router.get("/marks/:id/edit", isloggedin, isTeacher, Wrapasync(async (req, res) => {
  const mark = await Marks.findById(req.params.id);
  if (!mark.createdBy.equals(req.user._id)) {
    return res.status(403).send("Not authorized to edit this entry.");
  }
  res.render("pages/edit.ejs", { mark });
}));

// Update
router.put("/marks/:id", isloggedin, isTeacher, Wrapasync(async (req, res) => {
  const mark = await Marks.findById(req.params.id);
  if (!mark.createdBy.equals(req.user._id)) {
    return res.status(403).send("Not authorized to update this entry.");
  }
  await Marks.findByIdAndUpdate(req.params.id, req.body.marks);
  res.redirect("/idx/mark");
}));

// Delete
router.delete("/marks/:id", isloggedin, isTeacher, Wrapasync(async (req, res) => {
  const mark = await Marks.findById(req.params.id);
  if (!mark.createdBy.equals(req.user._id)) {
    return res.status(403).send("Not authorized to delete this entry.");
  }
  await Marks.findByIdAndDelete(req.params.id);
  res.redirect("/idx/mark");
}));

module.exports = router;






