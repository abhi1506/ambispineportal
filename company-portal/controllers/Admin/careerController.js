const Career = require('../../models/Career');

exports.createCareer = async (req, res) => {
  try {
      const job = new Career(req.body);
      await job.save();
      res.status(201).json({ message: 'Job posting created successfully', job });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

// Get all job postings with optional pagination
exports.getAllCareers = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const careers = await Career.find()
      .limit(parseInt(limit, 10))
      .skip((parseInt(page, 10) - 1) * parseInt(limit, 10));
    const total = await Career.countDocuments();

    res.status(200).json({
      data: careers,
      total,
      page: parseInt(page, 10),
      totalPages: Math.ceil(total / parseInt(limit, 10)),
      message: 'Job postings retrieved successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching job postings', error: err.message });
  }
};

// Get a single job posting by ID
exports.getCareerById = async (req, res) => {
  try {
    const career = await Career.findById(req.params.id);
    if (!career) {
      return res.status(404).json({ message: 'Job posting not found' });
    }
    res.status(200).json({
      data: career,
      message: 'Job posting retrieved successfully'
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching job posting', error: err.message });
  }
};

// Update a job posting
exports.updateCareer = async (req, res) => {
  try {
    const updatedCareer = await Career.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedCareer) {
      return res.status(404).json({ message: 'Job posting not found' });
    }
    res.status(200).json({
      data: updatedCareer,
      message: 'Job posting updated successfully'
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: 'Validation error', errors: err.errors });
    }
    console.error(err);
    res.status(500).json({ message: 'Error updating job posting', error: err.message });
  }
};

// Delete a job posting
exports.deleteCareer = async (req, res) => {
  try {
    const deletedCareer = await Career.findByIdAndDelete(req.params.id);
    if (!deletedCareer) {
      return res.status(404).json({ message: 'Job posting not found' });
    }
    res.status(200).json({ message: 'Job posting deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting job posting', error: err.message });
  }
};
