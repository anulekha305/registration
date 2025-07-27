const Recommendation = require("./models/reco.js");
const Notification = require("./models/noti.js");
const Marks=require("./models/marks.js");
const { marksSchema } = require('./utils/validateMarks');
const notiSchema = require("./utils/notischema.js");

const Joi = require('joi');

module.exports.savedredirecturl=(req,res,next)=>{
    if(req.session.redirecturl){
        res.locals.redirecturl=req.session.redirecturl;
        delete req.session.redirecturl;
    }
    next();
}

module.exports. validateMarks=(req, res, next)=>{
  const { error } = marksSchema.validate(req.body.marks);
  if (error) {
    const msg = error.details.map(el => el.message).join(',');
    return res.status(400).send(msg); // or redirect with flash if you're using connect-flash
  }
  next();
}
module.exports.validateMarks = (req, res, next) => {
  const { student, subject, semester, rollno, marks } = req.body.marks;
  if (!student || !subject || !semester || !rollno || isNaN(marks)) {
    req.flash("error", "All fields are required, and marks must be a number");
    return res.redirect("/idx/marks");
  }
  next();
};

module.exports.validateNoti = (req, res, next) => {
    const { error } = notiSchema.validate(req.body);
    if (error) {
        return res.status(400).send("Validation Error: " + error.details[0].message);
    }
    next();
};

module.exports.isowner=async(req,res,next)=>{
    const { id } = req.params;
    let reco=await Recommendation.findById(id);
    if(!reco.owner._id.equals(res.locals.curruser._id)){
      return  res.redirect("/recommendations/view");
    }
    next();
}


module.exports.isnotiauthor=async(req,res,next)=>{
    const { id } = req.params;
    let noti=await Notification.findById(id);
     if (!noti || !noti.createdBy || !noti.createdBy.equals(res.locals.curruser._id)) {
        return res.redirect("/notifications/manage");
    }
    next();
}


module.exports.isMarkAuthor = async (req, res, next) => {
    const { id } = req.params;
    const mark = await Marks.findById(id);
    if (!mark.createdBy.equals(req.user._id)) {
        return res.redirect("/idx/mark");
    }
    next();
};



module.exports.isloggedin = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.redirecturl = req.originalUrl;

        req.flash("error", "You must be logged in to create !")
        return res.redirect("/login")
    }
    next();
};

// middleware/isTeacher.js
module.exports.isTeacher=(req, res, next) => {
  if (!req.user || req.user.username !== 'teacher') {
    return res.status(403).send("Forbidden: Only teachers can perform this action.");
  }
  next();
}



