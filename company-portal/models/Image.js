// models/Image.js

const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: {
    type: String,
    required: true,
  },

  tags: [String],
});

module.exports = mongoose.model('Image', imageSchema);
