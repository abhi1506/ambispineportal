const mongoose = require('mongoose');

const companySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true }, 
    address: { type: String, required: true },
    contact: {
      phone: { 
        type: String,
        validate: {
          validator: function(v) {
            return /\d{10}/.test(v); 
          },
          message: props => `${props.value} is not a valid phone number!`
        }
      },
      email: { 
        type: String,
        required: true,
        unique: true, 
        validate: {
          validator: function(v) {
            return /^\S+@\S+\.\S+$/.test(v); 
          },
          message: props => `${props.value} is not a valid email address!`
        }
      },
    },
    description: { type: String },
  },
  { timestamps: true } 
);
const Company =mongoose.model('Company', companySchema);
module.exports = Company;
