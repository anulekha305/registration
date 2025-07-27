const express = require("express");
const router = express.Router();
const Notification = require("../models/noti.js");
const {isloggedin  ,isnotiauthor,validateNoti}=require("../middleware.js");

// *****notifications*******************************//////////////////////////

// Public: View last 3 notifications
router.get("/", async (req, res) => {
    const latestNotifications = await Notification.find({})
        .sort({ createdAt: -1 })
        .populate("createdBy");
    res.render("pages/notification.ejs", { latestNotifications , curruser: req.user});
});

// Teacher Dashboard to manage notifications
router.get("/manage", isloggedin, async (req, res) => {
    const allNotifications = await Notification.find({ createdBy: req.user._id}).sort({ createdAt: -1 })
        .populate("createdBy");
    res.render("pages/managenoti.ejs", { allNotifications });
});

// Form to create new
router.get("/new", isloggedin, (req, res) => {
    res.render("pages/newnoti.ejs");
});

router.post("/", isloggedin, validateNoti, async (req, res) => {
    const { title, content } = req.body;
    const newNotification = new Notification({
        title,
        content,
        createdBy: req.user._id
    });

    await newNotification.save();
    res.redirect("/notifications/manage");
});

// Edit form
router.get("/:id/edit", isloggedin,isnotiauthor, async (req, res) => {
    const { id } = req.params;
    const notification = await Notification.findById(id);
    res.render("pages/editnoti.ejs", { notification });
});
//update

router.put("/:id", isloggedin, isnotiauthor, validateNoti, async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;
    await Notification.findByIdAndUpdate(id, { title, content });
    res.redirect("/notifications/manage");
});

// Delete
router.delete("/:id", isloggedin,isnotiauthor, async (req, res) => {
    const { id } = req.params;
    await Notification.findByIdAndDelete(id);
    res.redirect("/notifications/manage");
});



module.exports = router;
