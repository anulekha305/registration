const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-local-mongoose");

const userschema=new Schema({
    username: { type: String, required: true, unique: true },
    email:{
        type:String,
        required:true
    },
    role: {
    type: String,
    enum: ['student', 'teacher'],
    default: 'student',
    required: true
},
   
    password: String,
   

});

userschema.plugin(passportLocalMongoose);//usermame,password
module.exports=mongoose.model('User',userschema);