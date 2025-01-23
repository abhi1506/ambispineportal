const mongoose = require("mongoose");
const Career = require('./Career');

const jobApplicationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  experience: {
    type: String
  },
  education: {
    type: String
  },
  resume: { 
    public_id: { type: String },
    url: { type: String, },
  },
  skills: {
    type: [String], 
  },
  message: {
    type: String
  },
  career: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Career',
    // required: true
  },
  appliedAt: {
    type: Date,
    default: Date.now
  }
},{ timestamps: true });

const JobApplication = mongoose.model("Job", jobApplicationSchema);

module.exports = JobApplication;
