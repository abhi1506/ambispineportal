const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  company_organization: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String, required: true },
  country: { type: String, required: true },
  description: { type: String, required: true },
  quotationOptions: {
    webDesign: { type: Boolean, default: false },
    webApplication: { type: Boolean, default: false },
    cloudSolution: { type: Boolean, default: false },
    otherQueries: { type: Boolean, default: false },
  },
});

module.exports = mongoose.model("Quotation", quotationSchema);
