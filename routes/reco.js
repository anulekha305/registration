const express=require("express");
const router=express.Router();
const {isloggedin ,isowner}=require("../middleware.js");
const { body, validationResult } = require("express-validator");
const Recommendation = require("../models/reco.js");



router.get("/", isloggedin, (req, res) => {
  res.render("pages/reco.ejs", {
    errors: [],
    oldInput: { recommendation: "", studentAdvice: "", teacherReview: "" }
  });
});

// POST: create new recommendation
router.post(
  "/",
  isloggedin,
  [
    body("recommendation").trim().notEmpty().withMessage("Recommendation is required"),
    body("studentAdvice").trim().notEmpty().withMessage("Student advice is required"),
    body("teacherReview").trim().notEmpty().withMessage("Teacher review is required")
  ],
  async (req, res) => {
    const errors = validationResult(req);
    const { recommendation, studentAdvice, teacherReview } = req.body;

    if (!errors.isEmpty()) {
      return res.status(400).render("pages/reco.ejs", {
        errors: errors.array(),
        oldInput: { recommendation, studentAdvice, teacherReview }
      });
    }

    const newReco = new Recommendation({
      recommendation,
      studentAdvice,
      teacherReview,
      owner: req.user._id
    });

    await newReco.save();
    res.redirect("/recommendations/view");
  }
);

// GET: view all
router.get("/view", async (req, res) => {
  const recommendations = await Recommendation.find({}).populate("owner");
  res.render("pages/viewreco.ejs", { recommendations });
});

// DELETE
router.delete("/:id", isloggedin, isowner, async (req, res) => {
  const { id } = req.params;
  await Recommendation.findByIdAndDelete(id);
  res.redirect("/recommendations/view");
});

// EDIT FORM
router.get("/:id/edit", isloggedin, isowner, async (req, res) => {
  const { id } = req.params;
  const recommendation = await Recommendation.findById(id);
  res.render("pages/editreco.ejs", { recommendation });
});

// PUT: update
router.put("/:id", isloggedin, isowner, async (req, res) => {
  const { id } = req.params;
  const { recommendation, studentAdvice, teacherReview } = req.body;
  await Recommendation.findByIdAndUpdate(id, {
    recommendation,
    studentAdvice,
    teacherReview
  });

  res.redirect("/recommendations/view");
});

module.exports = router;


