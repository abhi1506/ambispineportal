const Quotation = require("../models/Quotation");

const createQuotation = async (req, res) => {
  try {
    const {
      name,
      company_organization,
      email,
      contact,
      country,
      description,
      quotationOptions,
    } = req.body;

    // Create a new quotation
    const newQuotation = new Quotation({
      name,
      company_organization,
      email,
      contact,
      country,
      description,
      quotationOptions,
    });

    await newQuotation.save();
    res.status(201).json({ message: "Quotation submitted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getQuotations = async (req, res) => {
  try {
    const quotations = await Quotation.find();
    res.json(quotations);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
const deleteQuotation = async (req, res) => {
  try {
    const { id } = req.params;

    const quotation = await Quotation.findByIdAndDelete(id);

    if (!quotation) {
      return res.status(404).json({ message: "Quotation not found" });
    }

    res.status(200).json({ message: "Quotation deleted successfully" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createQuotation,
  getQuotations,
  deleteQuotation,
};
