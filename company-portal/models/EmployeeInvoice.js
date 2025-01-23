const mongoose = require('mongoose');

const employeeInvoiceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true, 
  },
  invoiceNumber: {
    type: String,
    required: true,
    unique: true, 
  },
  invoiceDate: {
    type: Date,
    required: true,
    default: Date.now, 
  },
  salary: {
    type: Number,
    required: true,
    min: 0, 
  },
  status: {
    type: String,
    enum: ['Paid', 'Pending', 'Overdue'], 
    required: true,
  },
});

// Create a model from the schema
const EmployeeInvoice = mongoose.model('EmployeeInvoice', employeeInvoiceSchema);

module.exports = EmployeeInvoice;
