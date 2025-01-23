// models/Permission.js
const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({
    role: { type: String, enum: ['Admin', 'Moderator', 'User'], required: true },
    resource: { type: String, required: true },
    actions: [{ type: String }], 
});

module.exports = mongoose.model('Permission', permissionSchema);
