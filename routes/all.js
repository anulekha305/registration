const express=require("express");
const router=express.Router();
const {isloggedin }=require("../middleware.js");

router.get("/",async(req,res)=>{
    res.render("pages/index.ejs");
})
//advice ai
router.get("/adv",(req,res)=>{
    res.render("pages/adv.ejs");
})

router.get("/course",(req,res)=>{
    res.render("pages/course.ejs");
})

router.get("/classschedu",(req,res)=>{
    res.render("pages/classchedule.ejs");
})

router.get("/admin",(req,res)=>{
    res.render("pages/admin.ejs");
})

router.get("/fees",isloggedin,(req,res)=>{
    res.render("pages/fees.ejs");
})


module.exports=router;