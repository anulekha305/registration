



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MarksSchema = new Schema({
    student: { type: String, required: true },
    subject: { type: String, required: true },
    semester: { type: Number, required: true },
    rollno: { type: Number, required: true },
    marks: { type: Number, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' }  // Add this
});

const Marks = mongoose.model("Marks", MarksSchema);
module.exports = Marks;
