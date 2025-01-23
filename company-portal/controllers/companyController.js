const Company = require('../models/Company');

// Create a new company
exports.createCompany = async (req, res) => {
  try {
    const newCompany = new Company(req.body);
    const savedCompany = await newCompany.save();
    res.status(201).json({
         message: 'Company created successfully',
          company: savedCompany
         });
  } catch (err) {
    res.status(500).json({ message: 'Error creating company', error: err.message });
  }
};

// Get all companies
exports.getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200)
    .json({ message: 'Fetched all companies successfully', companies });
  } catch (err) {
    res.status(500)
    .json({ message: 'Error fetching companies', error: err.message });
  }
};

// Get a specific company by ID
exports.getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200)
    .json({ message: 'Fetched company successfully', company });
  } catch (err) {
    res.status(500)
    .json({ message: 'Error fetching company', error: err.message });
  }
};

// Update a company
exports.updateCompany = async (req, res) => {
  try {
    const updatedCompany = await Company.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200)
    .json({ message: 'Company updated successfully', company: updatedCompany });
  } catch (err) {
    res.status(500)
    .json({ message: 'Error updating company', error: err.message });
  }
};

// Delete a company
exports.deleteCompany = async (req, res) => {
  try {
    const deletedCompany = await Company.findByIdAndDelete(req.params.id);
    if (!deletedCompany) {
      return res.status(404).json({ message: 'Company not found' });
    }
    res.status(200)
    .json({ message: 'Company deleted successfully' });
  } catch (err) {
    res.status(500)
    .json({ message: 'Error deleting company', error: err.message });
  }
};
