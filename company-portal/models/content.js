const mongoose = require('mongoose');

const contentSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });

const Content = mongoose.model('Content', contentSchema);
module.exports = Content;
