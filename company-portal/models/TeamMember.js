const mongoose = require('mongoose');

const teamMemberSchema = new mongoose.Schema({
  empID:{ type: String, },
  name: { type: String, },
  role: { type: String, }, 
  bio: { type: String,  }, 
  rating: { type: Number, min: 0, max: 5 }, 
  contactInfo: {
    phone: { type: String },
    email: { type: String }, 
    location:{type: String }
  },
  socialMedia: {
    instagram: { type: String,  },
    facebook: { type: String,  },
    twitter: { type: String, },
    linkedin: { type: String, },
  },
  avatar: { 
    public_id: { type: String },
    url: { type: String, default: 'https://default-avatar-url.com/avatar.png' },
  },

  dateJoined: { type: Date, default: Date.now }, 
}, { timestamps: true });

module.exports = mongoose.model('TeamMember', teamMemberSchema);
