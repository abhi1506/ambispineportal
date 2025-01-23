const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true, 
    match: [/.+\@.+\..+/, 'Please enter a valid email address'], 
  },
  rating: {
    type: Number,
    required: true,
    min: 0, 
    max: 5, 
  },
  service: {
    type: String,
    required: true, 
  },
  improve: {
    type: String,
    required: false, 
  },
  recommend: {
    type: Boolean,
    default: false, 
  },
  additional: {
    type: String,
    required: false,
  },
});


const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;
