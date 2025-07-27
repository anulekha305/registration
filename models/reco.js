



const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const RecommendationSchema = new Schema({
  recommendation: {
    type: String,
    required: true
  },
  studentAdvice: {
    type: String,
    required: true
  },
  teacherReview: {
    type: String,
    required: true
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User", // references the User model
    required: true
  }
});

const Recommendation = mongoose.model("Recommendation", RecommendationSchema);
module.exports = Recommendation;
