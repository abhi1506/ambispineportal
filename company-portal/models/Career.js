const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  jobDescription: { type: String, required: true },
  department: { type: String, required: true },
  location: { type: String, required: true },
  employmentType: {
      type: String,
      required: true,
      enum: ['Full-time', 'Part-time', 'Contract', 'Temporary'],
  },
  interviewProcess: {
    type: String,
    required: true,
    enum: ['Phone Screen', 'On-site Interview', 'Technical Interview', 'Final Interview'],
  },
  salaryRange: { type: String, required: true },
  requirements: {
      education: { type: String, required: true },
      skills: { type: [String], required: true },
      experience: { type: String, required: true },
  },
  openings: { type: Number, required: true },
  responsibilities: { type: [String], required: true },
  postingDate: { type: Date, default: Date.now },
  closingDate: { type: Date, required: true },
  companyOverview: { type: String, required: true },
  benefits: { type: [String], required: true },
  preferredQualifications: { type: [String], required: true },
  jobCategory: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Career', careerSchema);
